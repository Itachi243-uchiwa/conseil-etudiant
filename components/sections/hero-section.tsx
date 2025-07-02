"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import { LuxuryButton } from "@/components/ui/luxury-button"
import Hero3DSlider from "@/components/ui/hero-3d-slider"
import { getHomepage } from "@/lib/api"

interface HeroItem {
  id: number
  title: string
  description: string
  image: string
  displayOrder?: number
  active: boolean
}

interface HomepageData {
  heroItems: HeroItem[]
}

export default function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isLoaded, setIsLoaded] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 })
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoaded(true)

    const updateWindowDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateWindowDimensions()
    window.addEventListener('resize', updateWindowDimensions)

    return () => window.removeEventListener('resize', updateWindowDimensions)
  }, [])

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
        console.error("Erreur lors du chargement des données hero:", err)
        setError("Erreur lors du chargement des données")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filtrer et trier les hero items actifs
  const activeHeroItems = homepageData?.heroItems
      ?.filter(item => item.active)
      ?.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)) || []

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const shapeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  }

  const renderParticles = () => {
    if (windowDimensions.width === 0) return null

    return Array.from({ length: 30 }).map((_, index) => (
        <motion.div
            key={index}
            className="absolute rounded-full w-screen"
            initial={{
              x: Math.random() * windowDimensions.width,
              y: Math.random() * windowDimensions.height,
              opacity: Math.random() * 0.5 + 0.1,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: [null, Math.random() * windowDimensions.width],
              y: [null, Math.random() * windowDimensions.height],
              opacity: [null, Math.random() * 0.5 + 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              background: `hsl(36, 100%, ${50 + Math.random() * 30}%)`,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px hsl(36, 100%, 50%)`,
              zIndex: 1,
            }}
        />
    ))
  }

  // Affichage conditionnel pendant le chargement ou en cas d'erreur
  if (loading) {
    return (
        <section className="relative min-h-screen max-w-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Chargement...</p>
          </div>
        </section>
    )
  }

  if (error || activeHeroItems.length === 0) {
    return (
        <section className="relative min-h-screen max-w-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="container relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Conseil Étudiant HE2B
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {error || "Aucun contenu disponible pour le moment"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LuxuryButton asChild size="lg" className="text-lg px-8">
                <Link href="/about">En savoir plus</Link>
              </LuxuryButton>
              <LuxuryButton
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-primary/30 hover:border-primary/60"
              >
                <Link href="/contact">Nous contacter</Link>
              </LuxuryButton>
            </div>
          </div>
        </section>
    )
  }

  return (
      <section ref={ref} className="relative min-h-screen max-w-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background shapes */}
        <div className="absolute inset-0 -z-10 overflow-hidden w-full">
          <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={shapeVariants}
              className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
          />
          <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={shapeVariants}
              className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"
          />
          <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={shapeVariants}
              className="absolute top-2/3 left-1/3 w-72 h-72 rounded-full bg-tertiary/10 blur-3xl"
          />
        </div>

        {/* Animated particles */}
        {isLoaded && renderParticles()}

        <div className="container relative z-10 h-full w-screen">
          <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={containerVariants}
              className="w-full h-full flex flex-col justify-center items-center"
          >
            {/* Conteneur relatif pour le slider et les boutons */}
            <div className="relative w-full h-[800px] flex items-center justify-center">
              {/* Slider */}
              <motion.div variants={itemVariants} className="absolute inset-0 w-full h-full">
                <Hero3DSlider
                    items={activeHeroItems}
                    interval={5000}
                    className="w-full h-full rounded-none shadow-2xl"
                />
              </motion.div>

              <motion.div
                  variants={itemVariants}
                  className="absolute z-20 bottom-20 flex flex-col sm:flex-row gap-4"
              >
                <LuxuryButton asChild size="lg" className="text-lg px-8">
                  <Link href="/about">En savoir plus</Link>
                </LuxuryButton>
                <LuxuryButton
                    asChild
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 border-primary/30 hover:border-primary/60"
                >
                  <Link href="/contact">Nous contacter</Link>
                </LuxuryButton>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            className="absolute bottom-0 transform -translate-x-1/2 z-20"
        >
          <ChevronDown className="h-8 w-8 text-primary" />
        </motion.div>
      </section>
  )
}