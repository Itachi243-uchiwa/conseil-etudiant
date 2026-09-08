/**
 * Champs communs à plusieurs templates.
 *
 * Réutiliser ces définitions garantit qu'un même champ (« Titre », « Contenu »…)
 * porte le même libellé et la même aide partout — et qu'un nouveau template
 * s'écrit en quelques lignes.
 */

import type { EmailField } from "../types"

export const preheaderField: EmailField = {
    key: "preheader",
    label: "Texte d'aperçu",
    type: "text",
    group: "entete",
    placeholder: "Phrase affichée à côté de l'objet dans la boîte de réception",
    help: "Invisible dans le mail, mais visible dans la liste des messages Gmail.",
}

export const eyebrowField: EmailField = {
    key: "eyebrow",
    label: "Sur-titre",
    type: "text",
    group: "entete",
    placeholder: "Ex. : Communication officielle",
    help: "Petite ligne colorée au-dessus du titre. Facultatif.",
}

export const titleField: EmailField = {
    key: "title",
    label: "Titre du mail",
    type: "text",
    group: "entete",
    placeholder: "Ex. : Élections du Conseil Étudiant 2026",
}

export const subtitleField: EmailField = {
    key: "subtitle",
    label: "Sous-titre",
    type: "text",
    group: "entete",
    placeholder: "Une phrase qui résume le message. Facultatif.",
}

export const contentField: EmailField = {
    key: "content",
    label: "Contenu principal",
    type: "richtext",
    group: "contenu",
    rows: 12,
    placeholder:
        "Bonjour à toutes et à tous,\n\nVoici les informations concernant …\n\n- premier point\n- second point",
}

export const buttonLabelField: EmailField = {
    key: "buttonLabel",
    label: "Texte du bouton",
    type: "text",
    group: "action",
    placeholder: "Ex. : Je m'inscris",
}

export const buttonUrlField: EmailField = {
    key: "buttonUrl",
    label: "Lien du bouton",
    type: "url",
    group: "action",
    placeholder: "https://www.cehe2b.be/…",
    help: "Le bouton n'apparaît que si le texte ET le lien sont remplis.",
}

export const calloutTitleField: EmailField = {
    key: "calloutTitle",
    label: "Titre de l'encadré",
    type: "text",
    group: "complement",
    placeholder: "Ex. : Bon à savoir",
}

export const calloutTextField: EmailField = {
    key: "calloutText",
    label: "Informations complémentaires",
    type: "richtext",
    group: "complement",
    rows: 5,
    placeholder: "Détails pratiques, contacts, pièces à prévoir…",
}

export const signatureField: EmailField = {
    key: "signature",
    label: "Signature",
    type: "richtext",
    group: "pied",
    rows: 3,
    placeholder: "Prénom Nom\nPrésident·e du Conseil Étudiant HE2B",
    help: "Première ligne en gras, les suivantes en gris.",
}

export const footerNoteField: EmailField = {
    key: "footerNote",
    label: "Mention du pied de mail",
    type: "text",
    group: "pied",
    placeholder: "Ex. : Vous recevez ce message en tant qu'étudiant·e de la HE2B.",
}

/** Bloc de fin réutilisé par tous les templates. */
export const closingFields: EmailField[] = [signatureField, footerNoteField]

export const commonDefaults = {
    footerNote: "Vous recevez ce message en tant qu'étudiant·e de la Haute École Bruxelles-Brabant.",
}
