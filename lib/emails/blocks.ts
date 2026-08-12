/**
 * Briques MJML réutilisables.
 *
 * Chaque fonction renvoie un fragment MJML. Un template se contente d'assembler
 * ces briques : c'est ce qui garantit que tous les mails du CE partagent la même
 * grille, les mêmes espacements et la même hiérarchie visuelle.
 */

import { esc, safeUrl } from "./format"
import { BRAND, EMAIL_FONT, INK } from "./themes"
import type { BrandConfig, EmailTheme } from "./types"

/** Marges latérales du contenu, identiques partout pour aligner les blocs. */
const GUTTER = "32px"

/* ─────────────────────────── En-tête ─────────────────────────── */

export function headerBlock(theme: EmailTheme, brand: BrandConfig = BRAND): string {
    // Logo officiel du CE à gauche ; à droite, le verrouillage du campus dans sa
    // propre couleur — co-branding immédiatement identifiable.
    const campusMark = theme.kicker
        ? `<mj-image src="${esc(`${brand.markBaseUrl}/${theme.mark}-accent.png`)}" alt="${esc(theme.kicker)}" width="52px" align="right" padding="0" />`
        : `<mj-text align="right" padding="0" font-size="10px" font-weight="700" letter-spacing="1.8px" text-transform="uppercase" color="${INK.muted}">Bruxelles-Brabant</mj-text>`

    return `
    <mj-section background-color="${INK.card}" padding="26px ${GUTTER} 22px">
      <mj-group>
        <mj-column width="64%" vertical-align="middle">
          <mj-image src="${esc(brand.logoUrl)}" alt="${esc(brand.name)}" width="196px" align="left" padding="0" href="${esc(brand.siteUrl)}" />
        </mj-column>
        <mj-column width="36%" vertical-align="middle">
          ${campusMark}
        </mj-column>
      </mj-group>
    </mj-section>
    <mj-section background-color="${theme.accent}" padding="0">
      <mj-column><mj-spacer height="5px" /></mj-column>
    </mj-section>`
}

/* ─────────────────────────── Titre principal ─────────────────────────── */

export function heroBlock(opts: {
    theme: EmailTheme
    eyebrow?: string
    title: string
    subtitle?: string
}): string {
    const { theme, eyebrow, title, subtitle } = opts
    if (!title && !subtitle && !eyebrow) return ""

    return `
    <mj-section background-color="${INK.card}" padding="36px ${GUTTER} 0">
      <mj-column>
        ${eyebrow ? `<mj-text padding="0 0 12px" font-size="11px" font-weight="700" letter-spacing="1.8px" text-transform="uppercase" color="${theme.accentDeep}">${esc(eyebrow)}</mj-text>` : ""}
        ${title ? `<mj-text css-class="ce-title" padding="0" font-size="29px" line-height="1.24" font-weight="700" color="${INK.title}" letter-spacing="-0.4px">${esc(title)}</mj-text>` : ""}
        ${subtitle ? `<mj-text padding="12px 0 0" font-size="17px" line-height="1.55" color="${INK.muted}">${esc(subtitle)}</mj-text>` : ""}
      </mj-column>
    </mj-section>`
}

/** Badge coloré (ex. « Annonce importante »). */
export function badgeBlock(theme: EmailTheme, label: string): string {
    if (!label) return ""
    return `
    <mj-section background-color="${INK.card}" padding="30px ${GUTTER} 0">
      <mj-column>
        <mj-text padding="0" font-size="0px" line-height="0px">
          <span style="display:inline-block;background-color:${theme.tint};color:${theme.accentDeep};border:1px solid ${theme.accent}33;border-radius:999px;padding:7px 14px;font-family:${EMAIL_FONT};font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;">${esc(label)}</span>
        </mj-text>
      </mj-column>
    </mj-section>`
}

/* ─────────────────────────── Corps ─────────────────────────── */

/** Bloc de contenu riche (HTML déjà produit par `richTextToHtml`). */
export function richBlock(html: string, paddingTop = "24px"): string {
    if (!html) return ""
    return `
    <mj-section background-color="${INK.card}" padding="${paddingTop} ${GUTTER} 0">
      <mj-column>
        <mj-text padding="0">${html}</mj-text>
      </mj-column>
    </mj-section>`
}

/** Bouton principal. */
export function buttonBlock(theme: EmailTheme, label: string, url: string): string {
    const href = safeUrl(url)
    if (!label || !href) return ""
    return `
    <mj-section background-color="${INK.card}" padding="28px ${GUTTER} 4px">
      <mj-column>
        <mj-button
          href="${href}"
          align="left"
          background-color="${theme.accent}"
          color="${theme.onAccent}"
          border-radius="10px"
          font-size="15px"
          font-weight="700"
          inner-padding="15px 30px"
          padding="0"
          letter-spacing="0.2px"
        >${esc(label)}</mj-button>
      </mj-column>
    </mj-section>`
}

