# Frontend — Toko Online

React 19 + Vite 8 + React Router 7 + Tailwind CSS 4 + Axios.

## Menjalankan

```bash
npm install
cp .env.example .env    # VITE_API_URL=http://localhost:5001/api
npm run dev             # http://localhost:5173
npm run build           # output ke dist/
```

## Halaman & Route

| Route | Halaman | Akses |
|-------|---------|-------|
| `/login` | Login | **Satu-satunya route publik** |
| `/register` | Registrasi | **Satu-satunya route publik** |
| `/` | Beranda | Butuh login |
| `/products` | Daftar Produk | Butuh login |
| `/products/:id` | Detail Produk | Butuh login |
| `/profile` | Profil Saya | Butuh login |
| `*` (termasuk URL tidak dikenal) | 404 Not Found | Butuh login |

Visitor yang belum login dan membuka URL apa pun (selain `/login` dan `/register`)
otomatis dialihkan ke `/login`, lalu dikembalikan ke halaman yang dituju setelah berhasil masuk.

## Autentikasi

- Token JWT disimpan di **`localStorage`** (key `token`, plus `user`) sesuai ketentuan tugas.
- `src/api/axiosClient.js` menyisipkan header `Authorization: Bearer <token>` dan menghapus sesi
  otomatis bila API mengembalikan `401`.
- `src/context/AuthContext.jsx` menyimpan status login dan memvalidasi token tersimpan lewat `GET /api/auth/me`.
- `src/components/ProtectedRoute.jsx` menjaga **semua** route privat dan mengalihkan ke `/login`
  sambil menyimpan halaman tujuan pada router state.
- `src/components/PublicOnlyRoute.jsx` menjaga `/login` dan `/register`: user yang sudah login
  dialihkan ke halaman tujuan (atau `/`).
- Proteksi dilakukan sekali di level routing (lihat `src/App.jsx`), bukan di tiap halaman.

---

# React + Vite (catatan template)

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
