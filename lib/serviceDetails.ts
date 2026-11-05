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
  localPresence?: string;
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
    localPresence:
      'Atendemos asuntos de ejecución de penas en Pereira, Dosquebradas, Santa Rosa de Cabal y Manizales, con revisión virtual de documentos y reuniones cuando el caso lo permite.',
    // Contenido general sujeto a la revisión jurídica final del propietario.
    faqs: [
      {
        question: '¿Cuándo conviene revisar un caso de ejecución de penas?',
        answer: 'Cuando existen dudas sobre cómputos, redenciones, requisitos de un beneficio, documentos pendientes o el estado de una solicitud ante el juzgado. La revisión individual permite establecer qué actuación corresponde.',
      },
      {
        question: '¿Qué documentos ayudan a realizar la revisión inicial?',
        answer: 'La sentencia, el cómputo de pena, las decisiones del juzgado, los certificados disponibles del INPEC y los soportes de redención o arraigo. Los documentos exactos dependen del beneficio o trámite que se quiera estudiar.',
      },
      {
        question: '¿La revisión puede hacerse de forma virtual?',
        answer: 'Sí. La lectura inicial de documentos y la reunión con la familia pueden realizarse virtualmente. Las actuaciones posteriores dependen del expediente y del despacho que vigila la pena.',
      },
      {
        question: '¿La asesoría garantiza que concedan el beneficio?',
        answer: 'No. La decisión corresponde a la autoridad judicial y depende de los requisitos, las pruebas y las particularidades del caso. La asesoría busca presentar una solicitud completa y jurídicamente sustentada.',
      },
    ],
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
    localPresence:
      'Atendemos asuntos civiles en Pereira, Dosquebradas, Santa Rosa de Cabal y Manizales, con revisión virtual de contratos, títulos y demás documentos cuando el caso lo permite.',
    // Contenido general sujeto a la revisión jurídica final del propietario.
    faqs: [
      {
        question: '¿Qué se revisa primero en un conflicto civil?',
        answer: 'Los documentos que originaron la obligación o el conflicto, las fechas relevantes, los pagos, las comunicaciones entre las partes y el resultado que se busca. Con esa información se define si conviene negociar, conciliar o acudir a un proceso.',
      },
      {
        question: '¿Cómo se sabe si una deuda o un título valor prescribió?',
        answer: 'Es necesario revisar el tipo de documento, su fecha de exigibilidad y las actuaciones que pudieron afectar el cómputo. No es recomendable concluir que existe prescripción sin estudiar el caso concreto.',
      },
      {
        question: '¿Siempre es necesario presentar una demanda?',
        answer: 'No. En algunos asuntos puede ser útil intentar una negociación o conciliación; en otros, la vía judicial puede ser necesaria. La ruta depende de los documentos, el tiempo transcurrido y la posición de las partes.',
      },
      {
        question: '¿Puedo enviar los documentos para una revisión virtual?',
        answer: 'Sí. La evaluación inicial puede realizarse con copias digitales legibles. Si el asunto requiere revisar originales o realizar una actuación presencial, se indicará durante el análisis.',
      },
    ],
  },
  familia: {
    slug: 'familia',
    title: 'Familia',
    headline: 'Protección jurídica en asuntos de familia',
    summary:
      'Acompañamiento en procesos de familia con enfoque humano y técnico: custodia, alimentos, divorcios, PARD y medidas de protección.',
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
    localPresence:
      'Atendemos asuntos de familia en Pereira, Dosquebradas, Santa Rosa de Cabal y Manizales, con orientación virtual y revisión documental cuando la situación lo permite.',
    // Contenido general sujeto a la revisión jurídica final del propietario.
    faqs: [
      {
        question: '¿Qué asuntos de familia pueden revisarse?',
        answer: 'Cuotas de alimentos, custodia, visitas, divorcio, liquidación de sociedad conyugal y medidas de protección, entre otros. Cada situación se analiza según las personas involucradas y las decisiones o acuerdos que ya existan.',
      },
      {
        question: '¿Asumen representación en un PARD ante el ICBF o una comisaría?',
        answer: 'Sí. Estudiamos el expediente, la competencia de la autoridad, las pruebas y las medidas adoptadas, y ejercemos las solicitudes y los medios de defensa que procedan según la etapa del proceso. El alcance se define en la contratación.',
      },
      {
        question: '¿Se puede intentar un acuerdo antes de demandar?',
        answer: 'En muchos asuntos de familia existe la posibilidad de buscar un acuerdo o acudir a conciliación. La viabilidad y los efectos de esa ruta deben revisarse según el asunto y la protección que requieran los menores u otras personas involucradas.',
      },
      {
        question: '¿La orientación puede hacerse virtualmente?',
        answer: 'Sí. La consulta y la revisión inicial de documentos pueden hacerse de manera virtual. Si el trámite exige una comparecencia o actuación presencial, se explica desde el inicio.',
      },
    ],
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
    localPresence:
      'Atendemos consultas laborales en Pereira, Dosquebradas, Santa Rosa de Cabal y Manizales, con revisión virtual de contratos, liquidaciones y soportes cuando el caso lo permite.',
    // Contenido general sujeto a la revisión jurídica final del propietario.
    faqs: [
      {
        question: '¿Atienden a trabajadores y a empleadores?',
        answer: 'Sí. La revisión puede abordar reclamaciones de trabajadores o prevención y defensa para empleadores, siempre después de verificar la situación y los posibles conflictos de interés.',
      },
      {
        question: '¿Qué documentos sirven para una revisión laboral?',
        answer: 'Contrato, desprendibles de nómina, comprobantes de pago, liquidación, comunicaciones, reglamentos, llamados de atención y soportes de seguridad social, según el problema consultado.',
      },
      {
        question: '¿Por qué conviene revisar pronto un conflicto laboral?',
        answer: 'Porque los hechos, documentos y fechas pueden ser determinantes para una reclamación o defensa. Una revisión temprana ayuda a conservar soportes y a identificar la vía adecuada sin asumir que todos los casos tienen el mismo término.',
      },
      {
        question: '¿La consulta laboral puede hacerse de forma virtual?',
        answer: 'Sí. La consulta y la revisión inicial pueden realizarse virtualmente. Si se requiere una audiencia, inspección u otra actuación presencial, se define de acuerdo con el caso.',
      },
    ],
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
