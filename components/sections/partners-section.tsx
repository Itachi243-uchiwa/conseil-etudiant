"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"

const partners = [
  {
    name: "HE2B",
    logo: "/placeholder.svg?height=100&width=200",
  },
  {
    name: "FEF",
    logo: "/placeholder.svg?height=100&width=200",
  },
  {
    name: "UNECOF",
    logo: "/placeholder.svg?height=100&width=200",
  },
  {
    name: "Bruxelles Formation",
    logo: "/placeholder.svg?height=100&width=200",
  },
  {
    name: "RTBF",
    logo: "/placeholder.svg?height=100&width=200",
  },
]

export default function PartnersSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos partenaires</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ils nous font confiance et nous soutiennent dans nos projets.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-12 md:gap-16"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-32 h-32 md:w-40 md:h-40 relative grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} fill className="object-contain" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
