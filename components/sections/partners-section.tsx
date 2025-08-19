"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getHomepage } from "@/lib/api"
import LuxuryHeading from "@/components/ui/luxury-heading"; // Ajustez le chemin selon votre structure

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
    const activePartners =
        homepageData?.partners
            ?.filter((partner) => partner.active)
            ?.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)) || []

    // Ne pas afficher la section s'il n'y a pas de partenaires
    if (!loading && activePartners.length === 0) {
        return null
    }

    return (
        <section ref={ref} className="py-12 md:py-20 bg-muted/30 md:bg-muted/30">
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 md:mb-16"
                >
                    <LuxuryHeading as="h2" className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                        {homepageData?.partnersTitle || "Nos partenaires"}
                    </LuxuryHeading>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4 md:px-0">
                        {homepageData?.partnersDescription || "Ils nous font confiance et nous soutiennent dans nos projets."}
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center py-8 md:py-12">
                        <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-primary"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-8 md:py-12">
                        <p className="text-muted-foreground">{error}</p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16"
                    >
                        {activePartners.map((partner, index) => (
                            <motion.div
                                key={partner.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 relative grayscale hover:grayscale-0 transition-all duration-300"
                            >
                                {partner.website ? (
                                    <a href={partner.website} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                                        <Image
                                            src={partner.logo || "/placeholder.svg"}
                                            alt={partner.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </a>
                                ) : (
                                    <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} fill className="object-contain" />
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    )
}
