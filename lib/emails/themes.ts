/**
 * Identité graphique des mails.
 *
 * Transposition de l'univers du site cehe2b.be vers les contraintes des clients
 * mail : bandeau d'en-tête sombre + logo doré (identité CE), couleur d'accent
 * portée par le campus, corps de mail clair et lisible.
 */

import type { BrandConfig, EmailTheme } from "./types"

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cehe2b.be").replace(/\/+$/, "")

export const BRAND: BrandConfig = {
    name: "Conseil Étudiant HE2B",
    shortName: "CE HE2B",
    tagline: "Votre voix au sein de la Haute École Bruxelles-Brabant",
    siteUrl: SITE_URL,
    logoUrl: `${SITE_URL}/logo.png`,
    markBaseUrl: `${SITE_URL}/emails/logos`,
    contactUrl: `${SITE_URL}/contact`,
    contactEmail: "ce@he2b.be",
    officeEmail: "bureau-@cehe2b.be",
    phone: "+32 495 79 99 75",
    address: "Campus ISIB — Rue Royale 150, 1000 Bruxelles",
    instagramUrl: "https://www.instagram.com/cehe2b",
    facebookUrl: "https://www.facebook.com/CEHE2B",
}

/**
 * Neutres communs à tous les thèmes.
 * `page` reprend le bleu très clair de la palette du site (#F0F3FD),
 * `header` un violet-nuit dérivé du thème sombre.
 */
export const INK = {
    page: "#ECEFFA",
    card: "#FFFFFF",
    header: "#171334",
    title: "#181533",
    body: "#474461",
    muted: "#797691",
    line: "#E7E9F6",
    soft: "#F6F7FD",
    /** Séparateur visible sur le fond de page, hors carte (mentions légales). */
    faint: "#B6B9D2",
    gold: "#D4AF37",
    /** Neutres posés sur le bandeau sombre du pied de mail. */
    onDark: "#FFFFFF",
    onDarkSoft: "#A8A3C6",
    onDarkMuted: "#8A85AD",
    onDarkLine: "#2C2657",
}

export const EMAIL_FONT =
    "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif"

/**
 * Hex → `rgba()`. Sert aux ombres douces posées via `<mj-style>` : les clients
 * qui les gèrent (Apple Mail, Gmail web) y gagnent du relief, les autres
 * affichent simplement des blocs plats.
 */
export function rgba(hex: string, alpha: number): string {
    const value = hex.replace("#", "")
    const full = value.length === 3 ? value.split("").map(c => c + c).join("") : value
    const int = Number.parseInt(full, 16)
    const r = (int >> 16) & 255
    const g = (int >> 8) & 255
    const b = int & 255
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * Thèmes disponibles : l'identité CE générale, puis un thème par campus dont
 * la couleur reprend celle exposée par le back-office (`/api/campus`).
 */
export const EMAIL_THEMES: EmailTheme[] = [
    {
        id: "general",
        mark: "ce",
        name: "CE HE2B — général",
        accent: "#3F3290",
        accentDeep: "#3A2D87",
        accentOnDark: "#B9B0F2",
        onAccent: "#FFFFFF",
        tint: "#F2F1FC",
        url: `${SITE_URL}/campus`,
    },
    {
        id: "defre",
        mark: "defre",
        name: "Campus Defré",
        kicker: "Campus Defré",
        accent: "#007933",
        accentDeep: "#016B2E",
        accentOnDark: "#7BD9A2",
        onAccent: "#FFFFFF",
        tint: "#EDF7F1",
        url: `${SITE_URL}/campus/campus-defre`,
    },
    {
        id: "esi",
        mark: "esi",
        name: "Campus ESI",
        kicker: "Campus ESI",
        accent: "#20CAD2",
        accentDeep: "#0C7A80",
        accentOnDark: "#7FE6EB",
        onAccent: "#08292B",
        tint: "#ECFAFB",
        url: `${SITE_URL}/campus/campus-esi`,
    },
    {
        id: "iessid",
        mark: "iessid",
        name: "Campus IESSID",
        kicker: "Campus IESSID",
        accent: "#D98B43",
        accentDeep: "#9C5A15",
        accentOnDark: "#F0BE8C",
        onAccent: "#2E1A05",
        tint: "#FBF3EA",
        url: `${SITE_URL}/campus/campus-iessid`,
    },
    {
        id: "isek",
        mark: "isek",
        name: "Campus ISEK",
        kicker: "Campus ISEK",
        accent: "#99D218",
        accentDeep: "#4E6D08",
        accentOnDark: "#C6EC79",
        onAccent: "#1F2C06",
        tint: "#F4FAE6",
        url: `${SITE_URL}/campus/campus-isek`,
    },
    {
        id: "ises",
        mark: "ises",
        name: "Campus ISES",
        kicker: "Campus ISES",
        accent: "#7E1817",
        accentDeep: "#701413",
        accentOnDark: "#E39B9A",
        onAccent: "#FFFFFF",
        tint: "#F9EDED",
        url: `${SITE_URL}/campus/campus-ises`,
    },
    {
        id: "nivelles",
        mark: "nivelles",
        name: "Campus Nivelles",
        kicker: "Campus Nivelles",
        accent: "#E6007D",
        accentDeep: "#B00062",
        accentOnDark: "#FF8FC8",
        onAccent: "#FFFFFF",
        tint: "#FDECF5",
        url: `${SITE_URL}/campus/campus-nivelles`,
    },
]

export const DEFAULT_THEME_ID = "general"

export function getTheme(id: string | undefined): EmailTheme {
    return EMAIL_THEMES.find(t => t.id === id) ?? EMAIL_THEMES[0]
}
