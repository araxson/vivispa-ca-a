import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/data/constant";

// Base URL for all metadata
const baseUrl = siteConfig.url;

/**
 * Modern viewport configuration (Next.js 15+)
 * Separated from metadata for better performance
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#252525" },
  ],
  colorScheme: "light dark",
  viewportFit: "cover",
};

/**
 * Enhanced keywords for better SEO targeting
 * Optimized for Next.js 15 metadata API
 */
const defaultKeywords: string[] = [
  "aesthetics spa Calgary",
  "beauty treatments Calgary",
  "laser hair removal Calgary",
  "hydrofacial Calgary",
  "microneedling Calgary",
  "IPL photofacial Calgary",
  "eyelash extensions Calgary",
  "skin tightening Calgary",
  "Japanese head spa Calgary",
  "pigmentation removal Calgary",
  "vascular vein removal Calgary",
  "skin tag removal Calgary",
  "medical aesthetics",
  "premium spa treatments",
  "anti-aging treatments",
  "skincare Calgary",
  "beauty clinic Calgary",
  "professional aesthetics",
  "cosmetic treatments Calgary",
  "skin rejuvenation Calgary",
  "non-invasive treatments",
  "wellness spa Calgary",
];

/**
 * Enhanced default metadata with performance optimizations for Next.js 15
 */
export const defaultMetadata: Metadata = {
  // Basic metadata
  metadataBase: new URL(baseUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: defaultKeywords,

  // Authors and creators
  authors: [{ name: siteConfig.name, url: baseUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,

  // Language and locale
  alternates: {
    canonical: baseUrl,
    languages: {
      "en-CA": baseUrl,
      "en-US": baseUrl,
      en: baseUrl,
    },
  },

  // Enhanced OpenGraph with performance optimizations
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: baseUrl,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: `${baseUrl}/images/og-image-1200x630.webp`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Premium Beauty & Wellness Treatments`,
        type: "image/webp",
      },
      {
        url: `${baseUrl}/images/og-image-square.webp`,
        width: 1080,
        height: 1080,
        alt: `${siteConfig.name} - Premium Beauty & Wellness Treatments`,
        type: "image/webp",
      },
    ],
  },

  // Enhanced Twitter Cards
  twitter: {
    card: "summary_large_image",
    site: "@vivispa_ca",
    creator: "@vivispa_ca",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: `${baseUrl}/images/twitter-image-1200x630.webp`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Premium Beauty & Wellness Treatments`,
      },
    ],
  },

  // Enhanced robots configuration
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Additional metadata for better SEO
  category: "Health & Beauty",
  classification: "Business",
};

/**
 * Interface for page-specific SEO metadata
 */
export interface PageSeoProps {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl: string;
  noindex?: boolean;
  jsonLd?: Record<string, any>;
}

/**
 * Generates optimized metadata for a specific page
 * Performance optimized for Next.js 15 and React 19
 */
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  ogImage,
  canonicalUrl,
  noindex = false,
}: PageSeoProps): Metadata {
  // Using more efficient string concatenation for better performance
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const fullCanonicalUrl = canonicalUrl.startsWith('http') 
    ? canonicalUrl 
    : `${baseUrl}${canonicalUrl}`;

  return {
    ...defaultMetadata,
    title: pageTitle,
    description: pageDescription,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical: fullCanonicalUrl,
      languages: {
        "en-CA": fullCanonicalUrl,
        "en-US": fullCanonicalUrl,
        en: fullCanonicalUrl,
      },
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: pageTitle,
      description: pageDescription,
      url: fullCanonicalUrl,
      images: ogImage
        ? [
            {
              url: ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`,
              width: 1200,
              height: 630,
              alt: pageTitle,
            },
          ]
        : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: pageTitle,
      description: pageDescription,
      images: ogImage 
        ? [{ 
            url: ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`,
            width: 1200,
            height: 630,
            alt: pageTitle, 
          }] 
        : defaultMetadata.twitter?.images,
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        }
      : defaultMetadata.robots,
  };
}

/**
 * Interface for service page metadata
 */
