import SEO from "@/components/SEO"
import { StructuredData } from "@/components/StructuredData"
import HeroSection from "@/components/sections/hero-section"
import FeaturedSection from "@/components/sections/featured-section"
import AboutSection from "@/components/sections/about-section"
import CampusSectionSimple from "@/components/sections/campus-section-simple"
import NewsSection from "@/components/sections/news-section"
import JoinSection from "@/components/sections/join-section"
import PartnersSection from "@/components/sections/partners-section"
import {
    getHomepageSSR,
    getNewsSSR,
    getFeaturedNewsSSR,
    getFeaturedServicesSSR,
    getFeaturedEventsSSR,
} from "@/lib/api"

export default async function HomePage() {
    const [homepageData, newsData, featuredNews, featuredServices, featuredEvents] = await Promise.all([
        getHomepageSSR(),
        getNewsSSR(),
        getFeaturedNewsSSR(),
        getFeaturedServicesSSR(),
        getFeaturedEventsSSR(),
    ])

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Conseil des Étudiants HE2B",
        "alternateName": "CE HE2B",
        "url": "https://cehe2b.be",
        "logo": { "@type": "ImageObject", "url": "https://cehe2b.be/logo.png", "width": 300, "height": 300 },
        "description": "Association étudiante officielle de la Haute École Bruxelles-Brabant représentant tous les étudiants.",
        "address": { "@type": "PostalAddress", "streetAddress": "Rue Royale 150", "addressLocality": "Bruxelles", "postalCode": "1000", "addressCountry": "BE" },
        "sameAs": ["https://www.facebook.com/CEHE2B", "https://www.instagram.com/cehe2b"],
        "contactPoint": { "@type": "ContactPoint", "contactType": "student services", "email": "ce@he2b.be" },
        "memberOf": { "@type": "Organization", "name": "Haute École Bruxelles-Brabant", "url": "https://www.he2b.be" },
    }

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Conseil des Étudiants HE2B",
        "url": "https://cehe2b.be",
        "description": "Site officiel du Conseil des Étudiants HE2B",
        "inLanguage": "fr-BE",
        "potentialAction": { "@type": "SearchAction", "target": "https://cehe2b.be/search?q={search_term_string}", "query-input": "required name=search_term_string" },
    }

    return (
        <>
            <SEO
                title="Conseil des Étudiants HE2B - Votre voix étudiante officielle"
                description="Site officiel du Conseil des Étudiants de la Haute École Bruxelles-Brabant (HE2B). Découvrez nos événements, actualités, services et rejoignez la communauté étudiante active de HE2B."
                url="https://cehe2b.be/"
                image="https://cehe2b.be/images/hero-banner.jpg"
            />
            <StructuredData data={organizationSchema} />
            <StructuredData data={websiteSchema} />
            <div className="flex flex-col w-full">
                <HeroSection initialData={homepageData} />
                <FeaturedSection
                    initialNews={featuredNews}
                    initialServices={featuredServices}
                    initialEvents={featuredEvents}
                />
                <AboutSection />
                <CampusSectionSimple />
                <NewsSection initialNews={newsData} />
                <JoinSection />
                <PartnersSection initialData={homepageData} />
            </div>
        </>
    )
}
