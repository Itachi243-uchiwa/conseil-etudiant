// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
    try {
        const { name, email, subject, message } = await request.json()

        // Validation des données
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Tous les champs sont requis' },
                { status: 400 }
            )
        }

        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Adresse email invalide' },
                { status: 400 }
            )
        }

        console.log('Tentative d\'envoi d\'emails vers:', {
            mainTo: 'lnapo883@gmail.com',
            confirmationTo: email,
            emailIsValid: emailRegex.test(email)
        })

        // Envoi de l'email principal vers le conseil étudiant
        const mainEmail = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: ['lnapo883@gmail.com'],
            replyTo: email,
            subject: `[Contact CE-HE2B] ${subject}`,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nouveau message de contact</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #3F3290 0%, #5a4fcf 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Nouveau message de contact</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Site web du Conseil Étudiant HE2B</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-left: 4px solid #3F3290;">
            <h2 style="color: #3F3290; margin-top: 0; border-bottom: 2px solid #3F3290; padding-bottom: 10px;">Informations de contact</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 100px;">Nom :</td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email :</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3F3290; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Sujet :</td>
                <td style="padding: 8px 0;">${subject}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e9ecef; border-top: none;">
            <h2 style="color: #3F3290; margin-top: 0; border-bottom: 2px solid #3F3290; padding-bottom: 10px;">Message</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #3F3290;">
              <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <div style="background: #3F3290; color: white; padding: 20px; border-radius: 0 0 10px 10px; text-align: center; font-size: 14px;">
            <p style="margin: 0;">
              📧 Pour répondre, cliquez simplement sur "Répondre" dans votre client email<br>
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
      `,
        })

        console.log('Email principal envoyé:', mainEmail.data?.id)

        // Envoi de l'email de confirmation à l'expéditeur
        let confirmationEmail;
        let confirmationError = null;

        try {
            console.log('🔄 Début envoi confirmation vers:', email);

            // Attendre un peu pour éviter les problèmes de rate limiting
            await new Promise(resolve => setTimeout(resolve, 500))

            console.log('📤 Appel API Resend pour confirmation...');

            confirmationEmail = await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: email, // Pas besoin d'array pour un seul email
                subject: '✅ Confirmation de réception - Conseil Étudiant HE2B',
                html: `
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
            <p style="font-size: 18px; margin-top: 0;">Bonjour <strong>${name}</strong>,</p>
            
            <p>Nous avons bien reçu votre message concernant :</p>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #3F3290; margin: 20px 0;">
              <strong style="color: #3F3290;">${subject}</strong>
            </div>
            
            <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; border: 1px solid #b8e6ff; margin: 20px 0;">
              <h3 style="color: #3F3290; margin-top: 0;">📋 Rappel de votre message :</h3>
              <p style="margin-bottom: 0; font-style: italic; line-height: 1.6; white-space: pre-wrap;">"${message}"</p>
            </div>
            
            <p>Notre équipe traitera votre demande dans les plus brefs délais. Nous nous efforçons de répondre à tous les messages dans un délai de <strong>24 à 48 heures</strong>.</p>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border: 1px solid #bae6fd; margin: 20px 0;">
              <h3 style="color: #3F3290; margin-top: 0;">📞 Besoin d'une réponse urgente ?</h3>
              <p style="margin-bottom: 0;">
                <strong>Email :</strong> ce@he2b.be<br>
                <strong>Téléphone :</strong> +32 12 345 678<br>
                <strong>Adresse :</strong> Rue Royale 150, 1000 Bruxelles
              </p>
            </div>
            
            <p>Cordialement,<br>
            <strong style="color: #3F3290;">L'équipe du Conseil Étudiant HE2B</strong></p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 10px 10px; text-align: center; font-size: 12px; color: #666;">
            <p style="margin: 0;">
              Cet email a été envoyé automatiquement suite à votre message sur notre site web.<br>
              Si vous n'avez pas envoyé ce message, veuillez nous contacter immédiatement.
            </p>
          </div>
        </body>
        </html>
      `,
            })

            console.log('✅ Réponse Resend reçue:', {
                success: !!confirmationEmail?.data?.id,
                id: confirmationEmail?.data?.id,
                fullResponse: confirmationEmail
            });

        } catch (error) {
            console.error('❌ Erreur capturée lors de l\'envoi de confirmation:', {

                fullError: error
            });
            confirmationError = error;
        }

        console.log('Résumé des envois:', {
            mainEmailId: mainEmail.data?.id,
            mainEmailSuccess: !!mainEmail.data?.id,
            confirmationEmailId: confirmationEmail?.data?.id || null,
            confirmationEmailSuccess: !!confirmationEmail?.data?.id,
        })

        return NextResponse.json(
            {
                message: 'Email principal envoyé avec succès',
                emailId: mainEmail.data?.id,
                confirmationSent: !!confirmationEmail?.data?.id,
            },
            { status: 200 }
        )

    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email principal:', error)

        // Gestion des erreurs spécifiques de Resend
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
        }

        return NextResponse.json(
            { error: 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer.' },
            { status: 500 }
        )
    }
}