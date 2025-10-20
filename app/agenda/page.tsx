'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const TZ = 'America/Bogota';
const DAYS_AHEAD = 14;
const START_HOUR = 8;    // 8:00
const END_HOUR = 18;     // hasta 17:40 inicio
const SLOT_MINUTES = 20;

type DaySlots = { dayLabel: string; slots: Date[] };

function formatDisplay(d: Date){
  return d.toLocaleString('es-CO', {
    timeZone: TZ, weekday:'long', month:'long', day:'numeric',
    hour:'numeric', minute:'2-digit', hour12:true,
  });
}
function formatDay(d: Date){
  return d.toLocaleString('es-CO', { timeZone: TZ, weekday:'long', month:'long', day:'numeric' });
}

function generateSlots(): DaySlots[] {
  const now = new Date();
  const days: DaySlots[] = [];
  for (let i=0;i<DAYS_AHEAD;i++){
    const day = new Date();
    day.setDate(day.getDate()+i);
    const dow = day.getDay(); // 0 dom, 6 sab
    if (dow===0 || dow===6) continue;

    const daySlots: Date[] = [];
    for (let h=START_HOUR; h<END_HOUR; h++){
      for (let m=0; m<60; m+=SLOT_MINUTES){
        const slot = new Date(day);
        slot.setSeconds(0,0);
        slot.setHours(h, m, 0, 0);
        if (slot > now){ daySlots.push(slot); }
      }
    }
    if (daySlots.length) days.push({ dayLabel: formatDay(daySlots[0]), slots: daySlots });
  }
  return days;
}

