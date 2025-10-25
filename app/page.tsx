import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="section">
        <div className="wrap">
          <div className="hero">
            <span className="badge">Nueva · Asesoría virtual de 20 minutos</span>
            <h1 className="h1">Asesoría legal clara y cercana,<br/>en menos de 20 minutos.</h1>
            <p className="muted" style={{maxWidth:720}}>
              Agenda en línea y conéctate por videollamada con un abogado experto
              en derecho colombiano. Precio y tiempo definidos. Sin traslados, sin complicaciones.
            </p>

            <div style={{display:"flex",gap:12,marginTop:18}}>
              <Link href="/agenda" className="btn btn--primary">Agendar asesoría</Link>
              <Link href="#servicios" className="btn btn--ghost">Ver servicios</Link>
            </div>

            <div className="panel" style={{marginTop:22}}>
              <h3 style={{margin:"0 0 .6rem", fontSize:"1.05rem"}}>¿Por qué con nosotros?</h3>
              <ul style={{margin:0,paddingLeft:18, lineHeight:1.7}}>
                <li>Abogados verificados por especialidad.</li>
                <li>Agenda segura y confirmación por correo.</li>
                <li>Respuestas claras y accionables.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="section" aria-labelledby="srv-title">
        <div className="wrap">
          <h2 id="srv-title" className="h2" style={{marginBottom:6}}>Servicios en línea</h2>
          <p className="muted" style={{marginBottom:22}}>
            Todo lo necesario para una consulta eficiente y transparente.
          </p>

          <div className="tiles">
            <article className="tile">
              <div className="icon">📅</div>
              <h3 style={{margin:"0 0 .35rem"}}>Agenda Online</h3>
              <p className="muted">Reserva en segundos desde cualquier dispositivo. Confirmación inmediata.</p>
            </article>

            <article className="tile">
              <div className="icon">💳</div>
              <h3 style={{margin:"0 0 .35rem"}}>Pago Seguro</h3>
              <p className="muted">Transacciones protegidas (pronto: Wompi/Stripe). Factura electrónica.</p>
            </article>

            <article className="tile">
              <div className="icon">⚖️</div>
              <h3 style={{margin:"0 0 .35rem"}}>Abogados Expertos</h3>
              <p className="muted">Profesionales verificados por área de práctica y experiencia.</p>
            </article>

            <article className="tile">
              <div className="icon">📝</div>
              <h3 style={{margin:"0 0 .35rem"}}>Resumen y próximos pasos</h3>
              <p className="muted">Recibe un resumen claro de la consulta con acciones concretas.</p>
            </article>

            <article className="tile">
              <div className="icon">🔔</div>
              <h3 style={{margin:"0 0 .35rem"}}>Recordatorios</h3>
              <p className="muted">Te avisamos antes de tu cita por correo electrónico.</p>
            </article>

            <article className="tile">
              <div className="icon">🧾</div>
              <h3 style={{margin:"0 0 .35rem"}}>Documentos</h3>
              <p className="muted">Revisión de documentos simples (máx. 5 páginas) y notas legales.</p>
            </article>
          </div>

          {/* Banda CTA */}
          <div className="cta" style={{marginTop:22}}>
            <div>
              <strong>¿Listo para agendar?</strong>
              <div className="muted">Elige tu área legal y la hora disponible que más te convenga.</div>
            </div>
            <Link href="/agenda" className="btn btn--primary">Agendar ahora</Link>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="section" aria-labelledby="how-title">
        <div className="wrap">
          <h2 id="how-title" className="h2" style={{marginBottom:6}}>¿Cómo funciona?</h2>
          <p className="muted" style={{marginBottom:22,maxWidth:720}}>
            Selecciona área, fecha y hora. Completa un breve formulario. Recibe el enlace de videollamada.
          </p>

          <ol className="steps">
            <li>
              <h4>Selecciona tu área</h4>
              <p className="muted">Penal, laboral, civil, familia u otras.</p>
            </li>
            <li>
              <h4>Agenda y paga</h4>
              <p className="muted">Confirmación inmediata y recordatorios por correo.</p>
            </li>
            <li>
              <h4>Videollamada 1:1</h4>
              <p className="muted">Recibe orientación clara y próximos pasos.</p>
            </li>
            <li>
              <h4>Resumen y formatos</h4>
              <p className="muted">
                Te enviamos un resumen y, cuando aplica, <strong>formatos pertinentes</strong> para que continúes tu trámite
                ante juzgados o entidades (peticiones, memoriales, poderes, derechos de petición, etc.).
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES */}
      <section className="section" aria-labelledby="faq-title">
        <div className="wrap">
          <h2 id="faq-title" className="h2" style={{marginBottom:12}}>Preguntas frecuentes</h2>
          <div className="faq">
            <details>
              <summary>¿Qué incluye la asesoría de 20 minutos?</summary>
              <p>
                Un diagnóstico inicial, orientación clara y acciones recomendadas. Además, recibirás un resumen por correo
                y, si aplica, <strong>formatos listos</strong> (memoriales, peticiones, poderes, etc.) para continuar el trámite.
              </p>
            </details>

            <details>
              <summary>¿Pueden representar mi caso en proceso?</summary>
              <p>
                Sí. Si tu caso requiere representación, te conectamos con un abogado especialista para cotizar honorarios
                y etapas procesales.
              </p>
            </details>

            <details>
              <summary>¿Qué pasa si necesito más tiempo?</summary>
              <p>
                Puedes agendar sesiones adicionales o un plan por horas según la complejidad. Te lo explicamos al finalizar la consulta.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
