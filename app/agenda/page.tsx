'use client';

import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase-browser';

type Area = { slug: string; name: string; };

export default function AgendaPage() {
  const [session, setSession] = useState<Session|null>(null);
  const [areas, setAreas] = useState<Area[]>([]);
  const [area, setArea] = useState('');
  const [slot, setSlot] = useState('Hoy 6:00 pm');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string>('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
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
      if (!error && data) {
        setAreas(data);
        if (data[0]) setArea(data[0].slug);
      }
    })();
  }, []);

  if (!session) {
    return (
      <main className="main section">
        <div className="wrap" style={{maxWidth:520}}>
          <h1 className="h1">Agenda tu asesoría</h1>
          <p className="muted">Primero inicia sesión o regístrate para continuar.</p>
          <a className="btn btn--primary" href="/cliente/acceso">Iniciar sesión / Registrarme</a>
        </div>
      </main>
    );
  }

  const email = session.user.email ?? 'sin-correo';

  const send = async () => {
    setLoading(true); setMsg('');
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: "Solicitud de agenda",
          email,
          area,
          source: "/agenda",
          intent: "ingreso-evaluacion",
          subject: `Ingreso a evaluación – ${area}`,
          message: `Nueva solicitud:
- Área: ${area}
- Horario preferido: ${slot}
- Correo: ${email}
- Nota: ${note || '(sin nota)'}`,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'No se pudo enviar');
      setMsg("✅ Recibimos tu solicitud. Te escribiremos al correo.");
      setNote("");
    } catch (e:any) {
      setMsg("❌ " + (e?.message ?? "Error enviando la solicitud"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main section">
      <div className="wrap" style={{maxWidth:640}}>
        <h1 className="h1">Agenda tu asesoría</h1>
        <p className="muted">Selecciona el área (solo activas) y cuéntanos tu caso brevemente.</p>

        <div className="panel" style={{display:'grid', gap:12}}>
          <label>Tu correo
            <input type="email" value={email} readOnly />
          </label>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            <label>Tema / Área
              <select value={area} onChange={e=>setArea(e.target.value)}>
                {areas.map(a=>(
                  <option key={a.slug} value={a.slug}>{a.name}</option>
                ))}
              </select>
            </label>

            <label>Horario preferido
              <select value={slot} onChange={e=>setSlot(e.target.value)}>
                <option>Hoy 6:00 pm</option>
                <option>Mañana 8:30 am</option>
                <option>Mañana 11:00 am</option>
                <option>Miércoles 5:30 pm</option>
              </select>
            </label>
          </div>

          <label>Cuéntanos tu caso (breve)
            <textarea
              placeholder="Describe tu caso en pocas líneas…"
              value={note}
              onChange={(e)=>setNote(e.target.value)}
              rows={4}
            />
          </label>

          <div style={{display:'flex', gap:8}}>
            <button className="btn btn--primary" onClick={send} disabled={loading}>
              {loading ? 'Enviando…' : 'Enviar solicitud'}
            </button>
            <a className="btn btn--ghost" href="/cliente/panel">Ir a mi panel</a>
          </div>

          {msg && <p className="muted">{msg}</p>}
        </div>
      </div>
    </main>
  );
}
