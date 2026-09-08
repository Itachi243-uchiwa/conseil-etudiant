// components/SEO.tsx
import Head from "next/head";

interface SEOProps {
    title: string;
    description: string;
    url: string;
    image: string;
}

export default function SEO({ title, description, url, image }: SEOProps) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content="HE2B, Conseil des Étudiants, étudiants, événements, actualités, association" />
            <meta name="robots" content="index, follow" />
            <meta name="author" content="Conseil des Étudiants HE2B" />
            <link rel="canonical" href={url} />

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Schema.org */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Conseil des Étudiants HE2B",
  "url": "${url}",
  "logo": "${image}",
  "sameAs": [
    "https://www.facebook.com/CEHE2B",
    "https://www.instagram.com/cehe2b"
  ]
}
          `,
                }}
            />
        </Head>
    );
}
