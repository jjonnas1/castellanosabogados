"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
    else window.location.href = "/panel"; // 👈 redirige luego al dashboard (lo haremos)
    setLoading(false);
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 420 }}>
        <h1 className="h2">Iniciar sesión</h1>
        <p className="muted">Accede a tu cuenta para gestionar tus asesorías.</p>

        <form onSubmit={handleLogin} className="panel" style={{ display: "grid", gap: 14 }}>
          <label>
            Correo electrónico
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          <button className="btn btn--primary" disabled={loading}>
            {loading ? "Ingresando..." : "Entrar"}
          </button>

          <p style={{ fontSize: ".9rem", marginTop: 8 }}>
            ¿No tienes cuenta?{" "}
            <a href="/registro/abogado" style={{ color: "var(--brand-600)" }}>
              Regístrate como abogado
            </a>
          </p>
        </form>

        {error && (
          <div className="panel" style={{ background: "#fff5f5", borderColor: "#fed7d7", marginTop: 12 }}>
            ❌ {error}
          </div>
        )}
      </div>
    </main>
  );
}
