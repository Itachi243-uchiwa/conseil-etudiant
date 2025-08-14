// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Configuration des emails
const EMAIL_CONFIG = {
    from: 'onboarding@resend.dev',
    to: 'bureau-ce@he2b.be',
    fallbackTo: 'ce@he2b.be',
    delayBetweenEmails: 1000,
}

// Types
interface ContactRequest {
    name: string
    email: string
    subject: string
    message: string
}

interface EmailResponse {
    success: boolean
    id?: string
    error?: string
}

// Validation des données
function validateContactData(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!data.name?.trim()) errors.push('Le nom est requis')
    if (!data.email?.trim()) errors.push('L\'email est requis')
    if (!data.subject?.trim()) errors.push('Le sujet est requis')
    if (!data.message?.trim()) errors.push('Le message est requis')

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (data.email && !emailRegex.test(data.email)) {
        errors.push('Adresse email invalide')
    }

    // Validation longueurs
    if (data.name && data.name.length > 100) errors.push('Le nom ne peut pas dépasser 100 caractères')
    if (data.subject && data.subject.length > 200) errors.push('Le sujet ne peut pas dépasser 200 caractères')
    if (data.message && data.message.length > 2000) errors.push('Le message ne peut pas dépasser 2000 caractères')

    return {
        isValid: errors.length === 0,
        errors
    }
}

// Génération du template email principal
function generateMainEmailTemplate(data: ContactRequest): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nouveau message de contact</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #3F3290 0%, #5a4fcf 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">📧 Nouveau message de contact</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Site web du Conseil Étudiant HE2B</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-left: 4px solid #3F3290;">
        <h2 style="color: #3F3290; margin-top: 0; border-bottom: 2px solid #3F3290; padding-bottom: 10px;">👤 Informations de contact</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; font-weight: bold; width: 120px; color: #3F3290;">Nom :</td>
            <td style="padding: 12px 0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; font-weight: bold; color: #3F3290;">Email :</td>
            <td style="padding: 12px 0;"><a href="mailto:${data.email}" style="color: #3F3290; text-decoration: none;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 0; font-weight: bold; color: #3F3290;">Sujet :</td>
            <td style="padding: 12px 0; font-weight: 600;">${data.subject}</td>
          </tr>
        </table>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e9ecef; border-top: none;">
        <h2 style="color: #3F3290; margin-top: 0; border-bottom: 2px solid #3F3290; padding-bottom: 10px;">💬 Message</h2>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #3F3290;">
          <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>
      </div>
      
      <div style="background: #3F3290; color: white; padding: 20px; border-radius: 0 0 10px 10px; text-align: center; font-size: 14px;">
        <p style="margin: 0; opacity: 0.9;">
          📧 Pour répondre, cliquez sur "Répondre" dans votre client email<br>
          🕒 Message reçu le ${new Date().toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}
        </p>
      </div>
    </body>
    </html>
  `
}

// Génération du template email de confirmation
function generateConfirmationEmailTemplate(data: ContactRequest): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmation de réception</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #3F3290 0%, #5a4fcf 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">✅ Message bien reçu !</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Conseil Étudiant HE2B</p>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e9ecef; border-top: none;">
        <p style="font-size: 18px; margin-top: 0;">Bonjour <strong>${data.name}</strong>,</p>
        
        <p>Nous avons bien reçu votre message concernant :</p>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #3F3290; margin: 20px 0;">
          <strong style="color: #3F3290; font-size: 16px;">${data.subject}</strong>
        </div>
        
        <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; border: 1px solid #b8e6ff; margin: 20px 0;">
          <h3 style="color: #3F3290; margin-top: 0;">📋 Rappel de votre message :</h3>
          <p style="margin-bottom: 0; font-style: italic; line-height: 1.6; white-space: pre-wrap; background: white; padding: 15px; border-radius: 6px; border-left: 3px solid #3F3290;">${data.message}</p>
        </div>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border: 1px solid #bae6fd; margin: 20px 0;">
          <h3 style="color: #3F3290; margin-top: 0;">⏰ Délai de réponse</h3>
          <p style="margin-bottom: 0;">Notre équipe traitera votre demande dans les plus brefs délais. Nous nous efforçons de répondre à tous les messages dans un délai de <strong style="color: #3F3290;">24 à 48 heures</strong>.</p>
        </div>
        
        <div style="background: #fff7ed; padding: 20px; border-radius: 8px; border: 1px solid #fed7aa; margin: 20px 0;">
          <h3 style="color: #3F3290; margin-top: 0;">📞 Besoin d'une réponse urgente ?</h3>
          <p style="margin-bottom: 10px;"><strong>Email principal :</strong> <a href="mailto:bureau-ce@he2b.be" style="color: #3F3290;">bureau-ce@he2b.be</a></p>
          <p style="margin-bottom: 10px;"><strong>Email secondaire :</strong> <a href="mailto:ce@he2b.be" style="color: #3F3290;">ce@he2b.be</a></p>
          <p style="margin-bottom: 10px;"><strong>Téléphone :</strong> <a href="tel:+3212345678" style="color: #3F3290;">+32 12 345 678</a></p>
          <p style="margin-bottom: 0;"><strong>Adresse :</strong> Campus ISIB, Rue Royale 150, 1000 Bruxelles</p>
        </div>
        
        <p>Cordialement,<br>
        <strong style="color: #3F3290;">L'équipe du Conseil Étudiant HE2B</strong></p>
      </div>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 10px 10px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #e9ecef;">
        <p style="margin: 0;">
          Cet email a été envoyé automatiquement suite à votre message sur notre site web.<br>
          Si vous n'avez pas envoyé ce message, veuillez nous contacter immédiatement à bureau-ce@he2b.be
        </p>
      </div>
    </body>
    </html>
  `
}

