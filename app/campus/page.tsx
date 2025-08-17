import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import CampusLogo from "@/components/ui/campus-logo"
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
    description: "Explorez les différents campus de la Haute École Bruxelles-Brabant (HE2B). Chaque campus offre des formations spécialisées et des infrastructures modernes pour votre réussite.",
    keywords: ['campus', 'sites', 'formations', 'infrastructures', 'localisation', 'spécialisations'],
    url: '/campus'
});

export default async function CampusPage() {
    const campuses: CampusDto[] = await getCampus();

    const structuredData = generateStructuredData('organization', {});

    return (
        <>
            <StructuredData data={structuredData} />
            <div className="relative">
                <ParallaxBackground />

                <div className="container py-24">
                    <header className="max-w-4xl mx-auto mb-12">
                        <h1 className="text-4xl font-bold mb-6 text-center">
                            Nos Campus HE2B
                        </h1>
                        <p className="text-lg text-center mb-12 max-w-3xl mx-auto text-muted-foreground">
                            La Haute École Bruxelles-Brabant (HE2B) est répartie sur plusieurs campus, chacun spécialisé dans différents
                            domaines d'études. Découvrez nos sites et leurs spécificités.
                        </p>
                    </header>

                    <main>
                        <section aria-labelledby="campus-list">
                            <h2 id="campus-list" className="sr-only">Liste des campus</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {campuses.map((campus) => {
                                    const cleanedColor = campus.color
                                    return (
                                        <article key={campus.id}>
                                            <Link
                                                href={`/campus/${campus.slug}`}
                                                className="block group"
                                                aria-label={`Découvrir le campus ${campus.name}`}
                                            >
                                                <Card
                                                    className="h-full transition-all duration-300 hover:shadow-lg group-hover:transform group-hover:scale-[1.02] border-2"
                                                    style={{
                                                        borderColor: `${cleanedColor}66`,
                                                        boxShadow: `0 4px 6px -1px ${cleanedColor}33`,
                                                    }}
                                                >
                                                    <CardContent className="p-6 flex flex-col items-center">
                                                        <CampusLogo campus={campus.slug as any} className="w-32 h-32 mb-4" />
                                                        <h3
                                                            className="text-2xl font-bold mb-2 text-center"
                                                            style={{ color: cleanedColor }}
                                                        >
                                                            {campus.name}
                                                        </h3>
                                                        <p className="text-muted-foreground text-center mb-4">{campus.description}</p>
                                                        <address className="text-sm text-center text-muted-foreground not-italic">
                                                            {campus.address}
                                                        </address>

                                                        <div
                                                            className="w-full h-1 mt-4 rounded-full"
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