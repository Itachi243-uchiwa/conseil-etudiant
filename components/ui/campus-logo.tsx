"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CampusLogoProps {
  campus: "defre" | "nivelles" | "isib" | "ises" | "isek" | "iessid" | "esi"
  className?: string
}

export default function CampusLogo({ campus, className }: CampusLogoProps) {
  // Définir les couleurs pour chaque campus selon la palette fournie
  const campusColors = {
    defre: "#3F3290", // Violet
    nivelles: "#FF4E6A", // Rose
    isib: "#00BFA2", // Turquoise
    ises: "#3F3290", // Violet
    isek: "#FF4E6A", // Rose
    iessid: "#00BFA2", // Turquoise
    esi: "#3F3290", // Violet
  }

  // Définir les couleurs de texte pour assurer la lisibilité
  const textColors = {
    defre: "#FFFFFF", // Blanc sur Violet
    nivelles: "#FFFFFF", // Blanc sur Rose
    isib: "#FFFFFF", // Blanc sur Turquoise
    ises: "#FFFFFF", // Blanc sur Violet
    isek: "#FFFFFF", // Blanc sur Rose
    iessid: "#FFFFFF", // Blanc sur Turquoise
    esi: "#FFFFFF", // Blanc sur Violet
  }

  const color = campusColors[campus]
  const textColor = textColors[campus]

  return (
    <motion.div
      className={cn(`relative cursor-pointer campus-logo ${campus}`, className)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`gradient-${campus}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Cercle principal */}
        <circle cx="100" cy="100" r="90" fill={`url(#gradient-${campus})`} />
        <circle cx="100" cy="100" r="80" fill="white" fillOpacity="0.1" />

        {/* Logo CE stylisé */}
        <g transform="translate(50, 60) scale(0.5)">
          <path
            fill={textColor}
            d="M124.36,89.75v43.2l-42.19,0.09V40.45h42.19v13.19H95.66v20.18h24.4v12.19H95.66v3.83L124.36,89.75z"
          />
          <path
            fill={textColor}
            d="M65.14,99.17l14.62,16.75c-12.01,10.19-20.34,11.27-30.32,11.27c-25.62,0-39.02-23.4-39.02-39.04v-1.92c0-15.64,13.4-39.04,39.02-39.04c9.98,0,18.31,1.08,30.32,11.27l-14.62,16.75c-2.53-1.28-8.67-7.49-15.7-7.49c-7.76,0-18.49,10.73-18.49,18.52v1.92c0,7.79,10.73,18.52,18.49,18.52C56.47,106.66,62.61,100.46,65.14,99.17z"
          />
        </g>

        {/* Texte du campus */}
        <text
          x="100"
          y="150"
          textAnchor="middle"
          fill={textColor}
          fontWeight="bold"
          fontSize="18"
          textTransform="uppercase"
        >
          {campus}
        </text>
      </svg>
    </motion.div>
  )
}
