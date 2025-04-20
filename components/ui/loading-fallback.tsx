import { Loader2 } from "lucide-react"

interface LoadingFallbackProps {
  message?: string
  className?: string
}

export default function LoadingFallback({ message = "Chargement...", className = "" }: LoadingFallbackProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-4 space-y-2 ${className}`}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  )
}
