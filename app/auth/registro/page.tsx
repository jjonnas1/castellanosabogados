"use client";

import { useState } from "react";
import Link from "next/link";

export default function AuthRegistro() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 600));
    setSubmitted(true);
    setLoading(false);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <div className="bg-canvas text-ink">
      <section className="border-b border-border/70 bg-white">
        <div className="container grid gap-8 py-14 md:max-w-2xl">
          <div className="space-y-2">
            <p className="pill w-fit">Registro</p>
            <h1>Crear acceso</h1>
            <p className="text-muted">Deja tus datos para habilitar el seguimiento de asesorías.</p>
          </div>
          <form onSubmit={handleSubmit} className="card-shell space-y-4 border border-border bg-subtle p-6 shadow-soft">
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="name">
                Nombre completo
              </label>
              <input id="name" name="name" required className="input" placeholder="Nombre y apellido" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="email">
                Correo
              </label>
              <input id="email" name="email" type="email" required className="input" placeholder="correo@ejemplo.com" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="phone">
                Teléfono (opcional)
              </label>
              <input id="phone" name="phone" className="input" placeholder="+57 ..." />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="note">
                Observaciones
              </label>
              <textarea id="note" name="note" rows={3} className="input" placeholder="Caso o necesidad principal" />
            </div>
            <button className="btn-primary w-full" disabled={loading}>
              {loading ? "Enviando..." : "Registrarme"}
            </button>
            {submitted && (
              <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                Registro recibido. Te contactaremos para finalizar el acceso.
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
              <Link href="/auth/login" className="font-semibold text-accent-700 hover:text-ink">
                Ya tengo cuenta
              </Link>
              <Link href="/" className="font-semibold text-muted hover:text-ink">
                Volver al inicio
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
