import type { Metadata, Viewport } from 'next';
import { siteConfig } from '@/data/constant';

// Base URL for all metadata
const baseUrl = siteConfig.url;

/**
 * Modern viewport configuration (Next.js 14+)
 * Separated from metadata for better performance
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'oklch(1 0 0)' },
    { media: '(prefers-color-scheme: dark)', color: 'oklch(0.145 0 0)' },
  ],
  colorScheme: 'light dark',
  viewportFit: 'cover',
};

/**
 * Enhanced keywords for better SEO targeting
 */
const defaultKeywords: string[] = [
  'aesthetics spa Calgary',
  'beauty treatments Calgary',
  'laser hair removal Calgary',
  'hydrofacial Calgary',
  'microneedling Calgary',
  'IPL photofacial Calgary',
  'eyelash extensions Calgary',
  'skin tightening Calgary',
  'Japanese head spa Calgary',
  'pigmentation removal Calgary',
  'vascular vein removal Calgary',
  'skin tag removal Calgary',
  'medical aesthetics',
  'premium spa treatments',
  'anti-aging treatments',
  'skincare Calgary',
  'beauty clinic Calgary',
  'professional aesthetics',
  'cosmetic treatments Calgary',
  'skin rejuvenation Calgary',
  'non-invasive treatments',
  'wellness spa Calgary',
];

/**
 * Enhanced default metadata with performance optimizations
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
      'en-CA': baseUrl,
      'en-US': baseUrl,
      'en': baseUrl,
    },
  },
  
  // Enhanced OpenGraph with performance optimizations
  openGraph: {
    type: 'website',
    locale: 'en_CA',
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
        type: 'image/webp',
      },
      {
        url: `${baseUrl}/images/og-image-square.webp`,
        width: 1080,
        height: 1080,
        alt: `${siteConfig.name} - Premium Beauty & Wellness Treatments`,
        type: 'image/webp',
      },
    ],
  },
  
  // Enhanced Twitter Cards
  twitter: {
    card: 'summary_large_image',
    site: '@vivispa_ca',
    creator: '@vivispa_ca',
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
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // App icons and manifest are handled automatically by Next.js
  // when placed in the /app directory (favicon.ico, icon.png, apple-icon.png, site.webmanifest)
  
  // Additional metadata for better SEO
  category: 'Health & Beauty',
  classification: 'Business',
  
  // Verification tags (add these when you get them)
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      bing: ['your-bing-verification-code'],
    },
  },
  
  // Additional metadata
  other: {
    'application-name': siteConfig.name,
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': siteConfig.name,
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-config': '/browserconfig.xml',
    'msapplication-TileColor': 'oklch(1 0 0)',
    'msapplication-tap-highlight': 'no',
    'theme-color': 'oklch(1 0 0)',
  },
};

/**
 * Interface for page-specific SEO metadata
 */
export interface PageSeoProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  jsonLd?: Record<string, any>;
}

/**
 * Generates optimized metadata for a specific page with performance considerations
 */
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  ogImage,
  canonicalUrl,
  noindex = false,
}: PageSeoProps): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  
  return {
    ...defaultMetadata,
    title: pageTitle,
    description: pageDescription,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical: fullCanonicalUrl,
      languages: {
        'en-CA': fullCanonicalUrl,
        'en-US': fullCanonicalUrl,
        'en': fullCanonicalUrl,
      },
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: pageTitle,
      description: pageDescription,
      url: fullCanonicalUrl,
      images: ogImage ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        }
      ] : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: pageTitle,
      description: pageDescription,
      images: ogImage ? [ogImage] : defaultMetadata.twitter?.images,
    },
    robots: noindex ? {
      index: false,
      follow: false,
    } : defaultMetadata.robots,
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
  fullDescription?: string;
  benefits?: string[];
  locationSpecific?: boolean;
}

