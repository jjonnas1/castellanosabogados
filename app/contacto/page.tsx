"use client";

import { useState } from "react";
import Link from "next/link";

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
      phone: String(fd.get("phone") || ""),
      honeypot: String(fd.get("notes") || ""),
    };

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setOk(true);
        (e.target as HTMLFormElement).reset();
      } else {
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
    <div className="bg-canvas text-ink">
      <section className="border-b border-border/70 bg-white">
        <div className="container space-y-6 py-14 md:py-18">
          <div className="space-y-3">
            <p className="pill w-fit">Contacto</p>
            <h1 className="max-w-3xl">Coordinemos el primer punto de control</h1>
            <p className="max-w-2xl text-lg text-muted">
              Déjanos tus datos para priorizar una respuesta. No compartas información sensible hasta coordinar la sesión.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="card-shell grid gap-4 border border-border bg-subtle p-6 shadow-soft md:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="name">Nombre</label>
              <input id="name" name="name" type="text" required className="input" placeholder="Tu nombre" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="email">Correo</label>
              <input id="email" name="email" type="email" required className="input" placeholder="tucorreo@ejemplo.com" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="phone">Teléfono (opcional)</label>
              <input id="phone" name="phone" type="tel" className="input" placeholder="+57 ..." />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <label className="text-sm font-semibold" htmlFor="message">Mensaje</label>
              <textarea id="message" name="message" rows={4} required className="input" placeholder="Cuéntanos brevemente tu caso" />
            </div>
            <input type="text" name="notes" className="hidden" tabIndex={-1} aria-hidden />
            <div className="flex flex-wrap items-center gap-3 md:col-span-2">
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? "Enviando…" : "Enviar"}
              </button>
              <Link href="/" className="btn-secondary">
                Volver al inicio
              </Link>
            </div>
            {ok && (
              <div className="md:col-span-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                ✅ Recibimos tu mensaje. Responderemos pronto.
              </div>
            )}
            {ok === false && (
              <div className="md:col-span-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                ❌ {err}
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
