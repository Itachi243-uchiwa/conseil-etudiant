// Types pour une meilleure sécurité de type
export interface ApiOptions extends RequestInit {
    headers?: Record<string, string>
}

// Configuration de l'API
const API_CONFIG = {
    baseUrl: process.env.NEXT_PUBLIC_BACK_PUBLIC_API_URL,
    timeout: 10000,
    retries: 3,
} as const

// Classe d'erreur personnalisée
export class ApiError extends Error {
    constructor(
        public status: number,
        public statusText: string,
        message?: string
    ) {
        super(message || `API Error: ${status} ${statusText}`)
        this.name = 'ApiError'
    }
}

// Fonction utilitaire pour gérer les délais d'attente
function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
    return Promise.race([
        promise,
        new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
        )
    ])
}

// Fonction utilitaire pour les tentatives de retry
async function withRetry<T>(
    fn: () => Promise<T>,
    retries: number = API_CONFIG.retries
): Promise<T> {
    try {
        return await fn()
    } catch (error) {
        if (retries > 0 && error instanceof ApiError && error.status >= 500) {
            await new Promise(resolve => setTimeout(resolve, 1000))
            return withRetry(fn, retries - 1)
        }
        throw error
    }
}

// Fonction principale pour les appels API
export async function fetchAPI<T = any>(
    endpoint: string,
    options: ApiOptions = {}
): Promise<T> {
    const defaultOptions: ApiOptions = {
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    }

    const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        }
    }

    const url = `${API_CONFIG.baseUrl}${endpoint}`

    return withRetry(async () => {
        const response = await withTimeout(
            fetch(url, mergedOptions),
            API_CONFIG.timeout
        )

        if (!response.ok) {
            throw new ApiError(
                response.status,
                response.statusText,
                `Failed to fetch ${endpoint}`
            )
        }

        // Gestion des réponses vides (204 No Content)
        if (response.status === 204) {
            return null as T
        }

        const contentType = response.headers.get('content-type')
        if (contentType?.includes('application/json')) {
            return await response.json()
        }

        return await response.text() as T
    })
}

// ==================== HOMEPAGE ====================
export async function getHomepage() {
    try {
        return await fetchAPI("/api/homepage")
    } catch (error) {
        console.error("Error fetching homepage data:", error)
        return null
    }
}

export async function getPublishedHomepage() {
    try {
        return await fetchAPI("/api/homepage/published")
    } catch (error) {
        console.error("Error fetching published homepage:", error)
        return null
    }
}

// ==================== NEWS ====================
// 🔧 CORRECTION : Utilisation du bon endpoint /api/news
export async function getNews() {
    try {
        return await fetchAPI("/api/news")  // ✅ Corrigé avec /api/news
    } catch (error) {
        console.error("Error fetching news:", error)
        return []
    }
}

export async function getNewsById(id: number) {
    try {
        return await fetchAPI(`/api/news/${id}`)  // ✅ Corrigé avec /api/news
    } catch (error) {
        console.error(`Error fetching news with id ${id}:`, error)
        return null
    }
}

export async function getNewsBySlug(slug: string) {
    try {
        return await fetchAPI(`/api/news/slug/${slug}`)  // ✅ Corrigé avec /api/news
    } catch (error) {
        console.error(`Error fetching news with slug ${slug}:`, error)
        return null
    }
}

export async function getFeaturedNews() {
    try {
        return await fetchAPI("/api/news/featured")  // ✅ Corrigé avec /api/news
    } catch (error) {
        console.error("Error fetching featured news:", error)
        return []
    }
}

// ==================== VLOGS ====================
export async function getVlogs() {
    try {
        return await fetchAPI("/api/vlogs")  // ✅ Corrigé avec /api/vlogs
    } catch (error) {
        console.error("Error fetching vlogs:", error)
        return []
    }
}

export async function getVlogById(id: number) {
    try {
        return await fetchAPI(`/api/vlogs/${id}`)
    } catch (error) {
        console.error(`Error fetching vlog with id ${id}:`, error)
        return null
    }
}

export async function getVlogBySlug(slug: string) {
    try {
        return await fetchAPI(`/api/vlogs/slug/${slug}`)
    } catch (error) {
        console.error(`Error fetching vlog with slug ${slug}:`, error)
        return null
    }
}

export async function getVlogsByCategory(category: string) {
    try {
        return await fetchAPI(`/api/vlogs/category/${encodeURIComponent(category)}`)
    } catch (error) {
        console.error(`Error fetching vlogs for category ${category}:`, error)
        return []
    }
}

export async function getVlogsByTag(tag: string) {
    try {
        return await fetchAPI(`/api/vlogs/tag/${encodeURIComponent(tag)}`)
    } catch (error) {
        console.error(`Error fetching vlogs for tag ${tag}:`, error)
        return []
    }
}

// ==================== SERVICES ====================
export async function getServices() {
    try {
        return await fetchAPI("/api/services")  // ✅ Corrigé avec /api/services
    } catch (error) {
        console.error("Error fetching services:", error)
        return []
    }
}

export async function getServiceById(id: number) {
    try {
        return await fetchAPI(`/api/services/${id}`)
    } catch (error) {
        console.error(`Error fetching service with id ${id}:`, error)
        return null
    }
}

export async function getServiceBySlug(slug: string) {
    try {
        return await fetchAPI(`/api/services/slug/${slug}`)
    } catch (error) {
        console.error(`Error fetching service with slug ${slug}:`, error)
        return null
    }
}

