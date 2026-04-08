import Link from 'next/link';
import SiteHeader from '@/app/components/SiteHeader';

const articles = [
  {
    slug: 'cuando-interponer-una-tutela',
    title: '¿Cuándo interponer una acción de tutela?',
    summary: 'La tutela es el mecanismo más efectivo para proteger derechos fundamentales en Colombia. Conozca en qué casos procede y cómo presentarla correctamente.',
    date: '2026-03-10',
    category: 'Tutelas',
  },
  {
    slug: 'derechos-del-imputado-proceso-penal',
    title: 'Derechos del imputado en el proceso penal colombiano',
    summary: 'Si usted o un familiar ha sido imputado, es fundamental conocer los derechos que la ley garantiza desde el primer momento del proceso penal.',
    date: '2026-03-18',
    category: 'Penal',
  },
  {
    slug: 'responsabilidad-penal-empresarial',
    title: '¿Qué es la responsabilidad penal de las personas jurídicas?',
    summary: 'Desde la Ley 2195 de 2022, las empresas en Colombia pueden ser penalmente responsables. Sepa qué implica y cómo proteger su organización.',
    date: '2026-04-01',
    category: 'Penal Empresarial',
  },
  {
    slug: 'beneficios-ejecucion-penas',
    title: 'Beneficios administrativos en ejecución de penas',
    summary: 'La prisión domiciliaria, la libertad condicional y las redenciones son derechos que muchos no conocen. Aprenda cuándo y cómo solicitarlos.',
    date: '2026-04-05',
    category: 'Ejecución de Penas',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <SiteHeader />

      <section className="section-shell bg-surface/80">
        <div className="container space-y-8">
          <div className="space-y-2">
            <p className="pill w-fit">Blog jurídico</p>
            <h1>Artículos y orientación legal</h1>
            <p className="max-w-2xl text-muted">
              Información práctica sobre derecho penal, tutelas, ejecución de penas y más, escrita por nuestro equipo.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {articles.map((a) => (
              <article key={a.slug} className="card-shell bg-white p-6 flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="pill text-xs">{a.category}</span>
                    <span className="text-xs text-muted">{new Date(a.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <h2 className="text-lg">{a.title}</h2>
                  <p className="text-sm text-muted">{a.summary}</p>
                </div>
                <Link href={`/blog/${a.slug}`} className="btn-secondary w-fit">
                  Leer artículo
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-white/90 py-8">
        <div className="container text-sm text-muted text-center">
          <p>© {new Date().getFullYear()} Castellanos Abogados · Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
