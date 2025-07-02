import type { Metadata } from "next"
import ParallaxBackground from "@/components/ui/parallax-background"
import { LuxuryHeading } from "@/components/ui/luxury-heading"
import JoinForm from "@/components/join/join-form"

export const metadata: Metadata = {
    title: "Cooptation | Conseil Étudiant HE2B",
    description: "Rejoignez le Conseil Étudiant HE2B par cooptation",
}

export default function CooptationPage() {
    return (
        <div className="relative">
            <ParallaxBackground />

            <div className="container py-12 md:py-20">
                <div className="max-w-4xl mx-auto mb-16">
                    <LuxuryHeading as="h1" className="text-4xl md:text-5xl mb-6 text-center">
                        Cooptation
                    </LuxuryHeading>
                    <p className="text-xl text-muted-foreground text-center mb-8">
                        Rejoins le Conseil Étudiant HE2B par cooptation
                    </p>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-12 border border-primary/20">
                        <h2 className="text-2xl font-bold mb-6 text-center text-primary">C'est quoi la cooptation ?</h2>
                        <p className="mb-4">
                            La cooptation est un processus interne par lequel le Conseil Étudiant peut désigner une personne pour
                            rejoindre ses rangs en cas de poste vacant ou de besoin spécifique. Ce mode de sélection, validé par les
                            membres en place, permet d'assurer la continuité et l'efficacité de l'équipe, tout en intégrant des
                            étudiant·e·s motivé·e·s et compétent·e·s pour défendre vos droits.
                        </p>
                        <p>Transparent et encadré, il garantit que chaque voix nouvelle renforce notre engagement collectif.</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-12 border border-primary/20">
                        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Comment ça se passe ?</h2>
                        <p className="mb-4">
                            Lorsqu'un poste est vacant ou qu'un besoin particulier se fait sentir, le Conseil Étudiant lance un appel
                            à candidatures. Les membres examinent les profils des candidat·e·s en fonction de leurs motivations,
                            compétences et expériences.
                        </p>
                        <p>
                            Une discussion collective est ensuite organisée pour évaluer les candidatures, suivie d'un vote interne
                            pour valider la désignation. Ce processus garantit transparence et cohérence dans le choix des nouvelles
                            recrues, toujours dans l'intérêt des étudiant·e·s.
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-primary/10">
                        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Formulaire de cooptation</h2>
                        <p className="text-center mb-8">
                            Tu souhaites nous rejoindre ? Tu as un projet précis ou tu souhaites simplement renforcer nos rangs, alors
                            remplis ce formulaire !
                        </p>

                        <JoinForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
