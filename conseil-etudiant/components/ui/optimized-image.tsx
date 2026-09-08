"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  lowQualitySrc?: string
  loadingClassName?: string
}

export default function OptimizedImage({
  src,
  alt,
  lowQualitySrc,
  className,
  loadingClassName,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px", // Préchargement quand l'image est à 200px du viewport
  })

  // Utiliser une image de faible qualité ou un placeholder pendant le chargement
  const placeholderSrc =
    lowQualitySrc ||
    (typeof src === "string" && src.startsWith("/placeholder.svg") ? src : "/placeholder.svg?height=100&width=100")

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {/* Image de faible qualité ou placeholder */}
      {!isLoaded && (
        <Image
          src={placeholderSrc || "/placeholder.svg"}
          alt={alt}
          className={cn("transition-opacity duration-300", loadingClassName)}
          {...props}
        />
      )}

      {/* Image réelle (chargée uniquement quand elle est dans le viewport) */}
      {inView && (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          className={cn("transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0", className)}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      )}
    </div>
  )
}
