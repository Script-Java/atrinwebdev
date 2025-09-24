/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: 'images.pexels.com', pathname: '/**' },
    ],
  },

  async redirects() {
    return [
      // Force apex /signin to CRM subdomain
      {
        source: '/signin',
        has: [{ type: 'host', value: 'atrinwebdev.com' }],
        destination: 'https://crm.atrinwebdev.com/signin',
        permanent: false,
      },
      // Force apex /crm/* to CRM subdomain
      {
        source: '/crm/:path*',
        has: [{ type: 'host', value: 'atrinwebdev.com' }],
        destination: 'https://crm.atrinwebdev.com/crm/:path*',
        permanent: false,
      },
    ];
  },

  async rewrites() {
    return [
      // On CRM subdomain, make "/" serve the CRM app without changing the visible URL
      {
        source: '/',
        has: [{ type: 'host', value: 'crm.atrinwebdev.com' }],
        destination: '/crm',
      },
    ];
  },
};

export default nextConfig;
