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

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
                throw new Error(data.error || "Erreur lors de l'envoi de la candidature")
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

            setTimeout(() => setIsSuccess(false), 7000)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur inattendue s'est produite")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto px-4 md:px-0">
            {/* Messages de statut */}
            {isSuccess && (
                <div className="mb-4 md:mb-6 p-3 md:p-4 bg-green-50/90 dark:bg-green-950/90 backdrop-blur-sm border border-green-200 dark:border-green-800 rounded-md flex items-start gap-2 md:gap-3">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div className="text-green-800 dark:text-green-200">
                        <p className="font-medium text-sm md:text-base">Candidature envoyée avec succès !</p>
                        <p className="text-xs md:text-sm mt-1">
                            Nous avons bien reçu votre candidature de cooptation et vous répondrons dans les plus brefs délais. Un
                            email de confirmation a été envoyé à votre adresse.
                        </p>
                    </div>
                </div>
            )}

            {error && (
                <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50/90 dark:bg-red-950/90 backdrop-blur-sm border border-red-200 dark:border-red-800 rounded-md flex items-start gap-2 md:gap-3">
                    <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <div className="text-red-800 dark:text-red-200">
                        <p className="font-medium text-sm md:text-base">Erreur lors de l'envoi</p>
                        <p className="text-xs md:text-sm mt-1">{error}</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block font-medium text-foreground text-sm md:text-base">
                            Nom complet *
                        </label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary text-sm md:text-base"
                            placeholder="Votre nom complet"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block font-medium text-foreground text-sm md:text-base">
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
                            className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary text-sm md:text-base"
                            placeholder="votre.matricule@etu.he2b.be"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2">
                        <label htmlFor="campus" className="block font-medium text-foreground text-sm md:text-base">
                            Campus *
                        </label>
                        <Select
                            value={formData.campus}
                            onValueChange={(value) => handleSelectChange("campus", value)}
                            disabled={isSubmitting}
                        >
                            <SelectTrigger className="bg-background/50 border-border text-foreground focus:border-primary focus:ring-primary text-sm md:text-base">
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
                        <label htmlFor="year" className="block font-medium text-foreground text-sm md:text-base">
                            Année d'étude *
                        </label>
                        <Select
                            value={formData.year}
                            onValueChange={(value) => handleSelectChange("year", value)}
                            disabled={isSubmitting}
                        >
                            <SelectTrigger className="bg-background/50 border-border text-foreground focus:border-primary focus:ring-primary text-sm md:text-base">
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
                    <label htmlFor="motivation" className="block font-medium text-foreground text-sm md:text-base">
                        Motivation *
                    </label>
                    <Textarea
                        id="motivation"
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        rows={3}
                        className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary text-sm md:text-base"
                        placeholder="Expliquez pourquoi vous souhaitez rejoindre le Conseil Étudiant..."
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="experience" className="block font-medium text-foreground text-sm md:text-base">
                        Expérience et compétences
                    </label>
                    <Textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        rows={3}
                        className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary text-sm md:text-base"
                        placeholder="Décrivez vos expériences pertinentes, compétences, projets antérieurs..."
                    />
                </div>

                <Button
                    type="submit"
                    disabled={
                        isSubmitting ||
                        !formData.name ||
                        !formData.email ||
                        !formData.campus ||
                        !formData.year ||
                        !formData.motivation ||
                        !formData.availability
                    }
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base py-2 md:py-3"
                >
                    {isSubmitting ? (
                        <>
                            <div className="animate-spin rounded-full h-3 w-3 md:h-4 md:w-4 border-b-2 border-primary-foreground mr-2"></div>
                            Envoi en cours...
                        </>
                    ) : (
                        <>
                            <Send className="h-3 w-3 md:h-4 md:w-4 mr-2" /> Envoyer ma candidature
                        </>
                    )}
                </Button>

                <p className="text-xs md:text-sm text-muted-foreground text-center">* Champs obligatoires</p>
            </form>
        </div>
    )
}
