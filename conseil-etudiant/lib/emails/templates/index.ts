/**
 * Registre des templates de mail.
 *
 * ➕ Ajouter un template : créer un fichier dans ce dossier qui exporte un
 *    `EmailTemplate`, puis l'ajouter au tableau ci-dessous. Rien d'autre —
 *    l'éditeur construit ses champs et son aperçu automatiquement.
 */

import type { EmailTemplate } from "../types"
import { announcementTemplate } from "./announcement"
import { eventTemplate } from "./event"
import { generalTemplate } from "./general"
import { newsletterTemplate } from "./newsletter"

export const EMAIL_TEMPLATES: EmailTemplate[] = [
    generalTemplate,
    announcementTemplate,
    eventTemplate,
    newsletterTemplate,
]

export const DEFAULT_TEMPLATE_ID = generalTemplate.id

export function getTemplate(id: string | undefined): EmailTemplate {
    return EMAIL_TEMPLATES.find(t => t.id === id) ?? EMAIL_TEMPLATES[0]
}
