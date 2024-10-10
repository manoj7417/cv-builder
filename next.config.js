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
            value: 'no-referrer', // Custom referrer policy
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Prevents the page from being displayed in an iframe
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Prevents MIME type sniffing
          },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self'; 
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://res.cloudinary.com; 
              style-src 'self' 'unsafe-inline'; 
              img-src 'self' https://res.cloudinary.com https://static.vecteezy.com https://via.placeholder.com; 
              font-src 'self'; 
              object-src 'none'; 
              base-uri 'self'; 
              frame-ancestors 'none';
            `.replace(/\s{2,}/g, ' ').trim(), // Adjust the CSP based on your resources and policies
          },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
