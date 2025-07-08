import prisma from '../config/database.js';
import { hashPassword } from '../utils/helpers.js';




const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};


/**
 * @desc    Get user dashboard data
 * @route   GET /api/user/
 * @access  Private
 */
const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user data and referral count in parallel
    const [user, referralCount] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          fullName: true,
          username: true,
          email: true,
          phoneNumber: true,
          totalBalance: true,
          totalProfit: true,
          referralBalance: true, // Changed from referralEarnings to match your schema
          currentPlan: true,
          referralCode: true,
          createdAt: true
        }
      }),
      prisma.referral.count({
        where: { 
          referrerId: userId,
          isActive: true // Optional: only count active referrals if needed
        }
      })
    ]);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const dashboardData = {
      fullName: user.fullName,
      totalBalance: user.totalBalance,
      totalProfit: user.totalProfit,
      referralNumber: referralCount,
      referralEarnings: user.referralBalance, // Changed to match schema
      memberCreationTime: user.createdAt,
      currentInvestmentPlan: user.currentPlan,
      referralCode: user.referralCode
    };

    res.json(dashboardData);
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


/**
 * @desc    Get user profile
 * @route   GET /api/user/profile
 * @access  Private
 */
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId }
      // No 'select', this returns all fields
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


/**
 * @desc    Update user profile
 * @route   PUT /api/user/profile
 * @access  Private
 * @body    { fullName?, username?, email?, phoneNumber?, password? }
 */
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, username, email, phoneNumber, password } = req.body;

    // Check if email or username is taken by another user
    if (email || username) {
      const existingUser = await prisma.user.findFirst({
        where: {
          AND: [
            { id: { not: userId } },
            {
              OR: [
                { email: email || '' },
                { username: username || '' }
              ]
            }
          ]
        }
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Email or username is already taken' });
      }
    }

    // Prepare update data
    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (password) updateData.password = await hashPassword(password);

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        fullName: true,
        username: true,
        email: true,
        phoneNumber: true,
        profileImage: true,
        createdAt: true
      }
    });

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * @desc    Get user referrals
 * @route   GET /api/user/referrals
 * @access  Private
 */
