"use client";

import { useState } from "react";
import Link from "next/link";

import SiteHeader from "@/app/components/SiteHeader";

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
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header className="border-b border-border bg-gradient-to-r from-ink via-ink/92 to-accent-700 text-white">
        <div className="container section-shell space-y-4">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Contacto</p>
          <h1 className="max-w-3xl text-white">Coordinemos una evaluación prioritaria</h1>
          <p className="max-w-2xl text-slate-100">
            Déjanos los datos mínimos para asignar un responsable y definir el primer control. No utilizamos esta línea para promoción,
            solo para coordinación ejecutiva.
          </p>
        </div>
      </header>

      <section className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-4">
          <p className="pill w-fit">Prioridad</p>
          <h2>Datos mínimos para actuar</h2>
          <p className="max-w-2xl text-muted">
            Si requieres defensa litigiosa, lo articulamos con aliados manteniendo trazabilidad. Este formulario es para coordinar la
            revisión estratégica inicial.
          </p>
          <ul className="space-y-2 text-sm text-muted">
            {["Sin spam ni campañas.", "Respuesta ejecutiva.", "Puedes volver al inicio o agenda en cualquier momento."].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="btn-secondary">
              Volver al inicio
            </Link>
            <Link href="/agenda" className="btn-primary">
              Agendar evaluación
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card-shell bg-white p-6 shadow-soft/40">
          <p className="pill w-fit">Formulario</p>
          <h3 className="mt-2 text-ink">Mensaje confidencial</h3>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink" htmlFor="name">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Tu nombre"
                className="w-full rounded-xl border border-border bg-subtle px-3 py-2 text-sm text-ink outline-none transition focus:border-ink focus:bg-white focus:ring-2 focus:ring-ink/10"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink" htmlFor="email">
                Correo
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="tucorreo@ejemplo.com"
                className="w-full rounded-xl border border-border bg-subtle px-3 py-2 text-sm text-ink outline-none transition focus:border-ink focus:bg-white focus:ring-2 focus:ring-ink/10"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink" htmlFor="message">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                placeholder="Cuéntanos brevemente tu caso"
                className="w-full rounded-xl border border-border bg-subtle px-3 py-3 text-sm text-ink outline-none transition focus:border-ink focus:bg-white focus:ring-2 focus:ring-ink/10"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? "Enviando…" : "Enviar"}
              </button>
              <a href="/" className="btn-secondary">
                Volver al inicio
              </a>
            </div>

            {ok && (
              <div className="rounded-xl border border-green-500/40 bg-green-50 px-4 py-3 text-sm font-semibold text-ink">
                ✅ ¡Gracias! Recibimos tu mensaje y te escribiremos pronto.
              </div>
            )}
            {ok === false && (
              <div className="rounded-xl border border-red-500/30 bg-red-50 px-4 py-3 text-sm font-semibold text-ink">
                ❌ {err}
              </div>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}
