const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "geniescareerhubbucket.lon1.digitaloceanspaces.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "geniescareerhubbucket.lon1.cdn.digitaloceanspaces.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "uxwing.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  pageExtensions: ["jsx", "js", "tsx", "ts"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.youtube.com https://www.youtube.com/iframe_api;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https://res.cloudinary.com https://static.vecteezy.com https://via.placeholder.com https://geniescareerhubbucket.lon1.digitaloceanspaces.com https://geniescareerhubbucket.lon1.cdn.digitaloceanspaces.com https://uxwing.com http://localhost:3000 https://geniescareerhub.com;
              font-src 'self' data:;
              connect-src 'self' https://goldfish-app-a2e3u.ondigitalocean.app http://localhost:3000 https://geniescareerhub.com https://www.google-analytics.com https://ipapi.co;
              frame-src 'self' https://www.youtube.com;
            `.trim().replace(/\s+/g, ' '),
          }
        ],
      },
    ];
  },
};

module.exports = nextConfig;
