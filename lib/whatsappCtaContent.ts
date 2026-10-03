export type WhatsAppCtaContent = {
  area: string;
  eyebrow: string;
  headline: string;
  description: string;
  message: string;
  closingHeadline?: string;
  closingDescription?: string;
  coverage?: string;
};

export const articleWhatsAppCtas: Record<string, WhatsAppCtaContent> = {
  'quedarse-mas-tiempo-colombia': {
    area: 'Derecho migratorio en Colombia', eyebrow: 'Orientación migratoria nacional',
    headline: '¿Su permiso está por vencer o cambió su situación?',
    description: 'Cuéntenos su nacionalidad, dónde se encuentra y qué quiere hacer en Colombia. Revisamos si conviene una prórroga, una visa u otra ruta.',
    message: 'Hola, leí el artículo sobre quedarse más tiempo en Colombia y quisiera revisar mi situación migratoria.',
    closingHeadline: 'Una ruta migratoria empieza por revisar su caso real',
    closingDescription: 'Atendemos consultas virtuales en todo Colombia y desde el exterior.',
    coverage: 'Atención virtual en todo Colombia y desde el exterior',
  },
  'circular-externa-007-2026-alivios-financieros': {
    area: 'Alivios financieros', eyebrow: 'Orientación en asuntos financieros',
    headline: '¿Su banco respondió a la solicitud de alivio?',
    description: 'Revisamos su situación, la respuesta de la entidad y los soportes para definir el siguiente paso.',
    message: 'Hola, leí el artículo sobre la Circular 007 y quisiera revisar mi solicitud de alivio financiero.',
  },
  'cuando-interponer-una-tutela': {
    area: 'Acción de tutela', eyebrow: 'Orientación en tutelas',
    headline: '¿Le negaron un servicio o una respuesta esencial?',
    description: 'Cuéntenos qué ocurrió y qué documentos tiene. Revisamos si la tutela puede ser la vía adecuada.',
    message: 'Hola, leí el artículo sobre la acción de tutela y quisiera revisar mi caso.',
  },
  'derechos-del-imputado-proceso-penal': {
    area: 'Defensa penal', eyebrow: 'Orientación en derecho penal',
    headline: '¿Lo citaron o investigan en un proceso penal?',
    description: 'Revisamos la etapa del proceso y los documentos disponibles para definir cómo proteger sus derechos.',
    message: 'Hola, leí el artículo sobre los derechos del imputado y necesito orientación penal.',
  },
  'responsabilidad-penal-empresarial': {
    area: 'Riesgo penal empresarial', eyebrow: 'Orientación para empresas',
    headline: '¿Su empresa enfrenta una alerta penal?',
    description: 'Conozcamos el hecho, los controles existentes y las actuaciones recibidas antes de definir una ruta.',
    message: 'Hola, leí el artículo sobre riesgo penal empresarial y quisiera revisar la situación de mi empresa.',
  },
  'beneficios-ejecucion-penas': {
    area: 'Beneficios en ejecución de penas', eyebrow: 'Orientación en ejecución de penas',
    headline: '¿Qué beneficio podría solicitar su familiar?',
    description: 'Revisamos el cómputo de pena, las redenciones y el estado del expediente para evaluar las opciones.',
    message: 'Hola, leí el artículo sobre beneficios en ejecución de penas y quisiera revisar un caso.',
  },
  'abogado-penalista-pereira': {
    area: 'Defensa penal en Pereira', eyebrow: 'Orientación en derecho penal',
    headline: '¿Necesita un abogado penalista en Pereira?',
    description: 'Cuéntenos en qué etapa está el caso y qué citación o decisión ha recibido. Le orientamos sobre la ruta.',
    message: 'Hola, leí el artículo sobre abogados penalistas en Pereira y quisiera consultar mi caso.',
  },
  'que-hacer-si-te-detienen-colombia': {
    area: 'Detención y defensa penal', eyebrow: 'Orientación en derecho penal',
    headline: '¿Detuvieron a un familiar y no sabe qué sigue?',
    description: 'Indíquenos dónde ocurrió y qué información oficial tiene. Revisamos los pasos de defensa que correspondan.',
    message: 'Hola, leí la guía sobre detención y necesito orientación por un caso penal.',
  },
  'detencion-domiciliaria-colombia': {
    area: 'Detención o prisión domiciliaria', eyebrow: 'Orientación penal y penitenciaria',
    headline: '¿Puede solicitarse la domiciliaria en este caso?',
    description: 'La etapa procesal y la decisión vigente importan. Revisamos el expediente antes de indicar la ruta.',
    message: 'Hola, leí el artículo sobre detención domiciliaria y quisiera revisar un caso.',
  },
  'divorcio-colombia': {
    area: 'Divorcio', eyebrow: 'Orientación en derecho de familia',
    headline: '¿Quiere iniciar un divorcio y no sabe por dónde?',
    description: 'Cuéntenos si existe acuerdo y si hay hijos o bienes. Le ayudamos a identificar los documentos y pasos.',
    message: 'Hola, leí el artículo sobre divorcio y quisiera consultar mi situación.',
  },
  'acoso-laboral-colombia': {
    area: 'Acoso laboral', eyebrow: 'Orientación en derecho laboral',
    headline: '¿Está viviendo una situación de acoso laboral?',
    description: 'Revisamos los hechos, comunicaciones y pruebas disponibles para definir cómo documentar y actuar.',
    message: 'Hola, leí el artículo sobre acoso laboral y quisiera revisar mi situación.',
  },
  'medida-de-aseguramiento-colombia': {
    area: 'Medida de aseguramiento', eyebrow: 'Orientación en defensa penal',
    headline: '¿Le impusieron una medida de aseguramiento?',
    description: 'Revisamos la decisión, sus fundamentos y la etapa procesal para identificar las opciones aplicables.',
    message: 'Hola, leí el artículo sobre medidas de aseguramiento y necesito revisar una decisión.',
  },
  'ley-2466-2025-redenciones-pena': {
    area: 'Redenciones de pena', eyebrow: 'Orientación en ejecución de penas',
    headline: '¿Las redenciones están bien calculadas?',
    description: 'Revisamos certificados, cómputos y decisiones del juzgado para identificar diferencias o soportes faltantes.',
    message: 'Hola, leí el artículo sobre redenciones de pena y quisiera revisar un cómputo.',
  },
  'libertad-condicional-colombia': {
    area: 'Libertad condicional', eyebrow: 'Orientación en ejecución de penas',
    headline: '¿Su familiar puede pedir libertad condicional?',
    description: 'Cuéntenos el estado del caso. Revisamos el cómputo, las redenciones y los documentos necesarios para evaluar la solicitud.',
    message: 'Hola, leí su artículo sobre libertad condicional y quisiera revisar el caso de mi familiar.',
    closingHeadline: 'El siguiente paso es revisar el caso concreto',
    closingDescription: 'Revisamos el expediente y le explicamos qué requisitos y documentos faltan antes de presentar la petición.',
  },
  'cuota-alimentaria-colombia': {
    area: 'Cuota alimentaria', eyebrow: 'Orientación en derecho de familia',
    headline: '¿Necesita fijar, revisar o cobrar una cuota?',
    description: 'Revisamos si existe acuerdo o decisión previa y qué soportes ayudan a escoger la ruta adecuada.',
    message: 'Hola, leí el artículo sobre cuota alimentaria y quisiera revisar mi caso.',
  },
  'violencia-intrafamiliar-medidas-proteccion': {
    area: 'Medidas de protección familiar', eyebrow: 'Orientación en derecho de familia',
    headline: '¿Necesita orientación sobre medidas de protección?',
    description: 'Cuéntenos qué ha ocurrido y si ya acudió a una autoridad. Si hay peligro inmediato, contacte primero a los servicios de emergencia.',
    message: 'Hola, leí el artículo sobre medidas de protección y necesito orientación jurídica.',
  },
  'prescripcion-titulos-valores-colombia': {
    area: 'Títulos valores', eyebrow: 'Orientación en derecho civil',
    headline: '¿Le están cobrando un pagaré, letra o cheque?',
    description: 'Revisamos el documento, las fechas y las actuaciones previas antes de valorar si existe prescripción.',
    message: 'Hola, leí el artículo sobre prescripción de títulos valores y quisiera revisar un documento.',
  },
  'preacuerdo-penal-colombia': {
    area: 'Preacuerdo penal', eyebrow: 'Orientación en defensa penal',
    headline: '¿Le proponen aceptar un preacuerdo?',
    description: 'Revisamos la propuesta y sus posibles efectos antes de que tome una decisión sobre el proceso.',
    message: 'Hola, leí el artículo sobre preacuerdos penales y quisiera revisar una propuesta.',
  },
  'reforma-laboral-colombia-cambios-vigentes-2026': {
    area: 'Reforma laboral', eyebrow: 'Orientación en derecho laboral',
    headline: '¿Un cambio laboral afecta su contrato?',
    description: 'Revisamos la situación concreta, el contrato y las comunicaciones para identificar qué reglas corresponden.',
    message: 'Hola, leí el artículo sobre la reforma laboral y quisiera revisar mi caso.',
  },
  'nuevo-codigo-procesal-trabajo-colombia-2026': {
    area: 'Proceso laboral', eyebrow: 'Orientación en derecho laboral',
    headline: '¿Tiene una reclamación o proceso laboral?',
    description: 'Cuéntenos en qué etapa está y qué decisiones ha recibido. Revisamos la ruta procesal que corresponda.',
    message: 'Hola, leí el artículo sobre el nuevo Código Procesal del Trabajo y quisiera consultar mi caso.',
  },
  'ley-2477-2025-reforma-procesal-penal': {
    area: 'Reforma procesal penal', eyebrow: 'Orientación en defensa penal',
    headline: '¿Un cambio procesal puede afectar su caso?',
    description: 'Revisamos la etapa del proceso y las decisiones existentes antes de valorar qué reglas son aplicables.',
    message: 'Hola, leí el artículo sobre la reforma procesal penal y quisiera revisar mi caso.',
  },
  'inasistencia-alimentaria-colombia': {
    area: 'Inasistencia alimentaria', eyebrow: 'Orientación en asuntos penales y de familia',
    headline: '¿Enfrenta una denuncia o necesita reclamar alimentos?',
    description: 'Revisamos la cuota, los pagos y los soportes disponibles para distinguir la ruta penal y la de familia.',
    message: 'Hola, leí el artículo sobre inasistencia alimentaria y quisiera revisar mi caso.',
  },
  'decreto-1368-2026-porte-armas': {
    area: 'Permiso de porte de armas', eyebrow: 'Orientación en derecho penal',
    headline: '¿Tiene dudas sobre su permiso o una restricción?',
    description: 'Revisamos el permiso y las decisiones notificadas antes de indicarle qué actuación podría corresponder.',
    message: 'Hola, leí la guía del Decreto 1368 de 2026 y quisiera revisar mi situación jurídica.',
  },
};

