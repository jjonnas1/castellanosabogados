"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";

import SiteHeader from "@/app/components/SiteHeader";
import { supabase } from "@/lib/supabase-browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) setError(error.message);
    else window.location.href = "/panel";
    setLoading(false);
  }

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header className="border-b border-border bg-gradient-to-r from-ink via-ink/92 to-accent-700 text-white">
        <div className="container section-shell space-y-3">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Acceso seguro</p>
          <h1 className="max-w-3xl text-white">Inicia sesión para continuar con tu asesoría</h1>
          <p className="max-w-2xl text-slate-100">
            Usa tus credenciales para acceder al panel. Si necesitas registrarte, puedes hacerlo en la misma sesión o volver al
            inicio en cualquier momento.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15">
              Volver al inicio
            </Link>
            <Link href="/agenda" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15">
              Ir a agenda
            </Link>
          </div>
        </div>
      </header>

      <section className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-4">
          <p className="pill w-fit">Continuidad</p>
          <h2>Acceso al panel y rutas protegidas</h2>
          <p className="max-w-2xl text-muted">
            Mantén la sesión activa para gestionar agenda, panel y trámites. Siempre podrás regresar al Home, a los servicios o
            contactar soporte desde aquí.
          </p>
          <ul className="space-y-2 text-sm text-muted">
            {["Acceso cifrado.", "Puedes volver al inicio o servicios en cualquier momento.", "Soporte disponible desde contacto."].map(
              (item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden />
                  {item}
                </li>
              ),
            )}
          </ul>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/servicios" className="btn-secondary">
              Ver servicios
            </Link>
            <Link href="/contacto" className="btn-secondary">
              Contacto directo
            </Link>
          </div>
        </div>

        <form onSubmit={handleLogin} className="card-shell bg-white p-6 shadow-soft/40">
          <p className="pill w-fit">Ingreso</p>
          <h3 className="mt-2 text-ink">Correo y contraseña</h3>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink" htmlFor="email">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-subtle px-3 py-2 text-sm text-ink outline-none transition focus:border-ink focus:bg-white focus:ring-2 focus:ring-ink/10"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border bg-subtle px-3 py-2 text-sm text-ink outline-none transition focus:border-ink focus:bg-white focus:ring-2 focus:ring-ink/10"
                placeholder="••••••••"
              />
            </div>

            <button className="btn-primary w-full justify-center" disabled={loading} type="submit">
              {loading ? "Ingresando…" : "Entrar"}
            </button>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
              <Link href="/registro/abogado" className="text-ink underline-offset-4 hover:underline">
                Registrarme como abogado
              </Link>
              <Link href="/cliente/acceso" className="underline-offset-4 hover:underline">
                Acceso con Google
              </Link>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-50 px-4 py-3 text-sm font-semibold text-ink">
                ❌ {error}
              </div>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}
