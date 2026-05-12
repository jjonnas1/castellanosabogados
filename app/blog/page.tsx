import BlogClient from '@/app/components/BlogClient';

export const metadata = {
  title: 'Blog jurídico | Castellanos Abogados',
  description:
    'Artículos y orientación legal sobre derecho penal, tutelas, ejecución de penas y más, escritos por el equipo de Castellanos Abogados.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    url: 'https://jonatancastellanosabogado.com/blog',
    title: 'Blog jurídico | Castellanos Abogados',
    description: 'Artículos sobre derecho penal, tutelas, ejecución de penas, familia y laboral para Colombia.',
    images: [{ url: '/logo.png', width: 1024, height: 1536, alt: 'Blog jurídico — Castellanos Abogados' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog jurídico | Castellanos Abogados',
    description: 'Artículos sobre derecho penal, tutelas, ejecución de penas, familia y laboral para Colombia.',
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
