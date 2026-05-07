import { notFound } from "next/navigation";
import { getServiceDetail, serviceDetailList } from "@/lib/serviceDetails";
import ServiceDetailClient from "@/app/components/ServiceDetailClient";

const backgrounds: Record<string, string> = {
  'penal-personas': "linear-gradient(140deg, rgba(12,17,29,0.9), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=75&fm=webp')",
  'ejecucion-penas': "linear-gradient(140deg, rgba(12,17,29,0.9), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=75&fm=webp')",
  'responsabilidad-penal-pj': "linear-gradient(140deg, rgba(12,17,29,0.9), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=75&fm=webp')",
  'capacitaciones-penal-pj': "linear-gradient(140deg, rgba(12,17,29,0.9), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=75&fm=webp')",
  civil: "linear-gradient(140deg, rgba(12,17,29,0.9), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=1200&q=75&fm=webp')",
  familia: "linear-gradient(140deg, rgba(12,17,29,0.9), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=75&fm=webp')",
  laboral: "linear-gradient(140deg, rgba(12,17,29,0.9), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=75&fm=webp')",
  administrativo: "linear-gradient(140deg, rgba(12,17,29,0.9), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&w=1200&q=75&fm=webp')",
};

export async function generateStaticParams() {
  return serviceDetailList.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);

  if (!detail) {
    notFound();
  }

  const backgroundImage = backgrounds[detail.slug] ?? backgrounds["penal-personas"];

  return <ServiceDetailClient detail={detail} backgroundImage={backgroundImage} />;
}
