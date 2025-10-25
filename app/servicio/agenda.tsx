// app/servicios/page.tsx
import Link from "next/link";

export default function ServiciosPage() {
  return (
    <div className="wrap section">
      <h1>Servicios</h1>
      <p className="muted">
        Áreas de práctica y lo que incluye la asesoría de 20 minutos.
      </p>

      <div className="cards-3">
        <div className="card">
          <h3>Consulta Express (20 min)</h3>
          <ul className="list">
            <li>Video llamada 1:1</li>
            <li>Revisión de tu caso</li>
            <li>Próximos pasos y acciones</li>
          </ul>
          <Link href="/agenda" className="btn btn--primary">
            Agendar
          </Link>
        </div>
        <div className="card">
          <h3>Documentos</h3>
          <p>Revisión de documentos simples (máx. 5 páginas).</p>
        </div>
        <div className="card">
          <h3>Remisiones</h3>
          <p>Si el caso requiere trámite, te orientamos con el especialista.</p>
        </div>
      </div>
    </div>
  );
}
