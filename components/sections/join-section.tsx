"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function JoinSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Après le montage du composant, on peut accéder au thème côté client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Utiliser le même rendu pour le serveur et le client non-monté
  // Utiliser le style dark par défaut (qui est le thème par défaut)
  const isLight = mounted && theme === "light"

  return (
    <section ref={ref} className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView && mounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="animated-bg absolute inset-0 -z-10" />
          <div className="relative z-10 py-16 px-8 md:px-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-md">
              Tu souhaites devenir membre du Conseil Étudiant ?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto drop-shadow-sm">
              Rejoins notre équipe et contribue à améliorer la vie étudiante à la HE2B. Nous recherchons des étudiants
              motivés et engagés !
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className={
                isLight
                  ? "bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 text-white"
                  : "bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
              }
            >
              <Link href="/join">Comment rejoindre le CE HE2B ?</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
