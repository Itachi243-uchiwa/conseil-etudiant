/**
 * Mise en forme légère du contenu saisi → HTML compatible clients mail.
 *
 * Volontairement minimal (pas d'éditeur WYSIWYG à maintenir) : on accepte une
 * syntaxe proche de Markdown que n'importe qui peut apprendre en 10 secondes,
 * et on produit du HTML dont TOUS les styles sont en ligne — condition
 * indispensable pour survivre à Outlook, Gmail & consorts.
 *
 *   **gras**            *italique*
 *   [texte](https://…)  ## sous-titre
 *   - liste à puces     1. liste numérotée
 *   > citation          ligne vide = nouveau paragraphe
 */

import { INK } from "./themes"

/** Échappe le texte destiné à du HTML/MJML. */
export function esc(input: string): string {
    return String(input ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
}

/** N'autorise que des URLs réellement cliquables dans un mail. */
export function safeUrl(url: string): string | null {
    const trimmed = (url ?? "").trim()
    if (!trimmed) return null
    if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmed)) return esc(trimmed)
    // Une adresse saisie sans schéma reste utilisable : on préfixe en https.
    if (/^[\w-]+(\.[\w-]+)+([/?#].*)?$/.test(trimmed)) return esc(`https://${trimmed}`)
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return esc(`mailto:${trimmed}`)
    return null
}

interface InlineOptions {
    linkColor: string
}

/** Applique gras / italique / liens sur une ligne déjà échappée. */
function inline(raw: string, opts: InlineOptions): string {
    let out = esc(raw)

    // Liens [texte](url) — traités avant gras/italique pour ne pas casser les URLs.
    out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (match, label: string, url: string) => {
        const href = safeUrl(url.replace(/&amp;/g, "&"))
        if (!href) return label
        return `<a href="${href}" style="color:${opts.linkColor};font-weight:600;text-decoration:underline;">${label}</a>`
    })

    out = out.replace(/\*\*([^*]+)\*\*/g, `<strong style="color:${INK.title};font-weight:700;">$1</strong>`)
    out = out.replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,;:!?]|$)/g, "$1<em>$2</em>")
    out = out.replace(/(^|[\s(])_([^_\n]+)_(?=[\s).,;:!?]|$)/g, "$1<em>$2</em>")

    return out
}

const P_STYLE = (last: boolean) =>
    `margin:0 0 ${last ? "0" : "16px"};font-size:16px;line-height:1.65;color:${INK.body};`
const H_STYLE = `margin:26px 0 10px;font-size:18px;line-height:1.4;font-weight:700;color:${INK.title};`
const LI_STYLE = `margin:0 0 8px;font-size:16px;line-height:1.6;color:${INK.body};`

type Block =
    | { kind: "p"; lines: string[] }
    | { kind: "h"; text: string }
    | { kind: "ul"; lines: string[] }
    | { kind: "ol"; lines: string[] }
    | { kind: "quote"; lines: string[] }

/** Découpe le texte brut en blocs (paragraphes, listes, titres, citations). */
function toBlocks(source: string): Block[] {
    const lines = String(source ?? "").replace(/\r\n?/g, "\n").split("\n")
    const blocks: Block[] = []
    let current: Block | null = null

    const push = () => {
        if (current) blocks.push(current)
        current = null
    }

    for (const line of lines) {
        const trimmed = line.trim()

        if (!trimmed) { push(); continue }

        const heading = /^#{2,3}\s+(.*)$/.exec(trimmed)
        if (heading) { push(); blocks.push({ kind: "h", text: heading[1] }); continue }

        const bullet = /^[-*•]\s+(.*)$/.exec(trimmed)
        if (bullet) {
            if (current?.kind !== "ul") { push(); current = { kind: "ul", lines: [] } }
            current.lines.push(bullet[1])
            continue
        }

        const ordered = /^\d+[.)]\s+(.*)$/.exec(trimmed)
        if (ordered) {
            if (current?.kind !== "ol") { push(); current = { kind: "ol", lines: [] } }
            current.lines.push(ordered[1])
            continue
        }

        const quote = /^>\s?(.*)$/.exec(trimmed)
        if (quote) {
            if (current?.kind !== "quote") { push(); current = { kind: "quote", lines: [] } }
            current.lines.push(quote[1])
            continue
        }

        if (current?.kind !== "p") { push(); current = { kind: "p", lines: [] } }
        current.lines.push(trimmed)
    }
    push()

    return blocks
}

/**
 * Convertit le contenu saisi en HTML prêt à être injecté dans un `<mj-text>`.
 * Retourne "" si le contenu est vide (le template peut alors omettre le bloc).
 */
export function richTextToHtml(source: string, accentDeep: string): string {
    const blocks = toBlocks(source)
    if (blocks.length === 0) return ""

    const opts: InlineOptions = { linkColor: accentDeep }

    return blocks
        .map((block, index) => {
            const last = index === blocks.length - 1

            switch (block.kind) {
                case "h":
                    return `<h3 style="${index === 0 ? H_STYLE.replace("margin:26px", "margin:0px") : H_STYLE}">${inline(block.text, opts)}</h3>`

                case "ul":
                    return `<ul style="margin:0 0 ${last ? "0" : "16px"};padding:0 0 0 22px;">${block.lines
                        .map(li => `<li style="${LI_STYLE}">${inline(li, opts)}</li>`)
                        .join("")}</ul>`

                case "ol":
                    return `<ol style="margin:0 0 ${last ? "0" : "16px"};padding:0 0 0 22px;">${block.lines
                        .map(li => `<li style="${LI_STYLE}">${inline(li, opts)}</li>`)
                        .join("")}</ol>`

                case "quote":
                    return `<blockquote style="margin:0 0 ${last ? "0" : "16px"};padding:2px 0 2px 16px;border-left:3px solid ${accentDeep};font-size:16px;line-height:1.6;color:${INK.title};font-style:italic;">${block.lines
                        .map(l => inline(l, opts))
                        .join("<br />")}</blockquote>`

                default:
                    return `<p style="${P_STYLE(last)}">${block.lines.map(l => inline(l, opts)).join("<br />")}</p>`
            }
        })
        .join("")
}

/** Version texte simple, utilisée pour la copie « texte brut ». */
export function richTextToPlain(source: string): string {
    return String(source ?? "")
        .replace(/\r\n?/g, "\n")
        .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1 ($2)")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/(^|\s)[*_]([^*_\n]+)[*_]/g, "$1$2")
        .replace(/^#{2,3}\s+/gm, "")
        .trim()
}
