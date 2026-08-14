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

/** Motion binaire : `choice` = POUR | CONTRE | ABSTENTION. Scrutin : `optionId`. */
export async function castVote(
    subjectId: number,
    ballot: { choice?: string; optionId?: number },
    email: string,
    name: string
) {
    return memberFetch(`/members/subjects/${subjectId}/vote`, email, name, {
        method: "POST",
        body: JSON.stringify(ballot),
    })
}

export async function getResults(subjectId: number) {
    const res = await fetch(`${BASE}/members/subjects/${subjectId}/results`, { cache: "no-store" })
    return res.ok ? res.json() : null
}

// ── Procurations ──────────────────────────────────────────────────────────────

/** Liste des membres de l'équipe — sert à désigner le mandant d'une procuration. */
export async function getTeamMembers() {
    const cached = fromCache<any[]>("team-members")
    if (cached) return cached
    const res = await fetch(`${BASE}/team-members`, { cache: "no-store" })
    const data = res.ok ? await res.json() : []
    toCache("team-members", data)
    return data
}

/** Procurations d'une séance : visibles par tous les membres. */
export async function getProxies(sessionId: number) {
    const res = await fetch(`${BASE}/members/sessions/${sessionId}/proxies`, { cache: "no-store" })
    return res.ok ? res.json() : []
}

/**
 * Dépôt d'une procuration : le membre présent déclare le mandant et joint le PDF
 * signé. Multipart — pas de `Content-Type` manuel, le navigateur gère la boundary.
 */
export async function createProxy(
    sessionId: number,
    grantorEmail: string,
    file: File,
    email: string,
    name: string
) {
    const body = new FormData()
    body.append("grantorEmail", grantorEmail)
    body.append("file", file)

    const res = await fetch(`${BASE}/members/sessions/${sessionId}/proxies`, {
        method: "POST",
        headers: { "X-Member-Email": email, "X-Member-Name": name },
        body,
        cache: "no-store",
    })
    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }))
        throw new Error(err.error ?? err.message ?? `Erreur ${res.status}`)
    }
    return res.json()
}

/**
 * Vérification du PDF par le président de séance : la date portée sur la
 * procuration n'étant pas lisible automatiquement, c'est lui qui confirme
 * qu'elle vise bien cette AG.
 */
export async function setProxyValidation(id: number, validated: boolean, email: string, name: string) {
    return memberFetch(`/members/proxies/${id}/validation?validated=${validated}`, email, name, { method: "PATCH" })
}

export async function deleteProxy(id: number, email: string, name: string) {
    return memberFetch(`/members/proxies/${id}`, email, name, { method: "DELETE" })
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

/**
 * Dépôt d'un document avec le fichier joint. Passe en multipart pour que le
 * backend téléverse le fichier lui-même — pas de `Content-Type` manuel, le
 * navigateur doit générer la boundary.
 */
export async function uploadDocument(
    fields: { title: string; description?: string; type?: string; sessionId?: number; fileUrl?: string },
    file: File | null,
    email: string,
    name: string
) {
    const body = new FormData()
    body.append("title", fields.title)
    body.append("type", fields.type ?? "RAPPORT")
    if (fields.description) body.append("description", fields.description)
    if (fields.sessionId) body.append("sessionId", String(fields.sessionId))
    if (fields.fileUrl) body.append("fileUrl", fields.fileUrl)
    if (file) body.append("file", file)

    const res = await fetch(`${BASE}/members/documents`, {
        method: "POST",
        headers: { "X-Member-Email": email, "X-Member-Name": name },
        body,
        cache: "no-store",
    })
    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }))
        throw new Error(err.error ?? err.message ?? `Erreur ${res.status}`)
    }
    bustPrefix("docs:")
    bustPrefix("my-docs:")
    return res.json()
}

/** Supprime un document dont le membre est l'auteur. */
export async function deleteMyDocument(id: number, email: string, name: string) {
    const result = await memberFetch(`/members/documents/my/${id}`, email, name, { method: "DELETE" })
    bustPrefix("docs:")
    bustPrefix("my-docs:")
    return result
}