const getReferrals = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        referralCode: true,
        referredUsers: {
          include: {
            referee: {
              select: {
                id: true,
                fullName: true,
                username: true,
                createdAt: true,
                totalBalance: true
              }
            }
          }
        }
      }
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    let totalEarnings = 0;
    const updates = [];

    const referrals = user.referredUsers.map((ref) => {
      const referee = ref.referee;
      if (!referee) return null;

      const earnings = parseFloat((referee.totalBalance * 0.07).toFixed(2));
      totalEarnings += earnings;

      // Queue the update for Referral.earnings
      updates.push(
        prisma.referral.update({
          where: { id: ref.id },
          data: { earnings }
        })
      );

      return {
        id: ref.id,
        fullName: referee.fullName,
        username: referee.username,
        joinedDate: referee.createdAt,
        earnings,
      };
    }).filter(Boolean);

    // Update user’s totalProfit and referralBalance
    updates.push(
      prisma.user.update({
        where: { id: userId },
        data: {
          totalProfit: { increment: totalEarnings },
          referralBalance: { increment: totalEarnings },
        }
      })
    );

    await prisma.$transaction(updates);

    res.json({
      referralCode: user.referralCode,
      totalReferralBonus: totalEarnings,
      referrals
    });
  } catch (error) {
    console.error('Referrals error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getPlans = async (req, res) => {
  try {
    const plans = await prisma.investmentPlan.findMany({
      where: { isActive: true },
      orderBy: {
        createdAt: 'asc'
      }
    });

    res.json({
      success: true,
      data: plans
    });
  } catch (error) {
    console.error('Error fetching active plans:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};



const startInvestment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { planId, amount } = req.body;

    // Get user and plan
    const [user, plan] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.investmentPlan.findUnique({ where: { id: planId } })
    ]);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!plan || !plan.isActive) {
      return res.status(400).json({ error: 'Invalid or inactive investment plan' });
    }

    // Validate amount
    if (amount < plan.minAmount || (plan.maxAmount && amount > plan.maxAmount)) {
      return res.status(400).json({ 
        error: `Amount must be between $${plan.minAmount} and ${plan.maxAmount ? '$' + plan.maxAmount : 'unlimited'}`
      });
    }

    if (user.totalBalance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Start investment (in transaction)
    const result = await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          totalBalance: { decrement: amount },
          currentPlan: planId,
          planStartDate: new Date()
        }
      }),
      prisma.investment.create({
        data: {
          userId,
          planId,
          amount,
          expectedProfit: amount * (plan.profitRate / 100) * (plan.duration / 24),
          endDate: new Date(Date.now() + plan.duration * 60 * 60 * 1000)
        }
      })
    ]);

    const updatedUser = result[0];
    const investment = result[1];

    res.json({
      message: 'Investment started successfully',
      user: {
        totalBalance: updatedUser.totalBalance,
        currentPlan: updatedUser.currentPlan
      },
      investment
    });
  } catch (error) {
    console.error('Investment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const getActiveInvestments = async (req, res) => {
  try {
    const userId = req.user.id;

    const activeInvestments = await prisma.investment.findMany({
      where: {
        userId,
        status: "active"
      },
      // include: {
      //   investment: true // if you want plan details (optional)
      // },
      orderBy: {
        startDate: "desc"
      }
    });

    res.json({
      success: true,
      data: activeInvestments
    });
  } catch (error) {
    console.error("Error fetching active investments:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};




/**
 * @desc    Get all referrals and calculate referral balance
 * @route   GET /api/users/referrals
 * @access  Private
 */
const getReferral = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Get all referrals where current user is the referrer
    const referrals = await prisma.referral.findMany({
      where: {
        referrerId: userId,
        isActive: true
      },
      include: {
        referee: {
          select: {
            id: true,
            fullName: true,
            username: true,
            email: true,
            createdAt: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // 2. Get all deposits made by referred users
    const refereeIds = referrals.map(ref => ref.refereeId);
    
    const deposits = await prisma.deposit.findMany({
      where: {
        userId: { in: refereeIds },
        status: 'completed' // Only count completed deposits
      },
      select: {
        userId: true,
        amount: true,
        createdAt: true
      }
    });

    // 3. Calculate referral earnings (7% of each deposit)
    const referralEarnings = {};
    deposits.forEach(deposit => {
      const earnings = deposit.amount * 0.07; // 7% of deposit
      if (!referralEarnings[deposit.userId]) {
        referralEarnings[deposit.userId] = 0;
      }
      referralEarnings[deposit.userId] += earnings;
    });

    // 4. Calculate total referral balance
    const totalReferralBalance = Object.values(referralEarnings).reduce(
      (sum, amount) => sum + amount, 0
    );

    // 5. Format response with referral details and earnings
    const formattedReferrals = referrals.map(referral => ({
      id: referral.id,
      user: referral.referee,
      joinedDate: referral.referee.createdAt,
      earnings: referralEarnings[referral.refereeId] || 0,
      isActive: referral.isActive,
      referralDate: referral.createdAt
    }));

    const refereeBalances = await prisma.user.findMany({
  where: { id: { in: refereeIds } },
  select: { id: true, totalBalance: true }
});

let totalReferralProfit = 0;

refereeBalances.forEach(ref => {
  totalReferralProfit += ref.totalBalance * 0.07;
});

// 7. Update referrer's totalProfit
await prisma.user.update({
  where: { id: userId },
  data: {
    totalProfit: {
      increment: totalReferralProfit
    }
  }
});

    res.json({
      success: true,
      totalReferrals: referrals.length,
      totalReferralBalance: totalReferralBalance,
      referrals: formattedReferrals
    });

  } catch (error) {
    console.error('Referral error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
};
 




/**
 * @desc    Get user transaction history
 * @route   GET /api/transactions
 * @access  Private
 * @query   { type, limit, page } (optional filters)
 */
  const getTransactionHistory = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { type, limit = 20, page = 1 } = req.query;
  
  // Convert limit and page to numbers
  const take = parseInt(limit);
  const skip = (parseInt(page) - 1) * take;

  // Base where clause for all queries
  const userFilter = { userId };

  // Prepare queries for each transaction type
  const queries = {
    deposits: prisma.deposit.findMany({
      where: userFilter,
      select: {
        id: true,
        amount: true,
        currency: true,
        status: true,
        createdAt: true,
        verifiedAt: true,
        // type: true // We'll add this as a literal
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take
    }),
    withdrawals: prisma.withdrawal.findMany({
      where: userFilter,
      select: {
        id: true,
        amount: true,
        cryptocurrency: true,
        status: true,
        createdAt: true,
        // type: true // We'll add this as a literal
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take
    }),
    investments: prisma.investment.findMany({
      where: { userId },
      select: {
        id: true,
        amount: true,
        expectedProfit: true,
        status: true,
        startDate: true,
        endDate: true,
        // type: true // We'll add this as a literal
      },
      orderBy: { startDate: 'desc' },
      skip,
      take
    })
  };

  // Execute queries based on requested type
  let results = [];
  let totalCount = 0;

  if (!type || type === 'all') {
    // Get all transaction types
    const [deposits, withdrawals, investments] = await Promise.all([
      queries.deposits.then(deps => deps.map(d => ({ ...d, type: 'deposit' }))),
      queries.withdrawals.then(withs => withs.map(w => ({ ...w, type: 'withdrawal' }))),
      queries.investments.then(invs => invs.map(i => ({ ...i, type: 'investment' })))
    ]);

    // Get counts for pagination
    const [depositCount, withdrawalCount, investmentCount] = await Promise.all([
      prisma.deposit.count({ where: userFilter }),
      prisma.withdrawal.count({ where: userFilter }),
      prisma.investment.count({ where: { userId } })
    ]);

    totalCount = depositCount + withdrawalCount + investmentCount;
    results = [...deposits, ...withdrawals, ...investments];
  } else if (type === 'deposit') {
    results = await queries.deposits.then(deps => deps.map(d => ({ ...d, type: 'deposit' })));
    totalCount = await prisma.deposit.count({ where: userFilter });
  } else if (type === 'withdrawal') {
    results = await queries.withdrawals.then(withs => withs.map(w => ({ ...w, type: 'withdrawal' })));
    totalCount = await prisma.withdrawal.count({ where: userFilter });
  } else if (type === 'investment') {
    results = await queries.investments.then(invs => invs.map(i => ({ ...i, type: 'investment' })));
    totalCount = await prisma.investment.count({ where: { userId } });
  } else {
    return res.status(400).json({ message: 'Invalid transaction type' });
  }

  // Sort all transactions by date (newest first)
  results.sort((a, b) => {
    const dateA = a.createdAt || a.startDate;
    const dateB = b.createdAt || b.startDate;
    return new Date(dateB) - new Date(dateA);
  });

  // Paginate the sorted results
  const paginatedResults = results.slice(skip, skip + take);

  res.json({
    success: true,
    count: paginatedResults.length,
    totalCount,
    page: parseInt(page),
    pages: Math.ceil(totalCount / take),
    transactions: paginatedResults
  });
});




export {
  getDashboard,
  getProfile,
  updateProfile,
  getReferrals,
  getReferral,
  startInvestment,
  getPlans,
  getActiveInvestments,
  getTransactionHistory
};