import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/data/constant";

/**
 * Base URL for all metadata
 */
const baseUrl = siteConfig.url;

/**
 * Common keywords for SEO
 */
export const defaultKeywords = [
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
 * Modern viewport configuration
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(var(--background))" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(var(--background))" },
  ],
  colorScheme: "light dark",
  viewportFit: "cover",
};

/**
 * Generate OpenGraph images configuration
 */
export function generateOGImages(title: string) {
  return [
    {
      url: `${baseUrl}/images/og-image-1200x630.webp`,
      width: 1200,
      height: 630,
      alt: title,
      type: "image/webp",
    },
    {
      url: `${baseUrl}/images/og-image-square.webp`,
      width: 1080,
      height: 1080,
      alt: title,
      type: "image/webp",
    },
  ];
}

/**
 * Generate Twitter images configuration
 */
export function generateTwitterImages(title: string) {
  return [
    {
      url: `${baseUrl}/images/twitter-image-1200x630.webp`,
      width: 1200,
      height: 630,
      alt: title,
    },
  ];
}

/**
 * Base metadata configuration
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: defaultKeywords,
  authors: [{ name: siteConfig.name, url: baseUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: baseUrl,
    languages: {
      "en-CA": baseUrl,
      "en-US": baseUrl,
      en: baseUrl,
    },
  },
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
  category: "Health & Beauty",
  classification: "Business",
};

/**
 * Generate page-specific metadata
 */
export interface PageMetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  noindex?: boolean;
  ogImage?: string;
}

export function generatePageMetadata(
  options: PageMetadataOptions = {},
): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonicalUrl,
    noindex = false,
    ogImage,
  } = options;

  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  const allKeywords = [...defaultKeywords, ...keywords];

  return {
    ...baseMetadata,
    title: pageTitle,
    description: pageDescription,
    keywords: allKeywords,
    alternates: {
      ...baseMetadata.alternates,
      canonical: fullCanonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_CA",
      url: fullCanonicalUrl,
      siteName: siteConfig.name,
      title: pageTitle,
      description: pageDescription,
      images: generateOGImages(pageTitle),
    },
    twitter: {
      card: "summary_large_image",
      site: "@vivispa_ca",
      creator: "@vivispa_ca",
      title: pageTitle,
      description: pageDescription,
      images: generateTwitterImages(pageTitle),
    },
    robots: noindex ? { index: false, follow: false } : baseMetadata.robots,
  };
}

/**
 * Generate service page metadata
 */
export interface ServiceMetadataOptions {
  serviceName: string;
  serviceDescription: string;
  serviceKeywords?: string[];
  slug: string;
  benefits?: string[];
  locationSpecific?: boolean;
}

export function generateServiceMetadata(
  options: ServiceMetadataOptions,
): Metadata {
  const {
    serviceName,
    serviceDescription,
    serviceKeywords = [],
    slug,
    benefits = [],
    locationSpecific = true,
  } = options;

  const locationKeywords = locationSpecific
    ? ["Calgary", "Alberta", "Canada"]
    : [];
  const benefitKeywords = benefits.map((benefit) => benefit.toLowerCase());

  const allKeywords = [
    ...serviceKeywords,
    ...locationKeywords,
    ...benefitKeywords,
    `${serviceName.toLowerCase()} Calgary`,
    `professional ${serviceName.toLowerCase()}`,
    `${serviceName.toLowerCase()} treatment`,
  ];

  return generatePageMetadata({
    title: `${serviceName} in Calgary | Professional ${serviceName} Treatment`,
    description: serviceDescription,
    keywords: allKeywords,
    canonicalUrl: `/services/${slug}`,
  });
}

/**
 * JSON-LD Schema generators
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedSpa",
    name: siteConfig.name,
    description: siteConfig.description,
    url: baseUrl,
    logo: `${baseUrl}/images/logo.webp`,
    image:
      generateOGImages(siteConfig.title)[0]?.url ||
      `${baseUrl}/images/og-image-1200x630.webp`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "CA",
      addressRegion: "AB",
      addressLocality: "Calgary",
    },
    sameAs: [siteConfig.links.instagram, siteConfig.links.facebook],
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "150",
    },
  };
}

export function generateServiceSchema(service: {
  title: string;
  previewDescription: string;
  slug: string;
  benefits: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.previewDescription,
    provider: {
      "@type": "MedSpa",
      name: siteConfig.name,
      url: baseUrl,
    },
    url: `${baseUrl}/services/${service.slug}`,
    serviceType: "Beauty Treatment",
    areaServed: {
      "@type": "City",
      name: "Calgary",
      addressRegion: "AB",
      addressCountry: "CA",
    },
  };
}

export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${baseUrl}${crumb.url}`,
    })),
  };
}

/**
 * Generate JSON-LD script tag
 */
export function generateJsonLdScript(data: Record<string, any>): string {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}
