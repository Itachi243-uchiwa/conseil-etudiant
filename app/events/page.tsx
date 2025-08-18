import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LuxuryButton } from "@/components/ui/luxury-button"
import { Calendar, Clock, MapPin, ExternalLink, User } from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"
import LuxuryCard from "@/components/ui/luxury-card"
import { getEvents } from "@/lib/api"
import { generateMetadata, generateStructuredData } from "@/lib/seo"
import { StructuredData } from "@/components/StructuredData"

export const metadata: Metadata = generateMetadata({
    title: "Événements Étudiants - Calendrier et Activités HE2B",
    description:
        "Découvrez tous les événements organisés par le Conseil Étudiant HE2B : soirées, conférences, activités culturelles et sportives. Ne manquez rien de la vie étudiante !",
    keywords: ["événements", "activités étudiantes", "soirées", "conférences", "culture", "sport", "calendrier"],
    url: "/events",
})

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
    status: "DRAFT" | "PUBLISHED" | "CANCELLED"
    externalLink?: string
    organizer?: string
    category: "ACADEMIC" | "SOCIAL" | "CULTURAL" | "SPORTS" | "PROFESSIONAL" | "OTHER"
    metaTitle?: string
    metaDescription?: string
    createdAt: string
    updatedAt: string
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
}

const formatTime = (timeString?: string) => {
    if (!timeString) return "Non précisé"
    return timeString.slice(0, 5)
}

