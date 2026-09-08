import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { LuxuryButton } from "@/components/ui/luxury-button"
import { Calendar, Clock, MapPin, User, ExternalLink, ArrowLeft, Share2, Heart, Tag } from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"
import { LuxuryHeading } from "@/components/ui/luxury-heading"
import LuxuryCard from "@/components/ui/luxury-card"
import CalendarActions from "@/components/ui/calendar-actions"
import { getEventBySlug, getEvents } from "@/lib/api"

export const revalidate = 60

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

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const events = await getEvents() || []
    return events.map((e: any) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const event = await getEventBySlug(slug)
    if (!event) return { title: "Événement non trouvé | Conseil Étudiant HE2B" }
    return {
        title: `${event.title} | Conseil Étudiant HE2B`,
        description: event.description,
        openGraph: { title: event.title, description: event.description, images: event.image ? [event.image] : [] },
    }
}

const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })

const formatTime = (t?: string) => (t ? t.slice(0, 5) : "Non précisé")

const isEventPast = (dateString: string, time?: string) => {
    const d = new Date(dateString)
    if (time) { const [h, m] = time.split(":").map(Number); d.setHours(h, m) }
    return d < new Date()
}

const CATEGORY_MAP = {
    ACADEMIC:     { label: "Académique",    color: "bg-blue-100 text-blue-800 border-blue-200",       icon: "🎓" },
    SOCIAL:       { label: "Social",        color: "bg-green-100 text-green-800 border-green-200",     icon: "🎉" },
    CULTURAL:     { label: "Culturel",      color: "bg-purple-100 text-purple-800 border-purple-200",  icon: "🎨" },
    SPORTS:       { label: "Sport",         color: "bg-orange-100 text-orange-800 border-orange-200",  icon: "⚽" },
    PROFESSIONAL: { label: "Professionnel", color: "bg-indigo-100 text-indigo-800 border-indigo-200",  icon: "💼" },
    OTHER:        { label: "Autre",         color: "bg-gray-100 text-gray-800 border-gray-200",        icon: "📋" },
} as const

export default async function EventDetailPage({ params }: Props) {
    const { slug } = await params
    const event: Event | null = await getEventBySlug(slug)

    if (!event || event.status !== "PUBLISHED") notFound()

    const categoryInfo = CATEGORY_MAP[event.category] ?? CATEGORY_MAP.OTHER
    const isPast = isEventPast(event.date, event.time)

    return (
        <div className="relative">
            <ParallaxBackground />

            <div className="container py-12 md:py-20">
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
                            {event.image && (
                                <div className="relative aspect-video overflow-hidden">
                                    <Image src={event.image} alt={event.title} fill className="object-cover" priority />
                                    <div className="absolute inset-0 bg-black/20" />
                                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
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
                                <LuxuryHeading as="h1" className="text-3xl md:text-4xl mb-4">
                                    {event.title}
                                </LuxuryHeading>

                                <p className="text-xl text-muted-foreground mb-8">{event.description}</p>

                                {event.longDescription && (
                                    <div className="prose prose-lg max-w-none mb-8">
                                        <div className="text-foreground leading-relaxed">
                                            {event.longDescription.split("\n").map((p, i) => (
                                                <p key={i} className="mb-4">{p}</p>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-4 pt-6 border-t">
                                    {event.externalLink && (
                                        <LuxuryButton asChild className="mobile-touch">
                                            <a href={event.externalLink} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                {isPast ? "Voir les détails" : "S'inscrire / Plus d'infos"}
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

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            <LuxuryCard className="p-6">
                                <h3 className="font-bold text-lg mb-4 gold-text">Informations pratiques</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium">Date</p>
                                            <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium">Heure</p>
                                            <p className="text-sm text-muted-foreground">{formatTime(event.time)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium">Lieu</p>
                                            <p className="text-sm text-muted-foreground">{event.location}</p>
                                        </div>
                                    </div>
                                    {event.organizer && (
                                        <div className="flex items-start gap-3">
                                            <User className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium">Organisateur</p>
                                                <p className="text-sm text-muted-foreground">{event.organizer}</p>
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

                            <LuxuryCard className="p-6">
                                <h3 className="font-bold text-lg mb-4 gold-text">Ajouter au calendrier</h3>
                                <CalendarActions
                                    title={event.title}
                                    description={event.description}
                                    location={event.location}
                                    date={event.date}
                                    time={event.time}
                                    slug={event.slug}
                                />
                            </LuxuryCard>

                            <LuxuryCard className="p-6">
                                <h3 className="font-bold text-lg mb-4 gold-text">Une question ?</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Contactez-nous pour plus d&apos;informations sur cet événement.
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