/** Encadré d'informations pratiques (bande teintée + filet d'accent à gauche). */
export function calloutBlock(theme: EmailTheme, title: string, html: string): string {
    if (!title && !html) return ""
    return `
    <mj-section background-color="${INK.card}" padding="30px ${GUTTER} 0">
      <mj-column>
        <mj-text padding="0">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;">
            <tr>
              <td style="background-color:${theme.tint};border-left:4px solid ${theme.accent};border-radius:0 10px 10px 0;padding:18px 20px;">
                ${title ? `<div style="font-family:${EMAIL_FONT};font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:${theme.accentDeep};margin:0 0 8px;">${esc(title)}</div>` : ""}
                <div style="font-family:${EMAIL_FONT};font-size:15px;line-height:1.6;color:${INK.body};">${html}</div>
              </td>
            </tr>
          </table>
        </mj-text>
      </mj-column>
    </mj-section>`
}

/** Bandeau de détails pratiques : 1 à 3 colonnes (date, heure, lieu…). */
export function detailsBlock(theme: EmailTheme, rows: { label: string; value: string }[]): string {
    const visible = rows.filter(r => r.value)
    if (visible.length === 0) return ""

    const columns = visible
        .map(
            r => `
        <mj-column vertical-align="top">
          <mj-text padding="0 0 6px" font-size="10px" font-weight="700" letter-spacing="1.4px" text-transform="uppercase" color="${theme.accentDeep}">${esc(r.label)}</mj-text>
          <mj-text padding="0" font-size="16px" line-height="1.45" font-weight="600" color="${INK.title}">${esc(r.value)}</mj-text>
        </mj-column>`,
        )
        .join("")

    return `
    <mj-section background-color="${INK.soft}" padding="22px ${GUTTER}" css-class="ce-details">
      ${columns}
    </mj-section>`
}

/** Séparateur discret entre deux temps du message. */
export function dividerBlock(padding = "30px"): string {
    return `
    <mj-section background-color="${INK.card}" padding="${padding} ${GUTTER} 0">
      <mj-column>
        <mj-divider border-width="1px" border-color="${INK.line}" padding="0" />
      </mj-column>
    </mj-section>`
}

/** Entrée de newsletter : numéro, titre, texte et lien « lire la suite ». */
export function articleBlock(
    theme: EmailTheme,
    opts: { index: number; title: string; html: string; url: string; linkLabel: string },
): string {
    const { index, title, html, url, linkLabel } = opts
    if (!title && !html) return ""
    const href = safeUrl(url)

    return `
    <mj-section background-color="${INK.card}" padding="26px ${GUTTER} 0">
      <mj-column>
        <mj-text padding="0 0 8px" font-size="11px" font-weight="700" letter-spacing="1.6px" color="${theme.accentDeep}">${String(index).padStart(2, "0")}</mj-text>
        ${title ? `<mj-text padding="0 0 8px" font-size="19px" line-height="1.35" font-weight="700" color="${INK.title}">${esc(title)}</mj-text>` : ""}
        ${html ? `<mj-text padding="0">${html}</mj-text>` : ""}
        ${
            href && linkLabel
                ? `<mj-text padding="10px 0 0" font-size="15px"><a href="${href}" style="color:${theme.accentDeep};font-weight:700;text-decoration:none;">${esc(linkLabel)} &rarr;</a></mj-text>`
                : ""
        }
      </mj-column>
    </mj-section>`
}

/** Signature (nom + fonction) posée juste avant le pied de mail. */
export function signatureBlock(signature: string): string {
    if (!signature) return ""
    const [first, ...rest] = signature.split("\n").map(l => l.trim()).filter(Boolean)
    return `
    <mj-section background-color="${INK.card}" padding="28px ${GUTTER} 0">
      <mj-column>
        <mj-text padding="0" font-size="15px" line-height="1.55" color="${INK.title}" font-weight="600">${esc(first ?? "")}</mj-text>
        ${rest.length ? `<mj-text padding="4px 0 0" font-size="14px" line-height="1.55" color="${INK.muted}">${rest.map(esc).join("<br />")}</mj-text>` : ""}
      </mj-column>
    </mj-section>`
}

/* ─────────────────────────── Pied de mail ─────────────────────────── */

/**
 * Pied de mail sombre : sigle CE, coordonnées réelles du Conseil et liens.
 * Reprend le fond nuit du site, ce qui donne du poids à la fin du message.
 */
