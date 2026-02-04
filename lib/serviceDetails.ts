export type ServiceDetail = {
  slug: "penal-personas" | "ejecucion-penas" | "responsabilidad-penal-pj" | "capacitaciones-penal-pj";
  title: string;
  headline: string;
  summary: string;
  activation: string[];
  audience: string[];
  deliverables: string[];
};

export const serviceDetails: Record<ServiceDetail["slug"], ServiceDetail> = {
  "penal-personas": {
    slug: "penal-personas",
    title: "Penal Personas",
    headline: "Asesoría penal estratégica para personas naturales",
    summary:
      "Evaluamos el contexto, delimitamos el alcance y definimos una ruta documental clara para decisiones personales sensibles.",
    activation: [
      "Consultas personales que requieren criterio penal preventivo.",
      "Necesidad de preparar documentación y mensajes antes de acciones formales.",
      "Orientación estratégica previa a decisiones de alto impacto personal.",
    ],
    audience: ["Personas naturales", "Familias que requieren orientación penal", "Equipos de apoyo personal"],
    deliverables: [
      "Diagnóstico inicial con escenarios y riesgos.",
      "Ruta de actuación con mensajes clave y soportes.",
      "Documentación especializada para coordinación con aliados.",
    ],
  },
  "ejecucion-penas": {
    slug: "ejecucion-penas",
    title: "Ejecución de Penas",
    headline: "Seguimiento técnico en ejecución de penas",
    summary:
      "Acompañamiento estratégico para revisar beneficios, tiempos y actuaciones necesarias en la fase de ejecución de penas.",
    activation: [
      "Revisión de oportunidades y decisiones en ejecución de penas.",
      "Necesidad de claridad documental y cronograma de actuaciones.",
      "Coordinación con aliados litigiosos cuando se requiera actuación judicial.",
    ],
    audience: ["Personas y familias con decisiones en ejecución de penas", "Equipos de soporte y acompañamiento"],
    deliverables: [
      "Mapa de decisiones y cronograma de actuaciones.",
      "Documentos de soporte y lineamientos técnicos.",
      "Coordinación con aliados especializados cuando aplica.",
    ],
  },
  "responsabilidad-penal-pj": {
    slug: "responsabilidad-penal-pj",
    title: "Responsabilidad Penal para Personas Jurídicas",
    headline: "Prevención penal corporativa para organizaciones",
    summary:
      "Estrategia integral para órganos directivos que buscan control preventivo, trazabilidad y decisiones sostenibles.",
    activation: [
      "Decisiones corporativas sensibles con exposición penal.",
      "Requerimientos de órganos de control o auditoría interna.",
      "Necesidad de fortalecer documentación y gobernanza.",
    ],
    audience: ["Juntas directivas", "Comités de cumplimiento y auditoría", "Direcciones jurídicas"],
    deliverables: [
      "Mapa de riesgos y protocolos de prevención.",
      "Sesiones de análisis con responsables clave.",
      "Reportes especializados y documentación trazable.",
    ],
  },
  "capacitaciones-penal-pj": {
    slug: "capacitaciones-penal-pj",
    title: "Capacitaciones en Penal para Personas Jurídicas",
    headline: "Formación estratégica para equipos corporativos",
    summary:
      "Entrenamiento técnico para equipos internos sobre prevención penal, trazabilidad y protocolos de actuación.",
    activation: [
      "Capacitación a juntas, comités o equipos operativos.",
      "Necesidad de alinear criterios penales en decisiones corporativas.",
      "Planes de actualización para órganos de control interno.",
    ],
    audience: ["Juntas directivas y comités", "Equipos de cumplimiento", "Áreas jurídicas y de riesgos"],
    deliverables: [
      "Sesiones formativas con casos y escenarios reales.",
      "Materiales de soporte y guías de actuación.",
      "Protocolos base para decisiones sensibles.",
    ],
  },
};

export function getServiceDetail(slug: string) {
  return serviceDetails[slug as ServiceDetail["slug"]];
}

export const serviceDetailList = Object.values(serviceDetails);
