import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { LuxuryButton } from "@/components/ui/luxury-button"
import { Coins, PiggyBank, Calculator } from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"
import { LuxuryHeading } from "@/components/ui/luxury-heading" // Importation corrigée
import LuxuryCard from "@/components/ui/luxury-card"

export const metadata: Metadata = {
  title: "Soutien Financier | Conseil Étudiant HE2B",
  description: "Service de soutien financier du Conseil Étudiant HE2B",
}

const aidesFinancieres = [
  {
    title: "Bourse d'études de la Fédération Wallonie-Bruxelles",
    description: "Aide financière accordée aux étudiants de condition modeste pour les aider à financer leurs études.",
    conditions:
      "Être de nationalité belge ou ressortissant de l'UE, être inscrit dans un établissement d'enseignement supérieur reconnu, ne pas dépasser un certain plafond de revenus.",
    lien: "https://www.allocations-etudes.cfwb.be/",
  },
  {
    title: "Allocation d'études pour les étudiants étrangers",
    description: "Aide financière destinée aux étudiants étrangers qui poursuivent des études en Belgique.",
    conditions:
      "Être ressortissant d'un pays en développement, être inscrit dans un établissement d'enseignement supérieur reconnu, ne pas bénéficier d'une autre bourse.",
    lien: "https://www.allocations-etudes.cfwb.be/etudes-superieures/conditions/",
  },
  {
    title: "Prêt d'études",
    description: "Prêt sans intérêt accordé aux étudiants pour financer leurs études.",
    conditions:
      "Être de nationalité belge ou ressortissant de l'UE, être inscrit dans un établissement d'enseignement supérieur reconnu, ne pas dépasser un certain plafond de revenus.",
    lien: "https://www.allocations-etudes.cfwb.be/prets-detudes/",
  },
]

export default function SoutienFinancierPage() {
  return (
    <div className="relative">
      <ParallaxBackground />

      <div className="container py-12 md:py-20">
        <div className="max-w-4xl mx-auto mb-16">
          <LuxuryHeading as="h1" className="text-4xl md:text-5xl mb-6">
            Service de soutien financier
          </LuxuryHeading>
          <p className="text-xl text-muted-foreground">
            Le service de soutien financier du Conseil Étudiant HE2B vous informe sur les différentes aides financières
            disponibles et vous accompagne dans vos démarches pour les obtenir.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <LuxuryHeading as="h2" className="text-2xl font-bold mb-4">
              Notre mission
            </LuxuryHeading>
            <p className="text-muted-foreground mb-6">
              Notre service de soutien financier a pour mission de vous informer sur les différentes aides financières
              auxquelles vous pouvez prétendre et de vous accompagner dans vos démarches pour les obtenir.
            </p>
            <p className="text-muted-foreground mb-8">
              Nous vous aidons à constituer vos dossiers de demande de bourse, à comprendre les conditions d'octroi des
              aides financières et à trouver des solutions en cas de difficultés financières.
            </p>
            <LuxuryButton asChild variant="gold">
              <Link href="/contact">Prendre rendez-vous</Link>
            </LuxuryButton>
          </div>
          <div className="perspective-container">
            <div className="card-3d card-shine rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Service de soutien financier"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        <div className="mb-16">
          <LuxuryHeading as="h2" className="text-3xl font-bold mb-8 text-center">
            Nos services
          </LuxuryHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <LuxuryCard className="p-6">
              <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
                <Coins className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 gold-text">Information sur les aides</h3>
              <p className="text-muted-foreground">
                Nous vous informons sur les différentes aides financières disponibles (bourses, allocations, prêts) et
                sur les conditions pour en bénéficier.
              </p>
            </LuxuryCard>
            <LuxuryCard className="p-6">
              <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
                <PiggyBank className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 gold-text">Aide aux démarches</h3>
              <p className="text-muted-foreground">
                Nous vous aidons à constituer vos dossiers de demande d'aide financière et à effectuer les démarches
                nécessaires pour les obtenir.
              </p>
            </LuxuryCard>
            <LuxuryCard className="p-6">
              <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 gold-text">Conseils budgétaires</h3>
              <p className="text-muted-foreground">
                Nous vous proposons des conseils pour gérer votre budget étudiant et faire face aux difficultés
                financières.
              </p>
            </LuxuryCard>
          </div>
        </div>

        <div className="mb-16">
          <LuxuryHeading as="h2" className="text-3xl font-bold mb-8 text-center">
            Aides financières disponibles
          </LuxuryHeading>
          <div className="space-y-6">
            {aidesFinancieres.map((aide, index) => (
              <LuxuryCard key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-2 gold-text">{aide.title}</h3>
                <p className="text-muted-foreground mb-4">{aide.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold mb-1">Conditions d'octroi :</h4>
                  <p className="text-muted-foreground">{aide.conditions}</p>
                </div>
                <LuxuryButton asChild variant="outline" className="border-primary/30 hover:border-primary/60">
                  <a href={aide.lien} target="_blank" rel="noopener noreferrer">
                    Plus d'informations
                  </a>
                </LuxuryButton>
              </LuxuryCard>
            ))}
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-8 animated-border">
          <LuxuryHeading as="h2" className="text-2xl font-bold mb-4">
            Besoin d'aide financière ?
          </LuxuryHeading>
          <p className="mb-6">
            N'hésitez pas à nous contacter pour prendre rendez-vous avec l'un de nos conseillers financiers. Nous sommes
            là pour vous aider !
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <LuxuryButton asChild>
              <Link href="/contact">Prendre rendez-vous</Link>
            </LuxuryButton>
            <LuxuryButton asChild variant="outline" className="border-primary/30 hover:border-primary/60">
              <Link href="mailto:finance@cehe2b.be">finance@cehe2b.be</Link>
            </LuxuryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
