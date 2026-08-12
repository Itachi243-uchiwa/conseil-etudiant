"use client"

import {
    CalendarDays,
    Check,
    ChevronDown,
    Code2,
    Copy,
    Download,
    FileText,
    Info,
    Mail,
    Megaphone,
    Newspaper,
    RotateCcw,
} from "lucide-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { useToast } from "@/hooks/use-toast"
import { copyRichEmail, copyText, downloadFile, openInNewTab, slugify } from "@/lib/emails/clipboard"
import { DEFAULT_TEMPLATE_ID, EMAIL_TEMPLATES, getTemplate } from "@/lib/emails/templates"
import { DEFAULT_THEME_ID, EMAIL_THEMES, getTheme } from "@/lib/emails/themes"
import { FIELD_GROUPS, type EmailValue, type EmailValues } from "@/lib/emails/types"

import EmailPreview from "./EmailPreview"
import FieldEditor from "./FieldEditor"

const STORAGE_KEY = "ce:mail-studio:v1"

/** Icône associée à un template (facultatif : `Mail` sert de repli). */
const TEMPLATE_ICONS: Record<string, any> = {
    general: FileText,
    announcement: Megaphone,
    event: CalendarDays,
    newsletter: Newspaper,
}

type ValuesByTemplate = Record<string, EmailValues>

function defaultsFor(templateId: string): EmailValues {
    return structuredClone(getTemplate(templateId).defaults)
}

