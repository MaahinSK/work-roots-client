/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  // Disable server-side features for static export
  experimental: {
    webpackBuildWorker: false,
  }
}

module.exports = nextConfig