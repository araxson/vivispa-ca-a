import { cache } from 'react';
import { Service } from '@/types/service';

// Import all the data modules directly instead of using dynamic imports
import * as siteData from '@/data/constant';
import * as servicesData from '@/data/services';
import * as testimonialsData from '@/data/testimonials';

// Define interface for data modules
interface DataModule {
  default?: unknown[];
  items?: unknown[];
  all?: unknown[];
  list?: unknown[];
  services?: unknown[];
  featured?: unknown[];
  featuredItems?: unknown[];
  featuredServices?: unknown[];
  getById?: (id: string) => unknown;
  getItemById?: (id: string) => unknown;
  getServiceById?: (id: string) => unknown;
  getBySlug?: (slug: string) => unknown;
  getItemBySlug?: (slug: string) => unknown;
  getServiceBySlug?: (slug: string) => unknown;
  map?: Map<string, unknown>;
  [key: string]: unknown;
}

// Type for the data sources
export type DataSource = 
  | 'site'
  | 'services'
  | 'locations'
  | 'team'
  | 'testimonials'
  | 'booking';

// Map data sources to their exported data
const dataSources: Record<string, DataModule> = {
  site: siteData,
  services: servicesData,
  testimonials: testimonialsData,
  // Add other data sources as needed
};

/**
 * Generic function to get all items from a data source
 * Caches the result for improved performance
 */
export const getAllItems = cache(<T>(source: DataSource): T[] => {
  // Check if the source exists
  const dataSource = dataSources[source] || {};
  if (Object.keys(dataSource).length === 0) {
    console.warn(`Data source '${source}' is empty or not found`);
    return [];
  }
  
  // Check if the source has a default export that's an array
  if (Array.isArray(dataSource.default)) {
    return dataSource.default as T[];
  }
  
  // If there's an items/all/list export
  if (Array.isArray(dataSource.items)) return dataSource.items as T[];
  if (Array.isArray(dataSource.all)) return dataSource.all as T[];
  if (Array.isArray(dataSource.list)) return dataSource.list as T[];
  
  // For services specifically
  if (source === 'services' && Array.isArray(dataSource.services)) {
    return dataSource.services as T[];
  }
  
  // If there's just a plain array export
  const firstExport = Object.values(dataSource)[0];
  if (Array.isArray(firstExport)) return firstExport as T[];
  
  return []; // Return empty array instead of throwing
});

/**
 * Get a single item by its ID or slug
 * Caches the result for improved performance
 */
export const getItemById = cache(<T>(
  source: DataSource,
  id: string
): T | undefined => {
  // Check if the source exists
  const dataSource = dataSources[source] || {};
  if (Object.keys(dataSource).length === 0) {
    console.warn(`Data source '${source}' is empty or not found`);
    return undefined;
  }
  
  // Check for specific getter functions
  if (typeof dataSource.getById === 'function') {
    return dataSource.getById(id) as T;
  }
  
  if (typeof dataSource.getItemById === 'function') {
    return dataSource.getItemById(id) as T;
  }
  
  // For services specifically
  if (source === 'services' && typeof dataSource.getServiceById === 'function') {
    return dataSource.getServiceById(id) as T;
  }
  
  // If we have a map
  if (dataSource.map instanceof Map) {
    return dataSource.map.get(id) as T;
  }
  
  // Get all items and find by id
  try {
    const items = getAllItems<T & { id: string }>(source);
    return items.find(item => item.id === id);
  } catch {
    return undefined;
  }
});

/**
 * Get a single item by its slug
 * Caches the result for improved performance
 */
