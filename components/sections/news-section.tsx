"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CalendarDays } from "lucide-react"
import Image from "next/image"

const news = [
  {
    id: 1,
    title: "Le CE recrute pour l'année 2025-2026",
    excerpt: "Tu veux t'investir dans l'école ? Le Conseil Étudiant recrute pour l'année 2025-2026. Rejoins-nous !",
    date: "9 mars 2025",
    image: "/placeholder.svg?height=300&width=500",
    href: "/news/recrutement-2025",
  },
  {
    id: 2,
    title: "Comment déposer un recours ?",
    excerpt: "Guide pratique pour déposer un recours en cas de contestation de résultats d'examens.",
    date: "28 janvier 2025",
    image: "/placeholder.svg?height=300&width=500",
    href: "/news/guide-recours",
  },
  {
    id: 3,
    title: "Bal 2025 : Recherche DJ & Groupe de Musique",
    excerpt: "Le CE recherche un DJ et un groupe de musique pour animer le bal 2025.",
    date: "19 janvier 2025",
    image: "/placeholder.svg?height=300&width=500",
    href: "/news/recherche-dj",
  },
]

export default function NewsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
              <Card className="h-full flex flex-col">
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
                    <span>{item.date}</span>
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{item.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline">
                    <Link href={item.href}>Lire la suite</Link>
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
