import { useEffect, useState } from 'react';
import { ArrowBigUp, MessageSquare } from 'lucide-react';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import moment from 'moment';
import type { Post } from '../../types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { api } from '@/lib/axios-instance';
import { getAuthSession } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { PostCardsLoading } from '@/components/loading-page';

export function UsersPosts() {
  const [posts, setPosts] = useState<Post[] | undefined>([]);
  const [refetch, setRefetch] = useState(true);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getAllPosts() {
      try {
        const res = await api.get('/posts/user-posts/');
        if (res.status !== 200) {
          throw new Error('Error getting all posts');
        }
        const allPosts = res.data?.posts as Post[] | undefined;
        setPosts(allPosts);
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
      getAllPosts();
    }
  }, [refetch]);

  const handleVote = async (postId: string) => {
    try {
      const res = await api.post('/posts/vote', { postId });
      if (res.status !== 200) {
        throw new Error(`Error Voting post`);
      }
      setPosts((posts) =>
        posts?.map((post) => (post.id === postId ? { ...post, totalVotes: res.data.totalVotes } : post)),
      );
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
    return <PostCardsLoading />;
  }
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid w-full md:w-[70%] lg:w-[60%] flex-1 auto-rows-max gap-4">
            <section className="space-y-6">
              <h1 className="font-bold text-lg">Your Posts</h1>
              {posts?.map((post) => {
                const userSession = getAuthSession();
                const isUpvoted = post.upvote.find((item) => item.userId === userSession?.userId);

                return (
                  <Card
                    key={post.id}
                    x-chunk="dashboard-01-chunk-1"
                    className="hover:shadow-lg hover:border-primary duration-200 gap-2 px-4"
                  >
                    <div className="min-w-full">
                      <Link to={`/dashboard/${post.id}`}>
                        <CardHeader className="space-y-2 cursor-pointer ">
                          <CardTitle className="text-sm flex justify-start items-center gap-1">
                            <p>u/{post.author.name}</p>
                            <p className="text-xs ml-2">{moment(post.updatedAt).fromNow()}</p>
                          </CardTitle>
                          <CardTitle>{post.title}</CardTitle>
                        </CardHeader>
                      </Link>

                      <CardContent>
                        <CardDescription className="">{post.body}</CardDescription>
                      </CardContent>
                      <CardFooter className="justify-start gap-12 border-t  p-4">
                        <span
                          className="flex justify-start items-center gap-1 cursor-pointer"
                          onClick={() => handleVote(post.id)}
                        >
                          <ArrowBigUp fill={isUpvoted ? 'currentColor' : 'none'} />
                          <p>{post.totalVotes}</p>
                        </span>

                        <span className="flex justify-start items-center gap-1">
                          <MessageSquare fill={'none'} />
                          <p>{post.comments.length || 0}</p>
                        </span>
                      </CardFooter>
                    </div>
                  </Card>
                );
              })}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
