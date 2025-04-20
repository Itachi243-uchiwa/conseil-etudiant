import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Briefcase, Coins, FileText, GraduationCap, Scale } from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"

export const metadata: Metadata = {
  title: "Services | Conseil Étudiant HE2B",
  description: "Découvrez les services proposés par le Conseil Étudiant HE2B",
}

const services = [
  {
    title: "Aide juridique",
    description: "Conseils et assistance pour vos questions juridiques liées à vos études.",
    longDescription:
      "Notre service d'aide juridique vous accompagne dans toutes vos démarches juridiques liées à vos études. Que ce soit pour un problème de contrat de bail, un litige avec un professeur ou une question sur le règlement des études, nos conseillers juridiques sont là pour vous aider.",
    icon: Scale,
    href: "/services/aide-juridique",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Soutien financier",
    description: "Informations sur les bourses, allocations et aides financières disponibles.",
    longDescription:
      "Notre service de soutien financier vous informe sur les différentes aides financières disponibles pour les étudiants. Nous vous aidons à constituer vos dossiers de demande de bourse et à trouver des solutions en cas de difficultés financières.",
    icon: Coins,
    href: "/services/soutien-financier",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Accompagnement pédagogique",
    description: "Soutien pour vos démarches académiques et administratives.",
    longDescription:
      "Notre service d'accompagnement pédagogique vous aide dans vos démarches académiques et administratives. Nous vous conseillons sur votre parcours académique, vos choix d'options et vos demandes de dispense.",
    icon: GraduationCap,
    href: "/services/accompagnement",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Service d'aide à la réussite",
    description: "Ressources et conseils pour vous aider à réussir vos études.",
    longDescription:
      "Notre service d'aide à la réussite vous propose des ressources et des conseils pour vous aider à réussir vos études. Nous organisons des séances de tutorat, des ateliers de méthodologie et des groupes d'étude.",
    icon: BookOpen,
    href: "/services/aide-reussite",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Aide aux recours",
    description: "Assistance pour les procédures de recours académiques.",
    longDescription:
      "Notre service d'aide aux recours vous accompagne dans vos procédures de recours académiques. Nous vous aidons à rédiger votre lettre de recours, à constituer votre dossier et à préparer votre défense.",
    icon: FileText,
    href: "/services/recours",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Insertion professionnelle",
    description: "Conseils pour votre future carrière et votre insertion professionnelle.",
    longDescription:
      "Notre service d'insertion professionnelle vous aide à préparer votre entrée dans la vie active. Nous vous proposons des ateliers CV, des simulations d'entretien d'embauche et des conseils pour votre recherche d'emploi ou de stage.",
    icon: Briefcase,
    href: "/services/insertion",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function ServicesPage() {
  return (
    <div className="relative">
      <ParallaxBackground />

      <div className="container py-12 md:py-20">
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos services</h1>
          <p className="text-xl text-muted-foreground">
            Le Conseil Étudiant HE2B propose une variété de services pour accompagner les étudiants tout au long de leur
            parcours académique. Découvrez nos services et n'hésitez pas à nous contacter pour plus d'informations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <Card key={service.title} className="tilt-on-hover card-shine h-full flex flex-col">
              <CardHeader>
                <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{service.longDescription}</p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={service.href}>En savoir plus</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center bg-muted/30 rounded-lg p-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Comment accéder à nos services ?</h2>
            <p className="mb-4">
              Tous nos services sont gratuits et accessibles à tous les étudiants de la HE2B. Pour bénéficier de nos
              services, vous pouvez :
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">•</span>
                <span>
                  Nous contacter par email à{" "}
                  <a href="mailto:services@cehe2b.be" className="text-primary hover:underline">
                    services@cehe2b.be
                  </a>
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">•</span>
                <span>Venir nous rencontrer dans nos bureaux sur les différents campus de la HE2B</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">•</span>
                <span>Nous contacter via notre formulaire en ligne</span>
              </li>
            </ul>
            <Button asChild>
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
          <div className="perspective-container">
            <div className="card-3d card-shine rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Services du Conseil Étudiant"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
