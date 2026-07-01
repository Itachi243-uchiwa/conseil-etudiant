const BASE = "/api/backend"

// ── Client-side in-memory cache (browser module scope, 30s TTL) ──────────────
const _cache = new Map<string, { data: any; ts: number }>()
const TTL = 30_000

function fromCache<T>(key: string): T | null {
    const hit = _cache.get(key)
    return hit && Date.now() - hit.ts < TTL ? (hit.data as T) : null
}
function toCache(key: string, data: any) { _cache.set(key, { data, ts: Date.now() }) }
function bust(...keys: string[]) { keys.forEach(k => _cache.delete(k)) }
function bustPrefix(prefix: string) {
    for (const k of _cache.keys()) if (k.startsWith(prefix)) _cache.delete(k)
}

// ── Authenticated fetch (requires member credentials) ─────────────────────────
async function memberFetch<T>(
    endpoint: string,
    email: string,
    name: string,
    options: RequestInit = {}
): Promise<T> {
    const res = await fetch(`${BASE}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "X-Member-Email": email,
            "X-Member-Name": name,
            ...(options.headers ?? {}),
        },
        cache: "no-store",
    })
    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }))
        throw new Error(err.error ?? err.message ?? `Erreur ${res.status}`)
    }
    if (res.status === 204) return null as T
    return res.json()
}

// ── Sessions ──────────────────────────────────────────────────────────────────
export async function getSessions() {
    const cached = fromCache<any[]>("sessions")
    if (cached) return cached
    const res = await fetch(`${BASE}/members/sessions`, { cache: "no-store" })
    const data = res.ok ? await res.json() : []
    toCache("sessions", data)
    return data
}

export async function getSession(id: number) {
    const key = `session:${id}`
    const cached = fromCache<any>(key)
    if (cached) return cached
    const res = await fetch(`${BASE}/members/sessions/${id}`, { cache: "no-store" })
    const data = res.ok ? await res.json() : null
    if (data) toCache(key, data)
    return data
}

export async function getActiveSessions() {
    const cached = fromCache<any[]>("sessions:active")
    if (cached) return cached
    const res = await fetch(`${BASE}/members/sessions/active`, { cache: "no-store" })
    const data = res.ok ? await res.json() : []
    toCache("sessions:active", data)
    return data
}

export async function createSession(dto: unknown, email: string, name: string) {
    const result = await memberFetch("/members/sessions", email, name, {
        method: "POST",
        body: JSON.stringify(dto),
    })
    bust("sessions", "sessions:active")
    return result
}

export async function updateSessionStatus(id: number, status: string, email: string, name: string) {
    const result = await memberFetch(`/members/sessions/${id}/status?status=${status}`, email, name, { method: "PATCH" })
    bust("sessions", "sessions:active", `session:${id}`)
    return result
}

// ── Vote subjects (not cached — real-time polling/SSE) ────────────────────────
export async function getSubjects(sessionId: number, email: string, name: string) {
    return memberFetch(`/members/sessions/${sessionId}/subjects`, email, name)
}

export async function createSubject(sessionId: number, dto: unknown, email: string, name: string) {
    return memberFetch(`/members/sessions/${sessionId}/subjects`, email, name, {
        method: "POST",
        body: JSON.stringify(dto),
    })
}

export async function openVote(subjectId: number, email: string, name: string) {
    return memberFetch(`/members/subjects/${subjectId}/open`, email, name, { method: "PATCH" })
}

export async function closeVote(subjectId: number, email: string, name: string) {
    return memberFetch(`/members/subjects/${subjectId}/close`, email, name, { method: "PATCH" })
}

export async function castVote(subjectId: number, choice: string, email: string, name: string) {
    return memberFetch(`/members/subjects/${subjectId}/vote`, email, name, {
        method: "POST",
        body: JSON.stringify({ choice }),
    })
}

export async function getResults(subjectId: number) {
    const res = await fetch(`${BASE}/members/subjects/${subjectId}/results`, { cache: "no-store" })
    return res.ok ? res.json() : null
}

// ── Documents ─────────────────────────────────────────────────────────────────
export async function getDocuments(params?: { type?: string; sessionId?: number }) {
    const key = `docs:${params?.type ?? ""}:${params?.sessionId ?? ""}`
    const cached = fromCache<any[]>(key)
    if (cached) return cached
    const qs = new URLSearchParams()
    if (params?.type) qs.set("type", params.type)
    if (params?.sessionId) qs.set("sessionId", String(params.sessionId))
    const res = await fetch(`${BASE}/members/documents?${qs}`, { cache: "no-store" })
    const data = res.ok ? await res.json() : []
    toCache(key, data)
    return data
}

export async function createDocument(dto: unknown, email: string, name: string) {
    const result = await memberFetch("/members/documents", email, name, {
        method: "POST",
        body: JSON.stringify(dto),
    })
    bustPrefix("docs:")
    bustPrefix("my-docs:")
    return result
}

export async function getMyDocuments(email: string, name: string) {
    const key = `my-docs:${email}`
    const cached = fromCache<any[]>(key)
    if (cached) return cached
    const data = await memberFetch<any[]>("/members/documents/my", email, name)
    toCache(key, data)
    return data
}
