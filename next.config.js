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
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.linkedin.com",
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
            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://googleads.g.doubleclick.net https://www.youtube.com https://cdnjs.cloudflare.com https://www.clarity.ms https://js.stripe.com;
            style-src 'self' 'unsafe-inline';
            img-src 'self' data: blob: https://res.cloudinary.com https://static.vecteezy.com https://via.placeholder.com https://geniescareerhubbucket.lon1.digitaloceanspaces.com https://geniescareerhubbucket.lon1.cdn.digitaloceanspaces.com https://uxwing.com https://upload.wikimedia.org http://localhost:3000 https://geniescareerhub.com https://c.clarity.ms https://lh3.googleusercontent.com https://images.unsplash.com https://www.linkedin.com https://www.google.co.in;
            font-src 'self' data:;
            connect-src 'self' blob: https://goldfish-app-a2e3u.ondigitalocean.app http://localhost:3000 https://geniescareerhub.com https://www.google-analytics.com https://ipapi.co ws://127.0.0.1:51673 https://l.clarity.ms https://i.clarity.ms https://r.clarity.ms https://m.clarity.ms https://c.clarity.ms https://api.stripe.com https://googleads.g.doubleclick.net https://google.com;
            frame-src 'self' https://www.youtube.com https://docs.google.com https://js.stripe.com https://td.doubleclick.net;
            worker-src 'self' blob:;
          `.trim().replace(/\s+/g, ' '),          
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;