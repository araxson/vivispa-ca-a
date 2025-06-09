"use client";

import { Card, Badge, Button, FadeIn } from "@/components/ui";
import { Calendar, MapPin, TrendingDown, Tags } from "lucide-react";
import type { OfferItem, OfferLocationData } from "@/data/pricing/offers";
import { locations } from "@/data/contact";
import Image from "next/image";
import { useState } from "react";

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

// Define service categories mapping - same as in offers page
const ALL_SERVICE_CATEGORIES = [
  {
    id: "eyelash-extensions",
    name: "Eyelash Extensions",
    slug: "eyelash-extensions",
    mappedCategory: "beauty-treatments",
  },
  {
    id: "hydrofacial",
    name: "Hydrofacial Treatments",
    slug: "hydrofacial",
    mappedCategory: "facial-treatments",
  },
  {
    id: "ipl-photofacial",
    name: "IPL PhotoFacial",
    slug: "ipl-photofacial",
    mappedCategory: "laser-treatments",
  },
  {
    id: "japanese-head-spa",
    name: "Japanese Head Spa",
    slug: "japanese-head-spa",
    mappedCategory: "wellness-services",
  },
  {
    id: "laser-hair-removal",
    name: "Laser Hair Removal",
    slug: "laser-hair-removal",
    mappedCategory: "laser-treatments",
  },
  {
    id: "laser-pigmentation-removal",
    name: "Laser Pigmentation Removal",
    slug: "laser-pigmentation-removal",
    mappedCategory: "laser-treatments",
  },
  {
    id: "laser-skin-tightening",
    name: "Laser Skin Tightening",
    slug: "laser-skin-tightening",
    mappedCategory: "laser-treatments",
  },
  {
    id: "microneedling",
    name: "Microneedling",
    slug: "microneedling",
    mappedCategory: "advanced-treatments",
  },
  {
    id: "skin-tag-removal",
    name: "Skin Tag Removal",
    slug: "skin-tag-removal",
    mappedCategory: "advanced-treatments",
  },
  {
    id: "vascular-vein-removal",
    name: "Vascular Vein Removal",
    slug: "vascular-vein-removal",
    mappedCategory: "laser-treatments",
  },
];

// Utility function to get service category name from filtering system
function getServiceCategoryName(offer: SmartOfferServiceItem): string {
  const categoryConfig = ALL_SERVICE_CATEGORIES.find(
    (category) =>
      offer.category === category.mappedCategory ||
      offer.slug.includes(category.slug) ||
      offer.name.toLowerCase().includes(category.name.toLowerCase()) ||
      (category.id === "hydrofacial" &&
        offer.name.toLowerCase().includes("hydrafacial")) ||
      (category.id === "japanese-head-spa" &&
        (offer.slug.includes("head-spa") ||
          offer.slug.includes("scalp-therapy"))),
  );

  return categoryConfig?.name || offer.category;
}

// Utility function to calculate discount percentage
function calculateDiscountPercentage(
  originalPrice: string,
  discountPrice: string,
): number {
  const original = parseFloat(originalPrice.replace(/[^0-9.]/g, ""));
  const discount = parseFloat(discountPrice.replace(/[^0-9.]/g, ""));

  if (original && discount && original > discount) {
    return Math.round(((original - discount) / original) * 100);
  }

  return 0;
}

