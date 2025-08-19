'use client'

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { LuxuryButton } from "@/components/ui/luxury-button"
import {
    Calendar,
    Clock,
    MapPin,
    User,
    ExternalLink,
    ArrowLeft,
    Share2,
    Heart,
    Tag
} from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"
import { LuxuryHeading } from "@/components/ui/luxury-heading"
import LuxuryCard from "@/components/ui/luxury-card"
import { getEventBySlug } from "@/lib/api"
import { useEffect, useState } from "react"

// Types pour les événements
interface Event {
    id: number
    title: string
    description: string
    longDescription?: string
    date: string
    time?: string
    location: string
    image?: string
    slug: string
    featured: boolean
    status: 'DRAFT' | 'PUBLISHED' | 'CANCELLED'
    externalLink?: string
    organizer?: string
    category: 'ACADEMIC' | 'SOCIAL' | 'CULTURAL' | 'SPORTS' | 'PROFESSIONAL' | 'OTHER'
    metaTitle?: string
    metaDescription?: string
    createdAt: string
    updatedAt: string
}

interface Props {
    params: Promise<{
        slug: string
    }>
}

// Fonction pour formater la date
const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    })
}

// Fonction pour formater l'heure
const formatTime = (timeString?: string) => {
    if (!timeString) return "Non précisé"
    return timeString.slice(0, 5) // Format HH:MM
}

// Fonction pour obtenir le badge de catégorie
const getCategoryInfo = (category: Event['category']) => {
    const categoryMap = {
        ACADEMIC: {
            label: "Académique",
            color: "bg-blue-100 text-blue-800 border-blue-200",
            icon: "🎓"
        },
        SOCIAL: {
            label: "Social",
            color: "bg-green-100 text-green-800 border-green-200",
            icon: "🎉"
        },
        CULTURAL: {
            label: "Culturel",
            color: "bg-purple-100 text-purple-800 border-purple-200",
            icon: "🎨"
        },
        SPORTS: {
            label: "Sport",
            color: "bg-orange-100 text-orange-800 border-orange-200",
            icon: "⚽"
        },
        PROFESSIONAL: {
            label: "Professionnel",
            color: "bg-indigo-100 text-indigo-800 border-indigo-200",
            icon: "💼"
        },
        OTHER: {
            label: "Autre",
            color: "bg-gray-100 text-gray-800 border-gray-200",
            icon: "📋"
        },
    }

    return categoryMap[category] || categoryMap.OTHER
}

// Fonction pour vérifier si l'événement est passé
const isEventPast = (dateString: string, timeString?: string) => {
    const eventDate = new Date(dateString)
    if (timeString) {
        const [hours, minutes] = timeString.split(':').map(Number)
        eventDate.setHours(hours, minutes)
    }
    return eventDate < new Date()
}

