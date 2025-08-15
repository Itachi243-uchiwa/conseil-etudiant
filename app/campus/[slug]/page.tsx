import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, ExternalLink, Calendar, Clock } from "lucide-react"
import CampusLogo from "@/components/ui/campus-logo"
import ParallaxBackground from "@/components/ui/parallax-background"
import { LuxuryHeading } from "@/components/ui/luxury-heading"
import { LuxuryButton } from "@/components/ui/luxury-button"
import {getCampusBySlug, getTeamMembers, getTeamMembersByCampusSlug} from "@/lib/api"

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
  console.log(getTeamMembersByCampusSlug(slug))


  console.log("Team members:", teamMembers)

  if (!campus) {
    notFound()
  }

  return (
      <div className="relative">
        <ParallaxBackground />

        <div className="container py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">

            <div>
              <LuxuryHeading as="h1" className="text-4xl md:text-5xl mb-4">
                {campus.fullName}
              </LuxuryHeading>
              <p className="text-xl text-muted-foreground mb-6">{campus.description}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <LuxuryButton asChild>
                  <Link href={campus.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Site officiel
                  </Link>
                </LuxuryButton>

                <Button asChild variant="outline">
                  <Link href={`mailto:${campus.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Contacter
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
                <Image src={campus.image || "/placeholder.svg"} alt={campus.fullName} fill className="object-cover" />
              </div>

              <div className="space-y-8">
                <div>
                  <LuxuryHeading as="h2" className="text-2xl font-bold mb-4">
                    À propos du campus
                  </LuxuryHeading>
                  <p className="text-muted-foreground">{campus.longDescription}</p>
                </div>

                <div>
                  <LuxuryHeading as="h2" className="text-2xl font-bold mb-4">
                    Sections
                  </LuxuryHeading>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {campus.sections?.map((section) => (
                        <li key={section} className="flex items-center">
                          <span className="text-primary mr-2">•</span>
                          {section}
                        </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <LuxuryHeading as="h2" className="text-2xl font-bold mb-4">
                    Infrastructures
                  </LuxuryHeading>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {campus.facilities?.map((facility) => (
                        <li key={facility} className="flex items-center">
                          <span className="text-primary mr-2">•</span>
                          {facility}
                        </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <Card className="mb-8">
                <CardContent className="p-6">
                  <LuxuryHeading as="h2" className="text-xl font-bold mb-4">
                    Informations pratiques
                  </LuxuryHeading>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">Adresse</h3>
                        <p className="text-muted-foreground">{campus.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">Téléphone</h3>
                        <p className="text-muted-foreground">{campus.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-muted-foreground">{campus.email}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <LuxuryHeading as="h2" className="text-3xl font-bold mb-8 text-center">
              Équipe du Conseil Étudiant
            </LuxuryHeading>

            {teamMembers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamMembers.map((member) => (
                      <Card key={member.name} className="tilt-on-hover card-shine">
                        <CardContent className="p-6 flex flex-col items-center">
                          <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-primary/30">
                            <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                          </div>

                          <h3 className="text-xl font-bold mb-1 gold-text">{member.name}</h3>
                          <p className="text-primary mb-4">{member.role}</p>

                          <div className="flex justify-center space-x-2 w-full">
                            <Button asChild variant="outline" size="sm" className="rounded-full">
                              <a href={`tel:${member.phone}`} aria-label={`Appeler ${member.name}`}>
                                <Phone className="h-4 w-4" />
                              </a>
                            </Button>
                            <Button asChild variant="outline" size="sm" className="rounded-full">
                              <a href={`mailto:${member.email}`} aria-label={`Envoyer un email à ${member.name}`}>
                                <Mail className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                  ))}
                </div>
            ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Aucun membre de l'équipe trouvé pour ce campus.</p>
                </div>
            )}
          </div>
        </div>
      </div>
  )
}