"use client"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface LogoProps {
  className?: string
}

export default function LogoClient({ className }: LogoProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Après le montage du composant, on peut accéder au thème côté client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Pendant le rendu côté serveur ou avant le montage, on utilise un rendu par défaut
  if (!mounted) {
    return (
      <svg viewBox="0 0 100 100" className={cn("h-8 w-8", className)} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#bf953f" />
            <stop offset="25%" stopColor="#fcf6ba" />
            <stop offset="50%" stopColor="#b38728" />
            <stop offset="75%" stopColor="#fbf5b7" />
            <stop offset="100%" stopColor="#aa771c" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <circle cx="30" cy="30" r="15" fill="url(#goldGradient)" filter="url(#glow)" />
        <circle cx="70" cy="30" r="15" className="fill-secondary" filter="url(#glow)" />
        <circle cx="50" cy="70" r="15" className="fill-tertiary" filter="url(#glow)" />
        <path d="M30 30 L70 30 L50 70 Z" fill="none" stroke="url(#goldGradient)" strokeWidth="3" filter="url(#glow)" />
      </svg>
    )
  }

  // Après le montage, on peut utiliser le thème pour le rendu
  const isLight = theme === "light" || resolvedTheme === "light"

  return (
    <svg viewBox="0 0 100 100" className={cn("h-8 w-8", className)} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={isLight ? "#1E88E5" : "#BF953F"} />
          <stop offset="25%" stopColor={isLight ? "#42A5F5" : "#FCF6BA"} />
          <stop offset="50%" stopColor={isLight ? "#2196F3" : "#B38728"} />
          <stop offset="75%" stopColor={isLight ? "#64B5F6" : "#FBF5B7"} />
          <stop offset="100%" stopColor={isLight ? "#1976D2" : "#AA771C"} />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <circle cx="30" cy="30" r="15" fill="url(#goldGradient)" filter="url(#glow)" />
      <circle cx="70" cy="30" r="15" className="fill-secondary" filter="url(#glow)" />
      <circle cx="50" cy="70" r="15" className="fill-tertiary" filter="url(#glow)" />
      <path d="M30 30 L70 30 L50 70 Z" fill="none" stroke="url(#goldGradient)" strokeWidth="3" filter="url(#glow)" />
    </svg>
  )
}
