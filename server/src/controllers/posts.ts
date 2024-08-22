import { type Response, type Request, type NextFunction } from 'express';
import dotenv from 'dotenv';
import { db } from '../config/db';
import { commentOnPostSchema, createPostSchema, replyOnCommentSchema } from '../utils/zod-schema';
import { z } from 'zod';
import { addVote } from '../services/postVoter';

const COMMENT_POINTS_FOR_AUTHOR: Readonly<number> = 5;
const COMMENT_FOR_USER: Readonly<number> = 3;

dotenv.config();
const NEW_POST_SCORE = 10;
export async function createPost(req: Request, res: Response, next: NextFunction) {
  const body = await req.body;
  const user = await req.user;
  try {
    if (!user || !user.userId) {
      return res.status(403);
    }

    const bodyParsed = createPostSchema.parse(body);
    const transcationRes = await db.$transaction([
      db.post.create({
        data: {
          title: bodyParsed.title,
          body: bodyParsed.body,
          authorId: user.userId,
        },
      }),
      db.scores.upsert({
        where: { userId: user.userId },
        create: {
          userId: user.userId,
          score: NEW_POST_SCORE,
        },
        update: {
          score: {
            increment: NEW_POST_SCORE,
          },
        },
      }),
    ]);
    if (!transcationRes) {
      throw new Error('Could not create post');
    }

    return res.status(201).json({ postId: transcationRes[0].id });
  } catch (error) {
    next(error); // Pass errors to your error-handling middleware
  }
}

export async function getPost(req: Request, res: Response, next: NextFunction) {
  const user = req.user;

  try {
    if (!user || !user.userId) {
      return res.status(403);
    }
    const { postId } = z.object({ postId: z.string() }).parse(req.params);
    const post = await db.post.findFirst({
      where: { id: postId },
      include: {
        author: {
          select: {
            email: true,
            id: true,
            name: true,
          },
        },
        comments: {
          orderBy: { updatedAt: 'desc' },
          include: {
            author: {
              select: {
                email: true,
                id: true,
                name: true,
              },
            },
            replies: {
              orderBy: { updatedAt: 'desc' },
              include: {
                author: {
                  select: {
                    email: true,
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
        upvote: true,
      },
    });
    if (!post) {
      throw new Error('Post not found');
    }

    const totalVotes = post.upvote.reduce((sum, upvote) => sum + upvote.value, 0);

    return res.status(200).json({ post: { ...post, totalVotes } });
  } catch (error) {
    next(error); // Pass errors to your error-handling middleware
  }
}

export async function getAllPosts(req: Request, res: Response, next: NextFunction) {
  const user = req.user;

  try {
    if (!user || !user.userId) {
      console.log('lo');

      throw new Error('Please login ');
    }
    const posts = await db.post.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        author: true,
        comments: {
          orderBy: { updatedAt: 'desc' },
        },
        upvote: true,
      },
    });
    const postsWithTotalVotes = posts.map((post) => {
      const totalVotes = post.upvote.reduce((sum, upvote) => sum + upvote.value, 0);

      return {
        ...post,
        totalVotes,
      };
    });

    return res.status(200).json({ posts: postsWithTotalVotes });
  } catch (error) {
    next(error); // Pass errors to your error-handling middleware
  }
}

export async function getUserPosts(req: Request, res: Response, next: NextFunction) {
  const user = req.user;

  try {
    if (!user || !user.userId) {
      console.log('lo');

      throw new Error('Please login ');
    }
    const posts = await db.post.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        author: true,
        comments: {
          orderBy: { updatedAt: 'desc' },
        },
        upvote: true,
      },
      where: { authorId: user.userId },
    });
    const postsWithTotalVotes = posts.map((post) => {
      const totalVotes = post.upvote.reduce((sum, upvote) => sum + upvote.value, 0);

      return {
        ...post,
        totalVotes,
      };
    });

    return res.status(200).json({ posts: postsWithTotalVotes });
  } catch (error) {
    next(error); // Pass errors to your error-handling middleware
  }
}

export async function voteAPost(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  try {
    const body = z.object({ postId: z.string() }).parse(await req.body);

    if (!user || !user.userId) {
      console.log('Please Login');

      throw new Error('Please login ');
    }
    const message = await addVote(body.postId, user.userId);

    return res.status(200).json({ message });
  } catch (error) {
    next(error); // Pass errors to your error-handling middleware
  }
}

export async function commentOnPost(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  try {
    if (!user || !user?.userId) {
      throw new Error('Login to comment');
    }
    const { comment, postId } = commentOnPostSchema.parse(await req.body);
    const orignalPost = await db.post.findFirstOrThrow({ where: { id: postId } });
    const newComment = await db.$transaction([
      db.scores.upsert({
        where: {
          userId: user.userId,
        },
        update: {
          score: {
            increment: COMMENT_FOR_USER,
          },
        },
        create: {
          userId: user.userId,
          score: COMMENT_FOR_USER,
        },
      }),
      db.scores.update({
        where: { userId: orignalPost.authorId },
        data: { score: { increment: COMMENT_POINTS_FOR_AUTHOR } },
      }),
      db.comment.create({
        data: {
          comment,
          postId,
          authorId: user.userId,
        },
      }),
    ]);

    res.status(201).json({ comment: newComment });
  } catch (error) {
    next(error); // Pass errors to your error-handling middleware
  }
}

export async function replyOnComment(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  try {
    if (!user || !user?.userId) {
      throw new Error('Login to Reply');
    }
    const { commentId, reply, postId } = replyOnCommentSchema.parse(await req.body);
    const newReply = await db.comment.create({
      data: {
        comment: reply,
        parentId: commentId,
        postId: postId,
        authorId: user.userId,
      },
    });

    res.status(201).json({ reply: newReply });
  } catch (error) {
    next(error); // Pass errors to your error-handling middleware
  }
}
