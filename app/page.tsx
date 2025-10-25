// app/servicios/page.tsx
import Link from "next/link";

export default function ServiciosPage() {
  return (
    <main className="section">
      <div className="wrap">
        <h1 className="h1">Servicios</h1>
        <p className="muted">
          Áreas de práctica y lo que incluye la asesoría de 20 minutos.
        </p>

        <div className="grid mt-24" style={{gridTemplateColumns: "repeat(12,1fr)", gap: 16}}>
          <div className="panel" style={{gridColumn: "span 12"}}>
            <strong>Consulta EXPRESS (20 min)</strong>
            <ul className="list mt-8">
              <li>Video llamada 1:1</li>
              <li>Revisión breve del caso</li>
              <li>Próximos pasos y acciones</li>
            </ul>
            <div className="mt-24">
              <Link href="/agenda" className="btn btn--primary">Agendar</Link>
            </div>
          </div>

          <div className="panel" style={{gridColumn: "span 12"}}>
            <strong>Documentos</strong>
            <p className="mt-8">Revisión de documentos simples (máx. 5 páginas).</p>
          </div>

          <div className="panel" style={{gridColumn: "span 12"}}>
            <strong>Remisiones</strong>
            <p className="mt-8">Si tu caso requiere trámite, te orientamos con el especialista.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
