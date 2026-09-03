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
  'reforma-laboral-colombia-cambios-vigentes-2026',
  'nuevo-codigo-procesal-trabajo-colombia-2026',
  'ley-2477-2025-reforma-procesal-penal',
  'cuota-alimentaria-colombia',
  'violencia-intrafamiliar-medidas-proteccion',
  'ley-2466-2025-redenciones-pena',
  'prescripcion-titulos-valores-colombia',
  'inasistencia-alimentaria-colombia',
];

const BLOG_DATES: Record<string, string> = {
  'cuando-interponer-una-tutela':        '2026-03-10',
  'derechos-del-imputado-proceso-penal': '2026-03-18',
  'responsabilidad-penal-empresarial':   '2026-04-01',
  'beneficios-ejecucion-penas':          '2026-04-05',
  'abogado-penalista-pereira':           '2026-05-05',
  'que-hacer-si-te-detienen-colombia':   '2026-05-05',
  'detencion-domiciliaria-colombia':     '2026-05-05',
  'divorcio-colombia':                   '2026-05-12',
  'acoso-laboral-colombia':              '2026-05-12',
  'medida-de-aseguramiento-colombia':    '2026-05-19',
  'libertad-condicional-colombia':       '2026-05-19',
  'preacuerdo-penal-colombia':           '2026-05-19',
  'reforma-laboral-colombia-cambios-vigentes-2026': '2026-08-05',
  'nuevo-codigo-procesal-trabajo-colombia-2026':     '2026-08-12',
  'ley-2477-2025-reforma-procesal-penal':            '2026-08-19',
  'cuota-alimentaria-colombia':                      '2026-03-25',
  'violencia-intrafamiliar-medidas-proteccion':      '2026-04-22',
  'ley-2466-2025-redenciones-pena':                  '2026-05-15',
  'prescripcion-titulos-valores-colombia':           '2026-05-20',
  'inasistencia-alimentaria-colombia':               '2026-09-03',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,            priority: 1.0, changeFrequency: 'weekly',  lastModified: '2026-05-12' },
    { url: `${BASE}/servicios`,   priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-05-01' },
    { url: `${BASE}/tutela`,      priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-05-01' },
    { url: `${BASE}/abogado-a-domicilio`, priority: 0.85, changeFrequency: 'monthly', lastModified: '2026-07-01' },
    { url: `${BASE}/metodologia`, priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-05-01' },
    { url: `${BASE}/como-trabajamos`,   priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-09-03' },
    { url: `${BASE}/a-quien-servimos`,  priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-09-03' },
    { url: `${BASE}/asesoria-personas`, priority: 0.75, changeFrequency: 'monthly', lastModified: '2026-09-03' },
    { url: `${BASE}/penal-empresarial`, priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-09-03' },
    { url: `${BASE}/trabaja`,           priority: 0.4, changeFrequency: 'yearly',  lastModified: '2026-09-03' },
    { url: `${BASE}/blog`,        priority: 0.8, changeFrequency: 'weekly',  lastModified: '2026-09-03' },
    { url: `${BASE}/nosotros`,    priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-05-07' },
    { url: `${BASE}/contacto`,    priority: 0.7, changeFrequency: 'yearly',  lastModified: '2026-01-01' },
  ];

  const servicePages: MetadataRoute.Sitemap = serviceDetailList.map((service) => ({
    url: `${BASE}/servicios/${service.slug}`,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
    lastModified: '2026-05-01',
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    lastModified: BLOG_DATES[slug] ?? '2026-05-01',
  }));

  return [...staticPages, ...servicePages, ...blogPages];
}
