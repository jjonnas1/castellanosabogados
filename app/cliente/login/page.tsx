// app/cliente/login/page.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ClienteLoginPage() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setOk(false);
    setErr(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/cliente/panel`,
        data: { role: "client" },
      },
    });

    if (error) setErr(error.message);
    else setOk(true);
    setSending(false);
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 520 }}>
        <h1 className="h2" style={{ marginBottom: 6 }}>Acceso de clientes</h1>
        <p className="muted" style={{ marginBottom: 16 }}>
          Te enviaremos un enlace mágico a tu correo para entrar a tu panel.
        </p>

        <form onSubmit={handleSend} className="panel" style={{ display:"grid", gap:12 }}>
          <label>
            Correo
            <input
              type="email"
              required
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </label>

          <button className="btn btn--primary" disabled={sending}>
            {sending ? "Enviando…" : "Recibir enlace de acceso"}
          </button>

          {ok && (
            <div className="panel" style={{ background:"#f6ffed", borderColor:"#c6f6d5" }}>
              ✅ Revisa tu correo y abre el enlace para ingresar.
            </div>
          )}
          {err && (
            <div className="panel" style={{ background:"#fff5f5", borderColor:"#fed7d7" }}>
              ❌ {err}
            </div>
          )}
        </form>

        <p style={{ marginTop: 10 }}>
          ¿Eres abogado? <a href="/login">Inicia sesión aquí</a>.
        </p>
      </div>
    </main>
  );
}
