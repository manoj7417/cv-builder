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

  async headers() {
    return [
      {
        source: '/(.*)', // Apply to all routes
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'no-referrer',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // Keeps the X-Frame-Options but allows same-origin framing
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self'; 
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://res.cloudinary.com https://vercel.live; 
              style-src 'self' 'unsafe-inline'; 
              img-src 'self' https://res.cloudinary.com https://static.vecteezy.com https://via.placeholder.com; 
              font-src 'self' data:; 
              object-src 'none'; 
              base-uri 'self'; 
              frame-ancestors 'self' https://vercel.live;
            `.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
