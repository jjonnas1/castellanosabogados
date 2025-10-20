// app/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <main className="landing">
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <Image
            src="/logo.png"
            alt="Castellanos Abogados"
            width={320}
            height={480}
            priority
            className="logo"
          />
          <h1>Asesoría Legal Virtual en 20 Minutos</h1>
          <p>
            Orientación jurídica profesional desde la comodidad de tu hogar. 
            Conéctate con un abogado experto en derecho colombiano.
          </p>
          <a href="/agenda" className="btn-primary">
            Agendar asesoría →
          </a>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="services">
        <h2>Servicios en Línea</h2>
        <div className="grid">
          <div className="card">
            <span>📅</span>
            <h3>Agenda Online</h3>
            <p>Reserva asesorías legales en cualquier momento.</p>
          </div>
          <div className="card">
            <span>💳</span>
            <h3>Pago Seguro</h3>
            <p>Transacciones protegidas con Wompi.</p>
          </div>
          <div className="card">
            <span>⚖️</span>
            <h3>Abogados Expertos</h3>
            <p>Profesionales verificados en derecho colombiano.</p>
          </div>
          <div className="card">
            <span>📄</span>
            <h3>Reportes</h3>
            <p>Historial y seguimiento de tus asesorías.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
