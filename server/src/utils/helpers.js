import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Generates a random referral code
 * @returns {string} Random alphanumeric referral code in uppercase
 */
const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 15).toUpperCase();
};

/**
 * Hashes a password using bcrypt
 * @param {string} password - The password to hash
 * @returns {Promise<string>} Hashed password
 */
const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Compares a plain text password with a hashed password
 * @param {string} password - Plain text password
 * @param {string} hashedPassword - Hashed password to compare against
 * @returns {Promise<boolean>} True if passwords match
 */
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Generates a JWT token for a user
 * @param {string} userId - User ID to include in token
 * @returns {string} JWT token
 */
const generateToken = (id, isAdmin = false) => {
  const payload = isAdmin 
    ? { adminId: id, role: 'admin' }
    : { userId: id, role: 'user' };
    
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
};



/**
 * Calculates referral earnings (10% of amount)
 * @param {number} amount - The amount to calculate earnings from
 * @returns {number} Referral earnings amount
 */
const calculateReferralEarnings = (amount) => {
  return amount * 0.1; // 10% referral earnings
};

export {
  generateReferralCode,
  hashPassword,
  comparePassword,
  generateToken,
  calculateReferralEarnings
};