import { Card } from '@/components/ui/card';
import { api } from '@/lib/axios-instance';
import { UserIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { Profile } from 'types';
import { useParams } from 'react-router-dom';
import { ProfileLoadingPage } from '@/components/loading-page';
import {
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from 'react-share';
import { getAuthSession } from '@/lib/utils';

export default function ProfilePage() {
  const currUrl = window.location.href;
  const params = useParams();
  const userSession = getAuthSession();

  const [profileData, setProfileData] = useState<Profile | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const shareContent =
    profileData &&
    `I'm proud to share my latest achievements with you. My current score is ${profileData?.score?.score || 0}. Join me in celebrating success!`;

  useEffect(() => {
    async function getProfileData() {
      try {
        const res = await api.get(`/profile/${params.username?.toLowerCase()}`);
        if (res.status !== 200) {
          throw new Error('Error getting all posts');
        }
        const data = res.data?.profileInfo as Profile | undefined;
        setProfileData(data);
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
      }
    }
    getProfileData();
  }, []);
  if (isLoading) {
    return <ProfileLoadingPage />;
  }
  return (
    <main className="flex flex-col items-center justify-center pt-24 bg-background">
      <Card className="w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <UserIcon size={100} />
          <div className="text-center">
            <h2 className="text-2xl font-bold">{profileData?.name}</h2>
            <p className="text-muted-foreground">{profileData?.email}</p>
          </div>
          <div className="bg-primary rounded-lg px-6 py-2 text-primary-foreground font-bold text-4xl">
            {profileData?.score?.score || 0}
          </div>
          {userSession?.userId === profileData?.id && (
            <div className="flex gap-4">
              <TwitterShareButton url={currUrl} title={shareContent} className="" tabIndex={1}>
                <XIcon size={32} className="rounded-lg" />
              </TwitterShareButton>
              <TelegramShareButton url={currUrl} title={shareContent}>
                <TelegramIcon size={32} className="rounded-lg" />
              </TelegramShareButton>
              <RedditShareButton url={currUrl} title={shareContent}>
                <RedditIcon size={32} className="rounded-lg" />
              </RedditShareButton>
              <WhatsappShareButton url={currUrl} title={shareContent} separator=":: ">
                <WhatsappIcon size={32} className="rounded-lg" />
              </WhatsappShareButton>
              <LinkedinShareButton url={currUrl}>
                <LinkedinIcon size={32} className="rounded-lg" />
              </LinkedinShareButton>
            </div>
          )}
        </div>
      </Card>
    </main>
  );
}
