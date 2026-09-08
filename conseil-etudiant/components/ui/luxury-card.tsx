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
                                       animatedBorder = false,
                                   }: LuxuryCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            className={cn(
                "luxury-card rounded-lg overflow-hidden",
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

            {/* L'effet glow violet a été supprimé */}
        </motion.div>
    )
}