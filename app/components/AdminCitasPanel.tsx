'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

type Area = { slug: string; name: string };
type Profile = { id: string; email: string; role: 'client' | 'lawyer' | 'admin'; full_name: string | null };
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
  status: 'pending' | 'confirmed' | 'in_call' | 'completed' | 'cancelled';
  client?: Profile;
  lawyer?: Profile | null;
};

const STATUSES = ['pending', 'confirmed', 'in_call', 'completed', 'cancelled'] as const;
const FALLBACK_ADMIN_EMAIL = 'jonatancastellanosabogado@gmail.com';

async function getStableSession() {
  for (let i = 0; i < 6; i += 1) {
    const sessionData = await supabase.auth.getSession();
    if (sessionData.data.session?.user) return sessionData;
    await new Promise((resolve) => setTimeout(resolve, 400));
  }

  return supabase.auth.getSession();
}

async function resolveClientAdmin() {
  const s = await getStableSession();
  const user = s.data.session?.user;
  const token = s.data.session?.access_token;

  if (!user) return false;

  const userEmail = (user.email ?? '').toLowerCase();
  if (userEmail && userEmail === FALLBACK_ADMIN_EMAIL) return true;

  if (token) {
    try {
      const res = await fetch('/api/admin/me', { headers: { authorization: `Bearer ${token}` } });
      if (res.ok) return true;

      await fetch('/api/admin/ensure-role', {
        method: 'POST',
        headers: { authorization: `Bearer ${token}` },
      });

      const afterEnsure = await fetch('/api/admin/me', { headers: { authorization: `Bearer ${token}` } });
      if (afterEnsure.ok) return true;
    } catch {
      // fallback
    }
  }

  const { data: byId } = await supabase.from('user_profiles').select('role').eq('id', user.id).maybeSingle();
  if (byId?.role === 'admin') return true;

  if (userEmail) {
    const { data: byEmail } = await supabase.from('user_profiles').select('role').eq('email', userEmail).maybeSingle();
    if (byEmail?.role === 'admin') return true;

    const { data: profileByEmail } = await supabase.from('profiles').select('role').eq('email', userEmail).maybeSingle();
    if (profileByEmail?.role === 'admin') return true;
  }

  const { data: profileById } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle();
  return profileById?.role === 'admin';
}

