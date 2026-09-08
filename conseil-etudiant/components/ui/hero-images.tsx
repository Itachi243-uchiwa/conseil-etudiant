"use client"

import { useEffect, useState } from "react"

interface HeroImage {
  title: string
  description: string
  imageUrl: string
}

const heroImages: HeroImage[] = [
  {
    title: "Conseil Étudiant HE2B",
    description: "Votre voix au sein de l'institution",
    imageUrl: "/placeholder.svg?height=800&width=1200&text=Conseil+Étudiant",
  },
  {
    title: "Représentation Étudiante",
    description: "Défendre vos droits et vos intérêts",
    imageUrl: "/placeholder.svg?height=800&width=1200&text=Représentation+Étudiante",
  },
  {
    title: "Services & Soutien",
    description: "Accompagnement juridique, financier et pédagogique",
    imageUrl: "/placeholder.svg?height=800&width=1200&text=Services+et+Soutien",
  },
  {
    title: "Événements & Vie Étudiante",
    description: "Animations, soirées et activités culturelles",
    imageUrl: "/placeholder.svg?height=800&width=1200&text=Événements+et+Vie+Étudiante",
  },
]

export function useHeroImages() {
  const [images, setImages] = useState<{ title: string; description: string; image: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const generatedImages = heroImages.map((item) => ({
      title: item.title,
      description: item.description,
      image: item.imageUrl,
    }))

    setImages(generatedImages)
    setIsLoading(false)
  }, [])

  return { images, isLoading }
}
