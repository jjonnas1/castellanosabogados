"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ClienteLogin() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [msg, setMsg]           = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setMsg(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMsg(error.message);
    else window.location.href = "/cliente/panel";
    setLoading(false);
  }

  async function handleGoogle() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/cliente/panel` }
    });
    if (error) setMsg(error.message);
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 480 }}>
        <h1 className="h2">Iniciar sesión</h1>
        <form onSubmit={handleLogin} className="panel" style={{ display:"grid", gap:12 }}>
          <label>Correo
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </label>
          <label>Contraseña
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </label>
          <button className="btn btn--primary" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
          <button type="button" className="btn btn--ghost" onClick={handleGoogle} disabled={loading}>
            Continuar con Google
          </button>
        </form>

        {msg && <div className="panel" style={{ marginTop:12 }}>{msg}</div>}

        <p style={{ marginTop:12 }}>¿No tienes cuenta? <a href="/cliente/registro">Regístrate</a>.</p>
      </div>
    </main>
  );
}
