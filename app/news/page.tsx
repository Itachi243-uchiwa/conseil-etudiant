import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"

export const metadata: Metadata = {
  title: "Actualités | Conseil Étudiant HE2B",
  description: "Restez informé des dernières nouvelles du Conseil Étudiant HE2B",
}

const news = [
  {
    id: 1,
    title: "Le CE recrute pour l'année 2025-2026",
    excerpt: "Tu veux t'investir dans l'école ? Le Conseil Étudiant recrute pour l'année 2025-2026. Rejoins-nous !",
    content:
      "Le Conseil Étudiant HE2B recrute pour l'année académique 2025-2026 ! Nous recherchons des étudiants motivés et engagés pour rejoindre notre équipe et contribuer à l'amélioration de la vie étudiante. Si tu souhaites t'investir dans la vie de ton école, développer tes compétences en communication, en gestion de projet et en leadership, et faire partie d'une équipe dynamique, n'hésite pas à poser ta candidature. Nous recherchons des étudiants de tous les campus et de toutes les sections. Pour postuler, envoie-nous ton CV et une lettre de motivation à l'adresse recrutement@cehe2b.be avant le 30 avril 2025.",
    date: "9 mars 2025",
    image: "/placeholder.svg?height=300&width=500",
    href: "/news/recrutement-2025",
  },
  {
    id: 2,
    title: "Comment déposer un recours ?",
    excerpt: "Guide pratique pour déposer un recours en cas de contestation de résultats d'examens.",
    content:
      "Tu as reçu tes résultats d'examens et tu souhaites contester une note ? Le Conseil Étudiant HE2B te propose un guide pratique pour t'aider dans ta démarche de recours. Dans cet article, nous t'expliquons les différentes étapes à suivre pour déposer un recours, les délais à respecter et les documents à fournir. Nous te donnons également des conseils pour rédiger ta lettre de recours et préparer ton dossier. N'hésite pas à nous contacter si tu as besoin d'aide ou de conseils personnalisés. Notre service d'aide aux recours est là pour t'accompagner dans cette démarche.",
    date: "28 janvier 2025",
    image: "/placeholder.svg?height=300&width=500",
    href: "/news/guide-recours",
  },
  {
    id: 3,
    title: "Bal 2025 : Recherche DJ & Groupe de Musique",
    excerpt: "Le CE recherche un DJ et un groupe de musique pour animer le bal 2025.",
    content:
      "Le Conseil Étudiant HE2B recherche un DJ et un groupe de musique pour animer le bal 2025 qui aura lieu le 4 avril 2025 au Musée de Bruxelles. Si tu es DJ ou membre d'un groupe de musique et que tu souhaites te produire lors de cet événement incontournable de l'année académique, n'hésite pas à nous contacter. Nous recherchons un DJ capable de mixer tous styles de musique et un groupe de musique pour animer la première partie de soirée. Pour postuler, envoie-nous une démo et une présentation de ton projet à l'adresse bal@cehe2b.be avant le 14 février 2025.",
    date: "19 janvier 2025",
    image: "/placeholder.svg?height=300&width=500",
    href: "/news/recherche-dj",
  },
  {
    id: 4,
    title: "Résultats des élections étudiantes 2024",
    excerpt: "Découvrez les résultats des élections étudiantes qui se sont déroulées en novembre 2024.",
    content:
      "Les élections étudiantes 2024 se sont déroulées du 15 au 19 novembre 2024. Nous tenons à remercier tous les étudiants qui ont participé à ce moment important de la vie démocratique de notre institution. Avec un taux de participation de 45%, ces élections ont été un véritable succès. Nous félicitons les nouveaux élus qui prendront leurs fonctions dès janvier 2025 et nous remercions les représentants sortants pour leur engagement et leur travail au service des étudiants. Retrouvez dans cet article la liste complète des élus par campus et par section.",
    date: "25 novembre 2024",
    image: "/placeholder.svg?height=300&width=500",
    href: "/news/resultats-elections-2024",
  },
  {
    id: 5,
    title: "Nouveau service d'aide psychologique",
    excerpt: "Le CE met en place un nouveau service d'aide psychologique pour les étudiants.",
    content:
      "Le Conseil Étudiant HE2B est heureux de vous annoncer la mise en place d'un nouveau service d'aide psychologique pour les étudiants. Face aux défis et au stress que peuvent représenter les études supérieures, nous avons décidé de mettre en place ce service pour accompagner les étudiants qui en ressentent le besoin. Des psychologues professionnels seront disponibles sur rendez-vous pour des consultations gratuites et confidentielles. Ce service sera accessible à tous les étudiants de la HE2B, sur tous les campus. Pour prendre rendez-vous, il vous suffit d'envoyer un email à psycho@cehe2b.be ou de vous rendre dans nos bureaux.",
    date: "10 octobre 2024",
    image: "/placeholder.svg?height=300&width=500",
    href: "/news/service-psychologique",
  },
  {
    id: 6,
    title: "Enquête sur les besoins des étudiants",
    excerpt: "Participez à notre enquête pour nous aider à améliorer nos services.",
    content:
      "Le Conseil Étudiant HE2B lance une grande enquête sur les besoins des étudiants. Cette enquête a pour objectif de mieux comprendre vos attentes et vos besoins afin d'améliorer nos services et de développer de nouveaux projets qui répondent à vos préoccupations. L'enquête est anonyme et ne prendra que quelques minutes de votre temps. Votre participation est essentielle pour nous aider à mieux vous représenter et à défendre vos intérêts. Pour participer, il vous suffit de cliquer sur le lien ci-dessous. Nous vous remercions d'avance pour votre contribution !",
    date: "5 octobre 2024",
    image: "/placeholder.svg?height=300&width=500",
    href: "/news/enquete-besoins",
  },
]

export default function NewsPage() {
  return (
    <div className="relative">
      <ParallaxBackground />

      <div className="container py-12 md:py-20">
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Actualités</h1>
          <p className="text-xl text-muted-foreground">
            Restez informé des dernières nouvelles du Conseil Étudiant HE2B. Retrouvez ici toutes nos actualités,
            annonces et informations importantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {news.map((item) => (
            <Card key={item.id} className="tilt-on-hover card-shine h-full flex flex-col">
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  <span>{item.date}</span>
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{item.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={item.href}>Lire la suite</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" size="lg">
            Charger plus d'actualités
          </Button>
        </div>
      </div>
    </div>
  )
}
