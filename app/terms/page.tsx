import type { Metadata } from "next"
import ParallaxBackground from "@/components/ui/parallax-background"

export const metadata: Metadata = {
  title: "Conditions d'utilisation | Conseil Étudiant HE2B",
  description: "Conditions d'utilisation du Conseil Étudiant HE2B",
}

export default function TermsPage() {
  return (
    <div className="relative">
      <ParallaxBackground />

      <div className="container py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Conditions d'utilisation</h1>
          <p className="text-muted-foreground mb-8">Dernière mise à jour : 28 mars 2025</p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Bienvenue sur le site web du Conseil Étudiant HE2B. En accédant à ce site, vous acceptez de vous conformer
              aux présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce
              site.
            </p>

            <h2>1. Utilisation du site</h2>
            <p>
              Le contenu de ce site est fourni à titre informatif uniquement. Le Conseil Étudiant HE2B se réserve le
              droit de modifier, supprimer ou mettre à jour tout contenu du site sans préavis.
            </p>
            <p>
              Vous vous engagez à utiliser ce site conformément aux lois et réglementations en vigueur et à ne pas
              l'utiliser d'une manière qui pourrait endommager, désactiver, surcharger ou altérer le site.
            </p>

            <h2>2. Propriété intellectuelle</h2>
            <p>
              Tous les contenus présents sur ce site, y compris, mais sans s'y limiter, les textes, graphiques, logos,
              icônes, images, clips audio, téléchargements numériques et compilations de données, sont la propriété du
              Conseil Étudiant HE2B ou de ses fournisseurs de contenu et sont protégés par les lois belges et
              internationales sur le droit d'auteur.
            </p>
            <p>
              Vous pouvez consulter, télécharger et imprimer le contenu de ce site pour votre usage personnel et non
              commercial, à condition de ne pas modifier le contenu et de conserver toutes les mentions de droit
              d'auteur et autres mentions de propriété.
            </p>

            <h2>3. Liens vers d'autres sites</h2>
            <p>
              Ce site peut contenir des liens vers des sites web tiers. Ces liens sont fournis uniquement pour votre
              commodité. Le Conseil Étudiant HE2B n'a aucun contrôle sur le contenu de ces sites et n'assume aucune
              responsabilité quant à leur contenu ou à leur utilisation.
            </p>

            <h2>4. Limitation de responsabilité</h2>
            <p>
              Le Conseil Étudiant HE2B s'efforce de maintenir les informations de ce site à jour et exactes. Cependant,
              nous ne garantissons pas l'exactitude, l'exhaustivité ou la pertinence des informations fournies sur ce
              site.
            </p>
            <p>
              En aucun cas, le Conseil Étudiant HE2B ne sera responsable des dommages directs, indirects, accessoires,
              consécutifs ou punitifs résultant de votre accès à ce site ou de son utilisation.
            </p>

            <h2>5. Protection des données</h2>
            <p>
              La collecte et le traitement des données personnelles sur ce site sont régis par notre politique de
              confidentialité, que vous pouvez consulter{" "}
              <a href="/privacy" className="text-primary hover:underline">
                ici
              </a>
              .
            </p>

            <h2>6. Droit applicable et juridiction compétente</h2>
            <p>
              Les présentes conditions d'utilisation sont régies par le droit belge. Tout litige relatif à
              l'interprétation ou à l'exécution des présentes conditions sera soumis à la compétence exclusive des
              tribunaux de Bruxelles.
            </p>

            <h2>7. Modifications des conditions d'utilisation</h2>
            <p>
              Le Conseil Étudiant HE2B se réserve le droit de modifier les présentes conditions d'utilisation à tout
              moment. Les modifications entreront en vigueur dès leur publication sur ce site. Nous vous encourageons à
              consulter régulièrement cette page pour rester informé des éventuelles modifications.
            </p>

            <h2>8. Contact</h2>
            <p>
              Si vous avez des questions concernant ces conditions d'utilisation, veuillez nous contacter à l'adresse
              email suivante : contact@cehe2b.be
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
