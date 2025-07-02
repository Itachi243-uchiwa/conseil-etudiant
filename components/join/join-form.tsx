"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

export default function JoinForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        faculty: "",
        experience: "",
        interests: [] as string[],
        motivation: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleRadioChange = (value: string) => {
        setFormData((prev) => ({ ...prev, faculty: value }))
    }

    const handleCheckboxChange = (value: string) => {
        setFormData((prev) => {
            const interests = [...prev.interests]
            if (interests.includes(value)) {
                return { ...prev, interests: interests.filter((item) => item !== value) }
            } else {
                return { ...prev, interests: [...interests, value] }
            }
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simuler l'envoi du formulaire
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setIsSubmitting(false)
        setIsSuccess(true)
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            faculty: "",
            experience: "",
            interests: [],
            motivation: "",
        })

        // Réinitialiser le message de succès après 5 secondes
        setTimeout(() => setIsSuccess(false), 5000)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-primary/20"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-primary/20"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-primary/20"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Numéro de téléphone *</Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-primary/20"
                    />
                </div>
            </div>

            <div className="space-y-3">
                <Label>Dans quelle faculté es-tu inscrit·e ? *</Label>
                <RadioGroup value={formData.faculty} onValueChange={handleRadioChange} className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="defre" id="defre" />
                        <Label htmlFor="defre">Campus Defré</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="iessid" id="iessid" />
                        <Label htmlFor="iessid">Campus IESSID</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="isek" id="isek" />
                        <Label htmlFor="isek">Campus ISEK</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="isib" id="isib" />
                        <Label htmlFor="isib">Campus ISIB</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ises" id="ises" />
                        <Label htmlFor="ises">Campus ISES</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nivelles" id="nivelles" />
                        <Label htmlFor="nivelles">Campus Nivelles</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="esi" id="esi" />
                        <Label htmlFor="esi">Campus ESI</Label>
                    </div>
                </RadioGroup>
            </div>

            <div className="space-y-3">
                <Label htmlFor="experience">
                    Parle-nous un peu de toi ! (Engagements précédents, intérêts, expériences, etc.) *
                </Label>
                <Textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="min-h-[100px] bg-white/5 border-primary/20"
                />
            </div>

            <div className="space-y-3">
                <Label>Je suis intéressé·e par (plusieurs choix possible) *</Label>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="communication"
                            checked={formData.interests.includes("communication")}
                            onCheckedChange={() => handleCheckboxChange("communication")}
                        />
                        <Label htmlFor="communication">Cellule communication</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="social"
                            checked={formData.interests.includes("social")}
                            onCheckedChange={() => handleCheckboxChange("social")}
                        />
                        <Label htmlFor="social">Cellule Sociale</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="education"
                            checked={formData.interests.includes("education")}
                            onCheckedChange={() => handleCheckboxChange("education")}
                        />
                        <Label htmlFor="education">Cellule Enseignement</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="sustainability"
                            checked={formData.interests.includes("sustainability")}
                            onCheckedChange={() => handleCheckboxChange("sustainability")}
                        />
                        <Label htmlFor="sustainability">Cellule Durabilité</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="project"
                            checked={formData.interests.includes("project")}
                            onCheckedChange={() => handleCheckboxChange("project")}
                        />
                        <Label htmlFor="project">J'ai mon propre projet</Label>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <Label htmlFor="motivation">Expliques-nous pourquoi tu voudrais rejoindre ! Quels sont tes projets ? *</Label>
                <Textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    required
                    className="min-h-[150px] bg-white/5 border-primary/20"
                />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-white">
                {isSubmitting ? "Envoi en cours..." : "Envoyer ma candidature"}
            </Button>

            {isSuccess && (
                <div className="p-4 bg-green-100 text-green-700 rounded-md text-center">
                    Merci pour ta candidature ! Nous te contacterons prochainement pour discuter de ta participation au Conseil
                    Étudiant.
                </div>
            )}
        </form>
    )
}
