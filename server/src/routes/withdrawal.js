// src/routes/withdrawal.js
import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { handleValidationErrors, validateWithdrawal } from '../middleware/vallidation.js';
import { createWithdrawal, getUserWithdrawals, getWithdrawalById } from '../controllers/withdrawalController.js';
import { requireUser } from '../middleware/adminAuth.js';
// import { authenticateToken } from '../middleware/auth.js';
// import { 
//   validateWithdrawal, 
//   handleValidationErrors 
// } from '../middleware/validation.js';
// import {
//   createWithdrawal,
//   getUserWithdrawals,
//   getWithdrawalById
// } from '../controllers/withdrawalController.js';

const router = express.Router();

// Authentication middleware for all withdrawal routes
router.use(authenticate, requireUser);

// Create new withdrawal with validation
router.post(
  '/',
  createWithdrawal
);

// Get all user's withdrawals
router.get('/', getUserWithdrawals);

// Get specific withdrawal by ID
router.get('/:id', getWithdrawalById);

export default router;