import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="section">
        <div className="wrap">
          <div className="hero">
            <span className="badge">Nueva · Asesoría legal en línea</span>
            <h1 className="h1">
              Asesoría legal clara y cercana,<br />con abogados expertos.
            </h1>
            <p className="muted" style={{ maxWidth: 720 }}>
              Agenda en línea y conéctate por videollamada con un abogado especializado en derecho colombiano. 
              Atención personalizada, precio definido y respuesta inmediata.
            </p>

            <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
              <Link href="/agenda" className="btn btn--primary">
                Agendar asesoría
              </Link>
              <Link href="#servicios" className="btn btn--ghost">
                Ver servicios
              </Link>
            </div>

            <div className="panel" style={{ marginTop: 22 }}>
              <h3 style={{ margin: "0 0 .6rem", fontSize: "1.05rem" }}>¿Por qué con nosotros?</h3>
              <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
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
          <h2 id="srv-title" className="h2" style={{ marginBottom: 6 }}>
            Servicios en línea
          </h2>
          <p className="muted" style={{ marginBottom: 22 }}>
            Todo lo necesario para una consulta eficiente, confiable y transparente.
          </p>

          <div className="tiles">
            <article className="tile">
              <div className="icon">📅</div>
              <h3>Agenda Online</h3>
              <p className="muted">Reserva tu asesoría en segundos desde cualquier dispositivo. Confirmación inmediata.</p>
            </article>

            <article className="tile">
              <div className="icon">💳</div>
              <h3>Pago Seguro</h3>
              <p className="muted">Transacciones protegidas (Wompi/Stripe) y comprobante electrónico.</p>
            </article>

            <article className="tile">
              <div className="icon">⚖️</div>
              <h3>Abogados Expertos</h3>
              <p className="muted">Profesionales especializados por área de práctica y experiencia comprobada.</p>
            </article>

            <article className="tile">
              <div className="icon">📝</div>
              <h3>Resumen y próximos pasos</h3>
              <p className="muted">Recibe un resumen claro de la consulta con orientación práctica y formatos de apoyo.</p>
            </article>
          </div>

          <div className="cta" style={{ marginTop: 22 }}>
            <div>
              <strong>¿Listo para agendar?</strong>
              <div className="muted">
                Elige tu área legal y la hora disponible que más se ajuste a ti.
              </div>
            </div>
            <Link href="/agenda" className="btn btn--primary">
              Agendar ahora
            </Link>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="section" aria-labelledby="how-title">
        <div className="wrap">
          <h2 id="how-title" className="h2" style={{ marginBottom: 6 }}>
            ¿Cómo funciona?
          </h2>
          <p className="muted" style={{ marginBottom: 22, maxWidth: 720 }}>
            Selecciona tu área, elige horario y recibe atención legal inmediata por videollamada. 
            La asesoría tiene una duración promedio de <strong>20 minutos</strong>.
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
              <p className="muted">Recibe orientación clara y próximos pasos con tu abogado asignado.</p>
            </li>
            <li>
              <h4>Resumen y formatos</h4>
              <p className="muted">
                Te enviamos un resumen y, cuando aplica, <strong>formatos pertinentes</strong> para continuar tu trámite
                ante juzgados o entidades (peticiones, memoriales, poderes, etc.).
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES */}
      <section className="section" aria-labelledby="faq-title">
        <div className="wrap">
          <h2 id="faq-title" className="h2" style={{ marginBottom: 12 }}>
            Preguntas frecuentes
          </h2>
          <div className="faq">
            <details>
              <summary>¿Cuánto dura la asesoría?</summary>
              <p>
                Tiene una duración promedio de <strong>20 minutos</strong>, tiempo suficiente para
                analizar tu caso y recibir orientación precisa. Si se requiere más tiempo, podrás
                agendar una ampliación o segunda sesión.
              </p>
            </details>

            <details>
              <summary>¿Qué incluye la asesoría?</summary>
              <p>
                Un diagnóstico inicial, orientación práctica y, si aplica, <strong>formatos listos</strong>
                (peticiones, memoriales, poderes, etc.) para continuar el trámite ante juzgados o entidades.
              </p>
            </details>

            <details>
              <summary>¿Qué pasa si necesito acompañamiento completo?</summary>
              <p>
                Si tu caso requiere representación o actuación judicial, te contactamos con un abogado
                especializado que te guiará en honorarios y etapas procesales.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