/**
 * Enhanced service page metadata with local SEO optimization
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
  const locationSuffix = locationSpecific ? ' in Calgary' : '';
  const title = `${serviceName}${locationSuffix}`;
  const description = `${serviceDescription} Book your ${serviceName.toLowerCase()} treatment at Vivi Aesthetics & Spa Calgary. Professional, safe, and effective results.`;
  
  const enhancedKeywords = [
    ...serviceKeywords,
    `${serviceName.toLowerCase()} Calgary`,
    `${serviceName.toLowerCase()} treatment`,
    `${serviceName.toLowerCase()} spa`,
    ...benefits.map(benefit => `${benefit.toLowerCase()} Calgary`),
  ];

  const fullCanonicalUrl = `${baseUrl}/services/${slug}`;
  const ogImageUrl = imageUrl || `${baseUrl}/images/services/${slug}-og.webp`;

  return {
    ...defaultMetadata,
    title,
    description,
    keywords: [...defaultKeywords, ...enhancedKeywords],
    alternates: {
      canonical: fullCanonicalUrl,
      languages: {
        'en-CA': fullCanonicalUrl,
        'en-US': fullCanonicalUrl,
        'en': fullCanonicalUrl,
      },
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      type: 'article',
      title,
      description,
      url: fullCanonicalUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${serviceName} at ${siteConfig.name}`,
          type: 'image/webp',
        },
      ],
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

/**
 * Enhanced organization schema with local business data
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalSpa',
    '@id': `${baseUrl}/#organization`,
    name: siteConfig.name,
    alternateName: 'Vivi Spa',
    description: siteConfig.description,
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/logos/vivi-logo.webp`,
      width: 500,
      height: 500,
    },
    image: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/spa-interior.webp`,
      width: 1200,
      height: 630,
    },
    telephone: '+1-587-200-7772',
    email: 'info@vivispa.ca',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1240 Kensington Rd NW #512',
      addressLocality: 'Calgary',
      addressRegion: 'AB',
      postalCode: 'T2N 3P7',
      addressCountry: 'CA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.0547,
      longitude: -114.0794,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '16:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/vivispa.ca',
      'https://www.instagram.com/vivi_aesthetics_spa',
      'https://www.google.com/maps/place/Vivi+Aesthetics+%26+Spa',
    ],
    areaServed: {
      '@type': 'City',
      name: 'Calgary',
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Alberta',
        containedInPlace: {
          '@type': 'Country',
          name: 'Canada',
        },
      },
    },
    priceRange: '$$-$$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'E-transfer'],
    currenciesAccepted: 'CAD',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Medical Aesthetics Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Laser Hair Removal',
            description: 'Professional laser hair removal treatments',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'HydraFacial',
            description: 'Deep cleansing and hydrating facial treatments',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Microneedling',
            description: 'Skin rejuvenation through controlled micro-injuries',
          },
        },
      ],
    },
  };
}

/**
 * Enhanced service schema generation
 */
export function generateServiceSchema(service: {
  title: string;
  previewDescription: string;
  slug: string;
  image: string;
  benefits: string[];
  expectedResults: string;
  procedure: string;
  preparationAndAftercare: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    '@id': `${baseUrl}/services/${service.slug}#service`,
    name: service.title,
    description: service.previewDescription,
    procedureType: service.title,
    bodyLocation: 'Face, Body',
    image: {
      '@type': 'ImageObject',
      url: service.image,
      width: 1200,
      height: 630,
    },
    url: `${baseUrl}/services/${service.slug}`,
    provider: {
      '@id': `${baseUrl}/#organization`,
    },
    areaServed: {
      '@type': 'City',
      name: 'Calgary',
    },
    howPerformed: service.procedure,
    preparation: service.preparationAndAftercare,
    expectedOutcome: service.expectedResults,
    benefits: service.benefits,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/services/${service.slug}`,
    },
  };
}

/**
 * Enhanced breadcrumb schema
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: {
        '@type': 'WebPage',
        '@id': crumb.url,
      },
    })),
  };
}

/**
 * FAQ Schema generation
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Review schema generation
 */
export function generateReviewSchema(testimonials: Array<{ name: string; rating: number; content: string }>) {
  return testimonials.map(testimonial => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: testimonial.name,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: testimonial.rating,
      bestRating: 5,
    },
    reviewBody: testimonial.content,
  }));
}

/**
 * Performance-optimized JSON-LD script generation
 */
export function generateJsonLdScript(data: Record<string, any>): string {
  return JSON.stringify(data, null, 0);
}
