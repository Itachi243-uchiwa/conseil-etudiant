"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { LuxuryHeading } from "@/components/ui/luxury-heading"
import CampusLogo from "@/components/ui/campus-logo"
import Link from "next/link"
import { LuxuryButton } from "@/components/ui/luxury-button"

export default function VisualSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-20 overflow-hidden relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <LuxuryHeading level="h2" className="mb-4">
            Nos Campus
          </LuxuryHeading>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Le Conseil Étudiant HE2B représente les étudiants de tous les campus de la Haute École Bruxelles-Brabant.
            Découvrez nos différentes implantations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-card p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2 gold-text">Campus Defré</h3>
              <p className="text-muted-foreground">
                Situé à Uccle, le campus Defré abrite la formation en éducation et pédagogie.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-card p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2 gold-text">Campus IESSID</h3>
              <p className="text-muted-foreground">
                L'Institut d'Enseignement Supérieur Social de l'Information et de la Documentation forme les futurs
                bibliothécaires et assistants sociaux.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="bg-card p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2 gold-text">Campus ISEK</h3>
              <p className="text-muted-foreground">
                L'Institut Supérieur d'Enseignement Kinésithérapique forme les kinésithérapeutes de demain.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <CampusLogo campus="defre" className="w-24 h-24" />
            <CampusLogo campus="iessid" className="w-24 h-24" />
            <CampusLogo campus="isek" className="w-24 h-24" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <div className="flex flex-wrap justify-center gap-4 order-2 md:order-1">
            <CampusLogo campus="isib" className="w-24 h-24" />
            <CampusLogo campus="ises" className="w-24 h-24" />
            <CampusLogo campus="nivelles" className="w-24 h-24" />
            <CampusLogo campus="esi" className="w-24 h-24" />
          </div>

          <div className="space-y-6 order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-card p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2 gold-text">Campus ISIB</h3>
              <p className="text-muted-foreground">
                L'Institut Supérieur Industriel de Bruxelles forme les ingénieurs industriels dans divers domaines
                technologiques.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="bg-card p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2 gold-text">Campus ISES</h3>
              <p className="text-muted-foreground">
                L'Institut Supérieur Économique propose des formations en gestion, marketing et commerce international.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-card p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2 gold-text">Campus ESI & Nivelles</h3>
              <p className="text-muted-foreground">
                L'École Supérieure d'Informatique et le campus de Nivelles complètent notre réseau d'établissements.
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-12 text-center"
        >
          <LuxuryButton asChild>
            <Link href="/contact">Découvrir tous nos campus</Link>
          </LuxuryButton>
        </motion.div>
      </div>
    </section>
  )
}
