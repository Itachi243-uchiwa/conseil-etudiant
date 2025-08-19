import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ParallaxBackground from "@/components/ui/parallax-background"
import { Button } from "@/components/ui/button"
import { Shield, Mail, Phone, Users, Heart, Megaphone, GraduationCap, Handshake, Lightbulb } from "lucide-react"
import { getOfficeMembers, getMissions } from "@/lib/api"
import { generateMetadata, generateStructuredData } from "@/lib/seo"
import { StructuredData } from "@/components/StructuredData"
import LuxuryHeading from "@/components/ui/luxury-heading";

export const metadata: Metadata = generateMetadata({
    title: "À Propos - Histoire, Mission et Équipe du Conseil Étudiant",
    description:
        "Découvrez l'histoire, la mission et l'équipe du Conseil Étudiant HE2B. Depuis 2016, nous représentons et défendons les intérêts de tous les étudiants de la Haute École Bruxelles-Brabant.",
    keywords: ["à propos", "histoire", "mission", "équipe", "représentation étudiante", "valeurs", "engagement"],
    url: "/about",
})

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
        case "shield":
            return Shield
        case "users":
            return Users
        case "heart":
            return Heart
        case "megaphone":
            return Megaphone
        case "graduation-cap":
            return GraduationCap
        case "handshake":
            return Handshake
        case "lightbulb":
            return Lightbulb
        default:
            return Shield
    }
}

