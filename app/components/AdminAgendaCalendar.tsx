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
  return 'bg-accent-50 text-accent-700';
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
                const dayAppointments = appointments.filter((item) => sameDay(new Date(item.start_at), day));
                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={`min-h-24 rounded-xl border p-2 text-left transition ${inCurrentMonth ? 'border-border bg-white' : 'border-border/60 bg-panel/40 text-muted'} ${selectedDate && sameDay(day, selectedDate) ? 'ring-2 ring-accent-50' : ''}`}
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
