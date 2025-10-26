"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginClientePage() {
  const [email,setEmail]=useState(""); const [pass,setPass]=useState("");
  const [err,setErr]=useState<string|null>(null); const [loading,setLoading]=useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setErr(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) setErr(error.message);
    else window.location.href="/cliente/panel";
    setLoading(false);
  }

  return (
    <main className="section">
      <div className="wrap" style={{maxWidth:420}}>
        <h1 className="h2">Iniciar sesión (cliente)</h1>
        <form onSubmit={onSubmit} className="panel" style={{display:"grid",gap:14}}>
          <label>Correo<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label>
          <label>Contraseña<input type="password" value={pass} onChange={e=>setPass(e.target.value)} required/></label>
          <button className="btn btn--primary" disabled={loading}>{loading?"Entrando…":"Entrar"}</button>
        </form>
        {err && <div className="panel" style={{background:"#fff5f5",borderColor:"#fed7d7"}}>❌ {err}</div>}
        <p style={{marginTop:12}}>¿No tienes cuenta? <a href="/cliente/registro">Regístrate</a>.</p>
      </div>
    </main>
  );
}
