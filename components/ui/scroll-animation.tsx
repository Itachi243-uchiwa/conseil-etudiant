"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  once?: boolean
}

export default function ScrollAnimation({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
}: ScrollAnimationProps) {
  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  }

  const initial = {
    opacity: 0,
    ...directionMap[direction],
  }

  return (
    <motion.div
      className={cn(className)}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  )
}
