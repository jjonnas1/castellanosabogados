/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.jonatancastellanosabogado.com' }],
        destination: 'https://jonatancastellanosabogado.com/:path*',
        permanent: true,
      },
      {
        // /personas y /asesoria-personas duplicaban la página de defensa penal (SEO)
        source: '/personas',
        destination: '/servicios/penal-personas',
        permanent: false,
      },
      {
        source: '/asesoria-personas',
        destination: '/servicios/penal-personas',
        permanent: false,
      },
      {
        // /como-trabajamos repetía el contenido de /metodologia
        source: '/como-trabajamos',
        destination: '/metodologia',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
