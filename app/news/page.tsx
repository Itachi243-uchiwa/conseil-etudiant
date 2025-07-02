import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"
import { getNews } from "@/lib/api"

export const metadata: Metadata = {
  title: "Actualités | Conseil Étudiant HE2B",
  description: "Restez informé des dernières nouvelles du Conseil Étudiant HE2B",
}

interface NewsItem {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  image: string
  slug: string
  featured: boolean
  tags?: string[]
  documents?: Array<{
    title: string
    url: string
  }>
  relatedLinks?: string[]
}

export default async function NewsPage() {
  const news: NewsItem[] = await getNews() || []

  return (
      <div className="relative">
        <ParallaxBackground />

        <div className="container py-12 md:py-20">
          <div className="max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Actualités</h1>
            <p className="text-xl text-muted-foreground">
              Restez informé des dernières nouvelles du Conseil Étudiant HE2B. Retrouvez ici toutes nos actualités,
              annonces et informations importantes.
            </p>
          </div>

          {news.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucune actualité disponible pour le moment.</p>
              </div>
          ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {news.map((item) => (
                      <Card key={item.id} className="tilt-on-hover card-shine h-full flex flex-col">
                        <div className="relative aspect-video overflow-hidden rounded-t-lg">
                          <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <CardHeader>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <CalendarDays className="mr-2 h-4 w-4" />
                            <span>{new Date(item.date).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}</span>
                          </div>
                          <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-muted-foreground">{item.excerpt}</p>
                        </CardContent>
                        <CardFooter>
                          <Button asChild>
                            <Link href={`/news/${item.slug}`}>Lire la suite</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button variant="outline" size="lg">
                    Charger plus d'actualités
                  </Button>
                </div>
              </>
          )}
        </div>
      </div>
  )
}