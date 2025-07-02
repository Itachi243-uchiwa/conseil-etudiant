import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Briefcase, Coins, FileText, GraduationCap, Scale } from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"
import { getServices } from "@/lib/api"

export const metadata: Metadata = {
  title: "Services | Conseil Étudiant HE2B",
  description: "Découvrez les services proposés par le Conseil Étudiant HE2B",
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

export default async function ServicesPage() {
  const services: ServiceItem[] = await getServices() || []

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

          {services.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucun service disponible pour le moment.</p>
              </div>
          ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {services.map((service) => {
                    const IconComponent = getIcon(service.icon)
                    return (
                        <Card key={service.id} className="tilt-on-hover card-shine h-full flex flex-col">
                          <CardHeader>
                            <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>{service.title}</CardTitle>
                            <CardDescription>{service.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-muted-foreground line-clamp-3">{service.content}</p>
                          </CardContent>
                          <CardFooter>
                            <Button asChild>
                              <Link href={`/services/${service.slug}`}>En savoir plus</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                    )
                  })}
                </div>

                <div className="flex justify-center">
                  <Button variant="outline" size="lg">
                    Charger plus de services
                  </Button>
                </div>
              </>
          )}

          <div className="grid md:grid-cols-2 gap-12 items-center bg-muted/30 rounded-lg p-8 mt-16">
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