export async function getFeaturedServices() {
    try {
        return await fetchAPI("/api/services/featured")
    } catch (error) {
        console.error("Error fetching featured services:", error)
        return []
    }
}

// ==================== MISSIONS ====================
export async function getMissions() {
    try {
        return await fetchAPI("/api/missions")  // ✅ Corrigé avec /api/missions
    } catch (error) {
        console.error("Error fetching missions:", error)
        return []
    }
}

export async function getMissionById(id: number) {
    try {
        return await fetchAPI(`/api/missions/${id}`)
    } catch (error) {
        console.error(`Error fetching mission with id ${id}:`, error)
        return null
    }
}

// ==================== CAMPUS ====================
export async function getCampus() {
    try {
        return await fetchAPI("/api/campus")
    } catch (error) {
        console.error("Error fetching campus:", error)
        return []
    }
}

export async function getCampusById(id: number) {
    try {
        return await fetchAPI(`/api/campus/${id}`)
    } catch (error) {
        console.error(`Error fetching campus with id ${id}:`, error)
        return null
    }
}

export async function getCampusBySlug(slug: string) {
    try {
        return await fetchAPI(`/api/campus/slug/${slug}`)
    } catch (error) {
        console.error(`Error fetching campus with slug ${slug}:`, error)
        return null
    }
}

// ==================== TEAM MEMBERS ====================
export async function getTeamMembers() {
    try {
        return await fetchAPI("/api/team-members")  // ✅ Corrigé avec /api/teamMembers
    } catch (error) {
        console.error("Error fetching team members:", error)
        return []
    }
}

export async function getTeamMemberById(id: number) {
    try {
        return await fetchAPI(`/api/team-members/${id}`)
    } catch (error) {
        console.error(`Error fetching team member with id ${id}:`, error)
        return null
    }
}

export async function getTeamMembersByCampusSlug(slug: string) {
    try {
        return await fetchAPI(`/api/team-members/${slug}-members`)
    } catch (error) {
        console.error(`Error fetching team members for campus ${slug}:`, error)
        return []
    }
}

export async function getOfficeMembers() {
    try {
        return await fetchAPI("/api/team-members/office-members")
    } catch (error) {
        console.error("Error fetching office members:", error)
        return []
    }
}

// ==================== ÉVÉNEMENTS ====================
export async function getEvents() {
    try {
        return await fetchAPI("/api/events")
    } catch (error) {
        console.error("Error fetching events:", error)
        return []
    }
}

export async function getEventBySlug(slug: string) {
    try {
        return await fetchAPI(`/api/events/slug/${slug}`)
    } catch (error) {
        console.error(`Error fetching event with slug ${slug}:`, error)
        return null
    }
}

export async function getFeaturedEvents() {
    try {
        return await fetchAPI("/api/events/featured")
    } catch (error) {
        console.error("Error fetching featured events:", error)
        return []
    }
}

export async function getUpcomingEvents() {
    try {
        return await fetchAPI("/api/events/upcoming")
    } catch (error) {
        console.error("Error fetching upcoming events:", error)
        return []
    }
}

// ==================== SSR FETCH HELPERS (Server Components only) ====================
// These use Next.js ISR caching — do NOT use inside "use client" components.

async function serverFetch<T>(endpoint: string, revalidate = 60): Promise<T | null> {
    try {
        const res = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
            next: { revalidate },
        } as RequestInit)
        if (!res.ok) return null
        return res.json() as Promise<T>
    } catch {
        return null
    }
}

export const getHomepageSSR = () => serverFetch<any>("/api/homepage", 60)
export const getNewsSSR = () => serverFetch<any[]>("/api/news", 60)
export const getFeaturedNewsSSR = () => serverFetch<any[]>("/api/news/featured", 60)
export const getFeaturedServicesSSR = () => serverFetch<any[]>("/api/services/featured", 60)
export const getFeaturedEventsSSR = () => serverFetch<any[]>("/api/events/featured", 60)

// ==================== UTILITAIRES ====================
export function getMediaUrl(url: string): string {
    if (!url) return ""
    if (url.startsWith("/")) {
        return url // URL relative, déjà dans le dossier public
    }
    if (url.startsWith("http")) {
        return url // URL complète
    }
    return `${API_CONFIG.baseUrl}${url.startsWith('/') ? '' : '/'}${url}`
}

// ==================== FONCTIONS DE CACHE (Optionnel) ====================
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export function getCachedData<T>(key: string): T | null {
    const cached = cache.get(key)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data
    }
    return null
}

export function setCachedData<T>(key: string, data: T): void {
    cache.set(key, { data, timestamp: Date.now() })
}

export function clearCache(): void {
    cache.clear()
}

// Versions avec cache des fonctions principales
export async function getNewsCached() {
    const cacheKey = 'news'
    const cached = getCachedData(cacheKey)
    if (cached) return cached

    const data = await getNews()
    setCachedData(cacheKey, data)
    return data
}

export async function getFeaturedNewsCached() {
    const cacheKey = 'featured-news'
    const cached = getCachedData(cacheKey)
    if (cached) return cached

    const data = await getFeaturedNews()
    setCachedData(cacheKey, data)
    return data
}

export async function getHomepageCached() {
    const cacheKey = 'homepage'
    const cached = getCachedData(cacheKey)
    if (cached) return cached

    const data = await getPublishedHomepage()
    setCachedData(cacheKey, data)
    return data
}