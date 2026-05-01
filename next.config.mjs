/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.jonatancastellanosabogado.com' }],
        destination: 'https://jonatancastellanosabogado.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
