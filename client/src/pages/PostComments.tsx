import { useParams } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Comment, Post } from 'types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { api } from '@/lib/axios-instance';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import moment from 'moment';
import { ArrowBigUp, MessageSquare } from 'lucide-react';
import { getAuthSession } from '@/lib/utils';
import { PostPageLoading } from '@/components/loading-page';

export default function PostComments() {
  const params = useParams();
  const [post, setPost] = useState<Post | undefined>();
  const [refetch, setRefetch] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutationPending, setIsMutationPending] = useState(false);
  const [commentText, setCommentText] = useState<string>('');

  useEffect(() => {
    async function getPost() {
      try {
        console.log({ params });

        const res = await api.get(`/posts/${params?.postId}`);
        if (res.status !== 200) {
          throw new Error('Error getting post data');
        }
        const data = res.data?.post as Post | undefined;
        setPost(data);
      } catch (error: any) {
        let errMsg = '';
        if (error instanceof AxiosError) {
          errMsg = error.response?.data?.message;
        } else {
          errMsg = error?.message || 'Something went wrong. Please try again';
        }

        toast.error('Error', { description: errMsg });
      } finally {
        setIsLoading(false);
        setRefetch(false);
      }
    }
    if (refetch) {
      getPost();
    }
  }, [refetch]);

  const handlePostComment = async () => {
    try {
      setIsMutationPending(true);
      const response = await api.post('/posts/comment', {
        comment: commentText,
        postId: params?.postId,
      });
      if (response.status !== 201) {
        throw new Error(`Error Commenting the post`);
      }
      setRefetch(true);
      setCommentText('');
    } catch (error: any) {
      console.error('Failed to post comment:', error);
      let errMsg = '';
      if (error instanceof AxiosError) {
        errMsg = error.response?.data?.message;
      } else {
        errMsg = error?.message || 'Something went wrong. Please try again';
      }

      toast.error('Error', { description: errMsg });
    } finally {
      setIsMutationPending(false);
    }
  };

  const handleVote = async () => {
    try {
      const res = await api.post('/posts/vote', { postId: params?.postId });
      if (res.status !== 200) {
        throw new Error(`Error Voting post`);
      }
      setPost((prevPost) => ({ ...prevPost!, totalVotes: res.data.totalVotes as number }));
      setRefetch(true);
    } catch (error: any) {
      let errMsg = '';
      if (error instanceof AxiosError) {
        errMsg = error.response?.data?.message;
      } else {
        errMsg = error?.message || 'Something went wrong. Please try again';
      }

      toast.error('Error', { description: errMsg });
    }
  };
  if (isLoading) {
    return <PostPageLoading />;
  }
  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4 md:px-0 bg-background">
      <PostContainer post={post} onVote={handleVote} />
      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold">Comments</h2>
        <div className="space-y-6">
          {post && (
            <div className="flex items-start gap-4">
              <div className="flex-1 pb-6">
                <Textarea
                  placeholder="Add a comment..."
                  className="mb-2 "
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button
                  size="sm"
                  onClick={async () => {
                    if (!commentText) {
                      toast.error('No Input');
                      return;
                    }
                    await handlePostComment();
                  }}
                  loading={isMutationPending}
                >
                  Post Comment
                </Button>
              </div>
            </div>
          )}
          <div className="space-y-4  ">
            {post?.comments.map(
              (comment) =>
                !comment.parentId && <CommentThread key={comment.id} comment={comment} setRefetch={setRefetch} />,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type CommentThreadProps = {
  comment: Comment;
  setRefetch: Dispatch<SetStateAction<boolean>>;
};

function CommentThread({ comment, setRefetch }: CommentThreadProps) {
  const [replyText, setReplyText] = useState<string>('');
  const [showReplyArea, setShowReplyArea] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleReply = async () => {
    setIsLoading(true);
    try {
      const response = await api.post(`/posts/comment/reply`, {
        reply: replyText,
        commentId: comment.id,
        postId: comment.postId,
      });
      if (response.status !== 201) {
        throw new Error('Something went wrong');
      }
      setReplyText('');
      setRefetch(true);
    } catch (error: any) {
      console.error('Failed to post reply:', error);
      let errMsg = '';
      if (error instanceof AxiosError) {
        errMsg = error.response?.data?.message;
      } else {
        errMsg = error?.message || 'Something went wrong. Please try again';
      }

      toast.error('Error', { description: errMsg });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className=" pb-4 ">
      <div className="bg-foreground/10 p-2 space-y-2 rounded-md">
        <div className="flex items-center gap-2 font-bold ">
          <p className="text-sm">u/{comment.author.name}</p>
          <div className="text-xs font-medium text-muted-foreground">{moment(comment.createdAt).fromNow()}</div>
        </div>
        <p className="mt-1 ">{comment.comment}</p>
        <span
          className="flex justify-start items-center gap-2 cursor-pointer hover:bg-foreground/5 w-fit  p-1 rounded"
          onClick={() => setShowReplyArea(!showReplyArea)}
        >
          <MessageSquare /> <p>Reply</p>
        </span>
        {showReplyArea && (
          <div className="mt-4 flex items-start gap-4">
            <div className="flex-1">
              <Textarea
                placeholder="Reply to this comment..."
                className="mb-2 resize-none bg-background/60"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <Button size="sm" onClick={handleReply} loading={isLoading} disabled={isLoading}>
                Post Reply
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className=" space-y-4 border-l-2 border-foreground/40 ml-4 w-full ">
        {comment.replies.map((reply) => (
          <>
            <div key={reply.id} className="p-2">
              <div className="flex items-center gap-2 ">
                <p className="font-bold text-sm">u/{reply.author?.name}</p>
                <div className="text-xs text-muted-foreground">{moment(reply.createdAt).fromNow()}</div>
              </div>
              <p className="mt-1">{reply.comment}</p>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
function PostContainer(props: { post: Post | undefined; onVote: () => Promise<void> }) {
  if (!props.post) {
    return <Card className="p-4">Invalid Post</Card>;
  }
  const isUpvoted = props.post.upvote.find((item) => item.userId === getAuthSession()?.userId);
  return (
    <Card className="space-y-6">
      <CardHeader>
        <CardTitle className="text-3xl font-bold mb-2">{props.post.title}</CardTitle>
        <CardDescription className="flex justify-start items-center gap-2">
          Posted by <p className="font-bold">u/{props.post.author.name}</p> on{' '}
          {moment(props.post.createdAt!).format('MMM D, YYYY')}
        </CardDescription>
      </CardHeader>
      <CardContent>{props.post.body}</CardContent>
      <CardFooter className="justify-start gap-12 border-t  p-4">
        <span className="flex justify-start items-center gap-1 cursor-pointer" onClick={props.onVote}>
          <ArrowBigUp fill={isUpvoted ? 'currentColor' : 'none'} />
          <p>{props.post.totalVotes}</p>
        </span>
      </CardFooter>
    </Card>
  );
}
