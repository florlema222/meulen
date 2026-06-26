/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Emit directory-style URLs (e.g. /en/index.html) so locale paths like
  // "/en/" and "/pt/" resolve cleanly on static hosting.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
