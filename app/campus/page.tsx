import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import CampusLogo from "@/components/ui/campus-logo"
import ParallaxBackground from "@/components/ui/parallax-background"
import { LuxuryHeading } from "@/components/ui/luxury-heading"

export const metadata: Metadata = {
  title: "Nos Campus | Conseil Étudiant HE2B",
  description: "Découvrez les différents campus de la Haute École Bruxelles-Brabant",
}

export default function CampusPage() {
  const campuses = [
    {
      id: "defre",
      name: "Defré",
      description: "Campus spécialisé dans la formation des enseignants et des éducateurs.",
      address: "Avenue Defré 62, 1180 Uccle",
      color: "#3F3290", // Violet Profond
    },
    {
      id: "esi",
      name: "ESI",
      description: "École Supérieure d'Informatique, formant les futurs professionnels de l'IT.",
      address: "Rue Royale 67, 1000 Bruxelles",
      color: "#3F3290", // Violet Profond
    },
    {
      id: "nivelles",
      name: "Nivelles",
      description: "Campus proposant des formations en pédagogie et en économie.",
      address: "Rue Emile Vandervelde 3, 1400 Nivelles",
      color: "#F0F3FD", // Blanc Bleuté
    },
    {
      id: "isib",
      name: "ISIB",
      description: "Institut Supérieur Industriel de Bruxelles, spécialisé dans l'ingénierie.",
      address: "Rue Royale 150, 1000 Bruxelles",
      color: "#FF4E6A", // Rose Framboise
    },
    {
      id: "ises",
      name: "ISES",
      description: "Institut Supérieur d'Études Sociales, formant aux métiers du social.",
      address: "Avenue Émile Gryzon 1, 1070 Anderlecht",
      color: "#00BFA2", // Turquoise
    },
    {
      id: "isek",
      name: "ISEK",
      description: "Institut Supérieur d'Éducation Physique et de Kinésithérapie.",
      address: "Avenue Émile Gryzon 1, 1070 Anderlecht",
      color: "#FFA726", // Orange
    },
    {
      id: "iessid",
      name: "IESSID",
      description: "Institut d'Enseignement Supérieur Social, de l'Information et de la Documentation.",
      address: "Rue de l'Abbaye 26, 1050 Ixelles",
      color: "#7E57C2", // Violet clair
    },
  ]

  return (
    <div className="relative">
      <ParallaxBackground />

      <div className="container py-24">
        <LuxuryHeading as="h1" className="text-4xl font-bold mb-6 text-center">
          Nos Campus
        </LuxuryHeading>
        <p className="text-lg text-center mb-12 max-w-3xl mx-auto text-muted-foreground">
          La Haute École Bruxelles-Brabant (HE2B) est répartie sur plusieurs campus, chacun spécialisé dans différents
          domaines d'études. Découvrez-les ci-dessous.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campuses.map((campus) => (
            <Link href={`/campus/${campus.id}`} key={campus.id} className="block group">
              <Card
                className="h-full transition-all duration-300 hover:shadow-lg group-hover:transform group-hover:scale-[1.02]"
                style={{ borderColor: `${campus.color}40` }}
              >
                <CardContent className="p-6 flex flex-col items-center">
                  <CampusLogo campus={campus.id as any} className="w-32 h-32 mb-4" />
                  <h2 className="text-2xl font-bold mb-2" style={{ color: campus.color }}>
                    {campus.name}
                  </h2>
                  <p className="text-muted-foreground text-center mb-4">{campus.description}</p>
                  <p className="text-sm text-center text-muted-foreground">{campus.address}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
