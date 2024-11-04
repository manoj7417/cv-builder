/** @format */

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

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
        // Apply this header to all routes
        source: "/(.*)",
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

// const nextConfig = {
//   output: "standalone",
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//         port: "",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "static.vecteezy.com",
//         port: "",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "via.placeholder.com",
//         port: "",
//         pathname: "/**",
//       },
//     ],
//   },
//   webpack: (config) => {
//     config.resolve.alias.canvas = false;
//     config.resolve.alias.encoding = false;
//     return config;
//   },
//   pageExtensions: ["jsx", "js", "tsx", "ts"],

//   // Add headers configuration here
//   async headers() {
//     return [
//       {
//         // Apply to all routes
//         source: "/(.*)",
//         headers: [
//           {
//             key: "X-Content-Type-Options",
//             value: "nosniff",
//           },
//           {
//             key: "X-Frame-Options",
//             value: "SAMEORIGIN",
//           },
//           {
//             key: "Content-Security-Policy",
//             value:
//               "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'",
//           },
//         ],
//       },
//     ];
//   },
// };

// module.exports = nextConfig;
