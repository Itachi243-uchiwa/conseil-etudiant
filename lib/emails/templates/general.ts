/**
 * Template « Général » — le passe-partout.
 * À utiliser dès qu'aucun template plus spécifique ne s'impose.
 */

import {
    buttonBlock,
    calloutBlock,
    emailDocument,
    heroBlock,
    richBlock,
    signatureBlock,
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

export const generalTemplate: EmailTemplate = {
    id: "general",
    name: "Général",
    description: "Un message clair : titre, texte, bouton et encadré facultatifs.",
    usage: "Communications courantes, rappels, informations aux étudiant·es.",

    fields: [
        preheaderField,
        eyebrowField,
        titleField,
        subtitleField,
        contentField,
        buttonLabelField,
        buttonUrlField,
        calloutTitleField,
        calloutTextField,
        ...closingFields,
    ],

    defaults: {
        preheader: "Une information importante de votre Conseil Étudiant.",
        eyebrow: "Communication du CE",
        title: "Titre de votre message",
        subtitle: "Une phrase de contexte pour donner envie de lire la suite.",
        content:
            "Bonjour à toutes et à tous,\n\n" +
            "Écrivez ici le corps de votre message. Vous pouvez mettre des mots en **gras**, en *italique*, " +
            "ajouter un [lien](https://www.cehe2b.be) ou une liste :\n\n" +
            "- un premier point\n" +
            "- un deuxième point\n\n" +
            "N'hésitez pas à nous contacter pour toute question.",
        buttonLabel: "En savoir plus",
        buttonUrl: "https://www.cehe2b.be",
        calloutTitle: "Bon à savoir",
        calloutText: "Ajoutez ici les informations pratiques : dates, lieux, contacts.",
        signature: "Le Conseil Étudiant HE2B\nVotre voix au sein de la Haute École",
        ...commonDefaults,
    },

    build: ({ v, rich, theme, brand }) =>
        emailDocument({
            theme,
            brand,
            subject: v("title"),
            preheader: v("preheader") || v("subtitle"),
            footerNote: v("footerNote"),
            content: [
                heroBlock({ theme, eyebrow: v("eyebrow"), title: v("title"), subtitle: v("subtitle") }),
                richBlock(rich("content")),
                buttonBlock(theme, v("buttonLabel"), v("buttonUrl")),
                calloutBlock(theme, v("calloutTitle"), rich("calloutText")),
                signatureBlock(v("signature")),
            ].join(""),
        }),
}
