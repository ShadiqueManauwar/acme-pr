import { Link, useLocation, useNavigate } from 'react-router-dom';

import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { CircleUser, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ModeToggle } from './mode-toggle';
import { api } from '@/lib/axios-instance';
import { cn, getAuthSession } from '@/lib/utils';
import Cookies from 'js-cookie';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const userSession = getAuthSession();

  async function handleLogOut() {
    try {
      const res = await api.post('/signout');
      if (res.status !== 200) {
        throw new Error(res.data);
      }
      Cookies.remove('access_token');
      navigate('/signin');
    } catch (error: any) {
      let errMsg = '';
      if (error instanceof AxiosError) {
        errMsg = error.response?.data?.message;
      } else {
        errMsg = error?.message || 'Something went wrong. Please try again';
      }

      toast.error('Error', { description: errMsg });
    }
  }

  if (!userSession) {
    return <PublicNavbar />;
  }
  return (
    <header className="sticky top-0 justify-between w-full flex h-16 items-center gap-4 border-b bg-background px-4 md:px-12 lg:px-20 z-50">
      <nav className="hidden   gap-6 text-lg font-medium md:flex md:justify-start w-full  md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link to="/" className="flex items-center justify-center gap-2 text-lg font-semibold md:text-base">
          <img src="/logo.png" width={32} height={32} />
          <span className="min-w-fit ">Acme Inc</span>
        </Link>
        <Link
          to="/dashboard"
          className={cn(
            'text-muted-foreground hover:text-foreground rounded px-2 py-1',
            location.pathname.includes('/dashboard') && 'font-bold text-primary bg-primary/10',
          )}
        >
          Dashboard
        </Link>
        <Link
          to="/user-posts"
          className={cn(
            'text-muted-foreground hover:text-foreground min-w-fit rounded px-2 py-1',
            location.pathname.includes('/user-posts') && 'font-bold text-primary bg-primary/10',
          )}
        >
          My Posts
        </Link>
        <Link
          to={`/profile/${userSession.name}`}
          className={cn(
            'text-muted-foreground hover:text-foreground  rounded px-2 py-1',
            location.pathname.includes('/profile') && 'font-bold text-primary bg-primary/10',
          )}
        >
          Profile
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-2 text-lg font-medium">
            <Link to="#" className="flex items-center gap-2 text-lg font-semibold">
              <img src="/logo.png" width={32} height={32} />
              <span className="">Acme Inc</span>
            </Link>
            <Link
              to="/dashboard"
              className={cn(
                'text-muted-foreground hover:text-foreground  rounded p-2 mt-12 ',
                location.pathname.includes('/dashboard') && 'font-bold text-primary bg-primary/10',
              )}
            >
              Dashboard
            </Link>
            <Link
              to="/user-posts"
              className={cn(
                'text-muted-foreground hover:text-foreground  rounded p-2',
                location.pathname.includes('/user-posts') && 'font-bold text-primary bg-primary/10',
              )}
            >
              My Posts
            </Link>
            <Link
              to={`/profile/${userSession.name}`}
              className={cn(
                'text-muted-foreground hover:text-foreground  rounded p-2',
                location.pathname.includes('/profile') && 'font-bold text-primary bg-primary/10',
              )}
            >
              Profile
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          <ModeToggle />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link
                to={`/profile/${userSession.name}`}
                className="block w-full transition-colors hover:text-foreground"
              >
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export function PublicNavbar() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link to="/" className="flex justify-center items-center gap-2 text-lg font-semibold md:text-base">
          <img src="/logo.png" width={32} height={32} />
          <span className="min-w-fit">Acme Inc</span>
        </Link>
      </nav>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          <ModeToggle />
        </div>
        <Button>
          <Link to={'/signin'}>Sign in</Link>
        </Button>
        <Button>
          <Link to={'/signup'}>Sign up</Link>
        </Button>
      </div>
    </header>
  );
}
