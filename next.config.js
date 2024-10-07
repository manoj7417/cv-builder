/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
  
  // Adding redirect logic
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'geniescareerhub.com',
          },
        ],
        destination: 'https://www.geniescareerhub.com',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
