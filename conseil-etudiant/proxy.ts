import { NextResponse, type NextRequest } from "next/server"

// Définition des types de contenu et leurs stratégies de cache
const CACHE_STRATEGIES = {
  // Pages statiques - cache plus long
  staticPages: "public, max-age=86400, stale-while-revalidate=31536000", // 1 jour, stale pendant 1 an
  // Pages dynamiques - cache plus court avec revalidation
  dynamicPages: "public, max-age=300, stale-while-revalidate=3600", // 5 minutes, stale pendant 1 heure
  // Assets statiques (images, CSS, JS) - cache long
  staticAssets: "public, max-age=31536000, immutable", // 1 an, immuable
  // API - pas de cache par défaut
  api: "no-store",
}

// Extensions de fichiers considérées comme des assets statiques
const STATIC_ASSET_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".svg",
  ".webp",
  ".css",
  ".js",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
  ".ico",
  ".mp4",
  ".webm",
  ".mp3",
  ".pdf",
]

export function proxy(request: NextRequest) {
  const response = NextResponse.next()
  const url = request.nextUrl.pathname

  // Déterminer le type de contenu
  let cacheStrategy: string

  // Vérifier si c'est un asset statique
  const extension = (url.match(/(\.[a-z0-9]+)$/i)?.[1] || '').toLowerCase()
  if (STATIC_ASSET_EXTENSIONS.includes(extension)) {
    cacheStrategy = CACHE_STRATEGIES.staticAssets
  }
  // Vérifier si c'est une route API
  else if (url.startsWith("/api/")) {
    cacheStrategy = CACHE_STRATEGIES.api
  }
  // Vérifier si c'est une page dynamique (contient des paramètres)
  else if (url.includes("[") || url.includes("_next/data")) {
    cacheStrategy = CACHE_STRATEGIES.dynamicPages
  }
  // Par défaut, considérer comme une page statique
  else {
    cacheStrategy = CACHE_STRATEGIES.staticPages
  }

  // Ajouter les headers de cache
  response.headers.set("Cache-Control", cacheStrategy)

  // Ajouter Vary header pour indiquer que la réponse peut varier selon ces headers
  response.headers.set("Vary", "Accept, Accept-Encoding, Cookie")

  // Headers de sécurité
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "media-src 'self' https://res.cloudinary.com",
      process.env.NODE_ENV === "development"
        ? "connect-src 'self' http://localhost:8080 https://res.cloudinary.com"
        : "connect-src 'self' https://admin.cehe2b.be https://res.cloudinary.com",
      "worker-src blob:",
      "frame-ancestors 'none'",
    ].join("; ")
  )

  return response
}

// Configurer le middleware pour s'exécuter sur toutes les routes sauf certaines
export const config = {
  matcher: [
    // Appliquer à toutes les routes sauf les routes spécifiques
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}