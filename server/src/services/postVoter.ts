import { db } from '../config/db';
const UPVOTE = 1;
const VOTE_POINT = 2;

export async function addVote(postId: string, userId: string) {
  const existingUpvote = await db.upvote.findUnique({
    where: {
      postId_userId: { postId, userId },
    },
  });

  if (existingUpvote) {
    // User already upvoted, so we remove the upvote
    const orignalPost = await db.post.findFirstOrThrow({ where: { id: postId } });
    await db.$transaction([
      db.upvote.delete({
        where: {
          id: existingUpvote.id,
        },
      }),
      // decrease the score of the onwer of the post
      db.scores.update({
        where: {
          userId: orignalPost?.authorId!,
        },
        data: {
          score: {
            decrement: VOTE_POINT,
          },
        },
      }),
    ]);
    return 'Vote retracted';
  } else {
    // User has not upvoted, so we add an upvote
    const orignalPost = await db.post.findFirstOrThrow({ where: { id: postId } });
    await db.$transaction([
      db.upvote.create({
        data: {
          value: UPVOTE,
          postId,
          userId,
        },
      }),

      // increase the score of the onwer of the post
      db.scores.update({
        where: {
          userId: orignalPost?.authorId!,
        },
        data: {
          score: {
            increment: VOTE_POINT,
          },
        },
      }),
    ]);
    return 'Post upvoted';
  }
}

export async function getTotalVotes(postId: string) {
  const upvotes = await db.upvote.aggregate({
    _sum: {
      value: true,
    },
    where: {
      postId: postId,
    },
  });

  return upvotes._sum.value || 0;
}
