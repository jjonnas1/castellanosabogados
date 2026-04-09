'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

type Appointment = {
  id: string;
  title: string;
  start_at: string;
  end_at: string;
  status: string;
};

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function statusClass(status: string) {
  const key = status.toLowerCase();
  if (key.includes('complet')) return 'bg-emerald-100 text-emerald-700';
  if (key.includes('cancel')) return 'bg-red-100 text-red-700';
  return 'bg-amber-100 text-amber-700';
}

/** Devuelve las clases de fondo/borde para la celda del día según el estado dominante */
function dayCellClass(dayAppointments: Appointment[], inCurrentMonth: boolean, isSelected: boolean): string {
  const base = isSelected ? 'ring-2 ring-offset-1 ring-accent-700' : '';

  if (!inCurrentMonth) return `border-border/60 bg-panel/40 text-muted ${base}`;
  if (dayAppointments.length === 0) return `border-border bg-white ${base}`;

  // Estado dominante: el que más aparece; en empate, prioridad: programada > completada > cancelada
  const counts = { programada: 0, completada: 0, cancelada: 0 };
  for (const a of dayAppointments) {
    const k = a.status.toLowerCase();
    if (k.includes('complet'))    counts.completada++;
    else if (k.includes('cancel')) counts.cancelada++;
    else                           counts.programada++;
  }

  const dominant =
    counts.programada >= counts.completada && counts.programada >= counts.cancelada ? 'programada'
    : counts.completada >= counts.cancelada ? 'completada'
    : 'cancelada';

  if (dominant === 'completada') return `border-emerald-300 bg-emerald-50 ${base}`;
  if (dominant === 'cancelada')  return `border-red-300 bg-red-50 ${base}`;
  return `border-amber-300 bg-amber-50 ${base}`;
}

export default function AdminAgendaCalendar() {
  const [monthDate, setMonthDate] = useState(startOfMonth(new Date()));
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  async function fetchAppointments() {
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;
    if (!token) return;

    const response = await fetch('/api/admin/workspace', {
      headers: { authorization: `Bearer ${token}` },
    });

    const payload = (await response.json().catch(() => ({}))) as { appointments?: Appointment[] };
    setAppointments(payload.appointments ?? []);
  }

  useEffect(() => {
    fetchAppointments();

    window.addEventListener('appointments-updated', fetchAppointments);
    return () => window.removeEventListener('appointments-updated', fetchAppointments);
  }, []);

  const days = useMemo(() => {
    const first = startOfMonth(monthDate);
    const start = new Date(first);
    start.setDate(first.getDate() - first.getDay());
    return Array.from({ length: 42 }, (_, index) => {
      const day = new Date(start);
      day.setDate(start.getDate() + index);
      return day;
    });
  }, [monthDate]);

  const selectedAppointments = useMemo(() => {
    if (!selectedDate) return [];
    return appointments.filter((item) => sameDay(new Date(item.start_at), selectedDate));
  }, [appointments, selectedDate]);

  return (
    <section className="container section-shell pt-0">
      <article className="card-shell bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-ink">Calendario visual</h2>
          <div className="flex items-center gap-2">
            <button className="btn-secondary" onClick={() => setMonthDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}>Anterior</button>
            <p className="text-sm font-semibold text-ink capitalize">{monthDate.toLocaleString('es-CO', { month: 'long', year: 'numeric' })}</p>
            <button className="btn-secondary" onClick={() => setMonthDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}>Siguiente</button>
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-border bg-canvas p-3">
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((d) => <p key={d}>{d}</p>)}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-2">
              {days.map((day) => {
                const inCurrentMonth = day.getMonth() === monthDate.getMonth();
                const isSelected = !!(selectedDate && sameDay(day, selectedDate));
                const dayAppointments = appointments.filter((item) => sameDay(new Date(item.start_at), day));
                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={`min-h-24 rounded-xl border p-2 text-left transition hover:brightness-95 ${dayCellClass(dayAppointments, inCurrentMonth, isSelected)}`}
                  >
                    <p className="text-xs font-semibold">{day.getDate()}</p>
                    <div className="mt-1 space-y-1">
                      {dayAppointments.slice(0, 2).map((item) => (
                        <p key={item.id} className={`truncate rounded-full px-2 py-1 text-[10px] font-semibold ${statusClass(item.status)}`}>
                          {item.title}
                        </p>
                      ))}
                      {dayAppointments.length > 2 && <p className="text-[10px] text-muted">+{dayAppointments.length - 2} más</p>}
                    </div>
                  </button>
                );
              })}
            </div>
            {/* Leyenda */}
            <div className="mt-3 flex flex-wrap gap-3 border-t border-border pt-3">
              {[
                { color: 'bg-amber-50 border-amber-300',   label: 'Programada' },
                { color: 'bg-emerald-50 border-emerald-300', label: 'Completada' },
                { color: 'bg-red-50 border-red-300',       label: 'Cancelada' },
              ].map(({ color, label }) => (
                <span key={label} className="flex items-center gap-1.5 text-xs text-muted">
                  <span className={`inline-block h-3 w-3 rounded-sm border ${color}`} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-ink">{selectedDate ? selectedDate.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Selecciona un día'}</p>
            <div className="mt-3 space-y-2 text-sm">
              {selectedAppointments.map((item) => (
                <article key={item.id} className="rounded-xl border border-border bg-white p-3">
                  <p className="font-semibold text-ink">{item.title}</p>
                  <p className="text-xs text-muted">{new Date(item.start_at).toLocaleString('es-CO')} - {new Date(item.end_at).toLocaleString('es-CO')}</p>
                  <p className={`mt-1 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusClass(item.status)}`}>{item.status}</p>
                </article>
              ))}
              {selectedDate && selectedAppointments.length === 0 && <p className="text-muted">No hay citas para este día.</p>}
            </div>
          </aside>
        </div>
      </article>
    </section>
  );
}
