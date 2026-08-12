/**
 * Briques MJML réutilisables.
 *
 * Chaque fonction renvoie un fragment MJML. Un template se contente d'assembler
 * ces briques : c'est ce qui garantit que tous les mails du CE partagent la même
 * grille, les mêmes espacements et la même hiérarchie visuelle.
 */

import { esc, safeUrl } from "./format"
import { BRAND, EMAIL_FONT, INK, rgba } from "./themes"
import type { BrandConfig, EmailTheme } from "./types"

/** Marges latérales du contenu, identiques partout pour aligner les blocs. */
const GUTTER = "32px"

/** Style commun aux petites capitales colorées (sur-titres, libellés). */
const LABEL = (color: string, size = "11px") =>
    `font-family:${EMAIL_FONT};font-size:${size};font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${color};`

/* ─────────────────────────── En-tête ─────────────────────────── */

export function headerBlock(theme: EmailTheme, brand: BrandConfig = BRAND): string {
    // Le filet d'accent coiffe la carte : la couleur du campus se lit avant même
    // le premier mot. Le logo officiel du CE reste à gauche ; à droite, le
    // verrouillage du campus dans sa propre couleur (co-branding immédiat).
    const campusMark = theme.kicker
        ? `<mj-image src="${esc(`${brand.markBaseUrl}/${theme.mark}-accent.png`)}" alt="${esc(theme.kicker)}" width="54px" align="right" padding="0" />`
        : `<mj-text align="right" padding="0" css-class="ce-header-note">
             <span style="${LABEL(INK.muted, "10px")}line-height:1.6;">Haute École<br />Bruxelles-Brabant</span>
           </mj-text>`

    return `
    <mj-section background-color="${theme.accent}" padding="0">
      <mj-column><mj-spacer height="6px" /></mj-column>
    </mj-section>
    <mj-section background-color="${INK.card}" padding="26px ${GUTTER} 22px" border-bottom="1px solid ${INK.line}">
      <mj-group>
        <mj-column width="60%" vertical-align="middle">
          <mj-image src="${esc(brand.logoUrl)}" alt="${esc(brand.name)}" width="188px" align="left" padding="0" href="${esc(brand.siteUrl)}" />
        </mj-column>
        <mj-column width="40%" vertical-align="middle">
          ${campusMark}
        </mj-column>
      </mj-group>
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

    // Court filet d'accent au-dessus du sur-titre : signal éditorial discret qui
    // pose le haut du message sans ajouter de couleur de fond.
    const eyebrowBlock = eyebrow
        ? `<mj-text padding="0 0 14px">
             <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tbody><tr>
               <td width="26" style="padding:0 10px 0 0;"><div style="height:3px;width:26px;background-color:${theme.accent};border-radius:2px;font-size:0;line-height:0;">&nbsp;</div></td>
               <td><span style="${LABEL(theme.accentDeep)}">${esc(eyebrow)}</span></td>
             </tr></tbody></table>
           </mj-text>`
        : ""

    return `
    <mj-section background-color="${INK.card}" padding="38px ${GUTTER} 0">
      <mj-column>
        ${eyebrowBlock}
        ${title ? `<mj-text css-class="ce-title" padding="0" font-size="31px" line-height="1.2" font-weight="700" color="${INK.title}" letter-spacing="-0.6px">${esc(title)}</mj-text>` : ""}
        ${subtitle ? `<mj-text padding="14px 0 0" font-size="17px" line-height="1.6" color="${INK.muted}">${esc(subtitle)}</mj-text>` : ""}
      </mj-column>
    </mj-section>`
}

/** Pastille pleine (ex. « Annonce importante ») : la note la plus appuyée du mail. */
export function badgeBlock(theme: EmailTheme, label: string): string {
    if (!label) return ""
    return `
    <mj-section background-color="${INK.card}" padding="32px ${GUTTER} 0">
      <mj-column>
        <mj-text padding="0" font-size="0px" line-height="0px">
          <span style="display:inline-block;background-color:${theme.accent};color:${theme.onAccent};border-radius:999px;padding:8px 15px;${LABEL(theme.onAccent, "10px")}">${esc(label)}</span>
        </mj-text>
      </mj-column>
    </mj-section>`
}

/* ─────────────────────────── Corps ─────────────────────────── */

/** Bloc de contenu riche (HTML déjà produit par `richTextToHtml`). */
export function richBlock(html: string, paddingTop = "26px"): string {
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
    <mj-section background-color="${INK.card}" padding="30px ${GUTTER} 4px">
      <mj-column>
        <mj-button
          css-class="ce-button"
          href="${href}"
          align="left"
          background-color="${theme.accent}"
          color="${theme.onAccent}"
          border-radius="12px"
          font-size="16px"
          font-weight="700"
          inner-padding="16px 32px"
          padding="0"
          letter-spacing="0.2px"
        >${esc(label)}</mj-button>
      </mj-column>
    </mj-section>`
}

