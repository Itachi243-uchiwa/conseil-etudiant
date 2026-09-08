"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Text3DProps {
  children: ReactNode
  className?: string
  depth?: number
  color?: string
  shadowColor?: string
}

export default function Text3D({
  children,
  className,
  depth = 5,
  color = "hsl(var(--primary))",
  shadowColor = "rgba(0, 0, 0, 0.2)",
}: Text3DProps) {
  const textShadow = Array.from({ length: depth })
    .map((_, i) => {
      return `${i + 1}px ${i + 1}px 0 ${shadowColor}`
    })
    .join(", ")

  return (
    <motion.div
      className={cn("font-bold", className)}
      style={{
        color,
        textShadow,
        transform: "translateZ(0)",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  )
}