export function footerBlock(theme: EmailTheme, note: string, brand: BrandConfig = BRAND): string {
    const link = (href: string, label: string) =>
        `<a href="${esc(href)}" style="color:${theme.accentOnDark};text-decoration:none;font-weight:600;">${label}</a>`

    const links = [
        link(brand.siteUrl, "Site du CE"),
        theme.url ? link(theme.url, theme.kicker ? "Le campus" : "Nos campus") : "",
        link(brand.instagramUrl, "Instagram"),
        link(brand.facebookUrl, "Facebook"),
        link(brand.contactUrl, "Contact"),
    ]
        .filter(Boolean)
        .join(`<span style="color:#4A4370;padding:0 7px;">·</span>`)

    const contact = [
        `<a href="mailto:${esc(brand.contactEmail)}" style="color:#B9B4D6;text-decoration:none;">${esc(brand.contactEmail)}</a>`,
        `<a href="mailto:${esc(brand.officeEmail)}" style="color:#B9B4D6;text-decoration:none;">${esc(brand.officeEmail)}</a>`,
        `<a href="tel:${esc(brand.phone.replace(/\s/g, ""))}" style="color:#B9B4D6;text-decoration:none;">${esc(brand.phone)}</a>`,
    ].join(`<span style="color:#4A4370;padding:0 7px;">·</span>`)

    return `
    <mj-section background-color="${INK.header}" padding="30px ${GUTTER} 28px">
      <mj-column width="22%" vertical-align="top">
        <mj-image src="${esc(`${brand.markBaseUrl}/ce-white.png`)}" alt="${esc(brand.shortName)}" width="66px" align="left" padding="0 0 12px" />
      </mj-column>
      <mj-column width="78%" vertical-align="top">
        <mj-text padding="0" font-size="15px" font-weight="700" color="#FFFFFF">${esc(brand.name)}</mj-text>
        <mj-text padding="6px 0 0" font-size="13px" line-height="1.6" color="#A9A4C8">${esc(note || brand.tagline)}</mj-text>
        <mj-text padding="14px 0 0" font-size="13px" line-height="1.9">${links}</mj-text>
        <mj-text padding="12px 0 0" font-size="12px" line-height="1.8" color="#8E89B0">${contact}<br />${esc(brand.address)}</mj-text>
      </mj-column>
    </mj-section>`
}

/** Mentions hors carte, en tout petit, comme sur les mails institutionnels. */
function legalBlock(brand: BrandConfig): string {
    return `
    <mj-section padding="18px 24px 34px">
      <mj-column>
        <mj-text align="center" padding="0" font-size="12px" line-height="1.7" color="#8E8BA6">
          Message du Conseil Étudiant de la Haute École Bruxelles-Brabant.<br />
          <a href="${esc(brand.siteUrl)}" style="color:#8E8BA6;text-decoration:underline;">cehe2b.be</a>
        </mj-text>
      </mj-column>
    </mj-section>`
}

/* ─────────────────────────── Document complet ─────────────────────────── */

/**
 * Enveloppe commune : `<mjml>`, styles globaux, carte blanche arrondie,
 * en-tête, contenu du template, pied de mail et mentions.
 */
export function emailDocument(opts: {
    theme: EmailTheme
    brand?: BrandConfig
    subject: string
    preheader?: string
    /** Fragments MJML produits par le template. */
    content: string
    footerNote?: string
}): string {
    const brand = opts.brand ?? BRAND
    const { theme } = opts

    return `<mjml>
  <mj-head>
    <mj-title>${esc(opts.subject || brand.name)}</mj-title>
    ${opts.preheader ? `<mj-preview>${esc(opts.preheader)}</mj-preview>` : ""}
    <mj-attributes>
      <mj-all font-family="${EMAIL_FONT}" />
      <mj-text font-size="16px" line-height="1.65" color="${INK.body}" padding="0" />
      <mj-section padding="0" />
      <mj-column padding="0" />
    </mj-attributes>
    <mj-style>
      a { color: ${theme.accentDeep}; }
      .ce-card { border-radius: 18px; overflow: hidden; }
      .ce-card td { word-break: break-word; }
      @media only screen and (max-width: 480px) {
        .ce-title div { font-size: 24px !important; line-height: 1.28 !important; }
        .ce-details td { padding-bottom: 14px !important; }
      }
    </mj-style>
  </mj-head>
  <mj-body background-color="${INK.page}" width="600px">
    <mj-section padding="28px 0 0"><mj-column><mj-spacer height="1px" /></mj-column></mj-section>
    <mj-wrapper background-color="${INK.card}" border-radius="18px" padding="0" css-class="ce-card">
      ${headerBlock(theme, brand)}
      ${opts.content}
      <mj-section background-color="${INK.card}" padding="0 ${GUTTER} 34px"><mj-column><mj-spacer height="1px" /></mj-column></mj-section>
      ${footerBlock(theme, opts.footerNote ?? "", brand)}
    </mj-wrapper>
    ${legalBlock(brand)}
  </mj-body>
</mjml>`
}
