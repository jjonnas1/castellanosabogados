import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trabaja con nosotros | Castellanos Abogados',
  description:
    'Únete a la red de abogados de Castellanos Abogados: trabajo remoto, consultas legales verificadas y pagos seguros por cada asesoría. Para abogados titulados en Colombia.',
  alternates: { canonical: '/trabaja' },
  openGraph: {
    type: 'website',
    url: 'https://jonatancastellanosabogado.com/trabaja',
    title: 'Trabaja con nosotros | Castellanos Abogados',
    description:
      'Red de abogados especialistas: trabajo remoto, consultas verificadas y pagos seguros.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Castellanos Abogados — Trabaja con nosotros' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trabaja con nosotros | Castellanos Abogados',
    description:
      'Únete a nuestra red de abogados especialistas en Colombia.',
  },
};

export default function TrabajaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
