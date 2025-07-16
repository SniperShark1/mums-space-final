import { Request, Response, NextFunction } from 'express';
import { Clerk } from '@clerk/clerk-sdk-node';

// ✅ Initialize Clerk with the secret key from .env
const secretKey = process.env.CLERK_SECRET_KEY;
const clerk = secretKey ? Clerk({ secretKey }) : null;

// ✅ Middleware to verify authentication
export async function clerkMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // ✅ Skip auth check for public routes
    if (!req.path.startsWith('/api') || req.path === '/api/user') {
      return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const sessionToken = authHeader.replace('Bearer ', '');

    if (!clerk) {
      console.error('Clerk not initialized - missing CLERK_SECRET_KEY');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    try {
      const session = await clerk.verifyToken(sessionToken);
      if (!session) {
        return res.status(401).json({ message: 'Invalid session' });
      }

      (req as any).clerkSession = session;
      next();
    } catch (error) {
      console.error('Error verifying session token:', error);
      return res.status(401).json({ message: 'Invalid session' });
    }
  } catch (error) {
    console.error('Clerk middleware error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

// ✅ Helper to fetch a user from Clerk
export async function getClerkUser(userId: string) {
  if (!clerk) {
    console.error('Clerk not initialized - missing CLERK_SECRET_KEY');
    return null;
  }

  try {
    return await clerk.users.getUser(userId);
  } catch (error) {
    console.error('Error fetching user from Clerk:', error);
    return null;
  }
}