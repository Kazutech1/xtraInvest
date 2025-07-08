import prisma from '../config/database.js';
import { comparePassword, generateToken, hashPassword } from '../utils/helpers.js';

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await prisma.admin.findUnique({
      where: { username }
    });

    if (!admin) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await comparePassword(password, admin.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(admin.id, true);

    res.json({
      message: 'Admin login successful',
      token,
      admin: { username: admin.username }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { loginAdmin };



/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Private (Admin)
 * @query   { page?, limit?, search? }
 */

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '' } = req.query;
    const skip = (page - 1) * limit;

    const whereClause = search ? {
      OR: [
        { fullName: { contains: search, mode: 'insensitive' } },
        { username: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ]
    } : {};

    const [users, totalUsers] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        skip,
        take: parseInt(limit),
        select: {
          id: true,
          fullName: true,
          username: true,
          email: true,
          phoneNumber: true,
          totalBalance: true,
          totalProfit: true,
          referralBalance: true,
          currentPlan: true,
          isActive: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where: whereClause })
    ]);

    res.json({
      success: true,
      data: users,
      pagination: {
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: parseInt(page),
        usersPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        deposits: true,
        withdrawals: true,
        referredUsers: {
          select: {
            referee: {
              select: {
                id: true,
                username: true,
                createdAt: true
              }
            }
          }
        },
        referredBy: {
          select: {
            referrer: {
              select: {
                id: true,
                username: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Transform referral data
    const transformedUser = {
      ...user,
      referrals: user.referredUsers.map(ref => ref.referee),
      referredBy: user.referredBy?.referrer
    };

    // Remove sensitive data
    const { password, referredUsers, ...userData } = transformedUser;

    res.json({
      success: true,
      data: userData
    });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      fullName, 
      username, 
      email, 
      phoneNumber, 
      password, 
      totalBalance, 
      totalProfit, 
      referralBalance, 
      isActive, 
      currentPlan 
    } = req.body;

    // Check if email or username is taken by another user
    if (email || username) {
      const existingUser = await prisma.user.findFirst({
        where: {
          AND: [
            { id: { not: id } },
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
    if (totalBalance !== undefined) updateData.totalBalance = parseFloat(totalBalance);
    if (totalProfit !== undefined) updateData.totalProfit = parseFloat(totalProfit);
    if (referralBalance !== undefined) updateData.referralBalance = parseFloat(referralBalance);
    if (isActive !== undefined) updateData.isActive = isActive;
    if (currentPlan) updateData.currentPlan = currentPlan;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        fullName: true,
        username: true,
        email: true,
        phoneNumber: true,
        totalBalance: true,
        totalProfit: true,
        referralBalance: true,
        currentPlan: true,
        isActive: true,
        createdAt: true
      }
    });

    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // First delete all related records (deposits, withdrawals, referrals)
    await prisma.$transaction([
      prisma.deposit.deleteMany({ where: { userId: id } }),
      prisma.withdrawal.deleteMany({ where: { userId: id } }),
      prisma.referral.deleteMany({ 
        where: { 
          OR: [
            { referrerId: id },
            { refereeId: id }
          ]
        } 
      })
    ]);

    // Then delete the user
    await prisma.user.delete({ where: { id } });

    res.json({
      success: true,
      message: 'User and all related data deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};

/**
 * @desc    Get all deposits with filters
 * @route   GET /api/admin/deposits
 * @access  Private (Admin)
 */
// Get all deposits with user info and proof images
export const getDeposits = async (req, res) => {
  try {
    const deposits = await prisma.deposit.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(deposits);
  } catch (error) {
    console.error("Get deposits error:", error);
    res.status(500).json({ message: "Failed to get deposits" });
  }
};




// Verify/Reject Deposits with image proof handling
export const verifyDeposit = async (req, res) => {
  try {
    const { depositId, status, adminNote } = req.body;
    
    const deposit = await prisma.deposit.update({
      where: { id: depositId },
      data: { 
        status,
        verifiedAt: status === 'verified' ? new Date() : null,
      
      },
      include: { user: true }
    });

    // Credit user balance if verified
    if (status === 'verified') {
      await prisma.$transaction([
        prisma.user.update({
          where: { id: deposit.userId },
          data: { totalBalance: { increment: deposit.amount } }
        }),
        // prisma.user.update({
        //   where: { userId: deposit.userId },
        //   data: { totalInvested: { increment: deposit.amount } }
        // })
      ]);
    }

    res.json({
      message: `Deposit ${status}`,
      deposit
    });
  } catch (error) {
    console.error("Verify deposit error:", error);
    res.status(500).json({ message: "Failed to verify deposit" });
  }
};


export const getDepositById = async (req, res) => {
  try {
    const { depositId } = req.params;
    
    const deposit = await prisma.deposit.findUnique({
      where: { id: depositId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      }
    });

    if (!deposit) {
      return res.status(404).json({ message: "Deposit not found" });
    }

    res.json(deposit);
  } catch (error) {
    console.error("Get deposit by ID error:", error);
    res.status(500).json({ message: "Failed to get deposit" });
  }
};



// Get admin wallets
export const getAdminWallets = async (req, res) => {
  try {
    const wallets = await prisma.adminWallet.findMany({
      where: { isActive: true }
    });
    res.json(wallets);
  } catch (error) {
    console.error("Get admin wallets error:", error);
    res.status(500).json({ message: "Failed to get admin wallets" });
  }
};


// Add new admin wallet
export const addAdminWallet = async (req, res) => {
  try {
    const { currency, address, network } = req.body;

    // Validate required fields
    if (!currency || !address) {
      return res.status(400).json({ message: "Currency and address are required" });
    }

    // Check if wallet already exists
    const existingWallet = await prisma.adminWallet.findFirst({
      where: {
        OR: [
          { address },
          { currency, network }
        ]
      }
    });

    if (existingWallet) {
      return res.status(400).json({ 
        message: existingWallet.address === address ? 
          "Wallet with this address already exists" : 
          "Wallet for this currency and network already exists"
      });
    }

    const newWallet = await prisma.adminWallet.create({
      data: {
        currency,
        address,
        network: network || null
      }
    });

    res.status(201).json({
      message: "Wallet added successfully",
      wallet: newWallet
    });
  } catch (error) {
    console.error("Add admin wallet error:", error);
    res.status(500).json({ message: "Failed to add admin wallet" });
  }
};

// Update admin wallet
export const updateAdminWallet = async (req, res) => {
  try {
    const { walletId } = req.params;
    const { currency, address, network, isActive } = req.body;

    const updatedWallet = await prisma.adminWallet.update({
      where: { id: walletId },
      data: {
        currency,
        address,
        network,
        isActive
      }
    });

    res.json({
      message: "Wallet updated successfully",
      wallet: updatedWallet
    });
  } catch (error) {
    console.error("Update admin wallet error:", error);
    res.status(500).json({ message: "Failed to update admin wallet" });
  }
};

// Delete admin wallet
export const deleteAdminWallet = async (req, res) => {
  try {
    const { walletId } = req.params;

    await prisma.adminWallet.delete({
      where: { id: walletId }
    });

    res.json({ message: "Wallet deleted successfully" });
  } catch (error) {
    console.error("Delete admin wallet error:", error);
    res.status(500).json({ message: "Failed to delete admin wallet" });
  }
};



/**
 * @desc    Get all withdrawals with filters
 * @route   GET /api/admin/withdrawals
 * @access  Private (Admin)
 */
const getAllWithdrawals = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, userId } = req.query;
    const skip = (page - 1) * limit;

    const whereClause = {};
    if (status) whereClause.status = status;
    if (userId) whereClause.userId = userId;

    const [withdrawals, totalWithdrawals] = await Promise.all([
      prisma.withdrawal.findMany({
        where: whereClause,
        skip,
        take: parseInt(limit),
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.withdrawal.count({ where: whereClause })
    ]);

    res.json({
      success: true,
      data: withdrawals,
      pagination: {
        totalWithdrawals,
        totalPages: Math.ceil(totalWithdrawals / limit),
        currentPage: parseInt(page),
        withdrawalsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error getting withdrawals:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

/**
 * @desc    Update withdrawal status
 * @route   PUT /api/admin/withdrawals/:id/status
 * @access  Private (Admin)
 */
const updateWithdrawalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['pending', 'completed', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const withdrawal = await prisma.withdrawal.findUnique({ where: { id } });
    if (!withdrawal) {
      return res.status(404).json({ error: 'Withdrawal not found' });
    }

    // If changing to completed, make sure it was pending
    if (status === 'completed' && withdrawal.status !== 'pending') {
      return res.status(400).json({ error: 'Only pending withdrawals can be completed' });
    }

    // If rejecting, return profit to user
    if (status === 'rejected' && withdrawal.status === 'pending') {
      await prisma.$transaction([
        prisma.user.update({
          where: { id: withdrawal.userId },
          data: {
            totalProfit: {
              increment: withdrawal.amount
            }
          }
        }),
        prisma.withdrawal.update({
          where: { id },
          data: { status }
        })
      ]);
    } else {
      await prisma.withdrawal.update({
        where: { id },
        data: { status }
      });
    }

    const updatedWithdrawal = await prisma.withdrawal.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Withdrawal status updated successfully',
      data: updatedWithdrawal
    });
  } catch (error) {
    console.error('Error updating withdrawal status:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

/**
 * @desc    Delete withdrawal
 * @route   DELETE /api/admin/withdrawals/:id
 * @access  Private (Admin)
 */
const deleteWithdrawal = async (req, res) => {
  try {
    const { id } = req.params;

    const withdrawal = await prisma.withdrawal.findUnique({ where: { id } });
    if (!withdrawal) {
      return res.status(404).json({ error: 'Withdrawal not found' });
    }

    // If withdrawal was pending, return profit to user
    if (withdrawal.status === 'pending') {
      await prisma.user.update({
        where: { id: withdrawal.userId },
        data: {
          totalProfit: {
            increment: withdrawal.amount
          }
        }
      });
    }

    await prisma.withdrawal.delete({ where: { id } });

    res.json({
      success: true,
      message: 'Withdrawal deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting withdrawal:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export {
  getAllWithdrawals,
  updateWithdrawalStatus,
  deleteWithdrawal
};


// const createDepositAddress = async (req, res) => {
//   try {
//     const { address, network, currency, isActive = true } = req.body;

//     // Validate input
//     if (!address || !network || !currency) {
//       return res.status(400).json({ error: 'Address, network and currency are required' });
//     }

//     // Check if address already exists
//     const existingAddress = await prisma.depositAddress.findUnique({
//       where: { address }
//     });

//     if (existingAddress) {
//       return res.status(400).json({ error: 'Deposit address already exists' });
//     }

//     // Create new deposit address
//     const depositAddress = await prisma.depositAddress.create({
//       data: {
//         address,
//         network,
//         currency,
//         isActive
//       }
//     });

//     res.status(201).json({
//       message: 'Deposit address created successfully',
//       depositAddress
//     });
//   } catch (error) {
//     console.error('Error creating deposit address:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


// const getAllDepositAddresses = async (req, res) => {
//   try {
//     const { isActive, network, currency } = req.query;

//     const whereClause = {};
//     if (isActive !== undefined) whereClause.isActive = isActive === 'true';
//     if (network) whereClause.network = network;
//     if (currency) whereClause.currency = currency;

//     const depositAddresses = await prisma.depositAddress.findMany({
//       where: whereClause,
//       orderBy: { createdAt: 'desc' }
//     });

//     res.json(depositAddresses);
//   } catch (error) {
//     console.error('Error getting deposit addresses:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };



// const updateDepositAddressStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { isActive } = req.body;

//     if (typeof isActive !== 'boolean') {
//       return res.status(400).json({ error: 'isActive must be a boolean' });
//     }

//     const depositAddress = await prisma.depositAddress.update({
//       where: { id },
//       data: { isActive }
//     });

//     res.json({
//       message: 'Deposit address status updated successfully',
//       depositAddress
//     });
//   } catch (error) {
//     console.error('Error updating deposit address status:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


// /**
//  * @desc    Delete deposit address
//  * @route   DELETE /api/admin/deposit-addresses/:id
//  * @access  Private (Admin)
//  */
// const deleteDepositAddress = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Check if any deposits are using this address
//     const depositsCount = await prisma.deposit.count({
//       where: { depositWallet: id }
//     });

//     if (depositsCount > 0) {
//       return res.status(400).json({ 
//         error: 'Cannot delete address with existing deposits. Deactivate it instead.' 
//       });
//     }

//     await prisma.depositAddress.delete({
//       where: { id }
//     });

//     res.json({ message: 'Deposit address deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting deposit address:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// export {
//   createDepositAddress,
//   getAllDepositAddresses,
//   updateDepositAddressStatus,
//   deleteDepositAddress
// };




const createPlan = async (req, res) => {
  try {
    const { name, description, minAmount, maxAmount, profitRate, duration, isActive = true } = req.body;

    // Validate input
    if (!name || minAmount === undefined || profitRate === undefined || duration === undefined) {
      return res.status(400).json({ error: 'Name, minAmount, profitRate and duration are required' });
    }

    if (minAmount < 0) {
      return res.status(400).json({ error: 'Minimum amount cannot be negative' });
    }

    if (maxAmount !== null && maxAmount < minAmount) {
      return res.status(400).json({ error: 'Maximum amount cannot be less than minimum amount' });
    }

    if (profitRate <= 0) {
      return res.status(400).json({ error: 'Profit rate must be positive' });
    }

    if (duration <= 0) {
      return res.status(400).json({ error: 'Duration must be positive' });
    }

    // Create new plan
    const plan = await prisma.investmentPlan.create({
      data: {
        name,
        description,
        minAmount,
        maxAmount: maxAmount === '' ? null : maxAmount,
        profitRate,
        duration,
        isActive
      }
    });

    res.status(201).json({
      message: 'Investment plan created successfully',
      plan
    });
  } catch (error) {
    console.error('Error creating investment plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getAllPlans = async (req, res) => {
  try {
    const { isActive } = req.query;

    const whereClause = {};
    if (isActive !== undefined) whereClause.isActive = isActive === 'true';

    const plans = await prisma.investmentPlan.findMany({
      where: whereClause,
      orderBy: { minAmount: 'asc' }
    });

    res.json(plans);
  } catch (error) {
    console.error('Error getting investment plans:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, minAmount, maxAmount, profitRate, duration, isActive } = req.body;

    // Check if plan exists
    const existingPlan = await prisma.investmentPlan.findUnique({
      where: { id }
    });

    if (!existingPlan) {
      return res.status(404).json({ error: 'Investment plan not found' });
    }

    // Validate updates
    if (minAmount !== undefined && minAmount < 0) {
      return res.status(400).json({ error: 'Minimum amount cannot be negative' });
    }

    if (maxAmount !== undefined && maxAmount !== null && maxAmount < (minAmount || existingPlan.minAmount)) {
      return res.status(400).json({ error: 'Maximum amount cannot be less than minimum amount' });
    }

    if (profitRate !== undefined && profitRate <= 0) {
      return res.status(400).json({ error: 'Profit rate must be positive' });
    }

    if (duration !== undefined && duration <= 0) {
      return res.status(400).json({ error: 'Duration must be positive' });
    }

    // Update plan
    const updatedPlan = await prisma.investmentPlan.update({
      where: { id },
      data: {
        name: name || existingPlan.name,
        description: description !== undefined ? description : existingPlan.description,
        minAmount: minAmount !== undefined ? minAmount : existingPlan.minAmount,
        maxAmount: maxAmount !== undefined ? (maxAmount === '' ? null : maxAmount) : existingPlan.maxAmount,
        profitRate: profitRate !== undefined ? profitRate : existingPlan.profitRate,
        duration: duration !== undefined ? duration : existingPlan.duration,
        isActive: isActive !== undefined ? isActive : existingPlan.isActive
      }
    });

    res.json({
      message: 'Investment plan updated successfully',
      plan: updatedPlan
    });
  } catch (error) {
    console.error('Error updating investment plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if any users are using this plan
    const usersWithPlan = await prisma.user.count({
      where: { currentPlan: id }
    });

    if (usersWithPlan > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete plan with active users. Deactivate it instead.' 
      });
    }

    await prisma.investmentPlan.delete({
      where: { id }
    });

    res.json({ message: 'Investment plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting investment plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export {
  createPlan,
  getAllPlans,
  updatePlan,
  deletePlan
};

