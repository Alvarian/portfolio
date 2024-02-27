/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.badgr.io',
        port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'images.credly.com',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, process: false, buffer: false, util: false, events: false, stream: false, crypto: false, dns: false, net: false, tls: false, querystring: false, assert: false, string_decoder: false};

    return config;
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  }
}
