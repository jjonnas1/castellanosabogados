'use client';

import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Check,
  FileText,
  Clock3,
  FileCheck2,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Plus,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import SiteHeader from '@/app/components/SiteHeader';
import { buildWhatsAppUrl } from '@/lib/contactLinks';
import { serviceDetails, type ServiceDetail } from '@/lib/serviceDetails';
import s from './EditorialServiceExperience.module.css';

type EditorialSlug = Exclude<ServiceDetail['slug'], 'traduccion-legal'>;
type Layout = 'protocol' | 'timeline' | 'split' | 'dossier' | 'dual' | 'matrix' | 'modules';

type Profile = {
  accent: string;
  soft: string;
  deep: string;
  icon: LucideIcon;
  layout: Layout;
  heroLabel: string;
  heroStatement: string;
  keywords: [string, string, string];
  activationTitle: string;
  signatureTitle: string;
  signatureIntro: string;
  cards: Array<{ label: string; title: string; detail: string }>;
  deliverablesTitle: string;
  processTitle: string;
  closeTitle: string;
  closeBody: string;
};

type ServiceBrief = {
  question: string;
  answer: string;
  outcome: string;
  preparation: [string, string, string];
  credential: string;
  faqs: Array<{ question: string; answer: string }>;
  related: [EditorialSlug, EditorialSlug, EditorialSlug];
};