/**
 * Phrase clé encadrée, façon « à retenir » : fond teinté du campus et filet
 * d'accent épais. C'est le bloc le plus chargé visuellement du corps de mail.
 */
export function highlightBlock(theme: EmailTheme, text: string): string {
    if (!text) return ""
    return `
    <mj-section background-color="${INK.card}" padding="28px ${GUTTER} 0">
      <mj-column>
        <mj-text padding="0">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;">
            <tbody><tr>
              <td style="background-color:${theme.tint};border-left:4px solid ${theme.accent};border-radius:0 14px 14px 0;padding:22px 24px;font-family:${EMAIL_FONT};font-size:18px;line-height:1.5;font-weight:600;color:${INK.title};">
                ${esc(text)}
              </td>
            </tr></tbody>
          </table>
        </mj-text>
      </mj-column>
    </mj-section>`
}

/**
 * Encadré d'informations pratiques : panneau neutre bordé.
 * Volontairement plus sobre que `highlightBlock` — il complète, il ne crie pas.
 */
export function calloutBlock(theme: EmailTheme, title: string, html: string): string {
    if (!title && !html) return ""
    return `
    <mj-section background-color="${INK.card}" padding="30px ${GUTTER} 0">
      <mj-column>
        <mj-text padding="0">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;">
            <tbody><tr>
              <td style="background-color:${INK.soft};border:1px solid ${INK.line};border-radius:14px;padding:20px 22px;">
                ${title ? `<div style="${LABEL(theme.accentDeep)}margin:0 0 10px;">${esc(title)}</div>` : ""}
                <div style="font-family:${EMAIL_FONT};font-size:15px;line-height:1.65;color:${INK.body};">${html}</div>
              </td>
            </tr></tbody>
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
          <mj-text padding="0 0 7px"><span style="${LABEL(theme.accentDeep, "10px")}">${esc(r.label)}</span></mj-text>
          <mj-text padding="0" font-size="16px" line-height="1.45" font-weight="600" color="${INK.title}">${esc(r.value)}</mj-text>
        </mj-column>`,
        )
        .join("")

    return `
    <mj-section background-color="${INK.soft}" padding="24px ${GUTTER}" border-top="1px solid ${INK.line}" border-bottom="1px solid ${INK.line}" css-class="ce-details">
      ${columns}
    </mj-section>`
}

/**
 * Respiration verticale sur fond de carte, quand deux blocs se suivent sans
 * filet pour les séparer (le `heroBlock` ne porte pas de marge basse).
 */
export function spacerBlock(height: string): string {
    return `
    <mj-section background-color="${INK.card}" padding="0">
      <mj-column><mj-spacer height="${height}" /></mj-column>
    </mj-section>`
}

/** Séparateur discret entre deux temps du message. */
export function dividerBlock(padding = "32px"): string {
    return `
    <mj-section background-color="${INK.card}" padding="${padding} ${GUTTER} 0">
      <mj-column>
        <mj-divider border-width="1px" border-color="${INK.line}" padding="0" />
      </mj-column>
    </mj-section>`
}

