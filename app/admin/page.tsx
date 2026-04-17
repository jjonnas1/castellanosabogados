'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase-browser';
import { getProfileRoleByUserId, type AppRole } from '@/lib/profile-role';
import AdminShell from '@/components/AdminShell';
import DashboardCitas from '@/components/DashboardCitas';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Stats {
  clientes:   number;
  citas:      number;
  consultas:  number;
  visitasHoy: number;
}

interface Appointment {
  id:       string;
  title:    string;
  start_at: string;
  end_at:   string;
  status:   string;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function isToday(iso: string) {
  const d = new Date(iso);
  const n = new Date();
  return (
    d.getFullYear() === n.getFullYear() &&
    d.getMonth()    === n.getMonth()    &&
    d.getDate()     === n.getDate()
  );
}

function isOngoing(start: string, end: string) {
  const now = Date.now();
  return now >= new Date(start).getTime() && now <= new Date(end).getTime();
}

function fmtHora(iso: string) {
  return new Date(iso).toLocaleTimeString('es-CO', {
    hour: '2-digit', minute: '2-digit',
    timeZone: 'America/Bogota', hour12: true,
  });
}

// ─── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, color }: { label: string; value: number | string; color: string }) {
  return (
    <div className="bg-[#111f35] border border-[#1e3a6e]/50 rounded-xl p-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-bold tabular-nums ${color}`}>{value}</p>
    </div>
  );
}

// ─── Today timeline (right column) ─────────────────────────────────────────────

function TodayTimeline({ token }: { token: string }) {
  const [apts, setApts]       = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow]         = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!token) return;
    fetch('/api/admin/workspace', { headers: { authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d: { appointments?: Appointment[] }) => {
        setApts((d.appointments ?? []).filter((a) => isToday(a.start_at)));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  const sorted = [...apts].sort(
    (a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime()
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (sorted.length === 0) {
    return <p className="text-xs text-slate-500 py-8 text-center">No hay citas en la agenda hoy.</p>;
  }

  return (
    <div className="space-y-2">
      {sorted.map((a) => {
        const ongoing = isOngoing(a.start_at, a.end_at);
        const past    = now.getTime() > new Date(a.end_at).getTime();
        return (
          <div
            key={a.id}
            className={[
              'flex items-start gap-3 px-3 py-2.5 rounded-lg border transition-all',
              ongoing ? 'bg-red-950/30 border-red-500/50'
              : past  ? 'opacity-40 border-transparent'
              :         'border-[#1e3a6e]/40 bg-[#111f35]',
            ].join(' ')}
          >
            <div className="flex-shrink-0 w-[60px] text-right">
              <p className={`text-xs font-semibold ${ongoing ? 'text-red-300' : 'text-slate-300'}`}>
                {fmtHora(a.start_at)}
              </p>
              <p className="text-[10px] text-slate-600">{fmtHora(a.end_at)}</p>
            </div>
            <div className={`w-px self-stretch rounded-full ${ongoing ? 'bg-red-500' : 'bg-slate-700'}`} />
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-semibold truncate ${ongoing ? 'text-red-100' : 'text-slate-200'}`}>
                {a.title}
              </p>
              {ongoing && (
                <p className="text-[10px] font-bold uppercase tracking-wider text-red-400 mt-0.5">
                  Audiencia en curso
                </p>
              )}
              {!ongoing && (
                <p className="text-[10px] text-slate-600 mt-0.5 capitalize">{a.status}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function AdminRootPage() {
  const router = useRouter();
  const [session, setSession]               = useState<Session | null>(null);
  const [role, setRole]                     = useState<AppRole>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [loadingRole, setLoadingRole]       = useState(true);
  const [stats, setStats]                   = useState<Stats>({
    clientes: 0, citas: 0, consultas: 0, visitasHoy: 0,
  });

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setLoadingSession(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!mounted) return;
      setSession(s ?? null);
    });
    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    let mounted = true;
    async function loadRole() {
      if (!session?.user?.id) { setRole(null); setLoadingRole(false); return; }
      setLoadingRole(true);
      const r = await getProfileRoleByUserId(session.user.id);
      if (!mounted) return;
      setRole(r); setLoadingRole(false);
    }
    loadRole();
    return () => { mounted = false; };
  }, [session?.user?.id]);

  // CORRECCIÓN: Comentamos la redirección automática para evitar bucles de expulsión
  useEffect(() => {
    if (loadingSession || loadingRole) return;
    // if (!session) router.replace('/admin/login'); 
  }, [loadingSession, loadingRole, session, router]);

  useEffect(() => {
    if (!session?.access_token) return;
    const token = session.access_token;
    Promise.all([
      fetch('/api/admin/workspace', { headers: { authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((d: { clients?: unknown[]; appointments?: unknown[]; consultations?: unknown[] }) => ({
          clientes:  (d.clients       ?? []).length,
          citas:      (d.appointments  ?? []).length,
          consultas: (d.consultations ?? []).length,
        }))
        .catch(() => ({ clientes: 0, citas: 0, consultas: 0 })),
      fetch('/api/admin/visits?limit=1', { headers: { authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((d: { today?: number }) => d.today ?? 0)
        .catch(() => 0),
    ]).then(([ws, visitasHoy]) => {
      setStats({ ...(ws as Omit<Stats, 'visitasHoy'>), visitasHoy: visitasHoy as number });
    });
  }, [session?.access_token]);

  if (loadingSession || loadingRole) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-screen">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminShell>
    );
  }

  // Permitimos ver el dashboard si hay sesión, incluso mientras se valida el rol detalladamente
  if (!session) return (
    <AdminShell>
      <div className="flex items-center justify-center h-screen text-slate-400">
        Iniciando sesión en el Workspace...
      </div>
    </AdminShell>
  );

  return (
    <AdminShell>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-100">Resumen General</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {new Date().toLocaleDateString('es-CO', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                timeZone: 'America/Bogota',
              })}
            </p>
          </div>
        </div>

        {/* Stats — grid-cols-4 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Clientes"      value={stats.clientes}   color="text-blue-400" />
          <StatCard label="Citas totales" value={stats.citas}      color="text-indigo-400" />
          <StatCard label="Consultas"     value={stats.consultas}  color="text-violet-400" />
          <StatCard label="Visitas hoy"   value={stats.visitasHoy} color="text-cyan-400" />
        </div>

        {/* Body — two columns */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left: Google Calendar countdown */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
              Próxima audiencia · Google Calendar
            </p>
            <DashboardCitas />
          </div>

          {/* Right: Today timeline from appointments table */}
          <div className="bg-[#0b1929] border border-[#1e3a6e]/60 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Agenda de hoy
              </p>
              <a href="/admin/agenda" className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors">
                Ver todo →
              </a>
            </div>
            <TodayTimeline token={session.access_token} />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
