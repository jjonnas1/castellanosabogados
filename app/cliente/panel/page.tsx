"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Appt = {
  id: string;
  status: "pending"|"paid"|"confirmed"|"in_call"|"completed"|"cancelled"|"no_show";
  meet_url: string | null;
  created_at: string;
  duration_min: number;
  slot_id: string;
};
type Slot = { id:string; start_at:string; end_at:string; };

const fmt = (s: string) => new Date(s).toLocaleString("es-CO",{dateStyle:"medium", timeStyle:"short"});

export default function ClientePanelPage(){
  const [userId,setUserId] = useState<string|null>(null);
  const [upcoming,setUpcoming]=useState<(Appt&{slot:Slot})[]>([]);
  const [history,setHistory]=useState<(Appt&{slot:Slot})[]>([]);
  const [loading,setLoading]=useState(true);
  const [msg,setMsg]=useState<string|null>(null);

  useEffect(()=>{ supabase.auth.getUser().then(({data})=>{
    if(!data.user){ window.location.href="/cliente/login"; return; }
    setUserId(data.user.id);
  });},[]);

  useEffect(()=>{ (async()=>{
    if(!userId) return;
    setLoading(true);

    // citas activas
    const { data: apptsActive } = await supabase
      .from("appointments")
      .select("*")
      .eq("client_id", userId)
      .in("status", ["paid","confirmed","in_call","pending"])
      .order("created_at", { ascending:false });

    // historial
    const { data: apptsHist } = await supabase
      .from("appointments")
      .select("*")
      .eq("client_id", userId)
      .in("status", ["completed","cancelled","no_show"])
      .order("created_at", { ascending:false });

    async function attachSlots(rows: any[]){ 
      if(!rows?.length) return [];
      const ids = rows.map(r=>r.slot_id);
      const { data: slots } = await supabase.from("availability_slots").select("*").in("id", ids);
      const map = new Map(slots?.map((s:any)=>[s.id,s]) ?? []);
      return rows.map(r=>({ ...(r as Appt), slot: map.get(r.slot_id) as Slot }));
    }

    setUpcoming(await attachSlots(apptsActive??[]));
    setHistory(await attachSlots(apptsHist??[]));
    setLoading(false);
  })();},[userId]);

  async function cancelar(appt: Appt & {slot:Slot}){
    setMsg(null);
    // chequeo frontend (el SQL también lo valida)
    const starts = new Date(appt.slot.start_at).getTime();
    const hrsBefore = (starts - Date.now())/36e5;
    const minWindow = starts - Date.now() < 24*36e5 ? 3 : 12; // 3h si es para hoy, 12h si es a futuro
    if (hrsBefore < minWindow) { setMsg(`No se puede cancelar con menos de ${minWindow} horas.`); return; }

    const { error } = await supabase.from("appointments").update({ status:"cancelled" }).eq("id", appt.id);
    if (error) setMsg(error.message); else { setMsg("Cita cancelada."); window.location.reload(); }
  }

  return (
    <main className="section">
      <div className="wrap" style={{maxWidth:900}}>
        <h1 className="h2">Mi panel</h1>
        {msg && <div className="panel" style={{background:"#fffbe6",borderColor:"#fde68a"}}>{msg}</div>}

        <section style={{marginTop:12}}>
          <h3>Próximas</h3>
          <div style={{display:"grid",gap:12}}>
            {loading && <div className="panel">Cargando…</div>}
            {!loading && upcoming.length===0 && <div className="panel">No tienes citas próximas.</div>}
            {upcoming.map(a=>(
              <div key={a.id} className="panel" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontWeight:700}}>{fmt(a.slot.start_at)} · {a.duration_min} min</div>
                  <div className="muted">Estado: {a.status}</div>
                  {a.meet_url && <div><a className="btn btn--ghost" href={a.meet_url}>Entrar a la videollamada</a></div>}
                </div>
                <div style={{display:"flex",gap:8}}>
                  <a className="btn btn--ghost" href="/clientes/agenda">Reagendar</a>
                  <button className="btn btn--ghost" onClick={()=>cancelar(a)}>Cancelar</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{marginTop:18}}>
          <h3>Historial</h3>
          <div style={{display:"grid",gap:12}}>
            {history.map(a=>(
              <div key={a.id} className="panel">
                <div style={{fontWeight:700}}>{fmt(a.slot.start_at)} · {a.status}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
