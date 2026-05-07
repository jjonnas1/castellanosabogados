import BlogClient from '@/app/components/BlogClient';

export const metadata = {
  title: 'Blog jurídico | Castellanos Abogados',
  description:
    'Artículos y orientación legal sobre derecho penal, tutelas, ejecución de penas y más, escritos por el equipo de Castellanos Abogados.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  return <BlogClient />;
}
