"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import CampusLogo from "@/components/ui/campus-logo"

export default function CampusSectionSimple() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const campuses = [
    { id: "defre", name: "Defré" },
    { id: "esi", name: "ESI" },
    { id: "nivelles", name: "Nivelles" },
    { id: "isib", name: "ISIB" },
    { id: "ises", name: "ISES" },
    { id: "isek", name: "ISEK" },
    { id: "iessid", name: "IESSID" },
  ]

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex justify-center mb-8">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture%20d%E2%80%99%C3%A9cran%20du%202025-04-19%2010-57-50-z7PX4o2MYtHrgWJGLGsuMbWOJjPrbp.png"
              alt="Logo CE HE2B"
              className="h-16 md:h-20"
            />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#3F3290] dark:gold-text">Conseil Étudiant HE2B</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Votre voix au sein de l'institution</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10"
        >
          {campuses.map((campus, index) => (
            <motion.div
              key={campus.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/campus/${campus.id}`} className="block group">
                <CampusLogo
                  campus={campus.id as any}
                  className="w-20 h-20 md:w-24 md:h-24 transition-transform group-hover:scale-110"
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
