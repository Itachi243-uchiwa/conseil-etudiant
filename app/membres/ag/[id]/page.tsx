"use client"

import { use, useEffect, useState, useRef, useCallback, type ReactElement } from "react"
import { useSession } from "next-auth/react"
import MemberShell from "@/components/membres/MemberShell"
import SessionDocuments from "@/components/membres/SessionDocuments"
import ProxyPanel from "@/components/membres/ProxyPanel"
import { getSession, getSubjects, getProxies, castVote, openVote, closeVote, createSubject } from "@/lib/members-api"
import { useToast } from "@/hooks/use-toast"
import {
    ThumbsUp, ThumbsDown, Minus, Plus, Play, Square, BarChart3, CheckCircle2,
    Clock, Users, Timer, ChevronDown, Trash2, Trophy, Scale, ListChecks, UserCheck,
} from "lucide-react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

const VOTE_OPTIONS = [
    { key: "POUR", label: "Pour", icon: ThumbsUp, color: "bg-green-500/15 border-green-500/40 text-green-700 dark:text-green-300 hover:bg-green-500/25 active:scale-95" },
    { key: "CONTRE", label: "Contre", icon: ThumbsDown, color: "bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300 hover:bg-red-500/25 active:scale-95" },
    { key: "ABSTENTION", label: "Abstention", icon: Minus, color: "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300 hover:bg-amber-500/25 active:scale-95" },
]

const CHART_COLORS = ["#22c55e", "#ef4444", "#f59e0b"]

// Palette cyclique pour les scrutins à candidats (nombre d'options non borné)
const CHOICE_COLORS = ["#6366f1", "#14b8a6", "#f97316", "#ec4899", "#8b5cf6", "#0ea5e9", "#84cc16", "#f43f5e"]
const colorForIndex = (i: number) => CHOICE_COLORS[i % CHOICE_COLORS.length]

const isChoice = (subject: any) => subject?.type === "CHOIX"

function useElapsedTime(openedAt?: string) {
    const [elapsed, setElapsed] = useState("")
    useEffect(() => {
        if (!openedAt) { setElapsed(""); return }
        const update = () => {
            const secs = Math.floor((Date.now() - new Date(openedAt).getTime()) / 1000)
            if (secs < 60) setElapsed(`${secs}s`)
            else if (secs < 3600) setElapsed(`${Math.floor(secs / 60)}min ${secs % 60}s`)
            else setElapsed(`${Math.floor(secs / 3600)}h ${Math.floor((secs % 3600) / 60)}min`)
        }
        update()
        const t = setInterval(update, 1000)
        return () => clearInterval(t)
    }, [openedAt])
    return elapsed
}

