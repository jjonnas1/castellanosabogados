// app/page.tsx
export default function Home() {
  return (
    <main style={{ display: "grid", gap: 24, padding: 32 }}>
      {/* Hero principal */}
      <section
        className="card"
        style={{
          position: "relative",
          overflow: "hidden",
          padding: 32,
          background:
            "radial-gradient(600px circle at 20% 10%, rgba(37,99,235,0.25), transparent 40%), radial-gradient(600px circle at 80% 20%, rgba(96,165,250,0.15), transparent 50%)",
        }}
      >
        <div style={{ position: "relative" }}>
          <span
            style={{
              display: "inline-block",
              background: "var(--brand-2)",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: "10px",
              marginBottom: 12,
            }}
          >
            Nueva · Asesoría virtual en 20 minutos
          </span>

          <h1
            style={{
              fontSize: "clamp(28px, 3vw, 36px)",
              color: "var(--text)",
              marginBottom: 8,
            }}
          >
            Tu consulta de{" "}
            <span style={{ color: "var(--brand)" }}>derecho colombiano</span>, rápida y clara.
          </h1>

          <p
            style={{
              color: "var(--muted)",
              fontSize: 18,
              maxWidth: 700,
              marginTop: 8,
            }}
          >
            Agenda en línea, paga con seguridad (pronto Wompi) y conéctate por videollamada.
          </p>

          <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
            <a className="btn" href="/agenda">
              Agendar ahora
            </a>
            <a
              href="#como-funciona"
              className="btn secondary"
              style={{ opacity: 0.85 }}
            >
              ¿Cómo funciona?
            </a>
          </div>
        </div>
      </section>

      {/* Sección de beneficios */}
      <section
        id="como-funciona"
        className="card"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 18,
          background: "var(--surface)",
        }}
      >
        {[
          {
            t: "Rápido",
            d: "Citas de 20 minutos enfocadas en tu caso.",
          },
          {
            t: "Profesional",
            d: "Abogados verificados y especializados.",
          },
          {
            t: "100% online",
            d: "Reserva, paga y recibe el enlace al instante.",
          },
        ].map((f, i) => (
          <div key={i} style={{ padding: 8 }}>
            <h3 style={{ marginBottom: 6, color: "var(--text)" }}>{f.t}</h3>
            <p style={{ color: "var(--muted)" }}>{f.d}</p>
          </div>
        ))}
      </section>

      {/* Pie o aviso */}
      <p
        style={{
          textAlign: "center",
          color: "var(--muted)",
          marginTop: 40,
          fontSize: 14,
        }}
      >
        © 2025 CastellanosAbogados · Orientación legal puntual. No constituye representación judicial.
      </p>
    </main>
  );
}
