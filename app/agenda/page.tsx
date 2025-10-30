'use client';

import { useEffect, useState } from 'react';
import { createClient, Session } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Area = { slug: string; name: string };

export default function AgendaPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  const [areas, setAreas] = useState<Area[]>([]);
  const [area, setArea] = useState('');
  const [slot, setSlot] = useState('Hoy 6:00 pm');
  const [nota, setNota] = useState('');

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);
      setReady(true);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('service_areas')
        .select('slug,name')
        .eq('enabled', true)
        .order('sort', { ascending: true });

      if (!error && data?.length) {
        setAreas(data);
        setArea(data[0].slug);
      }
    })();
  }, []);

  if (!ready) return <div className="wrap">Cargando…</div>;

  if (!session) {
    return (
      <main className="section">
        <div className="wrap" style={{ maxWidth: 560 }}>
          <h1 className="h1">Agenda tu asesoría</h1>
          <p className="muted">
            Debes iniciar sesión o registrarte para poder agendar y ver tus citas.
          </p>
          <button className="btn btn--primary" onClick={() => (window.location.href = '/cliente/acceso')}>
            Iniciar sesión / Registrarme
          </button>
        </div>
      </main>
    );
  }

  async function enviarSolicitud() {
    setLoading(true);
    setStatus(null);
    try {
      const email = session.user.email || 'sin-correo';
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: 'Solicitud de agenda',
          email,
          message: `Nueva solicitud de agenda:
- Área / Tema: ${area}
- Horario preferido: ${slot}
- Correo del usuario: ${email}
- Resumen del caso: ${nota || '(sin detalle)'}`,
        }),
      });
      const json = await res.json();
      if (!json?.ok) throw new Error(json?.error || 'No se pudo enviar la solicitud.');
      setStatus({ ok: true, msg: 'Solicitud enviada. Te escribiremos por correo con el enlace de pago y confirmación.' });
      setNota('');
    } catch (e: any) {
      setStatus({ ok: false, msg: e?.message || 'Error enviando la solicitud.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="section">
      <div className="wrap">
        <h1 className="h1">Agenda tu asesoría</h1>
        <p className="muted">Selecciona el área disponible y cuéntanos brevemente tu caso.</p>

        <div className="panel" style={{ display: 'grid', gap: 12, maxWidth: 620 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <label>
              Tema / Área
              <select value={area} onChange={(e) => setArea(e.target.value)}>
                {areas.map((a) => (
                  <option key={a.slug} value={a.slug}>
                    {a.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Horario preferido
              <select value={slot} onChange={(e) => setSlot(e.target.value)}>
                <option>Hoy 6:00 pm</option>
                <option>Mañana 8:30 am</option>
                <option>Mañana 11:00 am</option>
                <option>Miércoles 5:30 pm</option>
              </select>
            </label>
          </div>

          <label>
            Resumen breve del caso
            <textarea
              rows={5}
              placeholder="Ej.: Estoy en etapa de ejecución de penas; necesito orientación sobre redenciones y subrogados…"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
            />
          </label>

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn--primary" onClick={enviarSolicitud} disabled={loading}>
              {loading ? 'Enviando…' : 'Enviar solicitud'}
            </button>
            <a href="/cliente/panel" className="btn btn--ghost">Ir a mi panel</a>
          </div>

          {status && (
            <div
              className="panel"
              style={{
                background: status.ok ? '#f6ffed' : '#fff5f5',
                borderColor: status.ok ? '#c6f6d5' : '#fed7d7',
              }}
            >
              {status.msg}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
