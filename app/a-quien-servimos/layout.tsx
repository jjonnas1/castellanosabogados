import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'A quién servimos | Castellanos Abogados',
  description:
    'Asesoría jurídica para personas, familias, trabajadores, empleadores y empresas en Pereira y el Eje Cafetero: procesos penales, ejecución de penas, familia, laboral y trámites administrativos.',
  alternates: { canonical: '/a-quien-servimos' },
  openGraph: {
    type: 'website',
    url: 'https://jonatancastellanosabogado.com/a-quien-servimos',
    title: 'A quién servimos | Castellanos Abogados',
    description:
      'Acompañamiento jurídico a personas naturales, familias, personas en ejecución de penas, trabajadores y empresas.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Castellanos Abogados — A quién servimos' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A quién servimos | Castellanos Abogados',
    description:
      'Asesoría jurídica para personas y empresas: penal, ejecución de penas, familia, laboral y administrativo.',
  },
};

export default function AQuienServimosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
