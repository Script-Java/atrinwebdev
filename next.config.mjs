/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // The remotePatterns configuration is the modern and secure way
    // to allow images from external domains.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**', // Allows any path from this hostname
      },
      {
        // Added this new pattern to allow images from Pexels
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**', // Allows any path from this hostname
      },
    ],
  },
};

export default nextConfig;
