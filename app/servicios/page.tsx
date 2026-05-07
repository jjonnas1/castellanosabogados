// app/servicios/page.tsx
import type { Metadata } from 'next';
import { enrichService, fetchServiceAreas } from "@/lib/serviceAreas";
import { getServiceDetail, serviceDetailList } from "@/lib/serviceDetails";
import ServiciosClient from "@/app/components/ServiciosClient";

export const metadata: Metadata = {
  title: 'Servicios legales | Castellanos Abogados',
  description: 'Penal, ejecución de penas, tutelas, civil, familia, laboral y administrativo. Asesoría jurídica integral en Pereira y el Eje Cafetero.',
  alternates: { canonical: '/servicios' },
};

export default async function ServiciosPage() {
  const { data, error } = await fetchServiceAreas();

  const dynamicServices = (Array.isArray(data) ? data : []).map(enrichService);
  const fallbackServices = serviceDetailList.map((detail) => ({
    slug: detail.slug,
    name: detail.title,
    title: detail.title,
    description: detail.summary,
  }));

  const merged = new Map<string, any>();
  [...fallbackServices, ...dynamicServices].forEach((service) => merged.set(service.slug, service));

  const services = Array.from(merged.values()).map((service) => ({
    ...service,
    detail: getServiceDetail(service.slug),
  }));

  return <ServiciosClient services={services} error={Boolean(error)} />;
}
