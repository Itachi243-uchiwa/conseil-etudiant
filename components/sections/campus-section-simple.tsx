"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import CampusLogo from "@/components/ui/campus-logo"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function CampusSectionSimple() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const isDark = mounted && resolvedTheme === "dark"

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
        <section ref={ref} className="py-8 md:py-12 lg:py-20 relative overflow-hidden">
            {/* Background animé - hidden on mobile */}
            <div className="absolute inset-0 hidden md:block">
                <motion.div
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                    }}
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: isDark
                            ? `radial-gradient(circle at 25% 25%, #6366f1 0%, transparent 50%), radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)`
                            : `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 75% 75%, #6366f1 0%, transparent 50%)`,
                        backgroundSize: "400% 400%",
                    }}
                />

                {/* Particules flottantes - desktop only */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, Math.sin(i) * 20, 0],
                            opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                            duration: 6 + i,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: i * 0.8,
                        }}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                            background: isDark ? "#8b5cf6" : "#6366f1",
                            left: `${10 + i * 11}%`,
                            top: `${20 + (i % 3) * 30}%`,
                        }}
                    />
                ))}
            </div>

            <div className="container text-center px-4 md:px-6 relative z-10">
                {/* Header desktop uniquement - masqué sur mobile */}
                <motion.div
                    initial={{ opacity: 0, y: 40, rotateX: 20 }}
                    animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: 20 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8 md:mb-10 lg:mb-16 hidden md:block"
                >
                    <motion.h2
                        className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-[#3F3290] via-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                        style={{
                            backgroundSize: "200% 100%",
                        }}
                    >
                        Conseil Étudiant HE2B
                    </motion.h2>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: "100%" } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-1 bg-gradient-to-r from-[#3F3290] to-[#8b5cf6] rounded-full mx-auto mb-3 md:mb-4 lg:mb-6 max-w-xs"
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        Votre voix au sein de l'institution
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative"
                >
                    {/* Mobile: HE2B Logo uniquement */}
                    <div className="md:hidden flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.8 }}
                            animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
                            transition={{
                                duration: 0.6,
                                type: "spring",
                                stiffness: 100,
                            }}
                        >
                            <Link href="/campus" className="block">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative"
                                >
                                    <div className="w-60 h-60 relative">
                                        <img src="/logo.png" alt="HE2B" className="w-full h-full object-contain drop-shadow-lg" />
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Desktop: All campus logos */}
                    <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 lg:gap-8 max-w-6xl mx-auto">
                        {campuses.map((campus, index) => (
                            <motion.div
                                key={campus.id}
                                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                                animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 100,
                                }}
                                whileHover={{ y: -10 }}
                                className="flex flex-col items-center group"
                            >
                                <Link href={`/campus/${campus.slug}`} className="block relative">
                                    {/* Glow effect */}
                                    <motion.div
                                        className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background: `radial-gradient(circle, ${isDark ? "rgba(139, 92, 246, 0.3)" : "rgba(99, 102, 241, 0.3)"} 0%, transparent 70%)`,
                                        }}
                                        animate={{
                                            scale: [1, 1.1, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                        }}
                                    />

                                    {/* Logo */}
                                    <motion.div
                                        whileHover={{
                                            scale: 1.15,
                                            rotate: [0, -5, 5, 0],
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative z-10"
                                    >
                                        <CampusLogo
                                            campus={campus.id as any}
                                            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 transition-all duration-300 drop-shadow-lg group-hover:drop-shadow-xl"
                                        />
                                    </motion.div>

                                    {/* Nom du campus */}
                                    <motion.span
                                        className="block mt-4 text-sm md:text-base font-semibold text-muted-foreground group-hover:text-[#3F3290] dark:group-hover:text-[#8b5cf6] transition-colors duration-300"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {campus.name}
                                    </motion.span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}