export function OfferCard({ offer }: OfferCardProps) {
  // State for location selection within the card
  const [selectedCardLocation, setSelectedCardLocation] = useState<string>(
    offer.location || offer.allAvailableLocations?.[0]?.location || "Downtown",
  );

  // Calculate discount percentage
  const discountPercentage =
    offer.pricing.isSpecialOffer && offer.pricing.originalPrice
      ? calculateDiscountPercentage(
          offer.pricing.originalPrice,
          offer.pricing.display,
        )
      : 0;

  // Get all locations and their availability
  const getAllLocationsWithAvailability = () => {
    const allLocationNames = locations.map((loc) => loc.name);

    return allLocationNames.map((locationName) => {
      const isAvailable =
        offer.allAvailableLocations?.some(
          (loc) => loc.location === locationName,
        ) || false;

      const locationData = offer.allAvailableLocations?.find(
        (loc) => loc.location === locationName,
      );

      return {
        name: locationName,
        isAvailable,
        url: locationData?.url || offer.url,
        address:
          locations.find((loc) => loc.name === locationName)?.address || "",
      };
    });
  };

  const locationOptions = getAllLocationsWithAvailability();

  // Get the booking URL based on selected location
  const getBookingUrl = () => {
    if (offer.dynamicUrl) {
      // If page-level location is selected, use that
      return offer.dynamicUrl;
    }

    // Use card-level selection
    const selectedLocationData = locationOptions.find(
      (loc) => loc.name === selectedCardLocation && loc.isAvailable,
    );

    return selectedLocationData?.url || offer.url;
  };

  // Get available location names for display
  const getAvailableLocationNames = () => {
    return locationOptions
      .filter((loc) => loc.isAvailable)
      .map((loc) => loc.name);
  };

  const availableLocations = getAvailableLocationNames();

  return (
    <FadeIn>
      <Card className="border border-border bg-card overflow-hidden rounded-lg h-full flex flex-col">
        {/* Featured Image - Ultra compact height */}
        <div className="relative h-64 overflow-hidden flex-shrink-0 group">
          <Image
            src={offer.featuredImage}
            alt={offer.name}
            fill
            className="object-cover transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Category badge - top left */}
          <div className="absolute top-2 left-2 z-20">
            <Badge
              variant="secondary"
              className="bg-primary shadow-md text-primary-foreground text-xs font-small px-3 py-1.5 border border-border/20"
            >
              {getServiceCategoryName(offer)}
            </Badge>
          </div>

          {/* Discount Badge - top right */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 right-2 z-20">
              <Badge className="bg-destructive shadow-md text-destructive-foreground text-xs font-bold px-3 py-1.5 border border-border/20">
                <Tags className="h-3 w-3 mr-1.5" />
                {discountPercentage}% OFF
              </Badge>
            </div>
          )}

          {/* Offer badges - bottom right */}
          {offer.badges && offer.badges.length > 0 && (
            <div className="absolute bottom-2 right-2 flex flex-wrap gap-1.5 max-w-[60%] justify-end z-20">
              {offer.badges.map((badge, index) => {
                // Determine badge color based on type
                let badgeStyle = "";

                if (badge.includes("New Client")) {
                  badgeStyle = "bg-blue-600 text-white border-blue-400";
                } else if (badge.includes("Limited Time")) {
                  badgeStyle = "bg-purple-600 text-white border-purple-400";
                } else if (badge.includes("Seasonal")) {
                  badgeStyle = "bg-amber-500 text-white border-amber-400";
                } else if (badge.includes("Holiday")) {
                  badgeStyle = "bg-red-600 text-white border-red-400";
                } else if (badge.includes("Best Seller")) {
                  badgeStyle = "bg-emerald-600 text-white border-emerald-400";
                } else if (badge.includes("Customer Favorite")) {
                  badgeStyle = "bg-pink-600 text-white border-pink-400";
                } else {
                  // Default style - using theme colors for dark/light mode compatibility
                  badgeStyle =
                    "bg-secondary text-secondary-foreground border-border";
                }

                return (
                  <span
                    key={index}
                    className={`inline-flex shadow-md rounded-md text-xs px-3 py-1 leading-none border ${badgeStyle}`}
                  >
                    {badge}
                  </span>
                );
              })}
            </div>
          )}

          {/* Location overlay - bottom left */}
          <div className="absolute bottom-2 left-2 bg-background/75 backdrop-blur-md rounded px-2 py-1 max-w-[60%] border border-foreground/10">
            <div className="flex items-center gap-1 text-xs text-foreground">
              <MapPin className="h-2 w-2 text-foreground flex-shrink-0" />
              <span className="font-medium truncate">
                {availableLocations.length === 1
                  ? availableLocations[0]
                  : availableLocations.join(" • ")}
              </span>
            </div>
          </div>
        </div>

        {/* Card Content - Ultra compact spacing */}
        <div className="flex flex-col flex-grow p-3 sm:p-4">
          {/* Title and Description - minimal spacing */}
          <div className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3">
            <h3 className="text-sm sm:text-base font-bold text-card-foreground hover:text-primary leading-tight line-clamp-2">
              {offer.name}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {offer.shortDescription}
            </p>
          </div>

          {/* Ultra Compact Pricing Section */}
          <div className="bg-muted/30 border border-border rounded p-2 sm:p-2.5 mb-2 sm:mb-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1 sm:gap-1.5">
                <span className="text-base sm:text-lg font-bold text-primary">
                  {offer.pricing.display}
                </span>
                {offer.pricing.isSpecialOffer && offer.pricing.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    {offer.pricing.originalPrice}
                  </span>
                )}
              </div>
              {offer.pricing.isSpecialOffer && offer.pricing.originalPrice && (
                <div className="text-right">
                  <div className="text-xs font-bold text-success flex items-center gap-0.5">
                    <TrendingDown className="h-2.5 w-2.5" />
                    Save $
                    {(
                      parseFloat(
                        offer.pricing.originalPrice.replace(/[^0-9.]/g, ""),
                      ) -
                      parseFloat(offer.pricing.display.replace(/[^0-9.]/g, ""))
                    ).toFixed(2)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ultra Compact Location Selection */}
          {!offer.location && (
            <div className="bg-muted border border-border rounded overflow-hidden mb-3 flex-shrink-0">
              {locationOptions.map((location, index) => (
                <div
                  key={index}
                  className={index !== 0 ? "border-t border-border" : ""}
                >
                  <label
                    className={`flex items-center gap-2 p-2.5 hover:bg-accent transition-colors ${
                      !location.isAvailable ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`location-${offer.id}`}
                      value={location.name}
                      checked={selectedCardLocation === location.name}
                      onChange={(e) =>
                        location.isAvailable &&
                        setSelectedCardLocation(e.target.value)
                      }
                      disabled={!location.isAvailable}
                      className="accent-primary disabled:opacity-50 w-3 h-3 flex-shrink-0"
                      aria-describedby={`location-${offer.id}-${index}-description`}
                    />
                    <div className="flex-1 min-w-0">
                      <div
                        className={`font-medium text-xs ${
                          location.isAvailable
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {location.name}
                        {!location.isAvailable && (
                          <span className="ml-1 text-xs text-destructive font-normal">
                            (Not Available)
                          </span>
                        )}
                      </div>
                      <div
                        id={`location-${offer.id}-${index}-description`}
                        className={`text-xs mt-0.5 leading-tight ${
                          location.isAvailable
                            ? "text-muted-foreground"
                            : "text-muted-foreground/70"
                        }`}
                      >
                        {location.address}
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* Ultra Compact Selected Location Display */}
          {offer.location && offer.locationDetails && (
            <div className="bg-secondary border border-border rounded p-2.5 mb-3 flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-secondary-foreground">
                    {offer.location}
                  </div>
                  <div className="text-xs text-muted-foreground truncate leading-tight">
                    {offer.locationDetails.address}, {offer.locationDetails.city}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Spacer to push button to bottom */}
          <div className="flex-grow" />

          {/* Ultra Compact Booking Button */}
          <Button
            size="sm"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 rounded shadow-sm transition-all duration-200"
            asChild
          >
            <a
              href={getBookingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5"
              aria-label={`Book appointment for ${offer.name} at ${offer.location || selectedCardLocation}. Opens in new window.`}
            >
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="text-xs">
                {offer.location
                  ? `Book at ${offer.location}`
                  : `Book at ${selectedCardLocation}`}
              </span>
            </a>
          </Button>
        </div>
      </Card>
    </FadeIn>
  );
}
