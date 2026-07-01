"use client"

import { useSession } from "next-auth/react"
import MemberShell from "@/components/membres/MemberShell"
import { useEffect, useState } from "react"
import { getActiveSessions, getSessions, getDocuments } from "@/lib/members-api"
import Link from "next/link"
import { Vote, FileText, Calendar, BarChart2, ArrowRight, Clock, MapPin, TrendingUp } from "lucide-react"

export default function DashboardPage() {
    const { data: session } = useSession()
    const [activeSessions, setActiveSessions] = useState<any[]>([])
    const [allSessions, setAllSessions] = useState<any[]>([])
    const [recentDocs, setRecentDocs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([getActiveSessions(), getSessions(), getDocuments()])
            .then(([active, all, docs]) => {
                setActiveSessions(active)
                setAllSessions(all as any[])
                setRecentDocs((docs as any[]).slice(0, 5))
            })
            .finally(() => setLoading(false))
    }, [])

    const user = session?.user
    const hour = new Date().getHours()
    const greeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir"

    const today = new Date().toISOString().split("T")[0]
    const nextAG = allSessions
        .filter((s: any) => s.status === "SCHEDULED" && s.sessionDate >= today)
        .sort((a: any, b: any) => a.sessionDate.localeCompare(b.sessionDate))[0] ?? null

    const nextAGLabel = nextAG
        ? new Date(nextAG.sessionDate + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
        : "—"

    return (
        <MemberShell>
            <div className="space-y-8">

                {/* ── Hero greeting ── */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">{greeting} 👋</p>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {user?.memberName ?? user?.name?.split(" ")[0] ?? "Membre"}
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            {user?.memberRole || "Membre CE"}
                            {user?.memberCampus ? <span className="ml-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5">{user.memberCampus}</span> : null}
                        </p>
                    </div>
                </div>

                {/* ── AG en cours (IN_PROGRESS) ── */}
                {activeSessions.length > 0 && (
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                            </span>
                            <h2 className="font-semibold text-green-600 dark:text-green-400 text-sm uppercase tracking-wide">AG en cours</h2>
                        </div>
                        <div className="space-y-3">
                            {activeSessions.map((s: any) => (
                                <Link key={s.id} href={`/membres/ag/${s.id}`}>
                                    <div className="group relative overflow-hidden bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/30 rounded-2xl p-5 hover:border-green-500/50 transition-all">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-bold text-green-800 dark:text-green-200 text-lg">{s.title}</h3>
                                                <div className="flex items-center gap-3 text-green-600 dark:text-green-400 text-sm mt-1">
                                                    {s.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{s.location}</span>}
                                                    {s.sessionTime && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{s.sessionTime}</span>}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {s.voteSubjects?.filter((v: any) => v.status === "OPEN").length > 0 && (
                                                    <span className="flex items-center gap-1.5 bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                                                        <Vote className="w-3.5 h-3.5" />
                                                        {s.voteSubjects.filter((v: any) => v.status === "OPEN").length} vote(s)
                                                    </span>
                                                )}
                                                <ArrowRight className="w-5 h-5 text-green-500 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── Prochaine AG planifiée ── */}
                {nextAG && activeSessions.length === 0 && (
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <Calendar className="w-4 h-4 text-amber-500" />
                            <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Prochaine AG</h2>
                        </div>
                        <Link href={`/membres/ag/${nextAG.id}`}>
                            <div className="group relative overflow-hidden bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-5 hover:border-amber-500/50 transition-all">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-amber-800 dark:text-amber-200 text-lg">{nextAG.title}</h3>
                                        <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400 text-sm mt-1">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(nextAG.sessionDate + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                                            </span>
                                            {nextAG.sessionTime && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{nextAG.sessionTime}</span>}
                                            {nextAG.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{nextAG.location}</span>}
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-amber-500 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </section>
                )}

                {/* ── Stats ── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        label="AG planifiées"
                        value={loading ? "…" : allSessions.filter((s: any) => s.status === "SCHEDULED").length}
                        icon={Calendar}
                        iconColor="text-primary"
                        iconBg="bg-primary/10"
                        href="/membres/ag"
                    />
                    <StatCard
                        label="Documents"
                        value={loading ? "…" : recentDocs.length}
                        icon={FileText}
                        iconColor="text-secondary"
                        iconBg="bg-secondary/10"
                        href="/membres/bibliotheque"
                    />
                    <StatCard
                        label="Prochaine AG"
                        value={loading ? "…" : nextAGLabel}
                        icon={TrendingUp}
                        iconColor="text-amber-500"
                        iconBg="bg-amber-500/10"
                        href="/membres/ag"
                    />
                    <StatCard
                        label="Total AG"
                        value={loading ? "…" : allSessions.length}
                        icon={BarChart2}
                        iconColor="text-tertiary"
                        iconBg="bg-tertiary/10"
                        href="/membres/ag"
                    />
                </div>

                {/* ── Documents récents ── */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-bold text-lg">Documents récents</h2>
                        <Link href="/membres/bibliotheque" className="text-sm text-primary hover:underline flex items-center gap-1 font-medium">
                            Tout voir <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="space-y-2">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 animate-pulse">
                                    <div className="w-9 h-9 rounded-lg bg-muted shrink-0" />
                                    <div className="flex-1 space-y-1.5">
                                        <div className="h-3.5 bg-muted rounded w-2/3" />
                                        <div className="h-3 bg-muted rounded w-1/2" />
                                    </div>
                                    <div className="w-20 h-7 bg-muted rounded-lg shrink-0" />
                                </div>
                            ))}
                        </div>
                    ) : recentDocs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-border rounded-2xl text-muted-foreground">
                            <FileText className="w-8 h-8 mb-2 opacity-40" />
                            <p className="text-sm">Aucun document disponible</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {recentDocs.map((doc: any) => (
                                <div key={doc.id} className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:bg-muted/50 hover:border-primary/20 transition-all group">
                                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <FileText className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm truncate">{doc.title}</p>
                                        <p className="text-muted-foreground text-xs mt-0.5">
                                            {doc.type.replace(/_/g, " ")} · {doc.authorName}
                                        </p>
                                    </div>
                                    {doc.fileUrl && (
                                        <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer"
                                            className="shrink-0 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors">
                                            Télécharger
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </MemberShell>
    )
}

function StatCard({ label, value, icon: Icon, iconColor, iconBg, href }: {
    label: string
    value: string | number
    icon: any
    iconColor: string
    iconBg: string
    href: string
}) {
    return (
        <Link href={href}>
            <div className="group bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
                <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <p className="text-2xl font-bold tracking-tight">{value}</p>
                <p className="text-muted-foreground text-sm mt-1 font-medium">{label}</p>
            </div>
        </Link>
    )
}
