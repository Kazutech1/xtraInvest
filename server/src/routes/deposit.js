import express from 'express';

import { 
  // createDeposit, 
  // getDepositAddresses,
  getDepositInfo,
  submitDepositProof
} from '../controllers/depositController.js';
// import upload from '../utils/fileUpload.js';
// import { authenticateToken } from '../middleware/auth.js';
// import { handleValidationErrors, validateDeposit } from '../middleware/vallidation.js';
import { authenticate } from '../middleware/auth.js';
import { requireUser } from '../middleware/adminAuth.js';

const router = express.Router();

// All deposit routes require authentication
router.use(authenticate, requireUser);

router.get('/info',  getDepositInfo);
router.post('/submit',  (req, res, next) => {
  submitDepositProof(req, res, next);
});


export default router;