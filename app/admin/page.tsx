'use client';

import { useEffect, useState } from 'react';
import { createClient, Session } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Row = {
  id: string;
  status: string;
  created_at: string;
  duration_min: number;
  meet_url: string | null;
  client: { email: string | null } | null;
  lawyer: { id: string } | null;
};

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);
      setReady(true);

      const uid = data.session?.user?.id;
      if (uid) {
        const { data: prof } = await supabase.from('profiles').select('role').eq('id', uid).maybeSingle();
        setRole(prof?.role ?? null);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!session || role !== 'admin') return;
      const { data } = await supabase
        .from('appointments')
        .select(`id,status,created_at,duration_min,meet_url,
                 profiles:client_id(email),
                 lawyers:lawyer_id(id)`)
        .order('created_at', { ascending: false });
      // normalizar
      const mapped: Row[] = (data || []).map((d: any) => ({
        id: d.id,
        status: d.status,
        created_at: d.created_at,
        duration_min: d.duration_min,
        meet_url: d.meet_url,
        client: { email: d.profiles?.email || null },
        lawyer: { id: d.lawyers?.id || null },
      }));
      setRows(mapped);
    })();
  }, [session, role]);

  if (!ready) return <div className="wrap">Cargando…</div>;
  if (!session) {
    if (typeof window !== 'undefined') window.location.href = '/cliente/acceso';
    return null;
  }
  if (role !== 'admin') return <main className="section"><div className="wrap">Sin permisos.</div></main>;

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 1000 }}>
        <h1 className="h2">Admin — Todas las citas</h1>
        <div className="panel" style={{ display: 'grid', gap: 8 }}>
          {rows.length === 0 && <div className="muted">No hay registros.</div>}
          {rows.map(r => (
            <div key={r.id} className="panel" style={{ display:'grid', gap:6 }}>
              <div><strong>ID:</strong> {r.id}</div>
              <div><strong>Estado:</strong> {r.status}</div>
              <div><strong>Cliente:</strong> {r.client?.email || '—'}</div>
              <div><strong>Abogado ID:</strong> {r.lawyer?.id || '—'}</div>
              <div><strong>Creada:</strong> {new Date(r.created_at).toLocaleString('es-CO')}</div>
              <div><strong>Duración:</strong> {r.duration_min} min</div>
              <div><strong>Enlace:</strong> {r.meet_url ? <a href={r.meet_url} target="_blank">Abrir</a> : '—'}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
