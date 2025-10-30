'use client';

import { useEffect, useState } from 'react';
import { createClient, Session } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Area = { slug: string; name: string };

export default function AgendaPage() {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [areas, setAreas] = useState<Area[]>([]);
  const [area, setArea] = useState<string>('');
  const [slot, setSlot] = useState('Hoy 6:00 pm');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  // 1) Cargar sesión
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);
      setEmail(data.session?.user?.email ?? '');
      setReady(true);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, s) => {
      setSession(s);
      setEmail(s?.user?.email ?? '');
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // 2) Cargar áreas habilitadas (solo si hay sesión)
  useEffect(() => {
    if (!session) return;
    (async () => {
      const { data, error } = await supabase
        .from('service_areas')
        .select('slug,name')
        .eq('enabled', true)
        .order('sort', { ascending: true });

      if (!error && data?.length) {
        setAreas(data);
        setArea(data[0].slug);
      } else {
        setAreas([]);
        setArea('');
      }
    })();
  }, [session]);

  // 3) Enviar solicitud (bloquea si no hay sesión)
  async function handleSend() {
    if (!session) {
      setStatus({
        ok: false,
        msg: 'Primero inicia sesión o regístrate para agendar.',
      });
      return;
    }
    setSending(true);
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
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'No se pudo enviar.');
      setStatus({ ok: true, msg: 'Solicitud enviada. Te escribiremos al correo.' });
    } catch (e: any) {
      setStatus({ ok: false, msg: e?.message || 'Error enviando la solicitud.' });
    } finally {
      setSending(false);
    }
  }

  if (!ready) return <main className="main section"><div className="wrap">Cargando…</div></main>;

  // 🔒 Sin sesión: NO mostrar el formulario
  if (!session) {
    return (
      <main className="main section">
        <div className="wrap" style={{ maxWidth: 520 }}>
          <h1 className="h1">Agenda tu asesoría</h1>
          <p className="muted">
            Para agendar y ver tus citas debes iniciar sesión o registrarte.
          </p>
          <div className="panel" style={{ display: 'grid', gap: 12 }}>
            <button
              className="btn btn--primary"
              onClick={() => (window.location.href = '/cliente/acceso')}
            >
              Iniciar sesión / Registrarme
            </button>
            <a href="/" className="btn btn--ghost">Volver al inicio</a>
          </div>
        </div>
      </main>
    );
  }

  // ✅ Con sesión: mostrar formulario
  return (
    <main className="main section">
      <div className="wrap">
        <h1 className="h1">Agenda tu asesoría</h1>
        <p className="muted">Selecciona el área disponible y tu horario preferido.</p>

        <div className="panel" style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
          <label>
            Tu correo
            <input type="email" value={email} readOnly />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <label>
              Tema / Área
              <select value={area} onChange={e => setArea(e.target.value)} disabled={!areas.length}>
                {areas.map(a => (
                  <option key={a.slug} value={a.slug}>{a.name}</option>
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

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn--primary" onClick={handleSend} disabled={sending || !area}>
              {sending ? 'Enviando…' : 'Enviar solicitud'}
            </button>
            <a href="/" className="btn btn--ghost">Volver al inicio</a>
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
