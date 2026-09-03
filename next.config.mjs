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
        // /personas duplicaba el contenido de /asesoria-personas (SEO)
        source: '/personas',
        destination: '/asesoria-personas',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
