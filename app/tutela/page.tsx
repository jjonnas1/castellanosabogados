import type { Metadata } from 'next';
import TutelaClient from '@/app/components/TutelaClient';

export const metadata: Metadata = {
  title: 'Abogado de tutela en Pereira y Manizales | Castellanos Abogados',
  description: 'Asesoría para tutela contra EPS por medicamentos, citas, cirugías y procedimientos en Pereira, Dosquebradas, Santa Rosa de Cabal y Manizales.',
  alternates: { canonical: '/tutela' },
  openGraph: {
    type: 'website',
    url: 'https://jonatancastellanosabogado.com/tutela',
    title: 'Abogado de tutela en Pereira y Manizales | Castellanos Abogados',
    description: 'Tutelas contra EPS por medicamentos, citas, cirugías y procedimientos en Pereira y Manizales, con revisión virtual del caso.',
    images: [{ url: '/og-share-castellanos-2026.jpg', width: 1200, height: 630, alt: 'Castellanos Abogados — Tutelas' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abogado de tutela en Pereira y Manizales | Castellanos Abogados',
    description: 'Tutelas contra EPS por medicamentos, citas, cirugías y procedimientos, con revisión del caso.',
  },
};

export default function TutelaPage() {
  return <TutelaClient />;
}