const getCategoryBadge = (category: Event["category"]) => {
    const categoryMap = {
        ACADEMIC: { label: "Académique", color: "bg-blue-100 text-blue-800" },
        SOCIAL: { label: "Social", color: "bg-green-100 text-green-800" },
        CULTURAL: { label: "Culturel", color: "bg-purple-100 text-purple-800" },
        SPORTS: { label: "Sport", color: "bg-orange-100 text-orange-800" },
        PROFESSIONAL: { label: "Professionnel", color: "bg-indigo-100 text-indigo-800" },
        OTHER: { label: "Autre", color: "bg-gray-100 text-gray-800" },
    }

    const categoryInfo = categoryMap[category] || categoryMap.OTHER

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryInfo.color}`}>
      {categoryInfo.label}
    </span>
    )
}

export default async function EventsPage() {
    const events: Event[] = await getEvents()
    const publishedEvents = events.filter((event) => event.status === "PUBLISHED")

    const structuredData = generateStructuredData("organization", {})

    return (
        <>
            <StructuredData data={structuredData} />
            <div className="relative">
                <div className="hidden lg:block">
                    <ParallaxBackground />
                </div>

                <div className="container pt-20 py-6 md:py-20 px-4 md:px-8">
                    <header className="max-w-4xl mx-auto mb-8 md:mb-16">
                        <h1 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 animate-slide-in-bottom">
                            Événements Étudiants HE2B
                        </h1>
                        <p className="text-base md:text-xl text-muted-foreground animate-slide-in-bottom animate-delay-200">
                            Découvrez les événements organisés par le Conseil Étudiant HE2B tout au long de l'année académique. Des
                            soirées festives aux conférences enrichissantes, il y en a pour tous les goûts !
                        </p>
                    </header>

                    <main>
                        {publishedEvents.length === 0 ? (
                            <section className="text-center py-8 md:py-16">
                                <Calendar className="mx-auto h-12 w-12 md:h-16 md:w-16 text-muted-foreground mb-4" aria-hidden="true" />
                                <h2 className="text-lg md:text-xl font-semibold text-muted-foreground mb-4">
                                    Aucun événement disponible pour le moment
                                </h2>
                                <p className="text-muted-foreground text-sm md:text-base">
                                    Revenez bientôt pour découvrir nos prochains événements !
                                </p>
                            </section>
                        ) : (
                            <>
                                <section aria-labelledby="events-list">
                                    <h2 id="events-list" className="sr-only">
                                        Liste des événements
                                    </h2>

                                    <div className="lg:hidden space-y-4 mb-8">
                                        {publishedEvents.map((event, index) => (
                                            <article key={event.id} className={`animate-slide-in-bottom animate-delay-${index * 100}`}>
                                                <Link
                                                    href={`/events/${event.slug}`}
                                                    className="block mobile-card mobile-touch hover:scale-[1.02] transition-all duration-300"
                                                    aria-label={`En savoir plus sur ${event.title}`}
                                                >
                                                    {event.image && (
                                                        <div className="relative aspect-video mb-3 rounded-lg overflow-hidden">
                                                            <Image
                                                                src={event.image || "/placeholder.svg"}
                                                                alt={`Image de l'événement: ${event.title}`}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                            <div className="absolute top-2 left-2">{getCategoryBadge(event.category)}</div>
                                                        </div>
                                                    )}
                                                    <div className="space-y-2">
                                                        <h3 className="font-semibold text-sm line-clamp-2">{event.title}</h3>
                                                        <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>
                                                        <div className="flex items-center text-xs text-muted-foreground">
                                                            <Calendar className="mr-1 h-3 w-3 text-primary" aria-hidden="true" />
                                                            <time dateTime={event.date}>{formatDate(event.date)}</time>
                                                        </div>
                                                        <div className="flex items-center text-xs text-muted-foreground">
                                                            <MapPin className="mr-1 h-3 w-3 text-primary" aria-hidden="true" />
                                                            <span>{event.location}</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </article>
                                        ))}
                                    </div>

                                    <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                                        {publishedEvents.map((event) => (
                                            <article key={event.id}>
                                                <LuxuryCard className="h-full flex flex-col">
                                                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                                                        <Image
                                                            src={event.image || "/placeholder.svg?height=400&width=600"}
                                                            alt={`Image de l'événement: ${event.title}`}
                                                            fill
                                                            className="object-cover transition-transform hover:scale-105"
                                                        />
                                                        <div className="absolute top-4 left-4">{getCategoryBadge(event.category)}</div>
                                                        {event.featured && (
                                                            <div className="absolute top-4 right-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                  ⭐ À la une
                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <CardHeader>
                                                        <CardTitle className="gold-text">
                                                            <h3>{event.title}</h3>
                                                        </CardTitle>
                                                        <p className="text-muted-foreground">{event.description}</p>
                                                    </CardHeader>
                                                    <CardContent className="flex-grow">
                                                        <div className="space-y-2 mb-4">
                                                            <div className="flex items-center text-sm">
                                                                <Calendar className="mr-2 h-4 w-4 text-primary" aria-hidden="true" />
                                                                <time dateTime={event.date}>{formatDate(event.date)}</time>
                                                            </div>
                                                            <div className="flex items-center text-sm">
                                                                <Clock className="mr-2 h-4 w-4 text-primary" aria-hidden="true" />
                                                                <span>{formatTime(event.time)}</span>
                                                            </div>
                                                            <div className="flex items-center text-sm">
                                                                <MapPin className="mr-2 h-4 w-4 text-primary" aria-hidden="true" />
                                                                <span>{event.location}</span>
                                                            </div>
                                                            {event.organizer && (
                                                                <div className="flex items-center text-sm">
                                                                    <User className="mr-2 h-4 w-4 text-primary" aria-hidden="true" />
                                                                    <span>Organisé par {event.organizer}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {event.longDescription && (
                                                            <p className="text-muted-foreground text-sm">
                                                                {event.longDescription.substring(0, 150)}...
                                                            </p>
                                                        )}
                                                    </CardContent>
                                                    <CardFooter className="flex gap-2">
                                                        <LuxuryButton
                                                            asChild
                                                            variant="outline"
                                                            className="border-primary/30 hover:border-primary/60 flex-1"
                                                        >
                                                            <Link href={`/events/${event.slug}`} aria-label={`En savoir plus sur ${event.title}`}>
                                                                En savoir plus
                                                            </Link>
                                                        </LuxuryButton>
                                                        {event.externalLink && (
                                                            <LuxuryButton asChild variant="gold" size="sm" className="px-3">
                                                                <a
                                                                    href={event.externalLink}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    aria-label={`Lien externe pour ${event.title}`}
                                                                >
                                                                    <ExternalLink className="h-4 w-4" />
                                                                </a>
                                                            </LuxuryButton>
                                                        )}
                                                    </CardFooter>
                                                </LuxuryCard>
                                            </article>
                                        ))}
                                    </div>
                                </section>
                            </>
                        )}

                        <section className="bg-muted/30 rounded-lg p-8 relative z-10" aria-labelledby="propose-event">
                            <h2 id="propose-event" className="text-2xl font-bold mb-4">
                                Proposer un Événement
                            </h2>
                            <p className="mb-4">
                                Vous avez une idée d'événement que vous aimeriez voir organisé par le Conseil Étudiant ? N'hésitez pas à
                                nous en faire part ! Nous sommes toujours à la recherche de nouvelles idées pour animer la vie
                                étudiante.
                            </p>
                            <div className="relative z-20">
                                <LuxuryButton asChild>
                                    <Link href="/contact">Nous contacter</Link>
                                </LuxuryButton>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    )
}
