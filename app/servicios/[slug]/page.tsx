import type { Metadata } from 'next';
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

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  'penal-personas':          'Defensa penal para personas naturales en Pereira y el Eje Cafetero. Acompañamiento desde la indagación preliminar hasta el juicio oral y la ejecución de penas.',
  'ejecucion-penas':         'Gestión de libertad condicional, prisión domiciliaria, permisos y beneficios administrativos ante jueces de ejecución de penas en el Eje Cafetero.',
  'responsabilidad-penal-pj':'Prevención y defensa frente a la responsabilidad penal de personas jurídicas en Colombia. Ley 2195 de 2022, compliance y defensa corporativa.',
  'capacitaciones-penal-pj': 'Formación ejecutiva para juntas directivas y equipos en prevención de riesgo penal corporativo. Metodología práctica orientada a decisiones reales.',
  'civil':                   'Asesoría y litigio en contratos, obligaciones y conflictos patrimoniales en Pereira y el Eje Cafetero. Conciliación y estrategia probatoria.',
  'familia':                 'Custodia, alimentos, divorcio y medidas de protección familiar en Pereira. Acompañamiento técnico y humano en cada etapa del proceso.',
  'laboral':                 'Defensa en conflictos laborales, despidos, reclamaciones y acoso laboral en Pereira. Asesoría para trabajadores y empleadores en el Eje Cafetero.',
  'administrativo':          'Representación ante autoridades administrativas y jurisdicción contenciosa en Pereira. Recursos, demandas y defensa estratégica frente al Estado.',
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  if (!detail) return {};

  const description = SERVICE_DESCRIPTIONS[slug] ?? detail.summary;
  const title = `${detail.headline} | Castellanos Abogados`;

  return {
    title,
    description,
    alternates: { canonical: `/servicios/${slug}` },
    openGraph: {
      type: 'website',
      url: `https://jonatancastellanosabogado.com/servicios/${slug}`,
      title,
      description,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${detail.title} — Castellanos Abogados` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

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
