"use client"

import { use, useEffect, useState, useRef, useCallback, type ReactElement } from "react"
import { useSession } from "next-auth/react"
import MemberShell from "@/components/membres/MemberShell"
import { getSession, getSubjects, castVote, openVote, closeVote, createSubject } from "@/lib/members-api"
import { useToast } from "@/hooks/use-toast"
import { ThumbsUp, ThumbsDown, Minus, Plus, Play, Square, BarChart3, CheckCircle2, Clock, Users, Timer } from "lucide-react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

const VOTE_OPTIONS = [
    { key: "POUR", label: "Pour", icon: ThumbsUp, color: "bg-green-500/15 border-green-500/40 text-green-700 dark:text-green-300 hover:bg-green-500/25 active:scale-95" },
    { key: "CONTRE", label: "Contre", icon: ThumbsDown, color: "bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300 hover:bg-red-500/25 active:scale-95" },
    { key: "ABSTENTION", label: "Abstention", icon: Minus, color: "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300 hover:bg-amber-500/25 active:scale-95" },
]

const CHART_COLORS = ["#22c55e", "#ef4444", "#f59e0b"]

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
    const [loading, setLoading] = useState(true)
    const [voting, setVoting] = useState<Record<number, boolean>>({})
    const [newSubjectTitle, setNewSubjectTitle] = useState("")
    const [newSubjectDesc, setNewSubjectDesc] = useState("")
    const [showNewForm, setShowNewForm] = useState(false)
    const [liveResults, setLiveResults] = useState<Record<number, any>>({})
    const sseRefs = useRef<Record<number, EventSource>>({})

    const user = session?.user
    const isPresident = !!(user?.email && agSession?.presidentEmail?.toLowerCase() === user.email.toLowerCase())

    const refreshSubjects = useCallback(async () => {
        const subs = await getSubjects(Number(id), user?.email ?? "", user?.memberName ?? "")
        setSubjects(Array.isArray(subs) ? subs : [])
    }, [id, user])

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

    const handleVote = async (subjectId: number, choice: string) => {
        if (!user) return
        setVoting(prev => ({ ...prev, [subjectId]: true }))
        try {
            await castVote(subjectId, choice, user.email ?? "", user.memberName ?? "")
            await refreshSubjects()
            const label = VOTE_OPTIONS.find(o => o.key === choice)?.label ?? choice
            toast({ title: "Vote enregistré", description: `Vous avez voté : ${label}` })
        } catch (e: any) {
            toast({ title: "Erreur", description: e.message, variant: "destructive" })
        } finally {
            setVoting(prev => ({ ...prev, [subjectId]: false }))
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

    const handleCreateSubject = async () => {
        if (!newSubjectTitle.trim() || !user) return
        try {
            await createSubject(Number(id), { title: newSubjectTitle, description: newSubjectDesc }, user.email ?? "", user.memberName ?? "")
            setNewSubjectTitle("")
            setNewSubjectDesc("")
            setShowNewForm(false)
            await refreshSubjects()
            toast({ title: "Sujet créé", description: newSubjectTitle })
        } catch (e: any) {
            toast({ title: "Erreur", description: e.message, variant: "destructive" })
        }
    }

    if (loading) return (
        <MemberShell>
            <div className="space-y-4">
                <div className="h-32 bg-muted rounded-2xl animate-pulse" />
                {[...Array(3)].map((_, i) => <div key={i} className="h-48 bg-muted rounded-2xl animate-pulse" />)}
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
                <div className="space-y-4">
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
                        <div className="border border-primary/30 bg-primary/5 rounded-2xl p-5 space-y-3">
                            <h3 className="font-medium text-sm">Nouveau sujet de vote</h3>
                            <input
                                value={newSubjectTitle}
                                onChange={e => setNewSubjectTitle(e.target.value)}
                                placeholder="Titre du sujet *"
                                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground"
                                onKeyDown={e => e.key === "Enter" && handleCreateSubject()}
                                autoFocus
                            />
                            <textarea
                                value={newSubjectDesc}
                                onChange={e => setNewSubjectDesc(e.target.value)}
                                placeholder="Description (optionnel)"
                                rows={2}
                                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground resize-none"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCreateSubject}
                                    disabled={!newSubjectTitle.trim()}
                                    className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground text-sm px-4 py-2 rounded-xl transition-all active:scale-95"
                                >
                                    Créer
                                </button>
                                <button onClick={() => setShowNewForm(false)} className="text-muted-foreground hover:text-foreground text-sm px-4 py-2 rounded-xl transition-all">
                                    Annuler
                                </button>
                            </div>
                        </div>
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
                                onVote={handleVote}
                                onOpen={handleOpen}
                                onClose={handleClose}
                                voting={voting[subject.id] ?? false}
                            />
                        ))
                    )}
                </div>
            </div>
        </MemberShell>
    )
}

