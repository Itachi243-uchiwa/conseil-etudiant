/**
 * Template « Événement » — invitation à une AG, une soirée, un atelier…
 * Bandeau date / heure / lieu et bouton d'inscription.
 */

import {
    buttonBlock,
    calloutBlock,
    detailsBlock,
    emailDocument,
    heroBlock,
    richBlock,
    signatureBlock,
    spacerBlock,
} from "../blocks"
import type { EmailTemplate } from "../types"
import {
    buttonLabelField,
    buttonUrlField,
    calloutTextField,
    calloutTitleField,
    closingFields,
    commonDefaults,
    contentField,
    eyebrowField,
    preheaderField,
    subtitleField,
    titleField,
} from "./shared"

export const eventTemplate: EmailTemplate = {
    id: "event",
    name: "Événement",
    description: "Invitation avec bandeau date / heure / lieu et bouton d'inscription.",
    usage: "Assemblées générales, soirées, ateliers, permanences.",

    fields: [
        preheaderField,
        { ...eyebrowField, placeholder: "Ex. : Invitation" },
        titleField,
        subtitleField,
        { key: "eventDate", label: "Date", type: "text", group: "entete", placeholder: "Jeudi 12 mars 2026" },
        { key: "eventTime", label: "Heure", type: "text", group: "entete", placeholder: "18h00 – 20h30" },
        { key: "eventPlace", label: "Lieu", type: "text", group: "entete", placeholder: "Campus ESI, local 2.14" },
        contentField,
        { ...buttonLabelField, placeholder: "Ex. : Je m'inscris" },
        buttonUrlField,
        { ...calloutTitleField, placeholder: "Ex. : Infos pratiques" },
        calloutTextField,
        ...closingFields,
    ],

    defaults: {
        preheader: "Rendez-vous le … — inscrivez-vous dès maintenant.",
        eyebrow: "Invitation",
        title: "Nom de l'événement",
        subtitle: "Une phrase pour donner envie de venir.",
        eventDate: "Jeudi 12 mars 2026",
        eventTime: "18h00 – 20h30",
        eventPlace: "Campus ESI — local 2.14",
        content:
            "Bonjour à toutes et à tous,\n\n" +
            "Le Conseil Étudiant vous invite à … Présentez ici le déroulé et l'intérêt de l'événement.\n\n" +
            "## Au programme\n\n" +
            "- accueil et introduction\n" +
            "- temps d'échange\n" +
            "- verre de clôture",
        buttonLabel: "Je m'inscris",
        buttonUrl: "https://www.cehe2b.be/events",
        calloutTitle: "Infos pratiques",
        calloutText:
            "Entrée libre pour les étudiant·es de la HE2B. Pensez à votre carte étudiante.",
        signature: "Le Conseil Étudiant HE2B",
        ...commonDefaults,
    },

    build: ({ v, rich, theme, brand }) =>
        emailDocument({
            theme,
            brand,
            subject: v("title"),
            preheader: v("preheader") || [v("eventDate"), v("eventTime"), v("eventPlace")].filter(Boolean).join(" · "),
            footerNote: v("footerNote"),
            content: [
                heroBlock({ theme, eyebrow: v("eyebrow"), title: v("title"), subtitle: v("subtitle") }),
                spacerBlock("30px"),
                detailsBlock(theme, [
                    { label: "Date", value: v("eventDate") },
                    { label: "Heure", value: v("eventTime") },
                    { label: "Lieu", value: v("eventPlace") },
                ]),
                richBlock(rich("content"), "28px"),
                buttonBlock(theme, v("buttonLabel"), v("buttonUrl")),
                calloutBlock(theme, v("calloutTitle"), rich("calloutText")),
                signatureBlock(v("signature")),
            ].join(""),
        }),
}
