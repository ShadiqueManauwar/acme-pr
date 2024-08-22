import { type Response, type Request, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../types/express';
import { db } from '../config/db';

// middleware to check if the user is authenticated
export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.sendStatus(401);
    }

    // find if the token is alreadt revoked/expired
    const tokenData = await db.revokedTokens.findFirst({ where: { token: token } });

    if (tokenData?.token === token) {
      throw new Error('Token expired');
    }
    try {
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        throw new Error('Secret not found');
      }

      const decoded = jwt.verify(token, secret) as User;

      req.user = decoded;
      console.log('Access granted');

      next();
    } catch (error) {
      return res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
}
