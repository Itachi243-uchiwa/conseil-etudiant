import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, Eye, ThumbsUp, Play } from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"
import { LuxuryHeading } from "@/components/ui/luxury-heading"
import { LuxuryButton } from "@/components/ui/luxury-button"

export const metadata: Metadata = {
  title: "Vlog | Conseil Étudiant HE2B",
  description: "Découvrez les vlogs et récapitulatifs d'événements du Conseil Étudiant HE2B",
}

// Données fictives pour les vlogs
const vlogData = [
  {
    id: 1,
    title: "Bal HE2B 2024 - Aftermovie",
    description: "Revivez les meilleurs moments du Bal HE2B 2024 qui s'est déroulé au Musée de Bruxelles.",
    date: "15 avril 2024",
    duration: "5:24",
    views: "1.2K",
    likes: "342",
    thumbnail: "/placeholder.svg?height=400&width=600&text=Bal+HE2B+2024",
    category: "evenements",
    featured: true,
  },
  {
    id: 2,
    title: "Une journée à l'ISIB",
    description: "Découvrez le quotidien des étudiants à l'Institut Supérieur Industriel de Bruxelles.",
    date: "22 mars 2024",
    duration: "8:15",
    views: "876",
    likes: "215",
    thumbnail: "/placeholder.svg?height=400&width=600&text=Journée+ISIB",
    category: "campus",
  },
  {
    id: 3,
    title: "Semaine d'intégration 2024",
    description: "Retour sur la semaine d'intégration des nouveaux étudiants de la HE2B.",
    date: "10 octobre 2024",
    duration: "12:38",
    views: "1.5K",
    likes: "423",
    thumbnail: "/placeholder.svg?height=400&width=600&text=Semaine+Intégration",
    category: "evenements",
    featured: true,
  },
  {
    id: 4,
    title: "Interview avec le président du CE",
    description: "Rencontre avec Marie Dupont, présidente du Conseil Étudiant HE2B.",
    date: "5 février 2024",
    duration: "15:42",
    views: "932",
    likes: "287",
    thumbnail: "/placeholder.svg?height=400&width=600&text=Interview+Président",
    category: "interviews",
  },
  {
    id: 5,
    title: "Tournoi sportif inter-campus",
    description: "Les moments forts du tournoi sportif qui a réuni tous les campus de la HE2B.",
    date: "18 mai 2024",
    duration: "7:53",
    views: "1.1K",
    likes: "356",
    thumbnail: "/placeholder.svg?height=400&width=600&text=Tournoi+Sportif",
    category: "evenements",
  },
  {
    id: 6,
    title: "Visite du campus Defré",
    description: "Découvrez le campus Defré et ses installations à travers ce vlog.",
    date: "12 janvier 2024",
    duration: "9:27",
    views: "754",
    likes: "198",
    thumbnail: "/placeholder.svg?height=400&width=600&text=Campus+Defré",
    category: "campus",
  },
]

export default function VlogPage() {
  // Filtrer les vlogs mis en avant
  const featuredVlogs = vlogData.filter((vlog) => vlog.featured)
  const regularVlogs = vlogData.filter((vlog) => !vlog.featured)

  return (
    <div className="relative">
      <ParallaxBackground />

      <div className="container py-12 md:py-20">
        <div className="max-w-4xl mx-auto mb-12">
          <LuxuryHeading as="h1" className="text-4xl md:text-5xl mb-6 text-center">
            CE HE2B TV
          </LuxuryHeading>
          <p className="text-xl text-muted-foreground text-center">
            Découvrez la vie étudiante à la HE2B à travers nos vlogs, interviews et récapitulatifs d'événements.
          </p>
        </div>

        {/* Section vidéo principale */}
        {featuredVlogs.length > 0 && (
          <div className="mb-20">
            <div className="relative aspect-video rounded-xl overflow-hidden group">
              <Image
                src={featuredVlogs[0].thumbnail || "/placeholder.svg"}
                alt={featuredVlogs[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="flex items-center space-x-2 text-white/80 text-sm mb-3">
                  <span className="bg-primary/80 text-white px-3 py-1 rounded-full">À la une</span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {featuredVlogs[0].duration}
                  </span>
                  <span className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {featuredVlogs[0].views}
                  </span>
                </div>

                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">{featuredVlogs[0].title}</h2>
                <p className="text-white/90 text-lg mb-6 max-w-3xl">{featuredVlogs[0].description}</p>

                <div className="flex flex-wrap gap-4">
                  <LuxuryButton asChild size="lg" className="group">
                    <Link href={`/vlog/${featuredVlogs[0].id}`}>
                      <Play className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
                      Regarder maintenant
                    </Link>
                  </LuxuryButton>

                  <Button
                    asChild
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  >
                    <Link href="/vlog/categories/evenements">Plus de vidéos d'événements</Link>
                  </Button>
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-20 h-20 rounded-full bg-primary/80 flex items-center justify-center backdrop-blur-sm">
                  <Play className="h-10 w-10 text-white" fill="white" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grille de vidéos récentes */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <LuxuryHeading as="h2" className="text-2xl font-bold">
              Vidéos récentes
            </LuxuryHeading>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="hidden md:flex">
                Tous
              </Button>
              <Button variant="outline" size="sm" className="hidden md:flex">
                Événements
              </Button>
              <Button variant="outline" size="sm" className="hidden md:flex">
                Campus
              </Button>
              <Button variant="outline" size="sm" className="hidden md:flex">
                Interviews
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularVlogs.map((vlog) => (
              <Link href={`/vlog/${vlog.id}`} key={vlog.id} className="group">
                <div className="rounded-xl overflow-hidden bg-card transition-all duration-300 hover:shadow-lg group-hover:transform group-hover:scale-[1.02]">
                  <div className="relative aspect-video">
                    <Image
                      src={vlog.thumbnail || "/placeholder.svg"}
                      alt={vlog.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-md text-sm flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {vlog.duration}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center backdrop-blur-sm">
                        <Play className="h-6 w-6 text-white" fill="white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                      {vlog.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{vlog.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <CalendarDays className="h-3 w-3 mr-1" />
                        {vlog.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center text-xs text-muted-foreground">
                          <Eye className="h-3 w-3 mr-1" />
                          {vlog.views}
                        </span>
                        <span className="flex items-center text-xs text-muted-foreground">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {vlog.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section catégories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "Événements",
              image: "/placeholder.svg?height=300&width=500&text=Événements",
              href: "/vlog/categories/evenements",
            },
            {
              title: "Campus",
              image: "/placeholder.svg?height=300&width=500&text=Campus",
              href: "/vlog/categories/campus",
            },
            {
              title: "Interviews",
              image: "/placeholder.svg?height=300&width=500&text=Interviews",
              href: "/vlog/categories/interviews",
            },
          ].map((category, index) => (
            <Link href={category.href} key={index} className="group">
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Appel à l'action */}
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/placeholder.svg?height=400&width=1200&text=Proposer+un+vlog"
              alt="Proposer un vlog"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 mix-blend-multiply"></div>
          </div>

          <div className="relative z-10 p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Vous avez une idée de vlog ?</h2>
            <p className="mb-6 max-w-2xl mx-auto text-white/90">
              Vous souhaitez partager votre expérience à la HE2B ou proposer un sujet de vlog ? Nous sommes toujours à
              la recherche de nouvelles idées et de nouveaux talents !
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link href="/contact">Proposer un vlog</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