export default function AGSessionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const { data: session } = useSession()
    const { toast } = useToast()
    const [agSession, setAgSession] = useState<any>(null)
    const [subjects, setSubjects] = useState<any[]>([])
    const [proxies, setProxies] = useState<any[]>([])
    const [proxiesLoading, setProxiesLoading] = useState(true)
    const [loading, setLoading] = useState(true)
    const [voting, setVoting] = useState<Record<number, boolean>>({})
    const [showNewForm, setShowNewForm] = useState(false)
    const [liveResults, setLiveResults] = useState<Record<number, any>>({})
    const [expanded, setExpanded] = useState<Record<number, boolean>>({})
    const [userToggled, setUserToggled] = useState<Record<number, boolean>>({})
    const sseRefs = useRef<Record<number, EventSource>>({})

    const user = session?.user
    const isPresident = !!(user?.email && agSession?.presidentEmail?.toLowerCase() === user.email.toLowerCase())

    // Procuration portée par le membre connecté : sa voix vaut alors double.
    const myProxy = proxies.find(
        (p: any) => p.holderEmail?.toLowerCase() === user?.email?.toLowerCase()
    ) ?? null

    const refreshSubjects = useCallback(async () => {
        const subs = await getSubjects(Number(id), user?.email ?? "", user?.memberName ?? "")
        setSubjects(Array.isArray(subs) ? subs : [])
    }, [id, user])

    const refreshProxies = useCallback(async () => {
        const list = await getProxies(Number(id))
        setProxies(Array.isArray(list) ? list : [])
    }, [id])

    useEffect(() => {
        if (!user) return
        Promise.all([
            getSession(Number(id)),
            getSubjects(Number(id), user.email ?? "", user.memberName ?? ""),
        ]).then(([sess, subs]) => {
            setAgSession(sess)
            setSubjects(Array.isArray(subs) ? subs : [])
        }).finally(() => setLoading(false))
    }, [id, user])

    useEffect(() => {
        refreshProxies().finally(() => setProxiesLoading(false))
    }, [refreshProxies])

    // Un sujet ouvert s'auto-déplie — tant que le membre ne l'a pas replié lui-même
    useEffect(() => {
        setExpanded(prev => {
            const next = { ...prev }
            let changed = false
            subjects.forEach((s: any) => {
                if (userToggled[s.id]) return
                const shouldOpen = s.status === "OPEN"
                if (next[s.id] !== shouldOpen) { next[s.id] = shouldOpen; changed = true }
            })
            return changed ? next : prev
        })
    }, [subjects, userToggled])

    const toggleSubject = (subjectId: number) => {
        setUserToggled(prev => ({ ...prev, [subjectId]: true }))
        setExpanded(prev => ({ ...prev, [subjectId]: !prev[subjectId] }))
    }

    // SSE pour le président — ouvre une connexion par sujet OPEN
    useEffect(() => {
        if (!isPresident) return
        subjects.forEach((sub: any) => {
            if (sub.status === "OPEN" && !sseRefs.current[sub.id]) {
                const es = new EventSource(`/api/backend/members/subjects/${sub.id}/stream`)
                es.addEventListener("vote-update", (e) => {
                    try { setLiveResults(prev => ({ ...prev, [sub.id]: JSON.parse(e.data) })) } catch {}
                })
                sseRefs.current[sub.id] = es
            }
            if (sub.status === "CLOSED" && sseRefs.current[sub.id]) {
                sseRefs.current[sub.id].close()
                delete sseRefs.current[sub.id]
            }
        })
    }, [isPresident, subjects])

    useEffect(() => {
        return () => {
            Object.values(sseRefs.current).forEach(es => es.close())
            sseRefs.current = {}
        }
    }, [])

    // Polling 4s pour les membres non-présidents quand un vote est ouvert
    useEffect(() => {
        if (isPresident || !agSession || agSession.status !== "IN_PROGRESS") return
        const hasOpenVote = subjects.some((s: any) => s.status === "OPEN")
        if (!hasOpenVote) return
        const interval = setInterval(() => { refreshSubjects() }, 4000)
        return () => clearInterval(interval)
    }, [isPresident, agSession, subjects, refreshSubjects])

    const handleVote = async (subject: any, ballot: { choice?: string; optionId?: number }) => {
        if (!user) return
        setVoting(prev => ({ ...prev, [subject.id]: true }))
        try {
            await castVote(subject.id, ballot, user.email ?? "", user.memberName ?? "")
            await refreshSubjects()
            const label = ballot.optionId
                ? subject.options?.find((o: any) => o.id === ballot.optionId)?.label ?? "votre choix"
                : VOTE_OPTIONS.find(o => o.key === ballot.choice)?.label ?? ballot.choice
            toast({
                title: "Vote enregistré",
                description: myProxy
                    ? `Vous avez voté : ${label} — pour vous et pour ${myProxy.grantorName}`
                    : `Vous avez voté : ${label}`,
            })
        } catch (e: any) {
            toast({ title: "Erreur", description: e.message, variant: "destructive" })
        } finally {
            setVoting(prev => ({ ...prev, [subject.id]: false }))
        }
    }

    const handleOpen = async (subjectId: number) => {
        if (!user) return
        try {
            await openVote(subjectId, user.email ?? "", user.memberName ?? "")
            await refreshSubjects()
            toast({ title: "Vote ouvert", description: "Les membres peuvent maintenant voter." })
        } catch (e: any) {
            toast({ title: "Erreur", description: e.message, variant: "destructive" })
        }
    }

    const handleClose = async (subjectId: number) => {
        if (!user) return
        try {
            await closeVote(subjectId, user.email ?? "", user.memberName ?? "")
            await refreshSubjects()
            toast({ title: "Vote clôturé", description: "Les résultats sont maintenant visibles par tous." })
        } catch (e: any) {
            toast({ title: "Erreur", description: e.message, variant: "destructive" })
        }
    }

    const handleCreateSubject = async (payload: any) => {
        if (!user) return
        await createSubject(Number(id), payload, user.email ?? "", user.memberName ?? "")
        setShowNewForm(false)
        await refreshSubjects()
        toast({ title: "Sujet créé", description: payload.title })
    }

    if (loading) return (
        <MemberShell>
            <div className="space-y-4">
                <div className="h-32 bg-muted rounded-2xl animate-pulse" />
                {[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-muted rounded-2xl animate-pulse" />)}
            </div>
        </MemberShell>
    )

    return (
        <MemberShell>
            <div className="space-y-6">
                {/* Header session */}
                <div className="border border-border rounded-2xl p-6 bg-card/60">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                <h1 className="text-2xl font-bold">{agSession?.title}</h1>
                                {agSession?.status === "IN_PROGRESS" && (
                                    <div className="flex items-center gap-1.5 bg-green-500/15 border border-green-500/30 text-green-700 dark:text-green-300 text-xs px-2.5 py-1 rounded-full">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        En cours
                                    </div>
                                )}
                                {agSession?.status === "SCHEDULED" && (
                                    <div className="flex items-center gap-1.5 bg-blue-500/15 border border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs px-2.5 py-1 rounded-full">
                                        <Clock className="w-3 h-3" />
                                        Planifiée
                                    </div>
                                )}
                                {agSession?.status === "CLOSED" && (
                                    <div className="flex items-center gap-1.5 bg-muted border border-border text-muted-foreground text-xs px-2.5 py-1 rounded-full">
                                        <CheckCircle2 className="w-3 h-3" />
                                        Terminée
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-4 text-muted-foreground text-sm">
                                {agSession?.sessionDate && (
                                    <span>{new Date(agSession.sessionDate + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
                                )}
                                {agSession?.sessionTime && <span>{agSession.sessionTime}</span>}
                                {agSession?.location && <span>{agSession.location}</span>}
                            </div>
                        </div>
                        {isPresident && (
                            <div className="flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary text-xs px-3 py-1.5 rounded-full shrink-0">
                                <Users className="w-3.5 h-3.5" />
                                Président de séance
                            </div>
                        )}
                    </div>
                </div>

                {/* Sujets de vote */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-lg">Sujets de vote</h2>
                        {isPresident && (
                            <button
                                onClick={() => setShowNewForm(v => !v)}
                                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm px-4 py-2 rounded-xl transition-all active:scale-95"
                            >
                                <Plus className="w-4 h-4" />
                                Nouveau sujet
                            </button>
                        )}
                    </div>

                    {showNewForm && isPresident && (
                        <NewSubjectForm
                            onCancel={() => setShowNewForm(false)}
                            onCreate={handleCreateSubject}
                            onError={(msg: string) => toast({ title: "Erreur", description: msg, variant: "destructive" })}
                        />
                    )}

                    {subjects.length === 0 ? (
                        <div className="text-center py-16 border border-border rounded-2xl text-muted-foreground">
                            <VoteIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
                            <p className="font-medium mb-1">Aucun sujet de vote pour cette session</p>
                            {isPresident && <p className="text-sm opacity-70">Créez le premier sujet ci-dessus.</p>}
                        </div>
                    ) : (
                        subjects.map((subject: any) => (
                            <VoteSubjectCard
                                key={subject.id}
                                subject={subject}
                                isPresident={isPresident}
                                liveResult={liveResults[subject.id]}
                                open={expanded[subject.id] ?? false}
                                onToggle={() => toggleSubject(subject.id)}
                                onVote={handleVote}
                                onOpen={handleOpen}
                                onClose={handleClose}
                                voting={voting[subject.id] ?? false}
                                proxyFor={myProxy?.grantorName ?? null}
                            />
                        ))
                    )}
                </div>

                {/* Procurations des membres absents */}
                <ProxyPanel
                    sessionId={Number(id)}
                    sessionDate={agSession?.sessionDate}
                    proxies={proxies}
                    loading={proxiesLoading}
                    isPresident={isPresident}
                    closed={agSession?.status === "CLOSED"}
                    onReload={refreshProxies}
                />

                {/* Documents rattachés à la séance */}
                <SessionDocuments
                    sessionId={Number(id)}
                    sessionTitle={agSession?.title}
                    isPresident={isPresident}
                />
            </div>
        </MemberShell>
    )
}

// ── Création d'un sujet : motion binaire ou scrutin à candidats ───────────────

function NewSubjectForm({
    onCreate, onCancel, onError,
}: {
    onCreate: (payload: any) => Promise<void>
    onCancel: () => void
    onError: (msg: string) => void
}) {
    const [type, setType] = useState<"BINAIRE" | "CHOIX">("BINAIRE")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [candidates, setCandidates] = useState([{ label: "", description: "" }, { label: "", description: "" }])
    const [submitting, setSubmitting] = useState(false)

    const filledCandidates = candidates.filter(c => c.label.trim())
    const canSubmit = title.trim() && (type === "BINAIRE" || filledCandidates.length >= 2)

    const updateCandidate = (index: number, patch: Partial<{ label: string; description: string }>) =>
        setCandidates(list => list.map((c, i) => (i === index ? { ...c, ...patch } : c)))

    const submit = async () => {
        if (!canSubmit || submitting) return
        setSubmitting(true)
        try {
            await onCreate({
                title: title.trim(),
                description: description.trim(),
                type,
                options: type === "CHOIX"
                    ? filledCandidates.map(c => ({ label: c.label.trim(), description: c.description.trim() }))
                    : [],
            })
        } catch (e: any) {
            onError(e.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="border border-primary/30 bg-primary/5 rounded-2xl p-5 space-y-4">
            <h3 className="font-medium text-sm">Nouveau sujet de vote</h3>

            {/* Type de scrutin */}
            <div className="grid grid-cols-2 gap-2">
                {([
                    { key: "BINAIRE", label: "Motion", hint: "Pour / Contre / Abstention", icon: Scale },
                    { key: "CHOIX", label: "Scrutin", hint: "Élection entre candidats", icon: ListChecks },
                ] as const).map(({ key, label, hint, icon: Icon }) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => setType(key)}
                        className={`flex items-start gap-3 text-left p-3 rounded-xl border transition-all ${
                            type === key
                                ? "border-primary bg-primary/10"
                                : "border-border bg-background hover:border-foreground/30"
                        }`}
                    >
                        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${type === key ? "text-primary" : "text-muted-foreground"}`} />
                        <span>
                            <span className="block text-sm font-medium">{label}</span>
                            <span className="block text-xs text-muted-foreground mt-0.5">{hint}</span>
                        </span>
                    </button>
                ))}
            </div>

            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={type === "CHOIX" ? "Objet du scrutin (ex. Élection du trésorier) *" : "Titre du sujet *"}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground"
                autoFocus
            />
            <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Description (optionnel)"
                rows={2}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground resize-none"
            />

            {/* Candidats */}
            {type === "CHOIX" && (
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                            Candidats / choix
                        </label>
                        <span className="text-xs text-muted-foreground">{filledCandidates.length} renseigné(s) · 2 minimum</span>
                    </div>

                    {candidates.map((candidate, index) => (
                        <div key={index} className="flex items-start gap-2">
                            <div
                                className="w-7 h-7 mt-1 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold text-white"
                                style={{ background: colorForIndex(index) }}
                            >
                                {index + 1}
                            </div>
                            <div className="flex-1 space-y-1.5">
                                <input
                                    value={candidate.label}
                                    onChange={e => updateCandidate(index, { label: e.target.value })}
                                    placeholder={`Nom du candidat ${index + 1}`}
                                    className="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground"
                                />
                                <input
                                    value={candidate.description}
                                    onChange={e => updateCandidate(index, { description: e.target.value })}
                                    placeholder="Précision (optionnel)"
                                    className="w-full bg-background border border-border rounded-xl px-4 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => setCandidates(list => list.filter((_, i) => i !== index))}
                                disabled={candidates.length <= 2}
                                title={candidates.length <= 2 ? "Deux candidats minimum" : "Retirer ce candidat"}
                                className="mt-1 p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-500/10 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => setCandidates(list => [...list, { label: "", description: "" }])}
                        className="flex items-center gap-1.5 text-primary text-sm px-1 py-1 hover:underline"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Ajouter un candidat
                    </button>
                </div>
            )}

            <div className="flex gap-2">
                <button
                    onClick={submit}
                    disabled={!canSubmit || submitting}
                    className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground text-sm px-4 py-2 rounded-xl transition-all active:scale-95"
                >
                    {submitting ? "Création…" : "Créer"}
                </button>
                <button onClick={onCancel} className="text-muted-foreground hover:text-foreground text-sm px-4 py-2 rounded-xl transition-all">
                    Annuler
                </button>
            </div>
        </div>
    )
}

// ── Carte sujet (accordéon) ───────────────────────────────────────────────────

function VoteSubjectCard({
    subject, isPresident, liveResult, open, onToggle, onVote, onOpen, onClose, voting, proxyFor,
}: {
    subject: any
    isPresident: boolean
    liveResult?: any
    open: boolean
    onToggle: () => void
    onVote: (subject: any, ballot: { choice?: string; optionId?: number }) => Promise<void>
    onOpen: (id: number) => Promise<void>
    onClose: (id: number) => Promise<void>
    voting: boolean
    /** Nom du membre absent dont le votant porte la procuration, le cas échéant. */
    proxyFor?: string | null
}) {
    const [pending, setPending] = useState<string | null>(null)
    const results = liveResult ?? subject.results
    const elapsed = useElapsedTime(subject.status === "OPEN" ? subject.openedAt : undefined)
    const choiceVote = isChoice(subject)

    const statusBadge: Record<string, ReactElement> = {
        PENDING: <span className="flex items-center gap-1.5 text-muted-foreground text-xs"><Clock className="w-3.5 h-3.5" />En attente</span>,
        OPEN: (
            <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400 text-xs">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Vote ouvert
                {elapsed && <span className="flex items-center gap-1 opacity-60 ml-1"><Timer className="w-3 h-3" />{elapsed}</span>}
            </span>
        ),
        CLOSED: <span className="flex items-center gap-1.5 text-muted-foreground text-xs"><CheckCircle2 className="w-3.5 h-3.5" />Terminé</span>,
    }

    const submitBallot = async (key: string, ballot: { choice?: string; optionId?: number }) => {
        setPending(key)
        await onVote(subject, ballot)
        setPending(null)
    }

    const showResults = isPresident || subject.status === "CLOSED"

    return (
        <div className={`border rounded-2xl transition-all duration-300 ${
            subject.status === "OPEN"
                ? "border-green-500/30 bg-green-500/5"
                : subject.status === "CLOSED"
                ? "border-border bg-card/30"
                : "border-border bg-card/60"
        }`}>
            {/* En-tête cliquable */}
            <div className="flex items-start gap-3 p-4 sm:p-5">
                <button
                    onClick={onToggle}
                    aria-expanded={open}
                    className="flex flex-1 min-w-0 items-start gap-3 text-left group"
                >
                    <ChevronDown
                        className={`w-4 h-4 mt-1 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:text-foreground ${open ? "rotate-180" : ""}`}
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold">{subject.title}</h3>
                            {choiceVote && (
                                <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300">
                                    <ListChecks className="w-3 h-3" />
                                    Scrutin
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-3 flex-wrap mt-1">
                            {statusBadge[subject.status]}
                            {results?.total > 0 && (
                                <span className="text-xs text-muted-foreground">{results.total} vote(s)</span>
                            )}
                            {subject.hasVoted && (
                                <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Vous avez voté
                                </span>
                            )}
                            {!open && subject.status === "OPEN" && !subject.hasVoted && (
                                <span className="text-xs text-primary font-medium">Cliquez pour voter</span>
                            )}
                        </div>
                    </div>
                </button>

                {/* Actions président — hors du bouton d'accordéon */}
                <div className="flex items-center gap-2 shrink-0">
                    {isPresident && subject.status === "PENDING" && (
                        <button
                            onClick={() => onOpen(subject.id)}
                            className="flex items-center gap-1.5 bg-green-500/15 border border-green-500/30 text-green-700 dark:text-green-300 text-xs px-3 py-1.5 rounded-lg hover:bg-green-500/25 transition-all active:scale-95"
                        >
                            <Play className="w-3 h-3" />Ouvrir
                        </button>
                    )}
                    {isPresident && subject.status === "OPEN" && (
                        <button
                            onClick={() => onClose(subject.id)}
                            className="flex items-center gap-1.5 bg-red-500/15 border border-red-500/30 text-red-700 dark:text-red-300 text-xs px-3 py-1.5 rounded-lg hover:bg-red-500/25 transition-all active:scale-95"
                        >
                            <Square className="w-3 h-3" />Fermer
                        </button>
                    )}
                </div>
            </div>

            {/* Corps repliable */}
            <div
                className={`grid transition-all duration-300 ease-out ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">
                    <div className="px-4 sm:px-5 pb-5 pt-0 space-y-4">
                        {subject.description && (
                            <p className="text-muted-foreground text-sm">{subject.description}</p>
                        )}

                        {/* Procuration : le membre vote pour deux */}
                        {proxyFor && subject.status === "OPEN" && !subject.hasVoted && (
                            <p className="flex items-center gap-2 text-primary text-xs bg-primary/10 border border-primary/20 rounded-xl px-3.5 py-2">
                                <UserCheck className="w-3.5 h-3.5 shrink-0" />
                                Votre bulletin comptera aussi pour {proxyFor} (procuration).
                            </p>
                        )}

                        {/* Bulletin */}
                        {subject.status === "OPEN" && !subject.hasVoted && (
                            choiceVote ? (
                                <div className="space-y-2">
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                                        Choisissez un candidat
                                    </p>
                                    {(subject.options ?? []).map((option: any, index: number) => (
                                        <button
                                            key={option.id}
                                            onClick={() => submitBallot(`opt-${option.id}`, { optionId: option.id })}
                                            disabled={voting}
                                            className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-150 disabled:opacity-60 hover:bg-muted/60 active:scale-[0.99] ${
                                                pending === `opt-${option.id}` ? "scale-[0.98] opacity-70 border-primary" : "border-border bg-background"
                                            }`}
                                            style={{ borderLeftWidth: 4, borderLeftColor: colorForIndex(index) }}
                                        >
                                            <span className="flex-1 min-w-0">
                                                <span className="block font-medium text-sm truncate">{option.label}</span>
                                                {option.description && (
                                                    <span className="block text-xs text-muted-foreground mt-0.5 truncate">{option.description}</span>
                                                )}
                                            </span>
                                            {voting && pending === `opt-${option.id}` ? (
                                                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin shrink-0" />
                                            ) : (
                                                <span className="w-4 h-4 rounded-full border-2 border-muted-foreground/40 shrink-0" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 gap-2">
                                    {VOTE_OPTIONS.map(({ key, label, icon: Icon, color }) => (
                                        <button
                                            key={key}
                                            onClick={() => submitBallot(key, { choice: key })}
                                            disabled={voting}
                                            className={`flex flex-col items-center gap-2 py-4 rounded-xl border font-medium text-sm transition-all duration-150 disabled:opacity-60 ${color} ${
                                                pending === key ? "scale-90 opacity-70" : ""
                                            }`}
                                        >
                                            <Icon className={`w-5 h-5 transition-transform ${pending === key ? "scale-110" : ""}`} />
                                            {voting && pending === key ? (
                                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            ) : label}
                                        </button>
                                    ))}
                                </div>
                            )
                        )}

                        {/* Confirmation vote */}
                        {subject.hasVoted && (
                            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2.5">
                                <CheckCircle2 className="w-4 h-4 shrink-0" />
                                <span>
                                    Votre vote : <strong>
                                        {choiceVote
                                            ? subject.myVote
                                            : VOTE_OPTIONS.find(o => o.key === subject.myVote)?.label ?? subject.myVote}
                                    </strong>
                                    {proxyFor && <> — déposé pour vous et pour <strong>{proxyFor}</strong></>}
                                </span>
                            </div>
                        )}

                        {subject.status === "PENDING" && (
                            <p className="text-sm text-muted-foreground italic">
                                Le vote n'est pas encore ouvert par le président de séance.
                            </p>
                        )}

                        {/* Résultats */}
                        {showResults && results && results.total > 0 && (
                            choiceVote
                                ? <ChoiceResults results={results} live={subject.status === "OPEN"} />
                                : <BinaryResults results={results} isPresident={isPresident} live={subject.status === "OPEN"} />
                        )}

                        {showResults && (!results || results.total === 0) && subject.status !== "PENDING" && (
                            <p className="text-sm text-muted-foreground italic">Aucun vote enregistré pour l'instant.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ── Résultats d'un scrutin à candidats ────────────────────────────────────────

function ChoiceResults({ results, live }: { results: any; live: boolean }) {
    const options = results.options ?? []
    const chartData = options.map((o: any) => ({ name: o.label, value: o.votes, pct: o.percent }))

    return (
        <div className="bg-muted/50 rounded-xl p-4 space-y-4">
            <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Résultats — {results.total} bulletin(s)</span>
                {live && <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse ml-1" />}
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-6">
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie data={chartData} dataKey="value" cx="50%" cy="50%" outerRadius={75} paddingAngle={3}>
                            {chartData.map((_: any, idx: number) => <Cell key={idx} fill={colorForIndex(idx)} />)}
                        </Pie>
                        <Tooltip
                            formatter={(value: number, name: string, props: any) => [
                                `${value} (${props.payload.pct?.toFixed(1)}%)`, name
                            ]}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>

                <div className="w-full lg:w-auto lg:min-w-[240px] space-y-3">
                    {options.map((option: any, idx: number) => {
                        const isWinner = results.winnerOptionId === option.id
                        return (
                            <div key={option.id}>
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-3 h-3 rounded-full shrink-0" style={{ background: colorForIndex(idx) }} />
                                    <span className={`text-sm flex-1 truncate ${isWinner ? "font-semibold" : "text-muted-foreground"}`}>
                                        {option.label}
                                    </span>
                                    {isWinner && <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                                    <span className="font-semibold text-sm">{option.votes}</span>
                                    <span className="text-muted-foreground text-xs w-12 text-right">
                                        {option.percent?.toFixed(1)}%
                                    </span>
                                </div>
                                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-700"
                                        style={{ width: `${option.percent ?? 0}%`, background: colorForIndex(idx) }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {!live && (
                <p className="text-xs text-muted-foreground">
                    {results.winnerOptionId
                        ? <>Élu(e) : <strong className="text-foreground">
                            {options.find((o: any) => o.id === results.winnerOptionId)?.label}
                          </strong></>
                        : "Égalité — aucun candidat ne se détache."}
                </p>
            )}
        </div>
    )
}

// ── Résultats d'une motion binaire ────────────────────────────────────────────

function BinaryResults({ results, isPresident, live }: { results: any; isPresident: boolean; live: boolean }) {
    const rows = [
        { name: "Pour", value: results.pour, pct: results.pourPercent, textColor: "text-green-600 dark:text-green-400" },
        { name: "Contre", value: results.contre, pct: results.contrePercent, textColor: "text-red-600 dark:text-red-400" },
        { name: "Abstention", value: results.abstention, pct: results.abstentionPercent, textColor: "text-amber-600 dark:text-amber-400" },
    ]

    // Le président suit le scrutin en direct avec le camembert ; les membres
    // voient la synthèse en barres une fois le vote clôturé.
    if (!isPresident) {
        return (
            <div className="space-y-3">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Résultats finaux · {results.total} votes
                </p>
                {rows.map(({ name, value, pct, textColor }, idx) => (
                    <div key={name}>
                        <div className="flex items-center justify-between mb-1">
                            <span className={`text-sm font-medium ${textColor}`}>{name}</span>
                            <span className="text-sm text-muted-foreground">{value} ({pct?.toFixed(1)}%)</span>
                        </div>
                        <div className="h-2 bg-border rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-1000"
                                style={{ width: `${pct ?? 0}%`, background: CHART_COLORS[idx] }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="bg-muted/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Résultats — {results.total} vote(s)</span>
                {live && <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse ml-1" />}
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-6">
                <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                        <Pie data={rows.map(r => ({ name: r.name, value: r.value, pct: r.pct }))}
                             dataKey="value" cx="50%" cy="50%" outerRadius={70} paddingAngle={3}>
                            {rows.map((_, idx) => <Cell key={idx} fill={CHART_COLORS[idx]} />)}
                        </Pie>
                        <Tooltip
                            formatter={(value: number, name: string, props: any) => [
                                `${value} (${props.payload.pct?.toFixed(1)}%)`, name
                            ]}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
                <div className="w-full lg:w-auto lg:min-w-[180px] space-y-3">
                    {rows.map(({ name, value, pct }, idx) => (
                        <div key={name}>
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: CHART_COLORS[idx] }} />
                                <span className="text-sm text-muted-foreground flex-1">{name}</span>
                                <span className="font-semibold text-sm">{value}</span>
                                <span className="text-muted-foreground text-xs w-12 text-right">{pct?.toFixed(1)}%</span>
                            </div>
                            <div className="h-1.5 bg-border rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{ width: `${pct ?? 0}%`, background: CHART_COLORS[idx] }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function VoteIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polyline points="9 11 12 14 22 4"/>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
    )
}
