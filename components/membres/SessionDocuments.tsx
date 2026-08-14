"use client"

import { useCallback, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { getDocuments, uploadDocument, deleteMyDocument } from "@/lib/members-api"
import { useToast } from "@/hooks/use-toast"
import { FileText, Plus, Upload } from "lucide-react"
import FileDropzone from "./FileDropzone"
import DocumentRow from "./DocumentRow"

/** Le président de séance dépose les pièces officielles ; tout membre dépose un rapport. */
const PRESIDENT_TYPES = [
    { key: "ORDRE_DU_JOUR", label: "Ordre du jour" },
    { key: "PV", label: "Procès-verbal" },
    { key: "DECISION", label: "Décision / résolution" },
    { key: "RAPPORT", label: "Rapport" },
]
const MEMBER_TYPES = [{ key: "RAPPORT", label: "Rapport" }]

export default function SessionDocuments({
    sessionId,
    sessionTitle,
    isPresident,
}: {
    sessionId: number
    sessionTitle?: string
    isPresident: boolean
}) {
    const { data: session } = useSession()
    const { toast } = useToast()

    const [docs, setDocs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [deletingId, setDeletingId] = useState<number | null>(null)

    const availableTypes = isPresident ? PRESIDENT_TYPES : MEMBER_TYPES
    const [type, setType] = useState(availableTypes[0].key)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState<File | null>(null)

    const user = session?.user
    const myEmail = user?.email?.toLowerCase() ?? ""

    const reload = useCallback(async () => {
        const data = await getDocuments({ sessionId })
        setDocs(Array.isArray(data) ? data : [])
    }, [sessionId])

    useEffect(() => {
        reload().finally(() => setLoading(false))
    }, [reload])

    const resetForm = () => {
        setTitle("")
        setDescription("")
        setFile(null)
        setType(availableTypes[0].key)
    }

    const submit = async () => {
        if (!title.trim() || !file || !user) return
        setSubmitting(true)
        try {
            await uploadDocument(
                { title: title.trim(), description: description.trim(), type, sessionId },
                file,
                user.email ?? "",
                user.memberName ?? ""
            )
            resetForm()
            setShowForm(false)
            await reload()
            toast({ title: "Document déposé", description: title.trim() })
        } catch (e: any) {
            toast({ title: "Erreur", description: e.message, variant: "destructive" })
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async (doc: any) => {
        if (!user) return
        if (!confirm(`Supprimer définitivement « ${doc.title} » ?`)) return
        setDeletingId(doc.id)
        try {
            await deleteMyDocument(doc.id, user.email ?? "", user.memberName ?? "")
            await reload()
            toast({ title: "Document supprimé", description: doc.title })
        } catch (e: any) {
            toast({ title: "Erreur", description: e.message, variant: "destructive" })
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
                <h2 className="font-semibold text-lg">Documents de la séance</h2>
                <button
                    onClick={() => setShowForm(v => !v)}
                    className="flex items-center gap-2 border border-border hover:bg-muted text-sm px-4 py-2 rounded-xl transition-all active:scale-95 shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    Déposer
                </button>
            </div>

            {showForm && (
                <div className="border border-primary/30 bg-primary/5 rounded-2xl p-5 space-y-4">
                    <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">Type de document</label>
                        <div className="flex gap-2 flex-wrap">
                            {availableTypes.map(({ key, label }) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setType(key)}
                                    className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                                        type === key
                                            ? "bg-primary border-primary text-primary-foreground"
                                            : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                        {!isPresident && (
                            <p className="text-xs text-muted-foreground mt-2">
                                Seul le président de séance peut déposer un ordre du jour, un PV ou une décision.
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Titre *</label>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder={sessionTitle ? `Ex. PV — ${sessionTitle}` : "Titre du document"}
                            className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Description (optionnel)</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={2}
                            className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground resize-none"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Fichier *</label>
                        <FileDropzone file={file} onChange={setFile} disabled={submitting} />
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={submit}
                            disabled={submitting || !title.trim() || !file}
                            className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground text-sm px-5 py-2.5 rounded-xl transition-all"
                        >
                            {submitting
                                ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                : <Upload className="w-4 h-4" />}
                            {submitting ? "Envoi du fichier…" : "Déposer"}
                        </button>
                        <button
                            onClick={() => { setShowForm(false); resetForm() }}
                            className="text-muted-foreground hover:text-foreground text-sm px-4 py-2.5 rounded-xl transition-all"
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
            ) : docs.length === 0 ? (
                <div className="flex flex-col items-center gap-2 text-muted-foreground text-sm text-center py-10 border border-border rounded-2xl">
                    <FileText className="w-8 h-8 opacity-30" />
                    Aucun document attaché à cette séance
                </div>
            ) : (
                <div className="space-y-2">
                    {docs.map((doc: any) => (
                        <DocumentRow
                            key={doc.id}
                            doc={doc}
                            showType
                            deleting={deletingId === doc.id}
                            onDelete={doc.authorEmail?.toLowerCase() === myEmail ? () => handleDelete(doc) : undefined}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
