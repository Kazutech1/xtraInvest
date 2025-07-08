import express from 'express';
import { addAdminWallet,  createPlan, deleteAdminWallet, deletePlan, deleteUser, deleteWithdrawal, getAdminWallets,   getAllPlans, getAllUsers, getAllWithdrawals, getDepositById, getDeposits, getUserById, loginAdmin, updateAdminWallet, updatePlan, updateUser, updateWithdrawalStatus, verifyDeposit } from '../controllers/adminController.js';
import {  requireAdmin } from '../middleware/adminAuth.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.post('/adlog', loginAdmin);

// Protected route example
// User Management
router.get('/users', authenticate, requireAdmin, getAllUsers);
router.get('/users/:id', authenticate, requireAdmin, getUserById);
router.put('/users/:id', authenticate, requireAdmin, updateUser);
router.delete('/users/:id', authenticate, requireAdmin, deleteUser);

// Deposit Management
router.get('/deposits',  authenticate, requireAdmin, getDeposits);
router.put('/deposits/verify', authenticate, requireAdmin, verifyDeposit);
router.get('/deposits/:depositId', authenticate, requireAdmin,  getDepositById);

// Withdrawal Management
router.get('/withdrawals', authenticate, requireAdmin, getAllWithdrawals);
router.put('/withdrawals/:id/status', authenticate, requireAdmin, updateWithdrawalStatus);
router.delete('/withdrawals/:id', authenticate, requireAdmin, deleteWithdrawal);

// Deposit Address Management
router.get('/wallets', authenticate, requireAdmin, getAdminWallets);
router.post('/wallets', authenticate, requireAdmin, addAdminWallet);
router.put('/wallets/:walletId', authenticate, requireAdmin, updateAdminWallet);
router.delete('/wallets/:walletId', authenticate, requireAdmin, deleteAdminWallet);

// Plan Management
router.post('/plans', authenticate, requireAdmin, createPlan);
router.get('/plans', authenticate, requireAdmin, getAllPlans);
router.put('/plans/:id', authenticate, requireAdmin, updatePlan);
router.delete('/plans/:id', authenticate, requireAdmin, deletePlan);
export default router;