"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

interface EventImageProps {
  title: string
  width: number
  height: number
  className?: string
}

export default function EventImage({ title, width, height, className }: EventImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = width
    canvas.height = height

    // Fill background
    ctx.fillStyle = "#1a1a1a"
    ctx.fillRect(0, 0, width, height)

    // Add some decorative elements
    ctx.fillStyle = "rgba(255, 215, 0, 0.1)"
    ctx.beginPath()
    ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.4, 0, Math.PI * 2)
    ctx.fill()

    // Add text
    ctx.font = `bold ${Math.min(width, height) * 0.08}px Arial, sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#ffffff"
    ctx.fillText(title, width / 2, height / 2)

    // Add "HE2B" watermark
    ctx.font = `bold ${Math.min(width, height) * 0.05}px Arial, sans-serif`
    ctx.fillStyle = "rgba(255, 215, 0, 0.2)"
    ctx.fillText("HE2B", width / 2, height * 0.8)
  }, [width, height, title])

  return (
    <div className={className}>
      <canvas ref={canvasRef} className="hidden" />
      <Image
        src={`/placeholder.svg?height=${height}&width=${width}&text=${encodeURIComponent(title)}`}
        alt={title}
        width={width}
        height={height}
        className="rounded-lg object-cover"
      />
    </div>
  )
}
