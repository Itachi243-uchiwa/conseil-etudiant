"use client"

import { Suspense, lazy } from "react"
import LoadingFallback from "@/components/ui/loading-fallback"
import { useInView } from "react-intersection-observer"

// Import dynamique et lazy du contenu 3D
const Scene3DContent = lazy(() => import("./scene-content"))

export default function Scene3D() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div ref={ref} className="w-full h-full">
      {inView && (
        <Suspense
          fallback={
            <LoadingFallback className="w-full h-full bg-muted/20 rounded-lg" message="Chargement de la scène 3D..." />
          }
        >
          <Scene3DContent />
        </Suspense>
      )}
    </div>
  )
}
