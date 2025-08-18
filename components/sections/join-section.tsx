"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function JoinSection() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    return (
        <section ref={ref} className="py-12 md:py-20">
            <div className="container px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-border/50"
                >
                    {/* Version mobile - Design épuré sans background complexe */}
                    <div className="block md:hidden">
                        <div className="relative bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 p-6">
                            {/* Subtle decorative elements for mobile */}
                            <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary/10 blur-xl"></div>
                            <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-primary/15 blur-lg"></div>

                            <div className="relative z-10 text-center">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                                    className="text-2xl font-bold mb-4 text-foreground"
                                >
                                    Rejoins notre équipe !
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                                    className="text-base mb-6 text-muted-foreground leading-relaxed"
                                >
                                    Contribue à améliorer la vie étudiante à la HE2B.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                                >
                                    <Link href="/join" className="block">
                                        <Button
                                            size="lg"
                                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                                        >
                                            Comment nous rejoindre ?
                                        </Button>
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Version desktop - Design complexe conservé */}
                    <div className="hidden md:block">
                        <motion.div
                            animate={{
                                background: [
                                    "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
                                    "linear-gradient(225deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                                    "linear-gradient(315deg, #8b5cf6 0%, #3b82f6 50%, #6366f1 100%)",
                                    "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
                                ],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                            className="absolute inset-0"
                        />

                        <div className="absolute inset-0">
                            <motion.div
                                animate={{
                                    transform: [
                                        "translateX(-100%) translateY(0%) rotate(0deg)",
                                        "translateX(100%) translateY(-20%) rotate(180deg)",
                                        "translateX(-100%) translateY(0%) rotate(360deg)",
                                    ],
                                    opacity: [0.1, 0.3, 0.1],
                                }}
                                transition={{
                                    duration: 12,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                }}
                                className="absolute top-0 left-0 w-[200%] h-[200%]"
                                style={{
                                    background: "conic-gradient(from 0deg at 50% 50%, rgba(59, 130, 246, 0.4) 0deg, transparent 120deg, rgba(99, 102, 241, 0.4) 240deg, transparent 360deg)",
                                }}
                            />

                            <motion.div
                                animate={{
                                    transform: [
                                        "translateX(100%) translateY(-10%) rotate(180deg)",
                                        "translateX(-100%) translateY(10%) rotate(0deg)",
                                        "translateX(100%) translateY(-10%) rotate(-180deg)",
                                    ],
                                    opacity: [0.1, 0.25, 0.1],
                                }}
                                transition={{
                                    duration: 15,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                    delay: 2,
                                }}
                                className="absolute bottom-0 right-0 w-[200%] h-[200%]"
                                style={{
                                    background: "conic-gradient(from 180deg at 50% 50%, rgba(139, 92, 246, 0.3) 0deg, transparent 120deg, rgba(59, 130, 246, 0.3) 240deg, transparent 360deg)",
                                }}
                            />
                        </div>

                        <div className="absolute inset-0">
                            <motion.div
                                animate={{
                                    scale: [1, 1.4, 1],
                                    opacity: [0.2, 0.6, 0.2],
                                    x: [0, 50, 0],
                                    y: [0, -30, 0],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                }}
                                className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-xl"
                                style={{
                                    background: "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)",
                                }}
                            />

                            <motion.div
                                animate={{
                                    scale: [1, 1.6, 1],
                                    opacity: [0.15, 0.5, 0.15],
                                    x: [0, -40, 0],
                                    y: [0, 40, 0],
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                    delay: 1.5,
                                }}
                                className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full blur-xl"
                                style={{
                                    background: "radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, transparent 70%)",
                                }}
                            />

                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.1, 0.4, 0.1],
                                    x: [0, 30, 0],
                                    y: [0, -20, 0],
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                    delay: 3,
                                }}
                                className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full blur-lg"
                                style={{
                                    background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
                                }}
                            />
                        </div>

                        <div className="absolute inset-0">
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        y: [-30, -80, -30],
                                        x: [-15 + (i % 2) * 30, 15 - (i % 2) * 30, -15 + (i % 2) * 30],
                                        opacity: [0, 0.8, 0],
                                        scale: [0.5, 1.2, 0.5],
                                    }}
                                    transition={{
                                        duration: 4 + i * 0.3,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: "easeInOut",
                                        delay: i * 0.6,
                                    }}
                                    className="absolute rounded-full bg-white/60 backdrop-blur-sm"
                                    style={{
                                        left: `${10 + i * 11}%`,
                                        top: `${15 + (i % 3) * 25}%`,
                                        width: `${6 + (i % 3) * 2}px`,
                                        height: `${6 + (i % 3) * 2}px`,
                                        boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                                    }}
                                />
                            ))}
                        </div>

                        <motion.div
                            animate={{
                                background: [
                                    "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                                    "linear-gradient(45deg, transparent 60%, rgba(255,255,255,0.1) 80%, transparent 100%)",
                                    "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                                ],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                            className="absolute inset-0"
                        />

                        <div className="relative z-10 py-16 px-8 md:px-16 text-center">
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                                className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-lg"
                                style={{ color: "#ffffff" }}
                            >
                                Tu souhaites devenir membre du Conseil Étudiant ?
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                                className="text-xl mb-8 max-w-2xl mx-auto drop-shadow-sm leading-relaxed"
                                style={{ color: "#ffffff" }}
                            >
                                Rejoins notre équipe et contribue à améliorer la vie étudiante à la HE2B. Nous recherchons des étudiants
                                motivés et engagés !
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 },
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link href="/join">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="bg-white/15 backdrop-blur-md border-white/40 hover:bg-white/25 transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-6"
                                        style={{ color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.4)" }}
                                    >
                                        Comment rejoindre le CE HE2B ?
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>

                        <motion.div
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                            className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}