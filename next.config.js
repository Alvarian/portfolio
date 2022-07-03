/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.credly.com'],
    formats: ['image/avif', 'image/webp'],
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, process: false, buffer: false, util: false, events: false, stream: false, crypto: false, dns: false, net: false, tls: false, querystring: false, assert: false, string_decoder: false};

    return config;
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  }
}
