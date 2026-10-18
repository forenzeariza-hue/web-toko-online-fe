import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Loader from '../components/Loader.jsx';
import { getProductById } from '../services/productService.js';
import { formatRupiah } from '../utils/format.js';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchProduct = async () => {
      setLoading(true);
      setNotFound(false);
      setError(null);

      try {
        const data = await getProductById(id);
        if (!active) return;
        setProduct(data);
      } catch (err) {
        if (!active) return;
        if (err?.response?.status === 404) {
          setNotFound(true);
        } else {
          setError(err?.message || 'Gagal memuat detail produk');
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return <Loader text="Memuat detail produk..." />;
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center gap-2 px-4 py-12 text-center text-slate-500">
        <h2 className="text-xl font-semibold text-slate-800">
          Produk tidak ditemukan
        </h2>
        <p>
          Produk dengan id{' '}
          <code className="rounded bg-blue-50 px-1.5 py-0.5 text-[0.9em] text-slate-800">
            {id}
          </code>{' '}
          tidak tersedia.
        </p>
        <Link
          to="/products"
          className="mt-1 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Kembali ke Daftar Produk
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 px-4 py-12 text-center text-slate-500">
        <h2 className="text-xl font-semibold text-red-600">Terjadi kesalahan</h2>
        <p>{error}</p>
        <Link
          to="/products"
          className="mt-1 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Kembali ke Daftar Produk
        </Link>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <article>
      <nav className="mb-4 text-sm text-slate-500">
        <Link to="/" className="text-blue-600">
          Beranda
        </Link>{' '}
        /{' '}
        <Link to="/products" className="text-blue-600">
          Produk
        </Link>{' '}
        / <span>{product.nama}</span>
      </nav>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-white">
          {product.gambar ? (
            <img
              src={product.gambar}
              alt={product.nama}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-500">
              Tanpa Gambar
            </div>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          {product.kategori ? (
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[0.7rem] font-semibold text-blue-600">
              {product.kategori}
            </span>
          ) : null}
          <h1 className="my-2 text-2xl font-bold">{product.nama}</h1>
          <p className="mb-2 text-xl font-bold text-blue-600">
            {formatRupiah(product.harga)}
          </p>
          <p className="mb-4 text-slate-500">Stok tersedia: {product.stok}</p>

          <h2 className="mb-1 font-semibold">Deskripsi</h2>
          <p className="mb-6 text-slate-700">{product.deskripsi}</p>

          <Link
            to="/products"
            className="inline-block rounded-lg border border-slate-200 bg-white px-5 py-2.5 font-semibold text-slate-800 transition-colors hover:bg-slate-100"
          >
            Kembali
          </Link>
        </div>
      </div>
    </article>
  );
}
