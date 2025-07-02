import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { LuxuryButton } from "@/components/ui/luxury-button"
import { Scale, FileText, HelpCircle, ArrowLeft, BookOpen, Briefcase, Coins, GraduationCap } from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"
import { LuxuryHeading } from "@/components/ui/luxury-heading"
import LuxuryCard from "@/components/ui/luxury-card"
import { getServiceBySlug } from "@/lib/api"
import ServiceContent from "@/components/ui/service-content"

interface ServiceDetailProps {
    params: Promise<{
        slug: string
    }>
}

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

// Mapping des icônes pour les services
const iconMap: Record<string, any> = {
    'scale': Scale,
    'coins': Coins,
    'graduation-cap': GraduationCap,
    'book-open': BookOpen,
    'file-text': FileText,
    'briefcase': Briefcase,
}

// Fonction pour obtenir l'icône ou une icône par défaut
const getIcon = (iconName: string) => {
    return iconMap[iconName] || Scale
}

export async function generateMetadata({ params }: ServiceDetailProps): Promise<Metadata> {
    const { slug } = await params
    const service = await getServiceBySlug(slug)

    if (!service) {
        return {
            title: "Service non trouvé | Conseil Étudiant HE2B",
            description: "Le service demandé n'existe pas ou n'est plus disponible.",
        }
    }

    return {
        title: `${service.title} | Conseil Étudiant HE2B`,
        description: service.description,
    }
}

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
    const { slug } = await params
    const service: ServiceItem = await getServiceBySlug(slug)

    if (!service) {
        notFound()
    }

    const IconComponent = getIcon(service.icon)

    return (
        <div className="relative">
            <ParallaxBackground />

            <div className="container py-12 md:py-20">
                {/* Bouton retour */}
                <div className="mb-8">
                    <LuxuryButton asChild variant="outline" className="border-primary/30 hover:border-primary/60">
                        <Link href="/services" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Retour aux services
                        </Link>
                    </LuxuryButton>
                </div>

                {/* En-tête du service */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 rounded-full bg-primary/10 flex-shrink-0">
                            <IconComponent className="h-8 w-8 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <LuxuryHeading as="h1" className="text-3xl md:text-4xl lg:text-5xl mb-2">
                                {service.title}
                            </LuxuryHeading>
                            <p className="text-lg md:text-xl text-muted-foreground">
                                {service.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contenu principal avec disposition adaptative */}
                <div className="max-w-6xl mx-auto mb-16">
                    {/* Version desktop : image + contenu côte à côte */}
                    <div className="hidden lg:grid lg:grid-cols-12 gap-12 items-start">
                        {/* Image du service - colonne sticky */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-8">
                                <div className="perspective-container">
                                    <div className="card-3d card-shine rounded-lg overflow-hidden">
                                        <Image
                                            src={service.image || "/placeholder.svg?height=600&width=800"}
                                            alt={service.title}
                                            width={800}
                                            height={600}
                                            className="w-full h-auto"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contenu détaillé */}
                        <div className="lg:col-span-7">
                            <LuxuryHeading as="h2" className="text-2xl font-bold mb-6">
                                À propos de ce service
                            </LuxuryHeading>

                            <div className="prose prose-lg max-w-none">
                                <ServiceContent content={service.content} />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-primary/20">
                                <LuxuryButton asChild variant="gold">
                                    <Link href="/contact">Nous contacter</Link>
                                </LuxuryButton>
                                <LuxuryButton asChild variant="outline" className="border-primary/30 hover:border-primary/60">
                                    <Link href="mailto:services@cehe2b.be">services@cehe2b.be</Link>
                                </LuxuryButton>
                            </div>
                        </div>
                    </div>

                    {/* Version mobile/tablette : disposition verticale */}
                    <div className="lg:hidden space-y-8">
                        {/* Image du service */}
                        <div className="perspective-container">
                            <div className="card-3d card-shine rounded-lg overflow-hidden">
                                <Image
                                    src={service.image || "/placeholder.svg?height=600&width=800"}
                                    alt={service.title}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>

                        {/* Contenu détaillé */}
                        <div>
                            <LuxuryHeading as="h2" className="text-2xl font-bold mb-6">
                                À propos de ce service
                            </LuxuryHeading>

                            <div className="prose prose-lg max-w-none">
                                <ServiceContent content={service.content} />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-primary/20">
                                <LuxuryButton asChild variant="gold">
                                    <Link href="/contact">Nous contacter</Link>
                                </LuxuryButton>
                                <LuxuryButton asChild variant="outline" className="border-primary/30 hover:border-primary/60">
                                    <Link href="mailto:services@cehe2b.be">services@cehe2b.be</Link>
                                </LuxuryButton>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Informations pratiques */}
                <div className="mb-16">
                    <LuxuryHeading as="h2" className="text-3xl font-bold mb-8 text-center">
                        Informations pratiques
                    </LuxuryHeading>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <LuxuryCard className="p-6">
                            <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
                                <Scale className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 gold-text">Gratuit</h3>
                            <p className="text-muted-foreground">
                                Ce service est entièrement gratuit pour tous les étudiants de la HE2B.
                            </p>
                        </LuxuryCard>
                        <LuxuryCard className="p-6">
                            <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
                                <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 gold-text">Sur rendez-vous</h3>
                            <p className="text-muted-foreground">
                                Prenez rendez-vous pour bénéficier d'un accompagnement personnalisé.
                            </p>
                        </LuxuryCard>
                        <LuxuryCard className="p-6">
                            <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
                                <HelpCircle className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 gold-text">Confidentiel</h3>
                            <p className="text-muted-foreground">
                                Vos informations personnelles sont traitées de manière confidentielle.
                            </p>
                        </LuxuryCard>
                    </div>
                </div>

                {/* Section contact */}
                <div className="bg-muted/30 rounded-lg p-8 animated-border max-w-4xl mx-auto">
                    <LuxuryHeading as="h2" className="text-2xl font-bold mb-4">
                        Besoin de ce service ?
                    </LuxuryHeading>
                    <p className="mb-6">
                        N'hésitez pas à nous contacter pour bénéficier de ce service. Nous sommes là pour vous accompagner dans vos démarches !
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <LuxuryButton asChild>
                            <Link href="/contact">Prendre rendez-vous</Link>
                        </LuxuryButton>
                        <LuxuryButton asChild variant="outline" className="border-primary/30 hover:border-primary/60">
                            <Link href="mailto:services@cehe2b.be">services@cehe2b.be</Link>
                        </LuxuryButton>
                    </div>
                </div>

                {/* Métadonnées du service */}
                <div className="mt-8 text-center text-sm text-muted-foreground">
                    <p>
                        Service créé le {new Date(service.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                        {service.updatedAt !== service.createdAt && (
                            <>
                                {" • Mis à jour le "}
                                {new Date(service.updatedAt).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}