const serviceWhatsAppCtas: Record<string, WhatsAppCtaContent> = {
  'traduccion-legal': {
    area: 'Traducción jurídica', eyebrow: 'Traducción legal',
    headline: '¿Necesita traducir un documento jurídico?',
    description: 'Cuéntenos el tipo de documento, los idiomas y el plazo. Revisamos el alcance antes de cotizar.',
    message: 'Hola, visité el servicio de traducción legal y quisiera cotizar un documento.',
  },
  'penal-personas': {
    area: 'Defensa penal', eyebrow: 'Derecho penal',
    headline: '¿Necesita defensa en un proceso penal?',
    description: 'Indíquenos la etapa del caso y las citaciones o decisiones recibidas para orientar los primeros pasos.',
    message: 'Hola, visité la página de defensa penal y quisiera revisar mi caso.',
  },
  'ejecucion-penas': {
    area: 'Ejecución de penas', eyebrow: 'Beneficios y subrogados',
    headline: '¿Necesita revisar cómputos o beneficios?',
    description: 'Revisamos redenciones, documentos y decisiones del juzgado para identificar el trámite que corresponda.',
    message: 'Hola, visité la página de ejecución de penas y quisiera revisar un caso.',
  },
  'responsabilidad-penal-pj': {
    area: 'Riesgo penal empresarial', eyebrow: 'Asesoría a empresas',
    headline: '¿Su organización necesita una ruta penal clara?',
    description: 'Hablemos del riesgo, los controles existentes y la actuación requerida para definir el alcance del apoyo.',
    message: 'Hola, visité la página de responsabilidad penal empresarial y quisiera una asesoría.',
  },
  'capacitaciones-penal-pj': {
    area: 'Capacitación penal empresarial', eyebrow: 'Formación para equipos',
    headline: '¿Quiere formar a su equipo en riesgo penal?',
    description: 'Cuéntenos el perfil del grupo y el objetivo de la formación para proponer un programa útil.',
    message: 'Hola, visité la página de capacitaciones y quisiera conocer una propuesta para mi equipo.',
  },
  civil: {
    area: 'Derecho civil', eyebrow: 'Orientación en derecho civil',
    headline: '¿Tiene un conflicto contractual o patrimonial?',
    description: 'Revisamos el contrato, las comunicaciones y los soportes para identificar las opciones del caso.',
    message: 'Hola, visité la página de derecho civil y quisiera revisar mi situación.',
  },
  familia: {
    area: 'Derecho de familia', eyebrow: 'Orientación en derecho de familia',
    headline: '¿Necesita resolver un asunto de familia?',
    description: 'Cuéntenos si se trata de alimentos, custodia, visitas o divorcio y qué acuerdos existen.',
    message: 'Hola, visité la página de derecho de familia y quisiera revisar mi caso.',
  },
  laboral: {
    area: 'Derecho laboral', eyebrow: 'Orientación en derecho laboral',
    headline: '¿Tiene dudas sobre su relación laboral?',
    description: 'Revisamos contrato, pagos, comunicaciones y fechas para identificar los pasos que correspondan.',
    message: 'Hola, visité la página de derecho laboral y quisiera revisar mi caso.',
  },
  administrativo: {
    area: 'Derecho administrativo', eyebrow: 'Orientación frente a entidades públicas',
    headline: '¿Recibió una decisión de una entidad pública?',
    description: 'Revisamos la notificación, los plazos y los documentos antes de definir la respuesta adecuada.',
    message: 'Hola, visité la página de derecho administrativo y quisiera revisar una decisión.',
  },
};

