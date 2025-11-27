/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Add this for static export
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
}

module.exports = nextConfig