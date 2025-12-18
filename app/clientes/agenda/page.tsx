"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Pref = { area: string; whenISO: string; };

export default function AgendaClientePage() {
  const [email, setEmail] = useState("");
  const [area, setArea]   = useState("Penal");
  const [when, setWhen]   = useState<string>(() => {
    const t = new Date(Date.now()+ 3*60*60*1000); // default +3h
    t.setMinutes( t.getMinutes() - (t.getMinutes()%20) ); // múltiplos de 20
    return t.toISOString().slice(0,16); // yyyy-mm-ddThh:mm
  });
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState<string|null>(null);

  // si está logueado, autocompleta correo
  useEffect(()=>{ supabase.auth.getUser().then(({data})=>{
    if (data.user?.email) setEmail(data.user.email);
  });},[]);

  async function enviar() {
    setLoading(true); setErr(null);
    // exige sesión del cliente
    const { data:{user} } = await supabase.auth.getUser();
    if (!user) { window.location.href="/cliente/login"; return; }

    // 1) crear preintake con hold del slot (slot_ts unique)
    const slotTs = new Date(when);
    const { data: pre, error: ePre } = await supabase
      .from("preintakes")
      .insert({
        appointment_id: "00000000-0000-0000-0000-000000000000", // marcador temporal
        topic: area,
        description: "",
        attachments: [],
        slot_ts: slotTs.toISOString()
      })
      .select("id")
      .single();

    if (ePre) { setErr("Ese horario ya fue tomado. Elige otro."); setLoading(false); return; }

    // 2) pedir URL de pago (Wompi test) - API interna
    const res = await fetch("/api/wompi/checkout",{
      method:"POST",
      headers:{ "content-type":"application/json" },
      body: JSON.stringify({
        preintake_id: pre!.id,
        amount_cop: 70000, // tarifa base demo
        customer_email: email || user.email,
        description: `Asesoría ${area} (${new Date(when).toLocaleString("es-CO")})`,
      })
    });
    const json = await res.json();
    if (!json.ok) { setErr(json.error || "No pudimos iniciar el pago."); setLoading(false); return; }

    // 3) redirigir a pasarela
    window.location.href = json.checkout_url;
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <h1 className="h2">Agenda tu asesoría</h1>
        <p className="muted">Crea tu cuenta / inicia sesión, elige tema y horario. Te llevamos al pago y listo.</p>

        <div className="panel" style={{ display:"grid", gap:14 }}>
          <label>Tu correo
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com"/>
          </label>

          <label>Tema / Área
            <select value={area} onChange={e=>setArea(e.target.value)}>
              <option>Penal</option><option>Laboral</option><option>Civil</option><option>Familia</option>
            </select>
          </label>

          <label>Horario (mínimos de 20 min)
            <input type="datetime-local" value={when} onChange={e=>setWhen(e.target.value)} step={1200}/>
          </label>

          <div style={{ display:"flex", gap:10 }}>
            <button className="btn btn--primary" onClick={enviar} disabled={loading}>
              {loading ? "Redirigiendo al pago…" : "Enviar solicitud"}
            </button>
              <Link className="btn btn--ghost" href="/">
                Volver al inicio
              </Link>
          </div>

          {err && <div className="panel" style={{background:"#fff5f5",borderColor:"#fed7d7"}}>❌ {err}</div>}
        </div>
      </div>
    </main>
  );
}
