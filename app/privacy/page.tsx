import type { Metadata } from "next"
import ParallaxBackground from "@/components/ui/parallax-background"

export const metadata: Metadata = {
  title: "Politique de confidentialité | Conseil Étudiant HE2B",
  description: "Politique de confidentialité du Conseil Étudiant HE2B",
}

export default function PrivacyPage() {
  return (
    <div className="relative">
      <ParallaxBackground />

      <div className="container py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Politique de confidentialité</h1>
          <p className="text-muted-foreground mb-8">Dernière mise à jour : 28 mars 2025</p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Le Conseil Étudiant HE2B s'engage à protéger la vie privée des utilisateurs de son site web et de ses
              services. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos
              données personnelles.
            </p>

            <h2>1. Collecte des données personnelles</h2>
            <p>Nous collectons les données personnelles suivantes :</p>
            <ul>
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone (facultatif)</li>
              <li>Section et année d'études</li>
              <li>Campus</li>
            </ul>
            <p>Ces données sont collectées lorsque vous :</p>
            <ul>
              <li>Remplissez un formulaire de contact</li>
              <li>Vous inscrivez à un événement</li>
              <li>Postulez pour rejoindre le Conseil Étudiant</li>
              <li>Utilisez nos services</li>
            </ul>

            <h2>2. Utilisation des données personnelles</h2>
            <p>Nous utilisons vos données personnelles pour :</p>
            <ul>
              <li>Répondre à vos demandes et questions</li>
              <li>Vous informer sur nos services et événements</li>
              <li>Améliorer nos services</li>
              <li>Vous permettre de participer à nos événements</li>
              <li>Traiter votre candidature pour rejoindre le Conseil Étudiant</li>
            </ul>

            <h2>3. Conservation des données personnelles</h2>
            <p>
              Nous conservons vos données personnelles aussi longtemps que nécessaire pour atteindre les finalités pour
              lesquelles elles ont été collectées, sauf si la loi exige ou permet une période de conservation plus
              longue.
            </p>

            <h2>4. Partage des données personnelles</h2>
            <p>Nous ne partageons pas vos données personnelles avec des tiers, sauf :</p>
            <ul>
              <li>Avec votre consentement</li>
              <li>Lorsque cela est nécessaire pour fournir un service que vous avez demandé</li>
              <li>Lorsque cela est requis par la loi</li>
            </ul>

            <h2>5. Cookies</h2>
            <p>
              Notre site web utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de
              petits fichiers texte stockés sur votre appareil qui nous permettent de reconnaître votre navigateur et de
              vous offrir une expérience personnalisée.
            </p>
            <p>
              Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour être averti lorsqu'un cookie
              est envoyé. Cependant, certaines fonctionnalités de notre site web peuvent ne pas fonctionner correctement
              si vous désactivez les cookies.
            </p>

            <h2>6. Vos droits</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants
              concernant vos données personnelles :
            </p>
            <ul>
              <li>Droit d'accès : vous pouvez demander une copie de vos données personnelles</li>
              <li>Droit de rectification : vous pouvez demander la correction de vos données personnelles inexactes</li>
              <li>Droit à l'effacement : vous pouvez demander la suppression de vos données personnelles</li>
              <li>
                Droit à la limitation du traitement : vous pouvez demander la limitation du traitement de vos données
                personnelles
              </li>
              <li>
                Droit à la portabilité des données : vous pouvez demander le transfert de vos données personnelles
              </li>
              <li>Droit d'opposition : vous pouvez vous opposer au traitement de vos données personnelles</li>
            </ul>
            <p>Pour exercer ces droits, veuillez nous contacter à l'adresse email suivante : privacy@cehe2b.be</p>

            <h2>7. Sécurité des données</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre
              tout accès non autorisé, toute modification, divulgation ou destruction non autorisée.
            </p>

            <h2>8. Modifications de la politique de confidentialité</h2>
            <p>
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute
              modification sera publiée sur cette page avec une date de mise à jour. Nous vous encourageons à consulter
              régulièrement cette page pour rester informé des éventuelles modifications.
            </p>

            <h2>9. Contact</h2>
            <p>
              Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à
              l'adresse email suivante : info@cehe2b.be
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