export default function MailStudio() {
    const { toast } = useToast()

    const [templateId, setTemplateId] = useState(DEFAULT_TEMPLATE_ID)
    const [themeId, setThemeId] = useState(DEFAULT_THEME_ID)
    const [valuesByTemplate, setValuesByTemplate] = useState<ValuesByTemplate>(() => ({
        [DEFAULT_TEMPLATE_ID]: defaultsFor(DEFAULT_TEMPLATE_ID),
    }))

    const [html, setHtml] = useState("")
    const [mjml, setMjml] = useState("")
    const [warnings, setWarnings] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [copied, setCopied] = useState<"rich" | "html" | null>(null)
    const [showHelp, setShowHelp] = useState(false)
    const [moreOpen, setMoreOpen] = useState(false)

    const template = getTemplate(templateId)
    const theme = getTheme(themeId)
    const values = valuesByTemplate[templateId] ?? defaultsFor(templateId)
    const restored = useRef(false)

    /* ── Brouillon local (aucune donnée envoyée au serveur) ── */

    useEffect(() => {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY)
            if (raw) {
                const draft = JSON.parse(raw)
                if (draft?.templateId) setTemplateId(getTemplate(draft.templateId).id)
                if (draft?.themeId) setThemeId(getTheme(draft.themeId).id)
                if (draft?.valuesByTemplate && typeof draft.valuesByTemplate === "object") {
                    setValuesByTemplate(draft.valuesByTemplate)
                }
            }
        } catch {
            // Brouillon illisible : on repart des valeurs par défaut.
        }
        restored.current = true
    }, [])

    useEffect(() => {
        if (!restored.current) return
        try {
            window.localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({ templateId, themeId, valuesByTemplate }),
            )
        } catch {
            // Quota dépassé : sans conséquence, le brouillon n'est qu'un confort.
        }
    }, [templateId, themeId, valuesByTemplate])

    /* ── Compilation MJML (débounce + annulation de la requête précédente) ── */

    const valuesKey = useMemo(() => JSON.stringify(values), [values])

    useEffect(() => {
        const controller = new AbortController()
        const timer = setTimeout(async () => {
            setLoading(true)
            try {
                const response = await fetch("/api/emails/compile", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ templateId, themeId, values }),
                    signal: controller.signal,
                })
                const data = await response.json()
                if (!response.ok) throw new Error(data?.error ?? `Erreur ${response.status}`)
                setHtml(data.html)
                setMjml(data.mjml)
                setWarnings(data.warnings ?? [])
                setError(null)
            } catch (err: any) {
                if (err?.name === "AbortError") return
                setError(err?.message ?? "La compilation a échoué.")
            } finally {
                if (!controller.signal.aborted) setLoading(false)
            }
        }, 350)

        return () => {
            clearTimeout(timer)
            controller.abort()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [templateId, themeId, valuesKey])

    /* ── Actions ── */

    const setValue = useCallback(
        (key: string, value: EmailValue) => {
            setValuesByTemplate(previous => ({
                ...previous,
                [templateId]: { ...(previous[templateId] ?? defaultsFor(templateId)), [key]: value },
            }))
        },
        [templateId],
    )

    const selectTemplate = (id: string) => {
        setValuesByTemplate(previous => (previous[id] ? previous : { ...previous, [id]: defaultsFor(id) }))
        setTemplateId(id)
    }

    const reset = () => {
        setValuesByTemplate(previous => ({ ...previous, [templateId]: defaultsFor(templateId) }))
        setMoreOpen(false)
        toast({ title: "Contenu réinitialisé", description: `Le template « ${template.name} » est revenu à son exemple.` })
    }

    const flash = (kind: "rich" | "html") => {
        setCopied(kind)
        setTimeout(() => setCopied(null), 2000)
    }

    const handleCopyRich = async () => {
        if (!html) return
        const outcome = await copyRichEmail(html)
        if (outcome === "rich") {
            flash("rich")
            toast({
                title: "Mail copié ✅",
                description: "Collez-le dans la fenêtre de rédaction Gmail (Ctrl+V / Cmd+V).",
            })
        } else {
            toast({
                variant: "destructive",
                title: "Copie impossible",
                description: "Votre navigateur a refusé l'accès au presse-papiers. Utilisez « Copier le HTML ».",
            })
        }
    }

    const handleCopyHtml = async () => {
        if (!html) return
        if (await copyText(html)) {
            flash("html")
            toast({ title: "Code HTML copié", description: "Utile pour une intégration ou un archivage." })
        } else {
            toast({ variant: "destructive", title: "Copie impossible" })
        }
    }

    const handleCopyMjml = async () => {
        setMoreOpen(false)
        if (await copyText(mjml)) toast({ title: "Source MJML copiée" })
    }

    const handleDownload = () => {
        setMoreOpen(false)
        const title = typeof values.title === "string" ? values.title : template.name
        downloadFile(html, `${slugify(title)}.html`)
    }

    const groups = FIELD_GROUPS.filter(group => template.fields.some(field => field.group === group.key))

    return (
        <div className="space-y-6">
            {/* ── Titre & actions ── */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Mail className="w-4 h-4 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">Générateur de mails</h1>
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm max-w-xl">
                        Rédigez le message, choisissez un template et une identité de campus, puis copiez le résultat
                        dans Gmail. <span className="text-foreground/70">Aucun envoi n'est effectué depuis l'application.</span>
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleCopyRich}
                        disabled={!html || !!error}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md shadow-primary/20 hover:bg-primary/90 disabled:opacity-50 disabled:shadow-none transition-all"
                    >
                        {copied === "rich" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied === "rich" ? "Copié" : "Copier le mail"}
                    </button>

                    <button
                        type="button"
                        onClick={handleCopyHtml}
                        disabled={!html || !!error}
                        className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-border bg-card text-sm font-medium hover:bg-muted disabled:opacity-50 transition-colors"
                    >
                        {copied === "html" ? <Check className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
                        <span className="hidden sm:inline">Copier le HTML</span>
                    </button>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setMoreOpen(open => !open)}
                            aria-label="Plus d'actions"
                            aria-expanded={moreOpen}
                            className="flex items-center gap-1 px-2.5 py-2.5 rounded-xl border border-border bg-card text-sm hover:bg-muted transition-colors"
                        >
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        {moreOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setMoreOpen(false)} />
                                <div className="absolute right-0 top-full mt-2 w-60 z-20 rounded-xl border border-border bg-card shadow-lg p-1.5">
                                    <MenuItem icon={Download} label="Télécharger le fichier .html" onClick={handleDownload} />
                                    <MenuItem icon={Code2} label="Copier la source MJML" onClick={handleCopyMjml} />
                                    <MenuItem icon={RotateCcw} label="Réinitialiser ce template" onClick={reset} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Aide Gmail ── */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <button
                    type="button"
                    onClick={() => setShowHelp(open => !open)}
                    aria-expanded={showHelp}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-left hover:bg-muted/50 transition-colors"
                >
                    <Info className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-medium">Comment envoyer ce mail depuis Gmail ?</span>
                    <ChevronDown className={`w-4 h-4 ml-auto text-muted-foreground transition-transform ${showHelp ? "rotate-180" : ""}`} />
                </button>
                {showHelp && (
                    <div className="px-4 pb-4 pt-1 border-t border-border">
                        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside marker:text-primary marker:font-semibold">
                            <li>Cliquez sur <span className="text-foreground font-medium">Copier le mail</span>.</li>
                            <li>Ouvrez Gmail et rédigez un nouveau message avec l'adresse institutionnelle (esi-etudiants, …).</li>
                            <li>Collez dans le corps du message avec <span className="text-foreground font-medium">Ctrl+V</span> (ou <span className="text-foreground font-medium">Cmd+V</span>).</li>
                            <li>Vérifiez le rendu, ajoutez l'objet, puis envoyez.</li>
                        </ol>
                        <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                            Gmail nettoie une partie du code au collage : les coins arrondis et les règles d'adaptation
                            mobile peuvent être simplifiés, la mise en page reste fidèle. Pour un rendu strictement
                            identique, utilisez « Copier le HTML » dans un outil qui accepte le code source.
                        </p>
                    </div>
                )}
            </div>

            {/* ── Choix du template ── */}
            <section className="space-y-3">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Template</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {EMAIL_TEMPLATES.map(item => {
                        const Icon = TEMPLATE_ICONS[item.id] ?? Mail
                        const active = item.id === templateId
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => selectTemplate(item.id)}
                                aria-pressed={active}
                                className={`text-left rounded-2xl border p-4 transition-all ${
                                    active
                                        ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                                        : "border-border bg-card hover:border-primary/30 hover:bg-muted/40"
                                }`}
                            >
                                <div
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                                        active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                </div>
                                <p className="font-semibold text-sm">{item.name}</p>
                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                            </button>
                        )
                    })}
                </div>
            </section>

            {/* ── Choix de l'identité ── */}
            <section className="space-y-3">
                <div className="flex items-baseline gap-2">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Identité</p>
                    <span className="text-xs text-muted-foreground">— couleurs et logo du campus</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {EMAIL_THEMES.map(item => {
                        const active = item.id === themeId
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setThemeId(item.id)}
                                aria-pressed={active}
                                className={`flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full border text-sm font-medium transition-all ${
                                    active
                                        ? "border-transparent text-white shadow-sm"
                                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                                }`}
                                style={active ? { backgroundColor: item.accent, color: item.onAccent } : undefined}
                            >
                                <span
                                    className="w-3.5 h-3.5 rounded-full ring-1 ring-black/10"
                                    style={{ backgroundColor: active ? item.onAccent : item.accent }}
                                />
                                {item.name}
                            </button>
                        )
                    })}
                </div>
            </section>

            {/* ── Édition / aperçu ── */}
            <div className="grid gap-6 lg:grid-cols-2 items-start">
                <div className="space-y-4 min-w-0">
                    {groups.map(group => (
                        <section key={group.key} className="rounded-2xl border border-border bg-card p-5 space-y-4">
                            <div>
                                <h2 className="text-sm font-bold">{group.label}</h2>
                                <p className="text-xs text-muted-foreground mt-0.5">{group.hint}</p>
                            </div>
                            {template.fields
                                .filter(field => field.group === group.key)
                                .map(field => (
                                    <FieldEditor
                                        key={field.key}
                                        field={field}
                                        value={values[field.key]}
                                        onChange={value => setValue(field.key, value)}
                                    />
                                ))}
                        </section>
                    ))}
                </div>

                <div className="lg:sticky lg:top-6 min-w-0">
                    <EmailPreview
                        html={html}
                        mjml={mjml}
                        loading={loading}
                        error={error}
                        warnings={warnings}
                        onOpenInNewTab={() => openInNewTab(html)}
                    />
                    <p className="text-xs text-muted-foreground mt-2.5 px-1">
                        Aperçu isolé dans une iframe · identité <span className="font-medium text-foreground/80">{theme.name}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

function MenuItem({ icon: Icon, label, onClick }: { icon: any; label: string; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition-colors text-left"
        >
            <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
            {label}
        </button>
    )
}
