import { Service } from "@/types/service";

interface StructuredDataAddress {
  '@type': 'PostalAddress';
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

interface StructuredDataOrganization {
  '@type': 'BeautySalon';
  name: string;
  image: string;
  url: string;
  address: StructuredDataAddress;
}

interface StructuredDataService {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  image: string;
  url: string;
  procedureType: string;
  howPerformed: string | null;
  preparation: null;
  followup: null;
  performer: StructuredDataOrganization;
  keywords?: string;
  mainEntityOfPage?: {
    '@type': string;
    '@id': string;
  };
  [key: string]: unknown;
}

/**
 * Generate structured data for a service page
 */
export function generateServiceStructuredData(service: Service): StructuredDataService | Record<string, unknown> {
  if (!service) {
    return {};
  }

  // Get organization info from the service or use default
  const organization: StructuredDataOrganization = {
    '@type': 'BeautySalon',
    name: 'Vivi Aesthetics & Spa',
    url: 'https://vivispa.ca',
    image: 'https://vivispa.ca/images/logo.svg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Spa Street',
      addressLocality: 'Calgary',
      addressRegion: 'AB',
      postalCode: 'T2X 3Y4',
      addressCountry: 'CA',
    },
  };

  // Default image path if service image is missing
  const defaultImage = 'https://vivispa.ca/images/placeholder.webp';
  
  // Generate service URL
  const serviceUrl = service.canonicalUrl 
    ? (service.canonicalUrl.startsWith('http') ? service.canonicalUrl : `https://vivispa.ca${service.canonicalUrl}`)
    : `https://vivispa.ca/services/${service.slug}`;

  // If service already has structured data, use it as a base but enhance it with keywords
  if (service.structuredData && typeof service.structuredData === 'object') {
    const enhancedStructuredData = { ...service.structuredData } as Record<string, unknown>;
    
    // Add keywords if they exist
    if (service.keywords?.length) {
      const allKeywords = service.keywords.filter(Boolean).join(', ');
      enhancedStructuredData['keywords'] = allKeywords;
    }
    
    return enhancedStructuredData;
  }

  // Combine all keywords for structured data
  const allKeywords = service.keywords?.filter(Boolean).join(', ') || '';

  // Create enhanced name and description
  const enhancedName = service.title || '';
  const enhancedDescription = service.previewDescription || '';

  // Create a new structured data object
  const structuredData: StructuredDataService = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: enhancedName,
    description: enhancedDescription,
    image: service.image 
      ? (service.image.startsWith('http') ? service.image : `https://vivispa.ca${service.image}`) 
      : defaultImage,
    url: serviceUrl,
    procedureType: 'Cosmetic',
    howPerformed: service.procedure || null,
    preparation: null,
    followup: null,
    performer: organization,
    keywords: allKeywords,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': serviceUrl
    }
  };
  
  return structuredData;
} 