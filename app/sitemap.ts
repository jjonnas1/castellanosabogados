import { MetadataRoute } from 'next';
import { serviceDetailList } from '@/lib/serviceDetails';

const BASE = 'https://jonatancastellanosabogado.com';

const BLOG_SLUGS = [
  'cuando-interponer-una-tutela',
  'derechos-del-imputado-proceso-penal',
  'responsabilidad-penal-empresarial',
  'beneficios-ejecucion-penas',
  'abogado-penalista-pereira',
  'que-hacer-si-te-detienen-colombia',
  'detencion-domiciliaria-colombia',
  'divorcio-colombia',
  'acoso-laboral-colombia',
  'medida-de-aseguramiento-colombia',
  'libertad-condicional-colombia',
  'preacuerdo-penal-colombia',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,            priority: 1.0,  changeFrequency: 'weekly' },
    { url: `${BASE}/servicios`,   priority: 0.9,  changeFrequency: 'monthly' },
    { url: `${BASE}/tutela`,      priority: 0.9,  changeFrequency: 'monthly' },
    { url: `${BASE}/metodologia`, priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE}/blog`,        priority: 0.8,  changeFrequency: 'weekly' },
    { url: `${BASE}/nosotros`,    priority: 0.7,  changeFrequency: 'monthly' },
    { url: `${BASE}/contacto`,    priority: 0.7,  changeFrequency: 'yearly' },
  ];

  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));

  const servicePages: MetadataRoute.Sitemap = serviceDetailList.map((service) => ({
    url: `${BASE}/servicios/${service.slug}`,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
  }));

  return [...staticPages, ...servicePages, ...blogPages];
}
