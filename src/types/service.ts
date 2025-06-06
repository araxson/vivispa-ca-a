export interface Testimonial {
  name: string;
  rating: number;
  quote: string;
  treatment: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface OpenGraphData {
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
}

export interface TwitterData {
  card: string;
  title: string;
  description: string;
  image: string;
}

export interface StructuredData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  procedureType: string;
  bodyLocation: string;
  image: string;
  url: string;
  provider: {
    "@type": string;
    name: string;
    address: {
      "@type": string;
      addressLocality: string;
      addressRegion: string;
      addressCountry: string;
    };
  };
  areaServed: {
    "@type": string;
    name: string;
  };
  preparation: string;
  howPerformed: string;
  indication: {
    "@type": string;
    name: string;
  };
}

export type LocationType = 'downtown' | 'edmonton-trail';

export interface Service {
  // Basic Information
  id: string;
  title: string;
  slug: string;
  previewDescription: string;
  fullDescription: string;
  
  // SEO Metadata
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  
  // Media
  image: string;
  galleryImages: string[];
  heroType?: 'image' | 'video' | 'none';
  heroVideo?: {
    src: string;
    poster?: string;
  };
  
  // Locations
  availableLocations: LocationType[];
  
  // Social Media
  openGraph: OpenGraphData;
  twitter: TwitterData;
  
  // Content Sections
  scientificInfo: string;
  overview: string;
  benefits: string[];
  procedure: string;
  indications: string;
  contraindications: string;
  preparationAndAftercare: string;
  expectedResults: string;
  safetyConsiderations: string;
  historyAndDevelopment: string;
  
  // Interactive Content
  faqs: FAQ[];
  testimonials: Testimonial[];
  
  // Structured Data
  structuredData: StructuredData;
  
  // Relationships
  relatedServiceIds: string[];
  popularityRank: number;
} 