import MetodologiaClient from "@/app/components/MetodologiaClient";

export const metadata = {
  title: "Metodología | Castellanos Abogados",
  description:
    "Conoce cómo trabajamos: diagnóstico, plan de actuación y seguimiento continuo aplicado a cada área de práctica jurídica.",
  alternates: { canonical: '/metodologia' },
  openGraph: {
    type: 'website',
    url: 'https://jonatancastellanosabogado.com/metodologia',
    title: 'Metodología de trabajo | Castellanos Abogados',
    description: 'Conoce cómo trabajamos: diagnóstico jurídico, plan de actuación y seguimiento continuo en cada proceso.',
    images: [{ url: '/logo.png', width: 1024, height: 1536, alt: 'Castellanos Abogados — Metodología' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Metodología de trabajo | Castellanos Abogados',
    description: 'Diagnóstico jurídico, plan de actuación y seguimiento continuo. Así trabajamos en Castellanos Abogados.',
  },
};

export default function MetodologiaPage() {
  return <MetodologiaClient />;
}
