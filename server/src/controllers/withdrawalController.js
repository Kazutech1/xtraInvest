import prisma from '../config/database.js';

/**
 * @desc    Create a new withdrawal
 * @route   POST /api/withdrawal
 * @access  Private
 * @body    { walletAddress, amount, cryptocurrency }
 */
const createWithdrawal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { walletAddress, amount, cryptocurrency } = req.body;

    const parsedAmount = parseFloat(amount);

    // Get user's current profit balance
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { totalProfit: true }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.totalProfit < parsedAmount) {
      return res.status(400).json({ error: 'Insufficient profit balance' });
    }

    // Create the withdrawal request
    const withdrawal = await prisma.withdrawal.create({
      data: {
        userId,
        walletAddress,
        amount: parsedAmount,
        cryptocurrency
      }
    });

    // Subtract the amount from totalProfit
    await prisma.user.update({
      where: { id: userId },
      data: {
        totalProfit: {
          decrement: parsedAmount,
        }
      }
    });

    res.status(201).json({
      message: 'Withdrawal request created successfully',
      withdrawal
    });

  } catch (error) {
    console.error('Withdrawal creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



/**
 * @desc    Get user withdrawals
 * @route   GET /api/withdrawal
 * @access  Private
 */
const getUserWithdrawals = async (req, res) => {
  try {
    const userId = req.user.id;

    const withdrawals = await prisma.withdrawal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    res.json(withdrawals);
  } catch (error) {
    console.error('Get withdrawals error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * @desc    Get withdrawal by ID
 * @route   GET /api/withdrawal/:id
 * @access  Private
 */
const getWithdrawalById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const withdrawal = await prisma.withdrawal.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!withdrawal) {
      return res.status(404).json({ error: 'Withdrawal not found' });
    }

    res.json(withdrawal);
  } catch (error) {
    console.error('Get withdrawal error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export {
  createWithdrawal,
  getUserWithdrawals,
  getWithdrawalById
};