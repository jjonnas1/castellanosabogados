"use client";

import { useState } from "react";
import Link from "next/link";

export default function PenalEmpresasContacto() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setMessage(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      role: String(fd.get("role") || ""),
      company: String(fd.get("company") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || ""),
      honeypot: String(fd.get("notes") || ""),
    };

    try {
      const res = await fetch("/api/contacto-empresas", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus("ok");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setMessage(json.error || "No pudimos enviar tu solicitud.");
      }
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.message || "Error de red");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-canvas text-ink">
      <section className="border-b border-border/70 bg-white">
        <div className="container space-y-8 py-14 md:py-18">
          <div className="space-y-3">
            <p className="pill w-fit">Penal / Empresas</p>
            <h1 className="max-w-3xl">Coordinación para empresas</h1>
            <p className="max-w-2xl text-lg text-muted">
              Datos mínimos para priorizar la sesión con el responsable penal o de cumplimiento.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="card-shell grid gap-4 border border-border bg-subtle p-6 shadow-soft md:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="name">
                Nombre completo
              </label>
              <input id="name" name="name" required className="input" placeholder="Nombre y apellido" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="email">
                Correo corporativo
              </label>
              <input id="email" name="email" type="email" required className="input" placeholder="correo@empresa.com" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="role">
                Rol / área
              </label>
              <input id="role" name="role" className="input" placeholder="Gerencia, Compliance, Jurídica" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="company">
                Empresa / entidad
              </label>
              <input id="company" name="company" className="input" placeholder="Nombre de la organización" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="phone">
                Teléfono (opcional)
              </label>
              <input id="phone" name="phone" className="input" placeholder="+57 ..." />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <label className="text-sm font-semibold" htmlFor="message">
                Contexto breve
              </label>
              <textarea id="message" name="message" rows={4} className="input" placeholder="Estado del proceso, decisión inmediata o comité involucrado" />
            </div>
            <input type="text" name="notes" className="hidden" tabIndex={-1} aria-hidden />
            <div className="flex flex-wrap items-center gap-3 md:col-span-2">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Enviando..." : "Solicitar contacto"}
              </button>
              <Link href="/" className="btn-secondary">
                Volver al inicio
              </Link>
            </div>
            {status === "ok" && (
              <div className="md:col-span-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                Enviamos tu solicitud. Responderemos con la prioridad indicada.
              </div>
            )}
            {status === "error" && (
              <div className="md:col-span-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                {message}
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
