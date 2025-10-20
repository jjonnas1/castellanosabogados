// app/agenda/page.tsx
"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase del lado del cliente usando variables públicas.
 * Asegúrate de tener configuradas en Vercel:
 *  - NEXT_PUBLIC_SUPABASE_URL
 *  - NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type SlotOption = { label: string; value: string };

// genera los próximos 5 días hábiles 8:00–18:00 cada 30 min
function buildSlots(): SlotOption[] {
  const out: SlotOption[] = [];
  const now = new Date();

  for (let d = 0; d < 10; d++) {
    const day = new Date(now);
    day.setDate(now.getDate() + d);

    const dow = day.getDay(); // 0 dom, 6 sáb
    if (dow === 0 || dow === 6) continue; // solo lunes–viernes

    for (let h = 8; h <= 18; h++) {
      for (const m of [0, 30]) {
        const dt = new Date(day);
        dt.setHours(h, m, 0, 0);
        if (dt < now) continue;

        const label = dt.toLocaleString("es-CO", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
        });
        out.push({ label, value: dt.toISOString() });
      }
    }
  }
  return out;
}

const TOPICS = [
  "Civil/Contratos",
  "Laboral",
  "Familia",
  "Penal",
  "Comercial/Empresas",
  "Propiedad/Arrendamientos",
];

export default function AgendaPage() {
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [slot, setSlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const slots = buildSlots();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (!email || !slot) {
      setMessage("Completa tu correo y el horario.");
      return;
    }

    setLoading(true);
    try {
      // Insert sencillo en tabla 'preintakes' (ajusta nombres si tu tabla difiere)
      const { error } = await supabase.from("preintakes").insert({
        email,
        topic,
        slot_ts: slot, // ISO string (timestamp with time zone en Postgres)
      });

      if (error) throw error;
      setMessage("¡Listo! Te confirmaremos por correo con el enlace de videollamada.");
      setEmail("");
      setSlot("");
    } catch (err: any) {
      setMessage(err.message ?? "Hubo un error creando la solicitud.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page">
      <div className="wrap">
        <div className="h2" style={{ marginBottom: 8 }}>Agenda tu asesoría</div>
        <p className="muted" style={{ marginTop: 0 }}>
          Demo sin pagos: registramos tu solicitud y te confirmamos por correo.
        </p>

        <form onSubmit={submit} style={{
          background: "var(--panel)",
          border: "1px solid var(--stroke)",
          borderRadius: "var(--radius)",
          padding: 18,
          boxShadow: "var(--shadow)",
          maxWidth: 560
        }}>
          <div style={{ display: "grid", gap: 12 }}>
            <label>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Tu correo</div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@ejemplo.com"
                style={inputStyle}
              />
            </label>

            <label>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Tema / Área</div>
              <select value={topic} onChange={(e) => setTopic(e.target.value)} style={inputStyle}>
                {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>

            <label>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Horarios disponibles</div>
              <select
                required
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                style={inputStyle}
              >
                <option value="">Selecciona un horario…</option>
                {slots.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </label>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button className="btn btn--primary" disabled={loading}>
                {loading ? "Enviando…" : "Enviar solicitud"}
              </button>
              {message && <span className="muted" role="status">{message}</span>}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 44,
  borderRadius: 12,
  border: "1px solid var(--stroke)",
  padding: "0 12px",
  background: "#fff",
  color: "var(--text)"
};
