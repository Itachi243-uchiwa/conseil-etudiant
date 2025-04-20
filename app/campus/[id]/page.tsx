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

// Données des campus
const campusData = {
  defre: {
    id: "defre",
    name: "Defré",
    fullName: "Campus Defré",
    description: "Campus spécialisé dans la formation des enseignants et des éducateurs.",
    longDescription:
      "Le campus Defré est situé à Uccle et abrite principalement la catégorie pédagogique de la HE2B. Il forme les futurs enseignants et éducateurs dans un cadre verdoyant et propice à l'apprentissage.",
    address: "Avenue Defré 62, 1180 Uccle",
    phone: "+32 2 504 09 40",
    email: "info.defre@he2b.be",
    website: "https://www.he2b.be/campus-defre",
    color: "#3F3290", // Violet Profond
    image: "/placeholder.svg?height=600&width=1200&text=Campus+Defré",
    sections: ["Instituteur primaire", "Instituteur préscolaire", "Éducateur spécialisé", "AESI"],
    facilities: ["Bibliothèque", "Cafétéria", "Espaces verts", "Salles informatiques", "Auditoires"],
    events: [
      {
        title: "Journée portes ouvertes",
        date: "15 mars 2025",
        time: "10:00 - 16:00",
        location: "Campus Defré",
      },
      {
        title: "Conférence pédagogique",
        date: "22 avril 2025",
        time: "14:00 - 17:00",
        location: "Auditoire principal",
      },
    ],
    team: [
      {
        name: "Sophie Martin",
        role: "Représentante Defré",
        image: "/placeholder.svg?height=200&width=200&text=Sophie+M",
        email: "sophie.martin@cehe2b.be",
        phone: "+32 123 45 67 91",
      },
      {
        name: "Thomas Dubois",
        role: "Délégué section primaire",
        image: "/placeholder.svg?height=200&width=200&text=Thomas+D",
        email: "thomas.dubois@cehe2b.be",
        phone: "+32 123 45 67 92",
      },
      {
        name: "Julie Leroy",
        role: "Déléguée section préscolaire",
        image: "/placeholder.svg?height=200&width=200&text=Julie+L",
        email: "julie.leroy@cehe2b.be",
        phone: "+32 123 45 67 93",
      },
    ],
  },
  esi: {
    id: "esi",
    name: "ESI",
    fullName: "École Supérieure d'Informatique",
    description: "École Supérieure d'Informatique, formant les futurs professionnels de l'IT.",
    longDescription:
      "L'École Supérieure d'Informatique (ESI) est située en plein cœur de Bruxelles. Elle forme des professionnels de l'informatique dans divers domaines tels que le développement, les réseaux, la sécurité et l'intelligence artificielle.",
    address: "Rue Royale 67, 1000 Bruxelles",
    phone: "+32 2 219 15 46",
    email: "info.esi@he2b.be",
    website: "https://www.he2b.be/esi",
    color: "#3F3290", // Violet Profond
    image: "/placeholder.svg?height=600&width=1200&text=ESI",
    sections: [
      "Informatique de gestion",
      "Informatique industrielle",
      "Sécurité des systèmes",
      "Réseaux et télécommunications",
    ],
    facilities: ["Laboratoires informatiques", "Bibliothèque spécialisée", "Cafétéria", "Espaces de coworking"],
    events: [
      {
        title: "Hackathon ESI",
        date: "10 mai 2025",
        time: "09:00 - 23:00",
        location: "Campus ESI",
      },
      {
        title: "Conférence sur l'IA",
        date: "15 juin 2025",
        time: "18:00 - 20:00",
        location: "Auditoire principal",
      },
    ],
    team: [
      {
        name: "Maxime Dubois",
        role: "Représentant ESI",
        image: "/placeholder.svg?height=200&width=200&text=Maxime+D",
        email: "maxime.dubois@cehe2b.be",
        phone: "+32 123 45 67 94",
      },
      {
        name: "Emma Leroy",
        role: "Déléguée section réseaux",
        image: "/placeholder.svg?height=200&width=200&text=Emma+L",
        email: "emma.leroy@cehe2b.be",
        phone: "+32 123 45 67 93",
      },
    ],
  },
  nivelles: {
    id: "nivelles",
    name: "Nivelles",
    fullName: "Campus de Nivelles",
    description: "Campus proposant des formations en pédagogie et en économie.",
    longDescription:
      "Le campus de Nivelles est situé dans le Brabant wallon et propose des formations en pédagogie et en économie. Il offre un cadre d'études agréable et facilement accessible.",
    address: "Rue Emile Vandervelde 3, 1400 Nivelles",
    phone: "+32 67 21 31 14",
    email: "info.nivelles@he2b.be",
    website: "https://www.he2b.be/campus-nivelles",
    color: "#F0F3FD", // Blanc Bleuté
    image: "/placeholder.svg?height=600&width=1200&text=Campus+Nivelles",
    sections: ["Instituteur primaire", "Instituteur préscolaire", "Gestion", "Marketing"],
    facilities: ["Bibliothèque", "Cafétéria", "Espaces verts", "Salles informatiques"],
    events: [
      {
        title: "Journée portes ouvertes",
        date: "22 mars 2025",
        time: "10:00 - 16:00",
        location: "Campus Nivelles",
      },
    ],
    team: [
      {
        name: "Lucas Petit",
        role: "Représentant Nivelles",
        image: "/placeholder.svg?height=200&width=200&text=Lucas+P",
        email: "lucas.petit@cehe2b.be",
        phone: "+32 123 45 67 92",
      },
    ],
  },
  isib: {
    id: "isib",
    name: "ISIB",
    fullName: "Institut Supérieur Industriel de Bruxelles",
    description: "Institut Supérieur Industriel de Bruxelles, spécialisé dans l'ingénierie.",
    longDescription:
      "L'Institut Supérieur Industriel de Bruxelles (ISIB) forme des ingénieurs industriels dans divers domaines tels que l'électronique, l'informatique, la chimie et la mécanique.",
    address: "Rue Royale 150, 1000 Bruxelles",
    phone: "+32 2 227 35 10",
    email: "info.isib@he2b.be",
    website: "https://www.he2b.be/isib",
    color: "#FF4E6A", // Rose Framboise
    image: "/placeholder.svg?height=600&width=1200&text=ISIB",
    sections: ["Électronique", "Informatique", "Chimie", "Mécanique"],
    facilities: ["Laboratoires", "Bibliothèque spécialisée", "Cafétéria", "Ateliers"],
    events: [
      {
        title: "Salon de l'ingénieur",
        date: "5 avril 2025",
        time: "10:00 - 18:00",
        location: "Campus ISIB",
      },
    ],
    team: [
      {
        name: "Marie Dupont",
        role: "Représentante ISIB",
        image: "/placeholder.svg?height=200&width=200&text=Marie+D",
        email: "marie.dupont@cehe2b.be",
        phone: "+32 123 45 67 89",
      },
      {
        name: "Thomas Lambert",
        role: "Délégué section électronique",
        image: "/placeholder.svg?height=200&width=200&text=Thomas+L",
        email: "thomas.lambert@cehe2b.be",
        phone: "+32 123 45 67 90",
      },
    ],
  },
  ises: {
    id: "ises",
    name: "ISES",
    fullName: "Institut Supérieur d'Études Sociales",
    description: "Institut Supérieur d'Études Sociales, formant aux métiers du social.",
    longDescription:
      "L'Institut Supérieur d'Études Sociales (ISES) forme des professionnels du secteur social, capables d'intervenir dans des contextes variés et de répondre aux besoins des personnes en difficulté.",
    address: "Avenue Émile Gryzon 1, 1070 Anderlecht",
    phone: "+32 2 526 73 00",
    email: "info.ises@he2b.be",
    website: "https://www.he2b.be/ises",
    color: "#00BFA2", // Turquoise
    image: "/placeholder.svg?height=600&width=1200&text=ISES",
    sections: ["Assistant social", "Éducateur spécialisé", "Conseiller social"],
    facilities: ["Bibliothèque", "Cafétéria", "Salles de cours", "Espaces de détente"],
    events: [
      {
        title: "Conférence sur l'aide sociale",
        date: "12 mai 2025",
        time: "14:00 - 17:00",
        location: "Campus ISES",
      },
    ],
    team: [
      {
        name: "Julie Lefèvre",
        role: "Représentante ISES",
        image: "/placeholder.svg?height=200&width=200&text=Julie+L",
        email: "julie.lefevre@cehe2b.be",
        phone: "+32 123 45 67 95",
      },
    ],
  },
  isek: {
    id: "isek",
    name: "ISEK",
    fullName: "Institut Supérieur d'Éducation Physique et de Kinésithérapie",
    description: "Institut Supérieur d'Éducation Physique et de Kinésithérapie.",
    longDescription:
      "L'Institut Supérieur d'Éducation Physique et de Kinésithérapie (ISEK) forme des professionnels de la santé et du sport, capables d'intervenir dans la prévention, le traitement et la réadaptation.",
    address: "Avenue Émile Gryzon 1, 1070 Anderlecht",
    phone: "+32 2 526 73 00",
    email: "info.isek@he2b.be",
    website: "https://www.he2b.be/isek",
    color: "#FFA726", // Orange
    image: "/placeholder.svg?height=600&width=1200&text=ISEK",
    sections: ["Kinésithérapie", "Éducation physique", "Psychomotricité"],
    facilities: ["Salles de sport", "Laboratoires", "Bibliothèque spécialisée", "Cafétéria"],
    events: [
      {
        title: "Journée du sport",
        date: "20 mai 2025",
        time: "09:00 - 17:00",
        location: "Campus ISEK",
      },
    ],
    team: [
      {
        name: "Nicolas Durand",
        role: "Représentant ISEK",
        image: "/placeholder.svg?height=200&width=200&text=Nicolas+D",
        email: "nicolas.durand@cehe2b.be",
        phone: "+32 123 45 67 96",
      },
    ],
  },
  iessid: {
    id: "iessid",
    name: "IESSID",
    fullName: "Institut d'Enseignement Supérieur Social, de l'Information et de la Documentation",
    description: "Institut d'Enseignement Supérieur Social, de l'Information et de la Documentation.",
    longDescription:
      "L'Institut d'Enseignement Supérieur Social, de l'Information et de la Documentation (IESSID) forme des professionnels de l'information, de la documentation et du secteur social.",
    address: "Rue de l'Abbaye 26, 1050 Ixelles",
    phone: "+32 2 629 04 00",
    email: "info.iessid@he2b.be",
    website: "https://www.he2b.be/iessid",
    color: "#7E57C2", // Violet clair
    image: "/placeholder.svg?height=600&width=1200&text=IESSID",
    sections: ["Bibliothécaire-documentaliste", "Assistant social"],
    facilities: ["Bibliothèque", "Centre de documentation", "Cafétéria", "Salles informatiques"],
    events: [
      {
        title: "Salon du livre",
        date: "25 avril 2025",
        time: "10:00 - 18:00",
        location: "Campus IESSID",
      },
    ],
    team: [
      {
        name: "Emma Leroy",
        role: "Représentante IESSID",
        image: "/placeholder.svg?height=200&width=200&text=Emma+L",
        email: "emma.leroy@cehe2b.be",
        phone: "+32 123 45 67 93",
      },
    ],
  },
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const campus = campusData[params.id as keyof typeof campusData]

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

export default function CampusDetailPage({ params }: { params: { id: string } }) {
  const campus = campusData[params.id as keyof typeof campusData]

  if (!campus) {
    notFound()
  }

  return (
    <div className="relative">
      <ParallaxBackground />

      <div className="container py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <CampusLogo campus={campus.id as any} className="w-40 h-40 md:w-48 md:h-48" />

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
                  {campus.sections.map((section) => (
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
                  {campus.facilities.map((facility) => (
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

            <Card>
              <CardContent className="p-6">
                <LuxuryHeading as="h2" className="text-xl font-bold mb-4">
                  Événements à venir
                </LuxuryHeading>

                <div className="space-y-4">
                  {campus.events.map((event, index) => (
                    <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <LuxuryHeading as="h2" className="text-3xl font-bold mb-8 text-center">
            Équipe du Conseil Étudiant
          </LuxuryHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campus.team.map((member) => (
              <Card key={member.name} className="tilt-on-hover card-shine">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-primary/30">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>

                  <h3 className="text-xl font-bold mb-1 gold-text">{member.name}</h3>
                  <p className="text-primary mb-4">{member.role}</p>

                  <div className="flex justify-center space-x-2 w-full">
                    <Button asChild variant="outline" size="sm" className="rounded-full">
                      <a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`}>
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>

                    <Button asChild variant="outline" size="sm" className="rounded-full">
                      <a href={`tel:${member.phone}`} aria-label={`Appeler ${member.name}`}>
                        <Phone className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
