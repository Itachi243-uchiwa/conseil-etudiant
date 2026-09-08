import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" className={cn("h-8 w-8", className)} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#BF953F" />
          <stop offset="25%" stopColor="#FCF6BA" />
          <stop offset="50%" stopColor="#B38728" />
          <stop offset="75%" stopColor="#FBF5B7" />
          <stop offset="100%" stopColor="#AA771C" />
        </linearGradient>
        <linearGradient id="colorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E88E5" />
          <stop offset="25%" stopColor="#42A5F5" />
          <stop offset="50%" stopColor="#2196F3" />
          <stop offset="75%" stopColor="#64B5F6" />
          <stop offset="100%" stopColor="#1976D2" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <circle
        cx="30"
        cy="30"
        r="15"
        fill="url(#goldGradient)"
        className="dark:fill-[url(#goldGradient)] light:fill-[url(#colorGradient)]"
        filter="url(#glow)"
      />
      <circle cx="70" cy="30" r="15" className="fill-secondary" filter="url(#glow)" />
      <circle cx="50" cy="70" r="15" className="fill-tertiary" filter="url(#glow)" />
      <path
        d="M30 30 L70 30 L50 70 Z"
        fill="none"
        stroke="url(#goldGradient)"
        className="dark:stroke-[url(#goldGradient)] light:stroke-[url(#colorGradient)]"
        strokeWidth="3"
        filter="url(#glow)"
      />
    </svg>
  )
}
