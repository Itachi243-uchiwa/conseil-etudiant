"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { Info, Shield, Users } from "lucide-react"
import { LuxuryButton } from "@/components/ui/luxury-button"
import { LuxuryHeading } from "@/components/ui/luxury-heading"
import LuxuryCard from "@/components/ui/luxury-card"

const missions = [
    {
        title: "Informer",
        description: "Assurer la bonne circulation de l'information entre les étudiant·e·s et la direction de la HE2B.",
        icon: Info,
    },
    {
        title: "Défendre",
        description:
            "Défendre les intérêts des étudiant·e·s sur les questions relatives à l'enseignement et à la pédagogie.",
        icon: Shield,
    },
    {
        title: "Représenter",
        description: "Porter la voix des étudiants auprès des autorités académiques et administratives.",
        icon: Users,
    },
]

export default function AboutSection() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    return (
        <section ref={ref} className="py-12 md:py-20 md:bg-muted/30">
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 md:mb-16"
                >
                    <LuxuryHeading as="h2" className="text-2xl md:text-3xl lg:text-4xl mb-3 md:mb-4">
                        Qui sommes-nous ?
                    </LuxuryHeading>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4 md:px-0">
                        Le Conseil Étudiant HE2B est l'organe de représentation des étudiants au sein de la Haute École
                        Bruxelles-Brabant.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-16">
                    {missions.map((mission, index) => (
                        <motion.div
                            key={mission.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <LuxuryCard className="h-full p-4 md:p-6">
                                <div className="mb-3 md:mb-4 p-2 md:p-3 rounded-full bg-primary/10 w-fit">
                                    <mission.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                                </div>
                                <h3 className="text-lg md:text-xl font-semibold mb-2 gold-text">{mission.title}</h3>
                                <p className="text-sm md:text-base text-muted-foreground">{mission.description}</p>
                            </LuxuryCard>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-video rounded-lg overflow-hidden"
                    >
                        <div className="absolute inset-0 border-2 border-primary/20 rounded-lg"></div>
                        <Image
                            src="/histoire/histoire.jpg?height=600&width=800"
                            alt="Équipe du Conseil Étudiant"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                        transition={{ duration: 0.8 }}
                    >
                        <LuxuryHeading as="h3" className="text-xl md:text-2xl lg:text-3xl mb-3 md:mb-4">
                            Notre histoire et nos valeurs
                        </LuxuryHeading>
                        <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                            Depuis sa création, le Conseil Étudiant HE2B s'engage à améliorer la vie étudiante et à défendre les
                            droits des étudiants. Nous croyons en la transparence, l'équité et la participation active de tous les
                            étudiants dans la vie de l'école.
                        </p>
                        <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
                            Notre équipe est composée d'étudiants élus démocratiquement, représentant toutes les sections et tous les
                            campus de la HE2B.
                        </p>
                        <LuxuryButton asChild variant="gold" className="text-sm md:text-base px-4 md:px-6">
                            <Link href="/about">En savoir plus sur notre équipe</Link>
                        </LuxuryButton>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
