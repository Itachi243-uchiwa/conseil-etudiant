"use client"

import { useCallback, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { getDocuments, deleteMyDocument } from "@/lib/members-api"
import { useToast } from "@/hooks/use-toast"
import { FileText, Plus } from "lucide-react"
import DocumentUploadForm from "./DocumentUploadForm"
import DocumentRow from "./DocumentRow"

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
    const [deletingId, setDeletingId] = useState<number | null>(null)

    const user = session?.user
    const myEmail = user?.email?.toLowerCase() ?? ""

    const reload = useCallback(async () => {
        const data = await getDocuments({ sessionId })
        setDocs(Array.isArray(data) ? data : [])
    }, [sessionId])

    useEffect(() => {
        reload().finally(() => setLoading(false))
    }, [reload])

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
                <DocumentUploadForm
                    fixedSessionId={sessionId}
                    fixedSessionTitle={sessionTitle}
                    presidesFixedSession={isPresident}
                    onCancel={() => setShowForm(false)}
                    onDone={async () => {
                        setShowForm(false)
                        await reload()
                    }}
                />
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
