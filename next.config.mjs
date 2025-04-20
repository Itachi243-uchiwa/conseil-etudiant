/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['v0.blob.com'], // Ajoutez ici les domaines externes pour les images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true, // Optimise les CSS
    optimizePackageImports: ['lucide-react', '@/components/ui'], // Optimise les imports de packages
  },
  // Optimisation du cache des pages statiques
  staticPageGenerationTimeout: 120, // 2 minutes
  // Configuration des headers pour les assets statiques
  async headers() {
    return [
      {
        source: '/(.*).(?:jpg|jpeg|png|svg|webp|avif|ico|css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
