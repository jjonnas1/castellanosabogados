'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient, Session } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Appt = {
  id: string;
  status: 'pending' | 'paid' | 'confirmed' | 'in_call' | 'completed' | 'cancelled' | 'no_show';
  created_at: string;
  meet_url: string | null;
  notes_private: string | null;
  slot_id: string;
  lawyer_id: string;
};

type Slot = {
  id: string;
  start_at: string; // ISO
  end_at: string;   // ISO
};

export default function ClientePanelPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  const [appts, setAppts] = useState<(Appt & { slot?: Slot })[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);

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
    if (!session) return;
    loadAppts(session.user.id);
  }, [session]);

  async function loadAppts(uid: string) {
    setLoading(true);
    setMsg(null);

    // 1) citas del cliente
    const { data: ap } = await supabase
      .from('appointments')
      .select('*')
      .eq('client_id', uid)
      .in('status', ['pending', 'paid', 'confirmed', 'in_call'])
      .order('created_at', { ascending: false });

    const apList = (ap || []) as Appt[];

    // 2) slots relacionados
    const slotIds = Array.from(new Set(apList.map(a => a.slot_id)));
    let slotsMap: Record<string, Slot> = {};
    if (slotIds.length) {
      const { data: slots } = await supabase
        .from('availability_slots')
        .select('id,start_at,end_at')
        .in('id', slotIds);

      (slots || []).forEach((s: any) => {
        slotsMap[s.id] = { id: s.id, start_at: s.start_at, end_at: s.end_at };
      });
    }

    const combined = apList.map(a => ({ ...a, slot: slotsMap[a.slot_id] }));
    setAppts(combined);
    setLoading(false);
  }

  const fmt = (iso?: string) =>
    iso ? new Date(iso).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' }) : '—';

  async function cancelar(appt: Appt & { slot?: Slot }) {
    setMsg(null);

    // Regla simple: al menos 3 horas antes del inicio
    const start = appt.slot?.start_at ? new Date(appt.slot.start_at) : null;
    if (start) {
      const diffMs = start.getTime() - Date.now();
      const diffHrs = diffMs / 1000 / 60 / 60;
      if (diffHrs < 3) {
        setMsg('No es posible cancelar con menos de 3 horas de antelación.');
        return;
      }
    }

    const { error } = await supabase
      .from('appointments')
      .update({ status: 'cancelled' })
      .eq('id', appt.id);

    if (error) {
      setMsg(error.message || 'No se pudo cancelar la cita.');
    } else {
      setMsg('Cita cancelada.');
      if (session) loadAppts(session.user.id);
    }
  }

  const hasAppts = useMemo(() => appts.length > 0, [appts]);

  if (!ready) return <div className="wrap">Cargando…</div>;

  if (!session) {
    return (
      <main className="section">
        <div className="wrap" style={{ maxWidth: 580 }}>
          <h1 className="h1">Mi panel</h1>
          <p className="muted">Inicia sesión para ver tus citas y recibos.</p>
          <a className="btn btn--primary" href="/cliente/acceso">Iniciar sesión</a>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 860 }}>
        <header className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div>
            <div className="muted" style={{ fontWeight: 700 }}>Mi panel</div>
            <div style={{ fontSize: 14 }}>Sesión: <strong>{session.user.email}</strong></div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href="/agenda" className="btn btn--ghost">Agendar nueva</a>
            <button
              className="btn btn--ghost"
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = '/';
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        <section style={{ marginTop: 16 }}>
          <h2 className="h2" style={{ marginBottom: 10 }}>Mis próximas asesorías</h2>

          {loading && <div className="panel">Cargando…</div>}

          {!loading && !hasAppts && (
            <div className="panel">
              Aún no tienes citas activas. <a href="/agenda">Agenda aquí</a>.
            </div>
          )}

          {!loading && hasAppts && (
            <div style={{ display: 'grid', gap: 12 }}>
              {appts.map((a) => (
                <div key={a.id} className="panel" style={{ display: 'grid', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{fmt(a.slot?.start_at)} – {fmt(a.slot?.end_at)}</div>
                      <div className="muted">Estado: <strong>{a.status}</strong></div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {a.meet_url ? (
                        <a className="btn btn--primary" href={a.meet_url} target="_blank">Entrar a la videollamada</a>
                      ) : (
                        <button className="btn btn--ghost" disabled>Enlace pendiente</button>
                      )}
                      <button className="btn btn--ghost" onClick={() => cancelar(a)}>Cancelar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {msg && (
            <div className="panel" style={{ marginTop: 10, background: '#fff7e6', borderColor: '#ffe7ba' }}>
              {msg}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
