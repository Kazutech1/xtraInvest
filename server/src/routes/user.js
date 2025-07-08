// src/routes/user.js
import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getActiveInvestments, getDashboard, getPlans, getProfile, getReferral, getReferrals, getTransactionHistory, startInvestment, updateProfile } from '../controllers/userController.js';
import { requireUser } from '../middleware/adminAuth.js';


const router = express.Router();

// All user routes require authentication
router.use(authenticate, requireUser);

// User dashboard route
router.get('/dashboard', getDashboard);

// User profile routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// Referrals route
router.get('/referrals', getReferrals);
router.get('/referral', getReferral);



router.get("/plans", getPlans);
router.post('/invest',  startInvestment);
router.get("/investments/active", getActiveInvestments);

router.get("/transactions", getTransactionHistory);




export default router;