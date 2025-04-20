"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface HeroCarouselItem {
  title: string
  description: string
}

interface Hero3DCarouselProps {
  items: HeroCarouselItem[]
  interval?: number
  className?: string
}

export default function Hero3DCarousel({ items, interval = 3000, className }: Hero3DCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
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
  }, [currentIndex, interval, items.length])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        rotateY: { duration: 0.8, ease: "easeOut" },
        scale: { duration: 0.8, ease: "easeOut" },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      rotateY: direction > 0 ? -45 : 45,
      scale: 0.8,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        rotateY: { duration: 0.8, ease: "easeOut" },
        scale: { duration: 0.8, ease: "easeOut" },
      },
    }),
  }

  return (
    <div className={cn("relative overflow-hidden perspective-container", className)}>
      <div className="h-full w-full flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-full text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gold-gradient">{items[currentIndex].title}</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">{items[currentIndex].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-4">
        {items.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentIndex ? "bg-primary scale-125" : "bg-primary/30 hover:bg-primary/50",
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
