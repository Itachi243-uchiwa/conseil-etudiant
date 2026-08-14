"use client"

import { useRef, useState, type DragEvent } from "react"
import { Upload, X, Paperclip, AlertCircle } from "lucide-react"
import { formatFileSize } from "@/lib/utils"

export const MAX_FILE_SIZE = 15 * 1024 * 1024

export const ACCEPTED_EXTENSIONS = [
    "pdf", "doc", "docx", "odt", "xls", "xlsx", "ods", "ppt", "pptx", "odp",
    "txt", "md", "csv", "png", "jpg", "jpeg", "webp",
]

const ACCEPT_ATTR = ACCEPTED_EXTENSIONS.map(e => `.${e}`).join(",")

/**
 * Zone de dépôt d'un fichier unique (clic ou glisser-déposer).
 * Valide extension et taille côté client ; le backend revalide de toute façon.
 */
export default function FileDropzone({
    file,
    onChange,
    disabled,
}: {
    file: File | null
    onChange: (file: File | null) => void
    disabled?: boolean
}) {
    const [error, setError] = useState<string | null>(null)
    const [dragging, setDragging] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const pick = (candidate: File | undefined | null) => {
        if (!candidate) return
        const ext = candidate.name.split(".").pop()?.toLowerCase() ?? ""
        if (!ACCEPTED_EXTENSIONS.includes(ext)) {
            setError(`Format .${ext} non accepté`)
            onChange(null)
            return
        }
        if (candidate.size > MAX_FILE_SIZE) {
            setError("Fichier trop volumineux (15 Mo maximum)")
            onChange(null)
            return
        }
        setError(null)
        onChange(candidate)
    }

    const clear = () => {
        setError(null)
        onChange(null)
        if (inputRef.current) inputRef.current.value = ""
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragging(false)
        if (!disabled) pick(e.dataTransfer.files?.[0])
    }

    return (
        <div>
            {file ? (
                <div className="flex items-center gap-3 bg-background border border-border rounded-xl px-4 py-3">
                    <Paperclip className="w-4 h-4 text-primary shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                    <button
                        type="button"
                        onClick={clear}
                        disabled={disabled}
                        title="Retirer le fichier"
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-500/10 disabled:opacity-50 transition-all shrink-0"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div
                    onDragOver={e => { e.preventDefault(); if (!disabled) setDragging(true) }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => !disabled && inputRef.current?.click()}
                    className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl px-4 py-8 text-center transition-all ${
                        disabled ? "opacity-50 cursor-not-allowed border-border" : "cursor-pointer"
                    } ${
                        dragging
                            ? "border-primary bg-primary/10"
                            : "border-border bg-background hover:border-primary/50 hover:bg-muted/40"
                    }`}
                >
                    <Upload className="w-6 h-6 text-muted-foreground" />
                    <p className="text-sm font-medium">Glissez votre fichier ici ou cliquez pour parcourir</p>
                    <p className="text-xs text-muted-foreground">PDF, Word, Excel, PowerPoint, image — 15 Mo maximum</p>
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                accept={ACCEPT_ATTR}
                className="hidden"
                disabled={disabled}
                onChange={e => pick(e.target.files?.[0])}
            />

            {error && (
                <p className="flex items-center gap-1.5 text-red-600 dark:text-red-400 text-xs mt-2">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {error}
                </p>
            )}
        </div>
    )
}