export default async function AboutPage() {
    const teamMembers: TeamMemberDto[] = await getOfficeMembers()
    const missions: MissionDto[] = await getMissions()
    const missionImages = missions.slice(0, 3)

    const structuredData = generateStructuredData("organization", {})

    return (
        <>
            <StructuredData data={structuredData} />
            <div className="relative">
                <div className="hidden lg:block">
                    <ParallaxBackground />
                </div>

                <div className="container pt-20 py-4 md:py-20 px-3 md:px-8">
                    <header className="max-w-4xl mx-auto mb-6 md:mb-16">
                        <LuxuryHeading as="h1" className="text-4xl md:text-5xl mb-6 animate-fade-in-up">
                            À propos du Conseil Étudiant HE2B
                        </LuxuryHeading>

                        <p className="text-sm md:text-xl text-muted-foreground mb-4 md:mb-8 animate-fade-in-up animation-delay-200">
                            Le Conseil Étudiant HE2B est l'organe de représentation des étudiants au sein de la Haute École
                            Bruxelles-Brabant. Découvrez notre histoire, notre mission et notre équipe engagée pour vous.
                        </p>
                    </header>

                    <main>
                        <section aria-labelledby="our-missions" className="mb-6 md:mb-16">

                            <LuxuryHeading as="h2"  className="text-2xl font-bold text-center mb-6">
                                Nos Missions
                            </LuxuryHeading>

                            <p className="text-sm md:text-xl text-center mb-4 md:mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
                                Défendre · Soutenir · Informer
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8">
                                {missions.map((mission, index) => {
                                    const IconComponent = getIconComponent(mission.icon)
                                    return (
                                        <article
                                            key={mission.id}
                                            className={`animate-slide-in-bottom animation-delay-${(index + 1) * 100}`}
                                        >
                                            <Card className="bg-white/10 md:bg-white/10 backdrop-blur-sm border-primary/20 md:border-primary/20 overflow-hidden h-full hover:bg-white/15 transition-all duration-300 hover:scale-105">
                                                <div className="bg-gradient-to-br from-primary/10 to-primary/20 p-2 md:p-4 flex items-center justify-center">
                                                    <IconComponent
                                                        className="h-5 w-5 md:h-8 md:w-8 text-primary animate-pulse-glow"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <CardContent className="p-3 md:p-6">
                                                    <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-4 text-primary">{mission.title}</h3>
                                                    <p className="text-xs md:text-base text-muted-foreground leading-relaxed">
                                                        {mission.description}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </article>
                                    )
                                })}
                            </div>
                        </section>

                        {/* SECTION Mission / Histoire / Valeurs optimisée mobile */}
                        <section className="mb-6 md:mb-16 rounded-xl p-6 md:p-10 bg-transparent shadow-md">
                            <Tabs defaultValue="mission" className="mb-6 md:mb-16">
                                <TabsList className="grid w-full grid-cols-3 md:w-[400px] md:mx-0 h-8 md:h-10" role="tablist">
                                    <TabsTrigger value="mission" role="tab" className="text-xs md:text-sm px-2">
                                        Mission
                                    </TabsTrigger>
                                    <TabsTrigger value="histoire" role="tab" className="text-xs md:text-sm px-2">
                                        Histoire
                                    </TabsTrigger>
                                    <TabsTrigger value="valeurs" role="tab" className="text-xs md:text-sm px-2">
                                        Valeurs
                                    </TabsTrigger>
                                </TabsList>

                                {/* Mission */}
                                <TabsContent value="mission" className="mt-3 md:mt-6" role="tabpanel">
                                    <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-8 items-center">
                                        <div className="animate-fade-in-left order-1 md:order-none">
                                            <h3 className="text-base md:text-2xl font-bold mb-3 md:mb-4">Notre Mission</h3>
                                            <p className="mb-2 text-sm md:text-base leading-relaxed">
                                                Le Conseil Étudiant HE2B a pour mission de représenter l'ensemble des étudiants de la Haute
                                                École Bruxelles-Brabant auprès des autorités académiques et administratives.
                                            </p>
                                            <p className="mb-2 text-sm md:text-base leading-relaxed">
                                                Nous défendons les intérêts des étudiants sur les questions relatives à l'enseignement, à la
                                                pédagogie et à la gestion de la Haute École.
                                            </p>
                                            <p className="text-sm md:text-base leading-relaxed">
                                                Nous assurons également la bonne communication entre les étudiants et la direction de la HE2B,
                                                ainsi que l'information sur leurs droits et devoirs.
                                            </p>
                                        </div>
                                        <div className="mt-3 md:mt-0 animate-fade-in-right order-2 md:order-none">
                                            {missionImages[0] && (
                                                <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                                                    <Image
                                                        src={missionImages[0].image || "/hero/servies_soutien.webp"}
                                                        alt="Étudiants travaillant ensemble sur la mission du Conseil Étudiant"
                                                        width={800}
                                                        height={600}
                                                        className="w-full h-auto max-h-[250px] object-cover md:max-h-none"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </TabsContent>

                                {/* Histoire */}
                                <TabsContent value="histoire" className="mt-3 md:mt-6" role="tabpanel">
                                    <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-8 items-center">
                                        <div className="animate-fade-in-left order-2 md:order-none">
                                            {missionImages[1] && (
                                                <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                                                    <Image
                                                        src={missionImages[1].image || "/about/histoire.jpg"}
                                                        alt="Photo historique de la création du Conseil Étudiant HE2B"
                                                        width={800}
                                                        height={400}
                                                        className="w-full h-auto max-h-[250px] object-cover md:max-h-none"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="animate-fade-in-right order-1 md:order-none">
                                            <h3 className="text-base md:text-2xl font-bold mb-3 md:mb-4">Notre Histoire</h3>
                                            <p className="mb-2 text-sm md:text-base leading-relaxed">
                                                Le Conseil Étudiant HE2B a été créé en 2016 suite à la fusion des Hautes Écoles qui ont formé la
                                                Haute École Bruxelles-Brabant. Depuis sa création, il n'a cessé d'évoluer pour mieux représenter
                                                les étudiant·e·s.
                                            </p>
                                            <p className="mb-2 text-sm md:text-base leading-relaxed">
                                                Au fil des années, le Conseil Étudiant a mis en place de nombreux services pour les
                                                étudiant·e·s, comme l'aide juridique, le soutien financier et l'accompagnement pédagogique.
                                            </p>
                                            <p className="text-sm md:text-base leading-relaxed">
                                                Aujourd'hui, le Conseil Étudiant HE2B est reconnu comme un acteur incontournable de la vie
                                                étudiante au sein de la haute école.
                                            </p>
                                        </div>
                                    </div>
                                </TabsContent>

                                {/* Valeurs */}
                                <TabsContent value="valeurs" className="mt-3 md:mt-6" role="tabpanel">
                                    <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-8 items-center">
                                        <div className="animate-fade-in-left order-1 md:order-none">
                                            <h3 className="text-base md:text-2xl font-bold mb-3 md:mb-4">Nos Valeurs</h3>
                                            <p className="mb-2 text-sm md:text-base leading-relaxed">
                                                Le Conseil Étudiant HE2B s'engage à respecter et à promouvoir les valeurs suivantes :
                                            </p>
                                            <ul className="space-y-1 md:space-y-2 mb-2 md:mb-4" role="list">
                                                <li className="flex items-start text-sm md:text-base" role="listitem">
                                                    <span className="text-primary font-bold mr-2" aria-hidden="true">•</span>
                                                    <span><strong>Transparence</strong> : Nous communiquons de manière claire et honnête.</span>
                                                </li>
                                                <li className="flex items-start text-sm md:text-base" role="listitem">
                                                    <span className="text-primary font-bold mr-2" aria-hidden="true">•</span>
                                                    <span><strong>Équité</strong> : Nous défendons les droits de tous·tes les étudiant·e·s.</span>
                                                </li>
                                                <li className="flex items-start text-sm md:text-base" role="listitem">
                                                    <span className="text-primary font-bold mr-2" aria-hidden="true">•</span>
                                                    <span><strong>Engagement</strong> : Nous nous investissons pleinement.</span>
                                                </li>
                                                <li className="flex items-start text-sm md:text-base" role="listitem">
                                                    <span className="text-primary font-bold mr-2" aria-hidden="true">•</span>
                                                    <span><strong>Solidarité</strong> : Nous soutenons les étudiant·e·s dans leurs difficultés.</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="mt-3 md:mt-0 animate-fade-in-right order-2 md:order-none">
                                            {missionImages[2] && (
                                                <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                                                    <Image
                                                        src={missionImages[2].image || "/about/nos_valeurs.jpg"}
                                                        alt="Représentation visuelle des valeurs du Conseil Étudiant"
                                                        width={400}
                                                        height={400}
                                                        className="w-full h-auto max-h-[250px] object-cover md:max-h-none"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </section>

                        {/* --- RESTE DU CODE (équipe + rejoindre) inchangé --- */}
                        <section id="notre-equipe" aria-labelledby="team-section" className="mb-6 md:mb-16">
                            <LuxuryHeading as="h2"  className="text-2xl text-center font-bold mb-6">
                                Notre Equipe
                            </LuxuryHeading>

                            <div className="md:hidden space-y-3 mb-6">
                                {teamMembers.map((member, index) => (
                                    <article key={member.id} className={`animate-slide-in-bottom animation-delay-${index * 50}`}>
                                        <div className="flex items-center p-3 bg-white/10 backdrop-blur-sm border border-primary/20 rounded-lg hover:bg-white/15 transition-all duration-300">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
                                                <Image
                                                    src={member.image || "/pas_de_photo.webp"}
                                                    alt={`Photo de ${member.name}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <h3 className="font-semibold text-sm truncate">{member.name}</h3>
                                                <p className="text-primary text-xs truncate">{member.role}</p>
                                            </div>
                                            <div className="flex gap-1 ml-2">
                                                {member.email && (
                                                    <a
                                                        href={`mailto:${member.email}`}
                                                        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                                                        aria-label={`Email ${member.name}`}
                                                    >
                                                        <Mail className="h-3 w-3 text-primary" />
                                                    </a>
                                                )}
                                                {member.phone && (
                                                    <a
                                                        href={`tel:${member.phone}`}
                                                        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                                                        aria-label={`Appeler ${member.name}`}
                                                    >
                                                        <Phone className="h-3 w-3 text-primary" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                                {teamMembers.map((member, index) => (
                                    <article key={member.id} className={`animate-fade-in-up animation-delay-${index * 100}`}>
                                        <Card className="hover:shadow-lg transition-all duration-300 h-full bg-white/5 md:bg-white/10 backdrop-blur-sm border-primary/10 md:border-primary/20 hover:scale-105">
                                            <CardContent className="p-4 md:p-6">
                                                <div className="aspect-square relative rounded-full overflow-hidden mb-3 md:mb-4 mx-auto w-24 h-24 md:w-40 md:h-40">
                                                    <Image
                                                        src={member.image || "/pas_de_photo.webp"}
                                                        alt={`Photo de ${member.name}, ${member.role}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <h3 className="text-lg md:text-xl font-bold text-center mb-1">{member.name}</h3>
                                                <p className="text-primary text-center mb-3 md:mb-4 text-sm md:text-base">{member.role}</p>
                                                <div className="flex justify-center items-center gap-2 md:gap-3">
                                                    {member.email && (
                                                        <a
                                                            href={`mailto:${member.email}`}
                                                            className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors group"
                                                            aria-label={`Envoyer un email à ${member.name}`}
                                                        >
                                                            <Mail className="h-4 w-4 md:h-5 md:w-5 text-primary group-hover:text-primary/80" />
                                                        </a>
                                                    )}
                                                    {member.phone && (
                                                        <a
                                                            href={`tel:${member.phone}`}
                                                            className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors group"
                                                            aria-label={`Appeler ${member.name}`}
                                                        >
                                                            <Phone className="h-4 w-4 md:h-5 md:w-5 text-primary group-hover:text-primary/80" />
                                                        </a>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </article>
                                ))}
                            </div>
                        </section>


                        <section
                            className="bg-white/5 md:bg-muted/30 rounded-lg p-3 md:p-8 animate-fade-in-up"
                            aria-labelledby="join-us"
                        >
                            <h2 id="join-us" className="text-lg md:text-2xl font-bold mb-2 md:mb-4">
                                Rejoignez-nous
                            </h2>
                            <p className="mb-2 md:mb-4 text-xs md:text-base leading-relaxed">
                                Vous souhaitez vous investir dans la vie étudiante de la HE2B ? Rejoignez le Conseil Étudiant !
                            </p>
                            <p className="mb-3 md:mb-4 text-xs md:text-base leading-relaxed">
                                En rejoignant le Conseil Étudiant, vous aurez l'opportunité de développer vos compétences en
                                communication, en gestion de projet et en leadership.
                            </p>
                            <div className="mt-3 md:mt-6">
                                <Button asChild className="w-full md:w-auto text-xs md:text-sm h-8 md:h-10">
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
