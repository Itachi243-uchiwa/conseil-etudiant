"use client"

import { type ReactNode, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LuxuryCardProps {
  children: ReactNode
  className?: string
  glowOnHover?: boolean
  animatedBorder?: boolean
}

export default function LuxuryCard({
  children,
  className,
  glowOnHover = true,
  animatedBorder = false,
}: LuxuryCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={cn(
        "luxury-card rounded-lg overflow-hidden",
        glowOnHover && "glow-on-hover",
        animatedBorder && "animated-border",
        className,
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
    >
      {children}

      {/* Subtle glow effect on hover */}
      {glowOnHover && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "radial-gradient(circle at center, hsla(var(--primary) / 0.2) 0%, transparent 70%)",
            zIndex: -1,
          }}
        />
      )}
    </motion.div>
  )
}
