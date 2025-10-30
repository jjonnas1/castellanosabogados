'use client';

import { useEffect, useState } from 'react';
import { createClient, Session } from '@supabase/supabase-js';
import Link from 'next/link';

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
  const [area, setArea] = useState('');
  const [slot, setSlot] = useState('Hoy 6:00 pm');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  // Cargar sesión
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session || null);
      setEmail(data.session?.user?.email || '');
      setReady(true);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  // Cargar áreas activas
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('service_areas')
        .select('slug, name')
        .eq('enabled', true)
        .order('sort', { ascending: true });
      if (!error && data?.length) {
        setAreas(data);
        setArea(data[0].slug);
      }
    })();
  }, []);

  async function handleSave() {
    if (!session) return;
    setSaving(true);
    setStatus(null);
    try {
      const { error } = await supabase.from('preintakes').insert({
        user_id: session.user.id,
        email,
        area_slug: area,
        slot_label: slot,
        note,
      });
      if (error) throw error;
      setStatus({ ok: true, msg: 'Solicitud enviada. La verás en tu panel y te avisaremos por correo.' });
      setNote('');
    } catch (e: any) {
      setStatus({ ok: false, msg: e?.message || 'No se pudo guardar la solicitud.' });
    } finally {
      setSaving(false);
    }
  }

  if (!ready) return <div className="wrap">Cargando…</div>;

  if (!session) {
    return (
      <main className="main section">
        <div className="wrap" style={{ maxWidth: 560 }}>
          <h1 className="h1">Agenda tu asesoría</h1>
          <p className="muted">
            Para agendar debes tener cuenta. Inicia sesión o regístrate.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link className="btn btn--primary" href="/cliente/login">Iniciar sesión</Link>
            <Link className="btn btn--ghost" href="/cliente/registro">Registrarme</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="main section">
      <div className="wrap">
        <h1 className="h1">Agenda tu asesoría</h1>
        <p className="muted">Selecciona el área y cuéntanos tu caso. Luego podrás ver/gestionar desde tu panel.</p>

        <div className="panel" style={{ display: 'grid', gap: 12, maxWidth: 640 }}>
          <label>
            Tu correo
            <input type="email" value={email} readOnly />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <label>
              Tema / Área
              <select value={area} onChange={e => setArea(e.target.value)}>
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

          <label>
            Cuéntanos tu caso (breve)
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={5}
              placeholder="Describe el caso en pocas líneas…"
            />
          </label>

          <div className="form-actions" style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn--primary" onClick={handleSave} disabled={saving || !area || !slot}>
              {saving ? 'Enviando…' : 'Enviar solicitud'}
            </button>
            <Link href="/cliente/panel" className="btn btn--ghost">Ir a mi panel</Link>
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
