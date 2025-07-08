import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';

const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check for admin first
    if (decoded.adminId) {
      const admin = await prisma.admin.findUnique({
        where: { id: decoded.adminId },
        select: { id: true, username: true }
      });

      if (!admin) {
        return res.status(401).json({ error: 'Admin not found' });
      }

      req.user = { ...admin, role: 'admin' };
      return next();
    }

    // Check for regular user
    if (decoded.userId) {
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          fullName: true,
          username: true,
          email: true,
          phoneNumber: true,
          referralCode: true,
          totalBalance: true,
          totalProfit: true,
          referralBalance: true,
          currentPlan: true,
          isActive: true,
          createdAt: true
        }
      });

      if (!user || !user.isActive) {
        return res.status(401).json({ error: 'User not found or inactive' });
      }

      req.user = { ...user, role: 'user' };
      return next();
    }

    return res.status(403).json({ error: 'Invalid token payload' });

  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(403).json({ error: 'Token expired' });
    }
    
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    
    return res.status(500).json({ error: 'Authentication failed' });
  }
};

export { authenticate };

