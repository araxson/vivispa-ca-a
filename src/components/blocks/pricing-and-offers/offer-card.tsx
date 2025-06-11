"use client";

import {
  UniversalCard,
  type OfferCardData as UniversalOfferData,
} from "@/components/ui/universal-card";
import type { OfferItem, OfferLocationData } from "@/data/pricing/offers";
import { locations } from "@/data/contact";
import { useCategoryMapping } from "@/data/categories";

// Extended offer interface to include dynamic location data
interface SmartOfferServiceItem extends OfferItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  featuredImage: string;
  url: string;
  badges?: string[];
  pricing: {
    display: string;
    isSpecialOffer: boolean;
    originalPrice?: string;
  };
  location?: string;
  locationDetails?: (typeof locations)[0] | undefined;
  dynamicUrl?: string;
  allAvailableLocations?: OfferLocationData[] | undefined;
  isAvailableAtSelectedLocation?: boolean;
}

interface OfferCardProps {
  offer: SmartOfferServiceItem;
}

// Transform offer data to match UniversalCard format
function transformOfferData(
  offer: SmartOfferServiceItem,
  categoryName: string,
): UniversalOfferData {
  const baseData = {
    id: offer.id,
    title: offer.name,
    description: offer.shortDescription,
    shortDescription: offer.shortDescription,
    featuredImage: offer.featuredImage,
    pricing: offer.pricing,
    category: categoryName,
    url: offer.url,
  };

  // Only include optional properties if they have defined values
  const optionalFields: Partial<UniversalOfferData> = {};
  
  if (offer.badges && offer.badges.length > 0) {
    optionalFields.badges = offer.badges;
  }
  
  if (offer.locationDetails) {
    optionalFields.locationDetails = offer.locationDetails;
  }
  
  if (offer.location) {
    optionalFields.location = offer.location;
  }
  
  if (offer.dynamicUrl) {
    optionalFields.dynamicUrl = offer.dynamicUrl;
  }
  
  if (offer.allAvailableLocations && offer.allAvailableLocations.length > 0) {
    optionalFields.allAvailableLocations = offer.allAvailableLocations;
  }
  
  if (offer.isAvailableAtSelectedLocation !== undefined) {
    optionalFields.isAvailableAtSelectedLocation =
      offer.isAvailableAtSelectedLocation;
  }

  return { ...baseData, ...optionalFields };
}

export function OfferCard({ offer }: OfferCardProps) {
  const categoryName = useCategoryMapping(offer);
  return (
    <UniversalCard
      data={transformOfferData(offer, categoryName)}
      variant="offer"
      layout="default"
      features={{
        showImage: true,
        showBadges: true,
        showLocations: true,
        showPricing: true,
        showBooking: true,
        showAnimation: true,
        showLocationSelector: !offer.location, // Show selector only if no fixed location
      }}
      styling={{
        aspectRatio: "16/9",
        imagePosition: "top",
      }}
      className="border border-border bg-card overflow-hidden rounded-lg h-full flex flex-col"
    />
  );
}
