import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/panel',
        '/portal',
        '/login',
        '/registro',
        '/agenda',
        '/api/',
        '/auth/',
        '/cliente',
        '/clientes',
        '/gracias-legal',
      ],
    },
    sitemap: 'https://jonatancastellanosabogado.com/sitemap.xml',
  };
}
