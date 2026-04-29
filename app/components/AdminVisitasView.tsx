'use client';

import { useEffect, useState, useCallback, Fragment } from 'react';
import { useAdminAuth } from '@/contexts/admin-auth';

// ── Types ────────────────────────────────────────────────────────────────────

type Visit = {
  id: string;
  visited_at: string;
  path: string;
  referrer: string | null;
  user_agent: string | null;
  ip_masked: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  is_admin_visit: boolean;
  visitor_key: string | null;
};

type PageView = {
  id: string;
  path: string;
  duration_seconds: number | null;
  entered_at: string;
};

type ContactClick = {
  id: string;
  type: 'whatsapp' | 'email' | 'phone';
  occurred_at: string;
};

type VisitDetail = { page_views: PageView[]; contact_clicks: ContactClick[] };
type Stats       = { total: number; today: number; week: number; count: number };

// ── Helpers ──────────────────────────────────────────────────────────────────

function parseUA(ua: string | null): string {
  if (!ua) return '—';
  if (/iPhone|iPad|iOS/i.test(ua)) return 'iOS';
  if (/Android/i.test(ua)) return 'Android';
  if (/Chrome/i.test(ua) && !/Edge|OPR/i.test(ua)) return 'Chrome';
  if (/Firefox/i.test(ua)) return 'Firefox';
  if (/Safari/i.test(ua)) return 'Safari';
  if (/Edge/i.test(ua)) return 'Edge';
  if (/bot|spider|crawl/i.test(ua)) return 'Bot';
  return ua.slice(0, 30);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function shortPath(path: string) {
  return path.length > 40 ? path.slice(0, 40) + '…' : path;
}

function formatDuration(secs: number | null): string {
  if (secs === null || secs < 0) return '—';
  if (secs < 60) return `${secs}s`;
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

const CONTACT_LABELS: Record<string, string> = {
  whatsapp: 'WhatsApp',
  email:    'Correo',
  phone:    'Teléfono',
};

const CONTACT_COLORS: Record<string, string> = {
  whatsapp: 'bg-green-900/40 text-green-400 border-green-700/40',
  email:    'bg-blue-900/40  text-blue-400  border-blue-700/40',
  phone:    'bg-slate-800    text-slate-300 border-slate-600/40',
};

// ── Shared class snippets ─────────────────────────────────────────────────────
const inputCls     = 'rounded-lg border border-[#1e3a6e]/50 bg-[#0a1120] px-3 py-1.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50';
const btnPrimary   = 'px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition';
const btnSecondary = 'px-3 py-1.5 rounded-lg bg-[#1e3a6e]/30 hover:bg-[#1e3a6e]/60 text-slate-300 text-xs border border-[#1e3a6e]/40 transition disabled:opacity-40 disabled:cursor-not-allowed';

// ── Detail panel ─────────────────────────────────────────────────────────────

function DetailPanel({ visit, token }: { visit: Visit; token: string }) {
  const [detail,  setDetail]  = useState<VisitDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    if (!visit.visitor_key) { setLoading(false); return; }

    const params = new URLSearchParams({ visitor_key: visit.visitor_key, since: visit.visited_at });
    fetch(`/api/admin/visits/detail?${params}`, { headers: { authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then((res: { ok: boolean; page_views?: PageView[]; contact_clicks?: ContactClick[]; error?: string }) => {
        if (!res.ok) { setError(res.error ?? 'Error'); return; }
        setDetail({ page_views: res.page_views ?? [], contact_clicks: res.contact_clicks ?? [] });
      })
      .catch(e => setError((e as Error).message))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visit.id]);

  return (
    <div className="px-6 py-4 bg-[#060e1c] border-t border-[#1e3a6e]/30 space-y-4">
      {loading && (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          Cargando detalle…
        </div>
      )}
      {!loading && error && <p className="text-xs text-red-400">{error}</p>}
      {!loading && !error && detail && (
        <div className="grid gap-4 sm:grid-cols-2">

          {/* Páginas visitadas */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Páginas visitadas
            </p>
            {detail.page_views.length === 0 ? (
              <p className="text-xs text-slate-600 italic">Sin datos aún (solo sesiones nuevas)</p>
            ) : (
              <div className="space-y-1">
                {detail.page_views.map((pv) => (
                  <div key={pv.id} className="flex items-center justify-between gap-3 rounded-lg bg-[#0a1525] border border-[#1e3a6e]/20 px-3 py-2">
                    <span className="font-mono text-xs text-slate-300 truncate" title={pv.path}>{shortPath(pv.path)}</span>
                    <div className="shrink-0 flex items-center gap-2">
                      <span className="text-[10px] text-slate-500">{formatTime(pv.entered_at)}</span>
                      <span className="text-[10px] font-medium tabular-nums text-cyan-400 bg-cyan-900/20 border border-cyan-700/20 rounded px-1.5 py-0.5">
                        {formatDuration(pv.duration_seconds)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interacciones de contacto */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Interacciones de contacto
            </p>
            {detail.contact_clicks.length === 0 ? (
              <p className="text-xs text-slate-600 italic">No hizo clic en ningún medio de contacto</p>
            ) : (
              <div className="space-y-1">
                {detail.contact_clicks.map((cc) => (
                  <div key={cc.id} className="flex items-center justify-between gap-3 rounded-lg bg-[#0a1525] border border-[#1e3a6e]/20 px-3 py-2">
                    <span className={`text-[10px] font-semibold rounded-full border px-2 py-0.5 ${CONTACT_COLORS[cc.type]}`}>
                      {CONTACT_LABELS[cc.type]}
                    </span>
                    <span className="text-[10px] text-slate-500">{formatTime(cc.occurred_at)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AdminVisitasView() {
  const { token } = useAdminAuth();

  const [visits,       setVisits]       = useState<Visit[]>([]);
  const [stats,        setStats]        = useState<Stats>({ total: 0, today: 0, week: 0, count: 0 });
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState('');
  const [expandedId,   setExpandedId]   = useState<string | null>(null);

  const [pathFilter, setPathFilter] = useState('');
  const [fromFilter, setFromFilter] = useState('');
  const [toFilter,   setToFilter]   = useState('');
  const [hideAdmin,  setHideAdmin]  = useState(true);
  const [page,       setPage]       = useState(0);
  const limit = 50;

  const fetchVisits = useCallback(async () => {
    if (!token) { setError('Sin sesión admin.'); setLoading(false); return; }
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ limit: String(limit), offset: String(page * limit) });
      if (pathFilter) params.set('path', pathFilter);
      if (fromFilter) params.set('from', fromFilter);
      if (toFilter)   params.set('to',   toFilter + 'T23:59:59');
      if (hideAdmin)  params.set('no_admin', '1');

      const res  = await fetch(`/api/admin/visits?${params}`, { headers: { authorization: `Bearer ${token}` } });
      const json = await res.json() as {
        ok: boolean; error?: string;
        visits?: Visit[]; total?: number; today?: number; week?: number; count?: number;
      };

      if (!json.ok) { setError(json.error ?? 'Error'); return; }

      setVisits(json.visits ?? []);
      setStats({ total: json.total ?? 0, today: json.today ?? 0, week: json.week ?? 0, count: json.count ?? 0 });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [token, pathFilter, fromFilter, toFilter, hideAdmin, page]);

  useEffect(() => { fetchVisits(); }, [fetchVisits]);

  function handleFilter(e: React.FormEvent) {
    e.preventDefault();
    setPage(0);
    setExpandedId(null);
    fetchVisits();
  }

  function toggleExpand(id: string) {
    setExpandedId(prev => prev === id ? null : id);
  }

  const totalPages = Math.ceil(stats.count / limit);

  return (
    <div className="space-y-6">
      {/* Contadores */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total historial',  value: stats.total, color: 'text-blue-400'   },
          { label: 'Hoy',              value: stats.today, color: 'text-cyan-400'   },
          { label: 'Últimos 7 días',   value: stats.week,  color: 'text-indigo-400' },
          { label: 'Resultado filtro', value: stats.count, color: 'text-slate-300'  },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-[#0b1929] border border-[#1e3a6e]/50 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-widest text-slate-500">{label}</p>
            <p className={`mt-1 text-2xl font-bold tabular-nums ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="bg-[#0b1929] border border-[#1e3a6e]/50 rounded-2xl p-5">
        <form onSubmit={handleFilter} className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500">Ruta</label>
            <input className={inputCls} placeholder="/contacto, /servicios…" value={pathFilter} onChange={e => setPathFilter(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500">Desde</label>
            <input type="date" className={inputCls} value={fromFilter} onChange={e => setFromFilter(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500">Hasta</label>
            <input type="date" className={inputCls} value={toFilter} onChange={e => setToFilter(e.target.value)} />
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" checked={hideAdmin} onChange={e => setHideAdmin(e.target.checked)} className="accent-blue-500" />
            Ocultar visitas admin
          </label>
          <button type="submit" className={btnPrimary}>Filtrar</button>
          <button type="button" className={btnSecondary} onClick={() => { setPathFilter(''); setFromFilter(''); setToFilter(''); setHideAdmin(true); setPage(0); setExpandedId(null); }}>
            Limpiar
          </button>
          <button type="button" className={btnSecondary} onClick={fetchVisits}>Actualizar</button>
        </form>
      </div>

      {/* Tabla */}
      <div className="bg-[#0b1929] border border-[#1e3a6e]/50 rounded-2xl overflow-hidden">
        {error && (
          <div className="p-4 text-sm text-red-400 bg-red-950/20 border-b border-red-800/30">{error}</div>
        )}
        {loading && (
          <div className="flex items-center gap-2 p-5 text-sm text-slate-500">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin shrink-0" />
            Cargando visitas…
          </div>
        )}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0a1120] border-b border-[#1e3a6e]/50">
                <tr>
                  {['Fecha / Hora', 'Ruta', 'Referrer', 'Ubicación', 'Navegador', 'IP', 'Visitante'].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e3a6e]/30">
                {visits.length === 0 && (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-500 text-sm">Sin registros para los filtros seleccionados.</td></tr>
                )}
                {visits.map((v) => {
                  const isExpanded = expandedId === v.id;
                  return (
                    <Fragment key={v.id}>
                      <tr
                        className={`transition hover:bg-[#0d1f3a] cursor-pointer select-none ${v.is_admin_visit ? 'opacity-50' : ''} ${isExpanded ? 'bg-[#0d1f3a]' : ''}`}
                        onClick={() => toggleExpand(v.id)}
                        title="Clic para ver páginas visitadas y contactos"
                      >
                        <td className="whitespace-nowrap px-4 py-2.5 text-xs text-slate-500">{formatDate(v.visited_at)}</td>
                        <td className="px-4 py-2.5">
                          <span className="font-mono text-xs text-slate-300" title={v.path}>{shortPath(v.path)}</span>
                          {v.is_admin_visit && <span className="ml-1 rounded-full bg-[#111f35] px-1.5 py-0.5 text-[10px] text-slate-500">admin</span>}
                        </td>
                        <td className="px-4 py-2.5 text-xs text-slate-500 max-w-[180px] truncate">
                          {v.referrer ? <span title={v.referrer}>{v.referrer.replace(/^https?:\/\//, '').slice(0, 30)}</span> : '—'}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2.5 text-xs text-slate-300">
                          {[v.city, v.region, v.country].filter(Boolean).join(', ') || '—'}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2.5 text-xs text-slate-500">{parseUA(v.user_agent)}</td>
                        <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-slate-500">{v.ip_masked ?? '—'}</td>
                        <td className="whitespace-nowrap px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-slate-500">
                              {v.visitor_key ? v.visitor_key.slice(0, 8) + '…' : '—'}
                            </span>
                            <span className={`text-[10px] text-slate-600 transition-transform duration-150 inline-block ${isExpanded ? 'rotate-90 text-blue-400' : ''}`}>
                              ▶
                            </span>
                          </div>
                        </td>
                      </tr>
                      {isExpanded && token && (
                        <tr>
                          <td colSpan={7} className="p-0">
                            <DetailPanel visit={v} token={token} />
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-[#1e3a6e]/40 px-4 py-3">
            <p className="text-xs text-slate-500">Página {page + 1} de {totalPages}</p>
            <div className="flex gap-2">
              <button className={btnSecondary} disabled={page === 0} onClick={() => { setPage(p => p - 1); setExpandedId(null); }}>Anterior</button>
              <button className={btnSecondary} disabled={page >= totalPages - 1} onClick={() => { setPage(p => p + 1); setExpandedId(null); }}>Siguiente</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
