export type Post = {
  author: {
    id: string;
    email: string;
    name: string;
  };
  comments: Comment[];

  totalVotes: number;
  upvote: {
    id: string;
    value: number;
    postId: string;
    userId: string;
  }[];

  id: string;
  title: string;
  body: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Comment = {
  id: string;
  comment: string;
  postId: string;
  authorId: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  author: { id: string; email: string; name: string };
  replies: {
    id: string;
    comment: string;
    postId: string;
    authorId: string;
    parentId: string | null;
    createdAt: Date;
    updatedAt: Date;
    author: { id: string; email: string; name: string };
  }[];
};
export type Profile = {
  id: string;
  email: string;
  name: string;
  score: {
    id: string;
    userId: string;
    score: number;
  } | null;
};
