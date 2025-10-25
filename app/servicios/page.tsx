// app/servicios/page.tsx
import Link from "next/link";

export default function ServiciosPage() {
  return (
    <main className="section">
      <div className="wrap">
        <h1 className="h2" style={{ marginBottom: 6 }}>Servicios</h1>
        <p className="muted" style={{ marginBottom: 22 }}>
          Áreas de práctica y qué incluye la asesoría de 20 minutos.
        </p>

        <div className="tiles" style={{ marginBottom: 22 }}>
          <article className="tile">
            <div className="icon">📞</div>
            <h3 style={{ margin: "0 0 .35rem" }}>Consulta EXPRESS (20 min)</h3>
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }} className="muted">
              <li>Videollamada 1:1</li>
              <li>Revisión breve del caso</li>
              <li>Próximos pasos y acciones</li>
            </ul>
            <div style={{ marginTop: 14 }}>
              <Link href="/agenda" className="btn btn--primary">Agendar</Link>
            </div>
          </article>

          <article className="tile">
            <div className="icon">🧾</div>
            <h3 style={{ margin: "0 0 .35rem" }}>Documentos</h3>
            <p className="muted">
              Revisión de documentos simples (máx. 5 páginas) y observaciones puntuales.
            </p>
          </article>

          <article className="tile">
            <div className="icon">🔎</div>
            <h3 style={{ margin: "0 0 .35rem" }}>Orientación especializada</h3>
            <p className="muted">
              Derivación con un abogado experto por área de práctica cuando el caso lo exige.
            </p>
          </article>

          <article className="tile">
            <div className="icon">📤</div>
            <h3 style={{ margin: "0 0 .35rem" }}>Resumen y formatos</h3>
            <p className="muted">
              Recibirás un resumen y, si aplica, <strong>formatos pertinentes</strong> para continuar tu trámite
              ante juzgados o entidades (peticiones, memoriales, poderes, etc.).
            </p>
          </article>
        </div>

        {/* Banda CTA */}
        <div className="cta">
          <div>
            <strong>¿Listo para agendar?</strong>
            <div className="muted">Elige tu área legal y la hora disponible que más te convenga.</div>
          </div>
          <Link href="/agenda" className="btn btn--primary">Agendar ahora</Link>
        </div>
      </div>
    </main>
  );
}
