import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"

export const metadata: Metadata = {
  title: "Rejoindre | Conseil Étudiant HE2B",
  description: "Rejoignez le Conseil Étudiant HE2B et contribuez à améliorer la vie étudiante",
}

const benefits = [
  "Développer vos compétences en communication, gestion de projet et leadership",
  "Participer activement à la vie étudiante et à l'amélioration de votre école",
  "Rencontrer des étudiants de tous les campus et de toutes les sections",
  "Acquérir une expérience valorisante pour votre CV",
  "Être au cœur des décisions qui concernent les étudiants",
  "Organiser des événements et des projets qui vous tiennent à cœur",
]

const positions = [
  {
    title: "Représentant de section",
    description: "Représenter les étudiants de votre section auprès du Conseil Étudiant et des autorités académiques.",
    requirements:
      "Être étudiant dans la section concernée, avoir un bon sens de la communication et être à l'écoute des autres.",
  },
  {
    title: "Responsable communication",
    description:
      "Gérer la communication du Conseil Étudiant sur les réseaux sociaux, le site web et les supports physiques.",
    requirements:
      "Avoir des compétences en communication, maîtriser les réseaux sociaux et avoir un bon sens de la créativité.",
  },
  {
    title: "Responsable événements",
    description: "Organiser et coordonner les événements du Conseil Étudiant tout au long de l'année académique.",
    requirements:
      "Être organisé, créatif et avoir un bon sens du relationnel. Une expérience dans l'organisation d'événements est un plus.",
  },
  {
    title: "Responsable services aux étudiants",
    description:
      "Coordonner les différents services proposés par le Conseil Étudiant et veiller à leur bon fonctionnement.",
    requirements:
      "Être à l'écoute des besoins des étudiants, avoir un bon sens de l'organisation et être capable de travailler en équipe.",
  },
]

const steps = [
  {
    title: "Candidature",
    description:
      "Envoyez votre CV et une lettre de motivation à recrutement@cehe2b.be en précisant le poste qui vous intéresse.",
  },
  {
    title: "Entretien",
    description:
      "Si votre candidature est retenue, vous serez convié à un entretien avec les membres du Conseil Étudiant.",
  },
  {
    title: "Intégration",
    description:
      "Si vous êtes sélectionné, vous intégrerez l'équipe du Conseil Étudiant et bénéficierez d'une formation pour vous familiariser avec vos nouvelles responsabilités.",
  },
]

export default function JoinPage() {
  return (
    <div className="relative">
      <ParallaxBackground />

      <div className="container py-12 md:py-20">
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Rejoignez-nous</h1>
          <p className="text-xl text-muted-foreground">
            Vous souhaitez vous investir dans la vie étudiante de la HE2B ? Rejoignez le Conseil Étudiant ! Nous
            recherchons des étudiants motivés et engagés pour représenter leurs camarades et contribuer à l'amélioration
            de la vie étudiante à la HE2B.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="perspective-container order-2 lg:order-1">
            <div className="card-3d card-shine rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Rejoindre le Conseil Étudiant"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl font-bold mb-6">Pourquoi rejoindre le Conseil Étudiant ?</h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Postes à pourvoir</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {positions.map((position, index) => (
              <Card key={index} className="tilt-on-hover card-shine h-full">
                <CardHeader>
                  <CardTitle>{position.title}</CardTitle>
                  <CardDescription>{position.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2">Prérequis :</h4>
                  <p className="text-muted-foreground">{position.requirements}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Comment postuler ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="tilt-on-hover card-shine h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">{index + 1}</span>
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Prêt à rejoindre l'aventure ?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Si vous êtes intéressé par l'un de ces postes ou si vous avez des questions, n'hésitez pas à nous contacter.
            Nous serons ravis de vous accueillir dans notre équipe !
          </p>
          <Button asChild size="lg">
            <Link href="mailto:recrutement@cehe2b.be">Postuler maintenant</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
