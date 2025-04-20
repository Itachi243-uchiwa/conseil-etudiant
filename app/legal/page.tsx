import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mentions légales | Conseil Étudiant HE2B",
  description: "Mentions légales du site du Conseil Étudiant HE2B",
}

export default function LegalPage() {
  return (
    <div className="container py-24 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-[#3F3290] dark:gold-text">Mentions légales</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#3F3290] dark:gold-text">Éditeur du site</h2>
          <p className="mb-2">
            <strong>Conseil Étudiant HE2B</strong>
          </p>
          <p className="mb-2">Avenue Émile Gryzon 1</p>
          <p className="mb-2">1070 Bruxelles</p>
          <p className="mb-2">Belgique</p>
          <p className="mb-2">Email : contact@cehe2b.be</p>
          <p className="mb-2">Téléphone : +32 12 345 678</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#3F3290] dark:gold-text">Directeur de la publication</h2>
          <p className="mb-2">Le Président du Conseil Étudiant HE2B</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#3F3290] dark:gold-text">Hébergement</h2>
          <p className="mb-2">
            <strong>Vercel Inc.</strong>
          </p>
          <p className="mb-2">340 S Lemon Ave #4133</p>
          <p className="mb-2">Walnut, CA 91789</p>
          <p className="mb-2">États-Unis</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#3F3290] dark:gold-text">Propriété intellectuelle</h2>
          <p className="mb-4">
            L'ensemble du contenu de ce site (textes, images, vidéos, etc.) est la propriété exclusive du Conseil
            Étudiant HE2B ou de ses partenaires. Toute reproduction, représentation, modification, publication,
            transmission, dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé que ce soit,
            et sur quelque support que ce soit est interdite sans l'autorisation écrite préalable du Conseil Étudiant
            HE2B.
          </p>
          <p>
            Le non-respect de cette interdiction constitue une contrefaçon pouvant engager la responsabilité civile et
            pénale du contrefacteur.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#3F3290] dark:gold-text">Limitation de responsabilité</h2>
          <p className="mb-4">
            Le Conseil Étudiant HE2B s'efforce d'assurer au mieux de ses possibilités l'exactitude et la mise à jour des
            informations diffusées sur ce site, dont il se réserve le droit de corriger, à tout moment et sans préavis,
            le contenu.
          </p>
          <p>
            Le Conseil Étudiant HE2B décline toute responsabilité pour les éventuelles imprécisions, inexactitudes ou
            omissions portant sur des informations disponibles sur ce site, et pour les dommages résultant d'intrusions
            frauduleuses d'un tiers ayant entraîné une modification des informations mises à la disposition sur le site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#3F3290] dark:gold-text">Liens hypertextes</h2>
          <p className="mb-4">
            Ce site peut contenir des liens vers d'autres sites internet ou d'autres ressources disponibles sur
            Internet. Le Conseil Étudiant HE2B ne dispose d'aucun moyen pour contrôler les sites en connexion avec son
            site internet et ne répond pas de la disponibilité de tels sites et sources externes.
          </p>
          <p>
            Il ne peut être tenu pour responsable de tout dommage, de quelque nature que ce soit, résultant du contenu
            de ces sites ou sources externes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#3F3290] dark:gold-text">
            Droit applicable et juridiction compétente
          </h2>
          <p className="mb-4">
            Les présentes mentions légales sont régies par le droit belge. En cas de litige, les tribunaux de Bruxelles
            seront seuls compétents.
          </p>
        </section>
      </div>
    </div>
  )
}
