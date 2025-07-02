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
        <ParallaxBackground />

        <div className="container py-12 md:py-20">
          <div className="max-w-4xl mx-auto mb-16">
            <LuxuryHeading as="h1" className="text-4xl md:text-5xl mb-6 text-center">
              Rejoindre le Conseil Étudiant
            </LuxuryHeading>
            <p className="text-xl text-muted-foreground text-center mb-12">
              Tu souhaites t'impliquer dans la vie étudiante de la HE2B ? Rejoins le Conseil Étudiant !
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Card className="tilt-on-hover card-shine h-full flex flex-col">
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <Image
                      src="/election.png?height=600&width=600&text=Élections+Étudiantes"
                      alt="Élections Étudiantes"
                      fill
                      className="object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Par élections</h2>
                    <p className="text-white/90 mb-4">
                      Fais entendre ta voix et représente tes camarades en te présentant aux élections étudiantes.
                    </p>
                  </div>
                </div>
                <CardContent className="flex-grow p-6 flex flex-col justify-between">
                  <div>
                    <p className="mb-4">
                      Les élections étudiantes sont un moment clé pour la démocratie à la HE2B. Chaque année, tu as
                      l'occasion de voter pour choisir tes représentant·e·s, celles et ceux qui porteront ta voix et
                      défendront tes droits dans les instances de l'école.
                    </p>
                    <p className="mb-4">
                      En votant, tu participes activement à améliorer ton environnement académique et à renforcer la
                      représentation de tous les étudiant·e·s.
                    </p>
                  </div>
                  <div className="mt-4">
                    <LuxuryButton asChild variant="gold" className="w-full">
                      <Link href="/elections">En savoir plus sur les élections</Link>
                    </LuxuryButton>
                  </div>
                </CardContent>
              </Card>

              <Card className="tilt-on-hover card-shine h-full flex flex-col">
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <Image
                      src="/cooptation.jpg?height=400&width=600&text=Cooptation"
                      alt="Cooptation"
                      fill
                      className="object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Par cooptation</h2>
                    <p className="text-white/90 mb-4">
                      Rejoins notre équipe en cours d'année pour renforcer nos rangs ou pour un projet spécifique.
                    </p>
                  </div>
                </div>
                <CardContent className="flex-grow p-6 flex flex-col justify-between">
                  <div>
                    <p className="mb-4">
                      La cooptation est un processus interne par lequel le Conseil Étudiant peut désigner une personne
                      pour rejoindre ses rangs en cas de poste vacant ou de besoin spécifique.
                    </p>
                    <p className="mb-4">
                      Ce mode de sélection, validé par les membres en place, permet d'assurer la continuité et
                      l'efficacité de l'équipe, tout en intégrant des étudiant·e·s motivé·e·s et compétent·e·s.
                    </p>
                  </div>
                  <div className="mt-4">
                    <LuxuryButton asChild variant="gold" className="w-full">
                      <Link href="/cooptation">Postuler par cooptation</Link>
                    </LuxuryButton>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-primary/20">
              <h2 className="text-2xl font-bold mb-6 text-center text-primary">Pourquoi nous rejoindre ?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Développe tes compétences</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>Leadership et travail d'équipe</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>Communication et négociation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>Gestion de projet et organisation d'événements</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>Connaissance des institutions et de leur fonctionnement</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Fais la différence</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>Défends les droits et intérêts des étudiant·e·s</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>Contribue à améliorer la vie étudiante</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>Participe aux décisions importantes de l'école</span>
                    </li>
                    <li className="flex items-start">
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
