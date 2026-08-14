"use client"

import { useEffect, useState } from "react"
import { ExternalLink, FileWarning } from "lucide-react"

/**
 * Aperçu d'un PDF, soit déjà hébergé (`url`), soit encore local avant envoi
 * (`file`). Le visualiseur natif du navigateur est utilisé via <object> ; s'il
 * n'est pas disponible, le bloc de repli propose l'ouverture dans un onglet.
 */
export default function PdfPreview({
    url,
    file,
    height = 420,
}: {
    url?: string
    file?: File | null
    height?: number
}) {
    const [objectUrl, setObjectUrl] = useState<string | null>(null)

    useEffect(() => {
        if (!file) { setObjectUrl(null); return }
        const created = URL.createObjectURL(file)
        setObjectUrl(created)
        return () => URL.revokeObjectURL(created)
    }, [file])

    const source = objectUrl ?? url
    if (!source) return null

    return (
        <div className="rounded-xl border border-border overflow-hidden bg-muted/30">
            <object
                data={`${source}#view=FitH`}
                type="application/pdf"
                className="w-full block"
                style={{ height }}
                aria-label="Aperçu de la procuration"
            >
                <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground p-8">
                    <FileWarning className="w-7 h-7 opacity-40" />
                    <p>Ce navigateur n'affiche pas le PDF directement.</p>
                    {url && (
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-primary font-semibold hover:underline"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Ouvrir le PDF
                        </a>
                    )}
                </div>
            </object>
        </div>
    )
}
