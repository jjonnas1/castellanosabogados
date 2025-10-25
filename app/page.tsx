// app/page.tsx
export default function HomePage() {
  return (
    <main className="section">
      <div className="wrap">
        <div className="hero">
          <span className="badge">Bienvenido</span>
          <h1 className="h1">Asesoría jurídica confiable desde tu pantalla</h1>
          <p className="muted" style={{ maxWidth: 680 }}>
            Conecta con abogados verificados en las principales áreas del derecho.
            Agenda tu cita y recibe orientación clara para tu caso.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "22px" }}>
            <a href="/agenda" className="btn btn--primary">Agendar asesoría</a>
            <a href="/servicios" className="btn btn--ghost">Ver servicios</a>
          </div>
        </div>
      </div>
    </main>
  );
}
