"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import FeaturedCarousel from "@/components/ui/featured-carousel"
import { LuxuryHeading } from "@/components/ui/luxury-heading"
import {
  getFeaturedNews,
  getFeaturedServices,
  getFeaturedEvents,
  getMediaUrl
} from "@/lib/api"

// Interface pour les items uniformisés
interface FeaturedItem {
  id: number
  title: string
  description: string
  image: string
  link: string
  linkText: string
  type: 'news' | 'service' | 'event'
  date?: string
}

export default function FeaturedSection() {
  const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    const fetchFeaturedContent = async () => {
      try {
        setLoading(true)
        setError(null)

        // Récupération parallèle de tous les contenus featured
        const [newsData, servicesData, eventsData] = await Promise.all([
          getFeaturedNews(),
          getFeaturedServices(),
          getFeaturedEvents()
        ])

        const allFeaturedItems: FeaturedItem[] = []

        // Transformation des news (NewsDto)
        if (newsData && Array.isArray(newsData)) {
          newsData.forEach((news: any) => {
            allFeaturedItems.push({
              id: news.id,
              title: news.title,
              description: news.excerpt || (news.content ? news.content.substring(0, 150) + '...' : ''),
              image: getMediaUrl(news.image || '/default-news.jpg'),
              link: `/news/${news.slug}`,
              linkText: "Lire l'article",
              type: 'news',
              date: news.date
            })
          })
        }

        // Transformation des services (ServiceDto)
        if (servicesData && Array.isArray(servicesData)) {
          servicesData.forEach((service: any) => {
            allFeaturedItems.push({
              id: service.id,
              title: service.title,
              description: service.description || (service.content ? service.content.substring(0, 150) + '...' : ''),
              image: getMediaUrl(service.image || '/default-service.jpg'),
              link: `/services/${service.slug}`,
              linkText: "Découvrir le service",
              type: 'service',
              date: service.updatedAt || service.createdAt
            })
          })
        }

        // Transformation des événements (EventDto)
        if (eventsData && Array.isArray(eventsData)) {
          eventsData.forEach((event: any) => {
            allFeaturedItems.push({
              id: event.id,
              title: event.title,
              description: event.description || (event.longDescription ? event.longDescription.substring(0, 150) + '...' : ''),
              image: getMediaUrl(event.image || '/default-event.jpg'),
              link: `/events/${event.slug}`,
              linkText: "En savoir plus",
              type: 'event',
              date: event.date
            })
          })
        }

        // Tri par date (plus récent en premier) et limitation à 6 éléments
        const sortedItems = allFeaturedItems
            .sort((a, b) => {
              if (a.date && b.date) {
                return new Date(b.date).getTime() - new Date(a.date).getTime()
              }
              return 0
            })
            .slice(0, 6)

        setFeaturedItems(sortedItems)
      } catch (err) {
        console.error('Error fetching featured content:', err)
        setError('Erreur lors du chargement du contenu featured')
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedContent()
  }, [])

  // Affichage du loading
  if (loading) {
    return (
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-10">
              <LuxuryHeading as="h2" className="text-3xl md:text-4xl mb-4">
                À la une
              </LuxuryHeading>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Chargement du contenu...
              </p>
            </div>
            <div className="flex justify-center items-center h-[500px]">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white/30"></div>
            </div>
          </div>
        </section>
    )
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-10">
              <LuxuryHeading as="h2" className="text-3xl md:text-4xl mb-4">
                À la une
              </LuxuryHeading>
              <p className="text-xl text-red-400 max-w-3xl mx-auto">
                {error}
              </p>
            </div>
          </div>
        </section>
    )
  }

  // Affichage si aucun contenu featured
  if (featuredItems.length === 0) {
    return (
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-10">
              <LuxuryHeading as="h2" className="text-3xl md:text-4xl mb-4">
                À la une
              </LuxuryHeading>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Aucun contenu featured disponible pour le moment
              </p>
            </div>
          </div>
        </section>
    )
  }

  return (
      <section ref={ref} className="py-16">
        <div className="container">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
          >
            <LuxuryHeading as="h2" className="text-3xl md:text-4xl mb-4">
              À la une
            </LuxuryHeading>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Découvrez nos événements, services et actualités phares
            </p>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full"
          >
            <FeaturedCarousel items={featuredItems} className="h-[500px] w-full" />
          </motion.div>
        </div>
      </section>
  )
}