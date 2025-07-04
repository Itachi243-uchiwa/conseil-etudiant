"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CalendarDays } from "lucide-react"
import Image from "next/image"
import { getNews, getMediaUrl } from "@/lib/api"

// Interface pour les actualités
interface NewsItem {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  image: string
  slug: string
  featured: boolean
  tags: string[]
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        setError(null)

        const newsData = await getNews()

        if (newsData && Array.isArray(newsData)) {
          // Tri par date (plus récent en premier) et limitation aux 3 premiers
          const sortedNews = newsData
              .sort((a, b) => {
                const dateA = new Date(a.date).getTime()
                const dateB = new Date(b.date).getTime()
                return dateB - dateA // Tri décroissant (plus récent en premier)
              })
              .slice(0, 3) // Prendre seulement les 3 premiers
              .map((item: any) => ({
                id: item.id,
                title: item.title,
                excerpt: item.excerpt || (item.content ? item.content.substring(0, 150) + '...' : ''),
                content: item.content,
                date: item.date,
                image: getMediaUrl(item.image || '/placeholder.svg'),
                slug: item.slug,
                featured: item.featured,
                tags: item.tags || []
              }))

          setNews(sortedNews)
        } else {
          setNews([])
        }
      } catch (err) {
        console.error('Error fetching news:', err)
        setError('Erreur lors du chargement des actualités')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Affichage du loading
  if (loading) {
    return (
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Actualités</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Chargement des actualités...
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                  <Card key={i} className="h-full flex flex-col animate-pulse">
                    <div className="relative aspect-video overflow-hidden rounded-t-lg bg-gray-300"></div>
                    <CardHeader>
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded"></div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded"></div>
                    </CardContent>
                    <CardFooter>
                      <div className="h-10 bg-gray-300 rounded w-full"></div>
                    </CardFooter>
                  </Card>
              ))}
            </div>
          </div>
        </section>
    )
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Actualités</h2>
              <p className="text-xl text-red-600 max-w-3xl mx-auto">
                {error}
              </p>
            </div>
          </div>
        </section>
    )
  }

  // Affichage si aucune actualité
  if (news.length === 0) {
    return (
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Actualités</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Aucune actualité disponible pour le moment.
              </p>
            </div>
          </div>
        </section>
    )
  }

  return (
      <section ref={ref} className="py-20">
        <div className="container">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Actualités</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Restez informé des dernières nouvelles du Conseil Étudiant HE2B.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                      <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                      <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground line-clamp-3">{item.excerpt}</p>
                      {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {item.tags.slice(0, 3).map((tag, tagIndex) => (
                                <span
                                    key={tagIndex}
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
                                >
                          {tag}
                        </span>
                            ))}
                          </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/news/${item.slug}`}>
                          Lire la suite
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
            ))}
          </div>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 text-center"
          >
            <Button asChild size="lg">
              <Link href="/news">Voir toutes les actualités</Link>
            </Button>
          </motion.div>
        </div>
      </section>
  )
}