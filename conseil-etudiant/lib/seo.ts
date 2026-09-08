// lib/seo.ts - Utilitaires SEO réutilisables
export interface SEOData {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'video';
}

export function generateMetadata({
                                     title,
                                     description,
                                     keywords = [],
                                     image = '/og-image.HEIC',
                                     url = '',
                                     type = 'website'
                                 }: SEOData) {
    const fullTitle = title.includes('HE2B') ? title : `${title} | Conseil Étudiant HE2B`;
    const baseKeywords = ['HE2B', 'Conseil Étudiant', 'Haute École Bruxelles-Brabant', 'étudiants', 'association étudiante'];
    const allKeywords = [...baseKeywords, ...keywords].join(', ');

    return {
        title: fullTitle,
        description,
        keywords: allKeywords,
        authors: [{ name: 'Conseil Étudiant HE2B' }],
        robots: 'index, follow',
        openGraph: {
            title: fullTitle,
            description,
            type,
            url,
            images: [{ url: image, width: 1200, height: 630, alt: title }],
            siteName: 'Conseil Étudiant HE2B',
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [image],
        },
        alternates: {
            canonical: url,
        },
    };
}

export function generateStructuredData(type: 'organization' | 'event' | 'article', data: any) {
    const baseOrganization = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Conseil Étudiant HE2B",
        "url": "https://www.cehe2b.be",
        "logo": "https://www.cehe2b.be/logo.png",
        "sameAs": [
            "https://www.facebook.com/HE2B",
            "https://www.instagram.com/HE2B"
        ],
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bruxelles",
            "addressCountry": "BE"
        }
    };

    switch (type) {
        case 'organization':
            return baseOrganization;

        case 'event':
            return {
                "@context": "https://schema.org",
                "@type": "Event",
                "name": data.title,
                "description": data.description,
                "startDate": data.date,
                "location": {
                    "@type": "Place",
                    "name": data.location,
                    "address": data.location
                },
                "organizer": baseOrganization,
                "image": data.image
            };

        case 'article':
            return {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": data.title,
                "description": data.description,
                "datePublished": data.date,
                "author": baseOrganization,
                "publisher": baseOrganization,
                "image": data.image
            };

        default:
            return baseOrganization;
    }
}
