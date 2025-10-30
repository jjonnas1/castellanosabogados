'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function RegistroAbogadoPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [nombre, setNombre] = useState('');
  const [tp, setTp] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({ email, password: pass });
      if (error) throw error;

      if (data.user?.id) {
        await supabase.from('profiles').upsert({
          id: data.user.id, email, full_name: nombre, role: 'lawyer'
        });

        await supabase.from('lawyers').insert({
          user_id: data.user.id,
          bar_number: tp,
          bio: null,
          specialties: ['penal'],
          verified: false,
          base_rate_cop: 70000
        });
      }
      setStatus('Registro enviado. Revisa tu correo para confirmar la cuenta.');
    } catch (e: any) {
      setStatus(e?.message || 'No pudimos registrar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 520 }}>
        <h1 className="h2">Registro de abogados</h1>
        <p className="muted">Crea tu cuenta para ofrecer asesorías.</p>

        <form onSubmit={handleRegister} className="panel" style={{ display: 'grid', gap: 12 }}>
          <label>Nombre completo<input value={nombre} onChange={e => setNombre(e.target.value)} required /></label>
          <label>Tarjeta profesional<input value={tp} onChange={e => setTp(e.target.value)} /></label>
          <label>Correo<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
          <label>Contraseña<input type="password" value={pass} onChange={e => setPass(e.target.value)} required /></label>
          <button className="btn btn--primary" type="submit" disabled={loading}>{loading ? 'Creando…' : 'Registrarme'}</button>
        </form>
        {status && <div className="panel" style={{ marginTop: 10 }}>{status}</div>}
      </div>
    </main>
  );
}