// Envoi d'un email avec gestion d'erreur
async function sendEmail(emailData: {
    from: string
    to: string | string[]
    replyTo?: string
    subject: string
    html: string
}): Promise<EmailResponse> {
    try {
        const result = await resend.emails.send(emailData)

        if (result.data?.id) {
            return { success: true, id: result.data.id }
        } else {
            return { success: false, error: 'Pas d\'ID retourné' }
        }
    } catch (error) {
        console.error('Erreur envoi email:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Erreur inconnue'
        }
    }
}

export async function POST(request: NextRequest) {
    try {
        const data: ContactRequest = await request.json()

        // Validation des données
        const validation = validateContactData(data)
        if (!validation.isValid) {
            return NextResponse.json(
                { error: 'Données invalides', details: validation.errors },
                { status: 400 }
            )
        }

        console.log('📨 Traitement du message de contact de:', data.email)

        // Envoi de l'email principal au conseil étudiant
        const mainEmailResult = await sendEmail({
            from: EMAIL_CONFIG.from,
            to: [EMAIL_CONFIG.to, EMAIL_CONFIG.fallbackTo], // Envoi vers les deux adresses
            replyTo: data.email,
            subject: `[Contact CE-HE2B] ${data.subject}`,
            html: generateMainEmailTemplate(data)
        })

        if (!mainEmailResult.success) {
            throw new Error(`Échec envoi email principal: ${mainEmailResult.error}`)
        }

        console.log('✅ Email principal envoyé:', mainEmailResult.id)

        // Délai avant l'envoi de confirmation pour éviter le rate limiting
        await new Promise(resolve => setTimeout(resolve, EMAIL_CONFIG.delayBetweenEmails))

        // Envoi de l'email de confirmation à l'expéditeur
        const confirmationResult = await sendEmail({
            from: EMAIL_CONFIG.from,
            to: data.email,
            subject: '✅ Confirmation de réception - Conseil Étudiant HE2B',
            html: generateConfirmationEmailTemplate(data)
        })

        console.log('📧 Résultat confirmation:', {
            success: confirmationResult.success,
            id: confirmationResult.id,
            error: confirmationResult.error
        })

        // Réponse de succès
        return NextResponse.json({
            success: true,
            message: 'Message envoyé avec succès',
            mainEmailId: mainEmailResult.id,
            confirmationSent: confirmationResult.success,
            confirmationEmailId: confirmationResult.id || null
        }, { status: 200 })

    } catch (error) {
        console.error('❌ Erreur dans la route de contact:', error)

        // Gestion des erreurs spécifiques
        if (error instanceof Error) {
            if (error.message.includes('Invalid API key')) {
                return NextResponse.json(
                    { error: 'Configuration email invalide' },
                    { status: 500 }
                )
            }

            if (error.message.includes('rate limit')) {
                return NextResponse.json(
                    { error: 'Trop de messages envoyés. Veuillez réessayer dans quelques minutes.' },
                    { status: 429 }
                )
            }

            if (error.message.includes('Invalid to address')) {
                return NextResponse.json(
                    { error: 'Adresse email de destination invalide' },
                    { status: 400 }
                )
            }
        }

        return NextResponse.json(
            {
                error: 'Erreur lors de l\'envoi du message. Veuillez réessayer ou nous contacter directement.',
                contact: 'bureau-ce@he2b.be'
            },
            { status: 500 }
        )
    }
}