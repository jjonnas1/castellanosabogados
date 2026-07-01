import type { Metadata } from 'next';
import AbogadoDomicilioClient from '@/app/components/AbogadoDomicilioClient';

export const metadata: Metadata = {
  title: 'Abogados a domicilio en Pereira | Castellanos Abogados',
  description:
    'Enviamos tu abogado a la casa, oficina o el lugar que necesites. Atención jurídica presencial y personalizada en Pereira y el Eje Cafetero. Servicio de desplazamiento desde $250.000.',
  alternates: { canonical: '/abogado-a-domicilio' },
  openGraph: {
    type: 'website',
    url: 'https://jonatancastellanosabogado.com/abogado-a-domicilio',
    title: 'Abogados a domicilio en Pereira | Castellanos Abogados',
    description:
      'Enviamos tu abogado a la dirección que necesites. Atención presencial personalizada. Desplazamiento desde $250.000, según la ubicación.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Castellanos Abogados — Abogados a domicilio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abogados a domicilio en Pereira | Castellanos Abogados',
    description:
      'Enviamos tu abogado a la dirección que necesites. Atención presencial personalizada. Desplazamiento desde $250.000.',
  },
};

export default function AbogadoDomicilioPage() {
  return <AbogadoDomicilioClient />;
}
