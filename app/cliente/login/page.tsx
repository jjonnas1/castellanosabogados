'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Session } from '@supabase/supabase-js';

export default function ClienteLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) window.location.href = '/cliente/panel';
  }, [session]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setStatus(error.message);
    else window.location.href = '/cliente/panel';

    setLoading(false);
  }

  async function handleGoogle() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) setStatus(error.message);
    setLoading(false);
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 420 }}>
        <h1 className="h1">Iniciar sesión</h1>
        <p className="muted">Accede a tu panel para ver y gestionar tus asesorías.</p>

        <form onSubmit={handleLogin} className="panel" style={{ display: 'grid', gap: 14 }}>
          <label>
            Correo electrónico
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </label>

          <label>
            Contraseña
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          </label>

          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>

          <button type="button" className="btn btn--ghost" onClick={handleGoogle} disabled={loading}>
            Iniciar con Google
          </button>
        </form>

        {status && <div style={{ marginTop: 10, color: '#555' }}>{status}</div>}

        <p style={{ marginTop: 12, fontSize: 14 }}>
          ¿No tienes cuenta? <a className="link" href="/cliente/registro">Regístrate</a>
        </p>
      </div>
    </main>
  );
}
