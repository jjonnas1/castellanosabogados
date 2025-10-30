'use client';

import { useState, useEffect } from 'react';
import { createClient, Session } from '@supabase/supabase-js';

// Configura conexión Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Area = {
  slug: string;
  name: string;
};

export default function AgendaPage() {
  const [email, setEmail] = useState('');
  const [areas, setAreas] = useState<Area[]>([]);
  const [area, setArea] = useState('');
  const [slot, setSlot] = useState('Hoy 6:00 pm');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  // 🟢 Cargar sesión actual
  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setEmail(data.session?.user?.email || '');
      setReady(true);
    }
    loadSession();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  // 🟢 Cargar áreas activas desde Supabase
  useEffect(() => {
    async function loadAreas() {
      const { data, error } = await supabase
        .from('service_areas')
        .select('slug, name')
        .eq('enabled', true)
        .order('sort', { ascending: true });

      if (!error && data?.length) {
        setAreas(data);
        setArea(data[0].slug);
      }
    }
    loadAreas();
  }, []);

  // 🟢 Enviar solicitud
  async function handleSend() {
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Solicitud de agenda',
          email,
          message: `Nueva solicitud de agenda:
- Área / Tema: ${area}
- Horario preferido: ${slot}
- Correo del usuario: ${email}`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error || 'No se pudo enviar.');

      setStatus({ ok: true, msg: 'Solicitud enviada. Te escribiremos al correo.' });
    } catch (err: any) {
      setStatus({ ok: false, msg: err?.message || 'Error enviando la solicitud.' });
    } finally {
      setLoading(false);
    }
  }

  if (!ready) return <div className="wrap">Cargando…</div>;

  // 🟡 Si no hay sesión, pedir login
  if (!session)
    return (
      <main className="main section">
        <div className="wrap" style={{ maxWidth: 520 }}>
          <h1 className="h1">Agenda tu asesoría</h1>
          <p className="muted">
            Debes iniciar sesión o registrarte para poder agendar y ver tus citas.
          </p>
          <button
            className="btn btn--primary"
            onClick={() => (window.location.href = '/cliente/acceso')}
          >
            Iniciar sesión / Registrarme
          </button>
        </div>
      </main>
    );

  // 🟢 Si está logueado, mostrar formulario
  return (
    <main className="main section">
      <div className="wrap">
        <h1 className="h1">Agenda tu asesoría</h1>
        <p className="muted">
          Selecciona el área legal disponible y un horario preferido.
        </p>

        <div className="panel" style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
          <label>
            Tu correo
            <input type="email" value={email} readOnly />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <label>
              Tema / Área
              <select value={area} onChange={e => setArea(e.target.value)}>
                {areas.map(a => (
                  <option key={a.slug} value={a.slug}>
                    {a.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Horario preferido
              <select value={slot} onChange={e => setSlot(e.target.value)}>
                <option>Hoy 6:00 pm</option>
                <option>Mañana 8:30 am</option>
                <option>Mañana 11:00 am</option>
                <option>Miércoles 5:30 pm</option>
              </select>
            </label>
          </div>

          <div className="form-actions" style={{ display: 'flex', gap: 8 }}>
            <button
              className="btn btn--primary"
              onClick={handleSend}
              disabled={loading || !email}
            >
              {loading ? 'Enviando…' : 'Enviar solicitud'}
            </button>
            <a href="/" className="btn btn--ghost">
              Volver al inicio
            </a>
          </div>

          {status && (
            <p className={status.ok ? 'ok' : 'error'} style={{ marginTop: 4 }}>
              {status.msg}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
