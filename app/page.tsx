export default function Home() {
  return (
    <main className="landing">
      {/* HERO */}
      <section className="hero">
        <h1>
          <span>Castellanos</span> Abogados
        </h1>
        <p>
          Asesoría legal virtual en menos de 20 minutos.<br />
          Agenda tu cita, paga con seguridad y conéctate por videollamada.
        </p>
        <a href="/agenda" className="btn-primary">
          Agenda ahora →
        </a>
      </section>

      {/* SERVICIOS */}
      <section className="services">
        <h2>Servicios en línea</h2>
        <div className="grid">
          {[
            { icon: "📅", title: "Agenda Online", desc: "Programa asesorías desde cualquier lugar." },
            { icon: "💳", title: "Pago Seguro", desc: "Transacciones protegidas (Wompi)." },
            { icon: "👩‍⚖️", title: "Abogados Expertos", desc: "Profesionales verificados en derecho colombiano." },
            { icon: "📊", title: "Reportes", desc: "Historial y seguimiento de tus asesorías." },
            { icon: "🔔", title: "Recordatorios", desc: "Recibe notificaciones automáticas antes de tu cita." },
            { icon: "🧾", title: "Facturación", desc: "Recibe comprobantes electrónicos al instante." },
          ].map((item, i) => (
            <div key={i} className="card">
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta">
        <h2>Agenda tu primera asesoría</h2>
        <p>Rápido, profesional y 100% online.</p>
        <a href="/agenda" className="btn-primary">
          Iniciar ahora
        </a>
      </section>
    </main>
  );
}
