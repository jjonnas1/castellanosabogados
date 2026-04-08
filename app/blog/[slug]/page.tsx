import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/app/components/SiteHeader';
import { buildWhatsAppUrl } from '@/lib/contactLinks';

const articles: Record<string, { title: string; category: string; date: string; content: string }> = {
  'cuando-interponer-una-tutela': {
    title: '¿Cuándo interponer una acción de tutela?',
    category: 'Tutelas',
    date: '2026-03-10',
    content: `
La acción de tutela es el principal mecanismo de protección de derechos fundamentales en Colombia, consagrado en el artículo 86 de la Constitución Política. Es ágil, gratuita y puede ser presentada por cualquier persona sin necesidad de abogado, aunque la asesoría jurídica aumenta significativamente las posibilidades de éxito.

**¿Cuándo procede la tutela?**

Procede cuando existe una vulneración o amenaza real e inminente de un derecho fundamental, y no existe otro mecanismo judicial eficaz para protegerlo. Los casos más comunes incluyen:

- Negativa de una EPS a autorizar medicamentos, procedimientos o tratamientos médicos.
- Omisiones de entidades públicas que afectan el mínimo vital.
- Vulneraciones al derecho de petición cuando la entidad no responde en los términos legales.
- Afectaciones al debido proceso en actuaciones administrativas o judiciales.
- Situaciones que requieren protección inmediata del derecho a la vida o a la salud.

**¿Qué requisitos debe cumplir?**

Para que la tutela sea viable, es necesario que: (1) exista un derecho fundamental comprometido, (2) la vulneración sea actual o la amenaza sea inminente, (3) no exista otro mecanismo judicial que resulte eficaz, o que existiendo, la tutela sea necesaria como mecanismo transitorio para evitar un perjuicio irremediable.

**¿Cuánto tiempo tiene el juez para fallar?**

El juez tiene diez (10) días hábiles para emitir su fallo. Si la decisión es desfavorable, se puede impugnar dentro de los tres (3) días siguientes, y el superior jerárquico tiene veinte (20) días para resolver.

**Recomendación**

Aunque la tutela puede presentarse sin abogado, contar con orientación jurídica permite estructurar correctamente los hechos, identificar los derechos vulnerados y acompañar el cumplimiento del fallo. En Castellanos Abogados acompañamos todo el proceso.
    `,
  },
  'derechos-del-imputado-proceso-penal': {
    title: 'Derechos del imputado en el proceso penal colombiano',
    category: 'Penal',
    date: '2026-03-18',
    content: `
Ser imputado en un proceso penal no significa ser culpable. El sistema penal acusatorio colombiano, establecido por la Ley 906 de 2004, garantiza una serie de derechos fundamentales a toda persona a quien se le atribuya la comisión de un delito.

**Principio de presunción de inocencia**

Toda persona es inocente hasta que sea declarada culpable mediante sentencia debidamente ejecutoriada. Esta presunción debe mantenerse a lo largo de todo el proceso y solo puede desvirtuarse mediante pruebas legalmente obtenidas.

**Derecho a no autoincriminarse**

Nadie está obligado a declarar contra sí mismo. El imputado puede guardar silencio en cualquier momento del proceso sin que ello pueda ser interpretado como indicio de culpabilidad.

**Derecho a la defensa técnica**

Desde el momento de la imputación, el procesado tiene derecho a ser asistido por un abogado de su elección o, en caso de no tenerlo, por un defensor público. La defensa técnica es irrenunciable.

**Derecho a conocer los cargos**

El imputado tiene derecho a ser informado de manera clara, precisa y oportuna sobre los hechos que se le atribuyen y la calificación jurídica de los mismos.

**Derechos procesales clave**

- Derecho a que las pruebas en su contra sean obtenidas de manera legal.
- Derecho a contrainterrogar testigos de cargo.
- Derecho a presentar pruebas de descargo.
- Derecho a que el proceso se adelante sin dilaciones injustificadas.
- Derecho a impugnar las decisiones que le sean desfavorables.

**¿Qué hacer si es imputado?**

Lo primero es no declarar sin la presencia de su abogado. Contacte a un profesional del derecho penal de inmediato. Las primeras decisiones del proceso son determinantes para la estrategia de defensa.
    `,
  },
  'responsabilidad-penal-empresarial': {
    title: '¿Qué es la responsabilidad penal de las personas jurídicas?',
    category: 'Penal Empresarial',
    date: '2026-04-01',
    content: `
Con la expedición de la Ley 2195 de 2022, Colombia incorporó de manera definitiva la responsabilidad penal de las personas jurídicas en su ordenamiento jurídico. Esto significa que las empresas, como entes independientes de sus socios y directivos, pueden ser investigadas, procesadas y sancionadas penalmente.

**¿Qué delitos pueden comprometer a una empresa?**

La ley establece que las personas jurídicas pueden responder penalmente por delitos cometidos en su nombre, por su cuenta y en su beneficio, tales como:

- Soborno transnacional.
- Financiación de terrorismo y lavado de activos.
- Delitos contra la administración pública (cohecho, peculado, etc.).
- Delitos contra el medio ambiente.
- Fraudes en contratación estatal.

**¿Cómo se determina la responsabilidad?**

La empresa responde cuando el delito es cometido por sus representantes legales, administradores, empleados o contratistas actuando en ejercicio de sus funciones y en beneficio de la organización. La responsabilidad puede existir incluso si el individuo que cometió el delito no es identificado o condenado.

**¿Qué sanciones pueden imponerse?**

Las sanciones incluyen multas de hasta 200.000 SMMLV, prohibición de contratar con el Estado, cancelación de la personería jurídica, y decomiso de bienes.

**¿Cómo proteger su empresa?**

La mejor protección es la prevención. Un programa serio de cumplimiento (compliance) penal permite identificar riesgos, establecer controles y demostrar buena fe institucional. En Castellanos Abogados acompañamos la estructuración de estos programas y la defensa en caso de investigaciones.
    `,
  },
  'beneficios-ejecucion-penas': {
    title: 'Beneficios administrativos en ejecución de penas',
    category: 'Ejecución de Penas',
    date: '2026-04-05',
    content: `
Una vez impuesta una condena, el proceso penal no termina. La fase de ejecución de penas es donde el condenado puede acceder a una serie de beneficios que le permiten modificar las condiciones de cumplimiento de su pena, siempre que cumpla los requisitos legales.

**Prisión domiciliaria**

Permite cumplir la pena en el lugar de residencia bajo condiciones de vigilancia electrónica. Procede cuando la pena impuesta no supera ciertos límites, cuando el condenado no tiene antecedentes penales graves, y cuando no representa un riesgo para la víctima o la sociedad.

**Libertad condicional**

Puede solicitarse cuando el condenado ha cumplido las tres quintas (3/5) partes de la pena, ha observado buena conducta en el establecimiento penitenciario y el juez considera que no existe necesidad de continuar la ejecución de la pena.

**Redención de pena**

Los internos pueden redimir tiempo de condena mediante trabajo, estudio y enseñanza. Por cada dos días de actividad efectiva se redime un día de pena. Es fundamental llevar un registro adecuado y solicitar oportunamente su reconocimiento ante el juez de ejecución de penas.

**Permiso de 72 horas**

Los condenados que han cumplido la mitad de la condena pueden solicitar permisos periódicos de salida. Este beneficio también sirve como preparación para la libertad condicional.

**¿Quién decide sobre estos beneficios?**

El juez de ejecución de penas y medidas de seguridad es la autoridad competente. Las solicitudes deben estar bien sustentadas, con los documentos del INPEC que acrediten el comportamiento y el tiempo cumplido.

**Nuestra recomendación**

Muchos condenados no acceden a estos beneficios por desconocimiento o por no contar con representación jurídica adecuada durante la ejecución. En Castellanos Abogados hacemos seguimiento permanente a los términos y gestionamos oportunamente cada solicitud.
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  const paragraphs = article.content.trim().split('\n\n');

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <SiteHeader />

      <section className="section-shell">
        <div className="container max-w-3xl space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="pill text-xs">{article.category}</span>
              <span className="text-xs text-muted">
                {new Date(article.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <h1>{article.title}</h1>
          </div>

          <div className="card-shell bg-white p-6 md:p-8 space-y-4 text-muted leading-relaxed">
            {paragraphs.map((p, i) => {
              if (p.startsWith('**') && p.endsWith('**')) {
                return <h3 key={i} className="text-ink font-semibold text-base mt-2">{p.replace(/\*\*/g, '')}</h3>;
              }
              return <p key={i} className="text-sm">{p}</p>;
            })}
          </div>

          <div className="card-shell bg-surface p-6 space-y-3">
            <p className="font-semibold text-ink">¿Tiene preguntas sobre este tema?</p>
            <p className="text-sm text-muted">Contáctenos y le orientamos sin compromiso.</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={buildWhatsAppUrl({ area: article.category, source: `/blog/${slug}`, message: `Hola, leí el artículo "${article.title}" y tengo una consulta.` })}
                className="btn-primary"
              >
                Escribir por WhatsApp
              </a>
              <Link href="/blog" className="btn-secondary">Ver más artículos</Link>
            </div>
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
