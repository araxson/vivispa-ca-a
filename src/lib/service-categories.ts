/**
 * Centralized service category configurations
 * Eliminates duplication across multiple files
 */

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  mappedCategory: string;
  description?: string;
  searchTerms?: string[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "eyelash-extensions",
    name: "Eyelash Extensions",
    slug: "eyelash-extensions",
    mappedCategory: "beauty-treatments",
    description: "Enhance your natural lashes with beautiful, custom extensions",
    searchTerms: ["lash", "eyelash", "extensions", "beauty"],
  },
  {
    id: "hydrofacial",
    name: "Hydrofacial Treatments",
    slug: "hydrofacial",
    mappedCategory: "facial-treatments",
    description: "Deep cleansing and hydrating facial treatment",
    searchTerms: ["hydrofacial", "hydrafacial", "facial", "skincare"],
  },
  {
    id: "ipl-photofacial",
    name: "IPL PhotoFacial",
    slug: "ipl-photofacial",
    mappedCategory: "laser-treatments",
    description: "Intense pulsed light therapy for skin rejuvenation",
    searchTerms: ["ipl", "photofacial", "laser", "skin", "rejuvenation"],
  },
  {
    id: "japanese-head-spa",
    name: "Japanese Head Spa",
    slug: "japanese-head-spa",
    mappedCategory: "wellness-services",
    description: "Relaxing scalp therapy to promote hair health",
    searchTerms: ["head spa", "scalp", "japanese", "relaxation", "wellness"],
  },
  {
    id: "laser-hair-removal",
    name: "Laser Hair Removal",
    slug: "laser-hair-removal",
    mappedCategory: "laser-treatments",
    description: "Permanent hair reduction with advanced laser technology",
    searchTerms: ["laser", "hair removal", "permanent", "smooth skin"],
  },
  {
    id: "laser-pigmentation-removal",
    name: "Laser Pigmentation Removal",
    slug: "laser-pigmentation-removal",
    mappedCategory: "laser-treatments",
    description: "Advanced treatment to remove unwanted pigmentation",
    searchTerms: ["pigmentation", "dark spots", "laser", "skin discoloration"],
  },
  {
    id: "laser-skin-tightening",
    name: "Laser Skin Tightening",
    slug: "laser-skin-tightening",
    mappedCategory: "laser-treatments",
    description: "Non-surgical solution to improve skin elasticity",
    searchTerms: ["skin tightening", "anti-aging", "laser", "elasticity"],
  },
  {
    id: "microneedling",
    name: "Microneedling",
    slug: "microneedling",
    mappedCategory: "advanced-treatments",
    description: "Stimulate collagen production for smoother skin",
    searchTerms: ["microneedling", "collagen", "skin texture", "rejuvenation"],
  },
  {
    id: "skin-tag-removal",
    name: "Skin Tag Removal",
    slug: "skin-tag-removal",
    mappedCategory: "advanced-treatments",
    description: "Quick and effective removal of unwanted skin tags",
    searchTerms: ["skin tag", "removal", "quick", "effective"],
  },
  {
    id: "vascular-vein-removal",
    name: "Vascular Vein Removal",
    slug: "vascular-vein-removal",
    mappedCategory: "laser-treatments",
    description: "Treatment for spider veins and vascular lesions",
    searchTerms: ["vascular", "spider veins", "vein removal", "lesions"],
  },
] as const;

export const CATEGORY_MAPPINGS = {
  "beauty-treatments": "Beauty Treatments",
  "facial-treatments": "Facial Treatments", 
  "laser-treatments": "Laser Treatments",
  "wellness-services": "Wellness Services",
  "advanced-treatments": "Advanced Treatments",
} as const;

/**
 * Find service category by various identifiers
 */
export function findServiceCategory(
  identifier: string
): ServiceCategory | undefined {
  const searchTerm = identifier.toLowerCase();
  
  return SERVICE_CATEGORIES.find(category => 
    category.id === searchTerm ||
    category.slug === searchTerm ||
    category.name.toLowerCase() === searchTerm ||
    category.mappedCategory === searchTerm ||
    category.searchTerms?.some(term => term.toLowerCase().includes(searchTerm)) ||
    searchTerm.includes(category.slug) ||
    (category.id === "hydrofacial" && searchTerm.includes("hydrafacial")) ||
    (category.id === "japanese-head-spa" && (searchTerm.includes("head-spa") || searchTerm.includes("scalp-therapy")))
  );
}

/**
 * Get category display name
 */
export function getCategoryDisplayName(mappedCategory: string): string {
  return CATEGORY_MAPPINGS[mappedCategory as keyof typeof CATEGORY_MAPPINGS] || mappedCategory;
}

/**
 * Get all services in a specific mapped category
 */
export function getServicesByMappedCategory(mappedCategory: string): ServiceCategory[] {
  return SERVICE_CATEGORIES.filter(category => category.mappedCategory === mappedCategory);
}

/**
 * Search services by term
 */
export function searchServices(searchTerm: string): ServiceCategory[] {
  const term = searchTerm.toLowerCase();
  
  return SERVICE_CATEGORIES.filter(category =>
    category.name.toLowerCase().includes(term) ||
    category.description?.toLowerCase().includes(term) ||
    category.searchTerms?.some(searchTermItem => searchTermItem.toLowerCase().includes(term))
  );
}
