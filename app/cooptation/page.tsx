"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, AlertCircle, CheckCircle } from "lucide-react"

export default function JoinForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        campus: "",
        year: "",
        motivation: "",
        experience: "",
        availability: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const campuses = [
        { value: "defre", label: "Defré" },
        { value: "esi", label: "ESI" },
        { value: "nivelles", label: "Nivelles" },
        { value: "isib", label: "ISIB" },
        { value: "ises", label: "ISES" },
        { value: "isek", label: "ISEK" },
        { value: "iessid", label: "IESSID" },
    ]

    const years = [
        { value: "1", label: "1ère année" },
        { value: "2", label: "2ème année" },
        { value: "3", label: "3ème année" },
        { value: "master1", label: "Master 1" },
        { value: "master2", label: "Master 2" },
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (error) setError(null)
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (error) setError(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            // Formatage du message pour la route contact
            const subject = `Candidature de cooptation - ${formData.name} (${formData.campus})`
            const message = `CANDIDATURE DE COOPTATION

📋 INFORMATIONS PERSONNELLES
Nom : ${formData.name}
Email : ${formData.email}
Campus : ${formData.campus}
Année d'étude : ${formData.year}

🎯 MOTIVATION
${formData.motivation}

💼 EXPÉRIENCE
${formData.experience}

⏰ DISPONIBILITÉ
${formData.availability}

---
Message envoyé via le formulaire de cooptation du site web.`

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: subject,
                    message: message,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Erreur lors de l\'envoi de la candidature')
            }

            setIsSuccess(true)
            setFormData({
                name: "",
                email: "",
                campus: "",
                year: "",
                motivation: "",
                experience: "",
                availability: "",
            })

            // Réinitialiser le message de succès après 7 secondes
            setTimeout(() => setIsSuccess(false), 7000)

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur inattendue s\'est produite')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Messages de statut */}
            {isSuccess && (
                <div className="mb-6 p-4 bg-green-50/90 backdrop-blur-sm border border-green-200 rounded-md flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="text-green-800">
                        <p className="font-medium">Candidature envoyée avec succès !</p>
                        <p className="text-sm mt-1">
                            Nous avons bien reçu votre candidature de cooptation et vous répondrons dans les plus brefs délais.
                            Un email de confirmation a été envoyé à votre adresse.
                        </p>
                    </div>
                </div>
            )}

            {error && (
                <div className="mb-6 p-4 bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-md flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="text-red-800">
                        <p className="font-medium">Erreur lors de l'envoi</p>
                        <p className="text-sm mt-1">{error}</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block font-medium text-white">
                            Nom complet *
                        </label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-primary focus:ring-primary"
                            placeholder="Votre nom complet"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block font-medium text-white">
                            Email *
                        </label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-primary focus:ring-primary"
                            placeholder="votre.email@example.com"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="campus" className="block font-medium text-white">
                            Campus *
                        </label>
                        <Select
                            value={formData.campus}
                            onValueChange={(value) => handleSelectChange("campus", value)}
                            disabled={isSubmitting}
                        >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-primary focus:ring-primary">
                                <SelectValue placeholder="Sélectionnez votre campus" />
                            </SelectTrigger>
                            <SelectContent>
                                {campuses.map((campus) => (
                                    <SelectItem key={campus.value} value={campus.value}>
                                        {campus.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="year" className="block font-medium text-white">
                            Année d'étude *
                        </label>
                        <Select
                            value={formData.year}
                            onValueChange={(value) => handleSelectChange("year", value)}
                            disabled={isSubmitting}
                        >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-primary focus:ring-primary">
                                <SelectValue placeholder="Sélectionnez votre année" />
                            </SelectTrigger>
                            <SelectContent>
                                {years.map((year) => (
                                    <SelectItem key={year.value} value={year.value}>
                                        {year.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="motivation" className="block font-medium text-white">
                        Motivation *
                    </label>
                    <Textarea
                        id="motivation"
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        rows={4}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-primary focus:ring-primary"
                        placeholder="Expliquez pourquoi vous souhaitez rejoindre le Conseil Étudiant..."
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="experience" className="block font-medium text-white">
                        Expérience et compétences
                    </label>
                    <Textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        rows={3}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-primary focus:ring-primary"
                        placeholder="Décrivez vos expériences pertinentes, compétences, projets antérieurs..."
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="availability" className="block font-medium text-white">
                        Disponibilité *
                    </label>
                    <Textarea
                        id="availability"
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        rows={3}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-primary focus:ring-primary"
                        placeholder="Indiquez vos disponibilités (jours, créneaux horaires, fréquence)..."
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.campus || !formData.year || !formData.motivation || !formData.availability}
                    className="w-full bg-primary hover:bg-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Envoi en cours...
                        </>
                    ) : (
                        <>
                            <Send className="h-4 w-4 mr-2" /> Envoyer ma candidature
                        </>
                    )}
                </Button>

                <p className="text-sm text-white/80 text-center">
                    * Champs obligatoires
                </p>
            </form>
        </div>
    )
}