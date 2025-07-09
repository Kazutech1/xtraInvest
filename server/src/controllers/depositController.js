import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';
import { sendEmail } from '../config/email.js';

const prisma = new PrismaClient();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for memory storage (since we're uploading to Cloudinary)
const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
}).single('proofImage');

// Helper function to upload to Cloudinary
const uploadToCloudinary = (buffer, originalname) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: 'deposits', // Organize uploads in a folder
      public_id: `deposit-${uuidv4()}`, // Custom public ID
      resource_type: 'image',
      format: 'jpg', // Convert to jpg for consistency
      quality: 'auto', // Automatic quality optimization
      fetch_format: 'auto' // Automatic format optimization
    };

    cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(buffer);
  });
};

// Wrapper for async middleware
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Get deposit info
export const getDepositInfo = asyncHandler(async (req, res) => {
  const wallets = await prisma.adminWallet.findMany({
    where: { isActive: true },
    select: {
      currency: true,
      address: true,
      network: true
    }
  });

  res.json({
    depositWallets: wallets,
    minDeposit: 10
  });
});

// Submit deposit proof
export const submitDepositProof = asyncHandler(async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ 
        message: err instanceof multer.MulterError 
          ? err.message 
          : 'File upload failed'
      });
    }

    const { amount, currency, txHash } = req.body;
    const userId = req.user.id;
    
    // Validate required fields
    if (!amount || !currency || (!txHash && !req.file)) {
      return res.status(400).json({ 
        message: "Amount, currency, and either txHash or proof image are required" 
      });
    }

    // Verify wallet exists
    const wallet = await prisma.adminWallet.findFirst({
      where: { 
        currency,
        isActive: true 
      }
    });

    if (!wallet) {
      return res.status(400).json({ message: "Invalid currency selected" });
    }

    let proofImageUrl = null;
    
    // Upload image to Cloudinary if file exists
    if (req.file) {
      try {
        const uploadResult = await uploadToCloudinary(req.file.buffer, req.file.originalname);
        proofImageUrl = uploadResult.secure_url; // Use secure HTTPS URL
        
        console.log('Image uploaded to Cloudinary:', {
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id
        });
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).json({ 
          message: "Failed to upload image. Please try again." 
        });
      }
    }

    const userDepositEmailHtml = (amount, currency) => `
  <div style="font-family: 'Segoe UI', sans-serif; background-color: #f9f9f9; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden;">
      <div style="text-align: center; padding: 30px 20px; border-bottom: 1px solid #eee;">
        <img src="https://www.xtrainvest.top/assets/logo-De8ik9dj.png" alt="XtraInvest Logo" style="width: 100px; height: auto;" />
      </div>
      <div style="padding: 30px 20px; color: #1e293b;">
        <h2 style="margin-bottom: 16px;">Deposit Submitted</h2>
        <p style="margin-bottom: 12px;">
          Your deposit of 
          <strong style="color: #1e293b;">${currency} ${amount}</strong> 
          has been successfully submitted and is under review.
        </p>
        <p style="margin-bottom: 0;">
          You will receive another email as soon as your deposit is verified and confirmed by our team.
        </p>
      </div>
      <div style="padding: 20px; text-align: center; font-size: 12px; background-color: #f1f5f9; color: #475569;">
        Need help? Contact us at <a href="mailto:support@xtrainvest.top" style="color: #1e293b; text-decoration: none;">support@xtrainvest.top</a>
      </div>
    </div>
  </div>
`;


const adminDepositAlertHtml = (user, deposit) => `
  <h2 style="color:#1e293b;">🚨 New Deposit Submitted</h2>
  <p>A new deposit proof has been submitted:</p>
  <ul style="line-height:1.6;">
    <li><strong>User:</strong> ${user.fullName} (${user.email})</li>
    <li><strong>Amount:</strong> ${deposit.amount}</li>
    <li><strong>Currency:</strong> ${deposit.currency}</li>
    <li><strong>Tx Hash:</strong> ${deposit.txHash || '—'}</li>
    <li><strong>Status:</strong> ${deposit.status}</li>
    <li><strong>Submitted At:</strong> ${new Date().toLocaleString()}</li>
  </ul>
  ${deposit.proofImage ? `<p><strong>Proof:</strong><br/><img src="${deposit.proofImage}" alt="Proof Image" style="max-width: 400px;" /></p>` : ''}
`;



    // Create deposit record
    const deposit = await prisma.deposit.create({
      data: {
        userId,
        amount: parseFloat(amount),
        txHash: txHash || null,
        proofImage: proofImageUrl, // Store Cloudinary URL instead of local path
        status: "pending"
      }
    });

    const user = await prisma.user.findUnique({
  where: { id: userId },
  select: {
    fullName: true,
    email: true
  }
});

    try {
  await sendEmail({
    to: user.email,
    subject: 'Deposit Submitted – XtraInvest',
    html: userDepositEmailHtml(amount, currency),
    text: `Your deposit of ${currency} ${amount} has been received and is under review.`
  });
  console.log(`✅ Deposit confirmation email sent to ${user.email}`);
} catch (err) {
  console.error('❌ Failed to send deposit email to user:', err);
}

// ✅ Notify admin
try {
  await sendEmail({
    to: 'xtrainvest45@gmail.com',
    subject: `🚨 Deposit Alert: ${user.fullName}`,
    html: adminDepositAlertHtml(user, {
      amount,
      currency,
      txHash,
      proofImage: proofImageUrl,
      status: 'pending'
    }),
    text: `
New deposit submitted:

- User: ${user.fullName} (${user.email})
- Amount: ${amount}
- Currency: ${currency}
- Tx Hash: ${txHash || '—'}
- Status: pending
- Submitted At: ${new Date().toLocaleString()}
    `.trim()
  });
  console.log(`✅ Admin notified about deposit from ${user.fullName}`);
} catch (err) {
  console.error('❌ Failed to notify admin about deposit:', err);
}

    res.json({
      message: "Deposit submitted for verification",
      depositId: deposit.id,
      status: deposit.status,
      proofImageUrl: proofImageUrl // Return the URL for confirmation
    });
  });
});

export default {
  getDepositInfo,
  submitDepositProof
};