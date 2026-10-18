import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import FormField from '../components/FormField.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

export default function Login() {
  const { login } = useAuth();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.email.trim()) next.email = 'Email wajib diisi';
    else if (!EMAIL_PATTERN.test(form.email.trim()))
      next.email = 'Format email tidak valid';
    if (!form.password) next.password = 'Password wajib diisi';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // On success PublicOnlyRoute redirects to the originally requested page (or Home).
  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      await login(form.email.trim(), form.password);
    } catch (err) {
      setServerError(
        err?.response?.data?.message || 'Gagal masuk, silakan coba lagi'
      );
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-[420px]">
      <header className="mb-5 text-center">
        <h1 className="text-2xl font-bold">Masuk</h1>
        <p className="text-slate-500">
          Masuk untuk melihat katalog produk toko online.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6"
        noValidate
      >
        <FormField
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
          placeholder="nama@email.com"
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
          placeholder="••••••"
        />

        {serverError ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {serverError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Memproses...' : 'Masuk'}
        </button>

        <p className="text-center text-sm text-slate-500">
          Belum punya akun?{' '}
          <Link
            to="/register"
            state={location.state}
            className="font-semibold text-blue-600"
          >
            Daftar
          </Link>
        </p>
      </form>
    </section>
  );
}
