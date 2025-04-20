"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import OptimizedImage from "@/components/ui/optimized-image"
import { useDeferredData } from "@/hooks/use-deferred-data"
import LoadingFallback from "@/components/ui/loading-fallback"

// Données fictives pour l'état initial
const initialEvents = Array(4).fill({
  id: 0,
  title: "Chargement...",
  description: "Chargement de la description...",
  date: "...",
  time: "...",
  location: "...",
  image: "/placeholder.svg?height=400&width=600",
  href: "#",
})

// Fonction de récupération des données
const fetchEvents = async () => {
  // Simuler un délai de chargement
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Dans un cas réel, cela serait un appel API
  return [
    {
      id: 1,
      title: "Bal HE2B 2025",
      description: "Une nuit au Musée - Le bal annuel de la HE2B",
      date: "4 avril 2025",
      time: "22:00",
      location: "Musée de Bruxelles",
      image: "/placeholder.svg?height=400&width=600&text=Bal+HE2B+2025",
      href: "/events/bal-2025",
    },
    {
      id: 2,
      title: "Journée d'accueil",
      description: "Bienvenue aux nouveaux étudiants de la HE2B",
      date: "15 septembre 2025",
      time: "10:00",
      location: "Campus HE2B",
      image: "/placeholder.svg?height=400&width=600&text=Journée+Accueil",
      href: "/events/journee-accueil",
    },
    {
      id: 3,
      title: "Conférence sur l'avenir professionnel",
      description: "Rencontrez des professionnels de votre domaine",
      date: "10 octobre 2025",
      time: "14:00",
      location: "Auditorium HE2B",
      image: "/placeholder.svg?height=400&width=600&text=Conférence+Avenir",
      href: "/events/conference-avenir",
    },
    {
      id: 4,
      title: "Soirée d'intégration",
      description: "Rencontrez vos camarades de promotion",
      date: "25 septembre 2025",
      time: "19:00",
      location: "Bar Le Tavernier",
      image: "/placeholder.svg?height=400&width=600&text=Soirée+Intégration",
      href: "/events/soiree-integration",
    },
  ]
}

export default function EventsSectionOptimized() {
  const { data: events, isLoading, ref } = useDeferredData(fetchEvents, initialEvents)

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos événements</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez les prochains événements organisés par le Conseil Étudiant HE2B.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          {isLoading ? (
            <LoadingFallback className="h-96" message="Chargement des événements..." />
          ) : (
            <Carousel className="w-full">
              <CarouselContent>
                {events.map((event) => (
                  <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                        <OptimizedImage
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <p className="text-muted-foreground">{event.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild>
                          <Link href={event.href}>En savoir plus</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8">
                <CarouselPrevious className="relative static mr-2" />
                <CarouselNext className="relative static ml-2" />
              </div>
            </Carousel>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button asChild size="lg">
            <Link href="/events">Voir tous les événements</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
