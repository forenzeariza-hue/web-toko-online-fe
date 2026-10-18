import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Produk Lengkap',
    desc: 'Beragam kategori produk pilihan untuk kebutuhan harian.',
  },
  {
    title: 'Harga Terjangkau',
    desc: 'Harga ditampilkan dalam Rupiah sesuai format Indonesia.',
  },
  {
    title: 'Data Real-time',
    desc: 'Daftar produk diambil langsung dari API backend.',
  },
];

export default function Home() {
  return (
    <section>
      <div className="mb-6 rounded-xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-white px-6 py-10 text-center">
        <p className="mb-2 text-xs font-bold tracking-widest text-blue-600 uppercase">
          Toko Online Sederhana
        </p>
        <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
          Belanja kebutuhan harian dengan mudah
        </h1>
        <p className="mx-auto mb-5 max-w-[600px] text-slate-500">
          Jelajahi koleksi produk pilihan kami: fashion, sepatu, tas, elektronik,
          dan masih banyak lagi.
        </p>
        <Link
          to="/products"
          className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Lihat Daftar Produk
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h3 className="mb-1 font-semibold">{feature.title}</h3>
            <p className="text-slate-500">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
