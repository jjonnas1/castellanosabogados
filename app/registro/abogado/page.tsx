"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function RegistroPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOk(false);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nombre },
      },
    });

    if (error) setError(error.message);
    else setOk(true);
    setLoading(false);
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 480 }}>
        <h1 className="h2">Registro de abogados</h1>
        <p className="muted">Crea tu cuenta para ofrecer asesorías legales en línea.</p>

        <form onSubmit={handleRegister} className="panel" style={{ display: "grid", gap: 14 }}>
          <label>
            Nombre completo
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </label>

          <label>
            Correo electrónico
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button
            type="submit"
            className="btn btn--primary"
            disabled={loading}
          >
            {loading ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>

        {ok && (
          <div className="panel" style={{ background: "#f6ffed", borderColor: "#c6f6d5" }}>
            ✅ Registro exitoso. Revisa tu correo para confirmar la cuenta.
          </div>
        )}
        {error && (
          <div className="panel" style={{ background: "#fff5f5", borderColor: "#fed7d7" }}>
            ❌ {error}
          </div>
        )}

        <p style={{ marginTop: 14 }}>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>.
        </p>
      </div>
    </main>
  );
}
