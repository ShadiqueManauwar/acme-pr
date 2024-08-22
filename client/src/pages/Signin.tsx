import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { api } from '@/lib/axios-instance';
import { getAuthSession } from '@/lib/utils';

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSession = getAuthSession();
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const submitSignin = async () => {
    console.log({ password, email });

    if (!password || !email) {
      toast.error('One or more field missing');
      return;
    }
    setIsLoading(true);
    try {
      const res = await api.post('/signin', {
        email,
        password,
      });
      if (res.status !== 200) {
        throw new Error(res.data?.message || 'Something went wrong');
      }
      const data = (await res.data) as { token: string };
      Cookies.set('access_token', data.token, { secure: true, expires: 1 });

      setIsSuccess(true);
      navigate('/dashboard');
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
  };
  if (isSuccess || userSession) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <main className="flex justify-center items-center w-full min-h-full px-2 pt-20">
      <Card className="mx-auto w-full sm:max-w-sm md:w-[50%] lg:w-[26%]">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-2 relative">
              <Label htmlFor="password">Password</Label>
              <span onClick={() => setVisible(!visible)} className="absolute  top-[1.75rem] right-4">
                {visible ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </span>
              <Input
                id="password"
                type={visible ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  console.log(e.target.value);
                  setPassword(e.target.value);
                }}
              />
            </div>
            <Button type="submit" className="w-full" onClick={submitSignin} loading={isLoading} disabled={isLoading}>
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
