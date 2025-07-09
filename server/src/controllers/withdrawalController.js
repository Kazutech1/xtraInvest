import prisma from '../config/database.js';
import { sendEmail } from '../config/email.js';

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

    const userWithdrawalEmailHtml = (amount, crypto) => `
  <div style="font-family: 'Segoe UI', sans-serif; background-color: #f9f9f9; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden;">
      <div style="text-align: center; padding: 30px 20px; border-bottom: 1px solid #eee;">
        <img src="https://www.xtrainvest.top/assets/logo-De8ik9dj.png" alt="XtraInvest Logo" style="width: 100px; height: auto;" />
      </div>
      <div style="padding: 30px 20px; color: #1e293b;">
        <h2 style="margin-bottom: 16px;">Withdrawal Requested</h2>
        <p style="margin-bottom: 12px;">
          You’ve successfully requested a withdrawal of 
          <strong style="color: #1e293b;">${crypto} ${amount}</strong>.
        </p>
        <p style="margin-bottom: 0;">
          We’re currently reviewing your request. You’ll receive a confirmation once it’s approved and processed.
        </p>
      </div>
      <div style="padding: 20px; text-align: center; font-size: 12px; background-color: #f1f5f9; color: #475569;">
        Need help? Contact us at <a href="mailto:support@xtrainvest.top" style="color: #1e293b; text-decoration: none;">support@xtrainvest.top</a>
      </div>
    </div>
  </div>
`;

const adminWithdrawalAlertHtml = (user, withdrawal) => `
  <div style="font-family: 'Segoe UI', sans-serif; background: #fff; padding: 20px; color: #1e293b;">
    <h2>🚨 New Withdrawal Request</h2>
    <p>A user has requested a withdrawal:</p>
    <ul style="line-height: 1.6;">
      <li><strong>User Email:</strong> ${user.email}</li>
      <li><strong>Amount:</strong> ${withdrawal.amount}</li>
      <li><strong>Currency:</strong> ${withdrawal.cryptocurrency}</li>
      <li><strong>Wallet Address:</strong> ${withdrawal.walletAddress}</li>
      <li><strong>Requested At:</strong> ${new Date().toLocaleString()}</li>
    </ul>
  </div>
`;


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

//     const userDetails = await prisma.user.findUnique({
//   where: { id: userId },
//   select: { email: true }
// });

    // Create the withdrawal request
    const withdrawal = await prisma.withdrawal.create({
      data: {
        userId,
        walletAddress,
        amount: parsedAmount,
        cryptocurrency
      }
    });


    const userDetails = await prisma.user.findUnique({
  where: { id: userId },
  select: { email: true }
});




    try {
  await sendEmail({
    to: userDetails.email,
    subject: 'Withdrawal Request Received – XtraInvest',
    html: userWithdrawalEmailHtml(parsedAmount, cryptocurrency),
    text: `Your withdrawal of ${cryptocurrency} ${parsedAmount} has been received and is under review.`
  });
  console.log(`✅ Withdrawal email sent to ${userDetails.email}`);
} catch (err) {
  console.error('❌ Failed to send withdrawal email to user:', err);
}

// Notify admin
try {
  await sendEmail({
    to: 'xtrainvest45@gmail.com',
    subject: `🚨 Withdrawal Alert`,
    html: adminWithdrawalAlertHtml(userDetails, withdrawal),
    text: `
New withdrawal request:

- Email: ${userDetails.email}
- Amount: ${parsedAmount}
- Crypto: ${cryptocurrency}
- Wallet: ${walletAddress}
- Date: ${new Date().toLocaleString()}
    `.trim()
  });
  console.log('✅ Admin notified of withdrawal request');
} catch (err) {
  console.error('❌ Failed to notify admin about withdrawal:', err);
}

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