export default function EventDetailPage({ params }: Props) {
    const [event, setEvent] = useState<Event | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadEvent() {
            try {
                const resolvedParams = await params
                const eventData = await getEventBySlug(resolvedParams.slug)

                if (!eventData || eventData.status !== 'PUBLISHED') {
                    notFound()
                }

                setEvent(eventData)
            } catch (error) {
                console.error('Erreur lors du chargement de l\'événement:', error)
                notFound()
            } finally {
                setLoading(false)
            }
        }

        loadEvent()
    }, [params])

    const handleGoogleCalendar = () => {
        if (!event) return

        const startDate = new Date(event.date)
        if (event.time) {
            const [hours, minutes] = event.time.split(':').map(Number)
            startDate.setHours(hours, minutes)
        }

        const endDate = new Date(startDate)
        endDate.setHours(startDate.getHours() + 2) // Durée par défaut de 2h

        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`

        window.open(googleCalendarUrl, '_blank')
    }

    const handleDownloadICS = () => {
        if (!event) return

        const startDate = new Date(event.date)
        if (event.time) {
            const [hours, minutes] = event.time.split(':').map(Number)
            startDate.setHours(hours, minutes)
        }

        const endDate = new Date(startDate)
        endDate.setHours(startDate.getHours() + 2)

        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Conseil Étudiant HE2B//Event//FR
BEGIN:VEVENT
UID:${event.id}@he2b.be
DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`

        const blob = new Blob([icsContent], { type: 'text/calendar' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${event.slug}.ics`
        a.click()
        URL.revokeObjectURL(url)
    }

    if (loading) {
        return (
            <div className="relative">
                <ParallaxBackground />
                <div className="container py-12 md:py-20">
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                            <p>Chargement de l'événement...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!event) {
        notFound()
        return null
    }

    const categoryInfo = getCategoryInfo(event.category)
    const isPast = isEventPast(event.date, event.time)

    return (
        <div className="relative">
            <ParallaxBackground />

            <div className="container py-12 md:py-20">
                {/* Navigation de retour */}
                <div className="pt-7 mb-8">
                    <LuxuryButton asChild variant="outline" className="mb-4">
                        <Link href="/events" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Retour aux événements
                        </Link>
                    </LuxuryButton>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contenu principal */}
                    <div className="lg:col-span-2">
                        <LuxuryCard className="overflow-hidden">
                            {/* Image principale */}
                            {event.image && (
                                <div className="relative aspect-video overflow-hidden">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-black/20" />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${categoryInfo.color}`}>
                                            {categoryInfo.icon} {categoryInfo.label}
                                        </span>
                                        {event.featured && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                                                ⭐ À la une
                                            </span>
                                        )}
                                        {isPast && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                                📅 Terminé
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="p-8">
                                {/* Titre et description courte */}
                                <LuxuryHeading as="h1" className="text-3xl md:text-4xl mb-4">
                                    {event.title}
                                </LuxuryHeading>

                                <p className="text-xl text-muted-foreground mb-8">
                                    {event.description}
                                </p>

                                {/* Description longue */}
                                {event.longDescription && (
                                    <div className="prose prose-lg max-w-none mb-8">
                                        <div className="text-foreground leading-relaxed">
                                            {event.longDescription.split('\n').map((paragraph, index) => (
                                                <p key={index} className="mb-4">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex flex-wrap gap-4 pt-6 border-t">
                                    {event.externalLink && (
                                        <LuxuryButton asChild className="mobile-touch">
                                            <a href={event.externalLink} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-4 w-4" />
                                                {isPast ? 'Voir les détails' : 'S\'inscrire / Plus d\'infos'}
                                            </a>
                                        </LuxuryButton>
                                    )}

                                    <LuxuryButton variant="outline" className="flex items-center gap-2">
                                        <Share2 className="h-4 w-4" />
                                        Partager
                                    </LuxuryButton>

                                    <LuxuryButton variant="outline" className="flex items-center gap-2">
                                        <Heart className="h-4 w-4" />
                                        Ajouter aux favoris
                                    </LuxuryButton>
                                </div>
                            </div>
                        </LuxuryCard>
                    </div>

                    {/* Sidebar avec informations */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Informations pratiques */}
                            <LuxuryCard className="p-6">
                                <h3 className="font-bold text-lg mb-4 gold-text">Informations pratiques</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium">Date</p>
                                            <p className="text-sm text-muted-foreground">
                                                {formatDate(event.date)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium">Heure</p>
                                            <p className="text-sm text-muted-foreground">
                                                {formatTime(event.time)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium">Lieu</p>
                                            <p className="text-sm text-muted-foreground">
                                                {event.location}
                                            </p>
                                        </div>
                                    </div>

                                    {event.organizer && (
                                        <div className="flex items-start gap-3">
                                            <User className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium">Organisateur</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {event.organizer}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-3">
                                        <Tag className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium">Catégorie</p>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${categoryInfo.color}`}>
                                                {categoryInfo.icon} {categoryInfo.label}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </LuxuryCard>

                            {/* Calendrier rapide */}
                            <LuxuryCard className="p-6">
                                <h3 className="font-bold text-lg mb-4 gold-text">Ajouter au calendrier</h3>
                                <div className="space-y-3">
                                    <LuxuryButton
                                        variant="outline"
                                        className="w-full justify-start"
                                        onClick={handleGoogleCalendar}
                                    >
                                        📅 Google Calendar
                                    </LuxuryButton>

                                    <LuxuryButton
                                        variant="outline"
                                        className="w-full justify-start"
                                        onClick={handleDownloadICS}
                                    >
                                        📥 Télécharger (.ics)
                                    </LuxuryButton>
                                </div>
                            </LuxuryCard>

                            {/* Contact */}
                            <LuxuryCard className="p-6">
                                <h3 className="font-bold text-lg mb-4 gold-text">Une question ?</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Contactez-nous pour plus d'informations sur cet événement.
                                </p>
                                <LuxuryButton asChild className="w-full">
                                    <Link href="/contact">Nous contacter</Link>
                                </LuxuryButton>
                            </LuxuryCard>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}