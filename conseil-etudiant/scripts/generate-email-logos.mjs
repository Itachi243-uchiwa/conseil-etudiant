/**
 * Génère les logos utilisés dans les mails (module « Générateur de mails »).
 *
 *   node scripts/generate-email-logos.mjs
 *
 * Pourquoi un script ? Les clients mail n'affichent pas les SVG : il faut des
 * PNG hébergés en absolu. Les tracés sont extraits de components/ui/campusLogo.tsx
 * (source unique de vérité du logo CE et des déclinaisons campus), puis
 * rastérisés en deux teintes :
 *   • -white.png → posé sur le bandeau sombre de l'en-tête
 *   • -ink.png   → posé sur le pied de mail clair
 *
 * Relancer ce script après toute modification du logo.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import sharp from "sharp"

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const SOURCE = resolve(ROOT, "components/ui/campusLogo.tsx")
const OUT_DIR = resolve(ROOT, "public/emails/logos")

/**
 * Couleur d'accent de chaque campus.
 * ⚠️ Doit rester aligné sur `EMAIL_THEMES` dans lib/emails/themes.ts
 * (valeurs issues du back-office, endpoint /api/campus).
 */
const CAMPUS_ACCENTS = {
    // Defré et Nivelles ont fusionné dans le département pédagogique, qui n'a pas
    // de lettrage propre : son nom s'écrit en toutes lettres dans l'en-tête.
    ises: "#7E1817",
    isek: "#99D218",
    iessid: "#D98B43",
    esi: "#20CAD2",
}

const CAMPUSES = Object.keys(CAMPUS_ACCENTS)

const TINTS = {
    white: "#FFFFFF",
    ink: "#171334",
}

/** Violet institutionnel du logo CE (public/logo.png). */
const CE_VIOLET = "#3F3290"

const source = readFileSync(SOURCE, "utf8")

/** Bloc commun : le sigle « CE ». */
function extractMark() {
    const match = /<svg[^>]*>\s*<g>([\s\S]*?)<\/g>/.exec(source)
    if (!match) throw new Error("Sigle CE introuvable dans campusLogo.tsx")
    return match[1]
}

/** Bloc propre à un campus (le nom du campus en lettrage). */
function extractCampus(campus) {
    const re = new RegExp(`\\{campus === "${campus}" && \\(\\s*<>([\\s\\S]*?)</>\\s*\\)\\}`)
    const match = re.exec(source)
    if (!match) throw new Error(`Lettrage introuvable pour le campus « ${campus} »`)
    return match[1]
}

/** JSX → SVG : la seule différence est la couleur passée en prop. */
function toSvgFragment(jsx, color) {
    return jsx.replace(/fill=\{color\}/g, `fill="${color}"`).replace(/fill="#FFFFFF"/g, `fill="${color}"`)
}

function svgDocument({ body, viewBox }) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${body}</svg>`
}

async function write(name, svg, width) {
    const file = resolve(OUT_DIR, `${name}.png`)
    await sharp(Buffer.from(svg)).resize({ width, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(file)
    console.log(`✔ ${file.replace(ROOT + "/", "")}`)
}

async function main() {
    mkdirSync(OUT_DIR, { recursive: true })

    const mark = extractMark()

    for (const [tint, color] of Object.entries({ ...TINTS, violet: CE_VIOLET })) {
        // Sigle CE seul — cadrage serré sur le glyphe.
        await write(
            `ce-${tint}`,
            svgDocument({ body: toSvgFragment(mark, color), viewBox: "60 60 375 255" }),
            420,
        )

        // Verrouillage CE + campus.
        for (const campus of CAMPUSES) {
            const body = toSvgFragment(mark, color) + toSvgFragment(extractCampus(campus), color)
            await write(`${campus}-${tint}`, svgDocument({ body, viewBox: "55 55 385 400" }), 420)
        }
    }

    // Verrouillage campus dans sa propre couleur (en-tête clair du mail).
    for (const [campus, accent] of Object.entries(CAMPUS_ACCENTS)) {
        const body = toSvgFragment(mark, accent) + toSvgFragment(extractCampus(campus), accent)
        await write(`${campus}-accent`, svgDocument({ body, viewBox: "55 55 385 400" }), 420)
    }
    await write(
        "ce-accent",
        svgDocument({ body: toSvgFragment(mark, CE_VIOLET), viewBox: "60 60 375 255" }),
        420,
    )
}

main().catch(error => {
    console.error(error)
    process.exit(1)
})
