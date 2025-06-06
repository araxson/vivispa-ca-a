export interface OfferPricing {
  display: string;
  isSpecialOffer?: boolean;
  originalPrice?: string;
}

export interface OfferLocationData {
  location: string;
  url: string;
  squareId: string;
  badges?: string[];
}

export interface OfferServiceItem {
  id: string;
  slug: string;
  name: string;
  title: string;
  category: string;
  shortDescription: string;
  featuredImage: string;
  url: string;
  pricing: OfferPricing;
  badges: string[];
  // Multi-location support
  availableLocations?: OfferLocationData[];
  isMultiLocation?: boolean;
}

export interface LocationOffers {
  [locationName: string]: {
    general: OfferServiceItem[];
  };
}
