import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Intentional: after logout the landing page is the login page.
    navigate('/login', { replace: true });
  };

  return (
    <section className="mx-auto max-w-[520px]">
      <h1 className="mb-1 text-2xl font-bold">Profil Saya</h1>
      <p className="mb-5 text-slate-500">
        Halaman ini hanya bisa diakses setelah login.
      </p>

      <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-500">Nama</p>
        <p className="mb-3 font-semibold">{user?.nama}</p>

        <p className="text-sm text-slate-500">Email</p>
        <p className="mb-5 font-semibold">{user?.email}</p>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/products"
            className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 font-semibold text-slate-800 transition-colors hover:bg-slate-100"
          >
            Lihat Produk
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}
