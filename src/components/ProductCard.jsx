import { Link } from 'react-router-dom';

import { formatRupiah } from '../utils/format.js';

export default function ProductCard({ product }) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-lg">
      <Link to={`/products/${product._id}`} className="flex h-full flex-col">
        <div className="aspect-[4/3] bg-slate-100">
          {product.gambar ? (
            <img
              src={product.gambar}
              alt={product.nama}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">
              Tanpa Gambar
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-3.5">
          {product.kategori ? (
            <span className="self-start rounded-full bg-blue-50 px-2 py-0.5 text-[0.7rem] font-semibold text-blue-600">
              {product.kategori}
            </span>
          ) : null}
          <h3 className="text-base font-medium">{product.nama}</h3>
          <p className="font-bold text-blue-600">{formatRupiah(product.harga)}</p>
          <p className="text-sm text-slate-500">Stok: {product.stok}</p>
        </div>
      </Link>
    </article>
  );
}
