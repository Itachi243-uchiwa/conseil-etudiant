import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LuxuryButton } from "@/components/ui/luxury-button"
import { Calendar, Clock, MapPin, ExternalLink, User } from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"
import { LuxuryHeading } from "@/components/ui/luxury-heading"
import LuxuryCard from "@/components/ui/luxury-card"
import { getEvents } from "@/lib/api"

export const metadata: Metadata = {
  title: "Événements | Conseil Étudiant HE2B",
  description: "Découvrez les événements organisés par le Conseil Étudiant HE2B",
}

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

// Fonction pour formater la date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("fr-FR", {
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
const getCategoryBadge = (category: Event['category']) => {
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

  // Filtrer seulement les événements publiés
  const publishedEvents = events.filter(event => event.status === 'PUBLISHED')

  return (
      <div className="relative">
        <ParallaxBackground />

        <div className="container py-12 md:py-20">
          <div className="max-w-4xl mx-auto mb-16">
            <LuxuryHeading as="h1" className="text-4xl md:text-5xl mb-6">
              Nos événements
            </LuxuryHeading>
            <p className="text-xl text-muted-foreground">
              Découvrez les événements organisés par le Conseil Étudiant HE2B tout au long de l'année académique. Des
              soirées festives aux conférences enrichissantes, il y en a pour tous les goûts !
            </p>
          </div>

          {publishedEvents.length === 0 ? (
              <div className="text-center py-16">
                <Calendar className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground mb-4">
                  Aucun événement disponible pour le moment.
                </p>
                <p className="text-muted-foreground">
                  Revenez bientôt pour découvrir nos prochains événements !
                </p>
              </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {publishedEvents.map((event) => (
                    <LuxuryCard key={event.id} className="h-full flex flex-col">
                      <div className="relative aspect-video overflow-hidden rounded-t-lg">
                        <Image
                            src={event.image || "/placeholder.svg?height=400&width=600"}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          {getCategoryBadge(event.category)}
                        </div>
                        {event.featured && (
                            <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        ⭐ À la une
                      </span>
                            </div>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="gold-text">{event.title}</CardTitle>
                        <p className="text-muted-foreground">{event.description}</p>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-2 h-4 w-4 text-primary" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="mr-2 h-4 w-4 text-primary" />
                            <span>{formatTime(event.time)}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="mr-2 h-4 w-4 text-primary" />
                            <span>{event.location}</span>
                          </div>
                          {event.organizer && (
                              <div className="flex items-center text-sm">
                                <User className="mr-2 h-4 w-4 text-primary" />
                                <span>{event.organizer}</span>
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
                          <Link href={`/events/${event.slug}`}>En savoir plus</Link>
                        </LuxuryButton>
                        {event.externalLink && (
                            <LuxuryButton
                                asChild
                                variant="gold"
                                size="sm"
                                className="px-3"
                            >
                              <a
                                  href={event.externalLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Lien externe"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </LuxuryButton>
                        )}
                      </CardFooter>
                    </LuxuryCard>
                ))}
              </div>
          )}

          <div className="bg-muted/30 rounded-lg p-8 animated-border">
            <LuxuryHeading as="h2" className="text-2xl font-bold mb-4">
              Proposer un événement
            </LuxuryHeading>
            <p className="mb-4">
              Vous avez une idée d'événement que vous aimeriez voir organisé par le Conseil Étudiant ? N'hésitez pas à
              nous en faire part ! Nous sommes toujours à la recherche de nouvelles idées pour animer la vie étudiante.
            </p>
            <Link href="/contact">
              <LuxuryButton>Nous contacter</LuxuryButton>
            </Link>
          </div>
        </div>
      </div>
  )
}