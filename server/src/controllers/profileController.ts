import { type Response, type Request, type NextFunction } from 'express';
import { db } from '../config/db';
import { z } from 'zod';

export async function getProfileInfo(req: Request, res: Response, next: NextFunction) {
  try {
    const { username } = z
      .object({ username: z.string().max(256).regex(/^\S*$/, 'Username must not contain spaces') })
      .parse(req.params);
    const profileInfo = await db.user.findFirst({
      where: { name: username },

      select: {
        email: true,
        id: true,
        name: true,
        score: true,
      },
    });

    return res.status(200).json({ profileInfo });
  } catch (error) {
    next(error); // Pass errors to your error-handling middleware
  }
}
