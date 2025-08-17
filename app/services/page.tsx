import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Briefcase, Coins, FileText, GraduationCap, Scale} from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"
import { getServices } from "@/lib/api"
import { generateMetadata, generateStructuredData } from "@/lib/seo"
import { StructuredData } from "@/components/StructuredData"

export const metadata: Metadata = generateMetadata({
    title: "Services aux Étudiants - Accompagnement et Soutien",
    description: "Découvrez tous les services gratuits du Conseil Étudiant HE2B : aide juridique, soutien financier, accompagnement pédagogique et bien plus pour réussir vos études.",
    keywords: ['services étudiants', 'aide juridique', 'soutien financier', 'accompagnement', 'assistance', 'conseil'],
    url: '/services'
});

interface ServiceItem {
    id: number
    title: string
    description: string
    content: string
    image: string
    icon: string
    slug: string
    featured: boolean
    createdAt: string
    updatedAt: string
}

const iconMap: Record<string, any> = {
    'scale': Scale,
    'coins': Coins,
    'graduation-cap': GraduationCap,
    'book-open': BookOpen,
    'file-text': FileText,
    'briefcase': Briefcase,
}

const getIcon = (iconName: string) => {
    return iconMap[iconName] || Scale
}

export default async function ServicesPage() {
    const services: ServiceItem[] = await getServices() || []

    const structuredData = generateStructuredData('organization', {});

    return (
        <>
            <StructuredData data={structuredData}/>
            <div className="relative">
                <ParallaxBackground/>

                <div className="container py-12 md:py-20">
                    <header className="max-w-4xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Services aux Étudiants</h1>
                        <p className="text-xl text-muted-foreground">
                            Le Conseil Étudiant HE2B propose une variété de services gratuits pour accompagner les
                            étudiants tout au long de leur
                            parcours académique. Découvrez nos services et n'hésitez pas à nous contacter pour plus
                            d'informations.
                        </p>
                    </header>

                    <main>
                        {services.length === 0 ? (
                            <section className="text-center py-12">
                                <h2 className="text-2xl font-semibold mb-4">Services en préparation</h2>
                                <p className="text-muted-foreground">Nos services seront bientôt disponibles. Revenez
                                    prochainement !</p>
                            </section>
                        ) : (
                            <>
                                <section aria-labelledby="services-list">
                                    <h2 id="services-list" className="sr-only">Liste de nos services</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                                        {services.map((service) => {
                                            const IconComponent = getIcon(service.icon)
                                            return (
                                                <article key={service.id}>
                                                    <Card className="tilt-on-hover card-shine h-full flex flex-col">
                                                        <CardHeader>
                                                            <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit"
                                                                 aria-hidden="true">
                                                                <IconComponent className="h-6 w-6 text-primary"/>
                                                            </div>
                                                            <CardTitle>
                                                                <h3>{service.title}</h3>
                                                            </CardTitle>
                                                            <CardDescription>{service.description}</CardDescription>
                                                        </CardHeader>
                                                        <CardContent className="flex-grow">
                                                            <p className="text-muted-foreground line-clamp-3">{service.content}</p>
                                                        </CardContent>
                                                        <CardFooter>
                                                            <Button asChild>
                                                                <Link href={`/services/${service.slug}`}
                                                                      aria-label={`En savoir plus sur ${service.title}`}>
                                                                    En savoir plus
                                                                </Link>
                                                            </Button>
                                                        </CardFooter>
                                                    </Card>
                                                </article>
                                            )
                                        })}
                                    </div>
                                </section>

                                <section className="flex justify-center mb-16">
                                    <Button variant="outline" size="lg">
                                        Découvrir tous nos services
                                    </Button>
                                </section>
                            </>
                        )}

                        <section className="grid md:grid-cols-2 gap-12 items-center bg-muted/30 rounded-lg p-8"
                                 aria-labelledby="how-to-access">
                            <div>
                                <h2 id="how-to-access" className="text-2xl font-bold mb-4">Comment accéder à nos
                                    services ?</h2>
                                <p className="mb-4">
                                    Tous nos services sont gratuits et accessibles à tous les étudiants de la HE2B. Pour
                                    bénéficier de nos
                                    services, vous pouvez :
                                </p>
                                <ul className="space-y-2 mb-6" role="list">
                                    <li className="flex items-start" role="listitem">
                                        <span className="text-primary font-bold mr-2" aria-hidden="true">•</span>
                                        <span>
                      Nous contacter par email à{" "}
                                            <a
                                                href="mailto:services@cehe2b.be"
                                                className="text-primary hover:underline"
                                                aria-label="Envoyer un email aux services du Conseil Étudiant"
                                            >
                        services@cehe2b.be
                      </a>
                    </span>
                                    </li>
                                    <li className="flex items-start" role="listitem">
                                        <span className="text-primary font-bold mr-2" aria-hidden="true">•</span>
                                        <span>Venir nous rencontrer dans nos bureaux sur les différents campus de la HE2B</span>
                                    </li>
                                    <li className="flex items-start" role="listitem">
                                        <span className="text-primary font-bold mr-2" aria-hidden="true">•</span>
                                        <span>Nous contacter via notre formulaire en ligne</span>
                                    </li>
                                </ul>
                                <Button asChild>
                                    <Link href="/contact">Nous contacter</Link>
                                </Button>
                            </div>
                            <div className="perspective-container">
                                <div className="card-3d card-shine rounded-lg overflow-hidden">
                                    <Image
                                        src="/placeholder.svg?height=600&width=800"
                                        alt="Étudiants bénéficiant des services du Conseil Étudiant HE2B"
                                        width={800}
                                        height={600}
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    )
}
