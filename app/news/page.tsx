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

export const metadata: Metadata = generateMetadata({
    title: "Actualités - Toutes les nouvelles du Conseil Étudiant",
    description: "Restez informé des dernières actualités, annonces et informations importantes du Conseil Étudiant HE2B. Découvrez nos projets, événements et initiatives pour les étudiants.",
    keywords: ['actualités', 'nouvelles', 'annonces', 'informations', 'projets étudiants', 'initiatives'],
    url: '/actualites'
});

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
    const news: NewsItem[] = await getNews() || []

    const structuredData = generateStructuredData('organization', {});

    return (
        <>
            <StructuredData data={structuredData} />
            <div className="relative">
                <ParallaxBackground />

                <div className="container py-12 md:py-20">
                    <header className="max-w-4xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Actualités du Conseil Étudiant</h1>
                        <p className="text-xl text-muted-foreground">
                            Restez informé des dernières nouvelles du Conseil Étudiant HE2B. Retrouvez ici toutes nos actualités,
                            annonces et informations importantes pour la communauté étudiante.
                        </p>
                    </header>

                    <main>
                        {news.length === 0 ? (
                            <section className="text-center py-12">
                                <h2 className="text-2xl font-semibold mb-4">Aucune actualité disponible</h2>
                                <p className="text-muted-foreground">Revenez bientôt pour découvrir nos dernières nouvelles !</p>
                            </section>
                        ) : (
                            <>
                                <section aria-labelledby="recent-news">
                                    <h2 id="recent-news" className="sr-only">Actualités récentes</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                                        {news.map((item) => (
                                            <article key={item.id}>
                                                <Card className="tilt-on-hover card-shine h-full flex flex-col">
                                                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                                                        <Image
                                                            src={item.image || "/placeholder.svg"}
                                                            alt={`Image de l'article: ${item.title}`}
                                                            fill
                                                            className="object-cover transition-transform hover:scale-105"
                                                        />
                                                    </div>
                                                    <CardHeader>
                                                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                                                            <CalendarDays className="mr-2 h-4 w-4" aria-hidden="true" />
                                                            <time dateTime={item.date}>
                                                                {new Date(item.date).toLocaleDateString('fr-FR', {
                                                                    day: 'numeric',
                                                                    month: 'long',
                                                                    year: 'numeric'
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
                                                        <Button asChild>
                                                            <Link href={`/actualites/${item.slug}`} aria-label={`Lire l'article: ${item.title}`}>
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
                                    <Button variant="outline" size="lg">
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