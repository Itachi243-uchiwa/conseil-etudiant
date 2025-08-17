import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ParallaxBackground from "@/components/ui/parallax-background"
import { Button } from "@/components/ui/button"
import {
    Shield,
    Mail,
    Phone,
    Users,
    Heart,
    Megaphone,
    GraduationCap,
    Handshake,
    Lightbulb
} from "lucide-react"
import { getOfficeMembers, getMissions } from "@/lib/api"
import { generateMetadata, generateStructuredData } from "@/lib/seo"
import { StructuredData } from "@/components/StructuredData"

export const metadata: Metadata = generateMetadata({
    title: "À Propos - Histoire, Mission et Équipe du Conseil Étudiant",
    description: "Découvrez l'histoire, la mission et l'équipe du Conseil Étudiant HE2B. Depuis 2016, nous représentons et défendons les intérêts de tous les étudiants de la Haute École Bruxelles-Brabant.",
    keywords: ['à propos', 'histoire', 'mission', 'équipe', 'représentation étudiante', 'valeurs', 'engagement'],
    url: '/a-propos'
});

interface TeamMemberDto {
    id: number
    name: string
    role: string
    image: string
    phone: string
    email: string
    campus: number
}

interface MissionDto {
    id: number
    title: string
    description: string
    image: string
    icon: string
}

const getIconComponent = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
        case 'shield':
            return Shield
        case 'users':
            return Users
        case 'heart':
            return Heart
        case 'megaphone':
            return Megaphone
        case 'graduation-cap':
            return GraduationCap
        case 'handshake':
            return Handshake
        case 'lightbulb':
            return Lightbulb
        default:
            return Shield
    }
}