function VoteSubjectCard({
    subject, isPresident, liveResult, onVote, onOpen, onClose, voting
}: {
    subject: any
    isPresident: boolean
    liveResult?: any
    onVote: (id: number, choice: string) => Promise<void>
    onOpen: (id: number) => Promise<void>
    onClose: (id: number) => Promise<void>
    voting: boolean
}) {
    const [pressedKey, setPressedKey] = useState<string | null>(null)
    const results = liveResult ?? subject.results
    const elapsed = useElapsedTime(subject.status === "OPEN" ? subject.openedAt : undefined)

    const chartData = results ? [
        { name: "Pour", value: results.pour, pct: results.pourPercent },
        { name: "Contre", value: results.contre, pct: results.contrePercent },
        { name: "Abstention", value: results.abstention, pct: results.abstentionPercent },
    ] : []

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

    const handleVoteClick = async (key: string) => {
        setPressedKey(key)
        await onVote(subject.id, key)
        setPressedKey(null)
    }

    return (
        <div className={`border rounded-2xl p-5 transition-all duration-300 ${
            subject.status === "OPEN"
                ? "border-green-500/30 bg-green-500/5"
                : subject.status === "CLOSED"
                ? "border-border bg-card/30"
                : "border-border bg-card/60"
        }`}>
            <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                    <h3 className="font-semibold">{subject.title}</h3>
                    {subject.description && <p className="text-muted-foreground text-sm mt-1">{subject.description}</p>}
                </div>
                <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                    {statusBadge[subject.status]}
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

            {/* Boutons de vote */}
            {subject.status === "OPEN" && !subject.hasVoted && (
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {VOTE_OPTIONS.map(({ key, label, icon: Icon, color }) => (
                        <button
                            key={key}
                            onClick={() => handleVoteClick(key)}
                            disabled={voting}
                            className={`flex flex-col items-center gap-2 py-4 rounded-xl border font-medium text-sm transition-all duration-150 disabled:opacity-60 ${color} ${
                                pressedKey === key ? "scale-90 opacity-70" : ""
                            }`}
                        >
                            <Icon className={`w-5 h-5 transition-transform ${pressedKey === key ? "scale-110" : ""}`} />
                            {voting && pressedKey === key ? (
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : label}
                        </button>
                    ))}
                </div>
            )}

            {/* Confirmation vote */}
            {subject.hasVoted && (
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400 text-sm mb-4 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Votre vote : <strong>{VOTE_OPTIONS.find(o => o.key === subject.myVote)?.label ?? subject.myVote}</strong></span>
                </div>
            )}

            {/* Graphique résultats président (temps réel) */}
            {isPresident && results && results.total > 0 && (
                <div className="mt-4 bg-muted/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-4">
                        <BarChart3 className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Résultats — {results.total} vote(s)</span>
                        {subject.status === "OPEN" && <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse ml-1" />}
                    </div>
                    <div className="flex flex-col lg:flex-row items-center gap-6">
                        <ResponsiveContainer width="100%" height={180}>
                            <PieChart>
                                <Pie data={chartData} dataKey="value" cx="50%" cy="50%" outerRadius={70} paddingAngle={3}>
                                    {chartData.map((_, idx) => <Cell key={idx} fill={CHART_COLORS[idx]} />)}
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
                            {chartData.map(({ name, value, pct }, idx) => (
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
            )}

            {/* Résultats après clôture (tous les membres) */}
            {subject.status === "CLOSED" && results && results.total > 0 && (
                <div className="mt-4 space-y-3">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Résultats finaux · {results.total} votes</p>
                    {[
                        { label: "Pour", value: results.pour, pct: results.pourPercent, color: "#22c55e", textColor: "text-green-600 dark:text-green-400" },
                        { label: "Contre", value: results.contre, pct: results.contrePercent, color: "#ef4444", textColor: "text-red-600 dark:text-red-400" },
                        { label: "Abstention", value: results.abstention, pct: results.abstentionPercent, color: "#f59e0b", textColor: "text-amber-600 dark:text-amber-400" },
                    ].map(({ label, value, pct, color, textColor }) => (
                        <div key={label}>
                            <div className="flex items-center justify-between mb-1">
                                <span className={`text-sm font-medium ${textColor}`}>{label}</span>
                                <span className="text-sm text-muted-foreground">{value} ({pct?.toFixed(1)}%)</span>
                            </div>
                            <div className="h-2 bg-border rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-1000"
                                    style={{ width: `${pct ?? 0}%`, background: color }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
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
