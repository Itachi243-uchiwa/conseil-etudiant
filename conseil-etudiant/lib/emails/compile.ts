/**
 * Compilation MJML → HTML compatible clients mail.
 *
 * ⚠️ Serveur uniquement : `mjml` s'appuie sur des APIs Node. Ce module n'est
 * importé que par la route `app/api/emails/compile`.
 */

import mjml2html from "mjml"

import { buildMjml } from "./build"
import type { CompileResult, EmailValues } from "./types"

/** Compile une source MJML. Les erreurs de balisage sont renvoyées, pas jetées. */
export async function compileMjml(source: string): Promise<{ html: string; warnings: string[] }> {
    const result = await mjml2html(source, {
        validationLevel: "soft",
        keepComments: false,
        minify: false,
    })

    return {
        html: result.html,
        warnings: (result.errors ?? []).map((e: any) =>
            typeof e === "string" ? e : (e?.formattedMessage ?? e?.message ?? String(e)),
        ),
    }
}

/** Chaîne complète : valeurs → MJML → HTML. */
export async function renderEmail(input: {
    templateId: string
    themeId: string
    values: EmailValues
}): Promise<CompileResult> {
    const mjml = buildMjml(input)
    const { html, warnings } = await compileMjml(mjml)
    return { html, mjml, warnings }
}
