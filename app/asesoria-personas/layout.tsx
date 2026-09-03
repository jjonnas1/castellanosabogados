import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asesoría penal a personas naturales | Castellanos Abogados',
  description:
    'Orientación y defensa penal para personas naturales en Pereira y el Eje Cafetero: atención directa del abogado, estrategia clara y seguimiento del caso en cada etapa.',
  alternates: { canonical: '/asesoria-personas' },
  openGraph: {
    type: 'website',
    url: 'https://jonatancastellanosabogado.com/asesoria-personas',
    title: 'Asesoría penal a personas naturales | Castellanos Abogados',
    description:
      'Orientación y defensa penal para personas naturales, con atención directa del abogado y estrategia clara.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Castellanos Abogados — Asesoría a personas' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asesoría penal a personas naturales | Castellanos Abogados',
    description:
      'Orientación y defensa penal para personas naturales en Pereira y el Eje Cafetero.',
  },
};

export default function AsesoriaPersonasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
