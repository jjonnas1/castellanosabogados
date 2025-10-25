// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Header (ya tienes uno; si no, este es mínimo) */}
      <header className="sitebar">
        <div className="wrap nav">
          <div style={{fontWeight:800}}>Castellanos <span className="muted">Abogados</span></div>
          <nav style={{display:"flex",gap:10}}>
            <Link href="/" className="active">Inicio</Link>
            <Link href="/servicios">Servicios</Link>
            <Link href="/agenda">Agenda</Link>
            <Link href="/contacto">Contacto</Link>
            <Link href="/agenda" className="btn btn--primary">Agendar asesoría</Link>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="section">
          <div className="wrap">
            <div className="hero">
              <span className="badge">Nueva · Asesoría virtual de 20 minutos</span>
              <h1 className="h1">Asesoría legal clara y cercana,<br/>en menos de 20 minutos.</h1>
              <p className="muted" style={{maxWidth:720}}>
                Agenda en línea y conéctate por videollamada con un abogado experto en derecho colombiano.
                Precio y tiempo definidos. Sin traslados, sin complicaciones.
              </p>

              <div style={{display:"flex",gap:10,marginTop:14,flexWrap:"wrap"}}>
                <Link href="/agenda" className="btn btn--primary">Agendar asesoría</Link>
                <Link href="/servicios" className="btn btn--ghost">Ver servicios</Link>
              </div>

              <div className="card benefits" style={{marginTop:18}}>
                <b>¿Por qué con nosotros?</b>
                <ul>
                  <li>Abogados verificados por especialidad.</li>
                  <li>Agenda segura y confirmación por correo.</li>
                  <li>Respuestas claras y accionables.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICIOS DESTACADOS (tarjetas limpias tipo Selia) */}
        <section className="section" style={{paddingTop:0}}>
          <div className="wrap">
            <h2 className="h2">Servicios en línea</h2>
            <p className="muted">Todo lo necesario para una consulta eficiente y transparente.</p>

            <div className="grid cols-4" style={{marginTop:14}}>
              <article className="card service">
                <div className="icon">📅</div>
                <div>
                  <b>Agenda Online</b>
                  <p className="muted">Reserva en segundos desde cualquier dispositivo.</p>
                </div>
              </article>

              <article className="card service">
                <div className="icon">💳</div>
                <div>
                  <b>Pago Seguro</b>
                  <p className="muted">Transacciones protegidas (Wompi/Stripe).</p>
                </div>
              </article>

              <article className="card service">
                <div className="icon">⚖️</div>
                <div>
                  <b>Abogados Expertos</b>
                  <p className="muted">Profesionales verificados por área de práctica.</p>
                </div>
              </article>

              <article className="card service">
                <div className="icon">📝</div>
                <div>
                  <b>Resumen y próximos pasos</b>
                  <p className="muted">Recibe un resumen claro tras la consulta.</p>
                </div>
              </article>
            </div>

            <div className="card" style={{marginTop:16,padding:14,display:"flex",gap:12,alignItems:"center",justifyContent:"space-between"}}>
              <div>
                <b>¿Listo para agendar?</b>
                <p className="muted" style={{margin:4}}>Elige tu área legal y selecciona la hora disponible que más te convenga.</p>
              </div>
              <Link href="/agenda" className="btn btn--primary">Agendar ahora</Link>
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA (3 pasos) */}
        <section className="section" style={{paddingTop:0}}>
          <div className="wrap">
            <h2 className="h2">¿Cómo funciona?</h2>
            <div className="grid cols-3" style={{marginTop:12}}>
              <div className="card step">
                <span className="num">1</span>
                <b>Selecciona tu área</b>
                <p className="muted">Penal, laboral, civil, familia u otras.</p>
              </div>
              <div className="card step">
                <span className="num">2</span>
                <b>Agenda y paga</b>
                <p className="muted">Confirmación inmediata y recordatorios por correo.</p>
              </div>
              <div className="card step">
                <span className="num">3</span>
                <b>Videollamada 1:1</b>
                <p className="muted">Recibe orientación clara y próximos pasos.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ corto (acordeón) */}
        <section className="section" style={{paddingTop:0}}>
          <div className="wrap">
            <h2 className="h2">Preguntas frecuentes</h2>
            <div className="faq" style={{maxWidth:820}}>
              <details>
                <summary>¿Qué incluye la asesoría de 20 minutos?</summary>
                <p>Revisión breve del caso, orientación inicial y acciones sugeridas.</p>
              </details>
              <details>
                <summary>¿Cómo recibo el enlace de la videollamada?</summary>
                <p>Por correo, inmediatamente después de agendar y pagar.</p>
              </details>
              <details>
                <summary>¿Puedo reprogramar?</summary>
                <p>Sí, hasta 12 horas antes de la cita confirmada.</p>
              </details>
            </div>
          </div>
        </section>

        {/* STICKY CTA (solo mobile) */}
        <div className="sticky-cta">
          <div className="wrap">
            <div className="bar">
              <span><b>¿Listo para comenzar?</b> <span className="muted">Agenda en 1 minuto</span></span>
              <Link href="/agenda" className="btn btn--primary">Agendar</Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="section">
        <div className="wrap muted">© 2025 Castellanos Abogados. Orientación legal confiable.</div>
      </footer>
    </>
  );
}
