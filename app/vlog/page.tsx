import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, Eye, ThumbsUp, Play } from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"
import { LuxuryHeading } from "@/components/ui/luxury-heading"
import { LuxuryButton } from "@/components/ui/luxury-button"
import { getVlogs } from "@/lib/api"
import { generateMetadata, generateStructuredData } from "@/lib/seo"
import { StructuredData } from "@/components/StructuredData"

export const metadata: Metadata = generateMetadata({
    title: "CE HE2B TV - Vlogs et Vidéos de la Vie Étudiante",
    description: "Découvrez la vie étudiante à la HE2B à travers nos vlogs, interviews exclusives et récapitulatifs d'événements. Plongez dans l'univers étudiant !",
    keywords: ['vlog', 'vidéos', 'vie étudiante', 'interviews', 'événements', 'campus', 'CE HE2B TV'],
    url: '/vlog',
    type: 'video'
});

export default async function VlogPage() {
    const vlogs = await getVlogs() || []

    const sortedVlogs = [...vlogs].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    const featuredVlog = sortedVlogs[0]
    const regularVlogs = sortedVlogs.slice(1)

    const structuredData = generateStructuredData('organization', {});

    return (
        <>
            <StructuredData data={structuredData} />
            <div className="relative">
                <ParallaxBackground />

                <div className="container py-12 md:py-20">
                    <header className="max-w-4xl mx-auto mb-12">
                        <LuxuryHeading as="h1" className="text-4xl md:text-5xl mb-6 text-center">
                            CE HE2B TV
                        </LuxuryHeading>
                        <p className="text-xl text-muted-foreground text-center">
                            Découvrez la vie étudiante à la HE2B à travers nos vlogs, interviews et récapitulatifs d'événements.
                            Plongez dans l'univers authentique de nos campus !
                        </p>
                    </header>

                    <main>
                        {featuredVlog && (
                            <section aria-labelledby="featured-video" className="mb-20">
                                <h2 id="featured-video" className="sr-only">Vidéo à la une</h2>
                                <article className="relative aspect-video rounded-xl overflow-hidden group">
                                    <video
                                        src={featuredVlog.mediaFiles?.[0]?.url || ""}
                                        poster={featuredVlog.thumbnail}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        controls
                                        preload="metadata"
                                        aria-label={`Vidéo: ${featuredVlog.title}`}
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>

                                    <div className="absolute inset-0 flex flex-col justify-end p-8 pointer-events-none">
                                        <div className="flex items-center space-x-2 text-white/80 text-sm mb-3">
                                            <span className="bg-primary/80 text-white px-3 py-1 rounded-full">À la une</span>
                                            <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" aria-hidden="true" />
                        <span aria-label="Durée: 5 minutes 24 secondes">5:24</span>
                      </span>
                                            <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" aria-hidden="true" />
                        <span aria-label="1200 vues">1.2K</span>
                      </span>
                                        </div>

                                        <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">{featuredVlog.title}</h3>
                                        <p className="text-white/90 text-lg mb-6 max-w-3xl">{featuredVlog.excerpt}</p>

                                        <div className="flex flex-wrap gap-4 pointer-events-auto">
                                            <LuxuryButton asChild size="lg" className="group">
                                                <Link href={`/vlog/${featuredVlog.slug}`}>
                                                    <Play className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" aria-hidden="true" />
                                                    Regarder maintenant
                                                </Link>
                                            </LuxuryButton>

                                            <Button
                                                asChild
                                                variant="outline"
                                                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                                            >
                                                <Link href={`/vlog/categories/${encodeURIComponent(featuredVlog.category || 'evenements')}`}>
                                                    Plus de vidéos {featuredVlog.category ? `de ${featuredVlog.category}` : "d'événements"}
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </article>
                            </section>
                        )}

                        <section aria-labelledby="recent-videos" className="mb-16">
                            <div className="flex justify-between items-center mb-8">
                                <h2 id="recent-videos" className="text-2xl font-bold">
                                    Vidéos récentes
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {regularVlogs.map((vlog) => (
                                    <article key={vlog.id}>
                                        <Link href={`/vlog/${vlog.slug}`} className="group" aria-label={`Regarder: ${vlog.title}`}>
                                            <div className="rounded-xl overflow-hidden bg-card transition-all duration-300 hover:shadow-lg group-hover:transform group-hover:scale-[1.02]">
                                                <div className="relative aspect-video">
                                                    {vlog.mediaFiles?.[0]?.url ? (
                                                        <video
                                                            src={vlog.mediaFiles[0].url}
                                                            poster={vlog.thumbnail}
                                                            className="object-cover w-full h-full"
                                                            preload="none"
                                                            aria-label={`Aperçu vidéo: ${vlog.title}`}
                                                        />
                                                    ) : (
                                                        <Image
                                                            src={vlog.thumbnail || "/placeholder.svg"}
                                                            alt={`Miniature de la vidéo: ${vlog.title}`}
                                                            fill
                                                            className="object-cover transition-transform group-hover:scale-105"
                                                        />
                                                    )}

                                                    <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-md text-sm flex items-center">
                                                        <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
                                                        <span aria-label="Durée: 5 minutes 24 secondes">5:24</span>
                                                    </div>

                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center backdrop-blur-sm" aria-hidden="true">
                                                            <Play className="h-6 w-6 text-white" fill="white" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-4">
                                                    <h3 className="text-lg font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                                                        {vlog.title}
                                                    </h3>
                                                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{vlog.excerpt}</p>
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center text-xs text-muted-foreground">
                                                            <CalendarDays className="h-3 w-3 mr-1" aria-hidden="true" />
                                                            <time dateTime={vlog.date}>
                                                                {new Date(vlog.date).toLocaleDateString('fr-FR', {
                                                                    day: 'numeric',
                                                                    month: 'long',
                                                                    year: 'numeric'
                                                                })}
                                                            </time>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                              <span className="flex items-center text-xs text-muted-foreground">
                                <Eye className="h-3 w-3 mr-1" aria-hidden="true" />
                                <span aria-label="2200 vues">2.2K</span>
                              </span>
                                                            <span className="flex items-center text-xs text-muted-foreground">
                                <ThumbsUp className="h-3 w-3 mr-1" aria-hidden="true" />
                                <span aria-label="342 likes">342</span>
                              </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section className="relative rounded-xl overflow-hidden" aria-labelledby="propose-vlog">
                            <div className="absolute inset-0">
                                <Image
                                    src="/placeholder.svg?height=400&width=1200&text=Proposer+un+vlog"
                                    alt="Étudiants en train de créer du contenu vidéo"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 mix-blend-multiply"></div>
                            </div>

                            <div className="relative z-10 p-8 md:p-12 text-center text-white">
                                <h2 id="propose-vlog" className="text-2xl md:text-3xl font-bold mb-4">Vous avez une idée de vlog ?</h2>
                                <p className="mb-6 max-w-2xl mx-auto text-white/90">
                                    Vous souhaitez partager votre expérience à la HE2B ou proposer un sujet de vlog ? Nous sommes toujours à
                                    la recherche de nouvelles idées et de nouveaux talents !
                                </p>
                                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                                    <Link href="/contact">Proposer un vlog</Link>
                                </Button>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    )
}