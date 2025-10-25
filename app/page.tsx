// app/page.tsx
export default function HomePage() {
  return (
    <main className="section">
      <div className="wrap">
        {/* HERO */}
        <section className="hero" aria-labelledby="hero-title">
          <span className="badge">Nueva · Asesoría legal en línea</span>
          <h1 id="hero-title" className="h1">
            Asesoría legal clara y cercana, con abogados expertos.
          </h1>
          <p className="muted" style={{ maxWidth: 720 }}>
            Conéctate por videollamada con un abogado especializado en derecho
            colombiano. Atención personalizada, precio definido y respuesta inmediata.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 22 }}>
            <a href="/agenda" className="btn btn--primary">Agendar asesoría</a>
            <a href="/servicios" className="btn btn--ghost">Ver servicios</a>
          </div>

          <div className="panel" style={{ marginTop: 22 }}>
            <strong>¿Por qué con nosotros?</strong>
            <ul style={{ margin: "10px 0 0 18px" }}>
              <li>Abogados verificados por especialidad.</li>
              <li>Agenda segura y confirmación por correo.</li>
              <li>Respuestas claras y accionables.</li>
            </ul>
          </div>
        </section>

        {/* SERVICIOS EN LÍNEA */}
        <section className="section" aria-labelledby="svc-title" style={{ paddingTop: 40 }}>
          <h2 id="svc-title" className="h2">Servicios en línea</h2>
          <p className="muted" style={{ marginBottom: 18 }}>
            Todo lo necesario para una consulta eficiente y transparente.
          </p>

          <div className="tiles">
            <article className="tile">
              <div className="icon">📅</div>
              <h3 className="h3" style={{ margin: 0 }}>Agenda Online</h3>
              <p className="muted">Reserva en segundos desde cualquier dispositivo.</p>
            </article>

            <article className="tile">
              <div className="icon">💳</div>
              <h3 className="h3" style={{ margin: 0 }}>Pago Seguro</h3>
              <p className="muted">Transacciones protegidas (Wompi/Stripe).</p>
            </article>

            <article className="tile">
              <div className="icon">👩‍⚖️</div>
              <h3 className="h3" style={{ margin: 0 }}>Abogados Expertos</h3>
              <p className="muted">Profesionales verificados por área de práctica.</p>
            </article>

            <article className="tile">
              <div className="icon">📝</div>
              <h3 className="h3" style={{ margin: 0 }}>Resumen y próximos pasos</h3>
              <p className="muted">Recibe un resumen claro tras la consulta.</p>
            </article>
          </div>

          <div className="cta" style={{ marginTop: 18 }}>
            <div>
              <strong>¿Listo para agendar?</strong>
              <p className="muted" style={{ margin: 6 }}>
                Elige tu área legal y la hora disponible que más te convenga.
              </p>
            </div>
            <a href="/agenda" className="btn btn--primary">Agendar ahora</a>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section className="section" aria-labelledby="how-title" style={{ paddingTop: 40 }}>
          <h2 id="how-title" className="h2">¿Cómo funciona?</h2>
          <ol style={{ paddingLeft: 18, marginTop: 10, lineHeight: 1.8 }}>
            <li><strong>Selecciona tu área</strong> · Penal, laboral, civil, familia u otras.</li>
            <li><strong>Agenda y paga</strong> · Confirmación inmediata y recordatorios por correo.</li>
            <li><strong>Videollamada 1:1</strong> · Orientación clara y próximos pasos.</li>
            <li><strong>Resumen</strong> · Te enviamos un resumen con acciones concretas.</li>
          </ol>
          <p className="muted" style={{ marginTop: 8 }}>
            Nota: La sesión típica dura <strong>20–30 minutos</strong>, según la complejidad del caso.
          </p>
        </section>

        {/* PREGUNTAS FRECUENTES */}
        <section className="section" aria-labelledby="faq-title" style={{ paddingTop: 40 }}>
          <h2 id="faq-title" className="h2">Preguntas frecuentes</h2>

          <details className="panel" style={{ marginTop: 12 }}>
            <summary><strong>¿Qué incluye la asesoría?</strong></summary>
            <p className="muted" style={{ marginTop: 8 }}>
              Videollamada 1:1, revisión breve del caso, orientación inmediata y
              un resumen con próximos pasos. Cuando aplica, te proporcionamos
              <strong> formatos pertinentes</strong> para que continúes tu trámite ante
              juzgados, fiscalía u otras entidades.
            </p>
          </details>

          <details className="panel" style={{ marginTop: 12 }}>
            <summary><strong>¿Puedo reprogramar?</strong></summary>
            <p className="muted" style={{ marginTop: 8 }}>
              Sí, puedes reprogramar sin costo con al menos 12 horas de anticipación.
            </p>
          </details>

          <details className="panel" style={{ marginTop: 12 }}>
            <summary><strong>¿Qué pasa si necesito representación?</strong></summary>
            <p className="muted" style={{ marginTop: 8 }}>
              Te orientamos y, si lo autorizas, te conectamos con un especialista
              en tu ciudad para la fase judicial o administrativa.
            </p>
          </details>
        </section>
      </div>
    </main>
  );
}