const profiles: Record<EditorialSlug, Profile> = {
  'penal-personas': {
    accent: '#7b3040', soft: '#f3e9ec', deep: '#54202c', icon: ShieldCheck, layout: 'protocol',
    heroLabel: 'DEFENSA PENAL', heroStatement: 'La primera respuesta importa.', keywords: ['Hechos', 'Evidencia', 'Decisión'],
    activationTitle: 'Actuar antes de que el proceso marque el ritmo.',
    signatureTitle: 'Defensa construida desde la primera actuación.',
    signatureIntro: 'Cada decisión se prepara a partir de lo que ocurrió, lo que puede probarse y el riesgo procesal inmediato.',
    cards: [
      { label: 'CONTEXTO', title: 'Qué ocurrió', detail: 'Reconstrucción precisa de hechos, personas, fechas y actuaciones conocidas.' },
      { label: 'PRUEBA', title: 'Qué puede demostrarse', detail: 'Lectura temprana de documentos, comunicaciones y elementos materiales.' },
      { label: 'RIESGO', title: 'Qué decisión viene', detail: 'Preparación frente a citaciones, imputaciones, audiencias y medidas.' },
    ],
    deliverablesTitle: 'Una defensa que se puede explicar y sostener.', processTitle: 'Del primer contacto a cada audiencia.',
    closeTitle: 'La estrategia penal no debería empezar tarde.', closeBody: 'Cuéntenos qué ocurrió y qué actuación está próxima.'
  },
  'ejecucion-penas': {
    accent: '#3e665e', soft: '#e9f0ed', deep: '#294a43', icon: Clock3, layout: 'timeline',
    heroLabel: 'TIEMPO Y LIBERTAD', heroStatement: 'Cada día cuenta.', keywords: ['Cómputo', 'Redención', 'Beneficio'],
    activationTitle: 'El expediente debe decir cuánto tiempo falta.',
    signatureTitle: 'Tiempo cumplido, soporte y petición.',
    signatureIntro: 'La posibilidad de un beneficio depende de unir correctamente el cómputo, las actividades certificadas y los requisitos legales.',
    cards: [
      { label: 'TIEMPO FÍSICO', title: 'Días efectivamente cumplidos', detail: 'Verificación de fechas de captura, privación de libertad y cómputos judiciales.' },
      { label: 'REDENCIONES', title: 'Trabajo, estudio y enseñanza', detail: 'Revisión de certificados, conducta y actividades que pueden descontar pena.' },
      { label: 'BENEFICIO', title: 'Solicitud jurídicamente viable', detail: 'Libertad condicional, domiciliaria, permisos u otra alternativa aplicable.' },
    ],
    deliverablesTitle: 'Una solicitud completa, no una expectativa.', processTitle: 'Del cómputo a la decisión judicial.',
    closeTitle: 'Revisemos cuánto tiempo puede reconocerse.', closeBody: 'Comparta la sentencia, el cómputo y los certificados disponibles.'
  },
  familia: {
    accent: '#9a5e56', soft: '#f5ece9', deep: '#6e403b', icon: HeartHandshake, layout: 'split',
    heroLabel: 'FAMILIA Y PROTECCIÓN', heroStatement: 'Proteger también es ordenar.', keywords: ['Personas', 'Acuerdos', 'Medidas'],
    activationTitle: 'Resolver sin perder de vista a la familia.',
    signatureTitle: 'Personas, acuerdos y medidas urgentes.',
    signatureIntro: 'La ruta cambia cuando hay menores, patrimonio común o una situación que exige protección inmediata.',
    cards: [
      { label: 'CUIDADO', title: 'Niños y adolescentes', detail: 'Custodia, alimentos, visitas y decisiones orientadas a su bienestar.' },
      { label: 'ACUERDOS', title: 'Separación y patrimonio', detail: 'Divorcio, sociedad conyugal y acuerdos que reduzcan el conflicto.' },
      { label: 'PROTECCIÓN', title: 'Respuesta urgente', detail: 'Medidas frente a violencia o riesgos que no pueden esperar.' },
    ],
    deliverablesTitle: 'Una ruta comprensible para decisiones sensibles.', processTitle: 'Acompañamiento firme, trato humano.',
    closeTitle: 'Protejamos primero lo que no puede esperar.', closeBody: 'Explique quiénes están involucrados y cuál es la urgencia actual.'
  },
  civil: {
    accent: '#4c6278', soft: '#ebf0f3', deep: '#334657', icon: FileCheck2, layout: 'dossier',
    heroLabel: 'PATRIMONIO Y OBLIGACIONES', heroStatement: 'Los documentos cuentan la historia.', keywords: ['Contrato', 'Prueba', 'Resultado'],
    activationTitle: 'Un conflicto civil se prepara desde sus soportes.',
    signatureTitle: 'Del documento al resultado buscado.',
    signatureIntro: 'Antes de demandar o negociar, ordenamos la obligación, la evidencia disponible y el efecto patrimonial esperado.',
    cards: [
      { label: 'DOCUMENTO', title: 'La obligación', detail: 'Contrato, título, acuerdo o hecho que origina el conflicto.' },
      { label: 'SOPORTE', title: 'La prueba', detail: 'Pagos, comunicaciones, incumplimientos y demás evidencia útil.' },
      { label: 'DECISIÓN', title: 'La vía', detail: 'Negociación, conciliación, demanda o combinación estratégica.' },
    ],
    deliverablesTitle: 'Una ruta proporcional al valor y al riesgo.', processTitle: 'Documentar, reclamar y hacer seguimiento.',
    closeTitle: 'Pongamos en orden el conflicto patrimonial.', closeBody: 'Comparta el contrato o documento principal y el resultado que necesita.'
  },
  laboral: {
    accent: '#426474', soft: '#e9f0f3', deep: '#2e4855', icon: BriefcaseBusiness, layout: 'dual',
    heroLabel: 'TRABAJO Y PRESTACIONES', heroStatement: 'Cada relación deja evidencia.', keywords: ['Trabajador', 'Empleador', 'Soportes'],
    activationTitle: 'La relación laboral debe revisarse completa.',
    signatureTitle: 'Dos perspectivas, una misma evidencia.',
    signatureIntro: 'Analizamos contrato, pagos, comunicaciones y decisiones internas según la posición que deba protegerse.',
    cards: [
      { label: 'TRABAJADOR', title: 'Derechos y reclamaciones', detail: 'Salarios, prestaciones, despido, estabilidad y condiciones de trabajo.' },
      { label: 'EMPLEADOR', title: 'Prevención y respuesta', detail: 'Procesos disciplinarios, terminaciones y gestión del riesgo laboral.' },
      { label: 'EXPEDIENTE', title: 'Evidencia laboral', detail: 'Contrato, nómina, reglamentos, comunicaciones y trazabilidad.' },
    ],
    deliverablesTitle: 'Cifras, riesgos y alternativas sobre la mesa.', processTitle: 'Del vínculo laboral a una decisión sustentada.',
    closeTitle: 'Revisemos la relación antes de tomar posición.', closeBody: 'Indique si consulta como trabajador o empleador y qué decisión enfrenta.'
  },
  administrativo: {
    accent: '#6b6047', soft: '#f1eee7', deep: '#4a412e', icon: Landmark, layout: 'timeline',
    heroLabel: 'ACTOS Y TÉRMINOS', heroStatement: 'Frente al Estado, el término manda.', keywords: ['Notificación', 'Recurso', 'Control'],
    activationTitle: 'Una notificación activa el reloj.',
    signatureTitle: 'Acto, término y respuesta.',
    signatureIntro: 'La estrategia depende de identificar qué decidió la entidad, cuándo quedó notificado y cuál mecanismo sigue disponible.',
    cards: [
      { label: 'ACTO', title: 'Qué decidió la entidad', detail: 'Lectura del acto, requerimiento, sanción o decisión administrativa.' },
      { label: 'TÉRMINO', title: 'Cuánto tiempo queda', detail: 'Cómputo de oportunidades para responder, recurrir o demandar.' },
      { label: 'RESPUESTA', title: 'Qué vía corresponde', detail: 'Recurso, actuación administrativa o control ante la jurisdicción.' },
    ],
    deliverablesTitle: 'Control de términos y argumentos verificables.', processTitle: 'De la notificación a la respuesta institucional.',
    closeTitle: 'No deje vencer la oportunidad de controvertir.', closeBody: 'Comparta la decisión recibida y la fecha exacta de notificación.'
  },
  'responsabilidad-penal-pj': {
    accent: '#5b526e', soft: '#eeecf2', deep: '#3f384f', icon: Building2, layout: 'matrix',
    heroLabel: 'RIESGO CORPORATIVO', heroStatement: 'Decidir también deja trazabilidad.', keywords: ['Gobierno', 'Control', 'Evidencia'],
    activationTitle: 'El riesgo penal empieza antes de la investigación.',
    signatureTitle: 'Decisión, soporte y responsables.',
    signatureIntro: 'Cada operación sensible debe poder explicarse mediante controles, criterios y registros consistentes.',
    cards: [
      { label: 'EXPOSICIÓN', title: 'Dónde está el riesgo', detail: 'Procesos, contratos y decisiones con mayor exposición penal.' },
      { label: 'GOBIERNO', title: 'Quién decide y controla', detail: 'Responsables, comités, escalamiento y deberes de supervisión.' },
      { label: 'TRAZABILIDAD', title: 'Qué queda documentado', detail: 'Soportes, alertas, protocolos y evidencia de debida diligencia.' },
    ],
    deliverablesTitle: 'Controles que la organización puede activar.', processTitle: 'Del mapa de riesgo al protocolo operativo.',
    closeTitle: 'Convirtamos una alerta en una decisión controlada.', closeBody: 'Indique el proceso, la decisión sensible y los responsables involucrados.'
  },
  'capacitaciones-penal-pj': {
    accent: '#866b35', soft: '#f3efe5', deep: '#5d4923', icon: GraduationCap, layout: 'modules',
    heroLabel: 'FORMACIÓN EJECUTIVA', heroStatement: 'Aprender para decidir mejor.', keywords: ['Casos', 'Protocolos', 'Aplicación'],
    activationTitle: 'La capacitación debe cambiar decisiones reales.',
    signatureTitle: 'Contenido, práctica y evidencia de formación.',
    signatureIntro: 'Cada sesión se diseña para el rol del participante y los riesgos concretos de la organización.',
    cards: [
      { label: 'MÓDULO 01', title: 'Comprender el riesgo', detail: 'Conceptos esenciales explicados desde situaciones de la operación.' },
      { label: 'MÓDULO 02', title: 'Practicar la respuesta', detail: 'Casos, decisiones y ejercicios para aplicar el criterio aprendido.' },
      { label: 'MÓDULO 03', title: 'Dejar capacidad instalada', detail: 'Guías, materiales y evidencias para continuidad y trazabilidad.' },
    ],
    deliverablesTitle: 'Una formación diseñada para su organización.', processTitle: 'Diagnóstico, diseño, sesión y evidencia.',
    closeTitle: 'Diseñemos una sesión que sí se use después.', closeBody: 'Indique el equipo, el riesgo prioritario y el resultado esperado.'
  },
};

