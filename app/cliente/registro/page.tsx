"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function RegistroClientePage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [ok, setOk]   = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setErr(null); setOk(false);
    const { data, error } = await supabase.auth.signUp({
      email, password: pass, options: { data: { full_name: name, role: "client" } }
    });
    if (error) setErr(error.message);
    else setOk(true);
    setLoading(false);
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 480 }}>
        <h1 className="h2">Crear cuenta (cliente)</h1>
        <form onSubmit={onSubmit} className="panel" style={{ display:"grid", gap:14 }}>
          <label>Nombre<input value={name} onChange={e=>setName(e.target.value)} required /></label>
          <label>Correo<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label>
          <label>Contraseña<input type="password" value={pass} onChange={e=>setPass(e.target.value)} required /></label>
          <button className="btn btn--primary" disabled={loading}>{loading?"Creando…":"Registrarme"}</button>
        </form>
        {ok && <div className="panel" style={{background:"#f6ffed",borderColor:"#c6f6d5"}}>✅ Revisa tu correo para confirmar.</div>}
        {err && <div className="panel" style={{background:"#fff5f5",borderColor:"#fed7d7"}}>❌ {err}</div>}
        <p style={{marginTop:12}}>¿Ya tienes cuenta? <a href="/cliente/login">Inicia sesión</a>.</p>
      </div>
    </main>
  );
}
