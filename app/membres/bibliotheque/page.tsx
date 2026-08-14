"use client"

import MemberShell from "@/components/membres/MemberShell"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { getDocuments, deleteMyDocument } from "@/lib/members-api"
import { formatFileSize } from "@/lib/utils"
import { FileText, Download, Calendar, User, Filter, Paperclip, Link2, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const DOC_TYPES = [
    { key: "", label: "Tous" },
    { key: "ORDRE_DU_JOUR", label: "Ordres du jour" },
    { key: "PV", label: "Procès-verbaux" },
    { key: "DECISION", label: "Décisions & résolutions" },
    { key: "RAPPORT", label: "Rapports" },
    { key: "ACTUALITE", label: "Actualités" },
]

const TYPE_ICONS: Record<string, string> = {
    ORDRE_DU_JOUR: "📋",
    PV: "📝",
    DECISION: "⚖️",
    RAPPORT: "📊",
    ACTUALITE: "📢",
}

export default function BibliothequePage() {
    const { data: session } = useSession()
    const { toast } = useToast()
    const [allDocs, setAllDocs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [activeType, setActiveType] = useState("")
    const [search, setSearch] = useState("")
    const [onlyMine, setOnlyMine] = useState(false)
    const [deletingId, setDeletingId] = useState<number | null>(null)

    const user = session?.user
    const myEmail = user?.email?.toLowerCase() ?? ""

    // Fetch ALL docs once — filter/search happen client-side instantly
    useEffect(() => {
        getDocuments().then(setAllDocs).finally(() => setLoading(false))
    }, [])

    const isMine = (doc: any) => !!myEmail && doc.authorEmail?.toLowerCase() === myEmail
    const mineCount = allDocs.filter(isMine).length

    const filtered = allDocs.filter((d: any) => {
        const matchType = !activeType || d.type === activeType
        const q = search.toLowerCase()
        const matchSearch = !q ||
            d.title?.toLowerCase().includes(q) ||
            d.authorName?.toLowerCase().includes(q) ||
            d.fileName?.toLowerCase().includes(q)
        return matchType && matchSearch && (!onlyMine || isMine(d))
    })

    const handleDelete = async (doc: any) => {
        if (!user) return
        if (!confirm(`Supprimer définitivement « ${doc.title} » ?`)) return
        setDeletingId(doc.id)
        try {
            await deleteMyDocument(doc.id, user.email ?? "", user.memberName ?? "")
            setAllDocs(docs => docs.filter(d => d.id !== doc.id))
            toast({ title: "Document supprimé", description: doc.title })
        } catch (e: any) {
            toast({ title: "Erreur", description: e.message, variant: "destructive" })
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <MemberShell>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Bibliothèque documentaire</h1>
                    <p className="text-muted-foreground mt-1">Accédez à tous les documents institutionnels du CE</p>
                </div>

                {/* Filtres & recherche */}
                <div className="space-y-3">
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Rechercher un document..."
                            className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground"
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {DOC_TYPES.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => setActiveType(key)}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                                    activeType === key
                                        ? "bg-primary border-primary text-primary-foreground"
                                        : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                                }`}
                            >
                                {key && TYPE_ICONS[key]} {label}
                            </button>
                        ))}
                        {mineCount > 0 && (
                            <button
                                onClick={() => setOnlyMine(v => !v)}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                                    onlyMine
                                        ? "bg-primary border-primary text-primary-foreground"
                                        : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                                }`}
                            >
                                Mes dépôts ({mineCount})
                            </button>
                        )}
                    </div>
                </div>

                {/* Liste */}
                {loading ? (
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex gap-4 bg-card border border-border rounded-xl p-4 animate-pulse">
                                <div className="w-8 h-8 bg-muted rounded-lg shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-muted rounded w-3/4" />
                                    <div className="h-3 bg-muted rounded w-1/2" />
                                    <div className="h-3 bg-muted rounded w-1/3" />
                                </div>
                                <div className="w-24 h-8 bg-muted rounded-lg shrink-0" />
                            </div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-16 border border-border rounded-2xl text-muted-foreground">
                        <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p>{allDocs.length === 0 ? "Aucun document disponible" : "Aucun document correspond à votre recherche"}</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {filtered.map((doc: any) => {
                            const size = formatFileSize(doc.fileSize)
                            const hosted = !!doc.fileName
                            return (
                                <div key={doc.id} className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:bg-muted/50 transition-all">
                                    <div className="text-2xl shrink-0">{TYPE_ICONS[doc.type] ?? "📄"}</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <p className="font-medium truncate">{doc.title}</p>
                                                {doc.description && <p className="text-muted-foreground text-sm mt-0.5 line-clamp-1">{doc.description}</p>}
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <span className="text-xs text-muted-foreground border border-border rounded-full px-2 py-0.5 hidden sm:inline">
                                                    {doc.type.replace(/_/g, " ")}
                                                </span>
                                                {doc.fileUrl && (
                                                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer"
                                                        className="flex items-center gap-1 bg-primary/10 border border-primary/30 text-primary text-xs px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-all">
                                                        {hosted ? <Download className="w-3 h-3" /> : <Link2 className="w-3 h-3" />}
                                                        {hosted ? "Télécharger" : "Ouvrir le lien"}
                                                    </a>
                                                )}
                                                {isMine(doc) && (
                                                    <button
                                                        onClick={() => handleDelete(doc)}
                                                        disabled={deletingId === doc.id}
                                                        title="Supprimer ce document"
                                                        className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-500/10 disabled:opacity-50 transition-all"
                                                    >
                                                        {deletingId === doc.id
                                                            ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                            : <Trash2 className="w-4 h-4" />}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 mt-2 text-muted-foreground text-xs flex-wrap">
                                            {doc.authorName && (
                                                <span className="flex items-center gap-1"><User className="w-3 h-3" />{doc.authorName}</span>
                                            )}
                                            {doc.sessionTitle && <span className="text-primary/70">{doc.sessionTitle}</span>}
                                            {doc.createdAt && (
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
                                                </span>
                                            )}
                                            {hosted && (
                                                <span className="flex items-center gap-1 min-w-0">
                                                    <Paperclip className="w-3 h-3 shrink-0" />
                                                    <span className="truncate max-w-[220px]">{doc.fileName}</span>
                                                    {size && <span className="opacity-70 shrink-0">· {size}</span>}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </MemberShell>
    )
}
