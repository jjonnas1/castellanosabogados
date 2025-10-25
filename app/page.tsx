import Link from "next/link";

export default function ServiciosPage() {
  return (
    <main className="main section">
      <div className="wrap">
        <h1 className="h1">Servicios</h1>
        <p className="muted">Áreas de práctica y lo que incluye la asesoría de 20 minutos.</p>

        <div className="stack">
          <div className="panel">
            <h3>Consulta EXPRESS (20 min)</h3>
            <ul className="list">
              <li>Video llamada 1:1</li>
              <li>Revisión breve del caso</li>
              <li>Próximos pasos y acciones</li>
            </ul>
            <Link href="/agenda" className="btn btn--primary">Agendar</Link>
          </div>

          <div className="panel">Documentos<br/>Revisión de documentos simples (máx. 5 páginas).</div>
          <div className="panel">Remisiones<br/>Si el caso requiere trámite, te orientamos con el especialista.</div>
        </div>
      </div>
    </main>
  );
}
