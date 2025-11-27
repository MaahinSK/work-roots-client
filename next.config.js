/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Add this for static export
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
}

module.exports = nextConfig/** @type {import('next').NextConfig} */
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
  // Remove output: 'export' for now - we'll use server-side rendering
}

module.exports = nextConfig