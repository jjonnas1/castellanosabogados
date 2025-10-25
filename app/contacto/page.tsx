"use client";

// app/contacto/page.tsx
import { useState } from "react";

export default function ContactoPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.ok) setOk(true);
      else {
        setOk(false);
        setErr(json.error || "No pudimos enviar tu mensaje.");
      }
    } catch (e: any) {
      setOk(false);
      setErr(e?.message || "Error de red.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="section">
      <div className="wrap">
        <h1 className="h2" style={{ marginBottom: 6 }}>Contacto</h1>
        <p className="muted" style={{ marginBottom: 22 }}>
          Déjanos un mensaje y te respondemos por correo.
        </p>

        <form onSubmit={handleSubmit} className="panel" style={{ display: "grid", gap: 14, maxWidth: 720 }}>
          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="name"><strong>Nombre</strong></label>
            <input id="name" name="name" type="text" placeholder="Tu nombre" />
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="email"><strong>Correo</strong></label>
            <input id="email" name="email" type="email" required placeholder="tucorreo@ejemplo.com" />
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="message"><strong>Mensaje</strong></label>
            <textarea id="message" name="message" rows={6} required placeholder="Cuéntanos brevemente tu caso…" />
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn--primary" type="submit" disabled={loading}>
              {loading ? "Enviando…" : "Enviar"}
            </button>
            <a href="/" className="btn btn--ghost">Volver al inicio</a>
          </div>

          {ok && (
            <div className="panel" style={{ background: "#f6ffed", borderColor: "#c6f6d5" }}>
              ✅ ¡Gracias! Recibimos tu mensaje y te escribiremos pronto.
            </div>
          )}
          {ok === false && (
            <div className="panel" style={{ background: "#fff5f5", borderColor: "#fed7d7" }}>
              ❌ {err}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
