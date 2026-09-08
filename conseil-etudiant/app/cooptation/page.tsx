import type { Metadata } from "next"
import JoinForm from "@/components/join/join-form"
import ParallaxBackground from "@/components/ui/parallax-background"

export const metadata: Metadata = {
    title: "Cooptation | Conseil Étudiant HE2B",
    description: "Rejoignez le Conseil Étudiant HE2B par cooptation",
}

export default function CooptationPage() {
    return (
        <div className="relative">
            <div className="hidden lg:block">
                <ParallaxBackground />
            </div>

            <div className="container pt-16 py-6 md:py-20 px-4 md:px-8">
                <header className="max-w-4xl mx-auto mb-8 md:mb-16 text-center">
                    <h1 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 animate-slide-in-bottom">
                        Candidature par Cooptation
                    </h1>
                    <p className="text-base md:text-xl text-muted-foreground animate-slide-in-bottom animate-delay-200">
                        Rejoignez notre équipe en cours d'année et contribuez à améliorer la vie étudiante à la HE2B.
                    </p>
                </header>

                <div className="animate-slide-in-bottom animate-delay-400">
                    <JoinForm />
                </div>
            </div>
        </div>
    )
}