export default function AgendaPremium(){
  // Paso 1
  const [topic, setTopic] = useState('Penal');
  // Paso 2
  const groups = useMemo(()=>generateSlots(),[]);
  const [busySet, setBusySet] = useState<Set<string>>(new Set());
  const [selectedISO, setSelectedISO] = useState<string>('');
  // Paso 3
  const [email, setEmail] = useState('');
  // General
  const [step, setStep] = useState<1|2|3>(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{type:'ok'|'err'|'warn', text:string}|null>(null);

  // Carga ocupados
  useEffect(()=>{
    (async ()=>{
      try{
        const flat = groups.flatMap(g=>g.slots);
        if (flat.length===0) return;
        const fromISO = flat[0].toISOString();
        const toISO   = flat[flat.length-1].toISOString();
        const { data, error } = await supabase
          .from('preintakes')
          .select('slot_ts')
          .gte('slot_ts', fromISO)
          .lte('slot_ts', toISO);
        if (error) throw error;
        setBusySet(new Set((data||[]).map((r:any)=> new Date(r.slot_ts).toISOString())));
      }catch(e:any){
        setToast({type:'warn', text:'No se pudo cargar la disponibilidad. Intenta nuevamente.'});
        console.error(e);
      }
    })();
  },[groups]);

  function isBusy(d: Date){ return busySet.has(d.toISOString()); }

  async function submit(e: React.FormEvent){
    e.preventDefault();
    if (!selectedISO){ setToast({type:'warn', text:'Selecciona un horario.'}); return; }
    if (!email){ setToast({type:'warn', text:'Ingresa tu correo.'}); return; }

    setLoading(true); setToast(null);
    try{
      const { error } = await supabase.from('preintakes').insert([
        { email, topic, slot_ts: selectedISO }
      ]);
      if (error) {
        // Diferenciar duplicado (índice único) de RLS u otros
        if ((error as any)?.code === '23505') {
          setToast({type:'err', text:'Ese horario fue ocupado hace un instante. Elige otro.'});
        } else {
          setToast({type:'err', text:`No pudimos registrar la solicitud: ${error.message}`});
        }
        return;
      }
      setToast({type:'ok', text:'¡Tu cita fue agendada! Te contactaremos por correo.'});
      setStep(1); setTopic('Penal'); setSelectedISO(''); setEmail('');
      // refrescar ocupados
      const flat = groups.flatMap(g=>g.slots);
      const fromISO = flat[0].toISOString(), toISO = flat[flat.length-1].toISOString();
      const refreshed = await supabase.from('preintakes').select('slot_ts').gte('slot_ts', fromISO).lte('slot_ts', toISO);
      setBusySet(new Set((refreshed.data||[]).map((r:any)=> new Date(r.slot_ts).toISOString())));
    }catch(err:any){
      setToast({type:'err', text:'Error inesperado. Intenta nuevamente.'});
      console.error(err);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="container">
      {/* Nav mini */}
      <div className="nav">
        <div className="brand">
          <div className="brand-badge"></div>
          <span>CastellanosAbogados</span>
        </div>
        <div className="nav-actions">
          <a href="/" className="btn btn-ghost">Inicio</a>
          <a href="/agenda" className="btn btn-primary">Agenda tu asesoría</a>
        </div>
      </div>

      {/* Grid principal */}
      <div className="grid2" style={{marginTop:24}}>
        {/* Izquierda: branding / beneficios */}
        <aside className="surface left-pane">
          <div className="left-pane-inner">
            <span className="badge">Citas de 20 minutos</span>
            <h2 style={{margin:0, lineHeight:1.2}}>
              Orientación legal<br/>rápida y clara.
            </h2>
            <p style={{color:'var(--muted)'}}>
              Agenda online y conéctate con un abogado especializado en derecho colombiano.
            </p>

            <div className="kpis">
              <div className="kpi">
                <div style={{fontSize:22,fontWeight:800}}>+500</div>
                <div style={{color:'var(--muted)',fontSize:12}}>Consultas resueltas</div>
              </div>
              <div className="kpi">
                <div style={{fontSize:22,fontWeight:800}}>4.9★</div>
                <div style={{color:'var(--muted)',fontSize:12}}>Satisfacción</div>
              </div>
              <div className="kpi">
                <div style={{fontSize:22,fontWeight:800}}>20 min</div>
                <div style={{color:'var(--muted)',fontSize:12}}>Duración</div>
              </div>
              <div className="kpi">
                <div style={{fontSize:22,fontWeight:800}}>L–V</div>
                <div style={{color:'var(--muted)',fontSize:12}}>8:00–18:00</div>
              </div>
            </div>

            <ul style={{margin:0,paddingLeft:18,color:'var(--muted)'}}>
              <li>Familia, Laboral, Civil, Penal, Comercial</li>
              <li>Videollamada + resumen por email</li>
              <li>Pagos en línea (Wompi, pronto)</li>
            </ul>
          </div>
        </aside>

        {/* Derecha: agenda */}
        <section className="surface" style={{padding:24}}>
          {/* Stepper */}
          <div className="stepper">
            <div className={`step ${step===1?'active':''}`}><span className="dot"/><span>Tema</span></div>
            <div className={`step ${step===2?'active':''}`}><span className="dot"/><span>Horario</span></div>
            <div className={`step ${step===3?'active':''}`}><span className="dot"/><span>Tus datos</span></div>
          </div>

          {/* Paso 1: Tema */}
          {step===1 && (
            <div>
              <h3 style={{marginTop:8}}>¿Sobre qué tema es tu consulta?</h3>
              <p style={{color:'var(--muted)'}}>Selecciona el área para asignarte el abogado indicado.</p>

              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:12,marginTop:12}}>
                {['Penal','Civil','Laboral','Familia','Comercial','Administrativo'].map(a=>(
                  <button
                    key={a}
                    type="button"
                    className="pill"
                    aria-selected={topic===a}
                    onClick={()=>setTopic(a)}
                  >{a}</button>
                ))}
              </div>

              <div style={{display:'flex',gap:12,marginTop:18}}>
                <button className="btn btn-ghost" onClick={()=>location.href='/'}>Cancelar</button>
                <button className="btn btn-primary" onClick={()=>setStep(2)}>Continuar</button>
              </div>
            </div>
          )}

          {/* Paso 2: Horario */}
          {step===2 && (
            <div>
              <h3 style={{marginTop:8}}>Elige un horario disponible</h3>
              <p style={{color:'var(--muted)'}}>L–V, 8:00 a 18:00 (20 minutos). Zona: Bogotá.</p>

              <div style={{display:'grid',gap:16, marginTop:10}}>
                {groups.map(group=>(
                  <div key={group.dayLabel}>
                    <div className="day">{group.dayLabel}</div>
                    <div className="slot-grid">
                      {group.slots.map(s=>{
                        const iso = s.toISOString();
                        const busy = isBusy(s);
                        return (
                          <button
                            key={iso}
                            className="pill"
                            aria-selected={selectedISO===iso}
                            disabled={busy}
                            onClick={()=>setSelectedISO(iso)}
                            title={busy?'Reservado':formatDisplay(s)}
                          >
                            {new Date(s).toLocaleTimeString('es-CO',{timeZone:TZ,hour:'numeric',minute:'2-digit',hour12:true})}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{display:'flex',gap:12,marginTop:18}}>
                <button className="btn btn-ghost" onClick={()=>setStep(1)}>Atrás</button>
                <button className="btn btn-primary" onClick={()=>setStep(3)} disabled={!selectedISO}>Continuar</button>
              </div>
            </div>
          )}

          {/* Paso 3: Datos */}
          {step===3 && (
            <form onSubmit={submit}>
              <h3 style={{marginTop:8}}>Tus datos</h3>
              <p style={{color:'var(--muted)'}}>Usaremos tu correo para enviarte el enlace de videollamada.</p>

              <label className="label">Correo electrónico</label>
              <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="tucorreo@ejemplo.com"/>

              <div style={{display:'flex',gap:12,marginTop:18}}>
                <button type="button" className="btn btn-ghost" onClick={()=>setStep(2)}>Atrás</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>{loading?'Agendando…':'Confirmar cita'}</button>
              </div>
            </form>
          )}

          {/* Toast */}
          {toast && (
            <div className={`toast ${toast.type==='ok'?'toast-ok':toast.type==='err'?'toast-err':'toast-warn'}`}>
              {toast.text}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
