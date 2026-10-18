import { Navigate, Outlet, useLocation } from 'react-router-dom';

import Loader from './Loader.jsx';
import { useAuth } from '../context/AuthContext.jsx';

/**
 * Guard for every private route of the app.
 * Waits for the session to be restored from localStorage before deciding,
 * so a reload never flashes private content nor redirects by mistake.
 */
export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader text="Memeriksa sesi..." />;
  }

  if (!isAuthenticated) {
    const from = `${location.pathname}${location.search}`;
    return <Navigate to="/login" replace state={{ from }} />;
  }

  return <Outlet />;
}
