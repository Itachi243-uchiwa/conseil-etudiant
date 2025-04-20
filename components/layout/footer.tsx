import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone } from "lucide-react"
import LogoDore from "@/components/ui/logo-dore"

export default function Footer() {
  return (
    <footer className="bg-muted py-12 mt-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <LogoDore className="h-10 w-auto" />
              <span className="font-bold text-xl text-[#3F3290]">CE HE2B</span>
            </div>
            <p className="text-muted-foreground">
              Le Conseil Étudiant de la Haute École Bruxelles-Brabant, votre voix au sein de l'institution.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-[#3F3290] transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-[#3F3290] transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-[#3F3290] transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-[#3F3290] transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#3F3290]">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" prefetch={true} className="text-muted-foreground hover:text-[#3F3290] transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  prefetch={true}
                  className="text-muted-foreground hover:text-[#3F3290] transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/about/team"
                  prefetch={true}
                  className="text-muted-foreground hover:text-[#3F3290] transition-colors"
                >
                  Notre équipe
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  prefetch={true}
                  className="text-muted-foreground hover:text-[#3F3290] transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  prefetch={true}
                  className="text-muted-foreground hover:text-[#3F3290] transition-colors"
                >
                  Événements
                </Link>
              </li>
              <li>
                <Link
                  href="/campus"
                  prefetch={true}
                  className="text-muted-foreground hover:text-[#3F3290] transition-colors"
                >
                  Nos Campus
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  prefetch={true}
                  className="text-muted-foreground hover:text-[#3F3290] transition-colors"
                >
                  Actualités
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  prefetch={true}
                  className="text-muted-foreground hover:text-[#3F3290] transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#3F3290]">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/aide-juridique"
                  prefetch={true}
                  className="text-muted-foreground hover:text-[#3F3290] transition-colors"
                >
                  Aide juridique
                </Link>
              </li>
              <li>
                <Link
                  href="/services/soutien-financier"
                  prefetch={true}
                  className="text-muted-foreground hover:text-[#3F3290] transition-colors"
                >
                  Soutien financier
                </Link>
              </li>
              <li>
                <Link
                  href="/services/accompagnement"
                  prefetch={true}
                  className="text-muted-foreground hover:text-[#3F3290] transition-colors"
                >
                  Accompagnement pédagogique
                </Link>
              </li>
              <li>
                <Link
                  href="/services/aide-reussite"
                  prefetch={true}
                  className="text-muted-foreground hover:text-[#3F3290] transition-colors"
                >
                  Aide à la réussite
                </Link>
              </li>
              <li>
                <Link
                  href="/services/recours"
                  prefetch={true}
                  className="text-muted-foreground hover:text-[#3F3290] transition-colors"
                >
                  Aide aux recours
                </Link>
              </li>
              <li>
                <Link
                  href="/services/insertion"
                  prefetch={true}
                  className="text-muted-foreground hover:text-[#3F3290] transition-colors"
                >
                  Insertion professionnelle
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#3F3290]">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#3F3290]" />
                <a
                  href="mailto:contact@cehe2b.be"
                  className="text-muted-foreground hover:text-[#3F3290] transition-colors"
                >
                  contact@cehe2b.be
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#3F3290]" />
                <a href="tel:+3212345678" className="text-muted-foreground hover:text-[#3F3290] transition-colors">
                  +32 12 345 678
                </a>
              </li>
              <li className="text-muted-foreground mt-2">
                Campus HELB
                <br />
                Avenue Émile Gryzon 1<br />
                1070 Bruxelles
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Conseil Étudiant HE2B. Tous droits réservés.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link
              href="/legal"
              prefetch={true}
              className="text-sm text-muted-foreground hover:text-[#3F3290] transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/cookies"
              prefetch={true}
              className="text-sm text-muted-foreground hover:text-[#3F3290] transition-colors"
            >
              Politique de cookies
            </Link>
            <Link
              href="/privacy"
              prefetch={true}
              className="text-sm text-muted-foreground hover:text-[#3F3290] transition-colors"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
