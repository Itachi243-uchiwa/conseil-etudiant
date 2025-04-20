import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { LuxuryButton } from "@/components/ui/luxury-button"
import { Mail, Phone, Linkedin, Twitter } from "lucide-react"
import ParallaxBackground from "@/components/ui/parallax-background"
import { LuxuryHeading } from "@/components/ui/luxury-heading" // Importation corrigée
import LuxuryCard from "@/components/ui/luxury-card"

export const metadata: Metadata = {
  title: "Notre équipe | Conseil Étudiant HE2B",
  description: "Découvrez l'équipe du Conseil Étudiant HE2B",
}

const teamMembers = [
  {
    name: "Marie Dupont",
    role: "Présidente",
    bio: "Étudiante en 3ème année de droit, Marie s'engage pour défendre les droits des étudiants depuis son arrivée à la HE2B.",
    image: "/placeholder.svg?height=400&width=400",
    email: "marie.dupont@cehe2b.be",
    phone: "+32 123 45 67 89",
    social: {
      linkedin: "https://www.linkedin.com/in/marie-dupont",
      twitter: "https://twitter.com/mariedupont",
    },
  },
  {
    name: "Thomas Lambert",
    role: "Vice-président",
    bio: "Étudiant en informatique, Thomas est passionné par les nouvelles technologies et l'amélioration des services numériques pour les étudiants.",
    image: "/placeholder.svg?height=400&width=400",
    email: "thomas.lambert@cehe2b.be",
    phone: "+32 123 45 67 90",
    social: {
      linkedin: "https://www.linkedin.com/in/thomas-lambert",
      twitter: "https://twitter.com/thomaslambert",
    },
  },
  {
    name: "Sophie Martin",
    role: "Trésorière",
    bio: "Étudiante en gestion, Sophie veille à la bonne gestion des finances du Conseil Étudiant et à l'allocation équitable des ressources.",
    image: "/placeholder.svg?height=400&width=400",
    email: "sophie.martin@cehe2b.be",
    phone: "+32 123 45 67 91",
    social: {
      linkedin: "https://www.linkedin.com/in/sophie-martin",
      twitter: "https://twitter.com/sophiemartin",
    },
  },
  {
    name: "Lucas Petit",
    role: "Secrétaire",
    bio: "Étudiant en communication, Lucas est responsable de la communication interne et externe du Conseil Étudiant.",
    image: "/placeholder.svg?height=400&width=400",
    email: "lucas.petit@cehe2b.be",
    phone: "+32 123 45 67 92",
    social: {
      linkedin: "https://www.linkedin.com/in/lucas-petit",
      twitter: "https://twitter.com/lucaspetit",
    },
  },
  {
    name: "Emma Leroy",
    role: "Responsable événements",
    bio: "Étudiante en marketing, Emma organise les événements du Conseil Étudiant et veille à leur bon déroulement.",
    image: "/placeholder.svg?height=400&width=400",
    email: "emma.leroy@cehe2b.be",
    phone: "+32 123 45 67 93",
    social: {
      linkedin: "https://www.linkedin.com/in/emma-leroy",
      twitter: "https://twitter.com/emmaleroy",
    },
  },
  {
    name: "Maxime Dubois",
    role: "Responsable communication",
    bio: "Étudiant en design, Maxime est en charge de la création des supports de communication du Conseil Étudiant.",
    image: "/placeholder.svg?height=400&width=400",
    email: "maxime.dubois@cehe2b.be",
    phone: "+32 123 45 67 94",
    social: {
      linkedin: "https://www.linkedin.com/in/maxime-dubois",
      twitter: "https://twitter.com/maximedubois",
    },
  },
  {
    name: "Julie Lefèvre",
    role: "Responsable aide juridique",
    bio: "Étudiante en droit, Julie coordonne le service d'aide juridique du Conseil Étudiant.",
    image: "/placeholder.svg?height=400&width=400",
    email: "julie.lefevre@cehe2b.be",
    phone: "+32 123 45 67 95",
    social: {
      linkedin: "https://www.linkedin.com/in/julie-lefevre",
      twitter: "https://twitter.com/julielefevre",
    },
  },
  {
    name: "Nicolas Durand",
    role: "Responsable soutien financier",
    bio: "Étudiant en économie, Nicolas coordonne le service de soutien financier du Conseil Étudiant.",
    image: "/placeholder.svg?height=400&width=400",
    email: "nicolas.durand@cehe2b.be",
    phone: "+32 123 45 67 96",
    social: {
      linkedin: "https://www.linkedin.com/in/nicolas-durand",
      twitter: "https://twitter.com/nicolasdurand",
    },
  },
]

export default function TeamPage() {
  return (
    <div className="relative">
      <ParallaxBackground />

      <div className="container py-12 md:py-20">
        <div className="max-w-4xl mx-auto mb-16">
          <LuxuryHeading as="h1" className="text-4xl md:text-5xl mb-6">
            Notre équipe
          </LuxuryHeading>
          <p className="text-xl text-muted-foreground">
            Découvrez les membres du Conseil Étudiant HE2B qui travaillent chaque jour pour défendre vos intérêts et
            améliorer votre vie étudiante.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member) => (
            <LuxuryCard key={member.name} className="p-6 flex flex-col items-center text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-primary/30">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-1 gold-text">{member.name}</h3>
              <p className="text-primary mb-4">{member.role}</p>
              <p className="text-muted-foreground mb-6 text-sm">{member.bio}</p>
              <div className="mt-auto w-full">
                <div className="flex justify-center space-x-2 mb-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 rounded-full bg-muted/30 hover:bg-primary/20 transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="h-4 w-4 text-primary" />
                  </a>
                  <a
                    href={`tel:${member.phone}`}
                    className="p-2 rounded-full bg-muted/30 hover:bg-primary/20 transition-colors"
                    aria-label={`Appeler ${member.name}`}
                  >
                    <Phone className="h-4 w-4 text-primary" />
                  </a>
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted/30 hover:bg-primary/20 transition-colors"
                    aria-label={`LinkedIn de ${member.name}`}
                  >
                    <Linkedin className="h-4 w-4 text-primary" />
                  </a>
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted/30 hover:bg-primary/20 transition-colors"
                    aria-label={`Twitter de ${member.name}`}
                  >
                    <Twitter className="h-4 w-4 text-primary" />
                  </a>
                </div>
              </div>
            </LuxuryCard>
          ))}
        </div>

        <div className="bg-muted/30 rounded-lg p-8 animated-border">
          <LuxuryHeading as="h2" className="text-2xl font-bold mb-4">
            Rejoignez notre équipe
          </LuxuryHeading>
          <p className="mb-6">
            Vous souhaitez vous investir dans la vie étudiante de la HE2B ? Rejoignez le Conseil Étudiant ! Nous
            recherchons des étudiants motivés et engagés pour représenter leurs camarades.
          </p>
          <LuxuryButton asChild variant="gold">
            <Link href="/join">Comment nous rejoindre</Link>
          </LuxuryButton>
        </div>
      </div>
    </div>
  )
}
