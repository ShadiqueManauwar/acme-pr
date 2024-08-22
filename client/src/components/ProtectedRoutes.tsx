import { getAuthSession } from '@/lib/utils';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute is a component that enforces access control for routes.
 *
 * If a user is authenticated (has a valid token), the component renders the route content.
 * If the user is not authenticated, they are redirected to the login page.
 *
 * @returns {JSX.Element} The rendered JSX element, either the route content or a redirection to the login/home page.
 */
export function ProtectedRoute() {
  const location = useLocation();

  const userSession = getAuthSession();
  console.log({ userSession });

  if (!userSession) {
    console.log('Redirecting to login page');
    return <Navigate to={'/signin'} replace state={{ path: location.pathname }} />;
  }

  return <Outlet />;
}
