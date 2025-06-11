// ===============================================
// TYPES
// ===============================================

export interface OfferLocationData {
  location: string;
  url: string;
  squareId: string;
  badges?: string[]; // Location-specific badges
}

export interface OfferItem {
  id: string;
  slug: string;
  name: string;
  title: string;
  category: string;
  shortDescription: string;
  description?: string; // Optional full description
  featuredImage: string;
  url: string; // Default/primary URL
  pricing: {
    display: string;
    isSpecialOffer: boolean;
    originalPrice?: string;
  };
  badges?: string[];
  tags?: string[]; // Optional tags for filtering
  // New fields for multi-location support
  availableLocations?: OfferLocationData[]; // Multiple locations with different URLs
  isMultiLocation?: boolean; // Flag to indicate if service is available at multiple locations
}

export interface LocationOffers {
  [locationName: string]: {
    general: OfferItem[];
  };
}

// ===============================================
// CONSTANTS
// ===============================================

// Standard locations list - used in offers-grid.tsx
export const AVAILABLE_LOCATIONS = ["Downtown", "Edmonton Trail"];

// Default fallback image if none is provided for an offer
export const DEFAULT_IMAGE =
  "/images/services/hydrofacial/hydrofacial-in-calgary-001.webp";

// ===============================================
// IMAGE PATHS
// ===============================================
const SERVICE_IMAGES = {
  // Hydrofacial services
  HYDROFACIAL_EXPRESS:
    "/images/services/hydrofacial/hydrofacial-in-calgary-003.webp",
  HYDROFACIAL_DELUXE:
    "/images/services/hydrofacial/hydrofacial-in-calgary-002.webp",
  HYDROFACIAL_ANTI_AGING:
    "/images/services/hydrofacial/hydrofacial-in-calgary-001.webp",
  HYDROFACIAL_ANTI_ACNE:
    "/images/services/hydrofacial/hydrofacial-in-calgary-004.webp",

  // Head spa services
  HEAD_SPA_RELAX:
    "/images/services/japanese-head-spa/japanese-head-spa-in-calgary-001.webp",
  HEAD_SPA_BOGO:
    "/images/services/japanese-head-spa/japanese-head-spa-in-calgary-002.webp",
};

// ===============================================
// BADGE TYPES
// ===============================================
// Simple badge definitions - just string values
export const BADGES = {
  // Sale Types
  NEW_CLIENT: "New Client Special",
  LIMITED_TIME: "Limited Time",

  // Seasonal/Holiday (combined)
  SEASONAL: "Seasonal Special",
  HOLIDAY: "Holiday Special",

  // Value Propositions
  BEST_SELLER: "Best Seller",
  CUSTOMER_FAVORITE: "Customer Favorite",
} as const;

// ===============================================
// LOCATION IDs
// ===============================================
export const locationIds = {
  Downtown: "LSX0A4Z6HJE2E",
  "Edmonton Trail": "LR77SHRSPMK0X",
};

// ===============================================
// CONSOLIDATED OFFERS (Only 6 Active Offers)
// ===============================================

/**
 * Active offers - only the 6 services currently being offered
 */
