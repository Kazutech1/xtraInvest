// src/routes/user.js
import express from 'express';
// import { authenticateToken } from './middleware/auth.js';
import { 
  getDashboard,
  getProfile, 
  updateProfile,
  getReferrals
} from '../controllers/userController.js';
// import { authenticateToken } from '../middleware/auth.js';
import { loginUser, registerUser } from '../controllers/authController.js';
// import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All user routes require authentication
// router.use(authenticateToken);

router.post('/register', registerUser)
router.post('/login', loginUser)


export default router;