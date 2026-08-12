/**
 * Template « Newsletter » — plusieurs sujets dans un seul mail.
 * Introduction, puis une suite d'articles numérotés séparés par des filets.
 */

import {
    articleBlock,
    buttonBlock,
    dividerBlock,
    emailDocument,
    heroBlock,
    richBlock,
    signatureBlock,
} from "../blocks"
import { richTextToHtml } from "../format"
import type { EmailTemplate } from "../types"
import {
    buttonLabelField,
    buttonUrlField,
    closingFields,
    commonDefaults,
    eyebrowField,
    preheaderField,
    subtitleField,
    titleField,
} from "./shared"

export const newsletterTemplate: EmailTemplate = {
    id: "newsletter",
    name: "Newsletter",
    description: "Plusieurs sujets numérotés à la suite, avec lien vers chaque article.",
    usage: "Récap mensuel, actualités du CE, revue des campus.",

    fields: [
        preheaderField,
        { ...eyebrowField, placeholder: "Ex. : Newsletter · Mars 2026" },
        titleField,
        subtitleField,
        {
            key: "intro",
            label: "Introduction",
            type: "richtext",
            group: "contenu",
            rows: 5,
            placeholder: "Quelques lignes pour ouvrir la newsletter.",
        },
        {
            key: "articles",
            label: "Sujets",
            type: "items",
            group: "contenu",
            addLabel: "Ajouter un sujet",
            maxItems: 8,
            help: "Chaque sujet devient un bloc numéroté dans le mail.",
            itemFields: [
                { key: "title", label: "Titre du sujet", type: "text", placeholder: "Ex. : Nouvelle salle d'étude au campus ISIB" },
                { key: "text", label: "Résumé", type: "richtext", placeholder: "Deux ou trois phrases suffisent." },
                { key: "url", label: "Lien (facultatif)", type: "url", placeholder: "https://www.cehe2b.be/news/…" },
                { key: "linkLabel", label: "Texte du lien", type: "text", placeholder: "Lire la suite" },
            ],
        },
        { ...buttonLabelField, placeholder: "Ex. : Voir toutes les actualités" },
        buttonUrlField,
        ...closingFields,
    ],

    defaults: {
        preheader: "Les actualités de votre Conseil Étudiant.",
        eyebrow: "Newsletter",
        title: "Les actus du Conseil Étudiant",
        subtitle: "Ce qui a bougé ce mois-ci sur vos campus.",
        intro: "Bonjour à toutes et à tous,\n\nVoici l'essentiel de l'actualité du CE ce mois-ci.",
        articles: [
            {
                _id: "a1",
                title: "Premier sujet",
                text: "Résumez le sujet en deux ou trois phrases.",
                url: "https://www.cehe2b.be/news",
                linkLabel: "Lire la suite",
            },
            {
                _id: "a2",
                title: "Deuxième sujet",
                text: "Un autre point d'actualité, tout aussi bref.",
                url: "",
                linkLabel: "",
            },
        ],
        buttonLabel: "Voir toutes les actualités",
        buttonUrl: "https://www.cehe2b.be/news",
        signature: "Le Conseil Étudiant HE2B",
        ...commonDefaults,
    },

    build: ({ v, rich, items, theme, brand }) => {
        const articles = items("articles").filter(a => (a.title ?? "").trim() || (a.text ?? "").trim())

        const articlesMjml = articles
            .map((article, i) =>
                [
                    i > 0 ? dividerBlock("26px") : "",
                    articleBlock(theme, {
                        index: i + 1,
                        title: (article.title ?? "").trim(),
                        html: richTextToHtml(article.text ?? "", theme),
                        url: article.url ?? "",
                        linkLabel: (article.linkLabel ?? "").trim() || "Lire la suite",
                    }),
                ].join(""),
            )
            .join("")

        return emailDocument({
            theme,
            brand,
            subject: v("title"),
            preheader: v("preheader") || v("subtitle"),
            footerNote: v("footerNote"),
            content: [
                heroBlock({ theme, eyebrow: v("eyebrow"), title: v("title"), subtitle: v("subtitle") }),
                richBlock(rich("intro")),
                articles.length ? dividerBlock("30px") : "",
                articlesMjml,
                buttonBlock(theme, v("buttonLabel"), v("buttonUrl")),
                signatureBlock(v("signature")),
            ].join(""),
        })
    },
}
