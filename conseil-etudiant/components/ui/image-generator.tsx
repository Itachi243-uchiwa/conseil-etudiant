"use client"

import { useEffect, useRef, useState } from "react"

interface ImageGeneratorProps {
  width: number
  height: number
  text: string
  theme?: "gold" | "blue" | "purple" | "dark"
  className?: string
}

export default function ImageGenerator({ width, height, text, theme = "gold", className }: ImageGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dataUrl, setDataUrl] = useState<string>("")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = width
    canvas.height = height

    // Theme colors
    const themeColors = {
      gold: {
        gradient: ["#BF953F", "#FCF6BA", "#B38728", "#FBF5B7"],
        text: "#000000",
        background: "#111111",
      },
      blue: {
        gradient: ["#1E3B70", "#29539B", "#1E3B70"],
        text: "#FFFFFF",
        background: "#0A1428",
      },
      purple: {
        gradient: ["#4A1E70", "#7A29B0", "#4A1E70"],
        text: "#FFFFFF",
        background: "#0A0A14",
      },
      dark: {
        gradient: ["#1A1A1A", "#2A2A2A", "#1A1A1A"],
        text: "#FFFFFF",
        background: "#000000",
      },
    }

    const colors = themeColors[theme]

    // Draw background
    ctx.fillStyle = colors.background
    ctx.fillRect(0, 0, width, height)

    // Draw gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    colors.gradient.forEach((color, index) => {
      gradient.addColorStop(index / (colors.gradient.length - 1), color)
    })

    ctx.globalAlpha = 0.3
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
    ctx.globalAlpha = 1.0

    // Add some abstract shapes
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const radius = Math.random() * 100 + 50

      const shapeGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      const gradientColor = colors.gradient[Math.floor(Math.random() * colors.gradient.length)]
      shapeGradient.addColorStop(0, `${gradientColor}40`) // 25% opacity
      shapeGradient.addColorStop(1, `${colors.background}00`) // 0% opacity

      ctx.fillStyle = shapeGradient
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    // Add some lines
    ctx.strokeStyle = `${colors.gradient[0]}30` // 20% opacity
    ctx.lineWidth = 2

    for (let i = 0; i < 5; i++) {
      const x1 = Math.random() * width
      const y1 = Math.random() * height
      const x2 = Math.random() * width
      const y2 = Math.random() * height

      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }

    // Draw text
    const fontSize = Math.min(width, height) * 0.1
    ctx.font = `bold ${fontSize}px Arial, sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Text shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
    ctx.fillText(text, width / 2 + 3, height / 2 + 3)

    // Actual text
    ctx.fillStyle = colors.text
    ctx.fillText(text, width / 2, height / 2)

    // Add a subtle logo or watermark
    const logoSize = Math.min(width, height) * 0.2
    ctx.font = `bold ${logoSize}px Arial, sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = `${colors.text}20` // 10% opacity
    ctx.fillText("HE2B", width / 2, height * 0.8)

    // Convert canvas to data URL
    setDataUrl(canvas.toDataURL("image/png"))
  }, [width, height, text, theme])

  return (
    <>
      <canvas ref={canvasRef} className="hidden" />
      {dataUrl && (
        <img src={dataUrl || "/placeholder.svg"} alt={text} width={width} height={height} className={className} />
      )}
    </>
  )
}
