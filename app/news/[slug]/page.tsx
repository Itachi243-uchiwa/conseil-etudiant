import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, FileText, ExternalLink, ArrowLeft, Download } from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"
import { getNewsBySlug } from "@/lib/api"

interface PageProps {
    params: Promise<{ slug: string }>
}

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
    relatedLinks?: Array<{
        title: string
        url: string
        description?: string
    }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const newsItem: NewsItem | null = await getNewsBySlug(slug)

    if (!newsItem) {
        return {
            title: "Article non trouvé | Conseil Étudiant HE2B",
        }
    }

    return {
        title: `${newsItem.title} | Conseil Étudiant HE2B`,
        description: newsItem.excerpt,
        openGraph: {
            title: newsItem.title,
            description: newsItem.excerpt,
            images: [newsItem.image],
        },
    }
}

export default async function NewsDetailPage({ params }: PageProps) {
    const { slug } = await params
    const newsItem: NewsItem | null = await getNewsBySlug(slug)

    if (!newsItem) {
        notFound()
    }

    return (
        <div className="relative">
            <ParallaxBackground />

            <div className="container py-12 md:py-20">
                {/* Navigation */}
                <div className="mb-8">
                    <Button variant="ghost" asChild className="mb-4">
                        <Link href="/news">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour aux actualités
                        </Link>
                    </Button>
                </div>

                {/* Article Header */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="relative aspect-video mb-8 overflow-hidden rounded-lg">
                        <Image
                            src={newsItem.image || "/placeholder.svg"}
                            alt={newsItem.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        <span>{new Date(newsItem.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{newsItem.title}</h1>

                    {newsItem.tags && newsItem.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {newsItem.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}

                    <p className="text-xl text-muted-foreground leading-relaxed">{newsItem.excerpt}</p>
                </div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="prose prose-lg max-w-none">
                            <div
                                className="text-foreground leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: newsItem.content
                                        .replace(/\n\n/g, "</p><p>")
                                        .replace(/\n/g, "<br>")
                                        .replace(/^/, "<p>")
                                        .replace(/$/, "</p>")
                                        .replace(/## (.*?)<\/p>/g, "<h2>$1</h2>")
                                        .replace(/### (.*?)<\/p>/g, "<h3>$1</h3>")
                                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                                }}
                            />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Documents */}
                        {newsItem.documents && newsItem.documents.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <FileText className="mr-2 h-5 w-5" />
                                        Documents
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {newsItem.documents.map((doc, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-primary/10 rounded">
                                                    <FileText className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="text-sm font-medium">{doc.title}</span>
                                            </div>
                                            <Button size="sm" variant="ghost" asChild>
                                                <Link href={doc.url} target="_blank">
                                                    <Download className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        {/* Related Links */}
                        {newsItem.relatedLinks && newsItem.relatedLinks.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <ExternalLink className="mr-2 h-5 w-5" />
                                        Liens utiles
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {newsItem.relatedLinks.map((link, index) => (
                                        <div key={index}>
                                            <Link
                                                href={typeof link === 'string' ? link : link.url}
                                                className="block p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                                            >
                                                <div className="font-medium text-primary hover:underline">
                                                    {typeof link === 'string' ? link : link.title}
                                                </div>
                                                {typeof link === 'object' && link.description && (
                                                    <div className="text-sm text-muted-foreground mt-1">{link.description}</div>
                                                )}
                                            </Link>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        {/* Contact */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Besoin d'aide ?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">Notre équipe est là pour répondre à tes questions.</p>
                                <Button asChild className="w-full">
                                    <Link href="/contact">Nous contacter</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Navigation */}
                <div className="max-w-4xl mx-auto mt-16">
                    <Separator className="mb-8" />
                    <div className="flex justify-between items-center">
                        <Button variant="outline" asChild>
                            <Link href="/news">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Toutes les actualités
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href="/contact">Nous contacter</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}