/** Entrée de newsletter : numéro en pastille, titre, texte et lien de renvoi. */
export function articleBlock(
    theme: EmailTheme,
    opts: { index: number; title: string; html: string; url: string; linkLabel: string },
): string {
    const { index, title, html, url, linkLabel } = opts
    if (!title && !html) return ""
    const href = safeUrl(url)
    const number = String(index).padStart(2, "0")

    return `
    <mj-section background-color="${INK.card}" padding="28px ${GUTTER} 0">
      <mj-column>
        <mj-text padding="0 0 12px" font-size="0px" line-height="0px">
          <span style="display:inline-block;background-color:${theme.tint};color:${theme.accentDeep};border-radius:999px;padding:6px 12px;${LABEL(theme.accentDeep, "11px")}letter-spacing:1px;">${number}</span>
        </mj-text>
        ${title ? `<mj-text padding="0 0 10px" font-size="20px" line-height="1.32" font-weight="700" color="${INK.title}" letter-spacing="-0.3px">${esc(title)}</mj-text>` : ""}
        ${html ? `<mj-text padding="0">${html}</mj-text>` : ""}
        ${
            href && linkLabel
                ? `<mj-text padding="12px 0 0" font-size="15px"><a href="${href}" style="color:${theme.accentDeep};font-weight:700;text-decoration:none;">${esc(linkLabel)} <span style="font-weight:400;">&rarr;</span></a></mj-text>`
                : ""
        }
      </mj-column>
    </mj-section>`
}

/**
 * Signature (nom + fonction) posée juste avant le pied de mail.
 * Le filet fait partie du bloc : la fin du message se lit toujours pareil.
 */
export function signatureBlock(signature: string): string {
    if (!signature) return ""
    const [first, ...rest] = signature.split("\n").map(l => l.trim()).filter(Boolean)
    return `
    <mj-section background-color="${INK.card}" padding="34px ${GUTTER} 0">
      <mj-column>
        <mj-divider border-width="1px" border-color="${INK.line}" padding="0 0 22px" />
        <mj-text padding="0" font-size="15px" line-height="1.55" color="${INK.title}" font-weight="700">${esc(first ?? "")}</mj-text>
        ${rest.length ? `<mj-text padding="5px 0 0" font-size="14px" line-height="1.55" color="${INK.muted}">${rest.map(esc).join("<br />")}</mj-text>` : ""}
      </mj-column>
    </mj-section>`
}

/* ─────────────────────────── Pied de mail ─────────────────────────── */

/**
 * Pied de mail sombre : sigle CE, coordonnées réelles du Conseil et liens.
 * Reprend le fond nuit du site, ce qui donne du poids à la fin du message ;
 * un filet d'accent le raccorde au haut de la carte.
 */
