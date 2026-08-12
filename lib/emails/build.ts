/**
 * Construction de la source MJML à partir des valeurs saisies.
 *
 * Fonction pure : aucune dépendance Node, elle peut donc être utilisée aussi
 * bien côté serveur (route de compilation) que côté client si besoin.
 */

import { richTextToHtml } from "./format"
import { getTemplate } from "./templates"
import { BRAND, getTheme } from "./themes"
import type { EmailItem, EmailValues, TemplateContext } from "./types"

function asText(value: unknown): string {
    return typeof value === "string" ? value.trim() : ""
}

function asItems(value: unknown): EmailItem[] {
    if (!Array.isArray(value)) return []
    return value.filter((item): item is EmailItem => !!item && typeof item === "object")
}

export function buildMjml(input: {
    templateId: string
    themeId: string
    values: EmailValues
}): string {
    const template = getTemplate(input.templateId)
    const theme = getTheme(input.themeId)
    const values = input.values ?? {}

    const ctx: TemplateContext = {
        v: key => asText(values[key]),
        items: key => asItems(values[key]),
        rich: key => richTextToHtml(asText(values[key]), theme.accentDeep),
        theme,
        brand: BRAND,
    }

    return template.build(ctx)
}
