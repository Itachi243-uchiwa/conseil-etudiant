import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import ParallaxBackground from "@/components/ui/parallax-background"
import { LuxuryHeading } from "@/components/ui/luxury-heading"
import { LuxuryButton } from "@/components/ui/luxury-button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
    title: "Rejoindre | Conseil Étudiant HE2B",
    description: "Rejoignez le Conseil Étudiant HE2B et contribuez à améliorer la vie étudiante",
}

export default function JoinPage() {
    return (
        <div className="relative">
            <div className="hidden lg:block">
                <ParallaxBackground />
            </div>

            <div className="container pt-20 py-6 md:py-20 px-4 md:px-8">
                <div className="max-w-4xl mx-auto mb-8 md:mb-16">
                    <LuxuryHeading as="h1" className="text-4xl md:text-5xl mb-6 text-center">
                        Rejoindre le Conseil Étudiant
                    </LuxuryHeading>
                    <p className="text-base md:text-xl text-muted-foreground text-center mb-6 md:mb-12 animate-slide-in-bottom animate-delay-200">
                        Tu souhaites t'impliquer dans la vie étudiante de la HE2B ? Rejoins le Conseil Étudiant !
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-16">
                        <Card className="mobile-card lg:bg-white/10 lg:backdrop-blur-sm lg:border-primary/20 animate-slide-in-bottom animate-delay-300 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                            <div className="relative aspect-video overflow-hidden rounded-t-lg">
                                <Image
                                    src="/election.png?height=600&width=600&text=Élections+Étudiantes"
                                    alt="Élections Étudiantes"
                                    fill
                                    className="object-cover transition-transform hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Par élections</h2>
                                    <p className="text-white/90 mb-2 md:mb-4 text-sm md:text-base">
                                        Fais entendre ta voix et représente tes camarades en te présentant aux élections étudiantes.
                                    </p>
                                </div>
                            </div>
                            <CardContent className="flex-grow p-4 md:p-6 flex flex-col justify-between">
                                <div>
                                    <p className="mb-3 md:mb-4 text-sm md:text-base">
                                        Les élections étudiantes sont un moment clé pour la démocratie à la HE2B. Chaque année, tu as
                                        l'occasion de voter pour choisir tes représentant·e·s, celles et ceux qui porteront ta voix et
                                        défendront tes droits dans les instances de l'école.
                                    </p>
                                    <p className="mb-3 md:mb-4 text-sm md:text-base">
                                        En votant, tu participes activement à améliorer ton environnement académique et à renforcer la
                                        représentation de tous les étudiant·e·s.
                                    </p>
                                </div>
                                <div className="mt-3 md:mt-4">
                                    <LuxuryButton asChild variant="gold" className="w-full mobile-touch">
                                        <Link href="/elections">En savoir plus sur les élections</Link>
                                    </LuxuryButton>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="mobile-card lg:bg-white/10 lg:backdrop-blur-sm lg:border-primary/20 animate-slide-in-bottom animate-delay-500 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                            <div className="relative aspect-video overflow-hidden rounded-t-lg">
                                <Image
                                    src="/cooptation.webp?height=400&width=600&text=Cooptation"
                                    alt="Cooptation"
                                    fill
                                    className="object-cover transition-transform hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Par cooptation</h2>
                                    <p className="text-white/90 mb-2 md:mb-4 text-sm md:text-base">
                                        Rejoins notre équipe en cours d'année pour renforcer nos rangs ou pour un projet spécifique.
                                    </p>
                                </div>
                            </div>
                            <CardContent className="flex-grow p-4 md:p-6 flex flex-col justify-between">
                                <div>
                                    <p className="mb-3 md:mb-4 text-sm md:text-base">
                                        La cooptation est un processus interne par lequel le Conseil Étudiant peut désigner une personne
                                        pour rejoindre ses rangs en cas de poste vacant ou de besoin spécifique.
                                    </p>
                                    <p className="mb-3 md:mb-4 text-sm md:text-base">
                                        Ce mode de sélection, validé par les membres en place, permet d'assurer la continuité et
                                        l'efficacité de l'équipe, tout en intégrant des étudiant·e·s motivé·e·s et compétent·e·s.
                                    </p>
                                </div>
                                <div className="mt-3 md:mt-4">
                                    <LuxuryButton asChild variant="gold" className="w-full mobile-touch">
                                        <Link href="/cooptation">Postuler par cooptation</Link>
                                    </LuxuryButton>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mobile-card lg:bg-white/10 lg:backdrop-blur-sm rounded-xl p-4 md:p-8 lg:border lg:border-primary/20 animate-slide-in-bottom animate-delay-700">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-primary">
                            Pourquoi nous rejoindre ?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Développe tes compétences</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start text-sm md:text-base">
                                        <span className="text-primary font-bold mr-2">•</span>
                                        <span>Leadership et travail d'équipe</span>
                                    </li>
                                    <li className="flex items-start text-sm md:text-base">
                                        <span className="text-primary font-bold mr-2">•</span>
                                        <span>Communication et négociation</span>
                                    </li>
                                    <li className="flex items-start text-sm md:text-base">
                                        <span className="text-primary font-bold mr-2">•</span>
                                        <span>Gestion de projet et organisation d'événements</span>
                                    </li>
                                    <li className="flex items-start text-sm md:text-base">
                                        <span className="text-primary font-bold mr-2">•</span>
                                        <span>Connaissance des institutions et de leur fonctionnement</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Fais la différence</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start text-sm md:text-base">
                                        <span className="text-primary font-bold mr-2">•</span>
                                        <span>Défends les droits et intérêts des étudiant·e·s</span>
                                    </li>
                                    <li className="flex items-start text-sm md:text-base">
                                        <span className="text-primary font-bold mr-2">•</span>
                                        <span>Contribue à améliorer la vie étudiante</span>
                                    </li>
                                    <li className="flex items-start text-sm md:text-base">
                                        <span className="text-primary font-bold mr-2">•</span>
                                        <span>Participe aux décisions importantes de l'école</span>
                                    </li>
                                    <li className="flex items-start text-sm md:text-base">
                                        <span className="text-primary font-bold mr-2">•</span>
                                        <span>Crée des liens et élargis ton réseau</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
