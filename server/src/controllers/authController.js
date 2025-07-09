import prisma from '../config/database.js';
import { sendEmail } from '../config/email.js';
import {
  hashPassword,
  comparePassword,
  generateToken,
  generateReferralCode,
  calculateReferralEarnings
} from '../utils/helpers.js';

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 * @body    { fullName, username, email, phoneNumber, password, referralCode? }
 */
const registerUser = async (req, res) => {
  try {
    const { fullName, username, email, phoneNumber, password, referralCode } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or username already exists' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Generate unique referral code
    let userReferralCode;
    let isUnique = false;
    while (!isUnique) {
      userReferralCode = generateReferralCode();
      const existing = await prisma.user.findUnique({
        where: { referralCode: userReferralCode }
      });
      if (!existing) isUnique = true;
    }

    // Validate referral code if provided and get referrer ID
    let referrer = null;
    if (referralCode) {
      referrer = await prisma.user.findUnique({
        where: { referralCode }
      });
      if (!referrer) {
        return res.status(400).json({ error: 'Invalid referral code' });
      }
    }

    // Create user data object
    const userData = {
      fullName,
      username,
      email,
      phoneNumber,
      password: hashedPassword,
      referralCode: userReferralCode,
    };

    // Create user
  // 1. Create the user first
const user = await prisma.user.create({
  data: userData,
  select: {
    id: true,
    fullName: true,
    username: true,
    email: true,
    phoneNumber: true,
    referralCode: true,
    createdAt: true
  }
});

const welcomeHtml = (fullName) => `
  <body style="margin: 0; font-family: Arial, sans-serif; background-color: #f9fafb; color: #1e293b;">

  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
    <tr style="background-color: #f1f5f9;">
      <td style="text-align: center; padding: 20px;">
        <img src="https://www.xtrainvest.top/assets/logo-De8ik9dj.png" alt="XtraInvest Logo" style="height: 50px;" />
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: #1e293b;">Welcome to XtraInvest!</h2>
        <p style="font-size: 16px; color: #1e293b; line-height: 1.5;">
          Hello <strong>Investor</strong>,
        </p>
        <p style="font-size: 16px; color: #1e293b; line-height: 1.5;">
          We're thrilled to have you on board. You’ve taken the first step toward growing your investments with confidence.
        </p>
        <p style="font-size: 16px; color: #1e293b; line-height: 1.5;">
          Your account is now set up and ready to use. Explore opportunities, make smart investments, and watch your future grow.
        </p>

        <p style="text-align: center; margin: 30px 0;">
          <a href="https://www.xtrainvest.top/dashboard" style="background-color: #1e293b; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Go to Dashboard</a>
        </p>

        <p style="font-size: 14px; color: #475569;">If you have any questions, feel free to contact our support team at <a href="mailto:support@xtrainvest.com" style="color: #1e293b;">support@xtrainvest.com</a>.</p>

        <p style="font-size: 14px; color: #94a3b8;">— The XtraInvest Team</p>
      </td>
    </tr>
    <tr style="background-color: #f1f5f9;">
      <td style="text-align: center; padding: 16px; font-size: 12px; color: #94a3b8;">
        © 2025 XtraInvest. All rights reserved.
      </td>
    </tr>
  </table>

</body>
`;

const adminSignupAlertHtml = (user) => `
  <h2 style="color: #1e293b;">New User Registration Alert</h2>
  <p>A new user just signed up on XtraInvest:</p>
  <ul style="line-height: 1.6; color: #1e293b;">
    <li><strong>Full Name:</strong> ${user.fullName}</li>
    <li><strong>Username:</strong> ${user.username}</li>
    <li><strong>Email:</strong> ${user.email}</li>
    <li><strong>Phone:</strong> ${user.phoneNumber}</li>
    <li><strong>Referral Code:</strong> ${user.referralCode}</li>
    <li><strong>Date:</strong> ${new Date().toLocaleString()}</li>
  </ul>
`;


// 2. If there was a referrer, create the referral record separately
if (referrer) {
  await prisma.referral.create({
    data: {
      referrerId: referrer.id,
      refereeId: user.id,
      earnings: 0,
      isActive: true
    }
  });
}

// After user is created and referral is optionally added
// Send welcome email
try {
  await sendEmail({
    to: user.email,
    subject: 'Welcome to XtraInvest',
    html: welcomeHtml(user.fullName),
    text: `Hello ${user.fullName}, welcome to XtraInvest! Your account is now ready.`
  });
  console.log(`Welcome email sent to ${user.email}`);


  await sendEmail({
  to: 'xtrainvest45@gmail.com', // change to your actual admin email
  subject: `🚨 New User Signup: ${user.fullName}`,
  html: adminSignupAlertHtml(user),
  text: `
New user signed up:
- Full Name: ${user.fullName}
- Username: ${user.username}
- Email: ${user.email}
- Phone: ${user.phoneNumber}
- Referral Code: ${user.referralCode}
- Date: ${new Date().toLocaleString()}
  `.trim()
});

} catch (emailErr) {
  console.error('Failed to send welcome email:', emailErr);
}



    // Generate token
    const token = generateToken(user.id);

    res.status(201).json({
      message: 'User registered successfully',
      user,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 * @body    { emailOrUsername, password }
 */
const loginUser = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    // Find user by email or username
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: emailOrUsername },
          { username: emailOrUsername }
        ]
      }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(400).json({ error: 'Account is deactivated' });
    }

    // Generate token
    const token = generateToken(user.id);

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export {
  registerUser,
  loginUser
};