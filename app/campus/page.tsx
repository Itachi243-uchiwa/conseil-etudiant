import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import CampusLogo from "@/components/ui/campusLogo"
import ParallaxBackground from "@/components/ui/parallax-background"
import { getCampus } from "@/lib/api"
import { generateMetadata, generateStructuredData } from "@/lib/seo"
import { StructuredData } from "@/components/StructuredData"

interface CampusDto {
    id: number
    name: string
    slug: string
    fullName: string
    address: string
    description: string
    longDescription: string
    image: string
    color: string
    phone: string
    email: string
    website: string
    sections: string[]
    facilities: string[]
}

export const metadata: Metadata = generateMetadata({
    title: "Nos Campus - Découvrez les Sites de la HE2B",
    description:
        "Explorez les différents campus de la Haute École Bruxelles-Brabant (HE2B). Chaque campus offre des formations spécialisées et des infrastructures modernes pour votre réussite.",
    keywords: ["campus", "sites", "formations", "infrastructures", "localisation", "spécialisations"],
    url: "/campus",
})

export default async function CampusPage() {
    const campuses: CampusDto[] = await getCampus()

    const structuredData = generateStructuredData("organization", {})

    return (
        <>
            <StructuredData data={structuredData} />
            <div className="relative">
                <div className="hidden md:block">
                    <ParallaxBackground />
                </div>

                <div className="container pt-20 py-12 md:py-24 px-4 md:px-6">
                    <header className="max-w-4xl mx-auto mb-8 md:mb-12 animate-slide-in-bottom">
                        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-center">Nos Campus HE2B</h1>
                        <p className="text-base md:text-lg text-center mb-8 md:mb-12 max-w-3xl mx-auto text-muted-foreground">
                            La Haute École Bruxelles-Brabant (HE2B) est répartie sur plusieurs campus, chacun spécialisé dans
                            différents domaines d'études. Découvrez nos sites et leurs spécificités.
                        </p>
                    </header>

                    <main>
                        <section aria-labelledby="campus-list">
                            <h2 id="campus-list" className="sr-only">
                                Liste des campus
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                                {campuses.map((campus, index) => {
                                    const cleanedColor = campus.color
                                    return (
                                        <article
                                            key={campus.id}
                                            className="animate-slide-in-bottom"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            <Link
                                                href={`/campus/${campus.slug}`}
                                                className="block group mobile-touch"
                                                aria-label={`Découvrir le campus ${campus.name}`}
                                            >
                                                <Card
                                                    className="h-full transition-all duration-300 hover:shadow-lg group-hover:transform group-hover:scale-[1.02] border-2 mobile-card"
                                                    style={{
                                                        borderColor: `${cleanedColor}66`,
                                                        boxShadow: `0 4px 6px -1px ${cleanedColor}33`,
                                                    }}
                                                >
                                                    <CardContent className="p-4 md:p-6 flex flex-col items-center">
                                                        <CampusLogo
                                                            campus={campus.slug as any}
                                                            className="w-20 h-20 md:w-32 md:h-32 mb-3 md:mb-4"
                                                            color={cleanedColor}
                                                        />
                                                        <h3
                                                            className="text-lg md:text-2xl font-bold mb-2 text-center"
                                                            style={{ color: cleanedColor }}
                                                        >
                                                            {campus.name}
                                                        </h3>
                                                        <p className="text-sm md:text-base text-muted-foreground text-center mb-3 md:mb-4 line-clamp-3">
                                                            {campus.description}
                                                        </p>
                                                        <address className="text-xs md:text-sm text-center text-muted-foreground not-italic">
                                                            {campus.address}
                                                        </address>

                                                        <div
                                                            className="w-full h-1 mt-3 md:mt-4 rounded-full"
                                                            style={{ backgroundColor: cleanedColor }}
                                                            aria-hidden="true"
                                                        />
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        </article>
                                    )
                                })}
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    )
}