const pageWhatsAppCtas: Record<string, WhatsAppCtaContent> = {
  '/visas-colombia': {
    area: 'Derecho migratorio', eyebrow: 'Hablemos de su proyecto en Colombia',
    headline: '¿Qué necesita resolver para quedarse?',
    description: 'Cuéntenos su nacionalidad, dónde se encuentra y qué le gustaría hacer en Colombia. Le indicamos cómo iniciar la evaluación de su caso.',
    message: 'Hola, quisiera consultar con un abogado migratorio y agendar una evaluación de mi situación en Colombia.',
    coverage: 'Atención virtual en toda Colombia y desde el exterior',
  },
  '/servicios': {
    area: 'Servicios jurídicos', eyebrow: 'Encuentre la ruta adecuada',
    headline: '¿No sabe qué área corresponde a su caso?',
    description: 'Explíquenos el problema en pocas palabras. Le orientamos hacia el servicio que pueda necesitar.',
    message: 'Hola, revisé sus servicios y quisiera saber qué área corresponde a mi caso.',
  },
  '/blog': {
    area: 'Consulta desde el blog', eyebrow: 'De la lectura al caso concreto',
    headline: '¿Un artículo se parece a su situación?',
    description: 'Escríbanos el tema y qué ha ocurrido. La respuesta jurídica depende de los hechos y documentos.',
    message: 'Hola, visité su blog y quisiera consultar una situación jurídica.',
  },
  '/tutela': {
    area: 'Acción de tutela', eyebrow: 'Protección de derechos',
    headline: '¿Necesita revisar si procede una tutela?',
    description: 'Cuéntenos qué derecho está comprometido, la respuesta recibida y los documentos disponibles.',
    message: 'Hola, visité la página de tutelas y quisiera revisar mi caso.',
  },
  '/abogado-a-domicilio': {
    area: 'Abogado a domicilio', eyebrow: 'Atención donde la necesite',
    headline: '¿Necesita atención jurídica a domicilio?',
    description: 'Indíquenos su ciudad, el asunto y la disponibilidad. Confirmamos si la visita es posible.',
    message: 'Hola, visité la página de abogado a domicilio y quisiera consultar disponibilidad.',
  },
  '/a-quien-servimos': {
    area: 'Asesoría jurídica', eyebrow: 'Atención para personas y empresas',
    headline: '¿Busca orientación para usted o su empresa?',
    description: 'Cuéntenos el contexto y le indicamos cómo iniciar la evaluación del asunto.',
    message: 'Hola, visité la página A quién servimos y quisiera orientación jurídica.',
  },
  '/asesoria-personas': {
    area: 'Asesoría a personas', eyebrow: 'Atención jurídica personal',
    headline: '¿Necesita una ruta clara para su caso?',
    description: 'Comparta los hechos principales y las decisiones o citaciones recibidas para comenzar la revisión.',
    message: 'Hola, visité la página de asesoría a personas y quisiera revisar mi caso.',
  },
  '/penal-empresarial': {
    area: 'Derecho penal empresarial', eyebrow: 'Atención a organizaciones',
    headline: '¿Su empresa necesita evaluar un riesgo penal?',
    description: 'Cuéntenos el contexto y los controles actuales para definir una conversación de diagnóstico.',
    message: 'Hola, visité la página de derecho penal empresarial y quisiera conversar sobre mi empresa.',
  },
  '/como-trabajamos': {
    area: 'Consulta jurídica', eyebrow: 'Conozca el primer paso',
    headline: '¿Quiere saber cómo abordaríamos su caso?',
    description: 'Descríbanos el asunto y los documentos disponibles. Le explicamos cómo comenzaría la revisión.',
    message: 'Hola, conocí su forma de trabajo y quisiera consultar un caso.',
  },
  '/metodologia': {
    area: 'Consulta jurídica', eyebrow: 'Una ruta con criterio',
    headline: '¿Quiere definir el siguiente paso de su caso?',
    description: 'Cuéntenos qué ha sucedido y qué resultado busca. Revisamos cómo organizar la información inicial.',
    message: 'Hola, visité su metodología y quisiera orientación para mi caso.',
  },
  '/herramientas': {
    area: 'Herramientas jurídicas', eyebrow: 'De la herramienta a la decisión',
    headline: '¿El resultado le dejó dudas sobre su caso?',
    description: 'Comparta el tema y los datos que considere relevantes. Una herramienta no sustituye la revisión individual.',
    message: 'Hola, usé una herramienta de su página y quisiera revisar mi caso.',
  },
  '/nosotros': {
    area: 'Consulta jurídica', eyebrow: 'Hable directamente con nosotros',
    headline: '¿Le gustaría que revisemos su situación?',
    description: 'Cuéntenos el área del problema y la ciudad donde se encuentra para iniciar la conversación.',
    message: 'Hola, conocí su firma en la página Nosotros y quisiera hacer una consulta.',
  },
  '/contacto': {
    area: 'Contacto jurídico', eyebrow: 'Contacto directo',
    headline: '¿Prefiere hablar por WhatsApp?',
    description: 'Escríbanos directamente y cuéntenos el motivo de su consulta. Esta página permanecerá abierta.',
    message: 'Hola, visité la página de contacto y quisiera hacer una consulta jurídica.',
  },
  '/trabaja': {
    area: 'Colaboración profesional', eyebrow: 'Colaboración con la firma',
    headline: '¿Quiere consultar una colaboración?',
    description: 'Cuéntenos el tipo de colaboración que propone y su ciudad para dirigir la conversación.',
    message: 'Hola, visité la página Trabaja con nosotros y quisiera consultar una colaboración.',
  },
};

export function getPageWhatsAppCta(pathname: string): WhatsAppCtaContent | null {
  if (pathname.startsWith('/servicios/')) {
    return serviceWhatsAppCtas[pathname.slice('/servicios/'.length)] ?? null;
  }
  return pageWhatsAppCtas[pathname] ?? null;
}
