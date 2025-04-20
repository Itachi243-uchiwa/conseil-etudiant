import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de cookies | Conseil Étudiant HE2B",
  description: "Politique de cookies du site du Conseil Étudiant HE2B",
}

export default function CookiesPage() {
  return (
    <div className="container py-24 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-[#3F3290] dark:gold-text">Politique de cookies</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#3F3290] dark:gold-text">Qu'est-ce qu'un cookie ?</h2>
          <p className="mb-4">
            Un cookie est un petit fichier texte qui peut être conservé sur votre ordinateur, tablette ou smartphone
            lorsque vous visitez un site web. Les cookies permettent au site web de mémoriser vos actions et préférences
            (comme votre nom d'utilisateur, votre langue, la taille de la police et d'autres préférences d'affichage)
            pendant un certain temps, pour que vous n'ayez pas à les saisir à nouveau lorsque vous revenez sur le site
            ou naviguez d'une page à une autre.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#3F3290] dark:gold-text">
            Comment utilisons-nous les cookies ?
          </h2>
          <p className="mb-4">
            Le site du Conseil Étudiant HE2B utilise des cookies pour améliorer votre expérience de navigation et pour
            comprendre comment vous interagissez avec notre site. Nous utilisons les types de cookies suivants :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Cookies essentiels :</strong> Ces cookies sont nécessaires au fonctionnement du site et ne peuvent
              pas être désactivés dans nos systèmes. Ils sont généralement établis en réponse à des actions que vous
              avez effectuées et qui constituent une demande de services, telles que la définition de vos préférences de
              confidentialité, la connexion ou le remplissage de formulaires.
            </li>
            <li>
              <strong>Cookies de performance :</strong> Ces cookies nous permettent de compter les visites et les
              sources de trafic afin de mesurer et d'améliorer les performances de notre site. Ils nous aident à savoir
              quelles pages sont les plus et les moins populaires et à voir comment les visiteurs se déplacent sur le
              site.
            </li>
            <li>
              <strong>Cookies de fonctionnalité :</strong> Ces cookies permettent au site de fournir une fonctionnalité
              et une personnalisation améliorées. Ils peuvent être définis par nous ou par des fournisseurs tiers dont
              nous avons ajouté les services à nos pages.
            </li>
            <li>
              <strong>Cookies de ciblage :</strong> Ces cookies peuvent être définis par nos partenaires publicitaires
              via notre site. Ils peuvent être utilisés par ces entreprises pour établir un profil de vos intérêts et
              vous montrer des publicités pertinentes sur d'autres sites.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#3F3290] dark:gold-text">Comment gérer les cookies ?</h2>
          <p className="mb-4">
            Vous pouvez contrôler et/ou supprimer des cookies comme vous le souhaitez. Vous pouvez supprimer tous les
            cookies déjà présents sur votre ordinateur et vous pouvez configurer la plupart des navigateurs pour qu'ils
            les bloquent. Mais si vous faites cela, vous devrez peut-être ajuster manuellement certaines préférences
            chaque fois que vous visiterez un site, et certains services et fonctionnalités pourraient ne pas
            fonctionner.
          </p>
          <p>
            Pour plus d'informations sur la gestion des cookies, veuillez consulter les paramètres de votre navigateur
            ou visiter{" "}
            <a href="https://www.allaboutcookies.org/" className="text-[#3F3290] underline">
              www.allaboutcookies.org
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#3F3290] dark:gold-text">
            Modifications de notre politique de cookies
          </h2>
          <p className="mb-4">
            Nous nous réservons le droit de modifier cette politique de cookies à tout moment. Tout changement sera
            publié sur cette page et, si les changements sont significatifs, nous vous fournirons une notification plus
            visible.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#3F3290] dark:gold-text">Nous contacter</h2>
          <p className="mb-4">
            Si vous avez des questions concernant cette politique de cookies, veuillez nous contacter à l'adresse
            suivante :{" "}
            <a href="mailto:contact@cehe2b.be" className="text-[#3F3290] underline">
              contact@cehe2b.be
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
