// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignore ESLint errors during builds (set to false in production)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during builds (set to false in production)
    ignoreBuildErrors: true,
  },
  experimental: {
    // Enable fallback to SWC transforms if native binary fails
    forceSwcTransforms: true,
  },
  images: {
    // Disable image optimization (good for local/dev environments)
    unoptimized: true,
  },
}

// ✅ ESM export syntax for `.mjs` files
export default nextConfig
