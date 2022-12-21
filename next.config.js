/** @type {import('next').NextConfig} */

const path = require('path');

const aliases = {
  src: path.resolve(__dirname, 'src'),
  components: path.resolve(__dirname, 'src/components'),
};

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      }
    ]
  },
  webpack: (config) => {
    config.resolve.alias = { ...config.resolve.alias, ...aliases };
    return config;
  },
};

module.exports = nextConfig;
