import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';

const baseLink = 'rounded-lg px-3 py-2 font-medium transition-colors';

const linkClass = ({ isActive }) =>
  `${baseLink} ${
    isActive
      ? 'bg-blue-50 text-blue-600'
      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
  }`;

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Forward the "intended page" so an auth link keeps the post-login redirect target.
  const authLinkState = location.state;

  const handleLogout = () => {
    logout();
    // Intentional: after logout the landing page is the login page.
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-[60px] w-full max-w-[1100px] items-center justify-between gap-4 px-4">
        <NavLink to="/" className="text-lg font-bold text-blue-600">
          Toko Online
        </NavLink>
        <nav className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <NavLink to="/" end className={linkClass}>
                Beranda
              </NavLink>
              <NavLink to="/products" className={linkClass}>
                Produk
              </NavLink>
              <NavLink to="/profile" className={linkClass}>
                {user?.nama || 'Profil'}
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className={`${baseLink} text-red-600 hover:bg-red-50`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" state={authLinkState} className={linkClass}>
                Masuk
              </NavLink>
              <NavLink
                to="/register"
                state={authLinkState}
                className={linkClass}
              >
                Daftar
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
