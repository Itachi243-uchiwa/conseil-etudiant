"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface LuxuryHeadingProps {
  children: ReactNode
  className?: string
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  withAccent?: boolean
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export function LuxuryHeading({ children, className, level = "h2", withAccent = true, as }: LuxuryHeadingProps) {
  const Component = as || level

  return (
    <div className={cn("relative", className)}>
      <Component className={cn("relative z-10 font-bold", withAccent ? "gold-gradient" : "")}>{children}</Component>
      {withAccent && (
        <div className="absolute -bottom-2 left-0 h-[3px] w-20 bg-gradient-to-r from-[#3F3290] to-[#4b3db0]"></div>
      )}
    </div>
  )
}

export default LuxuryHeading
