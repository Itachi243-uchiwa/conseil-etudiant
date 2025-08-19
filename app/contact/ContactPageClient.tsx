"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle } from "lucide-react"
import LuxuryHeading from "@/components/ui/luxury-heading";
import {LuxuryButton} from "@/components/ui/luxury-button";

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
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Erreur lors de l'envoi du message")
            }

            setIsSuccess(true)
            setFormData({ name: "", email: "", subject: "", message: "" })

            // Réinitialiser le message de succès après 7 secondes
            setTimeout(() => setIsSuccess(false), 7000)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur inattendue s'est produite")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="container pt-16 py-8 md:py-12 lg:py-24 px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                <div className="animate-slide-in-bottom">
                    <LuxuryHeading as="h1" className="text-3xl font-bold mb-6">
                        Contactez-nous
                    </LuxuryHeading>
                    <p className="text-sm md:text-base lg:text-lg mb-6 md:mb-8 text-muted-foreground">
                        Nous sommes là pour vous aider. N'hésitez pas à nous contacter pour toute question ou demande.
                    </p>

                    <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
                        <div className="flex items-start gap-3 md:gap-4 animate-slide-in-bottom animate-delay-100">
                            <Mail className="h-5 w-5 md:h-6 md:w-6 gold-text mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-sm md:text-base lg:text-lg">Email</h3>
                                <p className="text-xs md:text-sm text-muted-foreground">bureau-@cehe2b.be</p>
                                <p className="text-xs md:text-sm text-muted-foreground">ce@he2b.be</p>
                                <p className="text-xs md:text-sm text-muted-foreground">info@cehe2b.be</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 md:gap-4 animate-slide-in-bottom animate-delay-200">
                            <Phone className="h-5 w-5 md:h-6 md:w-6 gold-text mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-sm md:text-base lg:text-lg">Téléphone</h3>
                                <p className="text-xs md:text-sm text-muted-foreground">+32 495 79 99 75</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 md:gap-4 animate-slide-in-bottom animate-delay-300">
                            <MapPin className="h-5 w-5 md:h-6 md:w-6 gold-text mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-sm md:text-base lg:text-lg">Adresse</h3>
                                <p className="text-xs md:text-sm text-muted-foreground">
                                    Rue Royale 150,
                                    <br />
                                    1000 Bruxelles,
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="animate-slide-in-bottom animate-delay-500">
                    <Card className="border-[#3F3290]/20 mobile-card">
                        <CardContent className="p-4 md:p-6">
                            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 gold-text">
                                Envoyez-nous un message
                            </h2>

                            {/* Messages de statut */}
                            {isSuccess && (
                                <div className="mb-4 md:mb-6 p-3 md:p-4 bg-green-50 border border-green-200 rounded-md flex items-start gap-2 md:gap-3">
                                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <div className="text-green-800">
                                        <p className="font-medium text-sm md:text-base">Message envoyé avec succès !</p>
                                        <p className="text-xs md:text-sm mt-1">
                                            Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais. Un email de
                                            confirmation a été envoyé à votre adresse.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-2 md:gap-3">
                                    <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-red-600 mt-0.5 flex-shrink-0" />
                                    <div className="text-red-800">
                                        <p className="font-medium text-sm md:text-base">Erreur lors de l'envoi</p>
                                        <p className="text-xs md:text-sm mt-1">{error}</p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block font-medium text-sm md:text-base">
                                        Nom complet
                                    </label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                        className="border-[#3F3290]/20 focus:border-[#3F3290] focus:ring-[#3F3290] mobile-touch text-sm md:text-base"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block font-medium text-sm md:text-base">
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
                                        className="border-[#3F3290]/20 focus:border-[#3F3290] focus:ring-[#3F3290] mobile-touch text-sm md:text-base"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="block font-medium text-sm md:text-base">
                                        Sujet
                                    </label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                        className="border-[#3F3290]/20 focus:border-[#3F3290] focus:ring-[#3F3290] mobile-touch text-sm md:text-base"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="block font-medium text-sm md:text-base">
                                        Message
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                        rows={4}
                                        className="border-[#3F3290]/20 focus:border-[#3F3290] focus:ring-[#3F3290] mobile-touch text-sm md:text-base"
                                    />
                                </div>
                                <LuxuryButton
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#3F3290] hover:bg-[#342770] text-white disabled:opacity-50 mobile-touch text-sm md:text-base py-2 md:py-3"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-3 w-3 md:h-4 md:w-4 border-b-2 border-white mr-2"></div>
                                            Envoi en cours...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-3 w-3 md:h-4 md:w-4 mr-2" /> Envoyer
                                        </>
                                    )}
                                </LuxuryButton>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
