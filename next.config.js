/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Handle Firebase and Undici module issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Ignore specific warnings
    config.ignoreWarnings = [
      { module: /node_modules\/undici/ },
      { module: /node_modules\/firebase/ },
    ];

    return config;
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  reactStrictMode: true,
  // Remove output: 'export' - we need server-side rendering
  // Enable experimental features for better performance
  experimental: {
    webpackBuildWorker: true,
  }
}

module.exports = nextConfig