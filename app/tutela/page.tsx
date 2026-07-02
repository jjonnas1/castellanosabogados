import type { Metadata } from 'next';
import TutelaClient from '@/app/components/TutelaClient';

export const metadata: Metadata = {
  title: 'Tutelas | Castellanos Abogados',
  description: 'Interponemos acciones de tutela para proteger tus derechos fundamentales. Evaluación gratuita y acompañamiento en todo el proceso.',
  alternates: { canonical: '/tutela' },
  openGraph: {
    type: 'website',
    url: 'https://jonatancastellanosabogado.com/tutela',
    title: 'Acciones de Tutela en Pereira | Castellanos Abogados',
    description: 'Interponemos acciones de tutela para proteger tus derechos fundamentales. Evaluación gratuita y acompañamiento en todo el proceso.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Castellanos Abogados — Tutelas' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acciones de Tutela en Pereira | Castellanos Abogados',
    description: 'Interponemos acciones de tutela para proteger tus derechos fundamentales. Evaluación gratuita.',
  },
};

export default function TutelaPage() {
  return <TutelaClient />;
}
