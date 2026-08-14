"use client"

import { useMemo, useState } from "react"
import { useSession } from "next-auth/react"
import { uploadDocument } from "@/lib/members-api"
import { useToast } from "@/hooks/use-toast"
import { Upload } from "lucide-react"
import FileDropzone from "./FileDropzone"

/**
 * Types de documents déposables par un membre. Doit rester aligné sur
 * MemberDocumentService#assertCanDeposit côté backend : un rapport pour tous,
 * les pièces officielles réservées au président de la séance concernée.
 */
const REPORT_TYPE = { key: "RAPPORT", label: "Rapport" }
const OFFICIAL_TYPES = [
    { key: "ORDRE_DU_JOUR", label: "Ordre du jour" },
    { key: "PV", label: "Procès-verbal" },
    { key: "DECISION", label: "Décision / résolution" },
]

export default function DocumentUploadForm({
    sessions = [],
    fixedSessionId,
    fixedSessionTitle,
    presidesFixedSession = false,
    allowExternalLink = false,
    onDone,
    onCancel,
}: {
    /** Sessions disponibles quand l'utilisateur doit en choisir une. */
    sessions?: any[]
    /** Rattache d'office le dépôt à cette séance (usage dans le détail d'une AG). */
    fixedSessionId?: number
    fixedSessionTitle?: string
    presidesFixedSession?: boolean
    allowExternalLink?: boolean
    onDone: () => Promise<void> | void
    onCancel: () => void
}) {
    const { data: session } = useSession()
    const { toast } = useToast()
    const myEmail = session?.user?.email?.toLowerCase() ?? ""

    // Séances que le membre préside : seules celles-ci acceptent une pièce officielle
    const presidedSessions = useMemo(
        () => sessions.filter((s: any) => s.presidentEmail?.toLowerCase() === myEmail),
        [sessions, myEmail]
    )

    const canDepositOfficial = fixedSessionId ? presidesFixedSession : presidedSessions.length > 0
    const availableTypes = canDepositOfficial ? [REPORT_TYPE, ...OFFICIAL_TYPES] : [REPORT_TYPE]

    const [type, setType] = useState(REPORT_TYPE.key)
    const [sessionId, setSessionId] = useState<string>(fixedSessionId ? String(fixedSessionId) : "")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [fileUrl, setFileUrl] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [submitting, setSubmitting] = useState(false)

    const isOfficial = type !== REPORT_TYPE.key
    // Le backend exige une séance pour toute pièce officielle
    const needsSession = isOfficial
    const sessionChoices = isOfficial ? presidedSessions : sessions

    const canSubmit =
        title.trim() &&
        (file || (allowExternalLink && fileUrl.trim())) &&
        (!needsSession || sessionId)

    const submit = async () => {
        if (!canSubmit || !session?.user || submitting) return
        setSubmitting(true)
        try {
            await uploadDocument(
                {
                    title: title.trim(),
                    description: description.trim(),
                    type,
                    sessionId: sessionId ? Number(sessionId) : undefined,
                    fileUrl: fileUrl.trim() || undefined,
                },
                file,
                session.user.email ?? "",
                session.user.memberName ?? ""
            )
            toast({ title: "Document déposé", description: title.trim() })
            await onDone()
        } catch (e: any) {
            toast({ title: "Erreur", description: e.message, variant: "destructive" })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="border border-primary/30 bg-primary/5 rounded-2xl p-5 space-y-4">
            <h3 className="font-semibold text-sm">Déposer un document</h3>

            {/* Type */}
            <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Type de document</label>
                <div className="flex gap-2 flex-wrap">
                    {availableTypes.map(({ key, label }) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => {
                                setType(key)
                                // Une pièce officielle doit viser une séance présidée
                                if (key !== REPORT_TYPE.key && !fixedSessionId) setSessionId("")
                            }}
                            className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                                type === key
                                    ? "bg-primary border-primary text-primary-foreground"
                                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                {!canDepositOfficial && (
                    <p className="text-xs text-muted-foreground mt-2">
                        Ordre du jour, procès-verbal et décision sont réservés au président de séance.
                    </p>
                )}
            </div>

            {/* Séance rattachée */}
            {fixedSessionId ? (
                fixedSessionTitle && (
                    <p className="text-xs text-muted-foreground">
                        Rattaché à la séance : <span className="text-foreground">{fixedSessionTitle}</span>
                    </p>
                )
            ) : (
                <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                        Assemblée générale {needsSession ? "*" : "(optionnel)"}
                    </label>
                    <select
                        value={sessionId}
                        onChange={e => setSessionId(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
                    >
                        <option value="">
                            {needsSession ? "Sélectionner une séance que vous présidez…" : "Aucune séance"}
                        </option>
                        {sessionChoices.map((s: any) => (
                            <option key={s.id} value={s.id}>{s.title}</option>
                        ))}
                    </select>
                </div>
            )}

            <div>
                <label className="text-xs text-muted-foreground mb-1 block">Titre *</label>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Intitulé du document"
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground"
                />
            </div>

            <div>
                <label className="text-xs text-muted-foreground mb-1 block">Description (optionnel)</label>
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={2}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground resize-none"
                />
            </div>

            <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                    Fichier {allowExternalLink ? "" : "*"}
                </label>
                <FileDropzone file={file} onChange={setFile} disabled={submitting} />
            </div>

            {allowExternalLink && (
                <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                        Ou un lien externe (si le document est déjà hébergé)
                    </label>
                    <input
                        value={fileUrl}
                        onChange={e => setFileUrl(e.target.value)}
                        placeholder="https://drive.google.com/..."
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground"
                    />
                </div>
            )}

            <div className="flex gap-2">
                <button
                    onClick={submit}
                    disabled={!canSubmit || submitting}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground text-sm px-5 py-2.5 rounded-xl transition-all"
                >
                    {submitting
                        ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        : <Upload className="w-4 h-4" />}
                    {submitting ? "Envoi du fichier…" : "Déposer"}
                </button>
                <button
                    onClick={onCancel}
                    className="text-muted-foreground hover:text-foreground text-sm px-4 py-2.5 rounded-xl transition-all"
                >
                    Annuler
                </button>
            </div>
        </div>
    )
}
