/** @type {import('next').NextConfig} */

const path = require('path');

const aliases = {
  src: path.resolve(__dirname, 'src'),
  components: path.resolve(__dirname, 'src/components'),
};

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = { ...config.resolve.alias, ...aliases };
    return config;
  },
};

module.exports = nextConfig;
