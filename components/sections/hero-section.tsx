"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import { LuxuryButton } from "@/components/ui/luxury-button"
import Hero3DSlider from "@/components/ui/hero-3d-slider"

// Définir les éléments du carrousel avec des images plus descriptives
const heroItems = [
  {
    title: "Conseil Étudiant HE2B",
    description: "Votre voix au sein de l'institution",
    image: "/placeholder.svg?height=800&width=1200&text=Conseil+Étudiant+HE2B",
  },
  {
    title: "Représentation Étudiante",
    description: "Défendre vos droits et vos intérêts",
    image: "/placeholder.svg?height=800&width=1200&text=Représentation+Étudiante",
  },
  {
    title: "Services & Soutien",
    description: "Accompagnement juridique, financier et pédagogique",
    image: "/placeholder.svg?height=800&width=1200&text=Services+et+Soutien",
  },
  {
    title: "Événements & Vie Étudiante",
    description: "Animations, soirées et activités culturelles",
    image: "/placeholder.svg?height=800&width=1200&text=Événements+et+Vie+Étudiante",
  },
]

export default function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

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

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
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
      {Array.from({ length: 30 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5 + 0.1,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: [null, Math.random() * window.innerWidth],
            y: [null, Math.random() * window.innerHeight],
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
      ))}

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-8 h-[500px] w-full">
            <Hero3DSlider items={heroItems} interval={5000} className="w-full h-full rounded-xl shadow-2xl" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
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
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="h-8 w-8 text-primary" />
      </motion.div>
    </section>
  )
}
