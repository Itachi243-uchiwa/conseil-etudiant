/**
 * Types partagés du module « Générateur de mails ».
 *
 * Le module ne fait qu'une chose : transformer des champs saisis par un·e membre
 * en MJML, puis en HTML compatible clients mail. Aucun envoi n'est effectué ici.
 */

export type FieldType = "text" | "url" | "richtext" | "items"

/** Regroupement visuel des champs dans l'éditeur (colonne de gauche). */
export type FieldGroup = "entete" | "contenu" | "action" | "complement" | "pied"

export const FIELD_GROUPS: { key: FieldGroup; label: string; hint: string }[] = [
    { key: "entete",     label: "En-tête",       hint: "Ce que la personne voit en premier" },
    { key: "contenu",    label: "Contenu",       hint: "Le corps du message" },
    { key: "action",     label: "Appel à l'action", hint: "Le bouton principal" },
    { key: "complement", label: "Compléments",   hint: "Encadré d'informations pratiques" },
    { key: "pied",       label: "Pied de mail",  hint: "Signature et mentions" },
]

export interface ItemFieldDef {
    key: string
    label: string
    type: "text" | "url" | "richtext"
    placeholder?: string
}

export interface EmailField {
    key: string
    label: string
    type: FieldType
    group: FieldGroup
    placeholder?: string
    /** Petite aide affichée sous le champ. */
    help?: string
    /** Nombre de lignes pour les champs `richtext`. */
    rows?: number
    /** Champs d'un élément répétable (`type: "items"`). */
    itemFields?: ItemFieldDef[]
    /** Libellé du bouton d'ajout (`type: "items"`). */
    addLabel?: string
    maxItems?: number
}

/** Un élément d'une liste répétable. `_id` sert uniquement de clé React. */
export type EmailItem = { _id: string } & Record<string, string>

export type EmailValue = string | EmailItem[]
export type EmailValues = Record<string, EmailValue>

/** Palette d'un thème (identité CE générale ou couleurs d'un campus). */
export interface EmailTheme {
    id: string
    /** Nom affiché dans le sélecteur. */
    name: string
    /** Mention affichée sous le logo dans l'en-tête du mail (optionnel). */
    kicker?: string
    /** Couleur principale (bandeau d'accent, boutons). */
    accent: string
    /** Variante assombrie, lisible sur fond blanc (liens, sur-titres). */
    accentDeep: string
    /** Variante éclaircie, lisible sur le bandeau sombre de l'en-tête. */
    accentOnDark: string
    /** Couleur du texte posé sur `accent` (contraste AA). */
    onAccent: string
    /** Fond très clair dérivé de l'accent (encadrés). */
    tint: string
    /** Page campus correspondante sur le site. */
    url?: string
    /** Libellé du lien vers `url` dans le pied de mail. */
    linkLabel?: string
    /**
     * Préfixe des logos PNG servis depuis /public/emails/logos
     * (générés par scripts/generate-email-logos.mjs).
     * Absent pour une entité sans lettrage propre : l'en-tête affiche alors le
     * `kicker` en toutes lettres.
     */
    mark?: string
}

export interface BrandConfig {
    name: string
    shortName: string
    tagline: string
    siteUrl: string
    /** Logo officiel (violet sur fond transparent), servi depuis /public. */
    logoUrl: string
    /** Base des logos PNG dédiés aux mails. */
    markBaseUrl: string
    contactUrl: string
    contactEmail: string
    officeEmail: string
    phone: string
    address: string
    instagramUrl: string
    facebookUrl: string
}

/** Contexte fourni à la fonction `build` d'un template. */
export interface TemplateContext {
    /** Valeur texte d'un champ (déjà trimée, "" si vide). */
    v: (key: string) => string
    /** Éléments d'un champ répétable (liste vide si absent). */
    items: (key: string) => EmailItem[]
    /** Contenu riche converti en HTML compatible mail. */
    rich: (key: string) => string
    theme: EmailTheme
    brand: BrandConfig
}

export interface EmailTemplate {
    id: string
    name: string
    /** Une phrase : à quoi sert ce template. */
    description: string
    /** Exemple d'usage affiché dans le sélecteur. */
    usage: string
    fields: EmailField[]
    defaults: EmailValues
    /** Construit la source MJML complète du mail. */
    build: (ctx: TemplateContext) => string
}

export interface CompileResult {
    html: string
    mjml: string
    warnings: string[]
}
