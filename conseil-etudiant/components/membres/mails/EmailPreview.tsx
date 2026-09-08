"use client"

import { AlertTriangle, Code2, ExternalLink, Eye, Loader2, Monitor, Smartphone } from "lucide-react"
import { useEffect, useRef, useState } from "react"

/**
 * Aperçu du mail dans une iframe isolée (`sandbox`), pour que les styles du
 * mail et ceux de l'application ne se contaminent pas.
 */

const FRAMES = {
    desktop: { width: 640, label: "Ordinateur", icon: Monitor },
    mobile: { width: 390, label: "Mobile", icon: Smartphone },
} as const

type Device = keyof typeof FRAMES

interface Props {
    html: string
    mjml: string
    loading: boolean
    error: string | null
    warnings: string[]
    onOpenInNewTab: () => void
}

export default function EmailPreview({ html, mjml, loading, error, warnings, onOpenInNewTab }: Props) {
    const [device, setDevice] = useState<Device>("desktop")
    const [view, setView] = useState<"preview" | "html" | "mjml">("preview")
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(1)

    const frameWidth = FRAMES[device].width
    const viewportHeight = 700

    useEffect(() => {
        const element = wrapperRef.current
        if (!element) return
        const resize = () => setScale(Math.min(1, element.clientWidth / frameWidth))
        resize()
        const observer = new ResizeObserver(resize)
        observer.observe(element)
        return () => observer.disconnect()
    }, [frameWidth])

    return (
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            {/* ── Barre d'outils ── */}
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border bg-muted/40">
                <div className="flex items-center gap-0.5 rounded-lg bg-background border border-border p-0.5">
                    <ViewTab active={view === "preview"} onClick={() => setView("preview")} icon={Eye} label="Aperçu" />
                    <ViewTab active={view === "html"} onClick={() => setView("html")} icon={Code2} label="HTML" />
                    <ViewTab active={view === "mjml"} onClick={() => setView("mjml")} icon={Code2} label="MJML" />
                </div>

                {view === "preview" && (
                    <div className="flex items-center gap-0.5 rounded-lg bg-background border border-border p-0.5">
                        {(Object.keys(FRAMES) as Device[]).map(key => {
                            const Icon = FRAMES[key].icon
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setDevice(key)}
                                    title={FRAMES[key].label}
                                    aria-label={FRAMES[key].label}
                                    aria-pressed={device === key}
                                    className={`p-1.5 rounded-md transition-colors ${
                                        device === key
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                </button>
                            )
                        })}
                    </div>
                )}

                <div className="ml-auto flex items-center gap-2">
                    {loading && (
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span className="hidden sm:inline">Compilation…</span>
                        </span>
                    )}
                    <button
                        type="button"
                        onClick={onOpenInNewTab}
                        disabled={!html}
                        title="Ouvrir dans un nouvel onglet"
                        aria-label="Ouvrir dans un nouvel onglet"
                        className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 transition-colors"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {/* ── Corps ── */}
            {error ? (
                <div className="flex flex-col items-center justify-center gap-2 py-20 px-6 text-center">
                    <AlertTriangle className="w-7 h-7 text-destructive opacity-70" />
                    <p className="font-semibold text-sm">Impossible de générer l'aperçu</p>
                    <p className="text-xs text-muted-foreground max-w-sm">{error}</p>
                </div>
            ) : view === "preview" ? (
                <div
                    ref={wrapperRef}
                    className="bg-[#EFF2FC] dark:bg-[#0E0C1D] overflow-hidden"
                    style={{ height: viewportHeight }}
                >
                    <div
                        className="relative mx-auto"
                        style={{ width: frameWidth * scale, height: viewportHeight }}
                    >
                        <iframe
                            title="Aperçu du mail"
                            sandbox=""
                            srcDoc={html}
                            className="absolute top-0 left-0 border-0 bg-white"
                            style={{
                                width: frameWidth,
                                height: viewportHeight / scale,
                                transform: `scale(${scale})`,
                                transformOrigin: "top left",
                            }}
                        />
                    </div>
                </div>
            ) : (
                <pre
                    className="overflow-auto bg-muted/30 p-4 text-[11px] leading-relaxed text-muted-foreground font-mono"
                    style={{ height: viewportHeight }}
                >
                    {view === "html" ? html : mjml}
                </pre>
            )}

            {/* ── Pied : statut ── */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-3.5 py-2.5 border-t border-border bg-muted/40 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${error ? "bg-destructive" : "bg-emerald-500"}`} />
                    {error ? "Erreur de compilation" : "HTML compilé par MJML"}
                </span>
                {html && <span>{(new Blob([html]).size / 1024).toFixed(0)} Ko</span>}
                <span className="hidden sm:inline">Largeur du mail : 600 px</span>
                {warnings.length > 0 && (
                    <span className="text-amber-600 dark:text-amber-400">
                        {warnings.length} avertissement{warnings.length > 1 ? "s" : ""} MJML
                    </span>
                )}
            </div>
        </div>
    )
}

function ViewTab({
    active,
    onClick,
    icon: Icon,
    label,
}: {
    active: boolean
    onClick: () => void
    icon: any
    label: string
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
        >
            <Icon className="w-3.5 h-3.5" />
            {label}
        </button>
    )
}
