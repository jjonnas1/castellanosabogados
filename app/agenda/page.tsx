"use client";

import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

type Area = { slug: string; name: string };

export default function AgendaPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  const [email, setEmail] = useState("");
  const [areas, setAreas] = useState<Area[]>([]);
  const [area, setArea] = useState("");
  const [slot, setSlot] = useState("Hoy 6:00 pm");
  const [summary, setSummary] = useState(""); // 🟣 resumen del caso

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(
    null
  );

  // Sesión
  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);
      setEmail(data.session?.user?.email || "");
      setReady(true);
    }
    loadSession();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) =>
      setSession(s)
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  // Cargar áreas disponibles desde service_areas (solo enabled)
  useEffect(() => {
    async function loadAreas() {
      const { data, error } = await supabase
        .from("service_areas")
        .select("slug, name")
        .eq("enabled", true)
        .order("sort", { ascending: true });

      if (!error && data?.length) {
        setAreas(data);
        setArea(data[0].slug);
      } else {
        // fallback por si aún no hay filas
        setAreas([{ slug: "penal", name: "Penal" }]);
        setArea("penal");
      }
    }
    loadAreas();
  }, []);

  // Si todavía no sabemos la sesión
  if (!ready) return <div className="wrap">Cargando…</div>;

  // Si no hay sesión, pedimos login/registro
  if (!session)
    return (
      <main className="section">
        <div className="wrap" style={{ maxWidth: 520 }}>
          <h1 className="h1">Agenda tu asesoría</h1>
          <p className="muted">
            Para agendar necesitas iniciar sesión o registrarte.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <a href="/cliente/acceso" className="btn btn--primary">
              Iniciar sesión
            </a>
            <a href="/cliente/registro" className="btn btn--ghost">
              Registrarme
            </a>
          </div>
        </div>
      </main>
    );

  // Enviar (por ahora via /api/contact como veníamos haciendo)
  async function handleSend() {
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: "Solicitud de agenda",
          email,
          message: `Nueva solicitud de agenda:
- Área / Tema: ${area}
- Horario preferido: ${slot}
- Correo del usuario: ${email}
- Resumen del caso:
${summary || "(sin resumen)"}
`,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error || "No se pudo enviar.");

      setStatus({
        ok: true,
        msg: "Solicitud enviada. Te escribiremos al correo con el enlace de la videollamada y el próximo paso.",
      });
      setSummary("");
    } catch (err: any) {
      setStatus({ ok: false, msg: err?.message || "Error enviando la solicitud." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="section">
      <div className="wrap">
        <h1 className="h1">Agenda tu asesoría</h1>
        <p className="muted">Selecciona el área disponible y cuéntanos brevemente tu caso.</p>

        <div className="panel" style={{ display: "grid", gap: 12, maxWidth: 640 }}>
          <label>
            Tu correo
            <input type="email" value={email} readOnly />
          </label>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label>
              Tema / Área
              <select value={area} onChange={(e) => setArea(e.target.value)}>
                {areas.map((a) => (
                  <option key={a.slug} value={a.slug}>
                    {a.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Horario preferido
              <select value={slot} onChange={(e) => setSlot(e.target.value)}>
                <option>Hoy 6:00 pm</option>
                <option>Mañana 8:30 am</option>
                <option>Mañana 11:00 am</option>
                <option>Miércoles 5:30 pm</option>
              </select>
            </label>
          </div>

          <label>
            Resumen del caso (opcional)
            <textarea
              rows={6}
              placeholder="Describe en 3–5 líneas el punto clave de tu consulta…"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </label>

          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn--primary" onClick={handleSend} disabled={loading}>
              {loading ? "Enviando…" : "Enviar solicitud"}
            </button>
            <a href="/" className="btn btn--ghost">
              Volver al inicio
            </a>
          </div>

          {status && (
            <div
              className="panel"
              style={{
                background: status.ok ? "#f6ffed" : "#fff5f5",
                borderColor: status.ok ? "#c6f6d5" : "#fed7d7",
              }}
            >
              {status.ok ? "✅ " : "❌ "}
              {status.msg}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
