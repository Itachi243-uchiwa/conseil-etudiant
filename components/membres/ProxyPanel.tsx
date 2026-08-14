"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { createProxy, deleteProxy, getTeamMembers, setProxyValidation } from "@/lib/members-api"
import { useToast } from "@/hooks/use-toast"
import FileDropzone from "./FileDropzone"
import PdfPreview from "./PdfPreview"
import {
    UserCheck, Plus, Trash2, FileText, Info, Eye, EyeOff, ExternalLink,
    ShieldCheck, ShieldAlert, CalendarCheck,
} from "lucide-react"

/**
 * Procurations d'une séance.
 *
 * Un membre absent confie sa voix à un membre présent : celui-ci déclare le
 * mandant et joint le PDF signé. Une seule procuration par personne — le porteur
 * vote alors deux fois, sa voix et celle du mandant partant dans le même sens.
 */
export default function ProxyPanel({
    sessionId,
    sessionDate,
    proxies,
    loading,
    isPresident,
    closed,
    onReload,
}: {
    sessionId: number
    /** Date de l'AG (`yyyy-MM-dd`), rappelée à côté de l'aperçu pour la comparaison. */
    sessionDate?: string
    proxies: any[]
    loading: boolean
    isPresident: boolean
    closed: boolean
    onReload: () => Promise<void>
}) {
    const { data: session } = useSession()
    const { toast } = useToast()

    const [showForm, setShowForm] = useState(false)
    const [members, setMembers] = useState<any[]>([])
    const [grantorEmail, setGrantorEmail] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [deletingId, setDeletingId] = useState<number | null>(null)
    const [previewId, setPreviewId] = useState<number | null>(null)
    const [validatingId, setValidatingId] = useState<number | null>(null)

    const user = session?.user
    const myEmail = user?.email?.toLowerCase() ?? ""

    const myProxy = proxies.find(p => p.holderEmail?.toLowerCase() === myEmail) ?? null
    const iGaveProxy = proxies.find(p => p.grantorEmail?.toLowerCase() === myEmail) ?? null
    const canDeclare = !closed && !myProxy && !iGaveProxy

    // Les membres déjà engagés (d'un côté ou de l'autre) ne sont plus proposés :
    // une seule procuration par personne.
    const taken = new Set(
        proxies.flatMap(p => [p.grantorEmail?.toLowerCase(), p.holderEmail?.toLowerCase()]).filter(Boolean)
    )
    const selectable = members.filter(
        (m: any) => m.email && m.email.toLowerCase() !== myEmail && !taken.has(m.email.toLowerCase())
    )

    useEffect(() => {
        if (showForm && members.length === 0) {
            getTeamMembers().then(list => setMembers(Array.isArray(list) ? list : []))
        }
    }, [showForm, members.length])

    const submit = async () => {
        if (!user || !grantorEmail || !file || submitting) return
        setSubmitting(true)
        try {
            await createProxy(sessionId, grantorEmail, file, user.email ?? "", user.memberName ?? "")
            await onReload()
            setShowForm(false)
            setGrantorEmail("")
            setFile(null)
            toast({ title: "Procuration enregistrée", description: "Votre vote comptera pour deux voix." })
        } catch (e: any) {
            toast({ title: "Erreur", description: e.message, variant: "destructive" })
        } finally {
            setSubmitting(false)
        }
    }

    const toggleValidation = async (proxy: any) => {
        if (!user) return
        const next = !proxy.validatedAt
        setValidatingId(proxy.id)
        try {
            await setProxyValidation(proxy.id, next, user.email ?? "", user.memberName ?? "")
            await onReload()
            toast({
                title: next ? "Procuration vérifiée" : "Vérification retirée",
                description: proxy.grantorName,
            })
        } catch (e: any) {
            toast({ title: "Erreur", description: e.message, variant: "destructive" })
        } finally {
            setValidatingId(null)
        }
    }

    const remove = async (proxy: any) => {
        if (!user) return
        if (!confirm(`Retirer la procuration de ${proxy.grantorName} ?`)) return
        setDeletingId(proxy.id)
        try {
            await deleteProxy(proxy.id, user.email ?? "", user.memberName ?? "")
            await onReload()
            toast({ title: "Procuration retirée", description: proxy.grantorName })
        } catch (e: any) {
            toast({ title: "Erreur", description: e.message, variant: "destructive" })
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
                <h2 className="font-semibold text-lg">Procurations</h2>
                {canDeclare && (
                    <button
                        onClick={() => setShowForm(v => !v)}
                        className="flex items-center gap-2 border border-border hover:bg-muted text-sm px-4 py-2 rounded-xl transition-all active:scale-95 shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        Déclarer
                    </button>
                )}
            </div>

            {myProxy && (
                <div className="flex items-start gap-2.5 bg-primary/10 border border-primary/25 text-primary rounded-xl px-4 py-3 text-sm">
                    <UserCheck className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                        Vous portez la procuration de <strong>{myProxy.grantorName}</strong> :
                        chacun de vos votes compte pour deux voix.
                    </span>
                </div>
            )}

            {iGaveProxy && (
                <div className="flex items-start gap-2.5 bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-300 rounded-xl px-4 py-3 text-sm">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                        Vous avez donné votre procuration à <strong>{iGaveProxy.holderName || iGaveProxy.holderEmail}</strong> :
                        il/elle vote en votre nom.
                    </span>
                </div>
            )}

            {showForm && canDeclare && (
                <div className="border border-primary/30 bg-primary/5 rounded-2xl p-5 space-y-4">
                    <div>
                        <h3 className="font-medium text-sm">Nouvelle procuration</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                            Désignez le membre absent qui vous confie sa voix et joignez sa procuration signée (PDF).
                            Déposez-la avant l'ouverture des votes : elle ne s'applique qu'aux votes à venir.
                        </p>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                            Membre absent *
                        </label>
                        <select
                            value={grantorEmail}
                            onChange={e => setGrantorEmail(e.target.value)}
                            disabled={submitting}
                            className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
                        >
                            <option value="">— Sélectionnez un membre —</option>
                            {selectable.map((m: any) => (
                                <option key={m.email} value={m.email}>
                                    {m.name}{m.campus?.name ? ` — ${m.campus.name}` : ""}
                                </option>
                            ))}
                        </select>
                        {members.length > 0 && selectable.length === 0 && (
                            <p className="text-xs text-muted-foreground">
                                Aucun membre disponible : tous ont déjà une procuration pour cette séance.
                            </p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                            Procuration signée (PDF) *
                        </label>
                        <FileDropzone
                            file={file}
                            onChange={setFile}
                            disabled={submitting}
                            extensions={["pdf"]}
                            hint="PDF uniquement — 15 Mo maximum"
                        />
                        {/* Aperçu avant envoi : on vérifie le document déposé, dates comprises. */}
                        {file && <PdfPreview file={file} height={360} />}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={submit}
                            disabled={!grantorEmail || !file || submitting}
                            className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground text-sm px-4 py-2 rounded-xl transition-all active:scale-95"
                        >
                            {submitting ? "Envoi…" : "Enregistrer"}
                        </button>
                        <button
                            onClick={() => setShowForm(false)}
                            className="text-muted-foreground hover:text-foreground text-sm px-4 py-2 rounded-xl transition-all"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="space-y-2">
                    {[...Array(2)].map((_, i) => <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />)}
                </div>
            ) : proxies.length === 0 ? (
                <div className="flex flex-col items-center gap-2 text-muted-foreground text-sm text-center py-10 border border-border rounded-2xl">
                    <UserCheck className="w-8 h-8 opacity-30" />
                    Aucune procuration pour cette séance
                </div>
            ) : (
                <div className="space-y-2">
                    {proxies.map((p: any) => {
                        const mine = p.holderEmail?.toLowerCase() === myEmail
                        const previewing = previewId === p.id
                        return (
                            <div key={p.id} className="bg-card border border-border rounded-xl overflow-hidden">
                            <div
                                className="flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-all"
                            >
                                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                    <UserCheck className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold truncate">
                                        {p.grantorName} <span className="text-muted-foreground font-normal">→</span> {p.holderName || p.holderEmail}
                                    </p>
                                    <div className="flex items-center gap-2 flex-wrap mt-0.5">
                                        <p className="text-xs text-muted-foreground truncate">
                                            {p.grantorName} (absent) donne sa voix à {p.holderName || p.holderEmail}
                                        </p>
                                        {p.validatedAt ? (
                                            <span
                                                title={`Vérifiée par ${p.validatedBy ?? "le président"} le ${new Date(p.validatedAt).toLocaleDateString("fr-FR")}`}
                                                className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-300"
                                            >
                                                <ShieldCheck className="w-3 h-3" />
                                                Vérifiée
                                            </span>
                                        ) : (
                                            <span
                                                title="Le président de séance n'a pas encore confirmé que la procuration vise cette AG"
                                                className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                                            >
                                                <ShieldAlert className="w-3 h-3" />
                                                À vérifier
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {p.fileUrl && (
                                    <button
                                        onClick={() => setPreviewId(previewing ? null : p.id)}
                                        aria-expanded={previewing}
                                        className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors"
                                    >
                                        {previewing ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                        {previewing ? "Masquer" : "Aperçu"}
                                    </button>
                                )}
                                {(mine || isPresident) && (
                                    <button
                                        onClick={() => remove(p)}
                                        disabled={deletingId === p.id}
                                        title="Retirer la procuration"
                                        className="shrink-0 p-2 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-500/10 disabled:opacity-40 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {previewing && p.fileUrl && (
                                <div className="px-4 pb-4 space-y-2 border-t border-border pt-3">
                                    <div className="flex items-center justify-between gap-3 flex-wrap">
                                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-0">
                                            <FileText className="w-3.5 h-3.5 shrink-0" />
                                            <span className="truncate">{p.fileName ?? "procuration.pdf"}</span>
                                            {p.createdAt && (
                                                <span className="shrink-0">
                                                    · déposée le {new Date(p.createdAt).toLocaleDateString("fr-FR", {
                                                        day: "numeric", month: "long", year: "numeric",
                                                    })}
                                                </span>
                                            )}
                                        </p>
                                        <a
                                            href={p.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline shrink-0"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            Ouvrir dans un onglet
                                        </a>
                                    </div>
                                    {sessionDate && (
                                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <CalendarCheck className="w-3.5 h-3.5 shrink-0" />
                                            Cette AG a lieu le{" "}
                                            <strong className="text-foreground">
                                                {new Date(`${sessionDate}T12:00:00`).toLocaleDateString("fr-FR", {
                                                    day: "numeric", month: "long", year: "numeric",
                                                })}
                                            </strong>
                                            — la date portée sur la procuration doit correspondre.
                                        </p>
                                    )}

                                    <PdfPreview url={p.fileUrl} />

                                    {isPresident && (
                                        <button
                                            onClick={() => toggleValidation(p)}
                                            disabled={validatingId === p.id}
                                            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border transition-all active:scale-95 disabled:opacity-50 ${
                                                p.validatedAt
                                                    ? "border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                                                    : "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-300 hover:bg-green-500/20"
                                            }`}
                                        >
                                            {p.validatedAt ? <ShieldAlert className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                                            {p.validatedAt
                                                ? "Retirer la vérification"
                                                : "La date correspond — marquer comme vérifiée"}
                                        </button>
                                    )}
                                </div>
                            )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
