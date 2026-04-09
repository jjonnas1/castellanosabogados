'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase-browser';

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

type Stats = { total: number; today: number; week: number; count: number };

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
  const d = new Date(iso);
  return d.toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' });
}

function shortPath(path: string) {
  return path.length > 40 ? path.slice(0, 40) + '…' : path;
}

export default function AdminVisitasView() {
  const [visits,   setVisits]   = useState<Visit[]>([]);
  const [stats,    setStats]    = useState<Stats>({ total: 0, today: 0, week: 0, count: 0 });
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  // Filtros
  const [pathFilter,    setPathFilter]    = useState('');
  const [fromFilter,    setFromFilter]    = useState('');
  const [toFilter,      setToFilter]      = useState('');
  const [hideAdmin,     setHideAdmin]     = useState(true);
  const [page,          setPage]          = useState(0);
  const limit = 50;

  const fetchVisits = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) { setError('Sin sesión admin.'); setLoading(false); return; }

      const params = new URLSearchParams({
        limit:  String(limit),
        offset: String(page * limit),
      });
      if (pathFilter) params.set('path', pathFilter);
      if (fromFilter) params.set('from', fromFilter);
      if (toFilter)   params.set('to',   toFilter + 'T23:59:59');
      if (hideAdmin)  params.set('no_admin', '1');

      const res  = await fetch(`/api/admin/visits?${params}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const json = await res.json() as {
        ok: boolean; error?: string;
        visits?: Visit[]; total?: number; today?: number; week?: number; count?: number;
      };

      if (!json.ok) { setError(json.error ?? 'Error'); setLoading(false); return; }

      setVisits(json.visits ?? []);
      setStats({
        total: json.total ?? 0,
        today: json.today ?? 0,
        week:  json.week  ?? 0,
        count: json.count ?? 0,
      });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [pathFilter, fromFilter, toFilter, hideAdmin, page]);

  useEffect(() => { fetchVisits(); }, [fetchVisits]);

  function handleFilter(e: React.FormEvent) {
    e.preventDefault();
    setPage(0);
    fetchVisits();
  }

  const totalPages = Math.ceil(stats.count / limit);

  return (
    <div className="container section-shell space-y-6">
      {/* Encabezado */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-ink">Visitas del sitio</h1>
        <button onClick={fetchVisits} className="btn-secondary text-xs">Actualizar</button>
      </div>

      {/* Contadores */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total historial', value: stats.total },
          { label: 'Hoy',            value: stats.today },
          { label: 'Últimos 7 días', value: stats.week  },
          { label: 'Resultado filtro', value: stats.count },
        ].map(({ label, value }) => (
          <article key={label} className="card-shell bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
            <p className="mt-1 text-2xl font-semibold text-ink">{value}</p>
          </article>
        ))}
      </div>

      {/* Filtros */}
      <article className="card-shell bg-white p-4">
        <form onSubmit={handleFilter} className="flex flex-wrap items-end gap-3 text-sm">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">Ruta</label>
            <input
              className="rounded-lg border border-border px-3 py-1.5 text-sm"
              placeholder="/blog, /contacto…"
              value={pathFilter}
              onChange={(e) => setPathFilter(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">Desde</label>
            <input
              type="date"
              className="rounded-lg border border-border px-3 py-1.5 text-sm"
              value={fromFilter}
              onChange={(e) => setFromFilter(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">Hasta</label>
            <input
              type="date"
              className="rounded-lg border border-border px-3 py-1.5 text-sm"
              value={toFilter}
              onChange={(e) => setToFilter(e.target.value)}
            />
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              checked={hideAdmin}
              onChange={(e) => setHideAdmin(e.target.checked)}
              className="accent-accent-700"
            />
            Ocultar visitas admin
          </label>
          <button type="submit" className="btn-primary">Filtrar</button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setPathFilter(''); setFromFilter(''); setToFilter('');
              setHideAdmin(true); setPage(0);
            }}
          >
            Limpiar
          </button>
        </form>
      </article>

      {/* Tabla */}
      <article className="card-shell overflow-hidden bg-white">
        {error && <p className="p-4 text-sm text-red-500">{error}</p>}
        {loading && <p className="p-4 text-sm text-muted">Cargando…</p>}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-canvas">
                <tr>
                  {['Fecha / Hora', 'Ruta', 'Referrer', 'Ubicación', 'Navegador', 'IP', 'Visitante'].map((h) => (
                    <th key={h} className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {visits.length === 0 && (
                  <tr><td colSpan={7} className="px-4 py-6 text-center text-muted">Sin registros.</td></tr>
                )}
                {visits.map((v) => (
                  <tr key={v.id} className={`transition hover:bg-surface ${v.is_admin_visit ? 'opacity-60' : ''}`}>
                    <td className="whitespace-nowrap px-4 py-2 text-xs text-muted">{formatDate(v.visited_at)}</td>
                    <td className="px-4 py-2">
                      <span className="font-mono text-xs text-ink" title={v.path}>{shortPath(v.path)}</span>
                      {v.is_admin_visit && <span className="ml-1 rounded-full bg-panel px-1.5 py-0.5 text-[10px] text-muted">admin</span>}
                    </td>
                    <td className="px-4 py-2 text-xs text-muted max-w-[180px] truncate" title={v.referrer ?? ''}>
                      {v.referrer ? (
                        <span title={v.referrer}>{v.referrer.replace(/^https?:\/\//, '').slice(0, 30)}</span>
                      ) : '—'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-xs text-ink">
                      {[v.city, v.region, v.country].filter(Boolean).join(', ') || '—'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-xs text-muted">{parseUA(v.user_agent)}</td>
                    <td className="whitespace-nowrap px-4 py-2 font-mono text-xs text-muted">{v.ip_masked ?? '—'}</td>
                    <td className="whitespace-nowrap px-4 py-2 font-mono text-xs text-muted">
                      {v.visitor_key ? v.visitor_key.slice(0, 8) + '…' : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm">
            <p className="text-muted">Página {page + 1} de {totalPages}</p>
            <div className="flex gap-2">
              <button className="btn-secondary" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>Anterior</button>
              <button className="btn-secondary" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>Siguiente</button>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
