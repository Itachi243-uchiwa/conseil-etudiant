"use client"

import { ListOrdered } from "lucide-react"

/**
 * Ordre du jour de la séance, affiché point par point.
 *
 * Volontairement figé : la liste vient d'un champ texte saisi à l'admin, une
 * ligne par point. Pas de réordonnancement ni de suivi en direct, ce qui évite
 * une table dédiée et un éditeur pour un contenu qui ne bouge plus une fois la
 * séance préparée.
 */
export default function SessionAgenda({ items }: { items?: string[] }) {
    if (!items || items.length === 0) return null

    return (
        <div className="border border-border rounded-2xl bg-card/60 p-5">
            <div className="flex items-center gap-2 mb-4">
                <ListOrdered className="w-4 h-4 text-primary" />
                <h2 className="font-semibold text-lg">Ordre du jour</h2>
            </div>

            <ol className="border border-border rounded-xl overflow-hidden">
                {items.map((point, index) => (
                    <li
                        key={index}
                        className={`flex gap-3 px-4 py-3 text-sm ${index > 0 ? "border-t border-border" : ""}`}
                    >
                        <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold">
                            {index + 1}
                        </span>
                        <span className="pt-0.5">{point}</span>
                    </li>
                ))}
            </ol>
        </div>
    )
}
