'use client';

import { useEffect, useState } from 'react';
import { createClient, Session } from '@supabase/supabase-js';

// Supabase client directo (evita importar tu wrapper para no romper nada)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ClienteAccesoPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [mode, setMode] = useState<'login'|'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      // Si ya está logueado → enviar a Agenda
      window.location.href = '/agenda';
    }
  }, [session]);

  async function handleEmailPass() {
    setMsg(null);
    setLoading(true);
    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMsg('Cuenta creada. Revisa tu correo para confirmar.');
      }
    } catch (e: any) {
      setMsg(e?.message || 'No se pudo procesar la solicitud.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setMsg(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/agenda`,
        },
      });
      if (error) throw error;
    } catch (e: any) {
      setMsg(e?.message || 'No se pudo iniciar con Google.');
    }
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 520 }}>
        <h1 className="h1">Acceso de clientes</h1>
        <p className="muted" style={{ marginBottom: 16 }}>
          Crea tu cuenta o inicia sesión para agendar y ver tus citas.
        </p>

        <div className="panel" style={{ display: 'grid', gap: 12 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className="btn"
              onClick={() => setMode('login')}
              style={{
                background: mode === 'login' ? 'var(--brand-600)' : '#fff',
                color: mode === 'login' ? '#fff' : 'var(--ink)',
                border: '1px solid #e6ebf8',
                borderRadius: 999,
              }}
            >
              Iniciar sesión
            </button>
            <button
              className="btn"
              onClick={() => setMode('signup')}
              style={{
                background: mode === 'signup' ? 'var(--brand-600)' : '#fff',
                color: mode === 'signup' ? '#fff' : 'var(--ink)',
                border: '1px solid #e6ebf8',
                borderRadius: 999,
              }}
            >
              Registrarme
            </button>
          </div>

          <label>
            Correo
            <input
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </label>

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn--primary" onClick={handleEmailPass} disabled={loading || !email || !password}>
              {loading ? 'Procesando…' : mode === 'login' ? 'Entrar' : 'Crear cuenta'}
            </button>
            <button className="btn btn--ghost" onClick={handleGoogle}>
              Continuar con Google
            </button>
          </div>

          {msg && (
            <div className="panel" style={{ background: '#fff7e6', borderColor: '#ffe7ba' }}>
              {msg}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
