"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LuxuryButton } from "@/components/ui/luxury-button"
import Link from "next/link"
import { CalendarIcon, Clock, MapPin } from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"
import LuxuryHeading from "@/components/ui/luxury-heading"
import LuxuryCard from "@/components/ui/luxury-card"

// Événements fictifs pour l'exemple
const events = [
  {
    id: 1,
    title: "Bal HE2B 2025",
    description: "Une nuit au Musée - Le bal annuel de la HE2B",
    date: new Date(2025, 3, 4), // 4 avril 2025
    time: "22:00",
    location: "Musée de Bruxelles",
    href: "/events/bal-2025",
  },
  {
    id: 2,
    title: "Journée d'accueil",
    description: "Bienvenue aux nouveaux étudiants de la HE2B",
    date: new Date(2025, 8, 15), // 15 septembre 2025
    time: "10:00",
    location: "Campus HE2B",
    href: "/events/journee-accueil",
  },
  {
    id: 3,
    title: "Conférence sur l'avenir professionnel",
    description: "Rencontrez des professionnels de votre domaine",
    date: new Date(2025, 9, 10), // 10 octobre 2025
    time: "14:00",
    location: "Auditorium HE2B",
    href: "/events/conference-avenir",
  },
  {
    id: 4,
    title: "Soirée d'intégration",
    description: "Rencontrez vos camarades de promotion",
    date: new Date(2025, 8, 25), // 25 septembre 2025
    time: "19:00",
    location: "Bar Le Tavernier",
    href: "/events/soiree-integration",
  },
  {
    id: 5,
    title: "Semaine culturelle",
    description: "Une semaine dédiée à la culture et aux arts",
    date: new Date(2025, 10, 15), // 15 novembre 2025
    time: "Toute la journée",
    location: "Campus HE2B",
    href: "/events/semaine-culturelle",
  },
  {
    id: 6,
    title: "Tournoi sportif inter-campus",
    description: "Compétition sportive entre les différents campus de la HE2B",
    date: new Date(2025, 4, 5), // 5 mai 2025
    time: "9:00",
    location: "Complexe sportif de la HE2B",
    href: "/events/tournoi-sportif",
  },
]

// Fonction pour formater la date
const formatDate = (date: Date) => {
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

// Fonction pour vérifier si un événement est à la date sélectionnée
const isEventOnDate = (event: (typeof events)[0], date: Date) => {
  return (
    event.date.getDate() === date.getDate() &&
    event.date.getMonth() === date.getMonth() &&
    event.date.getFullYear() === date.getFullYear()
  )
}

export default function CalendarClientPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Filtrer les événements pour la date sélectionnée
  const eventsOnSelectedDate = date ? events.filter((event) => isEventOnDate(event, date)) : []

  // Fonction pour mettre en évidence les jours avec des événements
  const isDayWithEvent = (day: Date) => {
    return events.some((event) => isEventOnDate(event, day))
  }

  return (
    <div className="relative">
      <ParallaxBackground />

      <div className="container py-12 md:py-20">
        <div className="max-w-4xl mx-auto mb-16">
          <LuxuryHeading as="h1" className="text-4xl md:text-5xl mb-6">
            Calendrier des événements
          </LuxuryHeading>
          <p className="text-xl text-muted-foreground">
            Consultez le calendrier des événements organisés par le Conseil Étudiant HE2B. Cliquez sur une date pour
            voir les événements prévus ce jour-là.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <LuxuryCard className="p-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                modifiers={{
                  event: (date) => isDayWithEvent(date),
                }}
                modifiersClassNames={{
                  event: "bg-primary/20 text-primary font-bold",
                }}
              />
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Les dates en surbrillance indiquent des événements programmés.
                </p>
              </div>
            </LuxuryCard>
          </div>

          <div className="lg:col-span-2">
            <LuxuryCard className="p-6 h-full">
              <h2 className="text-2xl font-bold mb-6 gold-text">
                {date ? `Événements du ${formatDate(date)}` : "Sélectionnez une date"}
              </h2>

              {eventsOnSelectedDate.length > 0 ? (
                <div className="space-y-6">
                  {eventsOnSelectedDate.map((event) => (
                    <Card key={event.id} className="bg-muted/30 border-primary/20">
                      <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{event.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                            <span>{formatDate(event.date)}</span>
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
                        <div className="mt-4">
                          <LuxuryButton asChild variant="outline" className="border-primary/30 hover:border-primary/60">
                            <Link href={event.href}>En savoir plus</Link>
                          </LuxuryButton>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64">
                  <p className="text-muted-foreground mb-4">Aucun événement prévu à cette date.</p>
                  <LuxuryButton asChild>
                    <Link href="/events">Voir tous les événements</Link>
                  </LuxuryButton>
                </div>
              )}
            </LuxuryCard>
          </div>
        </div>
      </div>
    </div>
  )
}
