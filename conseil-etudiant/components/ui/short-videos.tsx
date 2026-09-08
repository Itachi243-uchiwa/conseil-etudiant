"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ShortVideo {
    id: number
    title: string
    videoUrl: string
    thumbnail: string
    duration: string
}

interface ShortVideosProps {
    videos: ShortVideo[]
    className?: string
}

export function ShortVideos({ videos, className }: ShortVideosProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)

    const currentVideo = videos[currentIndex]

    useEffect(() => {
        // Reset video state when changing videos
        setIsPlaying(false)
        if (videoRef.current) {
            videoRef.current.currentTime = 0
        }
    }, [currentIndex])

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play().catch((error) => {
                    console.error("Error playing video:", error)
                    setIsPlaying(false)
                })
            } else {
                videoRef.current.pause()
            }
        }
    }, [isPlaying])

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    const toggleMute = () => {
        setIsMuted(!isMuted)
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
        }
    }

    const goToPrevious = () => {
        const isFirstVideo = currentIndex === 0
        const newIndex = isFirstVideo ? videos.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const goToNext = () => {
        const isLastVideo = currentIndex === videos.length - 1
        const newIndex = isLastVideo ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    if (!videos || videos.length === 0) {
        return null
    }

    return (
        <div className={cn("relative w-full", className)}>
            <div className="relative aspect-[9/16] max-h-[70vh] w-full overflow-hidden rounded-xl bg-black">
                {/* Video */}
                <video
                    ref={videoRef}
                    src={currentVideo.videoUrl}
                    poster={currentVideo.thumbnail}
                    muted={isMuted}
                    loop
                    playsInline
                    className="h-full w-full object-contain"
                    onClick={togglePlay}
                />

                {/* Overlay for controls */}
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                    {/* Top controls */}
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white drop-shadow-md">{currentVideo.title}</h3>
                        <span className="rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
              {currentIndex + 1} / {videos.length}
            </span>
                    </div>

                    {/* Center play button (only visible when paused) */}
                    {!isPlaying && (
                        <button
                            onClick={togglePlay}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/30 p-4 text-white backdrop-blur-sm transition-all hover:bg-black/50"
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            <Play className="h-8 w-8" fill="white" />
                        </button>
                    )}

                    {/* Bottom controls */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={toggleMute}
                            className="rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
                            aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </button>

                        <div className="flex gap-2">
                            <button
                                onClick={togglePlay}
                                className="rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
                                aria-label={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" fill="white" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Navigation buttons */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
                    aria-label="Vidéo précédente"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                    onClick={goToNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
                    aria-label="Vidéo suivante"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {videos.map((video, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={cn(
                            "relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all",
                            currentIndex === index ? "border-primary" : "border-transparent hover:border-primary/50",
                        )}
                    >
                        <Image
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={`Miniature de ${video.title}`}
                            fill
                            className="object-cover"
                            sizes="64px"
                        />
                        <div className="absolute bottom-1 right-1 rounded-sm bg-black/70 px-1 text-[10px] text-white">
                            {video.duration}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}
