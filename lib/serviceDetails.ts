export type ServiceDetail = {
  slug:
    | "traduccion-legal"
    | "penal-personas"
    | "ejecucion-penas"
    | "responsabilidad-penal-pj"
    | "capacitaciones-penal-pj"
    | "civil"
    | "familia"
    | "laboral"
    | "administrativo";
  title: string;
  headline: string;
  summary: string;
  chips: [string, string];
  heroStats: [string, string, string];
  activation: string[];
  audience: string[];
  deliverables: string[];
  deliverablesIntro: string;
  process?: Array<{ title: string; detail: string }>;
  packages?: Array<{ name: string; label: string; detail: string }>;
  trustPoints?: string[];
  faqs?: Array<{ question: string; answer: string }>;
};

export const serviceDetails: Record<ServiceDetail['slug'], ServiceDetail> = {
  'traduccion-legal': {
    slug: 'traduccion-legal',
    title: 'Traducción Legal',
    headline: 'Traducción jurídica',
    summary:
      'Traducimos contratos, poderes, sentencias, expedientes y documentos corporativos entre español, inglés, francés e italiano, preservando su sentido jurídico.',
    chips: ['TRADUCCIÓN JURÍDICA', 'ATENCIÓN REMOTA'],
    heroStats: [
      'Revisión jurídica y terminológica en cada entrega.',
      'Confidencialidad para documentos sensibles.',
      'Cotización por alcance, idioma y fecha requerida.',
    ],
    activation: [
      'Contratos, poderes, certificados o sentencias que deben presentarse en otro idioma.',
      'Expedientes y piezas procesales que requieren precisión terminológica.',
      'Documentación empresarial, migratoria, patrimonial o académica con contenido legal.',
    ],
    audience: [
      'Personas con trámites en Colombia o en el exterior.',
      'Empresas y equipos administrativos con documentación bilingüe.',
      'Abogados, notarías y oficinas que requieren apoyo lingüístico especializado.',
    ],
    deliverables: [
      'Traducción revisada en formato editable o PDF, según el archivo fuente.',
      'Glosario breve de términos sensibles cuando el documento lo requiere.',
      'Observaciones sobre ambigüedades o expresiones que necesitan confirmación.',
    ],
    deliverablesIntro:
      'Cada documento se revisa desde su función jurídica y el propósito para el cual será presentado, no como una traducción genérica.',
    packages: [
      { name: 'Documento breve', label: 'Cotización rápida', detail: 'Certificados, autorizaciones, comunicaciones y poderes simples.' },
      { name: 'Contrato o expediente', label: 'Según complejidad', detail: 'Contratos, demandas, sentencias, anexos y documentación empresarial.' },
      { name: 'Entrega prioritaria', label: '24–48 horas', detail: 'Atención urgente sujeta a extensión, idioma y disponibilidad.' },
    ],
    process: [
      { title: 'Envío del documento', detail: 'Comparte el archivo, idiomas, finalidad y fecha límite.' },
      { title: 'Alcance y cotización', detail: 'Revisamos extensión, formato, complejidad y urgencia.' },
      { title: 'Traducción jurídica', detail: 'Trabajamos terminología, contexto y consistencia legal.' },
      { title: 'Entrega y ajustes', detail: 'Entregamos la versión final y atendemos ajustes razonables.' },
    ],
    trustPoints: [
      'Atención directa por abogado y licenciado en Lenguas Modernas.',
      'Confidencialidad profesional en documentos sensibles.',
      'Servicio remoto para Colombia y clientes en el exterior.',
    ],
    faqs: [
      { question: '¿La traducción legal es lo mismo que una traducción oficial?', answer: 'No necesariamente. La traducción legal se enfoca en precisión jurídica y terminología especializada. Si la entidad receptora exige traducción oficial, lo aclaramos antes de comenzar.' },
      { question: '¿Cómo se calcula el precio?', answer: 'Depende del idioma, la extensión, la complejidad jurídica, el formato del archivo y el plazo requerido. Primero revisamos el documento o una muestra.' },
      { question: '¿Puedo contratar el servicio desde otra ciudad o país?', answer: 'Sí. La revisión, cotización, traducción y entrega pueden realizarse completamente en línea.' },
    ],
  },
  'penal-personas': {
    slug: 'penal-personas',
    title: 'Penal Personas',
    headline: 'Defensa y estrategia penal para personas naturales',
    summary:
      'Acompañamiento técnico en decisiones críticas, indagaciones preliminares y actuaciones con enfoque de control, evidencia y trazabilidad.',
    chips: ['DERECHO PENAL', 'PERSONAS NATURALES'],
    heroStats: [
      'Defensa penal desde etapas preliminares.',
      'Acompañamiento ante Fiscalía, Policía Judicial y juzgados.',
      'Estrategia probatoria y control de riesgos procesales.',
    ],
    activation: [
      'Citaciones de fiscalía, policía judicial o juzgado penal.',
      'Riesgo de imputación, medida de aseguramiento o apertura de investigación.',
      'Necesidad de estrategia preventiva y manejo documental temprano.',
    ],
    audience: ['Personas naturales', 'Familias del investigado', 'Apoderados y co-defensas técnicas'],
    deliverables: [
      'Diagnóstico jurídico penal del caso y ruta de actuación.',
      'Estrategia de defensa por etapas procesales.',
      'Bitácora de actuaciones y documentos clave.',
    ],
    deliverablesIntro:
      'Trabajamos desde las etapas más tempranas del proceso, con estrategia documentada y acompañamiento directo en cada audiencia ante Fiscalía y juzgados penales.',
  },
  'ejecucion-penas': {
    slug: 'ejecucion-penas',
    title: 'Ejecución de Penas',
    headline: 'Gestión técnica de beneficios y trámites ante jueces de ejecución',
    summary:
      'Seguimiento estratégico de requisitos, términos, redenciones, subrogados y beneficios para proteger derechos y acelerar decisiones.',
    chips: ['EJECUCIÓN DE PENAS', 'BENEFICIOS Y SUBROGADOS'],
    heroStats: [
      'Libertad condicional, domiciliaria y beneficios administrativos.',
      'Revisión de cómputos, redenciones y términos.',
      'Seguimiento ante juzgados de ejecución de penas.',
    ],
    activation: [
      'Solicitud de libertad condicional, prisión domiciliaria o permisos administrativos.',
      'Revisión de cómputos, redenciones o incidentes por incumplimiento.',
      'Necesidad de control de radicados, marce, patio y estado penitenciario.',
    ],
    audience: ['Condenados y sus familias', 'Apoderados judiciales', 'Equipos de apoyo penitenciario'],
    deliverables: [
      'Calendario de hitos y términos en ejecución de pena.',
      'Escritos técnicos para beneficios y subrogados.',
      'Control documental de actuaciones, radicados y respuestas.',
    ],
    deliverablesIntro:
      'Gestionamos los trámites ante juzgados de ejecución con control riguroso de términos, documentación completa y comunicación permanente con la familia del condenado.',
  },
  'responsabilidad-penal-pj': {
    slug: 'responsabilidad-penal-pj',
    title: 'Responsabilidad Penal PJ',
    headline: 'Prevención y defensa penal para personas jurídicas',
    summary:
      'Diseño de ruta de mitigación penal empresarial frente a investigaciones, decisiones de junta y actuaciones de órganos de control.',
    chips: ['PENAL EMPRESARIAL', 'PERSONAS JURÍDICAS'],
    heroStats: [
      'Prevención y defensa penal corporativa.',
      'Protocolos de decisión y trazabilidad documental.',
      'Acompañamiento a juntas, representantes legales y comités.',
    ],
    activation: [
      'Riesgos de responsabilidad penal derivados de contratación o gobierno corporativo.',
      'Alertas por cumplimiento, auditorías o hallazgos de control interno.',
      'Necesidad de protocolos de decisión y trazabilidad corporativa.',
    ],
    audience: ['Representantes legales', 'Juntas directivas', 'Direcciones jurídicas y de cumplimiento'],
    deliverables: [
      'Mapa de exposición penal por proceso crítico.',
      'Protocolo de decisiones sensibles y trazabilidad.',
      'Plan de coordinación con auditoría y compliance.',
    ],
    deliverablesIntro:
      'Trabajamos con documentación especializada, protocolos activables y coordinación con los responsables clave. No asumimos litigio penal, pero articulamos aliados especializados cuando es necesario.',
  },
  'capacitaciones-penal-pj': {
    slug: 'capacitaciones-penal-pj',
    title: 'Capacitaciones Penal PJ',
    headline: 'Formación ejecutiva en riesgo penal corporativo',
    summary:
      'Capacitaciones especializadas para juntas y equipos operativos sobre prevención penal, documentación y respuesta temprana.',
    chips: ['CAPACITACIONES', 'RIESGO PENAL CORPORATIVO'],
    heroStats: [
      'Formación para juntas, directivos y equipos críticos.',
      'Prevención penal, documentación y respuesta temprana.',
      'Entrenamiento práctico con enfoque jurídico y operativo.',
    ],
    activation: [
      'Programas de formación para alta dirección y áreas críticas.',
      'Actualización normativa y buenas prácticas probatorias.',
      'Entrenamientos para comités y equipos de contratación.',
    ],
    audience: ['Juntas directivas', 'Compliance y control interno', 'Equipos jurídicos y operativos'],
    deliverables: [
      'Malla de capacitación por perfil y riesgo.',
      'Material técnico y guías operativas.',
      'Actas y evidencias de formación para trazabilidad.',
    ],
    deliverablesIntro:
      'Diseñamos la malla formativa, desarrollamos el material técnico y facilitamos las sesiones con metodología práctica orientada a decisiones reales.',
  },
  civil: {
    slug: 'civil',
    title: 'Civil',
    headline: 'Asesoría y litigio civil con enfoque estratégico',
    summary:
      'Atención estratégica de conflictos patrimoniales y obligaciones civiles con estrategia procesal, negociación y soporte documental sólido.',
    chips: ['DERECHO CIVIL', 'CONFLICTOS PATRIMONIALES'],
    heroStats: [
      'Contratos, obligaciones y conflictos patrimoniales.',
      'Conciliación y estrategia probatoria.',
      'Acompañamiento en reclamaciones civiles.',
    ],
    activation: [
      'Incumplimientos contractuales, cobros o controversias patrimoniales.',
      'Disputas por responsabilidad civil y daños.',
      'Necesidad de conciliación o demanda con estructura probatoria.',
    ],
    audience: ['Personas naturales', 'Empresas', 'Patrimonios familiares'],
    deliverables: [
      'Concepto de viabilidad y ruta procesal civil.',
      'Estrategia de negociación o litigio.',
      'Control de términos y actuaciones clave.',
    ],
    deliverablesIntro:
      'Definimos la ruta más efectiva para cada caso: conciliación, demanda o combinación. Acompañamos el proceso desde el diagnóstico hasta la ejecución del fallo.',
  },
  familia: {
    slug: 'familia',
    title: 'Familia',
    headline: 'Protección jurídica en asuntos de familia',
    summary:
      'Acompañamiento en procesos de familia con enfoque humano y técnico: custodia, alimentos, divorcios y medidas de protección.',
    chips: ['DERECHO DE FAMILIA', 'PROTECCIÓN FAMILIAR'],
    heroStats: [
      'Custodia, alimentos, visitas y patria potestad.',
      'Divorcio, sociedad conyugal y acuerdos familiares.',
      'Medidas urgentes de protección cuando sea necesario.',
    ],
    activation: [
      'Conflictos de custodia, visitas o patria potestad.',
      'Procesos de alimentos, divorcio y sociedad conyugal.',
      'Necesidad de medidas urgentes de protección.',
    ],
    audience: ['Madres y padres', 'Núcleos familiares', 'Representantes de menores'],
    deliverables: [
      'Plan de acción judicial y extrajudicial.',
      'Documentación y escritos de familia.',
      'Seguimiento de audiencias y compromisos.',
    ],
    deliverablesIntro:
      'Acompañamos cada etapa del proceso con rigor técnico y sensibilidad, priorizando siempre el bienestar de los hijos y la estabilidad del núcleo familiar.',
  },
  laboral: {
    slug: 'laboral',
    title: 'Laboral',
    headline: 'Defensa en conflictos laborales y seguridad jurídica',
    summary:
      'Asesoría preventiva y litigiosa para empleadores y trabajadores en relaciones laborales, terminaciones y reclamaciones.',
    chips: ['DERECHO LABORAL', 'CONFLICTOS LABORALES'],
    heroStats: [
      'Despidos, salarios, prestaciones y reclamaciones laborales.',
      'Asesoría para trabajadores y empleadores.',
      'Conciliaciones, procesos disciplinarios y demandas laborales.',
    ],
    activation: [
      'Despidos, reclamaciones salariales o controversias prestacionales.',
      'Procesos disciplinarios o investigaciones internas.',
      'Demandas laborales y conciliaciones ante autoridad competente.',
    ],
    audience: ['Empresas', 'Trabajadores', 'Áreas de talento humano'],
    deliverables: [
      'Diagnóstico de riesgo laboral y contingencias.',
      'Estrategia de defensa y conciliación.',
      'Protocolos y documentación laboral soporte.',
    ],
    deliverablesIntro:
      'Asesoramos a empleadores y trabajadores en todo el ciclo laboral: desde la prevención hasta la representación en demandas, conciliaciones y procesos disciplinarios.',
  },
  administrativo: {
    slug: 'administrativo',
    title: 'Administrativo',
    headline: 'Actuación estratégica ante autoridades administrativas',
    summary:
      'Representación y defensa en procedimientos administrativos y contenciosos, con foco en legalidad, prueba y términos.',
    chips: ['DERECHO ADMINISTRATIVO', 'ACTUACIONES ANTE EL ESTADO'],
    heroStats: [
      'Recursos contra actos administrativos.',
      'Defensa ante entidades públicas y autoridades administrativas.',
      'Demandas ante la jurisdicción contencioso administrativa.',
    ],
    activation: [
      'Actos administrativos sancionatorios o restrictivos.',
      'Requerimientos de entidades públicas y recursos administrativos.',
      'Necesidad de demanda ante jurisdicción contenciosa.',
    ],
    audience: ['Particulares', 'Contratistas', 'Empresas reguladas'],
    deliverables: [
      'Ruta de recursos y actuaciones administrativas.',
      'Escritos de defensa y control de términos.',
      'Estrategia contenciosa en caso de judicialización.',
    ],
    deliverablesIntro:
      'Representamos al cliente ante entidades públicas y tribunales contencioso administrativos con control estricto de términos, estrategia probatoria y escritos técnicos.',
  },
};

export function getServiceDetail(slug: string) {
  return serviceDetails[slug as ServiceDetail['slug']];
}

const SERVICE_PRIORITY: ServiceDetail['slug'][] = [
  'traduccion-legal',
  'ejecucion-penas',
  'penal-personas',
  'familia',
  'civil',
  'laboral',
  'administrativo',
  'responsabilidad-penal-pj',
  'capacitaciones-penal-pj',
];

export const serviceDetailList = SERVICE_PRIORITY.map((slug) => serviceDetails[slug]);
