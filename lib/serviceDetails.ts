export type ServiceDetail = {
  slug: "drp-ce" | "aec-ce" | "icp-ce";
  title: string;
  headline: string;
  summary: string;
  activation: string[];
  audience: string[];
  deliverables: string[];
};

export const serviceDetails: Record<ServiceDetail["slug"], ServiceDetail> = {
  "drp-ce": {
    slug: "drp-ce",
    title: "DRP-CE",
    headline: "Diagnóstico y ruta penal en contratación estatal",
    summary:
      "Entrada prioritaria para juntas y representantes que necesitan delimitar riesgo penal, actores involucrados y reglas inmediatas de actuación.",
    activation: [
      "Decisiones críticas en contratación estatal o convenios interadministrativos.",
      "Alertas de órganos de control o auditorías internas con posibles implicaciones penales.",
      "Cambios de gobierno corporativo que exigen verificación de trazabilidad y soportes.",
    ],
    audience: [
      "Representantes legales y miembros de junta.",
      "Comités de contratación y control interno.",
      "Direcciones jurídicas que requieren documentación ejecutiva inmediata.",
    ],
    deliverables: [
      "Mapa de riesgo penal y dependencias sensibles.",
      "Reglas inmediatas de actuación y protocolos base.",
      "Minutas y soportes listos para auditoría y órganos de control.",
    ],
  },
  "aec-ce": {
    slug: "aec-ce",
    title: "AEC-CE",
    headline: "Acompañamiento estratégico continuo",
    summary:
      "Seguimiento ejecutivo para decisiones periódicas y proyectos de contratación estatal con riesgo penal recurrente.",
    activation: [
      "Hitos contractuales o sesiones de junta que requieren criterio penal permanente.",
      "Implementación de controles y ajustes derivados del DRP-CE.",
      "Coordinación entre cumplimiento, auditoría y órganos de control externos.",
    ],
    audience: [
      "Juntas directivas y comités de contratación.",
      "Direcciones de cumplimiento, auditoría y riesgos.",
      "Áreas jurídicas que necesitan trazabilidad continua.",
    ],
    deliverables: [
      "Reportes ejecutivos y minutas de seguimiento.",
      "Protocolos ajustados y validaciones periódicas.",
      "Sesiones tácticas con responsables clave y aliados externos.",
    ],
  },
  "icp-ce": {
    slug: "icp-ce",
    title: "ICP-CE",
    headline: "Incidentes críticos y activación táctica",
    summary:
      "Respuesta contenida y documentada ante incidentes con exposición penal y reputacional, coordinando a los responsables clave.",
    activation: [
      "Alertas de entes de control, filtraciones o incidentes mediáticos.",
      "Necesidad de contención y documentación inmediata de decisiones y acciones.",
      "Coordinación con aliados técnicos, comunicaciones y cumplimiento en crisis.",
    ],
    audience: [
      "Alta dirección y representantes legales.",
      "Comités de crisis y comunicaciones.",
      "Equipos de cumplimiento y auditoría."],
    deliverables: [
      "Protocolo de incidentes y reglas de comunicación.",
      "Bitácora ejecutiva y soportes para trazabilidad.",
      "Recomendaciones de coordinación con aliados externos y entes de control.",
    ],
  },
};

export function getServiceDetail(slug: string) {
  return serviceDetails[slug as ServiceDetail["slug"]];
}

export const serviceDetailList = Object.values(serviceDetails);
