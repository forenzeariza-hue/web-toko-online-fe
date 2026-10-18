import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-12 text-center text-slate-500">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <h2 className="text-xl font-semibold text-slate-800">
        Halaman tidak ditemukan
      </h2>
      <p>Halaman yang kamu cari tidak tersedia.</p>
      <Link
        to="/"
        className="mt-1 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
