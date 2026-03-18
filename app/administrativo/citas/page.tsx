'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase-browser';

type Area = { slug: string; name: string };
type Profile = { id: string; email: string; role: 'client'|'lawyer'|'admin'; full_name: string|null };
type Appointment = {
  id: string;
  created_at: string;
  start_ts: string;
  duration_min: number;
  client_id: string;
  lawyer_id: string | null;
  area_slug: string;
  note: string | null;
  meeting_url: string | null;
  status: 'pending'|'confirmed'|'in_call'|'completed'|'cancelled';
  client?: Profile;
  lawyer?: Profile | null;
};

const STATUSES = ['pending','confirmed','in_call','completed','cancelled'] as const;

async function resolveClientAdmin() {
  const s = await Promise.race([
    supabase.auth.getSession(),
    new Promise<any>((resolve) => setTimeout(() => resolve({ data: { session: null } }), 2500)),
  ]);
  const user = s.data.session?.user;
  const token = s.data.session?.access_token;

  if (!user) return false;

  if (token) {
    try {
      const res = await fetch('/api/admin/me', { headers: { authorization: `Bearer ${token}` } });
      if (res.ok) return true;
    } catch {
      // fallback to client-side profile query
    }
  }

  const { data: byId } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (byId?.role === 'admin') return true;

  const email = user.email;
  if (!email) return false;

  const { data: byEmail } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('email', email)
    .maybeSingle();

  return byEmail?.role === 'admin';
}

