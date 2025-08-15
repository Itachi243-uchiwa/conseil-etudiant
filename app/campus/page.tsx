import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import CampusLogo from "@/components/ui/campus-logo"
import ParallaxBackground from "@/components/ui/parallax-background"
import { LuxuryHeading } from "@/components/ui/luxury-heading"
import { getCampus } from "@/lib/api"

interface CampusDto {
  id: number
  name: string
  slug: string
  fullName: string
  address: string
  description: string
  longDescription: string
  image: string
  color: string
  phone: string
  email: string
  website: string
  sections: string[]
  facilities: string[]
}

export const metadata: Metadata = {
  title: "Nos Campus | Conseil Étudiant HE2B",
  description: "Découvrez les différents campus de la Haute École Bruxelles-Brabant",
}

export default async function CampusPage() {
  const campuses: CampusDto[] = await getCampus();
  console.log(getCampus)

  return (
      <div className="relative">
        <ParallaxBackground />

        <div className="container py-24">
          <LuxuryHeading as="h1" className="text-4xl font-bold mb-6 text-center">
            Nos Campus
          </LuxuryHeading>
          <p className="text-lg text-center mb-12 max-w-3xl mx-auto text-muted-foreground">
            La Haute École Bruxelles-Brabant (HE2B) est répartie sur plusieurs campus, chacun spécialisé dans différents domaines d'études. Découvrez-les ci-dessous.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campuses.map((campus) => {
              const cleanedColor = campus.color
              return (
                  <Link href={`/campus/${campus.slug}`} key={campus.id} className="block group">
                    <Card
                        className="h-full transition-all duration-300 hover:shadow-lg group-hover:transform group-hover:scale-[1.02] border-2"
                        style={{
                          borderColor: `${cleanedColor}66`, 
                          boxShadow: `0 4px 6px -1px ${cleanedColor}33`,
                        }}
                    >
                      <CardContent className="p-6 flex flex-col items-center">
                        <CampusLogo campus={campus.slug as any} className="w-32 h-32 mb-4" />
                        <h2
                            className="text-2xl font-bold mb-2"
                            style={{ color: cleanedColor }}
                        >
                          {campus.name}
                        </h2>
                        <p className="text-muted-foreground text-center mb-4">{campus.description}</p>
                        <p className="text-sm text-center text-muted-foreground">{campus.address}</p>

                        {/* Accent coloré en bas de la carte */}
                        <div
                            className="w-full h-1 mt-4 rounded-full"
                            style={{ backgroundColor: cleanedColor }}
                        />
                      </CardContent>
                    </Card>
                  </Link>
              )
            })}
          </div>
        </div>
      </div>
  )
}