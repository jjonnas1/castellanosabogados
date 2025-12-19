"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function AuthLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      window.location.href = "/panel";
    }
    setLoading(false);
  }

  return (
    <div className="bg-canvas text-ink">
      <section className="border-b border-border/70 bg-white">
        <div className="container grid gap-8 py-14 md:max-w-2xl">
          <div className="space-y-2">
            <p className="pill w-fit">Acceso</p>
            <h1>Iniciar sesión</h1>
            <p className="text-muted">Accede para gestionar tus asesorías y documentación.</p>
          </div>
          <form onSubmit={handleLogin} className="card-shell space-y-4 border border-border bg-subtle p-6 shadow-soft">
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="email">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                className="input"
                placeholder="tucorreo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                className="input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn-primary w-full" disabled={loading}>
              {loading ? "Ingresando..." : "Entrar"}
            </button>
            {error && <p className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">{error}</p>}
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
              <span>¿No tienes cuenta?</span>
              <Link href="/auth/registro" className="font-semibold text-accent-700 hover:text-ink">
                Regístrate
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
