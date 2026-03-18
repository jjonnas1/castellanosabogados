'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';

async function resolveAdminRole(userId: string) {
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', userId).maybeSingle();
  return profile?.role === 'admin';
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: s } = await supabase.auth.getSession();
      const user = s.session?.user;
      if (!user) {
        setChecking(false);
        return;
      }

      const isAdmin = await resolveAdminRole(user.id);
      if (isAdmin) {
        router.push('/admin');
        return;
      }

      setError('Tu cuenta no tiene rol admin.');
      setChecking(false);
    };

    checkAdmin();
    const { data: sub } = supabase.auth.onAuthStateChange(() => checkAdmin());
    return () => sub.subscription.unsubscribe();
  }, [router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    const { data: s } = await supabase.auth.getSession();
    const user = s.session?.user;
    if (!user) {
      setError('No se encontró sesión activa.');
      setLoading(false);
      return;
    }

    const isAdmin = await resolveAdminRole(user.id);
    if (!isAdmin) {
      setError('Tu cuenta no tiene rol admin.');
      setLoading(false);
      return;
    }

    router.push('/admin');
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">CastellanosAbogados</p>
        <h1 className="text-2xl font-semibold text-slate-900">Login administrador</h1>
        <p className="mt-1 text-sm text-slate-600">Acceso interno para administrar agenda, clientes y actualizaciones.</p>

        <form className="mt-4 space-y-3" onSubmit={handleLogin}>
          <label className="block text-sm text-slate-700">
            Correo electrónico
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading || checking}
            />
          </label>
          <label className="block text-sm text-slate-700">
            Contraseña
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading || checking}
            />
          </label>
          <button type="submit" className="w-full rounded-lg bg-slate-900 px-3 py-2 text-white" disabled={loading || checking}>
            {checking ? 'Verificando sesión…' : loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>

        {error && <p className="mt-3 rounded-lg bg-red-50 p-2 text-sm text-red-700">{error}</p>}
      </div>
    </main>
  );
}
