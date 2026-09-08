"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface PhotoGalleryProps {
    photos: {
        url: string
        alt: string
    }[]
    className?: string
}

export function PhotoGallery({ photos, className }: PhotoGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const goToPrevious = () => {
        const isFirstPhoto = currentIndex === 0
        const newIndex = isFirstPhoto ? photos.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const goToNext = () => {
        const isLastPhoto = currentIndex === photos.length - 1
        const newIndex = isLastPhoto ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    const goToPhoto = (index: number) => {
        setCurrentIndex(index)
    }

    if (!photos || photos.length === 0) {
        return null
    }

    return (
        <div className={cn("relative w-full", className)}>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                    <Image
                        src={photos[currentIndex].url || "/placeholder.svg"}
                        alt={photos[currentIndex].alt || "Photo de galerie"}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={currentIndex === 0}
                    />
                </div>

                {/* Navigation buttons */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
                    aria-label="Photo précédente"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                    onClick={goToNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
                    aria-label="Photo suivante"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>

                {/* Fullscreen button */}
                <Dialog>
                    <DialogTrigger asChild>
                        <button
                            className="absolute right-2 top-2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
                            aria-label="Voir en plein écran"
                        >
                            <Expand className="h-5 w-5" />
                        </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black/90">
                        <div className="relative h-[80vh] w-full">
                            <Image
                                src={photos[currentIndex].url || "/placeholder.svg"}
                                alt={photos[currentIndex].alt || "Photo de galerie"}
                                fill
                                className="object-contain"
                                sizes="90vw"
                            />
                            <button
                                onClick={goToPrevious}
                                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/50"
                                aria-label="Photo précédente"
                            >
                                <ChevronLeft className="h-8 w-8" />
                            </button>
                            <button
                                onClick={goToNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/50"
                                aria-label="Photo suivante"
                            >
                                <ChevronRight className="h-8 w-8" />
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Photo counter */}
                <div className="absolute bottom-2 right-2 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm">
                    {currentIndex + 1} / {photos.length}
                </div>
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {photos.map((photo, index) => (
                    <button
                        key={index}
                        onClick={() => goToPhoto(index)}
                        className={cn(
                            "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all",
                            currentIndex === index ? "border-primary" : "border-transparent hover:border-primary/50",
                        )}
                    >
                        <Image
                            src={photo.url || "/placeholder.svg"}
                            alt={photo.alt || `Miniature ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="96px"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}
