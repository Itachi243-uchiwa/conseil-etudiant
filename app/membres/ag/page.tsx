"use client"

import MemberShell from "@/components/membres/MemberShell"
import { useEffect, useState } from "react"
import { getSessions } from "@/lib/members-api"
import Link from "next/link"
import { Calendar, MapPin, Clock, ChevronRight, Vote } from "lucide-react"

const STATUS_CONFIG = {
    SCHEDULED: { label: "Planifiée", color: "bg-blue-500/15 text-blue-600 border-blue-500/30 dark:text-blue-300" },
    IN_PROGRESS: { label: "En cours", color: "bg-green-500/15 text-green-600 border-green-500/30 dark:text-green-300" },
    CLOSED: { label: "Terminée", color: "bg-muted text-muted-foreground border-border" },
}

export default function AGListPage() {
    const [sessions, setSessions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<string>("ALL")

    useEffect(() => {
        getSessions().then(setSessions).finally(() => setLoading(false))
    }, [])

    const filtered = filter === "ALL" ? sessions : sessions.filter((s: any) => s.status === filter)

    return (
        <MemberShell>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Assemblées Générales</h1>
                    <p className="text-muted-foreground mt-1">Participez aux votes et consultez les sessions passées</p>
                </div>

                {/* Filtres */}
                <div className="flex gap-2 flex-wrap">
                    {[["ALL", "Toutes"], ["SCHEDULED", "Planifiées"], ["IN_PROGRESS", "En cours"], ["CLOSED", "Terminées"]].map(([val, label]) => (
                        <button
                            key={val}
                            onClick={() => setFilter(val)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                                filter === val
                                    ? "bg-primary border-primary text-primary-foreground"
                                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Liste */}
                {loading ? (
                    <div className="space-y-3">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="border border-border bg-card/60 rounded-2xl p-5 animate-pulse">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 space-y-2.5">
                                        <div className="flex items-center gap-3">
                                            <div className="h-5 bg-muted rounded w-48" />
                                            <div className="h-5 bg-muted rounded-full w-20" />
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="h-4 bg-muted rounded w-36" />
                                            <div className="h-4 bg-muted rounded w-16" />
                                        </div>
                                    </div>
                                    <div className="w-5 h-5 bg-muted rounded shrink-0 mt-1" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground">
                        <Vote className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p>Aucune assemblée générale</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filtered.map((s: any) => {
                            const cfg = STATUS_CONFIG[s.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.SCHEDULED
                            const openVotes = s.voteSubjects?.filter((v: any) => v.status === "OPEN").length ?? 0
                            return (
                                <Link key={s.id} href={`/membres/ag/${s.id}`}>
                                    <div className={`border rounded-2xl p-5 hover:bg-muted/50 transition-all group cursor-pointer ${
                                        s.status === "IN_PROGRESS" ? "border-green-500/30 bg-green-500/5" : "border-border bg-card/60"
                                    }`}>
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-semibold truncate">{s.title}</h3>
                                                    <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.color}`}>
                                                        {cfg.label}
                                                    </span>
                                                    {s.status === "IN_PROGRESS" && (
                                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4 text-muted-foreground text-sm">
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        {new Date(s.sessionDate + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                                                    </span>
                                                    {s.sessionTime && (
                                                        <span className="flex items-center gap-1.5">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            {s.sessionTime}
                                                        </span>
                                                    )}
                                                    {s.location && (
                                                        <span className="flex items-center gap-1.5">
                                                            <MapPin className="w-3.5 h-3.5" />
                                                            {s.location}
                                                        </span>
                                                    )}
                                                </div>
                                                {openVotes > 0 && (
                                                    <div className="mt-2 flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
                                                        <Vote className="w-4 h-4" />
                                                        <span className="font-medium">{openVotes} vote(s) ouvert(s) — Rejoindre maintenant</span>
                                                    </div>
                                                )}
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        </MemberShell>
    )
}
