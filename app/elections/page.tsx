import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ParallaxBackground from "@/components/ui/parallax-background"
import { LuxuryHeading } from "@/components/ui/luxury-heading"
import { LuxuryButton } from "@/components/ui/luxury-button"

export const metadata: Metadata = {
    title: "Élections | Conseil Étudiant HE2B",
    description: "Élections du Conseil Étudiant HE2B - Fais entendre ta voix !",
}

export default function ElectionsPage() {
    return (
        <div className="relative">
            <ParallaxBackground />

            <div className="container py-12 md:py-20">
                <div className="max-w-4xl mx-auto mb-16">
                    <LuxuryHeading as="h1" className="text-4xl md:text-5xl mb-6 text-center">
                        Les élections étudiantes
                    </LuxuryHeading>
                    <p className="text-xl text-muted-foreground text-center mb-8">Fais entendre ta voix !</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <h2 className="text-2xl font-bold mb-6">C'est quoi les élections ?</h2>
                        <p className="mb-4">
                            Les élections étudiantes sont un moment clé de la vie démocratique à la HE2B. Elles te permettent, en tant
                            qu'étudiant·e, de voter pour élire les représentant·e·s qui porteront ta voix au sein des différentes
                            instances décisionnelles de l'université.
                        </p>
                        <p className="mb-4">
                            Ces élu·e·s défendent les droits des étudiant·e·s, participent aux discussions importantes et s'assurent
                            que les préoccupations étudiantes soient entendues. En somme, c'est l'occasion de choisir qui te
                            représentera et de contribuer à façonner la vie universitaire.
                        </p>
                        <LuxuryButton asChild className="mt-4">
                            <Link href="#comment-ca-fonctionne">Comment ça fonctionne ?</Link>
                        </LuxuryButton>
                    </div>
                    <div className="relative aspect-video rounded-xl overflow-hidden">
                        <Image
                            src="/placeholder.svg?height=600&width=800&text=Élections+Étudiantes"
                            alt="Élections étudiantes"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <div
                    id="comment-ca-fonctionne"
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-16 border border-primary/20"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center text-primary">Comment ça fonctionne ?</h2>
                    <p className="mb-6">
                        Les élections étudiantes se déroulent exclusivement en ligne. Chaque année, tu reçois un lien qui te permet
                        de voter en quelques clics. Tu peux choisir parmi des candidat·e·s qui se présentent pour représenter leur
                        faculté ou l'ensemble des étudiant·e·s.
                    </p>
                    <p className="mb-6">
                        Une fois les votes comptabilisés, les sièges sont attribués aux candidat·e·s ayant obtenu le plus de voix.
                        Ces élu·e·s siègent ensuite dans différentes instances pour défendre tes droits et porter tes
                        préoccupations.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-white/5 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-3 text-primary">1. Candidature</h3>
                            <p>Présente ta candidature en remplissant le formulaire en ligne et en préparant ta profession de foi.</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-3 text-primary">2. Campagne</h3>
                            <p>Fais connaître tes idées et ton programme auprès des étudiant·e·s pendant la période de campagne.</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-3 text-primary">3. Vote</h3>
                            <p>Les étudiant·e·s votent en ligne pour leurs candidat·e·s préféré·e·s pendant la période électorale.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-16 border border-primary/20">
                    <h2 className="text-2xl font-bold mb-6 text-center text-primary">C'est quoi un quorum ?</h2>
                    <p className="mb-4">
                        Le quorum, c'est le nombre minimum de votant·e·s nécessaires pour que les élections soient valides. À la
                        HE2B, cela signifie qu'un certain pourcentage d'étudiant·e·s doit participer au vote en ligne pour que les
                        résultats soient pris en compte.
                    </p>
                    <p className="mb-4">
                        Si le quorum n'est pas atteint, de nouvelles élections doivent être organisées. C'est pourquoi ta
                        participation est essentielle : chaque voix compte pour garantir une représentation légitime et forte de
                        tou·te·s les étudiant·e·s.
                    </p>
                    <div className="flex justify-center mt-6">
                        <LuxuryButton asChild>
                            <Link href="/elections/resultats">Voir les résultats des dernières élections</Link>
                        </LuxuryButton>
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-6">Tu veux te présenter aux prochaines élections ?</h2>
                    <p className="mb-8 max-w-2xl mx-auto">
                        Si tu souhaites représenter tes camarades et t'impliquer activement dans la vie de l'école, n'hésite pas à
                        te porter candidat·e aux prochaines élections étudiantes !
                    </p>
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                        <Link href="/contact">Contacte-nous pour plus d'informations</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
