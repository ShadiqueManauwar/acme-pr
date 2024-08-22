import { type Response, type Request, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { genHash } from '../services/genPasswordHash';
import { db } from '../config/db';
import { compare } from 'bcryptjs';
import { signinSchema, signupSchema } from '../utils/zod-schema';

dotenv.config();

export async function signup(req: Request, res: Response, next: NextFunction) {
  const body = await req.body;

  try {
    const bodyParsed = signupSchema.safeParse(body);
    if (!bodyParsed.success) {
      const err = bodyParsed.error.flatten();
      throw new Error(
        err.fieldErrors?.email?.at(0) || err.fieldErrors?.name?.at(0) || err.fieldErrors?.password?.at(0),
      );
    }
    const { password, email, name } = bodyParsed.data;
    const hashedPassword = await genHash(password);
    const user = await db.user.findFirst({ where: { email: email } });
    if (user) {
      throw new Error('Account Exsists for this email');
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('Secret not found');
    }
    const userCreated = await db.user.create({
      data: {
        email: email,
        name: name.toLowerCase(),
        password: hashedPassword,
      },
    });
    if (!userCreated) {
      throw new Error('Could not create user');
    }
    const token = await jwt.sign(
      {
        userId: userCreated.id,
        name: userCreated.name.toLowerCase(),
        email: userCreated.email,
      },
      secret,
      { expiresIn: '24h' },
    );

    const revokedToken = await db.revokedTokens.findFirst({ where: { token: token } });
    if (revokedToken) {
      await db.revokedTokens.delete({ where: { token: token } });
    }

    return res.status(201).json({ token });
  } catch (error) {
    next(error); // Pass errors to your error-handling middleware
  }
}

export async function signin(req: Request, res: Response, next: NextFunction) {
  const body = await req.body;
  console.log('Logging in');

  try {
    const bodyParsed = signinSchema.safeParse(body);
    if (!bodyParsed.success) {
      throw new Error('Invalid Credentials');
    }
    const { password, email } = bodyParsed.data;
    const user = await db.user.findFirst({ where: { email: email } });
    if (!user) {
      throw new Error('User not found');
    }
    console.log({ password, email, user });
    const isSamePass = await compare(password, user.password);
    if (!isSamePass) {
      throw new Error('Invalid Pasword');
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('Secret not found');
    }
    const token = await jwt.sign(
      {
        userId: user.id,
        name: user.name,
        email: user.email,
      },
      secret,
      { expiresIn: '24h' },
    );

    const revokedToken = await db.revokedTokens.findFirst({ where: { token: token } });
    if (revokedToken) {
      await db.revokedTokens.delete({ where: { token: token } });
    }

    return res.status(200).json({ token });
  } catch (error) {
    next(error); // Pass errors to your error-handling middleware
  }
}

export async function signOut(req: Request, res: Response, next: NextFunction) {
  try {
    console.log('[Signing out]');
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      await db.revokedTokens.create({
        data: {
          token: token,
        },
      });
    }
    return res.clearCookie('access_token', { path: '/' }).status(200).json({ message: 'singout success' });
  } catch (error) {
    next(error);
  }
}
