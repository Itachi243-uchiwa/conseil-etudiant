"use client"

import { useCallback, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { getAgenda, inlineDocumentUrl, setAgendaItemDone } from "@/lib/members-api"
import { useToast } from "@/hooks/use-toast"
import PdfPreview from "./PdfPreview"
import { CalendarClock, Check, FileText, ChevronDown, ChevronUp } from "lucide-react"

type AgendaItem = {
    id: number
    label: string
    description?: string
    kind?: "POINT" | "JALON"
    durationMinutes?: number | null
    startTime?: string | null
    voteSubjectId?: number | null
    done: boolean
    displayNumber?: number | null
}

/**
 * Ordre du jour d'une séance, dans la forme du document papier du CE : heure de
 * début, intitulé, durée indicative. Les jalons (accueil, pause, fin) sont
 * teintés comme sur le PDF, les points sont numérotés.
 *
 * Le président et le bureau cochent les points traités ; c'est ce qui permet aux
 * membres de savoir où en est la séance sans demander.
 */
export default function SessionAgenda({
    sessionId,
    pdfDocumentId,
    canChair,
}: {
    sessionId: number
    /**
     * Document PDF de l'ordre du jour. On passe par son identifiant plutôt que
     * par l'URL Cloudinary : celle-ci est servie avec un type MIME générique et
     * déclenche un téléchargement au lieu de l'aperçu.
     */
    pdfDocumentId?: number | null
    canChair: boolean
}) {
    const { data: session } = useSession()
    const { toast } = useToast()

    const [items, setItems] = useState<AgendaItem[]>([])
    const [loading, setLoading] = useState(true)
    const [showPdf, setShowPdf] = useState(false)
    const [pending, setPending] = useState<number | null>(null)

    const user = session?.user

    const reload = useCallback(async () => {
        const data = await getAgenda(sessionId)
        setItems(Array.isArray(data) ? data : [])
    }, [sessionId])

    useEffect(() => {
        reload().finally(() => setLoading(false))
    }, [reload])

    const toggleDone = async (item: AgendaItem) => {
        if (!user || !canChair) return
        setPending(item.id)
        try {
            await setAgendaItemDone(item.id, !item.done, user.email ?? "", user.memberName ?? "")
            await reload()
        } catch (e: any) {
            toast({ title: "Erreur", description: e.message, variant: "destructive" })
        } finally {
            setPending(null)
        }
    }

    const current = items.find(i => !i.done && i.kind !== "JALON")

    if (loading) {
        return (
            <div className="border border-border rounded-2xl p-5 bg-card/60">
                <div className="h-5 w-40 bg-muted rounded animate-pulse mb-4" />
                <div className="space-y-2">
                    {[...Array(4)].map((_, i) => <div key={i} className="h-8 bg-muted rounded animate-pulse" />)}
                </div>
            </div>
        )
    }

    if (items.length === 0 && !pdfDocumentId) return null

    return (
        <div className="border border-border rounded-2xl bg-card/60 overflow-hidden">
            <div className="flex items-center justify-between gap-3 p-5 pb-3 flex-wrap">
                <div className="flex items-center gap-2">
                    <CalendarClock className="w-4 h-4 text-primary" />
                    <h2 className="font-semibold text-lg">Ordre du jour</h2>
                </div>

                {pdfDocumentId != null && (
                    <button
                        onClick={() => setShowPdf(v => !v)}
                        className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
                    >
                        <FileText className="w-3.5 h-3.5" />
                        {showPdf ? "Masquer le PDF" : "Voir le PDF"}
                        {showPdf ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                )}
            </div>

            {showPdf && pdfDocumentId != null && (
                <div className="px-5 pb-4">
                    <PdfPreview url={inlineDocumentUrl(pdfDocumentId)} height={520} />
                </div>
            )}

            {items.length > 0 && (
                <div className="px-5 pb-5">
                    <div className="border border-border rounded-xl overflow-hidden">
                        {items.map((item, index) => {
                            const isJalon = item.kind === "JALON"
                            const isCurrent = current?.id === item.id
                            return (
                                <div
                                    key={item.id}
                                    className={[
                                        "flex items-center gap-3 px-3 py-2.5 text-sm",
                                        index > 0 ? "border-t border-border" : "",
                                        isJalon ? "bg-primary/8 text-muted-foreground" : "",
                                        item.done ? "opacity-55" : "",
                                        isCurrent && !item.done ? "bg-primary/5 border-l-2 border-l-primary" : "",
                                    ].join(" ")}
                                >
                                    <span className="w-12 shrink-0 tabular-nums font-semibold text-primary">
                                        {item.startTime ?? "—"}
                                    </span>

                                    <span className="w-6 shrink-0">
                                        {item.displayNumber != null && (
                                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/15 text-primary text-[11px] font-bold">
                                                {item.displayNumber}
                                            </span>
                                        )}
                                    </span>

                                    <div className="flex-1 min-w-0">
                                        <div className={item.done ? "line-through" : isJalon ? "font-medium uppercase tracking-wide text-xs" : "font-medium"}>
                                            {item.label}
                                        </div>
                                        {item.description && (
                                            <div className="text-xs text-muted-foreground mt-0.5">{item.description}</div>
                                        )}
                                    </div>

                                    {item.durationMinutes != null && (
                                        <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                                            ~ {item.durationMinutes}&#8217;
                                        </span>
                                    )}

                                    {canChair ? (
                                        <button
                                            onClick={() => toggleDone(item)}
                                            disabled={pending === item.id}
                                            aria-pressed={item.done}
                                            title={item.done ? "Rouvrir ce point" : "Marquer comme traité"}
                                            className={[
                                                "shrink-0 w-6 h-6 rounded-md border flex items-center justify-center transition-all",
                                                item.done
                                                    ? "bg-primary border-primary text-primary-foreground"
                                                    : "border-border hover:border-primary text-transparent hover:text-primary/40",
                                            ].join(" ")}
                                        >
                                            <Check className="w-3.5 h-3.5" />
                                        </button>
                                    ) : (
                                        <span className="shrink-0 w-6 flex justify-center">
                                            {item.done && <Check className="w-3.5 h-3.5 text-primary" />}
                                        </span>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {current && (
                        <p className="text-xs text-muted-foreground mt-2">
                            Point en cours : {current.displayNumber != null ? `${current.displayNumber}. ` : ""}{current.label}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}
