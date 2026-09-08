"use client"

/**
 * Récupération du mail généré : presse-papiers (HTML enrichi ou source),
 * téléchargement et ouverture dans un onglet.
 *
 * Aucun envoi n'est effectué : l'expédition se fait ensuite manuellement
 * depuis Gmail, avec les adresses institutionnelles.
 */

export type CopyOutcome = "rich" | "failed"

/** Styles de `<head>` + contenu de `<body>` : ce qu'on met dans le presse-papiers. */
export function toClipboardFragment(html: string): string {
    const body = /<body[^>]*>([\s\S]*?)<\/body>/i.exec(html)?.[1] ?? html
    const styles = Array.from(html.matchAll(/<style[^>]*>[\s\S]*?<\/style>/gi))
        .map(m => m[0])
        .join("")
    return `${styles}${body}`
}

/** Version texte, utilisée comme repli quand la mise en forme est perdue. */
export function toPlainText(html: string): string {
    if (typeof window === "undefined") return ""
    const doc = new DOMParser().parseFromString(html, "text/html")
    doc.querySelectorAll("style, script, title").forEach(node => node.remove())
    // Le pré-en-tête MJML est masqué visuellement : on ne le copie pas.
    doc.querySelectorAll<HTMLElement>("[style*='display:none'], [style*='display: none']").forEach(node => node.remove())

    return (doc.body?.textContent ?? "")
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean)
        .join("\n")
        .replace(/\n{3,}/g, "\n\n")
}

/**
 * Copie le mail *mis en forme*. Deux voies :
 *  1. l'API Clipboard moderne (`text/html` + `text/plain`) ;
 *  2. à défaut, une sélection invisible + `execCommand("copy")`, qui reste le
 *     seul chemin sur quelques navigateurs anciens.
 */
export async function copyRichEmail(html: string): Promise<CopyOutcome> {
    const fragment = toClipboardFragment(html)
    const plain = toPlainText(html)

    if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
        try {
            await navigator.clipboard.write([
                new ClipboardItem({
                    "text/html": new Blob([fragment], { type: "text/html" }),
                    "text/plain": new Blob([plain], { type: "text/plain" }),
                }),
            ])
            return "rich"
        } catch {
            // On tente le repli ci-dessous.
        }
    }

    const holder = document.createElement("div")
    holder.setAttribute("contenteditable", "true")
    holder.style.cssText = "position:fixed;left:-99999px;top:0;opacity:0;pointer-events:none;"
    holder.innerHTML = fragment
    document.body.appendChild(holder)

    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(holder)
    selection?.removeAllRanges()
    selection?.addRange(range)

    let copied = false
    try {
        copied = document.execCommand("copy")
    } catch {
        copied = false
    }

    selection?.removeAllRanges()
    holder.remove()

    return copied ? "rich" : "failed"
}

/** Copie un texte brut (code HTML, source MJML…). */
export async function copyText(value: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(value)
        return true
    } catch {
        const area = document.createElement("textarea")
        area.value = value
        area.style.cssText = "position:fixed;left:-99999px;top:0;"
        document.body.appendChild(area)
        area.select()
        let copied = false
        try {
            copied = document.execCommand("copy")
        } catch {
            copied = false
        }
        area.remove()
        return copied
    }
}

export function downloadFile(content: string, filename: string, type = "text/html") {
    const url = URL.createObjectURL(new Blob([content], { type: `${type};charset=utf-8` }))
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function openInNewTab(html: string) {
    const url = URL.createObjectURL(new Blob([html], { type: "text/html;charset=utf-8" }))
    window.open(url, "_blank", "noopener,noreferrer")
    setTimeout(() => URL.revokeObjectURL(url), 60_000)
}

/** Nom de fichier lisible dérivé du titre du mail. */
export function slugify(value: string, fallback = "mail-ce"): string {
    const slug = value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 60)
    return slug || fallback
}