export interface ServicePageMetadataProps {
  serviceName: string;
  serviceDescription: string;
  serviceKeywords?: string[];
  imageUrl?: string;
  slug: string;
  benefits?: string[];
  locationSpecific?: boolean;
}

/**
 * Generates optimized metadata for a service page
 */
export function generateServicePageMetadata({
  serviceName,
  serviceDescription,
  serviceKeywords = [],
  imageUrl,
  slug,
  benefits = [],
  locationSpecific = true,
}: ServicePageMetadataProps): Metadata {
  const locationKeywords = locationSpecific
    ? ["Calgary", "Alberta", "Canada"]
    : [];
  const benefitKeywords = benefits.map((benefit) => benefit.toLowerCase());

  // Enhanced keyword optimization with location
  const allKeywords = [
    ...serviceKeywords,
    ...locationKeywords,
    ...benefitKeywords,
    `${serviceName.toLowerCase()} Calgary`,
    `professional ${serviceName.toLowerCase()}`,
    `${serviceName.toLowerCase()} treatment`,
    `best ${serviceName.toLowerCase()} Calgary`,
  ];

  return generatePageMetadata({
    title: `${serviceName} in Calgary | Professional ${serviceName} Treatment`,
    description: serviceDescription,
    keywords: allKeywords,
    ogImage: imageUrl || undefined,
    canonicalUrl: `/services/${slug}`,
  });
}

/**
 * Generates JSON-LD Schema for the organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedSpa",
    name: siteConfig.name,
    description: siteConfig.description,
    url: baseUrl,
    logo: `${baseUrl}/images/logo.svg`,
    image: `${baseUrl}/images/og-image-1200x630.webp`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "CA",
      addressRegion: "AB",
      addressLocality: "Calgary",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.location.latitude,
      longitude: siteConfig.location.longitude,
    },
    openingHoursSpecification: siteConfig.businessHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.days,
      opens: hours.opens,
      closes: hours.closes,
    })),
    sameAs: [
      siteConfig.socialLinks.instagram,
      siteConfig.socialLinks.facebook,
      siteConfig.socialLinks.linkedin,
    ],
    priceRange: "$$",
    paymentAccepted: "Cash, Credit Card",
    currenciesAccepted: "CAD",
    availableLanguage: {
      "@type": "Language",
      name: "English",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Aesthetics Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Laser Treatments",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Laser Hair Removal",
                url: `${baseUrl}/services/laser-hair-removal`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Laser Skin Tightening",
                url: `${baseUrl}/services/laser-skin-tightening`,
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Facial Treatments",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "HydroFacial",
                url: `${baseUrl}/services/hydrofacial`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Microneedling",
                url: `${baseUrl}/services/microneedling`,
              },
            },
          ],
        },
      ],
    },
  };
}

/**
 * Generates JSON-LD Schema for a service
 */
export function generateServiceSchema(service: {
  title: string;
  previewDescription: string;
  slug: string;
  image: string;
  benefits: string[];
  expectedResults?: string;
  procedure: string;
  preparationAndAftercare: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.title,
    description: service.previewDescription,
    url: `${baseUrl}/services/${service.slug}`,
    image: service.image.startsWith('http') ? service.image : `${baseUrl}${service.image}`,
    procedureType: "https://www.wikidata.org/wiki/Q1025381",
    bodyLocation: "Face",
    preparation: service.preparationAndAftercare,
    followup: service.preparationAndAftercare,
    howPerformed: service.procedure,
    purpose: service.benefits.join(", "),
    provider: {
      "@type": "MedSpa",
      name: siteConfig.name,
      url: baseUrl,
    },
    status: "Available",
  };
}

/**
 * Generates JSON-LD Schema for breadcrumbs
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url,
    })),
  };
}

/**
 * Generates JSON-LD Schema for FAQs
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates JSON-LD Schema for testimonials/reviews
 */
export function generateReviewSchema(
  testimonials: Array<{ name: string; rating: number; content: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: siteConfig.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: testimonials.length.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    review: testimonials.map((testimonial) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: testimonial.name,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: testimonial.rating.toString(),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: testimonial.content,
    })),
  };
}
