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
              script-src 'self' 'unsafe-inline' 'unsafe-eval' 
                https://www.googletagmanager.com 
                https://googleads.g.doubleclick.net 
                https://www.youtube.com 
                https://cdnjs.cloudflare.com 
                https://www.clarity.ms
                https://js.stripe.com 
                https://static.hotjar.com
                https://connect.facebook.net;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: blob: 
                https://res.cloudinary.com 
                https://static.vecteezy.com 
                https://via.placeholder.com 
                https://geniescareerhubbucket.lon1.digitaloceanspaces.com 
                https://geniescareerhubbucket.lon1.cdn.digitaloceanspaces.com 
                https://uxwing.com 
                https://upload.wikimedia.org 
                http://localhost:3000 
                https://geniescareerhub.com 
                https://c.clarity.ms 
                https://lh3.googleusercontent.com 
                https://images.unsplash.com 
                https://www.linkedin.com 
                https://www.google.co.in 
                https://www.google.com 
                https://www.googletagmanager.com 
                https://c.bing.com
                https://www.facebook.com;
              font-src 'self' data:;
              connect-src 'self' blob: 
                https://goldfish-app-a2e3u.ondigitalocean.app 
                http://localhost:3000 
                https://geniescareerhub.com 
                https://www.google-analytics.com 
                https://ipapi.co 
                ws://127.0.0.1:51673 
                https://*.clarity.ms
                https://api.stripe.com 
                https://googleads.g.doubleclick.net 
                https://google.com 
                https://www.google.com 
                https://static.hotjar.com 
                https://ws8.hotjar.com
                https://j.clarity.ms
                https://connect.facebook.net;
              frame-src 'self' 
                https://www.youtube.com 
                https://docs.google.com 
                https://js.stripe.com 
                https://td.doubleclick.net 
                https://www.googletagmanager.com;
              worker-src 'self' blob:;
            `.replace(/\s+/g, ' ').trim(),
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
          { key: 'Cache-Control', value: 'no-store, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' }
        ]
      }
    ];
  },
  experimental: {
    isrMemoryCacheSize: 0,
    workerThreads: false,
    cpus: 1,
    serverComponentsExternalPackages: ['@/lib/serverApi'],
    forceSwcTransforms: true,
    optimizeCss: false,
    scrollRestoration: true,
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap'
      },
      {
        source: '/sitemap',
        destination: '/sitemap'
      }
    ]
  },
  serverRuntimeConfig: {
    mySecret: 'secret',
    apiUrl: process.env.BASE_URL,
  },
  publicRuntimeConfig: {
    staticFolder: '/static',
  },
  typescript: {
    ignoreBuildErrors: true
  },
};
 
module.exports = nextConfig;
