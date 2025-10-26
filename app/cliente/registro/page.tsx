"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ClienteRegistro() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [msg, setMsg]           = useState<string | null>(null);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setMsg(null);

    const { data: sign, error } = await supabase.auth.signUp({
      email, password, options: { data: { full_name: fullName } }
    });
    if (error) {
      setMsg(error.message);
      setLoading(false);
      return;
    }

    // Asegura perfil con rol client
    const userId = sign.user?.id;
    if (userId) {
      await supabase.from("profiles")
        .upsert({ id: userId, email, full_name: fullName, role: "client" }, { onConflict: "id" });
    }
    setMsg("🎉 Registro enviado. Revisa tu correo para confirmar.");
    setLoading(false);
  }

  async function handleGoogle() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/cliente/panel` }
    });
    if (error) setMsg(error.message);
    // al volver del OAuth, en /cliente/panel completamos el perfil si falta
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 480 }}>
        <h1 className="h2">Crea tu cuenta</h1>
        <p className="muted">Para gestionar citas, pagos y enlaces de videollamada.</p>

        <form onSubmit={handleRegister} className="panel" style={{ display:"grid", gap:12 }}>
          <label>Nombre completo
            <input value={fullName} onChange={(e)=>setFullName(e.target.value)} required />
          </label>
          <label>Correo
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </label>
          <label>Contraseña
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </label>

          <button className="btn btn--primary" disabled={loading}>
            {loading ? "Creando..." : "Registrarme"}
          </button>
          <button type="button" className="btn btn--ghost" onClick={handleGoogle} disabled={loading}>
            Continuar con Google
          </button>
        </form>

        {msg && <div className="panel" style={{ marginTop:12 }}>{msg}</div>}

        <p style={{ marginTop:12 }}>¿Ya tienes cuenta? <a href="/cliente/login">Inicia sesión</a>.</p>
      </div>
    </main>
  );
}
