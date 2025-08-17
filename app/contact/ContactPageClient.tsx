"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle } from "lucide-react"

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Réinitialiser les messages d'erreur quand l'utilisateur tape
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi du message')
      }

      setIsSuccess(true)
      setFormData({ name: "", email: "", subject: "", message: "" })

      // Réinitialiser le message de succès après 7 secondes
      setTimeout(() => setIsSuccess(false), 7000)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur inattendue s\'est produite')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
      <div className="container py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl font-bold mb-6 text-[#3F3290] dark:gold-text">Contactez-nous</h1>
            <p className="text-lg mb-8 text-muted-foreground">
              Nous sommes là pour vous aider. N'hésitez pas à nous contacter pour toute question ou demande.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-[#3F3290] mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-muted-foreground">bureau-@cehe2b.be</p>
                  <p className="text-muted-foreground">ce@he2b.be</p>
                  <p className="text-muted-foreground">info@cehe2b.be</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-[#3F3290] mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Téléphone</h3>
                  <p className="text-muted-foreground">+32 495 79 99 75</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-[#3F3290] mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Adresse</h3>
                  <p className="text-muted-foreground">
                    Rue Royale 150,
                    <br />
                    1000 Bruxelles,
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card className="border-[#3F3290]/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-[#3F3290] dark:gold-text">Envoyez-nous un message</h2>

                {/* Messages de statut */}
                {isSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="text-green-800">
                        <p className="font-medium">Message envoyé avec succès !</p>
                        <p className="text-sm mt-1">
                          Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.
                          Un email de confirmation a été envoyé à votre adresse.
                        </p>
                      </div>
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div className="text-red-800">
                        <p className="font-medium">Erreur lors de l'envoi</p>
                        <p className="text-sm mt-1">{error}</p>
                      </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block font-medium">
                      Nom complet
                    </label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="border-[#3F3290]/20 focus:border-[#3F3290] focus:ring-[#3F3290]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block font-medium">
                      Email
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="border-[#3F3290]/20 focus:border-[#3F3290] focus:ring-[#3F3290]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block font-medium">
                      Sujet
                    </label>
                    <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="border-[#3F3290]/20 focus:border-[#3F3290] focus:ring-[#3F3290]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="block font-medium">
                      Message
                    </label>
                    <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        rows={5}
                        className="border-[#3F3290]/20 focus:border-[#3F3290] focus:ring-[#3F3290]"
                    />
                  </div>
                  <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#3F3290] hover:bg-[#342770] text-white disabled:opacity-50"
                  >
                    {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Envoi en cours...
                        </>
                    ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" /> Envoyer
                        </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  )
}