'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ClienteAccesoPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [modo, setModo] = useState<'login' | 'signup'>('signup');
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) window.location.href = '/cliente/panel';
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (modo === 'signup') {
      const { data, error } = await supabase.auth.signUp({ email, password: pass });
      if (error) return setStatus(error.message);

      // crea profile (rol=client) si no existe
      if (data.user?.id) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email,
          role: 'client',
          full_name: null,
          phone: null,
        });
      }
      setStatus('Registro enviado. Revisa tu correo para confirmar la cuenta.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if (error) return setStatus(error.message);
      window.location.href = '/cliente/panel';
    }
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 480 }}>
        <h1 className="h2">{modo === 'signup' ? 'Crear cuenta' : 'Iniciar sesión'}</h1>
        <p className="muted">Acceso para clientes (ver/gestionar citas y pagos).</p>

        <form onSubmit={handleSubmit} className="panel" style={{ display: 'grid', gap: 12 }}>
          <label>
            Correo
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label>
            Contraseña
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} required />
          </label>
          <button className="btn btn--primary" type="submit">
            {modo === 'signup' ? 'Registrarme' : 'Entrar'}
          </button>
          <button
            className="btn btn--ghost"
            type="button"
            onClick={() => setModo(m => (m === 'signup' ? 'login' : 'signup'))}
          >
            {modo === 'signup' ? '¿Ya tienes cuenta? Inicia sesión' : '¿Nuevo? Crea tu cuenta'}
          </button>

          {status && <div className="panel" style={{ background: '#fff5f5', borderColor: '#fed7d7' }}>{status}</div>}
        </form>
      </div>
    </main>
  );
}
