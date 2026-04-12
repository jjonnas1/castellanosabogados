'use client';

import { useEffect, useState, useCallback } from 'react';
import { createBrowserClient } from '@supabase/ssr';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface CitaGoogle {
  id: string;
  google_event_id: string;
  titulo: string;
  inicio: string;
  fin: string;
  descripcion: string | null;
}

type CitaStatus = 'proxima' | 'en_curso' | 'pasada';

interface CitaConEstado extends CitaGoogle {
  status: CitaStatus;
}

interface Countdown {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function getCitaStatus(inicio: string, fin: string, now: Date): CitaStatus {
  const start = new Date(inicio);
  const end = new Date(fin);
  if (now >= start && now <= end) return 'en_curso';
  if (now > end) return 'pasada';
  return 'proxima';
}

function getCountdown(targetIso: string, now: Date): Countdown {
  const diff = Math.max(0, new Date(targetIso).getTime() - now.getTime());
  const totalSecs = Math.floor(diff / 1000);
  return {
    dias: Math.floor(totalSecs / 86400),
    horas: Math.floor((totalSecs % 86400) / 3600),
    minutos: Math.floor((totalSecs % 3600) / 60),
    segundos: totalSecs % 60,
  };
}

function formatHora(iso: string) {
  return new Date(iso).toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Bogota',
  });
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function isSameDay(iso: string, now: Date) {
  const d = new Date(iso);
  const bog = (date: Date) =>
    new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Bogota',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  return bog(d) === bog(now);
}

// ─── Supabase client ───────────────────────────────────────────────────────────

function createSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function CountdownDisplay({ countdown, label }: { countdown: Countdown; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-end gap-2">
        {countdown.dias > 0 && (
          <>
            <span className="text-4xl font-bold tabular-nums text-accent-500">
              {pad(countdown.dias)}
            </span>
            <span className="text-xs text-muted mb-1">d</span>
          </>
        )}
        <span className="text-4xl font-bold tabular-nums text-accent-500">{pad(countdown.horas)}</span>
        <span className="text-xs text-muted mb-1">h</span>
        <span className="text-4xl font-bold tabular-nums text-accent-500">{pad(countdown.minutos)}</span>
        <span className="text-xs text-muted mb-1">m</span>
        <span className="text-4xl font-bold tabular-nums text-accent-500">{pad(countdown.segundos)}</span>
        <span className="text-xs text-muted mb-1">s</span>
      </div>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

function CitaCard({ cita }: { cita: CitaConEstado }) {
  const statusMap: Record<CitaStatus, { label: string; classes: string }> = {
    en_curso: {
      label: 'En Curso',
      classes: 'bg-green-100 text-green-800 border border-green-200',
    },
    proxima: {
      label: 'Próxima',
      classes: 'bg-accent-50 text-accent-700 border border-accent-50',
    },
    pasada: {
      label: 'Finalizada',
      classes: 'bg-panel text-muted border border-border',
    },
  };

  const { label, classes } = statusMap[cita.status];

  return (
    <div
      className={`relative bg-card rounded-xl border p-4 transition-all ${
        cita.status === 'en_curso'
          ? 'border-green-200 shadow-hover ring-1 ring-green-100'
          : cita.status === 'pasada'
          ? 'border-border opacity-60'
          : 'border-border shadow-soft'
      }`}
    >
      {cita.status === 'en_curso' && (
        <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>
      )}

      <div className="flex items-start gap-3">
        {/* Hora */}
        <div className="flex-shrink-0 text-center min-w-[52px]">
          <p className="text-sm font-semibold text-ink">{formatHora(cita.inicio)}</p>
          <p className="text-xs text-muted">{formatHora(cita.fin)}</p>
        </div>

        {/* Divider */}
        <div
          className={`w-px self-stretch rounded-full ${
            cita.status === 'en_curso' ? 'bg-green-400' : 'bg-border'
          }`}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-ink leading-snug truncate">{cita.titulo}</p>
          {cita.descripcion && (
            <p className="text-xs text-muted mt-0.5 line-clamp-2">{cita.descripcion}</p>
          )}
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${classes}`}>
          {label}
        </span>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function DashboardCitas() {
  const [citas, setCitas] = useState<CitaGoogle[]>([]);
  const [now, setNow] = useState(() => new Date());
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch from Supabase
  const fetchCitas = useCallback(async () => {
    const supabase = createSupabase();
    const today = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Bogota',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());

    const { data, error: err } = await supabase
      .from('citas_google')
      .select('*')
      .gte('inicio', `${today}T00:00:00-05:00`)
      .lte('inicio', `${today}T23:59:59-05:00`)
      .order('inicio', { ascending: true });

    if (err) {
      setError(err.message);
    } else {
      setCitas(data ?? []);
    }
    setLoading(false);
  }, []);

  // Trigger manual sync
  const triggerSync = useCallback(async () => {
    setSyncing(true);
    try {
      await fetch('/api/sync-calendar');
      await fetchCitas();
      setLastSync(new Date());
    } catch {
      // silent
    } finally {
      setSyncing(false);
    }
  }, [fetchCitas]);

  // Tick every second
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Refresh citas every 5 minutes
  useEffect(() => {
    fetchCitas();
    const id = setInterval(fetchCitas, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [fetchCitas]);

  // ── Derived state ──────────────────────────────────────────────────────────

  const citasHoy: CitaConEstado[] = citas
    .filter((c) => isSameDay(c.inicio, now))
    .map((c) => ({ ...c, status: getCitaStatus(c.inicio, c.fin, now) }));

  const proximaCita = citasHoy.find((c) => c.status === 'proxima');
  const citaEnCurso = citasHoy.find((c) => c.status === 'en_curso');
  const focusCita = citaEnCurso ?? proximaCita;

  const countdown = focusCita ? getCountdown(focusCita.inicio, now) : null;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-heading font-semibold text-ink">
            Agenda del Día
          </h2>
          <p className="text-sm text-muted mt-0.5">
            {now.toLocaleDateString('es-CO', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'America/Bogota',
            })}
          </p>
        </div>
        <button
          onClick={triggerSync}
          disabled={syncing}
          className="flex items-center gap-1.5 text-xs bg-surface border border-border rounded-lg px-3 py-1.5 text-muted hover:text-ink hover:border-accent-500 transition-colors disabled:opacity-50"
        >
          <svg
            className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          {syncing ? 'Sincronizando…' : 'Sincronizar'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-2 border-accent-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Contador Maestro */}
          {focusCita ? (
            <div className="bg-card border border-border rounded-xl p-5 text-center shadow-soft">
              {citaEnCurso ? (
                <>
                  <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-2">
                    En Curso Ahora
                  </p>
                  <p className="text-lg font-semibold text-ink mb-1">{citaEnCurso.titulo}</p>
                  <p className="text-sm text-muted mb-4">
                    Termina a las {formatHora(citaEnCurso.fin)}
                  </p>
                  {countdown && <CountdownDisplay countdown={countdown} label="tiempo restante" />}
                </>
              ) : (
                <>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent-500 mb-2">
                    Próxima Cita
                  </p>
                  <p className="text-lg font-semibold text-ink mb-1">{proximaCita!.titulo}</p>
                  <p className="text-sm text-muted mb-4">
                    {formatHora(proximaCita!.inicio)} – {formatHora(proximaCita!.fin)}
                  </p>
                  {countdown && <CountdownDisplay countdown={countdown} label="para comenzar" />}
                </>
              )}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <p className="text-muted text-sm">
                {citasHoy.length > 0
                  ? 'No hay más citas programadas para hoy.'
                  : 'No hay citas registradas para hoy.'}
              </p>
            </div>
          )}

          {/* Lista del día */}
          {citasHoy.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted px-1">
                {citasHoy.length} {citasHoy.length === 1 ? 'Cita' : 'Citas'} hoy
              </p>
              {citasHoy.map((cita) => (
                <CitaCard key={cita.id} cita={cita} />
              ))}
            </div>
          )}

          {lastSync && (
            <p className="text-xs text-muted text-center">
              Última sincronización:{' '}
              {lastSync.toLocaleTimeString('es-CO', { timeZone: 'America/Bogota' })}
            </p>
          )}
        </>
      )}
    </div>
  );
}
