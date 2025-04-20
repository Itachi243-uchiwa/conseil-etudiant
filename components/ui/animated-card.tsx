"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
}

export default function AnimatedCard({ children, className }: AnimatedCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [scale, setScale] = useState(1)

  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()

    const cardCenterX = rect.left + rect.width / 2
    const cardCenterY = rect.top + rect.height / 2

    const mouseX = e.clientX
    const mouseY = e.clientY

    const rotateYValue = ((mouseX - cardCenterX) / (rect.width / 2)) * 10
    const rotateXValue = ((cardCenterY - mouseY) / (rect.height / 2)) * 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
    setScale(1.05)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setScale(1)
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn("perspective-container", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
        scale,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  )
}
