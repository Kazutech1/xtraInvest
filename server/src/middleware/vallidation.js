import { body, validationResult } from 'express-validator';

const validateRegistration = [
  body('fullName').trim().isLength({ min: 2 }).withMessage('Full name must be at least 2 characters'),
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('phoneNumber').trim().isLength({ min: 10 }).withMessage('Phone number must be at least 10 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('referralCode').optional().trim()
];

const validateLogin = [
  body('emailOrUsername').trim().isLength({ min: 1 }).withMessage('Email or username is required'),
  body('password').isLength({ min: 1 }).withMessage('Password is required')
];

const validateDeposit = [
  body('amount').isFloat({ min: 1 }).withMessage('Amount must be greater than 0'),
  body('note').optional().trim()
];

const validateWithdrawal = [
  body('walletAddress').trim().isLength({ min: 1 }).withMessage('Wallet address is required'),
  body('amount').isFloat({ min: 1 }).withMessage('Amount must be greater than 0'),
  body('cryptocurrency').trim().isLength({ min: 1 }).withMessage('Cryptocurrency is required')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export {
  validateRegistration,
  validateLogin,
  validateDeposit,
  validateWithdrawal,
  handleValidationErrors
};