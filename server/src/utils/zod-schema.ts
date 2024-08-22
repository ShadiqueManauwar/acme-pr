import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().max(256).regex(/^\S*$/, 'Username must not contain spaces'),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const createPostSchema = z.object({
  title: z.string(),
  body: z.string(),
});

export const commentOnPostSchema = z.object({
  postId: z.string(),
  comment: z.string(),
});

export const replyOnCommentSchema = z.object({
  reply: z.string(),
  commentId: z.string(),
  postId: z.string(),
});