export const getItemBySlug = cache(<T>(
  source: DataSource,
  slug: string
): T | undefined => {
  // Check if the source exists
  const dataSource = dataSources[source] || {};
  if (Object.keys(dataSource).length === 0) {
    console.warn(`Data source '${source}' is empty or not found`);
    return undefined;
  }
  
  // Check for specific getter functions
  if (typeof dataSource.getBySlug === 'function') {
    return dataSource.getBySlug(slug) as T;
  }
  
  if (typeof dataSource.getItemBySlug === 'function') {
    return dataSource.getItemBySlug(slug) as T;
  }
  
  // For services specifically
  if (source === 'services' && typeof dataSource.getServiceBySlug === 'function') {
    return dataSource.getServiceBySlug(slug) as T;
  }
  
  // Get all items and find by slug
  try {
    const items = getAllItems<T & { slug: string }>(source);
    return items.find(item => item.slug === slug);
  } catch {
    return undefined;
  }
});

/**
 * Filter items by a predicate function
 */
export const filterItems = cache(<T>(
  source: DataSource,
  predicate: (item: T) => boolean
): T[] => {
  try {
    const items = getAllItems<T>(source);
    return items.filter(predicate);
  } catch {
    return [];
  }
});

/**
 * Get featured items from a data source
 */
export const getFeaturedItems = cache(<T>(source: DataSource): T[] => {
  // Check if the source exists
  const dataSource = dataSources[source] || {};
  if (Object.keys(dataSource).length === 0) {
    console.warn(`Data source '${source}' is empty or not found`);
    return [];
  }
  
  // Check for featured items export
  if (Array.isArray(dataSource.featured)) {
    return dataSource.featured as T[];
  }
  
  if (Array.isArray(dataSource.featuredItems)) {
    return dataSource.featuredItems as T[];
  }
  
  // For services specifically
  if (source === 'services' && 'featuredServices' in dataSource && Array.isArray(dataSource.featuredServices)) {
    return dataSource.featuredServices as T[];
  }
  
  // For services, return all items sorted by popularity instead of filtering by isFeatured
  if (source === 'services') {
    try {
      const items = getAllItems<T & { popularityRank?: number }>(source);
      return items.sort((a, b) => (a.popularityRank || 999) - (b.popularityRank || 999));
    } catch {
      return [];
    }
  }
  
  // For other data sources, try to filter items with isFeatured flag (if it exists)
  try {
    const items = getAllItems<T & { isFeatured?: boolean }>(source);
    return items.filter(item => item.isFeatured);
  } catch {
    return [];
  }
});

/**
 * Generate JSON-LD structured data for SEO
 */
export function generateServiceStructuredData(service: Service) {
  if (!service) {
    return {};
  }

  // Get organization info
  type SiteInfo = {
    organization?: {
      name: string;
      url: string;
      logo: string;
      address: {
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode: string;
        addressCountry: string;
      };
    };
  };
  
  const siteInfo = getItemById<SiteInfo>('site', 'main');
  const organization = siteInfo?.organization || {
    name: 'Vivi Aesthetics & Spa',
    url: 'https://vivispa.ca',
    logo: 'https://vivispa.ca/images/logo.svg',
    address: {
      streetAddress: '123 Spa Street',
      addressLocality: 'Calgary',
      addressRegion: 'AB',
      postalCode: 'T2X 3Y4',
      addressCountry: 'CA',
    },
  };

  // Default image path if service image is missing
  const defaultImage = 'https://vivispa.ca/images/placeholder.webp';

  // If service already has structured data, use it as a base
  if (service.structuredData && typeof service.structuredData === 'object') {
    return service.structuredData;
  }

  // Create a new structured data object
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: service.title || '',
    description: service.previewDescription || '',
    image: service.image 
      ? (service.image.startsWith('http') ? service.image : `https://vivispa.ca${service.image}`) 
      : defaultImage,
    url: service.canonicalUrl 
      ? (service.canonicalUrl.startsWith('http') ? service.canonicalUrl : `https://vivispa.ca${service.canonicalUrl}`)
      : `https://vivispa.ca/services/${service.slug}`,
    procedureType: 'Cosmetic',
    howPerformed: service.procedure || null,
    preparation: null,
    followup: null,
    performer: {
      '@type': 'BeautySalon',
      name: organization.name,
      image: organization.logo,
      url: organization.url,
      address: {
        '@type': 'PostalAddress',
        ...organization.address,
      },
    },
  };
} 