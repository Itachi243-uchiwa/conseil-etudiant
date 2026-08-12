/**
 * Compilation MJML → HTML pour le générateur de mails de l'espace membres.
 *
 * Cette route ne fait que rendre du HTML : elle n'envoie aucun mail, ne connaît
 * aucun destinataire et n'écrit rien en base.
 */

import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"

import { authOptions } from "@/lib/auth-options"
import { renderEmail } from "@/lib/emails/compile"
import { getTemplate } from "@/lib/emails/templates"
import { getTheme } from "@/lib/emails/themes"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: "Accès réservé aux membres connectés." }, { status: 401 })
    }

    let body: any
    try {
        body = await request.json()
    } catch {
        return NextResponse.json({ error: "Requête invalide." }, { status: 400 })
    }

    const templateId = getTemplate(body?.templateId).id
    const themeId = getTheme(body?.themeId).id
    const values = body?.values && typeof body.values === "object" ? body.values : {}

    try {
        const result = await renderEmail({ templateId, themeId, values })
        return NextResponse.json(result)
    } catch (error: any) {
        console.error("[EMAILS] Échec de la compilation MJML:", error)
        return NextResponse.json(
            { error: error?.message ?? "La compilation du mail a échoué." },
            { status: 500 },
        )
    }
}
