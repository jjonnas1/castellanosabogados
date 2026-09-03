import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cómo trabajamos | Castellanos Abogados',
  description:
    'Metodología jurídica clara: evaluación del caso, análisis técnico, estrategia y seguimiento continuo en asuntos penales, civiles, de familia, laborales y administrativos.',
  alternates: { canonical: '/como-trabajamos' },
  openGraph: {
    type: 'website',
    url: 'https://jonatancastellanosabogado.com/como-trabajamos',
    title: 'Cómo trabajamos | Castellanos Abogados',
    description:
      'Cada caso sigue una metodología estructurada: evaluación, análisis jurídico, estrategia y actuación con seguimiento directo.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Castellanos Abogados — Cómo trabajamos' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cómo trabajamos | Castellanos Abogados',
    description:
      'Evaluación, análisis jurídico, estrategia y seguimiento continuo. Así se trabaja cada caso.',
  },
};

export default function ComoTrabajamosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