export const consolidatedOffers: OfferItem[] = [
  // Free Meeting - Available at both locations
  {
    id: "free-meeting",
    slug: "free-meeting",
    name: "Free Meeting",
    title: "Book a Free Meeting",
    category: "Consultation",
    shortDescription: "Book a free meeting with one of our specialists to discuss your needs.",
    featuredImage: DEFAULT_IMAGE, // Or a specific image if available
    url: "https://squareup.com/appointments/book/LSX0A4Z6HJE2E/services?service_id=FREE-MEETING-DOWNTOWN", // Placeholder URL
    pricing: {
      display: "Free",
      isSpecialOffer: true,
    },
    badges: [BADGES.NEW_CLIENT], // Or a custom badge like "Free Consultation"
    isMultiLocation: true,
    availableLocations: [
      {
        location: "Downtown",
        url: "https://squareup.com/appointments/book/LSX0A4Z6HJE2E/services?service_id=FREE-MEETING-DOWNTOWN", // Placeholder URL
        squareId: "LSX0A4Z6HJE2E", // Needs actual Square ID if applicable
      },
      {
        location: "Edmonton Trail",
        url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=FREE-MEETING-EDMONTON", // Placeholder URL
        squareId: "LR77SHRSPMK0X", // Needs actual Square ID if applicable
      },
    ],
  },
  // Hydrofacial Express - Available at both locations
  {
    id: "hydrofacial-express",
    slug: "hydrofacial-express",
    name: "Hydrofacial - Express",
    title: "Hydrofacial - Express",
    category: "Hydrofacial",
    shortDescription:
      "Quick and effective hydrafacial treatment for instant glow and skin rejuvenation",
    featuredImage: SERVICE_IMAGES.HYDROFACIAL_EXPRESS,
    url: "https://squareup.com/appointments/book/LSX0A4Z6HJE2E/services?service_id=GQGICNA2YM2Z7IWU3NKBHNUB&direct=true", // Default to Downtown
    pricing: {
      display: "$49.00",
      isSpecialOffer: true,
      originalPrice: "$185.00",
    },
    badges: [BADGES.NEW_CLIENT, BADGES.BEST_SELLER],
    isMultiLocation: true,
    availableLocations: [
      {
        location: "Downtown",
        url: "https://squareup.com/appointments/book/LSX0A4Z6HJE2E/services?service_id=GQGICNA2YM2Z7IWU3NKBHNUB&direct=true",
        squareId: "LSX0A4Z6HJE2E",
        badges: [BADGES.SEASONAL],
      },
      {
        location: "Edmonton Trail",
        url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=GQGICNA2YM2Z7IWU3NKBHNUB&direct=true",
        squareId: "LR77SHRSPMK0X",
        badges: [BADGES.HOLIDAY],
      },
    ],
  },

  // Hydrofacial Deluxe - Available at both locations
  {
    id: "hydrofacial-deluxe",
    slug: "hydrofacial-deluxe",
    name: "Hydrofacial - Deluxe",
    title: "Hydrofacial - Deluxe",
    category: "Hydrofacial",
    shortDescription:
      "Enhanced hydrafacial with additional benefits, extractions, and nourishing serums",
    featuredImage: SERVICE_IMAGES.HYDROFACIAL_DELUXE,
    url: "https://squareup.com/appointments/book/LSX0A4Z6HJE2E/services?service_id=NOAGL2PZTYX6A5BIYYCPH3W4&direct=true", // Default to Downtown
    pricing: {
      display: "$82.00",
      isSpecialOffer: true,
      originalPrice: "$235.00",
    },
    badges: [BADGES.CUSTOMER_FAVORITE],
    isMultiLocation: true,
    availableLocations: [
      {
        location: "Downtown",
        url: "https://squareup.com/appointments/book/LSX0A4Z6HJE2E/services?service_id=NOAGL2PZTYX6A5BIYYCPH3W4&direct=true",
        squareId: "LSX0A4Z6HJE2E",
        badges: [BADGES.LIMITED_TIME],
      },
      {
        location: "Edmonton Trail",
        url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=NOAGL2PZTYX6A5BIYYCPH3W4&direct=true",
        squareId: "LR77SHRSPMK0X",
        badges: [BADGES.HOLIDAY],
      },
    ],
  },

  // Hydrofacial Anti-Aging - Available at both locations
  {
    id: "hydrofacial-anti-aging",
    slug: "hydrofacial-platinum-anti-ageing",
    name: "Hydrofacial - Platinum Anti-Ageing",
    title: "Hydrofacial - Platinum Anti-Ageing",
    category: "Hydrofacial",
    shortDescription:
      "Premium anti-aging hydrafacial with specialized peptides and growth factors",
    featuredImage: SERVICE_IMAGES.HYDROFACIAL_ANTI_AGING,
    url: "https://squareup.com/appointments/book/LSX0A4Z6HJE2E/services?service_id=5FUJ7D2JQILUWW464XVJRFT6&direct=true", // Default to Downtown
    pricing: {
      display: "$99.00",
      isSpecialOffer: true,
      originalPrice: "$319.00",
    },
    badges: [BADGES.BEST_SELLER, BADGES.CUSTOMER_FAVORITE],
    isMultiLocation: true,
    availableLocations: [
      {
        location: "Downtown",
        url: "https://squareup.com/appointments/book/LSX0A4Z6HJE2E/services?service_id=5FUJ7D2JQILUWW464XVJRFT6&direct=true",
        squareId: "LSX0A4Z6HJE2E",
        badges: [BADGES.SEASONAL],
      },
      {
        location: "Edmonton Trail",
        url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=5FUJ7D2JQILUWW464XVJRFT6&direct=true",
        squareId: "LR77SHRSPMK0X",
        badges: [BADGES.HOLIDAY],
      },
    ],
  },

  // Hydrofacial Anti-Acne - Available at both locations
  {
    id: "hydrofacial-anti-acne",
    slug: "hydrofacial-platinum-anti-acne",
    name: "Hydrofacial - Platinum Anti-Acne",
    title: "Hydrofacial - Platinum Anti-Acne",
    category: "Hydrofacial",
    shortDescription:
      "Specialized hydrafacial targeting acne, blemishes, and congested pores",
    featuredImage: SERVICE_IMAGES.HYDROFACIAL_ANTI_ACNE,
    url: "https://squareup.com/appointments/book/LSX0A4Z6HJE2E/services?service_id=HDTWXOST7HVR3HUWZGOICXHW&direct=true", // Default to Downtown
    pricing: {
      display: "$99.00",
      isSpecialOffer: true,
      originalPrice: "$319.00",
    },
    badges: [BADGES.CUSTOMER_FAVORITE, BADGES.LIMITED_TIME],
    isMultiLocation: true,
    availableLocations: [
      {
        location: "Downtown",
        url: "https://squareup.com/appointments/book/LSX0A4Z6HJE2E/services?service_id=HDTWXOST7HVR3HUWZGOICXHW&direct=true",
        squareId: "LSX0A4Z6HJE2E",
        badges: [BADGES.SEASONAL],
      },
      {
        location: "Edmonton Trail",
        url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=HDTWXOST7HVR3HUWZGOICXHW&direct=true",
        squareId: "LR77SHRSPMK0X",
        badges: [BADGES.LIMITED_TIME],
      },
    ],
  },

  // Relax Head Spa - Edmonton Trail only
  {
    id: "relax-head-spa-edmonton",
    slug: "relax-head-spa",
    name: "Relax Head Spa",
    title: "Relax Head Spa",
    category: "Head Spa",
    shortDescription:
      "Relaxing Japanese-style head spa treatment for stress relief and scalp wellness",
    featuredImage: SERVICE_IMAGES.HEAD_SPA_RELAX,
    url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=HY2USLLLQCTBKEBQB4F5Q2AN&direct=true",
    pricing: {
      display: "$69.00",
      isSpecialOffer: true,
      originalPrice: "$119.00",
    },
    badges: [BADGES.CUSTOMER_FAVORITE],
    isMultiLocation: false,
    availableLocations: [
      {
        location: "Edmonton Trail",
        url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=HY2USLLLQCTBKEBQB4F5Q2AN&direct=true",
        squareId: "LR77SHRSPMK0X",
        badges: [BADGES.SEASONAL],
      },
    ],
  },

  // Hydrating Scalp Therapy - Edmonton Trail only
  {
    id: "hydrating-scalp-therapy-edmonton",
    slug: "hydrating-scalp-therapy",
    name: "Hydrating Scalp Therapy",
    title: "Hydrating Scalp Therapy",
    category: "Head Spa",
    shortDescription:
      "Deep hydrating scalp treatment with special BOGO offer for ultimate scalp nourishment",
    featuredImage: SERVICE_IMAGES.HEAD_SPA_BOGO,
    url: "https://book.squareup.com/appointments/0lipxbpg6zumdr/location/LR77SHRSPMK0X/services/AUZRTA6C4FNVQRTW6D7BSZKP",
    pricing: {
      display: "$99.00",
      isSpecialOffer: true,
      originalPrice: "$129.00",
    },
    badges: [BADGES.BEST_SELLER, BADGES.LIMITED_TIME],
    isMultiLocation: false,
    availableLocations: [
      {
        location: "Edmonton Trail",
        url: "https://book.squareup.com/appointments/0lipxbpg6zumdr/location/LR77SHRSPMK0X/services/AUZRTA6C4FNVQRTW6D7BSZKP",
        squareId: "LR77SHRSPMK0X",
        badges: [BADGES.HOLIDAY],
      },
    ],
  },
];

