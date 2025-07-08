import prisma from '../config/database.js';
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