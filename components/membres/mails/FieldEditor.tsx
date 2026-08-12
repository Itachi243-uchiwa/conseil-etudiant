"use client"

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react"

import type { EmailField, EmailItem, EmailValue } from "@/lib/emails/types"

import RichTextArea from "./RichTextArea"

const INPUT_CLASS =
    "w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"

interface Props {
    field: EmailField
    value: EmailValue | undefined
    onChange: (value: EmailValue) => void
}

export default function FieldEditor({ field, value, onChange }: Props) {
    const id = `champ-${field.key}`

    return (
        <div className="space-y-2">
            <label htmlFor={id} className="block text-sm font-medium text-foreground">
                {field.label}
            </label>

            {field.type === "richtext" ? (
                <RichTextArea
                    id={id}
                    rows={field.rows ?? 8}
                    value={typeof value === "string" ? value : ""}
                    placeholder={field.placeholder}
                    onChange={onChange}
                />
            ) : field.type === "items" ? (
                <ItemsEditor field={field} items={Array.isArray(value) ? value : []} onChange={onChange} />
            ) : (
                <input
                    id={id}
                    type={field.type === "url" ? "url" : "text"}
                    inputMode={field.type === "url" ? "url" : undefined}
                    value={typeof value === "string" ? value : ""}
                    placeholder={field.placeholder}
                    onChange={e => onChange(e.target.value)}
                    className={INPUT_CLASS}
                />
            )}

            {field.help && <p className="text-xs text-muted-foreground leading-relaxed">{field.help}</p>}
        </div>
    )
}

/* ── Liste répétable (les sujets d'une newsletter, par exemple) ── */

function ItemsEditor({
    field,
    items,
    onChange,
}: {
    field: EmailField
    items: EmailItem[]
    onChange: (items: EmailItem[]) => void
}) {
    const itemFields = field.itemFields ?? []
    const max = field.maxItems ?? 10

    const update = (index: number, key: string, value: string) =>
        onChange(items.map((item, i) => (i === index ? { ...item, [key]: value } : item)))

    const remove = (index: number) => onChange(items.filter((_, i) => i !== index))

    const move = (index: number, delta: number) => {
        const target = index + delta
        if (target < 0 || target >= items.length) return
        const next = [...items]
        ;[next[index], next[target]] = [next[target], next[index]]
        onChange(next)
    }

    const add = () =>
        onChange([
            ...items,
            {
                _id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                ...Object.fromEntries(itemFields.map(f => [f.key, ""])),
            } as EmailItem,
        ])

    return (
        <div className="space-y-3">
            {items.map((item, index) => (
                <div key={item._id ?? index} className="rounded-xl border border-border bg-muted/30 p-3.5 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                            Sujet {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex items-center gap-0.5">
                            <button
                                type="button"
                                onClick={() => move(index, -1)}
                                disabled={index === 0}
                                aria-label="Monter"
                                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            >
                                <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => move(index, 1)}
                                disabled={index === items.length - 1}
                                aria-label="Descendre"
                                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            >
                                <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                aria-label="Supprimer ce sujet"
                                className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    {itemFields.map(sub => (
                        <div key={sub.key} className="space-y-1.5">
                            <label className="block text-xs font-medium text-muted-foreground">{sub.label}</label>
                            {sub.type === "richtext" ? (
                                <textarea
                                    rows={3}
                                    value={item[sub.key] ?? ""}
                                    placeholder={sub.placeholder}
                                    onChange={e => update(index, sub.key, e.target.value)}
                                    className={`${INPUT_CLASS} resize-y leading-relaxed`}
                                />
                            ) : (
                                <input
                                    type={sub.type === "url" ? "url" : "text"}
                                    value={item[sub.key] ?? ""}
                                    placeholder={sub.placeholder}
                                    onChange={e => update(index, sub.key, e.target.value)}
                                    className={INPUT_CLASS}
                                />
                            )}
                        </div>
                    ))}
                </div>
            ))}

            {items.length < max && (
                <button
                    type="button"
                    onClick={add}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-border text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    {field.addLabel ?? "Ajouter"}
                </button>
            )}
        </div>
    )
}
