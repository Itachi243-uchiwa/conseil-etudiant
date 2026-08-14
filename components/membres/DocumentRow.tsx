"use client"

import { FileText, Download, Calendar, Paperclip, Link2, Trash2 } from "lucide-react"
import { formatFileSize } from "@/lib/utils"

/** Ligne de document réutilisée par les rapports et le détail d'une AG. */
export default function DocumentRow({
    doc,
    onDelete,
    deleting,
    showType,
}: {
    doc: any
    onDelete?: () => void
    deleting?: boolean
    showType?: boolean
}) {
    const size = formatFileSize(doc.fileSize)
    const hosted = !!doc.fileName

    return (
        <div className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:bg-muted/50 transition-all">
            <FileText className="w-4 h-4 text-primary shrink-0" />

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-sm truncate">{doc.title}</p>
                    {showType && doc.type && (
                        <span className="text-[11px] text-muted-foreground border border-border rounded-full px-2 py-0.5 shrink-0">
                            {doc.type.replace(/_/g, " ")}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-3 text-muted-foreground text-xs mt-0.5 flex-wrap">
                    {doc.authorName && <span>{doc.authorName}</span>}
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

                {doc.description && <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{doc.description}</p>}
            </div>

            <div className="flex items-center gap-1 shrink-0">
                {doc.fileUrl && (
                    <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary text-xs hover:underline px-2 py-1"
                    >
                        {hosted ? <Download className="w-3 h-3" /> : <Link2 className="w-3 h-3" />}
                        {hosted ? "Télécharger" : "Ouvrir"}
                    </a>
                )}
                {onDelete && (
                    <button
                        onClick={onDelete}
                        disabled={deleting}
                        title="Supprimer ce document"
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-500/10 disabled:opacity-50 transition-all"
                    >
                        {deleting
                            ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            : <Trash2 className="w-4 h-4" />}
                    </button>
                )}
            </div>
        </div>
    )
}