const serviceBriefs: Record<EditorialSlug, ServiceBrief> = {
  'penal-personas': {
    question: '¿Qué actuación viene y qué puede cambiar desde ahora?',
    answer: 'La defensa empieza por ubicar el momento procesal, reconstruir los hechos y proteger la evidencia antes de responder a la autoridad.',
    outcome: 'Una estrategia inmediata para declarar, guardar silencio, aportar elementos o preparar la audiencia.',
    preparation: ['Citación, denuncia o documento recibido de la autoridad.', 'Relato cronológico con fechas, lugares y personas involucradas.', 'Mensajes, contratos, videos u otros soportes disponibles.'],
    credential: 'La atención se concentra en la estrategia, la preparación de cada actuación y la explicación clara de los riesgos procesales.',
    faqs: [
      { question: '¿Debo esperar a que exista una imputación?', answer: 'No. Una consulta temprana permite preservar evidencia y preparar la respuesta antes de una declaración o audiencia.' },
      { question: '¿Puedo consultar si solo recibí una citación?', answer: 'Sí. La citación y su contexto permiten identificar la autoridad, el propósito de la diligencia y la forma adecuada de comparecer.' },
      { question: '¿La primera revisión define toda la defensa?', answer: 'Define prioridades y riesgos iniciales. La estrategia se ajusta a medida que se conocen el expediente y las actuaciones.' },
    ],
    related: ['ejecucion-penas', 'familia', 'civil'],
  },
  'ejecucion-penas': {
    question: '¿El tiempo cumplido y las redenciones permiten solicitar un beneficio?',
    answer: 'Hay que verificar el cómputo judicial, los certificados del establecimiento y los requisitos particulares de cada alternativa.',
    outcome: 'Una lectura concreta de lo cumplido, lo pendiente y la solicitud que puede sustentarse.',
    preparation: ['Sentencia y constancia de ejecutoria, si están disponibles.', 'Cómputo de pena y decisiones anteriores del juzgado.', 'Certificados de trabajo, estudio, enseñanza y conducta.'],
    credential: 'La revisión conecta los documentos penitenciarios con los requisitos jurídicos para evitar solicitudes incompletas o prematuras.',
    faqs: [
      { question: '¿Toda persona condenada puede pedir libertad condicional?', answer: 'No automáticamente. Se revisan tiempo cumplido, conducta, reparación, arraigo y las condiciones legales aplicables al caso.' },
      { question: '¿Las actividades de trabajo o estudio descuentan tiempo?', answer: 'Pueden generar redención cuando están certificadas y reconocidas por la autoridad competente.' },
      { question: '¿Puede consultar un familiar?', answer: 'Sí. La familia puede iniciar la revisión y reunir documentos, aunque algunas actuaciones requieren poder o intervención directa de la persona condenada.' },
    ],
    related: ['penal-personas', 'familia', 'administrativo'],
  },
  familia: {
    question: '¿Qué necesita protección inmediata y qué puede resolverse mediante acuerdo?',
    answer: 'La ruta cambia cuando hay menores, violencia, incumplimientos alimentarios o bienes que deben organizarse antes de negociar.',
    outcome: 'Prioridades claras para proteger, conciliar o acudir ante comisaría, defensoría o juez.',
    preparation: ['Registros civiles y documentos que acrediten el vínculo familiar.', 'Acuerdos, sentencias o actas de conciliación anteriores.', 'Soportes de pagos, gastos, comunicaciones o hechos urgentes.'],
    credential: 'El acompañamiento combina firmeza jurídica con una comunicación cuidadosa cuando las decisiones afectan hijos, vivienda o patrimonio familiar.',
    faqs: [
      { question: '¿Siempre hay que demandar?', answer: 'No. Cuando existe margen de acuerdo puede intentarse una conciliación; si hay riesgo, incumplimiento o bloqueo, se evalúa la vía judicial.' },
      { question: '¿Qué ocurre si hay una situación de violencia?', answer: 'La prioridad es la protección. Se revisan medidas urgentes y la autoridad competente según los hechos y las personas afectadas.' },
      { question: '¿Pueden revisarse alimentos y custodia al mismo tiempo?', answer: 'Sí. Con frecuencia ambos asuntos están conectados y conviene diseñar una ruta coherente para evitar decisiones contradictorias.' },
    ],
    related: ['civil', 'laboral', 'penal-personas'],
  },
  civil: {
    question: '¿Existe una obligación demostrable y una vía útil para exigirla?',
    answer: 'No basta con tener razón: hay que identificar el documento, la prueba del incumplimiento y la capacidad real de obtener un resultado.',
    outcome: 'Una decisión informada entre requerir, conciliar, demandar o descartar una acción desproporcionada.',
    preparation: ['Contrato, título, factura, promesa o documento principal.', 'Comprobantes de pago y comunicaciones sobre el incumplimiento.', 'Datos de la contraparte y resultado económico que se busca.'],
    credential: 'La revisión evita iniciar procesos costosos sin antes medir prueba, cuantía, términos y posibilidades de cumplimiento.',
    faqs: [
      { question: '¿Un acuerdo verbal puede reclamarse?', answer: 'Puede ser posible, pero depende de la naturaleza del negocio y de la evidencia que permita demostrar sus condiciones.' },
      { question: '¿Conviene conciliar antes de demandar?', answer: 'En algunos asuntos es requisito y en otros una decisión estratégica. Se valora costo, tiempo, prueba y disposición de la contraparte.' },
      { question: '¿Qué pasa si no conozco los bienes del deudor?', answer: 'La viabilidad no depende solo de obtener una sentencia; también conviene evaluar desde el inicio las posibilidades reales de ejecución.' },
    ],
    related: ['familia', 'laboral', 'administrativo'],
  },
  laboral: {
    question: '¿Qué ocurrió durante la relación y qué evidencia quedó?',
    answer: 'Contrato, nómina, comunicaciones y decisiones disciplinarias permiten revisar derechos, contingencias y opciones de acuerdo.',
    outcome: 'Una estimación del riesgo y una ruta para reclamar, conciliar, responder o corregir el procedimiento.',
    preparation: ['Contrato, desprendibles de nómina y certificados laborales.', 'Carta de terminación, descargos o comunicaciones relevantes.', 'Relación de salarios, prestaciones o hechos que se discuten.'],
    credential: 'La consulta distingue la posición de trabajador o empleador y organiza cifras, documentos y decisiones antes de fijar una postura.',
    faqs: [
      { question: '¿Puedo reclamar aunque no exista contrato escrito?', answer: 'Sí puede existir relación laboral sin contrato escrito si se demuestran prestación personal, subordinación y remuneración.' },
      { question: '¿Una terminación exige siempre indemnización?', answer: 'Depende de la causa, el tipo de contrato, el procedimiento y las circunstancias particulares de estabilidad laboral.' },
      { question: '¿La empresa puede corregir un proceso disciplinario?', answer: 'Conviene revisarlo antes de decidir. La oportunidad de corregir depende de la etapa, las garantías otorgadas y la medida proyectada.' },
    ],
    related: ['civil', 'administrativo', 'responsabilidad-penal-pj'],
  },
  administrativo: {
    question: '¿Qué término empezó a correr y cuál es la respuesta disponible?',
    answer: 'La fecha de notificación, el contenido del acto y los recursos procedentes determinan si corresponde responder, recurrir o demandar.',
    outcome: 'Un calendario jurídico con la actuación prioritaria y los argumentos que deben documentarse.',
    preparation: ['Acto, requerimiento o comunicación completa de la entidad.', 'Constancia y fecha exacta de notificación o recepción.', 'Expediente previo, respuestas presentadas y soportes relevantes.'],
    credential: 'El trabajo se organiza alrededor del término, la competencia de la entidad y la construcción de una respuesta verificable.',
    faqs: [
      { question: '¿La fecha del documento es igual a la fecha de notificación?', answer: 'No necesariamente. Para calcular términos debe revisarse cómo y cuándo se produjo la notificación válida.' },
      { question: '¿Todo acto administrativo tiene recurso?', answer: 'No. El propio acto y las normas aplicables indican si proceden recursos y en qué plazo deben presentarse.' },
      { question: '¿Se puede acudir directamente a un juez?', answer: 'Depende del medio de control, los recursos obligatorios y otros requisitos previos. Esa ruta debe verificarse antes de vencer términos.' },
    ],
    related: ['civil', 'laboral', 'responsabilidad-penal-pj'],
  },
  'responsabilidad-penal-pj': {
    question: '¿La organización puede explicar quién decidió, con qué información y bajo qué control?',
    answer: 'La exposición penal aumenta cuando una operación sensible no tiene responsables, alertas, soportes o canales de escalamiento claros.',
    outcome: 'Un mapa de exposición y medidas concretas para documentar decisiones, controles y respuesta temprana.',
    preparation: ['Organigrama y responsables del proceso bajo revisión.', 'Políticas, contratos, actas y matrices de riesgo existentes.', 'Hallazgos de auditoría, alertas internas o hechos que originan la consulta.'],
    credential: 'La asesoría traduce el riesgo jurídico a decisiones de gobierno, control documental y coordinación entre dirección, auditoría y cumplimiento.',
    faqs: [
      { question: '¿Un programa de cumplimiento elimina el riesgo penal?', answer: 'No por sí solo. Debe ser pertinente, aplicarse realmente y dejar evidencia de controles, alertas y decisiones.' },
      { question: '¿Quién debe participar en la revisión?', answer: 'Depende del proceso, pero suele requerir dirección jurídica, cumplimiento, auditoría y responsables operativos.' },
      { question: '¿La revisión reemplaza una defensa penal?', answer: 'No. Previene y organiza la respuesta corporativa; si existe investigación, se coordina con la defensa penal especializada correspondiente.' },
    ],
    related: ['capacitaciones-penal-pj', 'administrativo', 'laboral'],
  },
  'capacitaciones-penal-pj': {
    question: '¿Qué decisiones deben cambiar después de la capacitación?',
    answer: 'Una sesión útil parte de riesgos reales, roles concretos y ejercicios que permitan aplicar protocolos dentro de la operación.',
    outcome: 'Formación medible, materiales utilizables y evidencia de participación para la organización.',
    preparation: ['Perfil y número de participantes que recibirán la formación.', 'Procesos, riesgos o casos que deben trabajarse durante la sesión.', 'Políticas internas y resultado práctico esperado por la organización.'],
    credential: 'El contenido se diseña desde la práctica jurídica y se adapta al lenguaje de juntas, líderes, equipos jurídicos u operación.',
    faqs: [
      { question: '¿La capacitación puede adaptarse a un sector?', answer: 'Sí. El diagnóstico previo permite ajustar casos, lenguaje, riesgos y ejercicios a la operación de la organización.' },
      { question: '¿Puede realizarse de forma virtual?', answer: 'Sí. El formato, duración y dinámica se definen según el número de participantes y los objetivos de aprendizaje.' },
      { question: '¿Qué evidencia recibe la empresa?', answer: 'El alcance puede incluir materiales, registro de asistencia, evaluación, acta y recomendaciones posteriores.' },
    ],
    related: ['responsabilidad-penal-pj', 'laboral', 'administrativo'],
  },
};

