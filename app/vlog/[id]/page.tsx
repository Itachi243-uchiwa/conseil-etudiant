import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  CalendarDays,
  Clock,
  Eye,
  ThumbsUp,
  Share2,
  ArrowLeft,
  Play,
  Heart,
  MessageCircle,
  Bookmark,
} from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"
import { LuxuryHeading } from "@/components/ui/luxury-heading"

// Données fictives pour les vlogs (même données que dans la page principale)
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
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // URL fictive pour l'exemple
    content:
      "Le Bal HE2B 2024 a été un véritable succès ! Plus de 500 étudiants se sont réunis au Musée de Bruxelles pour une soirée inoubliable. Au programme : DJ, groupe live, animations et bien plus encore. Cet aftermovie vous permet de revivre les meilleurs moments de cette soirée exceptionnelle. Merci à tous les participants et à l'équipe organisatrice pour ce bel événement !",
    tags: ["Bal", "Événement", "Soirée", "Musée de Bruxelles"],
    author: {
      name: "Marie Dupont",
      role: "Présidente du CE",
      avatar: "/placeholder.svg?height=100&width=100&text=MD",
    },
    comments: 24,
    shares: 56,
    bookmarks: 18,
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
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // URL fictive pour l'exemple
    content:
      "Dans ce vlog, nous suivons le quotidien des étudiants de l'Institut Supérieur Industriel de Bruxelles (ISIB). De la cafétéria aux laboratoires, en passant par les salles de cours, découvrez la vie sur ce campus dynamique. Nous avons également interviewé plusieurs étudiants et professeurs pour vous donner un aperçu complet de l'ambiance et des formations proposées à l'ISIB.",
    tags: ["ISIB", "Campus", "Vie étudiante", "Ingénierie"],
    author: {
      name: "Thomas Lambert",
      role: "Vice-président du CE",
      avatar: "/placeholder.svg?height=100&width=100&text=TL",
    },
    comments: 12,
    shares: 34,
    bookmarks: 8,
  },
  // Autres vlogs...
]

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const vlogId = Number.parseInt(params.id)
  const vlog = vlogData.find((v) => v.id === vlogId)

  if (!vlog) {
    return {
      title: "Vlog non trouvé | Conseil Étudiant HE2B",
    }
  }

  return {
    title: `${vlog.title} | CE HE2B TV`,
    description: vlog.description,
  }
}

export default function VlogDetailPage({ params }: { params: { id: string } }) {
  const vlogId = Number.parseInt(params.id)
  const vlog = vlogData.find((v) => v.id === vlogId)

  if (!vlog) {
    notFound()
  }

  // Filtrer les vlogs similaires (même catégorie, mais pas le même vlog)
  const similarVlogs = vlogData.filter((v) => v.category === vlog.category && v.id !== vlog.id).slice(0, 3)

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

          <LuxuryHeading as="h1" className="text-3xl md:text-4xl mb-4">
            {vlog.title}
          </LuxuryHeading>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 mr-1" />
              {vlog.date}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {vlog.duration}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Eye className="h-4 w-4 mr-1" />
              {vlog.views} vues
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <ThumbsUp className="h-4 w-4 mr-1" />
              {vlog.likes} likes
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            {/* Lecteur vidéo */}
            <div className="relative aspect-video mb-8 rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={vlog.videoUrl}
                title={vlog.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Button variant="outline" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>J'aime</span>
                <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">{vlog.likes}</span>
              </Button>

              <Button variant="outline" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>Commenter</span>
                <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">{vlog.comments}</span>
              </Button>

              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                <span>Partager</span>
                <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">{vlog.shares}</span>
              </Button>

              <Button variant="outline" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                <span>Enregistrer</span>
                <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">{vlog.bookmarks}</span>
              </Button>
            </div>

            {/* Auteur */}
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg mb-8">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={vlog.author.avatar || "/placeholder.svg"}
                  alt={vlog.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{vlog.author.name}</h3>
                <p className="text-sm text-muted-foreground">{vlog.author.role}</p>
              </div>
            </div>

            {/* Description du vlog */}
            <div className="mb-8">
              <LuxuryHeading as="h2" className="text-2xl font-bold mb-4">
                Description
              </LuxuryHeading>
              <p className="text-muted-foreground whitespace-pre-line">{vlog.content}</p>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <LuxuryHeading as="h2" className="text-2xl font-bold mb-4">
                Tags
              </LuxuryHeading>
              <div className="flex flex-wrap gap-2">
                {vlog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-muted/50 text-muted-foreground px-3 py-1 rounded-full text-sm hover:bg-primary/10 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            {/* Vlogs similaires */}
            <Card className="mb-8 overflow-hidden">
              <div className="bg-primary/10 p-4">
                <h2 className="text-xl font-bold">Vlogs similaires</h2>
              </div>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {similarVlogs.map((similarVlog) => (
                    <Link href={`/vlog/${similarVlog.id}`} key={similarVlog.id} className="block group">
                      <div className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="relative w-24 h-16 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={similarVlog.thumbnail || "/placeholder.svg"}
                            alt={similarVlog.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                            {similarVlog.title}
                          </h3>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {similarVlog.duration}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Catégories */}
            <Card>
              <div className="bg-primary/10 p-4">
                <h2 className="text-xl font-bold">Catégories</h2>
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <Link
                    href="/vlog/categories/evenements"
                    className="block p-2 rounded-lg hover:bg-muted/50 transition-colors hover:text-primary"
                  >
                    Événements
                  </Link>
                  <Link
                    href="/vlog/categories/campus"
                    className="block p-2 rounded-lg hover:bg-muted/50 transition-colors hover:text-primary"
                  >
                    Campus
                  </Link>
                  <Link
                    href="/vlog/categories/interviews"
                    className="block p-2 rounded-lg hover:bg-muted/50 transition-colors hover:text-primary"
                  >
                    Interviews
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
