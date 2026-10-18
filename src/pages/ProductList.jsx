import { useEffect, useState } from 'react';

import ProductCard from '../components/ProductCard.jsx';
import Loader from '../components/Loader.jsx';
import { getProducts } from '../services/productService.js';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        if (!active) return;
        setProducts(data);
        setError(null);
      } catch (err) {
        if (!active) return;
        setError(err?.message || 'Gagal memuat produk');
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <Loader text="Memuat daftar produk..." />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 px-4 py-12 text-center text-slate-500">
        <h2 className="text-xl font-semibold text-red-600">Terjadi kesalahan</h2>
        <p>{error}</p>
        <p className="text-sm">
          Pastikan backend berjalan dan VITE_API_URL sudah benar.
        </p>
      </div>
    );
  }

  return (
    <section>
      <header className="mb-5">
        <h1 className="text-2xl font-bold">Daftar Produk</h1>
        <p className="text-slate-500">{products.length} produk tersedia</p>
      </header>

      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-4 py-12 text-center text-slate-500">
          <p>Belum ada produk.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
