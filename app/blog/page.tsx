import SiteHeader from '@/app/components/SiteHeader';
import BlogList from '@/app/components/BlogList';

export const metadata = {
  title: 'Blog jurídico | Castellanos Abogados',
  description:
    'Artículos y orientación legal sobre derecho penal, tutelas, ejecución de penas y más, escritos por el equipo de Castellanos Abogados.',
  alternates: { canonical: '/blog' },
};

const articles = [
  {
    slug: 'cuando-interponer-una-tutela',
    title: '¿Cuándo interponer una acción de tutela?',
    summary:
      'La tutela es el mecanismo más efectivo para proteger derechos fundamentales en Colombia. Conozca en qué casos procede y cómo presentarla correctamente.',
    date: '2026-03-10',
    category: 'Tutelas',
  },
  {
    slug: 'derechos-del-imputado-proceso-penal',
    title: 'Derechos del imputado en el proceso penal colombiano',
    summary:
      'Si usted o un familiar ha sido imputado, es fundamental conocer los derechos que la ley garantiza desde el primer momento del proceso penal.',
    date: '2026-03-18',
    category: 'Penal',
  },
  {
    slug: 'responsabilidad-penal-empresarial',
    title: '¿Qué es la responsabilidad penal de las personas jurídicas?',
    summary:
      'Desde la Ley 2195 de 2022, las empresas en Colombia pueden ser penalmente responsables. Sepa qué implica y cómo proteger su organización.',
    date: '2026-04-01',
    category: 'Penal Empresarial',
  },
  {
    slug: 'beneficios-ejecucion-penas',
    title: 'Beneficios administrativos en ejecución de penas',
    summary:
      'La prisión domiciliaria, la libertad condicional y las redenciones son derechos que muchos no conocen. Aprenda cuándo y cómo solicitarlos.',
    date: '2026-04-05',
    category: 'Ejecución de Penas',
  },
  {
    slug: 'abogado-penalista-pereira',
    title: 'Abogado penalista en Pereira: cuándo necesitas uno y cómo elegirlo',
    summary:
      'Enfrentar un proceso penal en el Eje Cafetero requiere un profesional especializado. Te explicamos cuándo actuar, qué hace un penalista y cómo elegir bien.',
    date: '2026-05-05',
    category: 'Penal',
  },
  {
    slug: 'que-hacer-si-te-detienen-colombia',
    title: '¿Qué hacer si te detienen en Colombia? Guía paso a paso',
    summary:
      'Una detención puede ocurrirle a cualquier persona. Conoce tus derechos desde el primer instante y los pasos que pueden determinar el resultado de tu caso.',
    date: '2026-05-05',
    category: 'Penal',
  },
  {
    slug: 'detencion-domiciliaria-colombia',
    title: 'Detención domiciliaria en Colombia: requisitos y cómo solicitarla',
    summary:
      'Muchos condenados pueden cumplir su pena fuera de la cárcel. Explicamos los dos tipos de detención domiciliaria en Colombia y cómo tramitarlos.',
    date: '2026-05-05',
    category: 'Ejecución de Penas',
  },
  {
    slug: 'divorcio-colombia',
    title: 'Divorcio en Colombia: tipos, proceso y tiempos',
    summary:
      'En Colombia existen varias vías para disolver el matrimonio. Conoce cuál aplica a tu caso y qué esperar del proceso judicial o notarial.',
    date: '2026-05-12',
    category: 'Familia',
  },
  {
    slug: 'acoso-laboral-colombia',
    title: 'Acoso laboral en Colombia: qué es, cómo reconocerlo y cómo denunciarlo',
    summary:
      'El acoso laboral tiene nombre legal en Colombia y un proceso claro para denunciarlo. Te explicamos qué dice la Ley 1010 de 2006 y cómo actuar.',
    date: '2026-05-12',
    category: 'Laboral',
  },
  {
    slug: 'medida-de-aseguramiento-colombia',
    title: 'Medida de aseguramiento en Colombia: tipos, requisitos y cómo impugnarla',
    summary:
      'La medida de aseguramiento puede privarte de la libertad antes de una condena. Conoce sus requisitos y las vías para impugnarla o sustituirla.',
    date: '2026-05-19',
    category: 'Penal',
  },
  {
    slug: 'libertad-condicional-colombia',
    title: 'Libertad condicional en Colombia: requisitos del artículo 64 del Código Penal',
    summary:
      'La libertad condicional permite recuperar la libertad antes de cumplir toda la condena. Conoce los 4 requisitos del artículo 64 del Código Penal y el proceso.',
    date: '2026-05-19',
    category: 'Ejecución de Penas',
  },
  {
    slug: 'preacuerdo-penal-colombia',
    title: 'Preacuerdo penal en Colombia: ventajas, riesgos y cuándo conviene',
    summary:
      'Un preacuerdo bien negociado puede reducir significativamente tu pena. Uno mal manejado puede ser un error grave. Te explicamos cuándo conviene y cuándo no.',
    date: '2026-05-19',
    category: 'Penal',
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

          <BlogList articles={articles} />
        </div>
      </section>

      <footer className="border-t border-border bg-white/90 py-8">
        <div className="container text-center text-sm text-muted">
          <p>© {new Date().getFullYear()} Castellanos Abogados · Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
