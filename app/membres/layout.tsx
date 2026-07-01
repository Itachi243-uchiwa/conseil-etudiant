"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { Toaster } from "@/components/ui/toaster"

export default function MembresLayout({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            {/* z-[60] dépasse le header du site (z-50) pour éviter tout chevauchement */}
            <div className="fixed inset-0 z-[60] bg-background overflow-y-auto">
                {children}
            </div>
            <Toaster />
        </SessionProvider>
    )
}
