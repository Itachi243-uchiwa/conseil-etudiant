"use client"

import { ReactNode, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { saveAgenda, setAgendaItemDone } from "@/lib/members-api"
import { useToast } from "@/hooks/use-toast"
import { ListOrdered, Pencil, Plus, Trash2, Check, ArrowUp, ArrowDown } from "lucide-react"

type AgendaItem = {
    id?: number
    label: string
    done?: boolean
    number?: number
    voteSubjects?: any[]
}

/**
 * Ordre du jour de la séance.
 *
 * Chaque point porte ses propres scrutins, rendus par `renderSubject` pour que
 * la carte de vote reste définie au même endroit que celle de la liste générale.
 *
 * La présidence édite les points sur place. Les identifiants sont conservés à
 * l'enregistrement : renommer ou déplacer un point ne détache aucun vote.
 */
export default function SessionAgenda({
    sessionId,
    items,
    isPresident,
    onReload,
    renderSubject,
}: {
    sessionId: number
    items: AgendaItem[]
    isPresident: boolean
    onReload: () => Promise<void>
    renderSubject: (subject: any) => ReactNode
}) {
    const { data: session } = useSession()
    const { toast } = useToast()

    const [editing, setEditing] = useState(false)
    const [draft, setDraft] = useState<AgendaItem[]>([])
    const [saving, setSaving] = useState(false)
    const [pendingId, setPendingId] = useState<number | null>(null)

    const user = session?.user

    useEffect(() => {
        if (!editing) setDraft(items.map(i => ({ ...i })))
    }, [items, editing])

    const move = (index: number, delta: number) => {
        const target = index + delta
        if (target < 0 || target >= draft.length) return
        const next = [...draft]
        const swap = next[index]
        next[index] = next[target]
        next[target] = swap
        setDraft(next)
    }

    const save = async () => {
        if (!user || saving) return
        setSaving(true)
        try {
            await saveAgenda(
                sessionId,
                draft.filter(i => i.label.trim()),
                user.email ?? "",
                user.memberName ?? "",
            )
            await onReload()
            setEditing(false)
            toast({ title: "Ordre du jour enregistré" })
        } catch (e: any) {
            toast({ title: "Erreur", description: e.message, variant: "destructive" })
        } finally {
            setSaving(false)
        }
    }

    const toggleDone = async (item: AgendaItem) => {
        if (!user || !item.id) return
        setPendingId(item.id)
        try {
            await setAgendaItemDone(item.id, !item.done, user.email ?? "", user.memberName ?? "")
            await onReload()
        } catch (e: any) {
            toast({ title: "Erreur", description: e.message, variant: "destructive" })
        } finally {
            setPendingId(null)
        }
    }

    if (items.length === 0 && !isPresident) return null

    // ── Édition ──────────────────────────────────────────────────────────
    if (editing) {
        return (
            <div className="border border-primary/30 bg-primary/5 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-primary" />
                    <h2 className="font-semibold text-lg">Ordre du jour</h2>
                </div>

                {draft.map((item, index) => (
                    <div key={item.id ?? `new-${index}`} className="flex items-center gap-2">
                        <span className="shrink-0 w-6 text-center text-xs font-bold text-primary">{index + 1}</span>
                        <input
                            value={item.label}
                            onChange={e => {
                                const next = [...draft]
                                next[index] = { ...next[index], label: e.target.value }
                                setDraft(next)
                            }}
                            placeholder="Intitulé du point"
                            className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
                        />
                        <button onClick={() => move(index, -1)} disabled={index === 0}
                            title="Monter" aria-label="Monter"
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-30">
                            <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => move(index, 1)} disabled={index === draft.length - 1}
                            title="Descendre" aria-label="Descendre"
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-30">
                            <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setDraft(draft.filter((_, i) => i !== index))}
                            title="Retirer" aria-label="Retirer"
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600">
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ))}

                <button
                    onClick={() => setDraft([...draft, { label: "" }])}
                    className="flex items-center gap-1.5 text-primary text-sm hover:underline"
                >
                    <Plus className="w-3.5 h-3.5" />Ajouter un point
                </button>

                <p className="text-xs text-muted-foreground">
                    Retirer un point détache ses scrutins, qui repassent dans la liste générale sans
                    être supprimés. Renommer ou déplacer ne détache rien.
                </p>

                <div className="flex gap-2 pt-1">
                    <button onClick={save} disabled={saving}
                        className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground text-sm px-4 py-2 rounded-xl transition-all active:scale-95">
                        {saving ? "Enregistrement…" : "Enregistrer"}
                    </button>
                    <button onClick={() => setEditing(false)}
                        className="text-muted-foreground hover:text-foreground text-sm px-4 py-2 rounded-xl">
                        Annuler
                    </button>
                </div>
            </div>
        )
    }

    // ── Consultation ─────────────────────────────────────────────────────
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-primary" />
                    <h2 className="font-semibold text-lg">Ordre du jour</h2>
                </div>
                {isPresident && (
                    <button onClick={() => { setDraft(items.map(i => ({ ...i }))); setEditing(true) }}
                        className="flex items-center gap-1.5 text-primary text-sm hover:underline">
                        <Pencil className="w-3.5 h-3.5" />
                        {items.length === 0 ? "Ajouter des points" : "Modifier"}
                    </button>
                )}
            </div>

            {items.length === 0 ? (
                <p className="text-sm text-muted-foreground border border-dashed border-border rounded-2xl px-4 py-6 text-center">
                    Aucun point encodé pour cette séance.
                </p>
            ) : (
                items.map(item => (
                    <div key={item.id} className="border border-border rounded-2xl overflow-hidden">
                        <div className={`flex items-center gap-3 px-4 py-3 ${item.done ? "bg-muted/40" : "bg-card/60"}`}>
                            <span className={`shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                                item.done ? "bg-muted text-muted-foreground" : "bg-primary/15 text-primary"
                            }`}>
                                {item.number}
                            </span>

                            <span className={`flex-1 font-medium text-sm ${item.done ? "line-through text-muted-foreground" : ""}`}>
                                {item.label}
                            </span>

                            {(item.voteSubjects?.length ?? 0) > 0 && (
                                <span className="shrink-0 text-xs text-muted-foreground">
                                    {item.voteSubjects!.length} scrutin{item.voteSubjects!.length > 1 ? "s" : ""}
                                </span>
                            )}

                            {isPresident ? (
                                <button
                                    onClick={() => toggleDone(item)}
                                    disabled={pendingId === item.id}
                                    aria-pressed={item.done}
                                    title={item.done ? "Rouvrir ce point" : "Marquer comme traité"}
                                    className={`shrink-0 w-6 h-6 rounded-md border flex items-center justify-center transition-all ${
                                        item.done
                                            ? "bg-primary border-primary text-primary-foreground"
                                            : "border-border hover:border-primary text-transparent hover:text-primary/40"
                                    }`}
                                >
                                    <Check className="w-3.5 h-3.5" />
                                </button>
                            ) : (
                                <span className="shrink-0 w-6 flex justify-center">
                                    {item.done && <Check className="w-3.5 h-3.5 text-primary" />}
                                </span>
                            )}
                        </div>

                        {(item.voteSubjects?.length ?? 0) > 0 && (
                            <div className="border-t border-border p-3 space-y-3 bg-background/40">
                                {item.voteSubjects!.map(subject => renderSubject(subject))}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    )
}
