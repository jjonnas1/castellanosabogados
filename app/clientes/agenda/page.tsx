"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const AREAS = ["Penal", "Laboral", "Civil", "Familia", "Administrativo"];

export default function AgendaClientePage() {
  const [email, setEmail] = useState("");
  const [area, setArea] = useState(AREAS[0]);
  const [pref, setPref] = useState("Hoy 6:00 pm");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSendLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    // Guardamos la preferencia en localStorage (el panel puede leerla y
    // mostrarla arriba mientras se asigna abogado)
    try {
      localStorage.setItem(
        "ca_client_pref",
        JSON.stringify({ area, pref, when: Date.now() })
      );
    } catch {}

    // Enviar enlace mágico de acceso al panel del cliente
    try {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      const emailRedirectTo = `${origin}/cliente/panel`;

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo },
      });

      if (error) throw error;
      setSent(true);
    } catch (e: any) {
      setErr(e?.message || "No pudimos enviar el enlace. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <h1 className="h2">Agenda tu asesoría</h1>
        <p className="muted" style={{ marginBottom: 18 }}>
          Deja tu correo y preferencias. Te enviaremos un{" "}
          <strong>enlace de acceso</strong> a tu panel para seguir el proceso.
        </p>

        {!sent ? (
          <form onSubmit={handleSendLink} className="panel" style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "grid", gap: 6 }}>
              <label><strong>Tu correo</strong></label>
              <input
                type="email"
                required
                placeholder="tucorreo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div style={{ display: "grid", gap: 6 }}>
              <label><strong>Tema / Área</strong></label>
              <select value={area} onChange={(e) => setArea(e.target.value)}>
                {AREAS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div style={{ display: "grid", gap: 6 }}>
              <label><strong>Horario preferido</strong></label>
              <select value={pref} onChange={(e) => setPref(e.target.value)}>
                <option>Hoy 6:00 pm</option>
                <option>Mañana 9:00 am</option>
                <option>Mañana 2:00 pm</option>
                <option>Esta semana</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn--primary" disabled={loading}>
                {loading ? "Enviando enlace…" : "Enviar solicitud"}
              </button>
              <a href="/" className="btn btn--ghost">Volver al inicio</a>
            </div>

            {err && (
              <div className="panel" style={{ background: "#fff5f5", borderColor: "#fed7d7" }}>
                ❌ {err}
              </div>
            )}
          </form>
        ) : (
          <div className="panel" style={{ background: "#f6ffed", borderColor: "#c6f6d5" }}>
            ✅ Te enviamos un enlace a <strong>{email}</strong>. Ábrelo para entrar a tu panel
            y completar la agenda.
          </div>
        )}
      </div>
    </main>
  );
}
