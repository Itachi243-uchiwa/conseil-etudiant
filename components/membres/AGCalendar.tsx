"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Clock, MapPin, CalendarDays } from "lucide-react"

const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]

const STATUS_DOT: Record<string, string> = {
    SCHEDULED: "bg-blue-500",
    IN_PROGRESS: "bg-green-500",
    CLOSED: "bg-muted-foreground/40",
}

const STATUS_LABEL: Record<string, string> = {
    SCHEDULED: "Planifiée",
    IN_PROGRESS: "En cours",
    CLOSED: "Terminée",
}

const pad = (n: number) => String(n).padStart(2, "0")
const dayKey = (year: number, month: number, day: number) => `${year}-${pad(month + 1)}-${pad(day)}`

/** `yyyy-MM-dd` → date locale à midi : évite le décalage de fuseau à l'affichage. */
const atNoon = (iso: string) => new Date(`${iso}T12:00:00`)

/**
 * Calendrier des assemblées générales — visible par tous les membres.
 * Les séances sont posées sur une grille mensuelle ; le jour sélectionné
 * détaille ses séances sous le calendrier.
 */
export default function AGCalendar({ sessions, loading }: { sessions: any[]; loading: boolean }) {
    const today = new Date()
    const todayKey = dayKey(today.getFullYear(), today.getMonth(), today.getDate())

    const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
    const [selected, setSelected] = useState<string | null>(null)

    const year = cursor.getFullYear()
    const month = cursor.getMonth()

    /** Séances indexées par date, une date pouvant en porter plusieurs. */
    const byDate = useMemo(() => {
        const map = new Map<string, any[]>()
        sessions.forEach(s => {
            if (!s.sessionDate) return
            const list = map.get(s.sessionDate) ?? []
            list.push(s)
            map.set(s.sessionDate, list)
        })
        return map
    }, [sessions])

    // Semaine démarrée le lundi : getDay() renvoie 0 pour dimanche.
    const leading = (new Date(year, month, 1).getDay() + 6) % 7
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells: (number | null)[] = [
        ...Array(leading).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ]
    while (cells.length % 7 !== 0) cells.push(null)

    const monthSessions = sessions
        .filter(s => s.sessionDate?.startsWith(`${year}-${pad(month + 1)}`))
        .sort((a, b) => a.sessionDate.localeCompare(b.sessionDate))

    const detailed = selected ? byDate.get(selected) ?? [] : monthSessions

    const shift = (delta: number) => {
        setCursor(new Date(year, month + delta, 1))
        setSelected(null)
    }

    return (
        <div className="space-y-4">
            {/* En-tête : mois courant et navigation */}
            <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold text-lg capitalize">
                    {cursor.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                </h2>
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => shift(-1)}
                        aria-label="Mois précédent"
                        className="p-2 rounded-xl border border-border hover:bg-muted transition-all active:scale-95"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => { setCursor(new Date(today.getFullYear(), today.getMonth(), 1)); setSelected(null) }}
                        className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-sm transition-all active:scale-95"
                    >
                        Aujourd'hui
                    </button>
                    <button
                        onClick={() => shift(1)}
                        aria-label="Mois suivant"
                        className="p-2 rounded-xl border border-border hover:bg-muted transition-all active:scale-95"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Grille du mois */}
            <div className="border border-border rounded-2xl bg-card/60 p-3 sm:p-4">
                <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-1.5">
                    {WEEKDAYS.map(d => (
                        <div key={d} className="text-center text-[11px] font-semibold text-muted-foreground uppercase tracking-wide py-1">
                            {d}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                    {cells.map((day, index) => {
                        if (day === null) return <div key={`empty-${index}`} className="aspect-square" />

                        const key = dayKey(year, month, day)
                        const daySessions = byDate.get(key) ?? []
                        const isToday = key === todayKey
                        const isSelected = key === selected

                        return (
                            <button
                                key={key}
                                onClick={() => setSelected(isSelected ? null : key)}
                                disabled={loading}
                                title={daySessions.map((s: any) => s.title).join(" · ") || undefined}
                                className={`aspect-square rounded-xl border flex flex-col items-center justify-center gap-1 text-sm transition-all ${
                                    isSelected
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : daySessions.length > 0
                                        ? "border-primary/30 bg-primary/5 hover:bg-primary/10 font-semibold"
                                        : "border-transparent hover:bg-muted text-muted-foreground"
                                } ${isToday && !isSelected ? "ring-1 ring-primary/60" : ""}`}
                            >
                                <span>{day}</span>
                                {daySessions.length > 0 && (
                                    <span className="flex items-center gap-0.5">
                                        {daySessions.slice(0, 3).map((s: any) => (
                                            <span
                                                key={s.id}
                                                className={`w-1.5 h-1.5 rounded-full ${
                                                    isSelected ? "bg-primary-foreground" : STATUS_DOT[s.status] ?? "bg-primary"
                                                }`}
                                            />
                                        ))}
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Légende */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                {Object.entries(STATUS_LABEL).map(([status, label]) => (
                    <span key={status} className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[status]}`} />
                        {label}
                    </span>
                ))}
            </div>

            {/* Détail : jour sélectionné, sinon toutes les séances du mois */}
            <div className="space-y-2">
                <h3 className="font-semibold text-sm">
                    {selected
                        ? atNoon(selected).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
                        : "Séances du mois"}
                </h3>

                {loading ? (
                    <div className="space-y-2">
                        {[...Array(2)].map((_, i) => <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />)}
                    </div>
                ) : detailed.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground text-sm text-center py-10 border border-border rounded-2xl">
                        <CalendarDays className="w-8 h-8 opacity-30" />
                        {selected ? "Aucune assemblée ce jour-là" : "Aucune assemblée ce mois-ci"}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {detailed.map((s: any) => (
                            <Link key={s.id} href={`/membres/ag/${s.id}`}>
                                <div className="flex items-center gap-4 bg-card border border-border rounded-xl px-4 py-3 hover:bg-muted/50 hover:border-primary/20 transition-all">
                                    <div className="w-11 shrink-0 text-center">
                                        <p className="text-lg font-bold leading-none">{atNoon(s.sessionDate).getDate()}</p>
                                        <p className="text-[10px] uppercase text-muted-foreground mt-0.5">
                                            {atNoon(s.sessionDate).toLocaleDateString("fr-FR", { month: "short" })}
                                        </p>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm truncate">{s.title}</p>
                                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-0.5">
                                            {s.sessionTime && (
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{s.sessionTime}</span>
                                            )}
                                            {s.location && (
                                                <span className="flex items-center gap-1 truncate"><MapPin className="w-3 h-3" />{s.location}</span>
                                            )}
                                        </div>
                                    </div>
                                    <span className={`shrink-0 flex items-center gap-1.5 text-xs text-muted-foreground`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[s.status] ?? "bg-primary"}`} />
                                        {STATUS_LABEL[s.status] ?? s.status}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
