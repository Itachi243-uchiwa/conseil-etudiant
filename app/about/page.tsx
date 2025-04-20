import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ParallaxBackground from "@/components/ui/parallax-background"

export const metadata: Metadata = {
  title: "À propos | Conseil Étudiant HE2B",
  description: "Découvrez l'équipe et la mission du Conseil Étudiant HE2B",
}

const teamMembers = [
  {
    name: "Marie Dupont",
    role: "Présidente",
    bio: "Étudiante en 3ème année de droit, Marie s'engage pour défendre les droits des étudiants depuis son arrivée à la HE2B.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Thomas Lambert",
    role: "Vice-président",
    bio: "Étudiant en informatique, Thomas est passionné par les nouvelles technologies et l'amélioration des services numériques pour les étudiants.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Sophie Martin",
    role: "Trésorière",
    bio: "Étudiante en gestion, Sophie veille à la bonne gestion des finances du Conseil Étudiant et à l'allocation équitable des ressources.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Lucas Petit",
    role: "Secrétaire",
    bio: "Étudiant en communication, Lucas est responsable de la communication interne et externe du Conseil Étudiant.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Emma Leroy",
    role: "Responsable événements",
    bio: "Étudiante en marketing, Emma organise les événements du Conseil Étudiant et veille à leur bon déroulement.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Maxime Dubois",
    role: "Responsable communication",
    bio: "Étudiant en design, Maxime est en charge de la création des supports de communication du Conseil Étudiant.",
    image: "/placeholder.svg?height=400&width=400",
  },
]

export default function AboutPage() {
  return (
    <div className="relative">
      <ParallaxBackground />

      <div className="container py-12 md:py-20">
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">À propos du Conseil Étudiant HE2B</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Le Conseil Étudiant HE2B est l'organe de représentation des étudiants au sein de la Haute École
            Bruxelles-Brabant. Découvrez notre histoire, notre mission et notre équipe.
          </p>
        </div>

        <Tabs defaultValue="mission" className="mb-16">
          <TabsList className="grid w-full md:w-[400px] grid-cols-3">
            <TabsTrigger value="mission">Mission</TabsTrigger>
            <TabsTrigger value="histoire">Histoire</TabsTrigger>
            <TabsTrigger value="valeurs">Valeurs</TabsTrigger>
          </TabsList>
          <TabsContent value="mission" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Notre mission</h2>
                <p className="mb-4">
                  Le Conseil Étudiant HE2B a pour mission de représenter l'ensemble des étudiants de la Haute École
                  Bruxelles-Brabant auprès des autorités académiques et administratives.
                </p>
                <p className="mb-4">
                  Nous défendons les intérêts des étudiants sur les questions relatives à l'enseignement, à la pédagogie
                  et à la gestion de la Haute École.
                </p>
                <p>
                  Nous assurons également la bonne circulation de l'information entre les étudiants et la direction de
                  la HE2B, ainsi que sur leurs droits et devoirs.
                </p>
              </div>
              <div className="perspective-container">
                <div className="card-3d card-shine rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Mission du Conseil Étudiant"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="histoire" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="perspective-container order-2 md:order-1">
                <div className="card-3d card-shine rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Histoire du Conseil Étudiant"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-2xl font-bold mb-4">Notre histoire</h2>
                <p className="mb-4">
                  Le Conseil Étudiant HE2B a été créé en 2016, suite à la fusion des Hautes Écoles qui ont formé la
                  HE2B. Depuis sa création, il n'a cessé d'évoluer pour mieux représenter les étudiants.
                </p>
                <p className="mb-4">
                  Au fil des années, le Conseil Étudiant a mis en place de nombreux services pour les étudiants, comme
                  l'aide juridique, le soutien financier et l'accompagnement pédagogique.
                </p>
                <p>
                  Aujourd'hui, le Conseil Étudiant HE2B est reconnu comme un acteur incontournable de la vie étudiante
                  au sein de la Haute École Bruxelles-Brabant.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="valeurs" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Nos valeurs</h2>
                <p className="mb-4">
                  Le Conseil Étudiant HE2B s'engage à respecter et à promouvoir les valeurs suivantes :
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>
                      <strong>Transparence</strong> : Nous communiquons de manière claire et honnête avec les étudiants
                      et les autorités académiques.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>
                      <strong>Équité</strong> : Nous défendons les droits de tous les étudiants, sans discrimination.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>
                      <strong>Engagement</strong> : Nous nous investissons pleinement dans notre mission de
                      représentation des étudiants.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>
                      <strong>Solidarité</strong> : Nous soutenons les étudiants dans leurs démarches et leurs
                      difficultés.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="perspective-container">
                <div className="card-3d card-shine rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Valeurs du Conseil Étudiant"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Notre équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="tilt-on-hover card-shine">
                <CardContent className="p-6">
                  <div className="aspect-square relative rounded-full overflow-hidden mb-4 mx-auto w-40 h-40">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-1">{member.name}</h3>
                  <p className="text-primary text-center mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-center">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Rejoignez-nous</h2>
          <p className="mb-4">
            Vous souhaitez vous investir dans la vie étudiante de la HE2B ? Rejoignez le Conseil Étudiant ! Nous
            recherchons des étudiants motivés et engagés pour représenter leurs camarades.
          </p>
          <p className="mb-4">
            En rejoignant le Conseil Étudiant, vous aurez l'opportunité de développer vos compétences en communication,
            en gestion de projet et en leadership, tout en contribuant à l'amélioration de la vie étudiante.
          </p>
          <div className="mt-6">
            <a
              href="/join"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              En savoir plus
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
