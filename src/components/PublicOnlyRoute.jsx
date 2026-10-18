import { Navigate, Outlet, useLocation } from 'react-router-dom';

import Loader from './Loader.jsx';
import { useAuth } from '../context/AuthContext.jsx';

/**
 * Guard for the public auth pages (/login, /register).
 *
 * It also performs the post-authentication redirect: once the visitor becomes
 * authenticated, this component sends them back to the page they originally
 * requested (set by ProtectedRoute) or to Home. Keeping the redirect here means
 * a single, declarative mechanism instead of racing an imperative navigate()
 * inside the form handlers.
 */
export default function PublicOnlyRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader text="Memeriksa sesi..." />;
  }

  if (isAuthenticated) {
    const from = location.state?.from || '/';
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
}