export default async function AboutPage() {
    const teamMembers: TeamMemberDto[] = await getOfficeMembers()
    console.log(teamMembers)
    const missions: MissionDto[] = await getMissions()
    const missionImages = missions.slice(0, 3)

    const structuredData = generateStructuredData('organization', {});

    return (
        <>
            <StructuredData data={structuredData} />
            <div className="relative">
                <ParallaxBackground />

                <div className="container py-12 md:py-20">
                    <header className="max-w-4xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            À propos du Conseil Étudiant HE2B
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Le Conseil Étudiant HE2B est l'organe de représentation des étudiants au sein de la Haute École
                            Bruxelles-Brabant. Découvrez notre histoire, notre mission et notre équipe engagée pour vous.
                        </p>
                    </header>

                    <main>
                        <section aria-labelledby="our-missions" className="mb-16">
                            <h2 id="our-missions" className="text-3xl font-bold mb-8 text-center">
                                Nos Missions
                            </h2>
                            <p className="text-xl text-center mb-12 max-w-3xl mx-auto">Défendre · Soutenir · Informer</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {missions.map((mission) => {
                                    const IconComponent = getIconComponent(mission.icon)
                                    return (
                                        <article key={mission.id}>
                                            <Card className="bg-white/10 backdrop-blur-sm border-primary/20 overflow-hidden h-full">
                                                <div className="bg-primary/10 p-4 flex items-center justify-center">
                                                    <IconComponent className="h-8 w-8 text-primary" aria-hidden="true" />
                                                </div>
                                                <CardContent className="p-6">
                                                    <h3 className="text-xl font-bold mb-4 text-primary">{mission.title}</h3>
                                                    <p className="text-muted-foreground">
                                                        {mission.description}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </article>
                                    )
                                })}
                            </div>
                        </section>

                        <section className="mb-16">
                            <Tabs defaultValue="mission" className="mb-16">
                                <TabsList className="grid w-full md:w-[400px] grid-cols-3" role="tablist">
                                    <TabsTrigger value="mission" role="tab">Mission</TabsTrigger>
                                    <TabsTrigger value="histoire" role="tab">Histoire</TabsTrigger>
                                    <TabsTrigger value="valeurs" role="tab">Valeurs</TabsTrigger>
                                </TabsList>

                                <TabsContent value="mission" className="mt-6" role="tabpanel">
                                    <div className="grid md:grid-cols-2 gap-8 items-center">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-4">Notre Mission</h3>
                                            <p className="mb-4">
                                                Le Conseil Étudiant HE2B a pour mission de représenter l'ensemble des étudiants de la Haute École
                                                Bruxelles-Brabant auprès des autorités académiques et administratives.
                                            </p>
                                            <p className="mb-4">
                                                Nous défendons les intérêts des étudiants sur les questions relatives à l'enseignement, à la pédagogie
                                                et à la gestion de la Haute École.
                                            </p>
                                            <p>
                                                Nous assurons également la bonne communication entre les étudiants et la direction de
                                                la HE2B, ainsi que l'information sur leurs droits et devoirs.
                                            </p>
                                        </div>
                                        <div className="perspective-container">
                                            <div className="card-3d card-shine rounded-lg overflow-hidden">
                                                {missionImages[0] && (
                                                    <Image
                                                        src={missionImages[0].image || "/hero/servies_soutien.webp"}
                                                        alt="Étudiants travaillant ensemble sur la mission du Conseil Étudiant"
                                                        width={800}
                                                        height={600}
                                                        className="w-full h-auto"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="histoire" className="mt-6" role="tabpanel">
                                    <div className="grid md:grid-cols-2 gap-8 items-center">
                                        <div className="perspective-container order-2 md:order-1">
                                            <div className="card-3d card-shine rounded-lg overflow-hidden">
                                                {missionImages[1] && (
                                                    <Image
                                                        src={missionImages[1].image || "/about/histoire.jpg"}
                                                        alt="Photo historique de la création du Conseil Étudiant HE2B"
                                                        width={800}
                                                        height={400}
                                                        className="w-full h-auto"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="order-1 md:order-2">
                                            <h3 className="text-2xl font-bold mb-4">Notre Histoire</h3>
                                            <p className="mb-4">
                                                Le Conseil Étudiant HE2B a été créé en 2016 suite à la fusion des Hautes Écoles qui ont formé la
                                                Haute École Bruxelles-Brabant. Depuis sa création, il n'a cessé d'évoluer pour mieux représenter les étudiant·e·s.
                                            </p>
                                            <p className="mb-4">
                                                Au fil des années, le Conseil Étudiant a mis en place de nombreux services pour les étudiant·e·s, comme
                                                l'aide juridique, le soutien financier et l'accompagnement pédagogique.
                                            </p>
                                            <p>
                                                Aujourd'hui, le Conseil Étudiant HE2B est reconnu comme un acteur incontournable de la vie étudiante
                                                au sein de la haute école.
                                            </p>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="valeurs" className="mt-6" role="tabpanel">
                                    <div className="grid md:grid-cols-2 gap-8 items-center">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-4">Nos Valeurs</h3>
                                            <p className="mb-4">
                                                Le Conseil Étudiant HE2B s'engage à respecter et à promouvoir les valeurs suivantes :
                                            </p>
                                            <ul className="space-y-2 mb-4" role="list">
                                                <li className="flex items-start" role="listitem">
                                                    <span className="text-primary font-bold mr-2" aria-hidden="true">•</span>
                                                    <span>
                            <strong>Transparence</strong> : Nous communiquons de manière claire et honnête avec les étudiant·e·s
                            et les autorités académiques.
                          </span>
                                                </li>
                                                <li className="flex items-start" role="listitem">
                                                    <span className="text-primary font-bold mr-2" aria-hidden="true">•</span>
                                                    <span>
                            <strong>Équité</strong> : Nous défendons les droits de tous·tes les étudiant·e·s, sans discrimination.
                          </span>
                                                </li>
                                                <li className="flex items-start" role="listitem">
                                                    <span className="text-primary font-bold mr-2" aria-hidden="true">•</span>
                                                    <span>
                            <strong>Engagement</strong> : Nous nous investissons pleinement dans notre mission de
                            représentation des étudiant·e·s.
                          </span>
                                                </li>
                                                <li className="flex items-start" role="listitem">
                                                    <span className="text-primary font-bold mr-2" aria-hidden="true">•</span>
                                                    <span>
                            <strong>Solidarité</strong> : Nous soutenons les étudiant·e·s dans leurs démarches et leurs
                            difficultés.
                          </span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="perspective-container">
                                            <div className="card-3d card-shine rounded-lg overflow-hidden">
                                                {missionImages[2] && (
                                                    <Image
                                                        src={missionImages[2].image || "/about/nos_valeurs.jpg"}
                                                        alt="Représentation visuelle des valeurs du Conseil Étudiant"
                                                        width={400}
                                                        height={400}
                                                        className="w-full h-auto"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </section>

                        <section id="notre-equipe" aria-labelledby="team-section" className="mb-16">
                            <h2 id="team-section" className="text-3xl font-bold mb-8 text-center">Notre Équipe</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {teamMembers.map((member) => (
                                    <article key={member.id}>
                                        <Card className="tilt-on-hover card-shine h-full">
                                            <CardContent className="p-6">
                                                <div className="aspect-square relative rounded-full overflow-hidden mb-4 mx-auto w-40 h-40">
                                                    <Image
                                                        src={member.image || "/pas_de_photo.webp"}
                                                        alt={`Photo de ${member.name}, ${member.role}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <h3 className="text-xl font-bold text-center mb-1">{member.name}</h3>
                                                <p className="text-primary text-center mb-4">{member.role}</p>
                                                <div className="flex justify-center items-center gap-3">
                                                    {member.email && (
                                                        <a
                                                            href={`mailto:${member.email}`}
                                                            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors group"
                                                            aria-label={`Envoyer un email à ${member.name}`}
                                                        >
                                                            <Mail className="h-5 w-5 text-primary group-hover:text-primary/80" />
                                                        </a>
                                                    )}
                                                    {member.phone && (
                                                        <a
                                                            href={`tel:${member.phone}`}
                                                            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors group"
                                                            aria-label={`Appeler ${member.name}`}
                                                        >
                                                            <Phone className="h-5 w-5 text-primary group-hover:text-primary/80" />
                                                        </a>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section className="bg-muted/30 rounded-lg p-8" aria-labelledby="join-us">
                            <h2 id="join-us" className="text-2xl font-bold mb-4">Rejoignez-nous</h2>
                            <p className="mb-4">
                                Vous souhaitez vous investir dans la vie étudiante de la HE2B ? Rejoignez le Conseil Étudiant ! Nous
                                recherchons des étudiants motivés et engagés pour représenter leurs camarades.
                            </p>
                            <p className="mb-4">
                                En rejoignant le Conseil Étudiant, vous aurez l'opportunité de développer vos compétences en communication,
                                en gestion de projet et en leadership, tout en contribuant à l'amélioration de la vie étudiante.
                            </p>
                            <div className="mt-6">
                                <Button asChild>
                                    <Link href="/join">En savoir plus sur l'adhésion</Link>
                                </Button>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    )
}