export function footerBlock(theme: EmailTheme, note: string, brand: BrandConfig = BRAND): string {
    const dot = `<span style="color:${INK.onDarkLine};padding:0 8px;">&bull;</span>`

    const link = (href: string, label: string) =>
        `<a href="${esc(href)}" style="color:${theme.accentOnDark};text-decoration:none;font-weight:600;white-space:nowrap;">${label}</a>`

    const links = [
        link(brand.siteUrl, "Site du CE"),
        theme.url ? link(theme.url, theme.kicker ? "Le campus" : "Nos campus") : "",
        link(brand.instagramUrl, "Instagram"),
        link(brand.facebookUrl, "Facebook"),
        link(brand.contactUrl, "Contact"),
    ]
        .filter(Boolean)
        .join(dot)

    const mail = (address: string) =>
        `<a href="mailto:${esc(address)}" style="color:${INK.onDarkSoft};text-decoration:none;">${esc(address)}</a>`

    // Deux lignes plutôt qu'une : les adresses d'un côté, le contact physique de
    // l'autre — sinon tout se lit comme une seule bouillie de gris.
    const contact = [mail(brand.contactEmail), mail(brand.officeEmail)].join(dot)
    const reach = [
        `<a href="tel:${esc(brand.phone.replace(/\s/g, ""))}" style="color:${INK.onDarkMuted};text-decoration:none;">${esc(brand.phone)}</a>`,
        esc(brand.address),
    ].join(dot)

    return `
    <mj-section background-color="${theme.accent}" padding="0">
      <mj-column><mj-spacer height="3px" /></mj-column>
    </mj-section>
    <mj-section background-color="${INK.header}" padding="32px ${GUTTER} 0">
      <mj-column width="20%" vertical-align="top">
        <mj-image src="${esc(`${brand.markBaseUrl}/ce-white.png`)}" alt="${esc(brand.shortName)}" width="56px" align="left" padding="0 0 14px" />
      </mj-column>
      <mj-column width="80%" vertical-align="top">
        <mj-text padding="0" font-size="16px" font-weight="700" color="${INK.onDark}" letter-spacing="-0.2px">${esc(brand.name)}</mj-text>
        <mj-text padding="7px 0 0" font-size="13px" line-height="1.65" color="${INK.onDarkSoft}">${esc(note || brand.tagline)}</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="${INK.header}" padding="0 ${GUTTER}">
      <mj-column>
        <mj-divider border-width="1px" border-color="${INK.onDarkLine}" padding="20px 0 0" />
      </mj-column>
    </mj-section>
    <mj-section background-color="${INK.header}" padding="18px ${GUTTER} 30px">
      <mj-column>
        <mj-text padding="0" font-size="13px" line-height="2">${links}</mj-text>
        <mj-text padding="14px 0 0" font-size="12px" line-height="1.9" color="${INK.onDarkSoft}">${contact}</mj-text>
        <mj-text padding="2px 0 0" font-size="12px" line-height="1.9" color="${INK.onDarkMuted}">${reach}</mj-text>
      </mj-column>
    </mj-section>`
}

/** Mentions hors carte, en tout petit, comme sur les mails institutionnels. */
function legalBlock(brand: BrandConfig): string {
    return `
    <mj-section padding="20px 24px 36px">
      <mj-column>
        <mj-text align="center" padding="0" font-size="12px" line-height="1.7" color="${INK.muted}">
          ${esc(brand.name)}
          <span style="color:${INK.faint};padding:0 6px;">&bull;</span>
          <a href="${esc(brand.siteUrl)}" style="color:${INK.muted};text-decoration:underline;">cehe2b.be</a>
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
      <mj-text font-size="16px" line-height="1.7" color="${INK.body}" padding="0" />
      <mj-section padding="0" />
      <mj-column padding="0" />
    </mj-attributes>
    <mj-style>
      a { color: ${theme.accentDeep}; }
      /* Relief sur les clients qui gèrent les ombres ; ignoré ailleurs. */
      .ce-card { border-radius: 20px; overflow: hidden; box-shadow: 0 12px 32px ${rgba(INK.header, 0.09)}; }
      .ce-card td { word-break: break-word; }
      .ce-button a { box-shadow: 0 8px 18px ${rgba(theme.accent, 0.28)}; }
      @media only screen and (max-width: 480px) {
        /* Bouton pleine largeur : la table interne de mj-button dicte la
           largeur, l'ancre seule ne s'étirerait pas. */
        .ce-button table { width: 100% !important; }
        .ce-title div { font-size: 25px !important; line-height: 1.25 !important; letter-spacing: -0.4px !important; }
        .ce-details td { padding-bottom: 16px !important; }
        .ce-header-note div { font-size: 9px !important; }
        .ce-button a { display: block !important; text-align: center !important; }
      }
    </mj-style>
  </mj-head>
  <mj-body background-color="${INK.page}" width="600px">
    <mj-section padding="28px 0 0"><mj-column><mj-spacer height="1px" /></mj-column></mj-section>
    <mj-wrapper background-color="${INK.card}" border-radius="20px" padding="0" css-class="ce-card">
      ${headerBlock(theme, brand)}
      ${opts.content}
      <mj-section background-color="${INK.card}" padding="0 ${GUTTER} 36px"><mj-column><mj-spacer height="1px" /></mj-column></mj-section>
      ${footerBlock(theme, opts.footerNote ?? "", brand)}
    </mj-wrapper>
    ${legalBlock(brand)}
  </mj-body>
</mjml>`
}
