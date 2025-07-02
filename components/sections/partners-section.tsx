"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getHomepage } from "@/lib/api" // Ajustez le chemin selon votre structure

interface Partner {
  id: number
  name: string
  logo: string
  website?: string
  displayOrder?: number
  active: boolean
}

interface HomepageData {
  partners: Partner[]
  partnersTitle?: string
  partnersDescription?: string
}

export default function PartnersSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [homepageData, setHomepageData] = useState<HomepageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getHomepage()
        if (data) {
          setHomepageData(data)
        } else {
          setError("Impossible de charger les données")
        }
      } catch (err) {
        console.error("Erreur lors du chargement des partenaires:", err)
        setError("Erreur lors du chargement des partenaires")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filtrer et trier les partenaires actifs
  const activePartners = homepageData?.partners
      ?.filter(partner => partner.active)
      ?.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)) || []

  // Ne pas afficher la section s'il n'y a pas de partenaires
  if (!loading && activePartners.length === 0) {
    return null
  }

  return (
      <section ref={ref} className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {homepageData?.partnersTitle || "Nos partenaires"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {homepageData?.partnersDescription || "Ils nous font confiance et nous soutiennent dans nos projets."}
            </p>
          </motion.div>

          {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
          ) : error ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{error}</p>
              </div>
          ) : (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-wrap justify-center items-center gap-12 md:gap-16"
              >
                {activePartners.map((partner, index) => (
                    <motion.div
                        key={partner.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="w-32 h-32 md:w-40 md:h-40 relative grayscale hover:grayscale-0 transition-all duration-300"
                    >
                      {partner.website ? (
                          <a
                              href={partner.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full h-full"
                          >
                            <Image
                                src={partner.logo || "/placeholder.svg"}
                                alt={partner.name}
                                fill
                                className="object-contain"
                            />
                          </a>
                      ) : (
                          <Image
                              src={partner.logo || "/placeholder.svg"}
                              alt={partner.name}
                              fill
                              className="object-contain"
                          />
                      )}
                    </motion.div>
                ))}
              </motion.div>
          )}
        </div>
      </section>
  )
}