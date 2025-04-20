"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import CampusLogo from "@/components/ui/campus-logo"

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler l'envoi du formulaire
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)
    setFormData({ name: "", email: "", subject: "", message: "" })

    // Réinitialiser le message de succès après 5 secondes
    setTimeout(() => setIsSuccess(false), 5000)
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
                <p className="text-muted-foreground">contact@cehe2b.be</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-[#3F3290] mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Téléphone</h3>
                <p className="text-muted-foreground">+32 12 345 678</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-[#3F3290] mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Adresse</h3>
                <p className="text-muted-foreground">
                  Avenue Émile Gryzon 1
                  <br />
                  1070 Bruxelles
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-[#3F3290] dark:gold-text">Nos campus</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <CampusLogo campus="defre" className="w-full h-auto" />
            <CampusLogo campus="esi" className="w-full h-auto" />
            <CampusLogo campus="nivelles" className="w-full h-auto" />
            <CampusLogo campus="isib" className="w-full h-auto" />
            <CampusLogo campus="ises" className="w-full h-auto" />
            <CampusLogo campus="isek" className="w-full h-auto" />
            <CampusLogo campus="iessid" className="w-full h-auto" />
          </div>
        </div>

        <div>
          <Card className="border-[#3F3290]/20">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-[#3F3290] dark:gold-text">Envoyez-nous un message</h2>
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
                    rows={5}
                    className="border-[#3F3290]/20 focus:border-[#3F3290] focus:ring-[#3F3290]"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#3F3290] hover:bg-[#342770] text-white"
                >
                  {isSubmitting ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" /> Envoyer
                    </>
                  )}
                </Button>
                {isSuccess && (
                  <div className="p-3 bg-green-100 text-green-700 rounded-md text-center">
                    Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
