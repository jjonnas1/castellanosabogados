// app/page.tsx
export default function HomePage() {
  return (
    <main>
      {/* HERO PRINCIPAL */}
      <section className="section">
        <div className="wrap">
          <div className="hero">
            <span className="badge">Nueva · Asesoría legal en línea</span>
            <h1 className="h1">
              Asesoría legal clara y cercana,
              <br /> con abogados expertos.
            </h1>
            <p className="muted" style={{ maxWidth: 680 }}>
              Conéctate por videollamada con un abogado especializado en derecho
              colombiano. Atención personalizada, precio definido y respuesta inmediata.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "22px",
              }}
            >
              <a href="/agenda" className="btn btn--primary">
                Agendar asesoría
              </a>
              <a href="/servicios" className="btn btn--ghost">
                Ver servicios
              </a>
            </div>

            <div className="panel" style={{ marginTop: 30 }}>
              <h3 style={{ marginBottom: 8 }}>¿Por qué con nosotros?</h3>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>✔️ Abogados verificados por especialidad.</li>
                <li>✔️ Agenda segura y confirmación por correo.</li>
                <li>✔️ Respuestas claras y accionables.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <h2 className="h2">Servicios en línea</h2>
          <p className="muted" style={{ marginBottom: 40 }}>
            Todo lo necesario para una consulta eficiente y transparente.
          </p>

          <div className="tiles">
            <div className="tile">
              <div className="icon">📅</div>
              <h3>Agenda Online</h3>
              <p>Reserva tu asesoría desde cualquier dispositivo, en segundos.</p>
            </div>

            <div className="tile">
              <div className="icon">💳</div>
              <h3>Pago Seguro</h3>
              <p>Transacciones protegidas con Wompi o Stripe.</p>
            </div>

            <div className="tile">
              <div className="icon">⚖️</div>
              <h3>Abogados Expertos</h3>
              <p>Profesionales verificados por área de práctica.</p>
            </div>

            <div className="tile">
              <div className="icon">📝</div>
              <h3>Resumen de Consulta</h3>
              <p>Recibe un informe claro tras tu sesión con el abogado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <h2 className="h2">¿Cómo funciona?</h2>
          <div className="tiles" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
            <div className="tile">
              <h3>1️⃣ Selecciona tu área</h3>
              <p>Penal, laboral, civil, familia u otras especialidades.</p>
            </div>
            <div className="tile">
              <h3>2️⃣ Agenda y paga</h3>
              <p>Confirmación inmediata y recordatorios por correo.</p>
            </div>
            <div className="tile">
              <h3>3️⃣ Videollamada 1:1</h3>
              <p>Recibe orientación clara y pasos a seguir para tu caso.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / INFO ADICIONAL */}
      <section className="section" style={{ paddingTop: 60, paddingBottom: 100 }}>
        <div className="wrap">
          <h2 className="h2">Preguntas frecuentes</h2>
          <div className="panel">
            <h3>¿Cuánto dura una asesoría?</h3>
            <p>
              Cada asesoría tiene una duración aproximada de 20 a 40 minutos,
              dependiendo de la complejidad del caso. En la sesión se brinda
              orientación inicial, diagnóstico y pasos concretos.
            </p>

            <h3>¿Recibo soporte o documentos después?</h3>
            <p>
              Sí. Tras la asesoría recibirás, sin costo adicional, los{" "}
              <strong>formatos o modelos jurídicos pertinentes</strong> para que
              continúes tu trámite ante la entidad o juzgado correspondiente.
            </p>

            <h3>¿Puedo escoger mi abogado?</h3>
            <p>
              Sí. Puedes elegir por especialidad o dejar que nuestro sistema te
              asigne al profesional disponible más adecuado.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          textAlign: "center",
          padding: "40px 0",
          borderTop: "1px solid #e7ecf6",
          fontSize: ".9rem",
          color: "var(--muted)",
        }}
      >
        © 2025 Castellanos Abogados. Orientación legal confiable.
      </footer>
    </main>
  );
}
