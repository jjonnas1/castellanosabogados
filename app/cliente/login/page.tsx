'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';

async function resolveRole(userId: string) {
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', userId).maybeSingle();
  return (profile?.role as string | undefined) ?? null;
}

export default function ClienteLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: s } = await supabase.auth.getSession();
      const user = s.session?.user;
      if (!user) return;

      const role = await resolveRole(user.id);
      if (role === 'client') {
        router.push('/cliente');
        return;
      }

      if (role === 'admin') {
        setError('Esta cuenta es administrativa. Usa /admin/login para continuar.');
        return;
      }

      setError('Tu cuenta no tiene acceso configurado.');
    })();
  }, [router]);

  async function routeByRole() {
    const { data: s } = await supabase.auth.getSession();
    const user = s.session?.user;
    if (!user) {
      setError('No se encontró sesión activa.');
      return;
    }

    const role = await resolveRole(user.id);
    if (role === 'admin') {
      setError('Esta cuenta es administrativa. Usa /admin/login para continuar.');
      return;
    }

    if (role === 'client') {
      router.push('/cliente');
      return;
    }

    setError('Tu cuenta no tiene acceso configurado.');
  }

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

    await routeByRole();
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-canvas text-ink flex items-center justify-center px-4">
      <div className="card-shell w-full max-w-md bg-white p-8 space-y-5">
        <h1 className="font-heading text-2xl font-semibold text-ink">Acceso al portal</h1>
        <p className="text-sm text-muted">Ingresa con tu cuenta para ver el estado de tu caso.</p>

        <form onSubmit={handleLogin} className="grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-ink">
            Correo electrónico
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            Contraseña
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50"
            />
          </label>

          <button type="submit" className="btn-primary justify-center" disabled={loading}>
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>

        {error && <p className="text-sm text-red-700">{error}</p>}

        <div className="flex gap-3">
          <Link href="/cliente/registro" className="btn-secondary flex-1 justify-center">Crear cuenta</Link>
          <Link href="/" className="btn-secondary flex-1 justify-center">Volver al sitio</Link>
        </div>
      </div>
    </main>
  );
}
