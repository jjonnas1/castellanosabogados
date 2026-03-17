'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? 'jonatancastellanosabogado@gmail.com';

export default function AdminLoginPage() {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      setError('Este acceso está restringido al correo administrador configurado.');
      setLoading(false);
      return;
    }

    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    // Si el correo coincide, permitimos entrar al panel administrativo.
    // El control real de datos queda en RLS de Supabase.
    window.location.href = '/administrativo/citas';
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">CastellanosAbogados</p>
        <h1 className="text-2xl font-semibold text-slate-900">Login administrador</h1>
        <p className="mt-1 text-sm text-slate-600">Acceso interno para administrar agenda y asignación de citas.</p>

        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <input
            className="w-full rounded-lg border p-2"
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full rounded-lg border p-2"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full rounded-lg bg-slate-900 px-3 py-2 text-white" disabled={loading}>
            {loading ? 'Validando…' : 'Entrar'}
          </button>
        </form>

        <p className="mt-3 text-xs text-slate-500">Correo administrador esperado: {ADMIN_EMAIL}</p>

        {error && <p className="mt-3 rounded-lg bg-red-50 p-2 text-sm text-red-700">{error}</p>}
      </div>
    </main>
  );
}
