import { supabase, supabaseConfigured } from '@/lib/supabaseClient';

export type ServiceArea = {
  slug: string;
  name: string;
  enabled?: boolean;
  sort?: number | null;
};

const serviceCopy: Record<string, { title: string; description: string }> = {
  'penal-personas': {
    title: 'Penal Personas',
    description: 'Defensa y estrategia penal para personas naturales con acompañamiento técnico por etapas.',
  },
  'ejecucion-penas': {
    title: 'Ejecución de Penas',
    description: 'Trámite y seguimiento de beneficios, redenciones y actuaciones ante juez de ejecución.',
  },
  'responsabilidad-penal-pj': {
    title: 'Responsabilidad Penal PJ',
    description: 'Gestión de exposición penal empresarial y controles para decisiones de alto impacto.',
  },
  'capacitaciones-penal-pj': {
    title: 'Capacitaciones Penal PJ',
    description: 'Programas de formación para juntas, compliance y equipos operativos.',
  },
  civil: {
    title: 'Civil',
    description: 'Atención de controversias civiles y patrimoniales con enfoque probatorio y estratégico.',
  },
  familia: {
    title: 'Familia',
    description: 'Procesos de familia con enfoque técnico y humano en protección de derechos.',
  },
  laboral: {
    title: 'Laboral',
    description: 'Prevención y defensa en conflictos laborales para empleadores y trabajadores.',
  },
  administrativo: {
    title: 'Administrativo',
    description: 'Actuación ante entidades públicas y defensa en sede administrativa.',
  },
};

export function enrichService(area: ServiceArea) {
  const copy = serviceCopy[area.slug] ?? { title: area.name, description: 'Servicio disponible bajo consulta.' };
  return { ...area, ...copy };
}

export async function fetchServiceAreas() {
  if (!supabaseConfigured) {
    return { data: [] as ServiceArea[], error: new Error('Supabase env no configurado') };
  }

  const { data, error } = await supabase
    .from('service_areas')
    .select('slug, name, enabled, sort')
    .eq('enabled', true)
    .order('sort', { ascending: true });

  if (error || !data) return { data: [] as ServiceArea[], error };
  return { data, error: null };
}
