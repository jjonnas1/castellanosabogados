// app/page.tsx
export default function Home() {
  return (
    <main style={{ padding: 50, textAlign: "center" }}>
      <h1>🚀 Página funcionando</h1>
      <p>Si ves esto, el problema era con los estilos o el layout.</p>
      <a href="/agenda">Ir a agenda</a>
    </main>
  );
}
{/* Sección de funcionalidades */}
<section
  style={{
    background: "linear-gradient(180deg, #0b3d91 0%, #0f52ba 100%)",
    color: "#fff",
    padding: "60px 20px",
    textAlign: "center",
  }}
>
  <h2 style={{ fontSize: 28, marginBottom: 40, fontWeight: 700 }}>
    Todo lo que necesitas para tu gestión legal
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: 24,
      maxWidth: 1000,
      margin: "0 auto",
    }}
  >
    {[
      { icon: "📅", title: "Agenda Online", desc: "Programa tus asesorías fácilmente." },
      { icon: "🧾", title: "Facturación", desc: "Genera comprobantes y recibos legales." },
      { icon: "💼", title: "Gestión de clientes", desc: "Accede al historial de tus usuarios." },
      { icon: "🔔", title: "Recordatorios", desc: "Notifica a tus clientes por correo." },
      { icon: "💳", title: "Pagos Online", desc: "Pronto con integración Wompi." },
      { icon: "📊", title: "Reportes", desc: "Consulta tus estadísticas de asesorías." },
      { icon: "⚖️", title: "Especialidades", desc: "Civil, penal, laboral y más." },
      { icon: "🔐", title: "Seguridad", desc: "Protección de datos personales." },
    ].map((item, i) => (
      <div
        key={i}
        style={{
          background: "#ffffff",
          borderRadius: 16,
          padding: 24,
          color: "#0b3d91",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
      >
        <div style={{ fontSize: 40, marginBottom: 12 }}>{item.icon}</div>
        <h3 style={{ fontSize: 18, marginBottom: 8 }}>{item.title}</h3>
        <p style={{ fontSize: 14, color: "#333" }}>{item.desc}</p>
      </div>
    ))}
  </div>

  <h3
    style={{
      marginTop: 50,
      fontSize: 22,
      fontWeight: 700,
      color: "#fff",
    }}
  >
    ¡Y mucho más!
  </h3>
</section>
