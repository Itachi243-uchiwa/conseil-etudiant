import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"
import { getNews } from "@/lib/api"
import { generateMetadata, generateStructuredData } from "@/lib/seo"
import { StructuredData } from "@/components/StructuredData"
import LuxuryHeading from "@/components/ui/luxury-heading";

export const metadata: Metadata = generateMetadata({
    title: "Actualités - Toutes les nouvelles du Conseil Étudiant",
    description:
        "Restez informé des dernières actualités, annonces et informations importantes du Conseil Étudiant HE2B. Découvrez nos projets, événements et initiatives pour les étudiants.",
    keywords: ["actualités", "nouvelles", "annonces", "informations", "projets étudiants", "initiatives"],
    url: "/news",
})

interface NewsItem {
    id: number
    title: string
    excerpt: string
    content: string
    date: string
    image: string
    slug: string
    featured: boolean
    tags?: string[]
    documents?: Array<{
        title: string
        url: string
    }>
    relatedLinks?: string[]
}

export default async function NewsPage() {
    const news: NewsItem[] = (await getNews()) || []

    const structuredData = generateStructuredData("organization", {})

    return (
        <>
            <StructuredData data={structuredData} />
            <div className="relative">
                <div className="hidden lg:block">
                    <ParallaxBackground />
                </div>

                <div className="container pt-20 py-3 md:py-20 px-4 md:px-8">
                    <header className="max-w-4xl mx-auto mb-4 md:mb-16">

                        <LuxuryHeading as="h1" className="text-4xl md:text-5xl mb-6 animate-fade-in-up">
                            Actualités du Conseil Étudiant
                        </LuxuryHeading>

                        <p className="text-sm md:text-xl text-muted-foreground animate-slide-in-bottom animate-delay-200 leading-relaxed">
                            Restez informé des dernières nouvelles du Conseil Étudiant HE2B. Retrouvez ici toutes nos actualités,
                            annonces et informations importantes pour la communauté étudiante.
                        </p>
                    </header>

                    <main>
                        {news.length === 0 ? (
                            <section className="text-center py-6 md:py-12">
                                <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">Aucune actualité disponible</h2>
                                <p className="text-muted-foreground text-sm md:text-base">
                                    Revenez bientôt pour découvrir nos dernières nouvelles !
                                </p>
                            </section>
                        ) : (
                            <>
                                <section aria-labelledby="recent-news">
                                    <h2 id="recent-news" className="sr-only">
                                        Actualités récentes
                                    </h2>

                                    <div className="lg:hidden space-y-4 mb-6">
                                        {news.map((item, index) => (
                                            <article
                                                key={item.id}
                                                className={`animate-slide-in-bottom animate-delay-${Math.min(index * 100, 500)}`}
                                            >
                                                <Link
                                                    href={`/news/${item.slug}`}
                                                    className="block mobile-card mobile-touch hover:scale-[1.01] transition-all duration-300 group"
                                                    aria-label={`Lire l'article: ${item.title}`}
                                                >
                                                    {item.image && (
                                                        <div className="relative aspect-[2/1] mb-3 rounded-lg overflow-hidden bg-muted">
                                                            <Image
                                                                src={item.image || "/placeholder.svg"}
                                                                alt={`Image de l'article: ${item.title}`}
                                                                fill
                                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="space-y-2">
                                                        <div className="flex items-center text-xs text-muted-foreground">
                                                            <CalendarDays
                                                                className="mr-2 h-3 w-3 text-primary animate-pulse-glow"
                                                                aria-hidden="true"
                                                            />
                                                            <time dateTime={item.date} className="font-medium">
                                                                {new Date(item.date).toLocaleDateString("fr-FR", {
                                                                    day: "numeric",
                                                                    month: "short",
                                                                    year: "numeric",
                                                                })}
                                                            </time>
                                                        </div>
                                                        <h3 className="font-semibold text-base mb-2 line-clamp-2 text-foreground group-hover:text-primary transition-colors leading-tight">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{item.excerpt}</p>
                                                        <div className="mt-3 text-sm text-primary font-medium animate-shimmer flex items-center">
                                                            Lire la suite
                                                            <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </article>
                                        ))}
                                    </div>

                                    <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                                        {news.map((item, index) => (
                                            <article key={item.id} className={`animate-fade-in-up animation-delay-${index * 100}`}>
                                                <Card className="tilt-on-hover card-shine h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:scale-105">
                                                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                                                        <Image
                                                            src={item.image || "/placeholder.svg"}
                                                            alt={`Image de l'article: ${item.title}`}
                                                            fill
                                                            className="object-cover transition-transform hover:scale-110"
                                                        />
                                                    </div>
                                                    <CardHeader>
                                                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                                                            <CalendarDays className="mr-2 h-4 w-4" aria-hidden="true" />
                                                            <time dateTime={item.date}>
                                                                {new Date(item.date).toLocaleDateString("fr-FR", {
                                                                    day: "numeric",
                                                                    month: "long",
                                                                    year: "numeric",
                                                                })}
                                                            </time>
                                                        </div>
                                                        <CardTitle>
                                                            <h3 className="line-clamp-2">{item.title}</h3>
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="flex-grow">
                                                        <p className="text-muted-foreground line-clamp-3">{item.excerpt}</p>
                                                    </CardContent>
                                                    <CardFooter>
                                                        <Button asChild className="hover:scale-105 transition-transform">
                                                            <Link href={`/news/${item.slug}`} aria-label={`Lire l'article: ${item.title}`}>
                                                                Lire la suite
                                                            </Link>
                                                        </Button>
                                                    </CardFooter>
                                                </Card>
                                            </article>
                                        ))}
                                    </div>
                                </section>

                                <section className="flex justify-center">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full lg:w-auto glass-mobile hover:scale-105 transition-all duration-300 bg-transparent mobile-touch"
                                    >
                                        Charger plus d'actualités
                                    </Button>
                                </section>
                            </>
                        )}
                    </main>
                </div>
            </div>
        </>
    )
}
