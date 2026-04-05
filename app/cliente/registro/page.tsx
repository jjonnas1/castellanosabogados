'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';

export default function ClienteRegistroPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [invited, setInvited] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => setSession(data.session ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e: AuthChangeEvent, s: Session | null) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) router.push('/cliente');
  }, [session, router]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    setInvited(params.get('invited') === 'true');
  }, []);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role: 'client' } },
    });

    if (error) setStatus(error.message);
    else setStatus('✅ Revisa tu correo y confirma tu cuenta para continuar.');

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-canvas text-ink flex items-center justify-center px-4">
      <div className="card-shell w-full max-w-md bg-white p-8 space-y-5">
        <h1 className="font-heading text-2xl font-semibold text-ink">Crear cuenta</h1>
        <p className="text-sm text-muted">
          {invited
            ? 'Bienvenido, establece tu contraseña para acceder a tu portal.'
            : 'Regístrate para agendar asesorías y ver tu historial.'}
        </p>

        <form onSubmit={handleRegister} className="grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-ink">
            Correo electrónico
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50"
            />
          </label>

          <button type="submit" className="btn-primary justify-center" disabled={loading}>
            {loading ? 'Creando…' : 'Registrarme'}
          </button>
        </form>

        {status && <p className="text-sm text-muted">{status}</p>}

        <div className="flex gap-3">
          <Link href="/cliente/login" className="btn-secondary flex-1 justify-center">Ya tengo cuenta</Link>
          <Link href="/" className="btn-secondary flex-1 justify-center">Volver al sitio</Link>
        </div>
      </div>
    </main>
  );
}
