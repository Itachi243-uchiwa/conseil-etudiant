"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface CounterProps {
  from: number
  to: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
}

export default function Counter({ from, to, duration = 2, className, prefix = "", suffix = "" }: CounterProps) {
  const [count, setCount] = useState(from)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      let startTime: number
      let animationFrameId: number

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        const currentCount = Math.floor(progress * (to - from) + from)

        setCount(currentCount)

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step)
        }
      }

      animationFrameId = requestAnimationFrame(step)

      return () => cancelAnimationFrame(animationFrameId)
    }
  }, [from, to, duration, inView])

  return (
    <motion.span
      ref={ref}
      className={cn("font-bold", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {prefix}
      {count}
      {suffix}
    </motion.span>
  )
}
