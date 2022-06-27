/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.credly.com'],
    formats: ['image/avif', 'image/webp'],
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, process: false };

    return config;
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  }
}
