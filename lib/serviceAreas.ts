import { supabase, supabaseConfigured } from "@/lib/supabaseClient";
import { type SupportedLocale } from "./i18n/config";

export type ServiceArea = {
  slug: string;
  name: string;
  enabled?: boolean;
  sort?: number | null;
};

const serviceCopy: Record<
  SupportedLocale,
  Record<string, { title: string; description: string }>
> = {
  es: {
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
  },
  en: {
    "drp-ce": {
      title: "DRP-CE",
      description: "Initial assessment of criminal risk in public procurement for immediate decisions.",
    },
    "aec-ce": {
      title: "AEC-CE",
      description: "Ongoing strategic support for governing bodies in sensitive decisions.",
    },
    "icp-ce": {
      title: "ICP-CE",
      description: "Action and control route for critical incidents and potential crises.",
    },
  },
};

export function enrichService(area: ServiceArea, locale: SupportedLocale) {
  const copy =
    serviceCopy[locale]?.[area.slug] ?? {
      title: area.name,
      description: locale === "en" ? "Service available on request." : "Servicio disponible bajo consulta.",
    };
  return { ...area, ...copy };
}

export async function fetchServiceAreas() {
  try {
    if (!supabaseConfigured) {
      return { data: [] as ServiceArea[], error: null };
    }

    const { data, error } = await supabase
      .from("service_areas")
      .select("slug, name, enabled, sort")
      .eq("enabled", true)
      .order("sort", { ascending: true });

    if (error || !data) return { data: [] as ServiceArea[], error: error ?? null };
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching service areas", error);
    return { data: [] as ServiceArea[], error: error as Error };
  }
}
