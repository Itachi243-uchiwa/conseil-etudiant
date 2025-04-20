import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LuxuryButton } from "@/components/ui/luxury-button"
import { Calendar, Clock, MapPin } from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"
import { LuxuryHeading } from "@/components/ui/luxury-heading" // Importation corrigée
import LuxuryCard from "@/components/ui/luxury-card"

export const metadata: Metadata = {
  title: "Événements | Conseil Étudiant HE2B",
  description: "Découvrez les événements organisés par le Conseil Étudiant HE2B",
}

const events = [
  {
    id: 1,
    title: "Bal HE2B 2025",
    description: "Une nuit au Musée - Le bal annuel de la HE2B",
    longDescription:
      "Le bal annuel de la HE2B est l'événement incontournable de l'année académique. Cette année, nous vous proposons une soirée exceptionnelle sur le thème 'Une nuit au Musée'. Venez danser et vous amuser dans un cadre prestigieux, avec DJ et groupe live.",
    date: "4 avril 2025",
    time: "22:00",
    location: "Musée de Bruxelles",
    image: "/placeholder.svg?height=400&width=600",
    href: "/events/bal-2025",
  },
  {
    id: 2,
    title: "Journée d'accueil",
    description: "Bienvenue aux nouveaux étudiants de la HE2B",
    longDescription:
      "La journée d'accueil est l'occasion pour les nouveaux étudiants de découvrir la HE2B, ses campus, ses services et ses associations. Au programme : présentations, visites guidées, rencontres avec les professeurs et les étudiants, et bien sûr, un moment convivial pour faire connaissance.",
    date: "15 septembre 2025",
    time: "10:00",
    location: "Campus HE2B",
    image: "/placeholder.svg?height=400&width=600",
    href: "/events/journee-accueil",
  },
  {
    id: 3,
    title: "Conférence sur l'avenir professionnel",
    description: "Rencontrez des professionnels de votre domaine",
    longDescription:
      "Cette conférence vous permettra de rencontrer des professionnels de votre domaine d'études et d'échanger avec eux sur les perspectives d'avenir et les opportunités de carrière. Un moment privilégié pour poser toutes vos questions et commencer à construire votre réseau professionnel.",
    date: "10 octobre 2025",
    time: "14:00",
    location: "Auditorium HE2B",
    image: "/placeholder.svg?height=400&width=600",
    href: "/events/conference-avenir",
  },
  {
    id: 4,
    title: "Soirée d'intégration",
    description: "Rencontrez vos camarades de promotion",
    longDescription:
      "La soirée d'intégration est l'occasion de rencontrer vos camarades de promotion dans un cadre détendu et convivial. Au programme : jeux, musique, et bonne humeur. Un moment essentiel pour créer des liens qui vous accompagneront tout au long de votre parcours académique.",
    date: "25 septembre 2025",
    time: "19:00",
    location: "Bar Le Tavernier",
    image: "/placeholder.svg?height=400&width=600",
    href: "/events/soiree-integration",
  },
  {
    id: 5,
    title: "Semaine culturelle",
    description: "Une semaine dédiée à la culture et aux arts",
    longDescription:
      "La semaine culturelle est un événement annuel qui met à l'honneur la culture et les arts. Au programme : expositions, concerts, projections de films, ateliers créatifs et bien plus encore. Une occasion unique de découvrir de nouveaux horizons et de partager vos passions.",
    date: "15-20 novembre 2025",
    time: "Toute la journée",
    location: "Campus HE2B",
    image: "/placeholder.svg?height=400&width=600",
    href: "/events/semaine-culturelle",
  },
  {
    id: 6,
    title: "Tournoi sportif inter-campus",
    description: "Compétition sportive entre les différents campus de la HE2B",
    longDescription:
      "Le tournoi sportif inter-campus est l'occasion pour les étudiants des différents campus de la HE2B de se rencontrer et de s'affronter dans une compétition amicale. Au programme : football, basketball, volleyball, tennis de table et bien d'autres sports. Venez supporter votre campus !",
    date: "5 mai 2025",
    time: "9:00",
    location: "Complexe sportif de la HE2B",
    image: "/placeholder.svg?height=400&width=600",
    href: "/events/tournoi-sportif",
  },
]

export default function EventsPage() {
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
          <div className="mt-6 flex justify-center">
            <LuxuryButton asChild variant="gold">
              <Link href="/events/calendar">Voir le calendrier des événements</Link>
            </LuxuryButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {events.map((event) => (
            <LuxuryCard key={event.id} className="h-full flex flex-col">
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="gold-text">{event.title}</CardTitle>
                <p className="text-muted-foreground">{event.description}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">{event.longDescription.substring(0, 150)}...</p>
              </CardContent>
              <CardFooter>
                <LuxuryButton asChild variant="outline" className="border-primary/30 hover:border-primary/60">
                  <Link href={event.href}>En savoir plus</Link>
                </LuxuryButton>
              </CardFooter>
            </LuxuryCard>
          ))}
        </div>

        <div className="bg-muted/30 rounded-lg p-8 animated-border">
          <LuxuryHeading as="h2" className="text-2xl font-bold mb-4">
            Proposer un événement
          </LuxuryHeading>
          <p className="mb-4">
            Vous avez une idée d'événement que vous aimeriez voir organisé par le Conseil Étudiant ? N'hésitez pas à
            nous en faire part ! Nous sommes toujours à la recherche de nouvelles idées pour animer la vie étudiante.
          </p>
          <LuxuryButton asChild>
            <Link href="/contact">Nous contacter</Link>
          </LuxuryButton>
        </div>
      </div>
    </div>
  )
}
