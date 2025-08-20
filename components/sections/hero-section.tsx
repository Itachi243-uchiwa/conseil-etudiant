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

    useEffect(() => {
        setIsLoaded(true)

        const updateWindowDimensions = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        updateWindowDimensions()
        window.addEventListener("resize", updateWindowDimensions)

        return () => window.removeEventListener("resize", updateWindowDimensions)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await getHomepage()
                if (data) {
                    setHomepageData(data)
                }
            } catch (err) {
                console.error("Erreur lors du chargement:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const activeHeroItems =
        homepageData?.heroItems
            ?.filter((item) => item.active)
            ?.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)) || []

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    }

    const floatingVariants = {
        initial: { y: 0 },
        animate: {
            y: [-10, 10, -10],
            transition: {
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
            },
        },
    }

    const renderFloatingElements = () => {
        if (windowDimensions.width === 0) return null

        return Array.from({ length: 20 }).map((_, index) => {
            const startY = Math.random() * windowDimensions.height
            return (
                <motion.div
                    key={index}
                    className="absolute pointer-events-none bg-gradient-to-t from-primary/40 to-primary/80 rounded-full blur-[1px] shadow-lg"
                    initial={{
                        x: Math.random() * windowDimensions.width,
                        y: startY,
                        opacity: 0,
                    }}
                    animate={{
                        y: [startY, startY - 100, startY],
                        opacity: [0, 0.6, 0],
                    }}
                    transition={{
                        duration: Math.random() * 8 + 8,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 5,
                        ease: "linear",
                    }}
                    style={{
                        width: Math.random() * 3 + 1 + "px",
                        height: Math.random() * 3 + 1 + "px",
                    }}
                />
            )
        })
    }

    if (loading) {
        return (
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/5">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-2 border-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-clip-border"></div>
                        <div className="absolute inset-2 rounded-full bg-background"></div>
                    </div>
                </motion.div>
            </section>
        )
    }

    if (activeHeroItems.length === 0) {
        return (
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/5">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center relative z-10"
                >
                    <motion.h1
                        variants={floatingVariants}
                        initial="initial"
                        animate="animate"
                        className="text-4xl md:text-6xl lg:text-8xl font-light bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-8"
                    >
                        HE2B
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-12"
                    />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <LuxuryButton asChild size="lg" className="group relative overflow-hidden">
                            <Link href="/about">
                                <span className="relative z-10">Découvrir</span>
                            </Link>
                        </LuxuryButton>
                    </div>
                </motion.div>
            </section>
        )
    }

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/5"
        >
            {/* Arrière-plan moderne */}
            <div className="absolute inset-0 w-full h-full">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isLoaded ? { scale: 1, opacity: 0.1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-primary to-secondary blur-3xl"
                />
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isLoaded ? { scale: 1, opacity: 0.08 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
                    className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-l from-secondary to-primary blur-3xl"
                />
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isLoaded ? { scale: 1, opacity: 0.05 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 blur-3xl"
                />
            </div>

            {/* Éléments flottants */}
            <div className="absolute inset-0 hidden lg:block">
                {isLoaded && renderFloatingElements()}
            </div>

            <div className="container relative z-10 h-full px-4 md:px-6">
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="w-full h-full flex flex-col justify-center items-center"
                >
                    <motion.div
                        variants={itemVariants}
                        className="relative w-full max-w-7xl"
                    >
                        <div className="relative h-[400px] md:h-[600px] lg:h-[800px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-primary/10">
                            <Hero3DSlider
                                items={activeHeroItems}
                                interval={6000}
                                className="w-full h-full"
                            />

                            {/* Overlay gradient moderne */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Boutons d'action épurés */}
                        <motion.div
                            variants={itemVariants}
                            className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 flex gap-4"
                        >
                            <LuxuryButton
                                asChild
                                size="lg"
                                className="backdrop-blur-md bg-white/90 text-black hover:bg-white border-0 shadow-xl"
                            >
                                <Link href="/about">Découvrir</Link>
                            </LuxuryButton>
                            <LuxuryButton
                                asChild
                                size="lg"
                                variant="outline"
                                className="backdrop-blur-md bg-black/20 border-white/30 text-white hover:bg-white/10 shadow-xl"
                            >
                                <Link href="/contact">Contact</Link>
                            </LuxuryButton>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Indicateur de défilement moderne */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="p-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20"
                >
                    <ChevronDown className="h-5 w-5 text-primary/80" />
                </motion.div>
            </motion.div>
        </section>
    )
}