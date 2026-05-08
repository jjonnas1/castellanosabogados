'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProfileRoleByUserId, type AppRole } from '@/lib/profile-role';
import AdminShell from '@/components/AdminShell';
import DashboardCitas from '@/components/DashboardCitas';
import { useAdminAuth } from '@/contexts/admin-auth';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Stats {
  clientes:         number;
  citas:            number;
  consultas:        number;
  leads:            number;
  visitasHoy:       number;
  procesosActivos:  number;
  actuacionesNuevas: number;
}

interface Appointment {
  id:       string;
  title:    string;
  start_at: string;
  end_at:   string;
  status:   string;
}

interface ProcesoAlerta {
  id: string;
  radicado: string;
  nombre_cliente: string;
  actuaciones_nuevas: number;
}

interface Vencimiento {
  id: string;
  radicado: string;
  nombre_cliente: string;
  alerta_vencimiento: string;
  tipo_vencimiento: string | null;
}

interface WhatsAppLead {
  id: string;
  nombre: string;
  telefono: string;
  service_interest: string | null;
  source_path: string | null;
  status?: string | null;
  created_at: string;
  wa_url: string | null;
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

function StatCard({ label, value, color, href }: { label: string; value: number | string; color: string; href: string }) {
  return (
    <Link
      href={href}
      className="block bg-[#111f35] border border-[#1e3a6e]/50 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:bg-[#162138] hover:border-[#2a4a8a] hover:shadow-lg hover:-translate-y-0.5"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-bold tabular-nums ${color}`}>{value}</p>
    </Link>
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
  const { token, userId } = useAdminAuth();
  const [role, setRole]         = useState<AppRole>(null);
  const [loadingRole, setLoadingRole] = useState(true);
  const [stats, setStats]       = useState<Stats>({
    clientes: 0, citas: 0, consultas: 0, visitasHoy: 0, procesosActivos: 0, actuacionesNuevas: 0,
    leads: 0,
  });
  const [procesosConNuevas, setProcesosConNuevas] = useState<ProcesoAlerta[]>([]);
  const [vencimientos, setVencimientos]           = useState<Vencimiento[]>([]);
  const [staleLeads, setStaleLeads]               = useState<WhatsAppLead[]>([]);

  useEffect(() => {
    let mounted = true;
    async function loadRole() {
      if (!userId) { setRole(null); setLoadingRole(false); return; }
      setLoadingRole(true);
      const r = await getProfileRoleByUserId(userId);
      if (!mounted) return;
      setRole(r); setLoadingRole(false);
    }
    loadRole();
    return () => { mounted = false; };
  }, [userId]);

  useEffect(() => {
    if (!token) return;
    Promise.all([
      fetch('/api/admin/workspace', { headers: { authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((d: { clients?: unknown[]; appointments?: unknown[]; consultations?: unknown[]; whatsappLeads?: WhatsAppLead[] }) => {
          const leads = d.whatsappLeads ?? [];
          const staleCutoff = Date.now() - 24 * 60 * 60 * 1000;
          setStaleLeads(
            leads
              .filter((lead) => (lead.status ?? 'nuevo') === 'nuevo' && new Date(lead.created_at).getTime() <= staleCutoff)
              .slice(0, 5),
          );
          return {
            clientes:  (d.clients       ?? []).length,
            citas:     (d.appointments  ?? []).length,
            consultas: (d.consultations ?? []).length,
            leads:     leads.filter((lead) => (lead.status ?? 'nuevo') !== 'descartado').length,
          };
        })
        .catch(() => ({ clientes: 0, citas: 0, consultas: 0, leads: 0 })),
      fetch('/api/admin/visits?limit=1', { headers: { authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((d: { today?: number }) => d.today ?? 0)
        .catch(() => 0),
      fetch('/api/admin/procesos', { headers: { authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((d: { procesos?: Array<{ id: string; radicado: string; nombre_cliente: string; estado: string; actuaciones_nuevas: number }> }) => {
          const ps = d.procesos ?? [];
          setProcesosConNuevas(
            ps.filter((p) => p.actuaciones_nuevas > 0).slice(0, 5),
          );
          return {
            procesosActivos:   ps.filter((p) => p.estado === 'Activo' || p.estado === 'En trámite').length,
            actuacionesNuevas: ps.reduce((s, p) => s + (p.actuaciones_nuevas ?? 0), 0),
          };
        })
        .catch(() => ({ procesosActivos: 0, actuacionesNuevas: 0 })),
      fetch('/api/admin/procesos/alertas', { headers: { authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((d: { vencimientos?: Vencimiento[] }) => {
          setVencimientos((d.vencimientos ?? []).slice(0, 5));
        })
        .catch(() => {}),
    ]).then(([ws, visitasHoy, proc]) => {
      setStats({
        ...(ws as Pick<Stats, 'clientes' | 'citas' | 'consultas'>),
        leads: (ws as Pick<Stats, 'leads'>).leads,
        visitasHoy: visitasHoy as number,
        ...(proc as Pick<Stats, 'procesosActivos' | 'actuacionesNuevas'>),
      });
    });
  }, [token]);

  if (!token || loadingRole) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-screen">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminShell>
    );
  }
  if (role !== 'admin') return null;

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

        {/* Stats — grid-cols-3 top row + 3 bottom */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard label="Clientes"      value={stats.clientes}   color="text-blue-400"   href="/admin/clientes" />
          <StatCard label="Leads activos" value={stats.leads}      color="text-emerald-400" href="/admin/consultas" />
          <StatCard label="Consultas"     value={stats.consultas}  color="text-violet-400" href="/admin/consultas" />
          <StatCard label="Citas totales" value={stats.citas}      color="text-indigo-400" href="/admin/agenda" />
          <StatCard label="Procesos activos"    value={stats.procesosActivos}   color="text-emerald-400" href="/admin/procesos" />
          <StatCard label="Actuaciones nuevas"  value={stats.actuacionesNuevas} color={stats.actuacionesNuevas > 0 ? 'text-red-400' : 'text-slate-400'} href="/admin/procesos" />
          <StatCard label="Visitas hoy"   value={stats.visitasHoy} color="text-cyan-400"   href="/admin/visitas" />
        </div>

        {staleLeads.length > 0 && (
          <div className="rounded-2xl border border-amber-900/50 bg-amber-950/20 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">Leads sin contactar por más de 24 horas</p>
                <p className="mt-1 text-sm text-slate-400">Prioriza estos contactos antes de seguir con tareas internas.</p>
              </div>
              <Link href="/admin/consultas" className="shrink-0 rounded-lg border border-amber-700/50 px-3 py-2 text-xs font-semibold text-amber-200 transition hover:bg-amber-900/30">
                Gestionar leads
              </Link>
            </div>
            <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
              {staleLeads.map((lead) => (
                <a
                  key={lead.id}
                  href={lead.wa_url ?? `https://wa.me/57${lead.telefono.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-amber-900/40 bg-[#0b1929] px-3 py-2 transition hover:border-amber-600/60"
                >
                  <p className="text-sm font-semibold text-slate-100">{lead.nombre}</p>
                  <p className="text-xs text-slate-500">{lead.telefono} · {lead.service_interest ?? 'Consulta general'}</p>
                </a>
              ))}
            </div>
          </div>
        )}

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
              <Link href="/admin/agenda" className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors">
                Ver todo →
              </Link>
            </div>
            <TodayTimeline token={token} />
          </div>
        </div>

        {/* Alertas procesales */}
        <div className="bg-[#0b1929] border border-[#1e3a6e]/60 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Alertas procesales
            </p>
            <Link href="/admin/procesos" className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors">
              Ver procesos →
            </Link>
          </div>

          {procesosConNuevas.length === 0 && vencimientos.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">Sin novedades procesales.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Actuaciones nuevas */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 mb-2">
                  Actuaciones nuevas sin leer
                </p>
                {procesosConNuevas.length === 0 ? (
                  <p className="text-xs text-slate-600">Sin actuaciones nuevas.</p>
                ) : (
                  <div className="space-y-2">
                    {procesosConNuevas.map((p) => (
                      <div key={p.id} className="flex items-center justify-between gap-3 bg-red-950/20 border border-red-900/30 rounded-lg px-3 py-2">
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-200 truncate">{p.nombre_cliente}</p>
                          <p className="text-[11px] font-mono text-slate-500 truncate">{p.radicado}</p>
                          <p className="text-[11px] text-red-400 mt-0.5">
                            {p.actuaciones_nuevas} actuación{p.actuaciones_nuevas !== 1 ? 'es' : ''} nueva{p.actuaciones_nuevas !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <Link
                          href={`/admin/procesos/${p.id}`}
                          className="flex-shrink-0 text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Ver →
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Vencimientos próximos */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 mb-2">
                  Vencimientos próximos (7 días)
                </p>
                {vencimientos.length === 0 ? (
                  <p className="text-xs text-slate-600">Sin vencimientos próximos.</p>
                ) : (
                  <div className="space-y-2">
                    {vencimientos.map((v) => {
                      const diasRestantes = Math.ceil(
                        (new Date(v.alerta_vencimiento).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
                      );
                      const color = diasRestantes <= 2 ? 'text-red-400' : diasRestantes <= 5 ? 'text-orange-400' : 'text-yellow-400';
                      const bg    = diasRestantes <= 2 ? 'bg-red-950/20 border-red-900/30' : diasRestantes <= 5 ? 'bg-orange-950/20 border-orange-900/30' : 'bg-yellow-950/20 border-yellow-900/30';
                      return (
                        <div key={v.id} className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2 ${bg}`}>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-slate-200 truncate">{v.nombre_cliente}</p>
                            <p className="text-[11px] text-slate-500 truncate">{v.tipo_vencimiento ?? 'Vencimiento'}</p>
                            <p className={`text-[11px] font-semibold mt-0.5 ${color}`}>
                              Vence en {diasRestantes} día{diasRestantes !== 1 ? 's' : ''}
                            </p>
                          </div>
                          <Link
                            href={`/admin/procesos/${v.id}`}
                            className="flex-shrink-0 text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            Ver →
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
