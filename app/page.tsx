export default function Home(){
  return (
    <div style={{display:"grid",gap:24}}>
      {/* Hero */}
      <section className="card" style={{padding:32, position:"relative", overflow:"hidden"}}>
        <div style={{position:"absolute",inset:-80,background:
          "radial-gradient(600px circle at 20% -10%, rgba(37,99,235,.25), transparent 40%), radial-gradient(600px circle at 120% 20%, rgba(96,165,250,.2), transparent 40%)"}}/>
        <div style={{position:"relative"}}>
          <span className="badge">Nueva • Asesoría virtual de 20 minutos</span>
          <h1 style={{marginTop:12,maxWidth:720}}>
            Tu consulta de <span style={{color:"var(--brand-2)"}}>derecho colombiano</span>, rápida y clara.
          </h1>
          <p style={{color:"var(--muted)",maxWidth:720,marginTop:8}}>
            Agenda en línea, paga con seguridad (pronto Wompi) y conéctate por videollamada.
          </p>
          <div style={{marginTop:18,display:"flex",gap:12}}>
            <a className="btn" href="/agenda">Agendar ahora</a>
            <a href="#como-funciona" style={{opacity:.85}}>Cómo funciona</a>
          </div>
        </div>
      </section>

      {/* 3 beneficios */}
      <section id="como-funciona" className="card" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:18}}>
        {[
          {t:"Rápido",d:"Citas de 20 minutos enfocadas en tu caso."},
          {t:"Profesional",d:"Abogados verificados y especializados."},
          {t:"100% online",d:"Reserva, paga y recibe el enlace al instante."},
        ].map((f,i)=>(
          <div key={i} style={{padding:8}}>
            <h3 style={{fontWeight:700,marginBottom:6}}>{f.t}</h3>
            <p style={{color:"var(--muted)"}}>{f.d}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
