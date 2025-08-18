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
    description:
        "Découvrez la vie étudiante à la HE2B à travers nos vlogs, interviews exclusives et récapitulatifs d'événements. Plongez dans l'univers étudiant !",
    keywords: ["vlog", "vidéos", "vie étudiante", "interviews", "événements", "campus", "CE HE2B TV"],
    url: "/vlog",
    type: "website", // ✅ Changé de 'video' vers 'website'
})

export default async function VlogPage() {
    const vlogs = (await getVlogs()) || []

    const sortedVlogs = [...vlogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const featuredVlog = sortedVlogs[0]
    const regularVlogs = sortedVlogs.slice(1)

    const structuredData = generateStructuredData("organization", {})

    return (
        <>
            <StructuredData data={structuredData} />
            <div className="relative">
                <div className="hidden lg:block">
                    <ParallaxBackground />
                </div>

                <div className="container pt-16 py-6 md:py-20 px-4 md:px-8">
                    <header className="max-w-4xl mx-auto mb-6 md:mb-12">
                        <LuxuryHeading as="h1" className="text-4xl md:text-5xl mb-6 text-center">
                            CE HE2B TV
                        </LuxuryHeading>
                        <p className="text-base md:text-xl text-muted-foreground text-center animate-slide-in-bottom animate-delay-200">
                            Découvrez la vie étudiante à la HE2B à travers nos vlogs, interviews et récapitulatifs d'événements.
                            Plongez dans l'univers authentique de nos campus !
                        </p>
                    </header>

                    <main>
                        {featuredVlog && (
                            <section aria-labelledby="featured-video" className="mb-8 md:mb-20">
                                <h2 id="featured-video" className="sr-only">
                                    Vidéo à la une
                                </h2>
                                <article className="relative aspect-video rounded-xl overflow-hidden group animate-slide-in-bottom animate-delay-300">
                                    <video
                                        src={featuredVlog.mediaFiles?.[0]?.url || ""}
                                        poster={featuredVlog.thumbnail}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        controls
                                        preload="metadata"
                                        aria-label={`Vidéo: ${featuredVlog.title}`}
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>

                                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8 pointer-events-none">
                                        <div className="flex items-center space-x-2 text-white/80 text-xs md:text-sm mb-2 md:mb-3">
                                            <span className="bg-primary/80 text-white px-2 md:px-3 py-1 rounded-full text-xs">À la une</span>
                                            <span className="flex items-center">
                        <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1" aria-hidden="true" />
                        <span aria-label="Durée: 5 minutes 24 secondes">5:24</span>
                      </span>
                                            <span className="flex items-center">
                        <Eye className="h-3 w-3 md:h-4 md:w-4 mr-1" aria-hidden="true" />
                        <span aria-label="1200 vues">1.2K</span>
                      </span>
                                        </div>

                                        <h3 className="text-lg md:text-4xl font-bold text-white mb-2 md:mb-4">{featuredVlog.title}</h3>
                                        <p className="text-white/90 text-sm md:text-lg mb-4 md:mb-6 max-w-3xl line-clamp-2 md:line-clamp-none">
                                            {featuredVlog.excerpt}
                                        </p>

                                        <div className="flex flex-wrap gap-2 md:gap-4 pointer-events-auto">
                                            <LuxuryButton asChild size="sm" className="group mobile-touch">
                                                <Link href={`/vlog/${featuredVlog.slug}`}>
                                                    <Play
                                                        className="h-4 w-4 md:h-5 md:w-5 mr-2 transition-transform group-hover:scale-110"
                                                        aria-hidden="true"
                                                    />
                                                    Regarder
                                                </Link>
                                            </LuxuryButton>
                                        </div>
                                    </div>
                                </article>
                            </section>
                        )}

                        <section aria-labelledby="recent-videos" className="mb-8 md:mb-16">
                            <div className="flex justify-between items-center mb-4 md:mb-8">
                                <h2 id="recent-videos" className="text-xl md:text-2xl font-bold">
                                    Vidéos récentes
                                </h2>
                            </div>

                            <div className="lg:hidden space-y-4">
                                {regularVlogs.map((vlog, index) => (
                                    <article key={vlog.id} className={`animate-slide-in-bottom animate-delay-${index * 100}`}>
                                        <Link
                                            href={`/vlog/${vlog.slug}`}
                                            className="block mobile-card mobile-touch hover:scale-[1.02] transition-all duration-300"
                                            aria-label={`Regarder: ${vlog.title}`}
                                        >
                                            <div className="flex space-x-3">
                                                <div className="relative aspect-video w-24 flex-shrink-0 rounded-lg overflow-hidden">
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
                                                            className="object-cover"
                                                        />
                                                    )}
                                                    <div className="absolute bottom-1 right-1 bg-black/70 text-white px-1 py-0.5 rounded text-xs flex items-center">
                                                        <Clock className="h-2 w-2 mr-0.5" aria-hidden="true" />
                                                        <span>5:24</span>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">{vlog.title}</h3>
                                                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{vlog.excerpt}</p>
                                                    <div className="flex items-center text-xs text-muted-foreground">
                                                        <CalendarDays className="h-3 w-3 mr-1" aria-hidden="true" />
                                                        <time dateTime={vlog.date}>
                                                            {new Date(vlog.date).toLocaleDateString("fr-FR", {
                                                                day: "numeric",
                                                                month: "short",
                                                            })}
                                                        </time>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </article>
                                ))}
                            </div>

                            <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {regularVlogs.map((vlog) => (
                                    <article key={vlog.id} className="relative aspect-video rounded-xl overflow-hidden group">
                                        <video
                                            src={vlog.mediaFiles?.[0]?.url || ""}
                                            poster={vlog.thumbnail}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            controls
                                            preload="none"
                                            aria-label={`Aperçu vidéo: ${vlog.title}`}
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>

                                        <div className="absolute inset-0 flex flex-col justify-end p-8 pointer-events-none">
                                            <div className="flex items-center space-x-2 text-white/80 text-sm mb-3">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" aria-hidden="true" />
                          <span aria-label="Durée: 5 minutes 24 secondes">5:24</span>
                        </span>
                                                <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" aria-hidden="true" />
                          <span aria-label="2200 vues">2.2K</span>
                        </span>
                                            </div>

                                            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">{vlog.title}</h3>
                                            <p className="text-white/90 text-lg mb-6 max-w-3xl line-clamp-2">{vlog.excerpt}</p>

                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center text-xs text-muted-foreground">
                                                    <CalendarDays className="h-3 w-3 mr-1" aria-hidden="true" />
                                                    <time dateTime={vlog.date}>
                                                        {new Date(vlog.date).toLocaleDateString("fr-FR", {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
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
                                <h2 id="propose-vlog" className="text-2xl md:text-3xl font-bold mb-4">
                                    Vous avez une idée de vlog ?
                                </h2>
                                <p className="mb-6 max-w-2xl mx-auto text-white/90">
                                    Vous souhaitez partager votre expérience à la HE2B ou proposer un sujet de vlog ? Nous sommes toujours
                                    à la recherche de nouvelles idées et de nouveaux talents !
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
