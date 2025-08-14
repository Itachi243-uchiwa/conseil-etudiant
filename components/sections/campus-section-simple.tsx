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
    { id: "defre", name: "Defré", slug: "campus-defre" },
    { id: "esi", name: "ESI", slug: "campus-esi" },
    { id: "nivelles", name: "Nivelles", slug: "campus-nivelles" },
    { id: "isib", name: "ISIB", slug: "campus-isib" },
    { id: "ises", name: "ISES", slug: "campus-ises" },
    { id: "isek", name: "ISEK", slug: "campus-isek" },
    { id: "iessid", name: "IESSID", slug: "campus-iessid" },
  ]

  return (
      <section ref={ref} className="py-16 md:py-20 bg-muted/30">
        <div className="container text-center px-4">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-[#3F3290] dark:gold-text">
              Conseil Étudiant HE2B
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Votre voix au sein de l'institution
            </p>
          </motion.div>

          <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-3 sm:grid-cols-4 md:flex md:flex-wrap md:justify-center gap-4 md:gap-6 lg:gap-10 max-w-4xl mx-auto"
          >
            {campuses.map((campus, index) => (
                <motion.div
                    key={campus.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center"
                >
                  <Link
                      href={`/campus/${campus.slug}`}
                      className="block group transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#3F3290] focus:ring-offset-2 rounded-full"
                  >
                    <CampusLogo
                        campus={campus.id as any}
                        className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    />
                    <span className="block mt-2 text-xs sm:text-sm md:text-base font-medium text-muted-foreground group-hover:text-[#3F3290] transition-colors duration-300">
                  {campus.name}
                </span>
                  </Link>
                </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
  )
}