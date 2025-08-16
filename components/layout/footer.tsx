import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import LogoDore from "@/components/ui/logo-dore"
import { getServices } from "@/lib/api"

interface ServiceItem {
    id: number
    title: string
    description: string
    content: string
    image: string
    icon: string
    slug: string
    featured: boolean
    createdAt: string
    updatedAt: string
}

export default async function Footer() {
    // Récupération des services depuis l'API
    const services: ServiceItem[] = await getServices() || []

    return (
        <footer className="bg-muted py-12 mt-16">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <LogoDore className="h-10 w-auto" />
                        </div>
                        <p className="text-muted-foreground">
                            Le Conseil Étudiant de la Haute École Bruxelles-Brabant, votre voix au sein de l'institution.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href="https://www.facebook.com/CEHE2B"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-[#3F3290] transition-colors"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link
                                href="https://www.instagram.com/cehe2b"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-[#3F3290] transition-colors"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.988-5.367 11.988-11.988C24.005 5.367 18.638.001 12.017.001zM8.449 16.988c-2.508 0-4.541-2.033-4.541-4.541s2.033-4.541 4.541-4.541 4.541 2.033 4.541 4.541-2.033 4.541-4.541 4.541zm7.049 0c-2.508 0-4.541-2.033-4.541-4.541s2.033-4.541 4.541-4.541 4.541 2.033 4.541 4.541-2.033 4.541-4.541 4.541z"/>
                                    <path d="M12 8.531c-1.911 0-3.469 1.558-3.469 3.469s1.558 3.469 3.469 3.469 3.469-1.558 3.469-3.469S13.911 8.531 12 8.531z"/>
                                    <path d="M16.547 6.988c-.447 0-.811.364-.811.811s.364.811.811.811.811-.364.811-.811-.364-.811-.811-.811z"/>
                                    <rect x="7" y="7" width="10" height="10" rx="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                                <span className="sr-only">Instagram</span>
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
                                    href="/about#notre_equipe"
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
                            {services.length > 0 ? (
                                services.slice(0, 6).map((service) => (
                                    <li key={service.id}>
                                        <Link
                                            href={`/services/${service.slug}`}
                                            prefetch={true}
                                            className="text-muted-foreground hover:text-[#3F3290] transition-colors"
                                        >
                                            {service.title}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li className="text-muted-foreground text-sm">
                                    Aucun service disponible pour le moment
                                </li>
                            )}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-[#3F3290]">Contact</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-[#3F3290]" />
                                <a
                                    href="mailto:bureau-@cehe2b.be"
                                    className="text-muted-foreground hover:text-[#3F3290] transition-colors"
                                >
                                    bureau-@cehe2b.be
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-[#3F3290]" />
                                <a
                                    href="mailto:ce@he2b.be"
                                    className="text-muted-foreground hover:text-[#3F3290] transition-colors"
                                > ce@he2b.be </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-[#3F3290]" />
                                <a href="tel:+3212345678" className="text-muted-foreground hover:text-[#3F3290] transition-colors">
                                    +32 495 79 99 75
                                </a>
                            </li>
                            <li className="text-muted-foreground mt-2">
                                Campus ISIB
                                <br />
                                Rue Royale 150, <br />
                                1000 Bruxelles,
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