export default function AdminCitasPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [authResolved, setAuthResolved] = useState(false);
  const [areas, setAreas] = useState<Area[]>([]);
  const [lawyers, setLawyers] = useState<Profile[]>([]);
  const [items, setItems] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const [qStatus, setQStatus] = useState<string>('all');
  const [qArea, setQArea] = useState<string>('all');
  const [qLawyer, setQLawyer] = useState<string>('all');

  useEffect(() => {
    const resolveAdmin = async () => {
      try {
        const ok = await resolveClientAdmin();
        setIsAdmin(ok);
      } catch {
        setIsAdmin(false);
      } finally {
        setAuthResolved(true);
      }
    };

    resolveAdmin();

    const { data: authSub } = supabase.auth.onAuthStateChange(() => {
      resolveAdmin();
    });

    return () => {
      authSub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      const [a, l] = await Promise.all([
        supabase.from('service_areas').select('slug,name').order('sort',{ascending:true}),
        supabase.from('user_profiles').select('id,email,role,full_name').eq('role','lawyer').order('full_name',{ascending:true}),
      ]);
      if (!a.error && a.data) setAreas(a.data as Area[]);
      if (!l.error && l.data) setLawyers(l.data as Profile[]);
    })();
  }, [isAdmin]);

  async function load() {
    setLoading(true);

    let q = supabase.from('appointments')
      .select('id,created_at,start_ts,duration_min,client_id,lawyer_id,area_slug,note,meeting_url,status');

    if (qStatus !== 'all') q = q.eq('status', qStatus);
    if (qArea !== 'all') q = q.eq('area_slug', qArea);
    if (qLawyer !== 'all') q = q.eq('lawyer_id', qLawyer);

    q = q.order('start_ts', { ascending: true }).limit(500);

    const { data, error } = await q;
    if (!error && data) {
      const ids = Array.from(new Set([
        ...data.map(d => d.client_id),
        ...data.map(d => d.lawyer_id).filter(Boolean) as string[]
      ]));

      let profs: Profile[] = [];
      if (ids.length) {
        const { data: p } = await supabase.from('user_profiles')
          .select('id,email,role,full_name').in('id', ids);
        profs = (p || []) as Profile[];
      }

      const withJoin = (data as Appointment[]).map(a => ({
        ...a,
        client: profs.find(p => p.id === a.client_id),
        lawyer: a.lawyer_id ? profs.find(p => p.id === a.lawyer_id) || null : null,
      }));

      setItems(withJoin);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!authResolved || !isAdmin) {
      setLoading(false);
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authResolved, isAdmin, qStatus, qArea, qLawyer]);

  async function assignLawyer(id: string, lawyer_id: string|null) {
    await supabase.from('appointments').update({ lawyer_id, status: lawyer_id ? 'confirmed' : 'pending' }).eq('id', id);
    load();
  }
  async function updateStatus(id: string, status: Appointment['status']) {
    await supabase.from('appointments').update({ status }).eq('id', id);
    load();
  }
  async function updateMeeting(id: string, url: string) {
    await supabase.from('appointments').update({ meeting_url: url }).eq('id', id);
    load();
  }

  if (!authResolved) return <main className="main section"><div className="wrap">Cargando…</div></main>;

  if (!isAdmin) {
    return (
      <main className="main section">
        <div className="wrap">
          <h1>403</h1>
          <p>No tienes permisos de administrador.</p>
          <p style={{ marginTop: 8 }}>Si ya iniciaste sesión con Google pero no entras, configura rol admin en tu perfil o define <code>ADMIN_OWNER_EMAIL</code> en el entorno del servidor.</p>
          <a href="/admin/login" className="btn btn--ghost" style={{ marginTop: 12 }}>Volver al login admin</a>
        </div>
      </main>
    );
  }

  return (
    <main className="main section">
      <div className="wrap">
        <h1 className="h1">Panel de citas (Administrador)</h1>

        <div className="panel" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, maxWidth: 980 }}>
          <label>
            Estado
            <select value={qStatus} onChange={e=>setQStatus(e.target.value)}>
              <option value="all">Todos</option>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label>
            Área
            <select value={qArea} onChange={e=>setQArea(e.target.value)}>
              <option value="all">Todas</option>
              {areas.map(a => <option key={a.slug} value={a.slug}>{a.name}</option>)}
            </select>
          </label>
          <label>
            Abogado
            <select value={qLawyer} onChange={e=>setQLawyer(e.target.value)}>
              <option value="all">Todos</option>
              {lawyers.map(l => (
                <option key={l.id} value={l.id}>{l.full_name || l.email}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="panel" style={{ marginTop: 12, overflowX: 'auto' }}>
          {loading ? <p>Cargando…</p> : (
            <table className="table">
              <thead>
                <tr>
                  <th>Fecha/Hora</th>
                  <th>Cliente</th>
                  <th>Área</th>
                  <th>Abogado</th>
                  <th>Estado</th>
                  <th>Meeting</th>
                </tr>
              </thead>
              <tbody>
                {items.map(it => (
                  <tr key={it.id}>
                    <td>{new Date(it.start_ts).toLocaleString('es-CO')}</td>
                    <td>{it.client?.full_name || it.client?.email}</td>
                    <td>{areas.find(a=>a.slug===it.area_slug)?.name || it.area_slug}</td>
                    <td>
                      <select
                        value={it.lawyer_id || ''}
                        onChange={e => assignLawyer(it.id, e.target.value || null)}
                      >
                        <option value="">— sin asignar —</option>
                        {lawyers.map(l => (
                          <option key={l.id} value={l.id}>{l.full_name || l.email}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select value={it.status} onChange={e=>updateStatus(it.id, e.target.value as any)}>
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td style={{ minWidth: 220 }}>
                      <input
                        placeholder="https://…"
                        defaultValue={it.meeting_url || ''}
                        onBlur={e => updateMeeting(it.id, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
                {items.length === 0 && !loading && (
                  <tr><td colSpan={6}><em>Sin resultados con estos filtros</em></td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div style={{ marginTop: 8 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link href="/administrativo/areas" className="btn btn--ghost">Configurar áreas</Link>
            <Link href="/administrativo/clientes" className="btn btn--ghost">Clientes y actualizaciones</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
