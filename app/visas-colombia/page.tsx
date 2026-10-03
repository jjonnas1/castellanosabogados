import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/app/components/SiteHeader';
import WaIcon from '@/app/components/WaIcon';
import { buildWhatsAppUrl } from '@/lib/contactLinks';
import styles from './visas.module.css';

const base = 'https://jonatancastellanosabogado.com';
const title = 'Abogado migratorio en Colombia | Castellanos Abogados';
const description = 'Abogado migratorio para extranjeros en toda Colombia. Asesoría en visas, residencia y permanencia, con atención virtual nacional y desde el exterior.';
export const metadata: Metadata = {
  title, description, alternates: { canonical: '/visas-colombia' },
  openGraph: { type: 'website', url: `${base}/visas-colombia`, title, description, images: [{ url: '/og-share-castellanos-2026.jpg', width: 1200, height: 630, alt: 'Castellanos Abogados — Asesoría migratoria en toda Colombia' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-share-castellanos-2026.jpg'] },
};
const scenarios = [
  ['01', 'Quiero quedarme más tiempo', 'Su permiso está por vencer o Colombia ya forma parte de sus planes. Revisamos qué opciones corresponden a su situación.', 'Permanencia en Colombia'],
  ['02', 'Mi pareja o mi familia están aquí', 'Matrimonio, unión de hecho, hijos o familiares extranjeros: identificamos cómo puede influir su vínculo en una solicitud.', 'Visa por vínculo familiar'],
  ['03', 'Quiero trabajar o vivir de mi pensión', 'Empleo en Colombia, trabajo remoto para el exterior o retiro: cada proyecto requiere una evaluación diferente.', 'Trabajo y pensión'],
  ['04', 'Voy a invertir o crear una empresa', 'Acompañamos la revisión migratoria de su proyecto y la coordinación de los documentos que necesita respaldar.', 'Inversión y empresa'],
  ['05', 'Mi situación cambió', 'Un permiso vencido, una separación o la terminación del empleo pueden afectar su permanencia. Revisemos el caso a tiempo.', 'Cambio de situación migratoria'],
  ['06', 'Quiero construir mi residencia', 'Si ya ha tenido visas en Colombia, revisamos su historial y las condiciones para estudiar una posible residencia.', 'Residencia en Colombia'],
];
const faqs = [
  ['¿La asesoría migratoria está disponible en toda Colombia?', 'Sí. Atendemos de forma virtual a extranjeros en cualquier ciudad de Colombia y a quienes se encuentran en el exterior. Nuestra ubicación en Pereira y Manizales no limita la cobertura nacional del servicio.'],
  ['¿Atienden extranjeros que todavía están fuera de Colombia?', 'Sí. Podemos iniciar la evaluación de su situación de forma virtual, revisar sus planes y definir el alcance del acompañamiento antes de su viaje.'],
  ['¿Pueden revisar un caso si el permiso ya venció?', 'Sí. Primero estudiamos las fechas, los documentos y las actuaciones que existan. La ruta depende de la situación concreta y puede requerir actuaciones ante Migración Colombia.'],
  ['¿Todas las visas permiten trabajar?', 'No. El permiso para trabajar depende de la categoría y de las condiciones de la visa. Revisamos que su actividad sea compatible con la autorización que solicita o tiene.'],
  ['¿La asesoría incluye traducción de documentos?', 'Podemos coordinar la revisión de sus necesidades de traducción como servicio complementario. El alcance y la necesidad de traducción oficial, apostilla o legalización se determinan según el documento y la entidad destinataria.'],
  ['¿Cuánto cuesta el servicio migratorio?', 'La evaluación inicial y el acompañamiento se cotizan según el tipo de caso y su complejidad. Recibirá una propuesta de honorarios con alcance definido; las tasas oficiales y los costos de terceros se informan aparte.'],
];
function contact(subject: string) { return buildWhatsAppUrl({ area: 'Derecho migratorio', source: '/visas-colombia', message: `Hola, quisiera consultar mi situación migratoria. Me interesa: ${subject}.` }); }

export default function VisasPage() {
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Service', name: 'Abogado migratorio en Colombia', serviceType: 'Asesoría en derecho migratorio, extranjería y visas', provider: { '@type': 'LegalService', name: 'Castellanos Abogados', url: base, telephone: '+573148309306' }, areaServed: { '@type': 'Country', name: 'Colombia' }, url: `${base}/visas-colombia`, description },
    { '@type': 'FAQPage', mainEntity: faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: base }, { '@type': 'ListItem', position: 2, name: 'Derecho migratorio', item: `${base}/visas-colombia` }] },
  ] };
  return <main className={styles.page}>
    <SiteHeader />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <section className={styles.hero}>
      <div className={`${styles.wrap} ${styles.heroGrid}`}>
        <div>
          <p className={styles.eyebrow}>Derecho migratorio · Extranjería y visas</p>
          <h1>Abogado migratorio<br /><em>en Colombia.</em></h1>
          <p className={styles.heroText}>Asesoría jurídica para extranjeros que quieren vivir, trabajar o permanecer en Colombia. Evaluamos su situación y le acompañamos con atención virtual en todo el país y desde el exterior.</p>
          <a href={contact('una evaluación de mi caso')} target="_blank" rel="noopener noreferrer" className={styles.primary}><WaIcon size={20} />Evaluar mi situación <span aria-hidden>↗</span></a>
          <p className={styles.heroLocation}>Cobertura en toda Colombia · Atención virtual desde el exterior</p>
        </div>
        <div className={styles.journey} aria-label="Asesoría para su proyecto de vida en Colombia">
          <div className={styles.journeyTop}><span>CASTELLANOS ABOGADOS</span><span>CO / 01</span></div>
          <svg viewBox="0 0 400 310" className={styles.globe} fill="none" aria-hidden>
            <circle cx="200" cy="145" r="115" /><ellipse cx="200" cy="145" rx="55" ry="115" /><ellipse cx="200" cy="145" rx="115" ry="42" /><path d="M85 145h230M200 30v230" /><path className={styles.flight} d="M38 235C120 275 144 19 341 63" /><circle cx="139" cy="194" r="7" className={styles.destination} /><circle cx="341" cy="63" r="4" className={styles.destination} />
          </svg>
          <div className={styles.journeyBottom}><span>UN PROYECTO DE VIDA</span><p>Colombia.<br /><em>Con respaldo jurídico.</em></p><span>Familia · Trabajo · Nuevas oportunidades</span></div>
        </div>
      </div>
    </section>
    <section className={styles.wrap} id="situaciones">
      <div className={styles.sectionIntro}><p className={styles.eyebrow}>Su situación es el punto de partida</p><h2>¿Qué le trae<br />a Colombia?</h2><p>Su nacionalidad, sus vínculos y sus planes importan. Le ayudamos a entender las posibilidades de su caso y a tomar decisiones con información.</p></div>
      <div className={styles.scenarios}>{scenarios.map(([n, heading, text, subject]) => <a key={n} href={contact(subject)} target="_blank" rel="noopener noreferrer" className={styles.scenario}><span className={styles.number}>{n}</span><h3>{heading}</h3><p>{text}</p><span className={styles.cardLink}>Consultar este caso <span aria-hidden>↗</span></span></a>)}</div>
    </section>
    <section className={styles.serviceBand}><div className={`${styles.wrap} ${styles.serviceGrid}`}>
      <div><p className={styles.eyebrow}>Un abogado a su lado</p><h2>Una solicitud merece<br /><em>algo más que un formulario.</em></h2></div>
      <div className={styles.valueList}>{[['Criterio para elegir', 'Evaluación de las alternativas y de los riesgos que pueden afectar su permanencia.'], ['Documentos con sentido', 'Revisión de la coherencia del expediente y de las formalidades que corresponden a su caso.'], ['Acompañamiento definido', 'Un alcance de trabajo claro para la preparación, presentación y seguimiento que contrate.']].map(([a,b]) => <div key={a}><h3>{a}</h3><p>{b}</p></div>)}</div>
    </div></section>
    <section className={`${styles.wrap} ${styles.translation}`}><div><p className={styles.eyebrow}>Documentos que cruzan fronteras</p><h2>El idioma también<br />forma parte de su caso.</h2><p>Integramos el análisis jurídico con la revisión de sus necesidades de traducción. Así podrá conocer el alcance que requiere cada documento antes de encargarlo.</p><Link href="/servicios/traduccion-legal" className={styles.textLink}>Conocer traducción de documentos <span aria-hidden>↗</span></Link></div><div className={styles.languageArt} aria-hidden><span>ES</span><i>↔</i><span>EN</span><span>FR</span><i>↔</i><span>IT</span><p>Contratos · Registros civiles · Poderes · Certificaciones</p></div></section>
    <section className={`${styles.wrap} ${styles.faq}`}><div><p className={styles.eyebrow}>Antes de conversar</p><h2>Preguntas frecuentes</h2><p>Asesoría en derecho migratorio y extranjería para toda Colombia. Revisamos visas, residencia y permanencia según las circunstancias de cada persona.</p></div><div>{faqs.map(([q,a]) => <details key={q}><summary>{q}<span aria-hidden>+</span></summary><p>{a}</p></details>)}<p className={styles.note}>La decisión de visa o permanencia corresponde a la autoridad competente. La asesoría se basa en la evaluación individual de su caso.</p></div></section>
  </main>;
}
