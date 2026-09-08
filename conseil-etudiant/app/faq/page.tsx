import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ParallaxBackground from "@/components/ui/parallax-background"
import { LuxuryHeading } from "@/components/ui/luxury-heading"
import LuxuryCard from "@/components/ui/luxury-card"

export const metadata: Metadata = {
  title: "FAQ | Conseil Étudiant HE2B",
  description: "Questions fréquemment posées au Conseil Étudiant HE2B",
}

const faqCategories = [
  {
    title: "Le Conseil Étudiant",
    items: [
      {
        question: "Qu'est-ce que le Conseil Étudiant HE2B ?",
        answer:
          "Le Conseil Étudiant HE2B est l'organe de représentation des étudiants au sein de la Haute École Bruxelles-Brabant. Il a pour mission de défendre les intérêts des étudiants, de les représenter auprès des autorités académiques et administratives, et de leur offrir divers services.",
      },
      {
        question: "Comment est composé le Conseil Étudiant ?",
        answer:
          "Le Conseil Étudiant est composé d'étudiants élus démocratiquement par leurs pairs. Il comprend des représentants de tous les campus et de toutes les sections de la HE2B. L'équipe est dirigée par un bureau exécutif composé d'un président, d'un vice-président, d'un trésorier et d'un secrétaire.",
      },
      {
        question: "Comment puis-je contacter le Conseil Étudiant ?",
        answer:
          "Vous pouvez contacter le Conseil Étudiant par email à contact@cehe2b.be, par téléphone au +32 12 345 678, ou en vous rendant dans nos bureaux sur les différents campus de la HE2B. Vous pouvez également nous contacter via notre formulaire en ligne sur la page Contact.",
      },
      {
        question: "Comment puis-je rejoindre le Conseil Étudiant ?",
        answer:
          "Pour rejoindre le Conseil Étudiant, vous pouvez soit vous présenter aux élections étudiantes qui ont lieu chaque année, soit postuler pour l'un des postes à pourvoir en envoyant votre CV et une lettre de motivation à recrutement@cehe2b.be. Nous recherchons régulièrement des étudiants motivés et engagés pour renforcer notre équipe.",
      },
    ],
  },
  {
    title: "Services aux étudiants",
    items: [
      {
        question: "Quels services le Conseil Étudiant propose-t-il ?",
        answer:
          "Le Conseil Étudiant propose divers services aux étudiants, notamment : aide juridique, soutien financier, accompagnement pédagogique, aide à la réussite, aide aux recours, et conseils pour l'insertion professionnelle. Tous ces services sont gratuits et accessibles à tous les étudiants de la HE2B.",
      },
      {
        question: "Comment puis-je bénéficier de ces services ?",
        answer:
          "Pour bénéficier de nos services, il vous suffit de nous contacter par email, par téléphone ou en vous rendant dans nos bureaux. Vous pouvez également prendre rendez-vous via notre site web. Nos conseillers vous recevront et vous accompagneront dans vos démarches.",
      },
      {
        question: "Les services du Conseil Étudiant sont-ils gratuits ?",
        answer:
          "Oui, tous les services proposés par le Conseil Étudiant sont entièrement gratuits pour les étudiants de la HE2B. Ils sont financés par les subsides alloués au Conseil Étudiant et par les cotisations des étudiants.",
      },
    ],
  },
  {
    title: "Vie étudiante",
    items: [
      {
        question: "Quels événements le Conseil Étudiant organise-t-il ?",
        answer:
          "Le Conseil Étudiant organise divers événements tout au long de l'année académique : bal annuel, soirées d'intégration, journées d'accueil, conférences, tournois sportifs, semaines culturelles, etc. Ces événements sont l'occasion de rencontrer d'autres étudiants et de participer à la vie de l'école.",
      },
      {
        question: "Comment puis-je être informé des événements à venir ?",
        answer:
          "Pour être informé des événements à venir, vous pouvez suivre nos réseaux sociaux (Facebook, Instagram, Twitter), consulter notre site web ou vous abonner à notre newsletter. Des affiches sont également placées sur les différents campus de la HE2B.",
      },
      {
        question: "Puis-je proposer un événement au Conseil Étudiant ?",
        answer:
          "Oui, vous pouvez proposer un événement au Conseil Étudiant. Il vous suffit de nous contacter avec votre idée, et nous étudierons sa faisabilité. Nous sommes toujours à la recherche de nouvelles idées pour animer la vie étudiante !",
      },
    ],
  },
  {
    title: "Questions académiques",
    items: [
      {
        question: "Que faire en cas d'échec à un examen ?",
        answer:
          "En cas d'échec à un examen, plusieurs options s'offrent à vous : vous pouvez le représenter lors de la session suivante, demander à consulter votre copie pour comprendre vos erreurs, ou, si vous estimez qu'une erreur a été commise dans la correction, introduire un recours. Le Conseil Étudiant peut vous accompagner dans ces démarches.",
      },
      {
        question: "Comment introduire un recours ?",
        answer:
          "Pour introduire un recours, vous devez adresser une lettre motivée au secrétariat de votre département dans les délais prévus par le règlement des études. Le Conseil Étudiant peut vous aider à rédiger cette lettre et à constituer votre dossier. N'hésitez pas à nous contacter pour un accompagnement personnalisé.",
      },
      {
        question: "Puis-je obtenir une dispense pour certains cours ?",
        answer:
          "Oui, vous pouvez demander une dispense pour les cours que vous avez déjà suivis et réussis dans un autre établissement d'enseignement supérieur. Pour cela, vous devez introduire une demande auprès du secrétariat de votre département, accompagnée des relevés de notes et des descriptifs des cours concernés. Le Conseil Étudiant peut vous aider dans cette démarche.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="relative">
      <ParallaxBackground />

      <div className="container py-12 md:py-20">
        <div className="max-w-4xl mx-auto mb-16">
          <LuxuryHeading as="h1" className="text-4xl md:text-5xl mb-6">
            Questions fréquemment posées
          </LuxuryHeading>
          <p className="text-xl text-muted-foreground">
            Retrouvez ici les réponses aux questions les plus fréquemment posées au Conseil Étudiant HE2B. Si vous ne
            trouvez pas la réponse à votre question, n'hésitez pas à nous contacter.
          </p>
        </div>

        <div className="space-y-12 max-w-3xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <LuxuryHeading as="h2" className="text-2xl font-bold mb-6">
                {category.title}
              </LuxuryHeading>
              <LuxuryCard className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {category.items.map((item, itemIndex) => (
                    <AccordionItem key={itemIndex} value={`item-${categoryIndex}-${itemIndex}`}>
                      <AccordionTrigger className="text-left gold-text">{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </LuxuryCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
