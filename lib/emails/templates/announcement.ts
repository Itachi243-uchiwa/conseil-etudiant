/**
 * Template « Annonce » — communication officielle ou urgente.
 * Badge coloré en tête, message mis en exergue, appel à l'action net.
 */

import {
    badgeBlock,
    buttonBlock,
    calloutBlock,
    dividerBlock,
    emailDocument,
    heroBlock,
    richBlock,
    signatureBlock,
} from "../blocks"
import { esc } from "../format"
import { EMAIL_FONT, INK } from "../themes"
import type { EmailTemplate, EmailTheme } from "../types"
import {
    buttonLabelField,
    buttonUrlField,
    calloutTextField,
    calloutTitleField,
    closingFields,
    commonDefaults,
    contentField,
    preheaderField,
    subtitleField,
    titleField,
} from "./shared"

/** Phrase clé encadrée, façon « à retenir ». */
function highlightBlock(theme: EmailTheme, text: string): string {
    if (!text) return ""
    return `
    <mj-section background-color="${INK.card}" padding="26px 32px 0">
      <mj-column>
        <mj-text padding="0">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="border:1px solid ${theme.accent}40;border-radius:12px;background-color:${theme.tint};padding:20px 22px;font-family:${EMAIL_FONT};font-size:17px;line-height:1.5;font-weight:600;color:${INK.title};">
                ${esc(text)}
              </td>
            </tr>
          </table>
        </mj-text>
      </mj-column>
    </mj-section>`
}

export const announcementTemplate: EmailTemplate = {
    id: "announcement",
    name: "Annonce",
    description: "Une information officielle mise en avant, avec phrase clé encadrée.",
    usage: "Décisions, résultats d'élections, changements de règlement, alertes.",

    fields: [
        preheaderField,
        { key: "badge", label: "Étiquette", type: "text", group: "entete", placeholder: "Ex. : Annonce importante", help: "Petite pastille colorée affichée tout en haut." },
        titleField,
        subtitleField,
        { key: "highlight", label: "Phrase clé", type: "text", group: "contenu", placeholder: "L'information à retenir en une phrase.", help: "Affichée dans un cadre coloré, juste sous le titre." },
        contentField,
        buttonLabelField,
        buttonUrlField,
        calloutTitleField,
        calloutTextField,
        ...closingFields,
    ],

    defaults: {
        preheader: "Une annonce officielle du Conseil Étudiant.",
        badge: "Annonce importante",
        title: "Objet de l'annonce",
        subtitle: "Le contexte en une phrase.",
        highlight: "L'information essentielle à retenir, en une phrase.",
        content:
            "Bonjour à toutes et à tous,\n\n" +
            "Détaillez ici l'annonce : ce qui change, à partir de quand, et ce que cela implique " +
            "concrètement pour les étudiant·es.\n\n" +
            "## Ce qu'il faut faire\n\n" +
            "1. première démarche\n" +
            "2. deuxième démarche",
        buttonLabel: "Consulter les détails",
        buttonUrl: "https://www.cehe2b.be",
        calloutTitle: "Une question ?",
        calloutText: "Écrivez-nous à [ce@he2b.be](mailto:ce@he2b.be) ou passez au local du CE.",
        signature: "Le Conseil Étudiant HE2B",
        ...commonDefaults,
    },

    build: ({ v, rich, theme, brand }) =>
        emailDocument({
            theme,
            brand,
            subject: v("title"),
            preheader: v("preheader") || v("highlight"),
            footerNote: v("footerNote"),
            content: [
                badgeBlock(theme, v("badge")),
                heroBlock({ theme, title: v("title"), subtitle: v("subtitle") }),
                highlightBlock(theme, v("highlight")),
                richBlock(rich("content")),
                buttonBlock(theme, v("buttonLabel"), v("buttonUrl")),
                calloutBlock(theme, v("calloutTitle"), rich("calloutText")),
                dividerBlock(),
                signatureBlock(v("signature")),
            ].join(""),
        }),
}
