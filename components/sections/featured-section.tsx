"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import FeaturedCarousel from "@/components/ui/featured-carousel"
import { LuxuryHeading } from "@/components/ui/luxury-heading" // Importation corrigée

const featuredItems = [
  {
    id: 1,
    title: "Bal HE2B 2025",
    description:
      "Une nuit au Musée - Le bal annuel de la HE2B. Venez danser et vous amuser dans un cadre prestigieux, avec DJ et groupe live.",
    image: "/placeholder.svg?height=600&width=1200&text=Bal+HE2B+2025",
    link: "/events/bal-2025",
    linkText: "En savoir plus",
  },
  {
    id: 2,
    title: "Service d'aide juridique",
    description:
      "Notre service d'aide juridique vous accompagne dans toutes vos démarches juridiques liées à vos études et à votre vie étudiante.",
    image: "/placeholder.svg?height=600&width=1200&text=Aide+Juridique",
    link: "/services/aide-juridique",
    linkText: "Découvrir le service",
  },
  {
    id: 3,
    title: "Rejoignez notre équipe",
    description:
      "Vous souhaitez vous investir dans la vie étudiante de la HE2B ? Rejoignez le Conseil Étudiant ! Nous recherchons des étudiants motivés.",
    image: "/placeholder.svg?height=600&width=1200&text=Rejoignez+Notre+Équipe",
    link: "/join",
    linkText: "Comment nous rejoindre",
  },
  {
    id: 4,
    title: "Semaine culturelle",
    description:
      "Une semaine dédiée à la culture et aux arts. Au programme : expositions, concerts, projections de films, ateliers créatifs et bien plus encore.",
    image: "/placeholder.svg?height=600&width=1200&text=Semaine+Culturelle",
    link: "/events/semaine-culturelle",
    linkText: "Programme complet",
  },
]

export default function FeaturedSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Découvrez nos événements et services phares</p>
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
