'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const TZ = 'America/Bogota';
const DAYS_AHEAD = 14;
const START_HOUR = 8;
const END_HOUR = 18;
const SLOT_MINUTES = 20;

function formatColombia(d: Date) {
  return d.toLocaleString('es-CO', {
    timeZone: TZ,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function generateSlots(): Date[] {
  const now = new Date();
  const slots: Date[] = [];
  for (let i = 0; i < DAYS_AHEAD; i++) {
    const day = new Date(now);
    day.setDate(day.getDate() + i);
    const dow = day.getDay();
    if (dow === 0 || dow === 6) continue;
    for (let h = START_HOUR; h < END_HOUR; h++) {
      for (let m = 0; m < 60; m += SLOT_MINUTES) {
        const slot = new Date(day);
        slot.setHours(h, m, 0, 0);
        if (slot > now) slots.push(slot);
      }
    }
  }
  return slots;
}

export default function Agenda() {
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Penal');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [available, setAvailable] = useState<Date[]>([]);
  const [selectedISO, setSelectedISO] = useState<string>('');

  const baseSlots = useMemo(() => generateSlots(), []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('preintakes')
          .select('slot_ts')
          .gte('slot_ts', baseSlots[0].toISOString())
          .lte('slot_ts', baseSlots[baseSlots.length - 1].toISOString());
        if (error) throw error;
        const booked = new Set(data?.map((r: any) => new Date(r.slot_ts).toISOString()));
        const free = baseSlots.filter(s => !booked.has(s.toISOString()));
        setAvailable(free);
        if (free[0]) setSelectedISO(free[0].toISOString());
      } catch {
        setMessage('Error cargando horarios.');
      } finally {
        setLoading(false);
      }
    })();
  }, [baseSlots]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.from('preintakes').insert([
        { email, topic, slot_ts: selectedISO },
      ]);
      if (error) throw error;
      setMessage('✅ Solicitud registrada. Te contactaremos por correo.');
      setEmail('');
    } catch {
      setMessage('Ese horario ya fue ocupado. Elige otro.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid">
      <section className="card">
        <h2>Agenda tu asesoría</h2>
        <p>Selecciona un horario disponible (de lunes a viernes, 8:00 a 18:00).</p>

        <form onSubmit={submit}>
          <label>Tu correo</label>
          <input
            type="email"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label>Tema / Área</label>
          <select value={topic} onChange={e => setTopic(e.target.value)}>
            <option>Penal</option>
            <option>Laboral</option>
            <option>Civil</option>
            <option>Familia</option>
            <option>Comercial</option>
            <option>Administrativo</option>
          </select>

          <label>Horarios disponibles</label>
          <select
            value={selectedISO}
            onChange={e => setSelectedISO(e.target.value)}
            disabled={loading || available.length === 0}
          >
            {available.map(s => (
              <option key={s.toISOString()} value={s.toISOString()}>
                {formatColombia(s)}
              </option>
            ))}
          </select>

          <button type="submit" disabled={loading || !selectedISO}>
            {loading ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </form>

        {message && <p style={{ marginTop: 12 }}>{message}</p>}
      </section>
    </main>
  );
}
