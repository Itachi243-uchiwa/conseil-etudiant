"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function ParallaxBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Utiliser le même rendu pour le serveur et le client non-monté
  // Utiliser un fond très simple qui fonctionne dans les deux thèmes
  if (!mounted) {
    return (
      <div className="parallax-bg">
        <div className="absolute inset-0 bg-background z-[-1]"></div>
      </div>
    )
  }

  // Après le montage, on peut utiliser le thème pour le rendu
  const isLight = theme === "light"

  if (isLight) {
    return (
      <div className="parallax-bg">
        {/* Fond bleu très clair */}
        <div className="absolute inset-0 bg-[#f8f9ff] z-[-1]"></div>

        {/* Dégradés subtils */}
        <motion.div
          className="absolute rounded-full bg-[#3F3290]/5 blur-3xl"
          animate={{
            x: mousePosition.x * 0.01,
            y: mousePosition.y * 0.01,
          }}
          transition={{ type: "spring", stiffness: 50 }}
          style={{
            width: "400px",
            height: "400px",
            top: "10%",
            left: "10%",
            zIndex: -1,
          }}
        ></motion.div>
        <motion.div
          className="absolute rounded-full bg-[#FF4E6A]/5 blur-3xl"
          animate={{
            x: mousePosition.x * -0.01,
            y: mousePosition.y * -0.01,
          }}
          transition={{ type: "spring", stiffness: 50 }}
          style={{
            width: "300px",
            height: "300px",
            bottom: "20%",
            right: "15%",
            zIndex: -1,
          }}
        ></motion.div>
        <motion.div
          className="absolute rounded-full bg-[#00BFA2]/5 blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: "spring", stiffness: 50 }}
          style={{
            width: "350px",
            height: "350px",
            top: "40%",
            right: "30%",
            zIndex: -1,
          }}
        ></motion.div>
      </div>
    )
  }

  return (
    <div className="parallax-bg">
      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] z-[-1] pointer-events-none noise-bg"></div>

      {/* Diamond pattern */}
      <div className="absolute inset-0 opacity-[0.05] z-[-1] pointer-events-none diamond-pattern"></div>

      {/* Glowing orbs */}
      <motion.div
        className="parallax-item blob-animation"
        animate={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * 0.02,
        }}
        transition={{ type: "spring", stiffness: 50 }}
        style={{
          top: "10%",
          left: "10%",
          width: "30vw",
          height: "30vw",
          background: "radial-gradient(circle, hsla(36, 100%, 50%, 0.15) 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="parallax-item blob-animation"
        animate={{
          x: mousePosition.x * -0.01,
          y: mousePosition.y * -0.01,
        }}
        transition={{ type: "spring", stiffness: 50 }}
        style={{
          top: "50%",
          right: "10%",
          width: "25vw",
          height: "25vw",
          background: "radial-gradient(circle, hsla(219, 96%, 62%, 0.15) 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="parallax-item blob-animation"
        animate={{
          x: mousePosition.x * 0.015,
          y: mousePosition.y * 0.015,
        }}
        transition={{ type: "spring", stiffness: 50 }}
        style={{
          bottom: "10%",
          left: "30%",
          width: "20vw",
          height: "20vw",
          background: "radial-gradient(circle, hsla(330, 80%, 60%, 0.15) 0%, transparent 70%)",
        }}
      />

      {/* Subtle grid lines */}
      <div className="absolute inset-0 bg-mesh opacity-[0.05] z-[-1] pointer-events-none"></div>

      {/* Subtle dots */}
      <div className="absolute inset-0 bg-dots opacity-[0.05] z-[-1] pointer-events-none"></div>

      {/* Glowing particles */}
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5 + 0.1,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: [null, Math.random() * window.innerWidth],
            y: [null, Math.random() * window.innerHeight],
            opacity: [null, Math.random() * 0.5 + 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            width: Math.random() * 4 + 2 + "px",
            height: Math.random() * 4 + 2 + "px",
            background: `hsl(${Math.random() * 60 + 30}, 100%, 50%)`,
            boxShadow: `0 0 ${Math.random() * 10 + 5}px hsl(${Math.random() * 60 + 30}, 100%, 50%)`,
          }}
        />
      ))}
    </div>
  )
}
