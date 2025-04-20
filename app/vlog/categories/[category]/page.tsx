import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, Eye, ThumbsUp, ArrowLeft, Play } from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"
import { LuxuryHeading } from "@/components/ui/luxury-heading"

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

// Mapping des catégories pour les titres et descriptions
const categoryInfo = {
  evenements: {
    title: "Événements",
    description: "Découvrez les vlogs des événements organisés par le Conseil Étudiant HE2B.",
    image: "/placeholder.svg?height=400&width=1200&text=Événements",
  },
  campus: {
    title: "Campus",
    description: "Explorez les différents campus de la HE2B à travers nos vlogs.",
    image: "/placeholder.svg?height=400&width=1200&text=Campus",
  },
  interviews: {
    title: "Interviews",
    description: "Rencontrez les acteurs de la vie étudiante à travers nos interviews.",
    image: "/placeholder.svg?height=400&width=1200&text=Interviews",
  },
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = params.category as keyof typeof categoryInfo

  if (!categoryInfo[category]) {
    return {
      title: "Catégorie non trouvée | CE HE2B TV",
    }
  }

  return {
    title: `${categoryInfo[category].title} | CE HE2B TV`,
    description: categoryInfo[category].description,
  }
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category as keyof typeof categoryInfo

  if (!categoryInfo[category]) {
    notFound()
  }

  // Filtrer les vlogs par catégorie
  const categoryVlogs = vlogData.filter((vlog) => vlog.category === category)

  return (
    <div className="relative">
      <ParallaxBackground />

      <div className="container py-12 md:py-20">
        <div className="mb-8">
          <Button asChild variant="outline" className="mb-6">
            <Link href="/vlog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux vlogs
            </Link>
          </Button>
        </div>

        {/* En-tête de la catégorie */}
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-12">
          <Image
            src={categoryInfo[category].image || "/placeholder.svg"}
            alt={categoryInfo[category].title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
            <LuxuryHeading as="h1" className="text-4xl md:text-5xl mb-4 text-center text-white">
              {categoryInfo[category].title}
            </LuxuryHeading>
            <p className="text-xl text-white/90 text-center max-w-3xl">{categoryInfo[category].description}</p>
          </div>
        </div>

        {/* Grille de vidéos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categoryVlogs.map((vlog) => (
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

        {/* Pas de résultats */}
        {categoryVlogs.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Aucun vlog dans cette catégorie</h2>
            <p className="text-muted-foreground mb-6">
              Il n'y a pas encore de vlogs dans la catégorie {categoryInfo[category].title}.
            </p>
            <Button asChild>
              <Link href="/vlog">Voir tous les vlogs</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
