import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"
import { LuxuryHeading } from "@/components/ui/luxury-heading"
import { LuxuryButton } from "@/components/ui/luxury-button"
import { getCampusBySlug, getTeamMembersByCampusSlug } from "@/lib/api"

interface EventDto {
    title: string
    date: string
    time: string
    location: string
}

interface CampusDto {
    id: number
    name: string
    slug: string
    fullName: string
    address: string
    description: string
    longDescription: string
    image: string
    color: string
    phone: string
    email: string
    website: string
    sections: string[]
    facilities: string[]
    events: EventDto[]
}

interface TeamMemberDto {
    id: number
    name: string
    role: string
    image: string
    phone: string
    email: string
    campus: number
}

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const campus: CampusDto | null = await getCampusBySlug(slug)

    if (!campus) {
        return {
            title: "Campus non trouvé | Conseil Étudiant HE2B",
        }
    }

    return {
        title: `${campus.fullName} | Conseil Étudiant HE2B`,
        description: campus.description,
    }
}

export default async function CampusDetailPage({ params }: Props) {
    const { slug } = await params
    const campus: CampusDto | null = await getCampusBySlug(slug)

    const teamMembers: TeamMemberDto[] = await getTeamMembersByCampusSlug(slug)

    if (!campus) {
        notFound()
    }

    return (
        <div className="relative">
            <div className="hidden lg:block">
                <ParallaxBackground />
            </div>

            <div className="container pt-20 py-6 md:py-20 px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-8 md:mb-12">
                    <div className="animate-slide-in-bottom">
                        <LuxuryHeading as="h1" className="text-2xl md:text-5xl mb-3 md:mb-4">
                            {campus.fullName}
                        </LuxuryHeading>
                        <p className="text-base md:text-xl text-muted-foreground mb-4 md:mb-6">{campus.description}</p>

                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                            <LuxuryButton asChild className="mobile-touch">
                                <Link href={campus.website} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Site officiel
                                </Link>
                            </LuxuryButton>

                            <Button asChild variant="outline" className="mobile-touch bg-transparent">
                                <Link href={`mailto:${campus.email}`}>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Contacter
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
                    <div className="lg:col-span-2">
                        <div className="relative aspect-video rounded-lg overflow-hidden mb-6 md:mb-8 animate-slide-in-bottom animate-delay-200">
                            <Image src={campus.image || "/placeholder.svg"} alt={campus.fullName} fill className="object-cover" />
                        </div>

                        <div className="space-y-6 md:space-y-8">
                            <div className="animate-slide-in-bottom animate-delay-300">
                                <LuxuryHeading as="h2" className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                                    À propos du campus
                                </LuxuryHeading>
                                <p className="text-muted-foreground text-sm md:text-base">{campus.longDescription}</p>
                            </div>

                            <div className="animate-slide-in-bottom animate-delay-400">
                                <LuxuryHeading as="h2" className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                                    Sections
                                </LuxuryHeading>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {campus.sections?.map((section) => (
                                        <li key={section} className="flex items-center text-sm md:text-base">
                                            <span className="text-primary mr-2">•</span>
                                            {section}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="animate-slide-in-bottom animate-delay-500">
                                <LuxuryHeading as="h2" className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                                    Infrastructures
                                </LuxuryHeading>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {campus.facilities?.map((facility) => (
                                        <li key={facility} className="flex items-center text-sm md:text-base">
                                            <span className="text-primary mr-2">•</span>
                                            {facility}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Card className="mb-6 md:mb-8 mobile-card lg:bg-card animate-slide-in-bottom animate-delay-600">
                            <CardContent className="p-4 md:p-6">
                                <LuxuryHeading as="h2" className="text-lg md:text-xl font-bold mb-3 md:mb-4">
                                    Informations pratiques
                                </LuxuryHeading>

                                <div className="space-y-3 md:space-y-4">
                                    <div className="flex items-start">
                                        <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-medium text-sm md:text-base">Adresse</h3>
                                            <p className="text-muted-foreground text-sm md:text-base">{campus.address}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Phone className="h-4 w-4 md:h-5 md:w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-medium text-sm md:text-base">Téléphone</h3>
                                            <p className="text-muted-foreground text-sm md:text-base">{campus.phone}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Mail className="h-4 w-4 md:h-5 md:w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-medium text-sm md:text-base">Email</h3>
                                            <p className="text-muted-foreground text-sm md:text-base">{campus.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div>
                    <LuxuryHeading
                        as="h2"
                        className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center animate-slide-in-bottom animate-delay-700"
                    >
                        Équipe du Conseil Étudiant
                    </LuxuryHeading>

                    {teamMembers.length > 0 ? (
                        <>
                            <div className="lg:hidden space-y-4">
                                {teamMembers.map((member, index) => (
                                    <div
                                        key={member.name}
                                        className={`mobile-card mobile-touch animate-slide-in-bottom animate-delay-${(index + 8) * 100}`}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0">
                                                <Image
                                                    src={member.image || "/placeholder.svg"}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-base font-bold">{member.name}</h3>
                                                <p className="text-primary text-sm">{member.role}</p>
                                                <div className="flex space-x-2 mt-2">
                                                    <Button
                                                        asChild
                                                        variant="outline"
                                                        size="sm"
                                                        className="mobile-touch rounded-full bg-transparent h-8 w-8 p-0"
                                                    >
                                                        <a href={`tel:${member.phone}`} aria-label={`Appeler ${member.name}`}>
                                                            <Phone className="h-3 w-3" />
                                                        </a>
                                                    </Button>
                                                    <Button
                                                        asChild
                                                        variant="outline"
                                                        size="sm"
                                                        className="mobile-touch rounded-full bg-transparent h-8 w-8 p-0"
                                                    >
                                                        <a href={`mailto:${member.email}`} aria-label={`Envoyer un email à ${member.name}`}>
                                                            <Mail className="h-3 w-3" />
                                                        </a>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {teamMembers.map((member) => (
                                    <Card key={member.name} className="tilt-on-hover card-shine">
                                        <CardContent className="p-6 flex flex-col items-center">
                                            <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-primary/30">
                                                <Image
                                                    src={member.image || "/placeholder.svg"}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            <h3 className="text-xl font-bold mb-1 gold-text">{member.name}</h3>
                                            <p className="text-primary mb-4">{member.role}</p>

                                            <div className="flex justify-center space-x-2 w-full">
                                                <Button asChild variant="outline" size="sm" className="rounded-full bg-transparent">
                                                    <a href={`tel:${member.phone}`} aria-label={`Appeler ${member.name}`}>
                                                        <Phone className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                                <Button asChild variant="outline" size="sm" className="rounded-full bg-transparent">
                                                    <a href={`mailto:${member.email}`} aria-label={`Envoyer un email à ${member.name}`}>
                                                        <Mail className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-6 md:py-8">
                            <p className="text-muted-foreground text-sm md:text-base">
                                Aucun membre de l'équipe trouvé pour ce campus.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