// ===============================================
// LEGACY SUPPORT - Keep existing structure for backward compatibility
// ===============================================

/**
 * Downtown location offers - add general services available at Downtown location
 */
export const downtownGeneralOffers: OfferItem[] = consolidatedOffers
  .filter((offer) =>
    offer.availableLocations?.some((loc) => loc.location === "Downtown"),
  )
  .map((offer) => ({
    ...offer,
    // Override with Downtown-specific URL
    url:
      offer.availableLocations?.find((loc) => loc.location === "Downtown")
        ?.url || offer.url,
    // Merge location-specific badges
    badges: [
      ...(offer.badges || []),
      ...(offer.availableLocations?.find((loc) => loc.location === "Downtown")
        ?.badges || []),
    ],
  }));

/**
 * Edmonton Trail location offers - add general services available at Edmonton Trail
 */
export const edmontonTrailOffers: OfferItem[] = consolidatedOffers
  .filter((offer) =>
    offer.availableLocations?.some((loc) => loc.location === "Edmonton Trail"),
  )
  .map((offer) => ({
    ...offer,
    // Override with Edmonton Trail-specific URL
    url:
      offer.availableLocations?.find((loc) => loc.location === "Edmonton Trail")
        ?.url || offer.url,
    // Merge location-specific badges
    badges: [
      ...(offer.badges || []),
      ...(offer.availableLocations?.find(
        (loc) => loc.location === "Edmonton Trail",
      )?.badges || []),
    ],
  }));

// ===============================================
// DATA ORGANIZATION & EXPORTS
// ===============================================

// Combine all offers by location for export
export const allOffers: LocationOffers = {
  Downtown: {
    general: downtownGeneralOffers,
  },
  "Edmonton Trail": {
    general: edmontonTrailOffers,
  },
};

// Export all offer categories
const offerExports = {
  // Consolidated offers (new)
  consolidatedOffers,

  // Location-specific offers (legacy)
  downtownGeneralOffers,
  edmontonTrailOffers,

  // Badge types
  BADGES,

  // Utilities
  locationIds,
  AVAILABLE_LOCATIONS,
  DEFAULT_IMAGE,
};

export default offerExports;
