'use client';

import { useState } from 'react';
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

  async function routeByRole() {
    const { data: s } = await supabase.auth.getSession();
    const user = s.session?.user;
    if (!user) {
      setError('No se encontró sesión activa.');
      return;
    }

    const role = await resolveRole(user.id);
    if (role === 'admin') {
      router.push('/admin');
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
    <main className="section">
      <div className="wrap" style={{ maxWidth: 460 }}>
        <h1 className="h2">Iniciar sesión</h1>
        <p className="muted">Accede con tu cuenta para entrar a tu panel de cliente.</p>

        <form onSubmit={handleLogin} className="panel" style={{ display: 'grid', gap: 14 }}>
          <label>
            Correo electrónico
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label>
            Contraseña
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>

          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>

        </form>

        {error && <div style={{ marginTop: 10, color: '#b91c1c' }}>{error}</div>}
      </div>
    </main>
  );
}
