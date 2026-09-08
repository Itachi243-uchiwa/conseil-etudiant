"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {ChevronLeft, ChevronRight, ExternalLink} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { LuxuryButton } from "./luxury-button"
import { useTheme } from "next-themes"

interface CarouselItem {
    id: number
    title: string
    description: string
    image: string
    link: string
    linkText: string
}

interface FeaturedCarouselProps {
    items: CarouselItem[]
    interval?: number
    className?: string
}

export default function FeaturedCarousel({ items, interval = 6000, className }: FeaturedCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(1)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const [isPaused, setIsPaused] = useState(false)
    const { theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!isPaused) {
            const nextSlide = () => {
                setDirection(1)
                setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
            }

            timeoutRef.current = setTimeout(nextSlide, interval)

            return () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current)
                }
            }
        }
    }, [currentIndex, interval, items.length, isPaused])

    const handlePrevious = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        setDirection(-1)
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
    }

    const handleNext = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        setDirection(1)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
            },
        },
        exit: (direction: number) => ({
            x: direction > 0 ? "-100%" : "100%",
            opacity: 0,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
            },
        }),
    }

    if (!mounted) {
        return (
            <div className={cn("relative overflow-hidden rounded-xl text-white", className)}>
                <div className="h-full w-full">
                    <div className="absolute w-full h-full">
                        <div className="relative w-full h-full">
                            <Image
                                src={items[0].image || "/placeholder.svg"}
                                alt={items[0].title}
                                fill
                                className="object-cover opacity-100"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
                            <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-8 pb-16">
                                <h1 className="text-2xl md:text-3xl font-bold mb-4 !text-white drop-shadow-lg">
                                    {items[0].title}
                                </h1>
                                <LuxuryButton asChild className="mobile-touch">
                                    <Link href={items[0].link}>{items[0].linkText}</Link>
                                </LuxuryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const isLight = theme === "light" || resolvedTheme === "light"

    return (
        <div
            className={cn("relative overflow-hidden rounded-xl", className)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="h-full w-full">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute w-full h-full"
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={items[currentIndex].image || "/placeholder.svg"}
                                alt={items[currentIndex].title}
                                fill
                                className="object-cover opacity-100"
                                priority
                            />
                            <div
                                className={cn(
                                    "absolute inset-0",
                                    isLight
                                        ? "bg-gradient-to-t from-[#6f4aa6]/20 via-[#6f4aa6]/20 to-transparent"
                                        : "bg-gradient-to-t from-background/80 via-background/30 to-transparent"
                                )}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-8 pb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 !text-white drop-shadow-lg">
                                    {items[currentIndex].title}
                                </h2>
                                <LuxuryButton asChild variant="gold">
                                    <Link href={items[currentIndex].link}>{items[currentIndex].linkText}</Link>
                                </LuxuryButton>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <button
                onClick={handlePrevious}
                className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white rounded-full p-2 backdrop-blur-sm transition-all",
                    isLight ? "bg-[#6f4aa6]/70 hover:bg-[#6f4aa6]/90" : "bg-black/30 hover:bg-black/50"
                )}
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button
                onClick={handleNext}
                className={cn(
                    "absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white rounded-full p-2 backdrop-blur-sm transition-all",
                    isLight ? "bg-[#6f4aa6]/70 hover:bg-[#6f4aa6]/90" : "bg-black/30 hover:bg-black/50"
                )}
                aria-label="Next slide"
            >
                <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                {items.map((_, index) => (
                    <button
                        key={index}
                        className={cn(
                            "w-3 h-3 rounded-full transition-all duration-300",
                            index === currentIndex
                                ? isLight
                                    ? "bg-[#6f4aa6] scale-125"
                                    : "bg-primary scale-125"
                                : "bg-white/50 hover:bg-white/80"
                        )}
                        onClick={() => {
                            setDirection(index > currentIndex ? 1 : -1)
                            setCurrentIndex(index)
                            if (timeoutRef.current) {
                                clearTimeout(timeoutRef.current)
                            }
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}