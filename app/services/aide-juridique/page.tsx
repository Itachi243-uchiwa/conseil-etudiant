import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { LuxuryButton } from "@/components/ui/luxury-button"
import { Scale, FileText, HelpCircle } from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"
import { LuxuryHeading } from "@/components/ui/luxury-heading" // Importation corrigée
import LuxuryCard from "@/components/ui/luxury-card"

export const metadata: Metadata = {
  title: "Aide Juridique | Conseil Étudiant HE2B",
  description: "Service d'aide juridique du Conseil Étudiant HE2B",
}

const faqItems = [
  {
    question: "Comment puis-je bénéficier du service d'aide juridique ?",
    answer:
      "Pour bénéficier de notre service d'aide juridique, il vous suffit de prendre rendez-vous par email à juridique@cehe2b.be ou de vous présenter à nos permanences sur les différents campus de la HE2B.",
  },
  {
    question: "Quels types de problèmes juridiques pouvez-vous m'aider à résoudre ?",
    answer:
      "Notre service d'aide juridique peut vous aider pour les questions liées à vos études (règlement des études, examens, recours), à votre logement (bail étudiant, état des lieux), à votre statut d'étudiant (visa, titre de séjour) et à vos droits en général.",
  },
  {
    question: "Le service d'aide juridique est-il gratuit ?",
    answer:
      "Oui, le service d'aide juridique du Conseil Étudiant HE2B est entièrement gratuit pour tous les étudiants de la HE2B.",
  },
  {
    question: "Qui sont les conseillers juridiques ?",
    answer:
      "Nos conseillers juridiques sont des étudiants en droit des années supérieures, supervisés par des professionnels du droit (avocats, juristes) qui collaborent avec le Conseil Étudiant.",
  },
]

export default function AideJuridiquePage() {
  return (
    <div className="relative">
      <ParallaxBackground />

      <div className="container py-12 md:py-20">
        <div className="max-w-4xl mx-auto mb-16">
          <LuxuryHeading as="h1" className="text-4xl md:text-5xl mb-6">
            Service d'aide juridique
          </LuxuryHeading>
          <p className="text-xl text-muted-foreground">
            Le service d'aide juridique du Conseil Étudiant HE2B vous accompagne dans toutes vos démarches juridiques
            liées à vos études et à votre vie étudiante.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="perspective-container order-2 lg:order-1">
            <div className="card-3d card-shine rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Service d'aide juridique"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <LuxuryHeading as="h2" className="text-2xl font-bold mb-4">
              Notre mission
            </LuxuryHeading>
            <p className="text-muted-foreground mb-6">
              Notre service d'aide juridique a pour mission de vous informer sur vos droits et obligations en tant
              qu'étudiant, de vous conseiller dans vos démarches juridiques et de vous accompagner dans la résolution de
              vos problèmes juridiques.
            </p>
            <p className="text-muted-foreground mb-8">
              Que ce soit pour un problème de contrat de bail, un litige avec un professeur ou une question sur le
              règlement des études, nos conseillers juridiques sont là pour vous aider.
            </p>
            <LuxuryButton asChild variant="gold">
              <Link href="/contact">Prendre rendez-vous</Link>
            </LuxuryButton>
          </div>
        </div>

        <div className="mb-16">
          <LuxuryHeading as="h2" className="text-3xl font-bold mb-8 text-center">
            Nos services
          </LuxuryHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <LuxuryCard className="p-6">
              <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 gold-text">Conseils juridiques</h3>
              <p className="text-muted-foreground">
                Nos conseillers juridiques vous informent sur vos droits et obligations en tant qu'étudiant et vous
                conseillent sur les démarches à entreprendre.
              </p>
            </LuxuryCard>
            <LuxuryCard className="p-6">
              <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 gold-text">Aide à la rédaction</h3>
              <p className="text-muted-foreground">
                Nous vous aidons à rédiger vos courriers, recours et autres documents juridiques nécessaires à vos
                démarches.
              </p>
            </LuxuryCard>
            <LuxuryCard className="p-6">
              <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 gold-text">Accompagnement</h3>
              <p className="text-muted-foreground">
                Nous vous accompagnons dans vos démarches juridiques et administratives, notamment lors des procédures
                de recours.
              </p>
            </LuxuryCard>
          </div>
        </div>

        <div className="mb-16">
          <LuxuryHeading as="h2" className="text-3xl font-bold mb-8 text-center">
            Questions fréquentes
          </LuxuryHeading>
          <div className="space-y-6 max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <LuxuryCard key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-2 gold-text">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </LuxuryCard>
            ))}
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-8 animated-border">
          <LuxuryHeading as="h2" className="text-2xl font-bold mb-4">
            Besoin d'aide juridique ?
          </LuxuryHeading>
          <p className="mb-6">
            N'hésitez pas à nous contacter pour prendre rendez-vous avec l'un de nos conseillers juridiques. Nous sommes
            là pour vous aider !
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <LuxuryButton asChild>
              <Link href="/contact">Prendre rendez-vous</Link>
            </LuxuryButton>
            <LuxuryButton asChild variant="outline" className="border-primary/30 hover:border-primary/60">
              <Link href="mailto:juridique@cehe2b.be">juridique@cehe2b.be</Link>
            </LuxuryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
