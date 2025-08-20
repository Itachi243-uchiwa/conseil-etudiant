"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface SlideItem {
  title: string
  description: string
  image: string
}

interface Hero3DSliderProps {
  items: SlideItem[]
  interval?: number
  className?: string
  autoPlay?: boolean
}

export default function Hero3DSlider({ items, interval = 5000, className, autoPlay = true }: Hero3DSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Après le montage du composant, on peut accéder au thème côté client
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (autoPlay && !isPaused) {
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
  }, [currentIndex, interval, items.length, autoPlay, isPaused])

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
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
      zIndex: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      zIndex: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        rotateY: { duration: 0.8, ease: "easeOut" },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -45 : 45,
      zIndex: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        rotateY: { duration: 0.8, ease: "easeOut" },
      },
    }),
  }

  // Pendant le rendu côté serveur ou avant le montage, on utilise un rendu par défaut
  if (!mounted) {
    return (
        <div className={cn("relative overflow-hidden perspective-container", className)}>
          <div className="h-full w-full flex items-center justify-center">
            <div className="absolute w-full h-full flex flex-col items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                    src={items[0].image || "/placeholder.svg"}
                    alt={items[0].title}
                    fill
                    className="object-cover rounded-xl opacity-100"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-background/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <h1 className="text-3xl md:text-6xl lg:text-6xl font-bold !text-white mb-6 purple-gradient-light">{items[0].title}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }

  // Après le montage, on peut utiliser le thème pour le rendu
  const isLight = theme === "light" || resolvedTheme === "light"

  return (
      <div
          className={cn("relative overflow-hidden perspective-container w-full h-full", className)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
      >
        <div className="h-full w-full flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full h-full flex flex-col items-center justify-center"
            >
              <div className="relative w-full h-full">
                <Image
                    src={items[currentIndex].image || "/placeholder.svg"}
                    alt={items[currentIndex].title}
                    fill
                    className="object-cover rounded-none opacity-100"
                    priority
                    sizes="100vw"
                />
                <div
                    className={cn(
                        "absolute inset-0",
                        isLight
                            ? "bg-gradient-to-t from-purple-800/25 via-purple-700/10 to-transparent"
                            : "bg-gradient-to-t from-background/50 via-background/20 to-transparent",
                    )}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <h1
                      className={cn(
                          "text-4xl md:text-6xl lg:text-7xl font-bold mb-6",
                          isLight ? "text-white drop-shadow-lg" : "purple-gradient-light",
                      )}
                  >
                    {items[currentIndex].title}
                  </h1>
                  <p className="text-xl md:text-2xl text-white drop-shadow-md max-w-3xl">
                    {items[currentIndex].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <button
            onClick={handlePrevious}
            className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white rounded-full p-2 backdrop-blur-sm transition-all",
                isLight ? "bg-purple-600/40 hover:bg-purple-600/60" : "bg-primary/50 hover:bg-primary/70",
            )}
            aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
            onClick={handleNext}
            className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white rounded-full p-2 backdrop-blur-sm transition-all",
                isLight ? "bg-purple-600/40 hover:bg-purple-600/60" : "bg-primary/50 hover:bg-primary/70",
            )}
            aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Navigation dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {items.map((_, index) => (
              <button
                  key={index}
                  className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      index === currentIndex
                          ? isLight
                              ? "bg-purple-600 scale-110"
                              : "bg-primary scale-110"
                          : "bg-white/50 hover:bg-white/80",
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
