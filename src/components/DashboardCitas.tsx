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

const TZ = 'America/Bogota';

/** Returns YYYY-MM-DD string in Bogotá time */
function bogotaDate(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function isSameLocalDay(iso: string, day: string): boolean {
  return bogotaDate(new Date(iso)) === day;
}

function getCitaStatus(inicio: string, fin: string, now: Date): CitaStatus {
  const start = new Date(inicio).getTime();
  const end   = new Date(fin).getTime();
  const t     = now.getTime();
  if (t >= start && t <= end) return 'en_curso';
  if (t > end) return 'pasada';
  return 'proxima';
}

function getCountdown(targetIso: string, now: Date): Countdown {
  const diff  = Math.max(0, new Date(targetIso).getTime() - now.getTime());
  const total = Math.floor(diff / 1000);
  return {
    dias:     Math.floor(total / 86400),
    horas:    Math.floor((total % 86400) / 3600),
    minutos:  Math.floor((total % 3600) / 60),
    segundos: total % 60,
  };
}

function formatHora(iso: string): string {
  return new Date(iso).toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: TZ,
    hour12: true,
  });
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

// ─── Supabase browser client ───────────────────────────────────────────────────

function supabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function CountdownBlock({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-[#0f2040] border border-[#1e3a6e] rounded-lg w-16 h-16 flex items-center justify-center shadow-inner">
        <span className="text-3xl font-mono font-bold text-white tabular-nums leading-none">
          {pad(value)}
        </span>
      </div>
      <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </span>
    </div>
  );
}

function CountdownSeparator() {
  return (
    <span className="text-2xl font-bold text-slate-500 mb-5 select-none">:</span>
  );
}

function CitaRow({ cita, isLast }: { cita: CitaConEstado; isLast: boolean }) {
  const enCurso = cita.status === 'en_curso';
  const pasada  = cita.status === 'pasada';

  return (
    <div
      className={[
        'relative flex items-start gap-3 px-3 py-3 rounded-lg transition-all',
        enCurso
          ? 'bg-red-950/30 border border-red-500/70 ring-1 ring-red-500/30'
          : pasada
          ? 'opacity-45'
          : 'hover:bg-slate-800/40',
        !isLast ? 'mb-2' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Live indicator */}
      {enCurso && (
        <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
      )}

      {/* Time column */}
      <div className="flex-shrink-0 w-[68px] text-right">
        <p
          className={`text-xs font-semibold ${
            enCurso ? 'text-red-400' : 'text-slate-300'
          }`}
        >
          {formatHora(cita.inicio)}
        </p>
        <p className="text-[10px] text-slate-500 mt-0.5">{formatHora(cita.fin)}</p>
      </div>

      {/* Divider */}
      <div
        className={`w-px self-stretch rounded-full flex-shrink-0 ${
          enCurso ? 'bg-red-500' : pasada ? 'bg-slate-700' : 'bg-slate-600'
        }`}
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-xs font-semibold leading-snug ${
            enCurso ? 'text-red-100' : pasada ? 'text-slate-500' : 'text-slate-200'
          }`}
        >
          {cita.titulo}
        </p>
        {enCurso && (
          <p className="text-[10px] font-bold uppercase tracking-wider text-red-400 mt-0.5">
            Audiencia en curso
          </p>
        )}
        {cita.descripcion && !enCurso && (
          <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
            {cita.descripcion}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function DashboardCitas() {
  const [citas, setCitas]     = useState<CitaGoogle[]>([]);
  const [now, setNow]         = useState<Date>(() => new Date());
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  // ── Data fetch ───────────────────────────────────────────────────────────────

  const fetchCitas = useCallback(async () => {
    const db   = supabase();
    const today = bogotaDate(new Date());
    // Fetch today + tomorrow to support the fallback countdown
    const tomorrow = bogotaDate(new Date(Date.now() + 86400000));

    const { data, error: err } = await db
      .from('citas_google')
      .select('*')
      .gte('inicio', `${today}T00:00:00-05:00`)
      .lte('inicio', `${tomorrow}T23:59:59-05:00`)
      .order('inicio', { ascending: true });

    if (err) setError(err.message);
    else setCitas(data ?? []);
    setLoading(false);
  }, []);

  const triggerSync = useCallback(async () => {
    setSyncing(true);
    try {
      await fetch('/api/sync-calendar');
      await fetchCitas();
    } finally {
      setSyncing(false);
    }
  }, [fetchCitas]);

  // ── Clock tick every second ──────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // ── Refresh every 5 min ───────────────────────────────────────────────────────
  useEffect(() => {
    fetchCitas();
    const id = setInterval(fetchCitas, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [fetchCitas]);

  // ── Derived state ────────────────────────────────────────────────────────────

  const today    = bogotaDate(now);
  const tomorrow = bogotaDate(new Date(now.getTime() + 86400000));

  const citasHoy: CitaConEstado[] = citas
    .filter((c) => isSameLocalDay(c.inicio, today))
    .map((c) => ({ ...c, status: getCitaStatus(c.inicio, c.fin, now) }));

  // The "focus" cita for the countdown: in-progress > next upcoming today > first tomorrow
  const enCurso    = citasHoy.find((c) => c.status === 'en_curso');
  const proximaHoy = citasHoy.find((c) => c.status === 'proxima');
  const manana     = citas.find((c) => isSameLocalDay(c.inicio, tomorrow));

  const focusCita: CitaConEstado | CitaGoogle | null =
    enCurso ?? proximaHoy ?? manana ?? null;

  const isFocusMañana = !enCurso && !proximaHoy && Boolean(manana);

  const countdown = focusCita
    ? getCountdown(
        enCurso ? enCurso.fin : focusCita.inicio, // count to end if in-progress, else to start
        now
      )
    : null;

  const citasActivasHoy = citasHoy.filter((c) => c.status !== 'pasada');
  const todasPasadas    = citasHoy.length > 0 && citasActivasHoy.length === 0;

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="bg-[#0b1929] border border-[#1e3a6e]/60 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1e3a6e]/50 bg-[#0d1f38]">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-300">
            Dashboard de Audiencias
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">
            {now.toLocaleDateString('es-CO', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              timeZone: TZ,
            })}
          </span>
          <button
            onClick={triggerSync}
            disabled={syncing}
            title="Sincronizar con Google Calendar"
            className="p-1.5 rounded-md text-slate-500 hover:text-slate-200 hover:bg-slate-700/50 transition-colors disabled:opacity-40"
          >
            <svg
              className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>

      {error && (
        <div className="mx-4 mt-3 px-3 py-2 rounded-lg bg-red-900/30 border border-red-700/40 text-red-300 text-xs">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="flex divide-x divide-[#1e3a6e]/40">
          {/* ── LEFT: Countdown ─────────────────────────────────────────── */}
          <div className="w-[220px] flex-shrink-0 flex flex-col items-center justify-center px-4 py-6 gap-4">
            {countdown ? (
              <>
                {/* Label */}
                <div className="text-center">
                  <p
                    className={`text-[10px] font-bold uppercase tracking-widest ${
                      enCurso ? 'text-red-400' : 'text-blue-400'
                    }`}
                  >
                    {enCurso
                      ? 'Tiempo restante'
                      : isFocusMañana
                      ? 'Primera cita mañana'
                      : 'Próxima audiencia'}
                  </p>
                </div>

                {/* Clock blocks */}
                <div className="flex items-end gap-1">
                  {countdown.dias > 0 && (
                    <>
                      <CountdownBlock value={countdown.dias} label="días" />
                      <CountdownSeparator />
                    </>
                  )}
                  <CountdownBlock value={countdown.horas}    label="horas" />
                  <CountdownSeparator />
                  <CountdownBlock value={countdown.minutos}  label="min" />
                  <CountdownSeparator />
                  <CountdownBlock value={countdown.segundos} label="seg" />
                </div>

                {/* Focus cita title */}
                <div className="text-center px-2">
                  <p className="text-xs font-semibold text-slate-200 leading-snug line-clamp-2">
                    {focusCita!.titulo}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {formatHora(focusCita!.inicio)}
                    {enCurso && (
                      <span className="text-red-400"> · en curso</span>
                    )}
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center px-3">
                <p className="text-3xl mb-2">📅</p>
                <p className="text-xs text-slate-400 font-medium">
                  Sin audiencias próximas
                </p>
              </div>
            )}
          </div>

          {/* ── RIGHT: Today's list ──────────────────────────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="px-4 pt-4 pb-2 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                {todasPasadas
                  ? 'Citas completadas'
                  : `Hoy · ${citasHoy.length} ${citasHoy.length === 1 ? 'cita' : 'citas'}`}
              </span>
              {todasPasadas && manana && (
                <span className="text-[10px] text-blue-400 font-medium">
                  Mañana: {
                    citas.filter((c) => isSameLocalDay(c.inicio, tomorrow)).length
                  } citas
                </span>
              )}
            </div>

            <div className="px-3 pb-4 overflow-y-auto max-h-[300px] space-y-0 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {citasHoy.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-xs text-slate-500">
                    No hay citas registradas hoy.
                  </p>
                  <button
                    onClick={triggerSync}
                    className="mt-2 text-[11px] text-blue-400 hover:text-blue-300 underline underline-offset-2"
                  >
                    Sincronizar ahora
                  </button>
                </div>
              ) : (
                citasHoy.map((cita, i) => (
                  <CitaRow
                    key={cita.id}
                    cita={cita}
                    isLast={i === citasHoy.length - 1}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-5 py-2 border-t border-[#1e3a6e]/40 bg-[#0d1f38] flex items-center justify-between">
        <span className="text-[10px] text-slate-600">
          Castellanos Abogados · Zona horaria: Bogotá
        </span>
        <span className="text-[10px] text-slate-600 tabular-nums">
          {now.toLocaleTimeString('es-CO', { timeZone: TZ, hour12: false })}
        </span>
      </div>
    </div>
  );
}
