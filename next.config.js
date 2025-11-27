/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly disable static export
  output: 'standalone',
  
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
    unoptimized: false, // Enable image optimization
  },
  
  reactStrictMode: true,
  
  // Disable static optimization for dynamic pages
  experimental: {
    webpackBuildWorker: true,
  },
  
  // Enable trailing slashes for better compatibility
  trailingSlash: false,
}

module.exports = nextConfig