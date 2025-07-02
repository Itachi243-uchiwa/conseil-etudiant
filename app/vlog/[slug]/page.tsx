import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    CalendarDays,
    Clock,
    Eye,
    ThumbsUp,
    Share2,
    ArrowLeft,
    Play,
    Heart,
    MessageCircle,
    Bookmark,
} from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"
import { LuxuryHeading } from "@/components/ui/luxury-heading"
import { PhotoGallery } from "@/components/ui/photo-gallery"
import { getVlogBySlug, getVlogs } from "@/lib/api"

// Types basés sur le DTO Java
interface MediaUploadDto {
    id?: number;
    url: string;
    type: 'IMAGE' | 'VIDEO' | 'DOCUMENT';
    name?: string;
    publicId?: string;
    format?: string;
    size?: number;
}

interface VlogDto {
    id: number;
    title: string;
    excerpt?: string;
    content: string;
    thumbnail?: string;
    date: string; // LocalDateTime sera sérialisé en string
    slug: string;
    category?: string;
    tags: string[];
    createdAt?: string;
    updatedAt?: string;
    mediaFiles: MediaUploadDto[];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const vlog = await getVlogBySlug(slug)

    if (!vlog) {
        return {
            title: "Vlog non trouvé | Conseil Étudiant HE2B",
        }
    }

    return {
        title: `${vlog.title} | CE HE2B TV`,
        description: vlog.excerpt,
    }
}

export default async function VlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const vlog = await getVlogBySlug(slug)
    const allVlogs = await getVlogs() || []

    if (!vlog) {
        notFound()
    }

    // Filtrer les vlogs similaires (même catégorie, mais pas le même vlog)
    const similarVlogs = allVlogs.filter((v: VlogDto) =>
        v.category === vlog.category &&
        v.slug !== vlog.slug
    ).slice(0, 3)

    // Extraire les médias par type
    const videoMedia = vlog.mediaFiles?.filter((media: MediaUploadDto) => media.type === 'VIDEO') || []
    const imageMedia = vlog.mediaFiles?.filter((media: MediaUploadDto) => media.type === 'IMAGE') || []

    // La vidéo principale est le premier élément de mediaFiles
    const mainVideo = vlog.mediaFiles && vlog.mediaFiles.length > 0 ? vlog.mediaFiles[0] : null

    return (
        <div className="relative">
            <ParallaxBackground />

            <div className="container py-12 md:py-20">
                <div className="mb-8">
                    <Button asChild variant="outline" className="mb-6">
                        <Link href="/vlog">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour aux vlogs
                        </Link>
                    </Button>

                    <LuxuryHeading as="h1" className="text-3xl md:text-4xl mb-4">
                        {vlog.title}
                    </LuxuryHeading>

                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="flex items-center text-sm text-muted-foreground">
                            <CalendarDays className="h-4 w-4 mr-1" />
                            {new Date(vlog.date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            {/* Durée fictive - à adapter selon vos données */}
                            5:24
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Eye className="h-4 w-4 mr-1" />
                            {/* Vues fictives - à adapter selon vos données */}
                            1.2K vues
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {/* Likes fictifs - à adapter selon vos données */}
                            342 likes
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-2">
                        {/* Lecteur vidéo principale (premier élément de mediaFiles) */}
                        {mainVideo && (
                            <div className="relative aspect-video mb-8 rounded-xl overflow-hidden shadow-lg">
                                {mainVideo.type === 'VIDEO' ? (
                                    <video
                                        src={mainVideo.url}
                                        poster={vlog.thumbnail}
                                        controls
                                        className="absolute top-0 left-0 w-full h-full"
                                    />
                                ) : mainVideo.type === 'IMAGE' ? (
                                    <Image
                                        src={mainVideo.url}
                                        alt={vlog.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : null}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            <Button variant="outline" className="flex items-center gap-2">
                                <Heart className="h-4 w-4" />
                                <span>J'aime</span>
                                <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">
                                    342
                                </span>
                            </Button>

                            <Button variant="outline" className="flex items-center gap-2">
                                <MessageCircle className="h-4 w-4" />
                                <span>Commenter</span>
                                <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">
                                    24
                                </span>
                            </Button>

                            <Button variant="outline" className="flex items-center gap-2">
                                <Share2 className="h-4 w-4" />
                                <span>Partager</span>
                                <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">
                                    56
                                </span>
                            </Button>

                            <Button variant="outline" className="flex items-center gap-2">
                                <Bookmark className="h-4 w-4" />
                                <span>Enregistrer</span>
                                <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">
                                    18
                                </span>
                            </Button>
                        </div>

                        {/* Galerie de photos (médias de type IMAGE) */}
                        {imageMedia.length > 0 && (
                            <div className="mb-8">
                                <LuxuryHeading as="h2" className="text-2xl font-bold mb-4">
                                    Galerie de photos
                                </LuxuryHeading>
                                <PhotoGallery photos={imageMedia.map((img: MediaUploadDto) => ({
                                    url: img.url,
                                    alt: vlog.title
                                }))} />
                            </div>
                        )}

                        {/* Description du vlog */}
                        <div className="mb-8">
                            <LuxuryHeading as="h2" className="text-2xl font-bold mb-4">
                                Description
                            </LuxuryHeading>
                            <p className="text-muted-foreground whitespace-pre-line">{vlog.content}</p>
                        </div>

                        {/* Tags */}
                        {vlog.tags && vlog.tags.length > 0 && (
                            <div className="mb-8">
                                <LuxuryHeading as="h2" className="text-2xl font-bold mb-4">
                                    Tags
                                </LuxuryHeading>
                                <div className="flex flex-wrap gap-2">
                                    {vlog.tags.map((tag: string) => (
                                        <span
                                            key={tag}
                                            className="bg-muted/50 text-muted-foreground px-3 py-1 rounded-full text-sm hover:bg-primary/10 transition-colors cursor-pointer"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        {/* Vlogs similaires */}
                        {similarVlogs.length > 0 && (
                            <Card className="mb-8 overflow-hidden">
                                <div className="bg-primary/10 p-4">
                                    <h2 className="text-xl font-bold">Vlogs similaires</h2>
                                </div>
                                <CardContent className="p-4">
                                    <div className="space-y-4">
                                        {similarVlogs.map((similarVlog: VlogDto) => (
                                            <Link href={`/vlog/${similarVlog.slug}`} key={similarVlog.id} className="block group">
                                                <div className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                                                    <div className="relative w-24 h-16 flex-shrink-0 rounded-md overflow-hidden">
                                                        <Image
                                                            src={similarVlog.thumbnail || "/placeholder.svg"}
                                                            alt={similarVlog.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Play className="h-4 w-4 text-white" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                                                            {similarVlog.title}
                                                        </h3>
                                                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                                                            <Clock className="h-3 w-3 mr-1" />
                                                            5:24
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Catégories */}
                        <Card>
                            <div className="bg-primary/10 p-4">
                                <h2 className="text-xl font-bold">Catégories</h2>
                            </div>
                            <CardContent className="p-4">
                                <div className="space-y-2">
                                    {[
                                        "Événements",
                                        "Tutoriels",
                                        "Actualités",
                                        "Témoignages",
                                        "Vie étudiante",
                                        "Projets",
                                        "Interviews"
                                    ].map((category: string, index: number) => (
                                        <Link
                                            href="#"
                                            key={index}
                                            className="block p-2 rounded-lg hover:bg-muted/50 transition-colors hover:text-primary"
                                        >
                                            {category}
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}