const path = require('path');

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

    // Add ignore-loader for binary files
    config.module.rules.push({
      test: /\.node$/,
      use: 'ignore-loader'
    });

    config.resolve.alias['@'] = path.resolve(__dirname, '.');
    return config;
  },
  pageExtensions: ['jsx', 'js', 'tsx', 'ts']
};

module.exports = nextConfig;
