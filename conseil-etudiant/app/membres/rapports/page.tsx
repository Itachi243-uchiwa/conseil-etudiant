"use client"

import MemberShell from "@/components/membres/MemberShell"
import FileDropzone from "@/components/membres/FileDropzone"
import DocumentRow from "@/components/membres/DocumentRow"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { getMyDocuments, getDocuments, uploadDocument, deleteMyDocument } from "@/lib/members-api"
import { Upload, CheckCircle2, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const COUNCILS = ["CA – Conseil d'Administration", "CS – Conseil Social", "CP – Conseil Pédagogique", "Autre"]

export default function RapportsPage() {
    const { data: session } = useSession()
    const [myReports, setMyReports] = useState<any[]>([])
    const [allReports, setAllReports] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [deletingId, setDeletingId] = useState<number | null>(null)
    const [form, setForm] = useState({ title: "", description: "", fileUrl: "" })
    const [file, setFile] = useState<File | null>(null)

    const { toast } = useToast()
    const user = session?.user

    const reload = async () => {
        if (!user) return
        const [mine, all] = await Promise.all([
            getMyDocuments(user.email ?? "", user.memberName ?? ""),
            getDocuments({ type: "RAPPORT" }),
        ])
        setMyReports((mine as any[]).filter((d: any) => d.type === "RAPPORT"))
        setAllReports(all)
    }

    useEffect(() => {
        if (!user) return
        reload().finally(() => setLoading(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const resetForm = () => {
        setForm({ title: "", description: "", fileUrl: "" })
        setFile(null)
    }

    const handleSubmit = async () => {
        if (!form.title.trim() || !user) return
        setSubmitting(true)
        try {
            await uploadDocument(
                { title: form.title, description: form.description, type: "RAPPORT", fileUrl: form.fileUrl },
                file,
                user.email ?? "",
                user.memberName ?? ""
            )
            setSuccess(true)
            setShowForm(false)
            resetForm()
            await reload()
            setTimeout(() => setSuccess(false), 3000)
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
            toast({ title: "Rapport supprimé", description: doc.title })
        } catch (e: any) {
            toast({ title: "Erreur", description: e.message, variant: "destructive" })
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <MemberShell>
            <div className="space-y-8">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Rapports des représentants</h1>
                        <p className="text-muted-foreground mt-1">Déposez vos rapports de représentation dans les conseils</p>
                    </div>
                    <button
                        onClick={() => setShowForm(v => !v)}
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm px-4 py-2.5 rounded-xl transition-all shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        Déposer un rapport
                    </button>
                </div>

                {success && (
                    <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-300 rounded-xl px-4 py-3 text-sm">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        Rapport déposé avec succès !
                    </div>
                )}

                {/* Formulaire de dépôt */}
                {showForm && (
                    <div className="border border-primary/30 bg-primary/5 rounded-2xl p-6 space-y-4">
                        <h3 className="font-semibold">Déposer un rapport de représentation</h3>

                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Conseil *</label>
                            <select
                                value={form.title}
                                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
                            >
                                <option value="">Sélectionner un conseil…</option>
                                {COUNCILS.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Résumé du rapport *</label>
                            <textarea
                                value={form.description}
                                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                placeholder="Points abordés, décisions, observations..."
                                rows={4}
                                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground resize-none"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Document</label>
                            <FileDropzone file={file} onChange={setFile} disabled={submitting} />
                        </div>

                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">
                                Ou un lien externe (optionnel, si le document est déjà hébergé)
                            </label>
                            <input
                                value={form.fileUrl}
                                onChange={e => setForm(f => ({ ...f, fileUrl: e.target.value }))}
                                placeholder="https://drive.google.com/..."
                                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleSubmit}
                                disabled={submitting || !form.title || !form.description}
                                className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground text-sm px-5 py-2.5 rounded-xl transition-all"
                            >
                                {submitting
                                    ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    : <Upload className="w-4 h-4" />}
                                {submitting ? (file ? "Envoi du fichier…" : "Envoi…") : "Déposer"}
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

                {/* Mes rapports */}
                <section>
                    <h2 className="font-semibold mb-4">Mes rapports déposés</h2>
                    {loading ? (
                        <div className="space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />)}</div>
                    ) : myReports.length === 0 ? (
                        <div className="text-muted-foreground text-sm text-center py-8 border border-border rounded-xl">
                            Vous n'avez pas encore déposé de rapport
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {myReports.map((doc: any) => (
                                <DocumentRow
                                    key={doc.id}
                                    doc={doc}
                                    onDelete={() => handleDelete(doc)}
                                    deleting={deletingId === doc.id}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* Tous les rapports */}
                <section>
                    <h2 className="font-semibold mb-4">Rapports de tous les membres</h2>
                    {loading ? (
                        <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />)}</div>
                    ) : allReports.length === 0 ? (
                        <div className="text-muted-foreground text-sm text-center py-8 border border-border rounded-xl">
                            Aucun rapport disponible
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {allReports.map((doc: any) => <DocumentRow key={doc.id} doc={doc} />)}
                        </div>
                    )}
                </section>
            </div>
        </MemberShell>
    )
}
