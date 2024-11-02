/** @format */

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
