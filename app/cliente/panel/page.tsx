'use client';

import { useEffect, useState } from 'react';
import { createClient, Session } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Appt = {
  id: string;
  status: string;
  created_at: string;
  meet_url: string | null;
  duration_min: number;
};

export default function ClientePanelPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [appts, setAppts] = useState<Appt[]>([]);
  const [ready, setReady] = useState(false);

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
      const uid = session?.user?.id;
      if (!uid) return;
      const { data } = await supabase
        .from('appointments')
        .select('id,status,created_at,meet_url,duration_min')
        .eq('client_id', uid)
        .order('created_at', { ascending: false });
      setAppts(data || []);
    })();
  }, [session]);

  if (!ready) return <div className="wrap">Cargando…</div>;
  if (!session) {
    if (typeof window !== 'undefined') window.location.href = '/cliente/acceso';
    return null;
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <h1 className="h2">Mi panel</h1>
        <p className="muted">Aquí verás tus citas, enlaces y recibos.</p>

        <div className="panel" style={{ display: 'grid', gap: 12 }}>
          {appts.length === 0 && <div className="muted">Aún no tienes citas.</div>}
          {appts.map((a) => (
            <div key={a.id} className="panel" style={{ display: 'grid', gap: 6 }}>
              <div><strong>Estado:</strong> {a.status}</div>
              <div><strong>Creada:</strong> {new Date(a.created_at).toLocaleString('es-CO')}</div>
              <div><strong>Duración:</strong> {a.duration_min} min</div>
              <div>
                <strong>Enlace:</strong>{' '}
                {a.meet_url ? <a href={a.meet_url} target="_blank">Entrar a la llamada</a> : '—'}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn--ghost" disabled>Reagendar (pronto)</button>
                <button className="btn btn--ghost" disabled>Cancelar (pronto)</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