const standardProcess = [
  { title: 'Evaluación inicial', detail: 'Revisamos los hechos, documentos disponibles y decisiones urgentes.' },
  { title: 'Ruta jurídica', detail: 'Definimos objetivos, alternativas y riesgos antes de iniciar.' },
  { title: 'Actuación', detail: 'Ejecutamos la estrategia con soporte documental y comunicación directa.' },
  { title: 'Seguimiento', detail: 'Controlamos términos, avances y próximos pasos durante el encargo.' },
];

export default function EditorialServiceExperience({ detail, backgroundImage }: { detail: ServiceDetail; backgroundImage: string }) {
  const profile = profiles[detail.slug as EditorialSlug];
  const brief = serviceBriefs[detail.slug as EditorialSlug];
  const Icon = profile.icon;
  const consult = buildWhatsAppUrl({ area: detail.title, source: `/servicios/${detail.slug}`, message: `Hola, quisiera solicitar una evaluación sobre ${detail.title}.` });
  const visibleFaqs = detail.faqs ?? brief.faqs;

  return (
    <main className={s.page} data-variant={detail.slug} style={{ '--service-accent': profile.accent, '--service-soft': profile.soft, '--service-deep': profile.deep } as React.CSSProperties}>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LegalService', name: detail.title, description: detail.summary, provider: { '@type': 'LegalService', name: 'Castellanos Abogados' }, areaServed: ['Pereira', 'Dosquebradas', 'Santa Rosa de Cabal', 'Manizales', 'Eje Cafetero', 'Colombia'] }) }} />
      {detail.faqs?.length ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: detail.faqs.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }) }} />
      ) : null}

      <header className={s.hero} style={{ backgroundImage }}>
        <div className={s.heroShade} aria-hidden />
        <div className={s.heroContent}>
          <Link href="/servicios" className={s.kicker}>CASTELLANOS ABOGADOS / {profile.heroLabel}</Link>
          <h1>{detail.headline}</h1>
          <p>{detail.summary}</p>
          {detail.localPresence ? <p>{detail.localPresence}</p> : null}
          <a href={consult} target="_blank" rel="noopener noreferrer" className={s.cta}>Evaluar mi caso <ArrowUpRight size={21} /></a>
        </div>
        <aside className={s.heroIdentity}>
          <Icon size={34} strokeWidth={1.15} aria-hidden />
          <span>{profile.heroLabel}</span>
          <strong>{profile.heroStatement}</strong>
          <div>{profile.keywords.map(word => <i key={word}>{word}</i>)}</div>
        </aside>
        <div className={s.heroFoot}>{detail.heroStats.map((stat, index) => <span key={stat}><i>0{index + 1}</i>{stat}</span>)}</div>
      </header>

      <nav className={s.serviceNav} aria-label="Contenido del servicio">
        <span>{detail.title}</span>
        <a href="#cuando-actuar"><i>01</i> Cuándo actuar</a>
        <a href="#lectura-del-caso"><i>02</i> Lectura del caso</a>
        <a href="#preparar-consulta"><i>03</i> Preparar consulta</a>
        <a href="#alcance"><i>04</i> Alcance</a>
        <a href="#forma-de-trabajo"><i>05</i> Forma de trabajo</a>
      </nav>

      <section id="cuando-actuar" className={s.activation}>
        <div className={s.sectionHeading}>
          <span className={s.kicker}>01 / CUÁNDO ACTUAR</span>
          <h2>{profile.activationTitle}</h2>
          <p>Hay momentos en los que esperar reduce las opciones. Estos son los escenarios que conviene revisar primero.</p>
        </div>
        <div className={s.activationList}>{detail.activation.map((item, index) => <article key={item}><span>0{index + 1}</span><p>{item}</p><ArrowRight size={20} strokeWidth={1.3} /></article>)}</div>
      </section>

      <section id="lectura-del-caso" className={`${s.signature} ${s[profile.layout]}`}>
        <div className={s.signatureHeader}>
          <span className={s.kicker}>02 / LECTURA DEL CASO</span>
          <h2>{profile.signatureTitle}</h2>
          <p>{profile.signatureIntro}</p>
        </div>
        <div className={s.signatureGrid}>
          {profile.cards.map((card, index) => <article key={card.title}><div><span>0{index + 1}</span><small>{card.label}</small></div><h3>{card.title}</h3><p>{card.detail}</p></article>)}
        </div>
        <div className={s.audienceRail}><span>A QUIÉN ACOMPAÑAMOS</span>{detail.audience.map(item => <strong key={item}>{item}</strong>)}</div>
      </section>

      <section id="preparar-consulta" className={s.caseFile}>
        <div className={s.caseDecision}>
          <span className={s.kicker}>03 / PREGUNTA CENTRAL</span>
          <Scale size={38} strokeWidth={1.15} aria-hidden />
          <h2>{brief.question}</h2>
          <p>{brief.answer}</p>
          <strong><span>RESULTADO DE LA PRIMERA REVISIÓN</span>{brief.outcome}</strong>
        </div>
        <div className={s.preparation}>
          <div>
            <span className={s.kicker}>PARA EMPEZAR</span>
            <h2>Prepare su consulta.</h2>
            <p>No necesita tener un expediente perfecto. Estos tres elementos permiten aprovechar mejor la primera conversación.</p>
          </div>
          <ol>{brief.preparation.map((item, index) => <li key={item}><span>0{index + 1}</span><FileText size={22} strokeWidth={1.35} /><p>{item}</p></li>)}</ol>
          <a href={consult} target="_blank" rel="noopener noreferrer" className={s.textLink}>Enviar información inicial <ArrowUpRight size={19} /></a>
        </div>
      </section>

      <section id="alcance" className={s.deliverables}>
        <div>
          <span className={s.kicker}>04 / ALCANCE DEL SERVICIO</span>
          <h2>{profile.deliverablesTitle}</h2>
          <p>{detail.deliverablesIntro}</p>
          <a href={consult} target="_blank" rel="noopener noreferrer" className={s.textLink}>Consultar este servicio <ArrowUpRight size={19} /></a>
        </div>
        <ol>{detail.deliverables.map((item, index) => <li key={item}><span>0{index + 1}</span><Check size={19} strokeWidth={1.5} /><p>{item}</p></li>)}</ol>
      </section>

      <section id="atencion-directa" className={s.professional}>
        <div className={s.professionalIntro}>
          <span className={s.kicker}>ATENCIÓN PROFESIONAL DIRECTA</span>
          <h2>Su caso no entra a una cadena de intermediarios.</h2>
        </div>
        <div className={s.professionalCopy}>
          <p>{brief.credential}</p>
          <div className={s.credentialsList}>
            <span><small>PROFESIONAL</small>Jonatan Castellanos</span>
            <span><small>FORMACIÓN</small>Abogado</span>
            <span><small>ATENCIÓN</small>Pereira y virtual</span>
          </div>
          <Link href="/nosotros" className={s.textLink}>Conocer el perfil profesional <ArrowUpRight size={19} /></Link>
        </div>
      </section>

      <section id="forma-de-trabajo" className={s.process}>
        <span className={s.kicker}>05 / FORMA DE TRABAJO</span>
        <h2>{profile.processTitle}</h2>
        <div>{(detail.process ?? standardProcess).map((step, index) => <article key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.detail}</p></article>)}</div>
      </section>

      <section className={s.faq}>
        <div>
          <span className={s.kicker}>ANTES DE COMENZAR</span>
          <h2>Preguntas que conviene resolver.</h2>
          <p>Una primera orientación debe ayudarle a distinguir posibilidades reales, documentos pendientes y próximos pasos.</p>
        </div>
        <div>{visibleFaqs.map(item => <details key={item.question}><summary>{item.question}<Plus size={20} /></summary><p>{item.answer}</p></details>)}</div>
      </section>

      <section className={s.related}>
        <div><span className={s.kicker}>SERVICIOS RELACIONADOS</span><h2>El asunto puede tocar más de un frente.</h2></div>
        <div>{brief.related.map((slug, index) => <Link key={slug} href={`/servicios/${slug}`}><span>0{index + 1}</span><strong>{serviceDetails[slug].title}</strong><ArrowUpRight size={18} /></Link>)}</div>
      </section>

      <section className={s.close}>
        <span className={s.kicker}>PRIMER PASO</span>
        <h2>{profile.closeTitle}</h2>
        <p>{profile.closeBody}</p>
        <a href={consult} target="_blank" rel="noopener noreferrer" className={s.cta}>Solicitar evaluación <ArrowUpRight size={22} /></a>
      </section>
    </main>
  );
}
