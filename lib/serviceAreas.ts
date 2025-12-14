import { supabase, supabaseConfigured } from "@/lib/supabaseClient";

export type ServiceArea = {
  slug: string;
  name: string;
  enabled?: boolean;
  sort?: number | null;
};

const serviceCopy: Record<string, { title: string; description: string }> = {
  "drp-ce": {
    title: "DRP-CE",
    description: "Diagnóstico inicial del riesgo penal en contratación estatal para decisiones inmediatas.",
  },
  "aec-ce": {
    title: "AEC-CE",
    description: "Acompañamiento estratégico continuo para órganos directivos en decisiones sensibles.",
  },
  "icp-ce": {
    title: "ICP-CE",
    description: "Ruta de acción y control frente a incidentes críticos y potenciales crisis reputacionales.",
  },
};

export function enrichService(area: ServiceArea) {
  const copy = serviceCopy[area.slug] ?? { title: area.name, description: "Servicio disponible bajo consulta." };
  return { ...area, ...copy };
}

export async function fetchServiceAreas() {
  if (!supabaseConfigured) {
    return { data: [] as ServiceArea[], error: new Error("Supabase env no configurado") };
  }

  const { data, error } = await supabase
    .from("service_areas")
    .select("slug, name, enabled, sort")
    .eq("enabled", true)
    .order("sort", { ascending: true });

  if (error || !data) return { data: [] as ServiceArea[], error };
  return { data, error: null };
}