export default function AdminCitasPanel() {
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
        setIsAdmin(await resolveClientAdmin());
      } catch {
        setIsAdmin(false);
      } finally {
        setAuthResolved(true);
      }
    };

    resolveAdmin();
    const { data: authSub } = supabase.auth.onAuthStateChange(resolveAdmin);
    return () => authSub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      const [a, l] = await Promise.all([
        supabase.from('service_areas').select('slug,name').order('sort', { ascending: true }),
        supabase.from('user_profiles').select('id,email,role,full_name').eq('role', 'lawyer').order('full_name', { ascending: true }),
      ]);
      if (!a.error && a.data) setAreas(a.data as Area[]);
      if (!l.error && l.data) setLawyers(l.data as Profile[]);
    })();
  }, [isAdmin]);

  async function load() {
    setLoading(true);

    let q = supabase
      .from('appointments')
      .select('id,created_at,start_ts,duration_min,client_id,lawyer_id,area_slug,note,meeting_url,status');

    if (qStatus !== 'all') q = q.eq('status', qStatus);
    if (qArea !== 'all') q = q.eq('area_slug', qArea);
    if (qLawyer !== 'all') q = q.eq('lawyer_id', qLawyer);

    q = q.order('start_ts', { ascending: true }).limit(500);

    const { data, error } = await q;
    if (!error && data) {
      const ids = Array.from(
        new Set([...data.map((d) => d.client_id), ...((data.map((d) => d.lawyer_id).filter(Boolean) as string[]))]),
      );

      let profs: Profile[] = [];
      if (ids.length) {
        const { data: p } = await supabase.from('user_profiles').select('id,email,role,full_name').in('id', ids);
        profs = (p || []) as Profile[];
      }

      const withJoin = (data as Appointment[]).map((a) => ({
        ...a,
        client: profs.find((p) => p.id === a.client_id),
        lawyer: a.lawyer_id ? profs.find((p) => p.id === a.lawyer_id) || null : null,
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

  async function assignLawyer(id: string, lawyer_id: string | null) {
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

  if (!authResolved) {
    return <section className="container section-shell"><div className="card-shell bg-white p-6">Cargando acceso administrativo…</div></section>;
  }

  if (!isAdmin) {
    return (
      <section className="container section-shell">
        <div className="card-shell bg-white p-8 text-center">
          <h1 className="text-2xl font-semibold text-ink">403</h1>
          <p className="mt-2 text-muted">No tienes permisos de administrador.</p>
          <p className="mt-2 text-sm text-muted">
            Si ya iniciaste sesión con Google pero no entras, configura rol admin en tu perfil o define
            <code> ADMIN_OWNER_EMAIL</code> en el entorno.
          </p>
          <Link href="/admin/login" className="btn-secondary mt-5 inline-flex">Volver al login admin</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container section-shell space-y-6">
      <header className="card-shell bg-white p-6">
        <p className="pill w-fit">Administración</p>
        <h1 className="mt-3 text-2xl font-semibold text-ink">Agenda administrativa</h1>
        <p className="mt-2 text-sm text-muted">Panel integrado en la misma app pública (sin UI paralela).</p>
      </header>

      <div className="card-shell bg-white p-5 grid gap-4 md:grid-cols-3">
        <label className="text-sm text-muted">Estado
          <select className="mt-1 w-full rounded-xl border border-border px-3 py-2" value={qStatus} onChange={(e) => setQStatus(e.target.value)}>
            <option value="all">Todos</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label className="text-sm text-muted">Área
          <select className="mt-1 w-full rounded-xl border border-border px-3 py-2" value={qArea} onChange={(e) => setQArea(e.target.value)}>
            <option value="all">Todas</option>
            {areas.map((a) => <option key={a.slug} value={a.slug}>{a.name}</option>)}
          </select>
        </label>
        <label className="text-sm text-muted">Abogado
          <select className="mt-1 w-full rounded-xl border border-border px-3 py-2" value={qLawyer} onChange={(e) => setQLawyer(e.target.value)}>
            <option value="all">Todos</option>
            {lawyers.map((l) => <option key={l.id} value={l.id}>{l.full_name || l.email}</option>)}
          </select>
        </label>
      </div>

      <div className="card-shell bg-white p-4 overflow-x-auto">
        {loading ? <p className="text-sm text-muted">Cargando agenda…</p> : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted">
                <th className="px-2 py-3">Fecha/Hora</th><th className="px-2 py-3">Cliente</th><th className="px-2 py-3">Área</th>
                <th className="px-2 py-3">Abogado</th><th className="px-2 py-3">Estado</th><th className="px-2 py-3">Meeting</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-b border-border/60 align-top">
                  <td className="px-2 py-3 whitespace-nowrap">{new Date(it.start_ts).toLocaleString('es-CO')}</td>
                  <td className="px-2 py-3">{it.client?.full_name || it.client?.email}</td>
                  <td className="px-2 py-3">{areas.find((a) => a.slug === it.area_slug)?.name || it.area_slug}</td>
                  <td className="px-2 py-3">
                    <select className="w-full rounded-lg border border-border px-2 py-1" value={it.lawyer_id || ''} onChange={(e) => assignLawyer(it.id, e.target.value || null)}>
                      <option value="">— sin asignar —</option>
                      {lawyers.map((l) => <option key={l.id} value={l.id}>{l.full_name || l.email}</option>)}
                    </select>
                  </td>
                  <td className="px-2 py-3">
                    <select className="w-full rounded-lg border border-border px-2 py-1" value={it.status} onChange={(e) => updateStatus(it.id, e.target.value as Appointment['status'])}>
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-2 py-3 min-w-[220px]">
                    <input className="w-full rounded-lg border border-border px-2 py-1" placeholder="https://…" defaultValue={it.meeting_url || ''} onBlur={(e) => updateMeeting(it.id, e.target.value)} />
                  </td>
                </tr>
              ))}
              {items.length === 0 && !loading && (
                <tr><td className="px-2 py-4 text-muted" colSpan={6}><em>Sin resultados con estos filtros</em></td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/administrativo/areas" className="btn-secondary">Configurar áreas</Link>
        <Link href="/administrativo/clientes" className="btn-secondary">Clientes y actualizaciones</Link>
      </div>
    </section>
  );
}
