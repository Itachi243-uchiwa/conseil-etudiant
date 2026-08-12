"use client"

import { Bold, Heading2, Italic, Link2, List, ListOrdered } from "lucide-react"
import { useRef } from "react"

/**
 * Zone de texte avec une barre d'outils minimale.
 *
 * On n'utilise volontairement pas d'éditeur WYSIWYG : la syntaxe reste visible,
 * copiable et versionnable, et le rendu final est produit par MJML.
 */

type Tool =
    | { icon: any; label: string; kind: "wrap"; before: string; after: string; sample: string }
    | { icon: any; label: string; kind: "prefix"; prefix: string; sample: string }

const TOOLS: Tool[] = [
    { icon: Bold, label: "Gras", kind: "wrap", before: "**", after: "**", sample: "texte en gras" },
    { icon: Italic, label: "Italique", kind: "wrap", before: "*", after: "*", sample: "texte en italique" },
    { icon: Link2, label: "Lien", kind: "wrap", before: "[", after: "](https://www.cehe2b.be)", sample: "texte du lien" },
    { icon: Heading2, label: "Sous-titre", kind: "prefix", prefix: "## ", sample: "Sous-titre" },
    { icon: List, label: "Liste à puces", kind: "prefix", prefix: "- ", sample: "élément" },
    { icon: ListOrdered, label: "Liste numérotée", kind: "prefix", prefix: "1. ", sample: "élément" },
]

interface Props {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    rows?: number
    id?: string
}

export default function RichTextArea({ value, onChange, placeholder, rows = 8, id }: Props) {
    const ref = useRef<HTMLTextAreaElement>(null)

    function apply(tool: Tool) {
        const field = ref.current
        if (!field) return

        const start = field.selectionStart
        const end = field.selectionEnd
        const selected = value.slice(start, end)

        let next: string
        let cursorStart: number
        let cursorEnd: number

        if (tool.kind === "wrap") {
            const inner = selected || tool.sample
            next = value.slice(0, start) + tool.before + inner + tool.after + value.slice(end)
            cursorStart = start + tool.before.length
            cursorEnd = cursorStart + inner.length
        } else {
            // Le préfixe s'applique à chaque ligne de la sélection.
            const lineStart = value.lastIndexOf("\n", start - 1) + 1
            const block = value.slice(lineStart, end) || tool.sample
            const prefixed = block
                .split("\n")
                .map((line, i) => {
                    const bullet = tool.prefix === "1. " ? `${i + 1}. ` : tool.prefix
                    return line.startsWith(bullet) ? line : bullet + line
                })
                .join("\n")
            next = value.slice(0, lineStart) + prefixed + value.slice(end)
            cursorStart = lineStart
            cursorEnd = lineStart + prefixed.length
        }

        onChange(next)
        requestAnimationFrame(() => {
            field.focus()
            field.setSelectionRange(cursorStart, cursorEnd)
        })
    }

    return (
        <div className="rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all">
            <div className="flex items-center gap-0.5 px-1.5 py-1.5 border-b border-border">
                {TOOLS.map(tool => {
                    const Icon = tool.icon
                    return (
                        <button
                            key={tool.label}
                            type="button"
                            onClick={() => apply(tool)}
                            title={tool.label}
                            aria-label={tool.label}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                            <Icon className="w-3.5 h-3.5" />
                        </button>
                    )
                })}
                <span className="ml-auto pr-2 text-[10px] text-muted-foreground hidden sm:block">
                    **gras** · *italique* · [lien](url)
                </span>
            </div>
            <textarea
                id={id}
                ref={ref}
                rows={rows}
                value={value}
                placeholder={placeholder}
                onChange={e => onChange(e.target.value)}
                className="w-full bg-transparent px-3.5 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none resize-y rounded-b-xl"
            />
        </div>
    )
}
