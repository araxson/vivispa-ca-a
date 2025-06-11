"use client";

import { useMemo, memo } from "react";
import { Button, UniversalFilterControls } from "@/components/ui";
import {
  useUniversalFilters,
  type FilterConfig,
} from "@/hooks/use-universal-filters";
import { ResponsiveGrid } from "@/components/ui/responsive-grid";
import { OffersGrid } from "./offers-grid";
import type { OfferItem, OfferLocationData } from "@/data/pricing/offers";
import { locations } from "@/data/constant";
import { X } from "lucide-react";
import { useLocationServices } from "@/hooks/use-location-services";
import { ALL_SERVICE_CATEGORIES } from "@/data/categories";
import { getLayoutClasses } from "@/lib/layout-utils";
import { cn } from "@/lib/utils";

// Extended offer type to include dynamic location info and booking URLs
type SmartOfferItem = OfferItem & {
  location?: string;
  locationDetails?: (typeof locations)[0]; // undefined is implied by ?
  dynamicUrl?: string;
  allAvailableLocations?: OfferLocationData[]; // undefined is implied by ?
  isAvailableAtSelectedLocation?: boolean;
};

// Sort options
const SORT_OPTIONS = [
  { id: "highest-discount", name: "Highest Discount" },
  { id: "price-low-high", name: "Price: Low to High" },
  { id: "price-high-low", name: "Price: High to Low" },
  { id: "name-az", name: "Name A-Z" },
] as const;

interface OffersPageClientProps {
  initialOffers: OfferItem[];
  availableLocations: string[];
}

export const OffersPageClient = memo(function OffersPageClient({
  initialOffers,
  availableLocations,
}: OffersPageClientProps) {
  const categoryOptions = useMemo(() => {
    return ALL_SERVICE_CATEGORIES.map((category) => {
      const offerCount = initialOffers.filter(
        (offer) =>
          offer.category === category.mappedCategory ||
          offer.slug.includes(category.slug) ||
          offer.name.toLowerCase().includes(category.name.toLowerCase()) ||
          (category.id === "hydrofacial" &&
            offer.name.toLowerCase().includes("hydrafacial")) ||
          (category.id === "japanese-head-spa" &&
            (offer.slug.includes("head-spa") ||
              offer.slug.includes("scalp-therapy"))),
      ).length;

      return {
        value: category.id,
        label: category.name,
        count: offerCount,
        disabled: offerCount === 0,
      };
    });
  }, [initialOffers]);
  
  const filterConfig: FilterConfig[] = useMemo(() => [
    {
      key: 'search',
      type: 'search',
      label: 'Search',
      placeholder: 'Search offers by name or keyword...',
      icon: 'search',
    },
    {
      key: 'location',
      type: 'select',
      label: 'Location',
      placeholder: 'All Locations',
      icon: 'location',
      options: availableLocations.map(loc => ({ value: loc, label: loc })),
      allowAll: true,
      defaultValue: 'all',
    },
    {
      key: 'category',
      type: 'select',
      label: 'Category',
      placeholder: 'All Categories',
      icon: 'category',
      options: categoryOptions,
      allowAll: true,
      defaultValue: 'all',
    },
    {
      key: 'sortBy',
      type: 'sort',
      label: 'Sort by',
      placeholder: 'Sort offers',
      options: SORT_OPTIONS.map(opt => ({ value: opt.id, label: opt.name })),
      allowAll: false,
      defaultValue: 'highest-discount',
    }
  ], [availableLocations, categoryOptions]);

  const {
    filters,
    activeFilters,
    hasActiveFilters,
    setFilter,
    clearFilter,
    clearAllFilters,
  } = useUniversalFilters({
    config: filterConfig,
    initialValues: {
      sortBy: 'highest-discount',
    },
  });

  const { allServicesForLocation } = useLocationServices(
    (filters.location as string) || "all",
  );

  // Calculate discount percentage for an offer - memoized for performance
  const calculateDiscountPercentage = useMemo(
    () => (offer: OfferItem): number => {
      if (!offer.pricing.isSpecialOffer || !offer.pricing.originalPrice)
        return 0;
      const current = parseFloat(offer.pricing.display.replace(/[^0-9.]/g, ""));
      const original = parseFloat(
        offer.pricing.originalPrice.replace(/[^0-9.]/g, ""),
      );
      if (original <= 0 || current <= 0) return 0;
      return Math.round(((original - current) / original) * 100);
    },
    [],
  );

  // Get filtered and sorted offers with optimized logic
  const filteredOffers = useMemo(() => {
    const {
      location: selectedLocation,
      category: selectedCategory,
      search: searchQuery,
      sortBy,
    } = filters;

    let processedOffers: SmartOfferItem[] = initialOffers
      .map((offer): SmartOfferItem => { // Explicit return type
        const locationData =
          typeof selectedLocation === "string" && selectedLocation !== "all"
            ? offer.availableLocations?.find(
                (loc) => loc.location === selectedLocation,
              )
            : undefined;

        const locationDetails =
          typeof selectedLocation === "string" && selectedLocation !== "all"
            ? locations.find((loc) => loc.name === selectedLocation)
            : undefined;

        const item: SmartOfferItem = {
          // OfferItem properties
          id: offer.id,
          slug: offer.slug,
          name: offer.name,
          title: offer.title,
          category: offer.category,
          shortDescription: offer.shortDescription,
          featuredImage: offer.featuredImage,
          url: offer.url,
          pricing: offer.pricing,
          // Optional OfferItem properties
          ...(offer.description && { description: offer.description }),
          ...(offer.badges && { badges: offer.badges }),
          ...(offer.tags && { tags: offer.tags }),
          ...(offer.availableLocations && { availableLocations: offer.availableLocations }),
          ...(typeof offer.isMultiLocation === 'boolean' && { isMultiLocation: offer.isMultiLocation }),

          // SmartOfferItem specific properties
          // allAvailableLocations: offer.availableLocations, // Conditionally added below
          isAvailableAtSelectedLocation:
            typeof selectedLocation !== "string" ||
            selectedLocation === "all" ||
            !!locationData,
        };

        // Conditionally add optional SmartOfferItem properties
        if (offer.availableLocations) { // Add only if defined
          item.allAvailableLocations = offer.availableLocations;
        }
        if (typeof selectedLocation === "string" && selectedLocation !== "all") {
          item.location = selectedLocation;
        }
        if (locationDetails) {
          item.locationDetails = locationDetails;
        }
        if (locationData?.url) {
          item.dynamicUrl = locationData.url;
        }

        return item;
      })
      .filter((offer) => {
        if (
          typeof selectedLocation === "string" &&
          selectedLocation !== "all"
        ) {
          return allServicesForLocation.some(
            (service) => service.name === offer.name,
          );
        }
        return true;
      });

    // Apply filters
    if (
      typeof selectedCategory === "string" &&
      selectedCategory &&
      selectedCategory !== "all"
    ) {
      const categoryConfig = ALL_SERVICE_CATEGORIES.find(
        (cat) => cat.id === selectedCategory,
      );
      if (categoryConfig) {
        processedOffers = processedOffers.filter(
          (offer) =>
            offer.category === categoryConfig.mappedCategory ||
            offer.slug.includes(categoryConfig.slug) ||
            offer.name.toLowerCase().includes(categoryConfig.name.toLowerCase()) ||
            (categoryConfig.id === "hydrofacial" &&
              offer.name.toLowerCase().includes("hydrafacial")) ||
            (categoryConfig.id === "japanese-head-spa" &&
              (offer.slug.includes("head-spa") ||
                offer.slug.includes("scalp-therapy"))),
        );
      }
    }

    if (typeof searchQuery === 'string' && searchQuery.trim()) {
      const lowercasedQuery = searchQuery.toLowerCase();
      processedOffers = processedOffers.filter(
        (offer) =>
          offer.name.toLowerCase().includes(lowercasedQuery) ||
          (offer.description &&
            offer.description.toLowerCase().includes(lowercasedQuery)) ||
          offer.tags?.some((tag) => tag.toLowerCase().includes(lowercasedQuery)),
      );
    }
    
    // Sort offers
    processedOffers.sort((a, b) => {
      switch (sortBy) {
        case "highest-discount":
          return calculateDiscountPercentage(b) - calculateDiscountPercentage(a);
        case "price-low-high":
          return (
            parseFloat(a.pricing.display.replace(/[^0-9.]/g, "")) -
            parseFloat(b.pricing.display.replace(/[^0-9.]/g, ""))
          );
        case "price-high-low":
          return (
            parseFloat(b.pricing.display.replace(/[^0-9.]/g, "")) -
            parseFloat(a.pricing.display.replace(/[^0-9.]/g, ""))
          );
        case "name-az":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return processedOffers;
  }, [filters, initialOffers, calculateDiscountPercentage, allServicesForLocation]);


  return (
    <div className="space-y-8">
      <UniversalFilterControls
        config={filterConfig}
        filters={filters}
        activeFilters={activeFilters}
        hasActiveFilters={hasActiveFilters}
        onFilterChange={setFilter}
        onClearFilter={clearFilter}
        onClearAllFilters={clearAllFilters}
        showFilterBadges={true}
        gridPreset="filters"
      />

      {/* Results Summary */}
      <section className="text-center" aria-label="Search results summary">
        <div
          className={cn(getLayoutClasses("responsiveFlex"), "justify-center text-lg text-muted-foreground")}
          aria-live="polite"
          aria-atomic="true"
        >
          <p>
            Showing{" "}
            <span className="font-bold text-primary text-xl">
              {filteredOffers.length}
            </span>
            {filteredOffers.length === 1 ? " treatment" : " treatments"}
          </p>
          {hasActiveFilters && (
            <span className="text-sm text-muted-foreground">
              (filtered from {initialOffers.length} total)
            </span>
          )}
        </div>
      </section>

      <main>
        <ResponsiveGrid preset="offers">
          <OffersGrid offers={filteredOffers} />
        </ResponsiveGrid>
      </main>

      {/* No Results Message */}
      {filteredOffers.length === 0 && (
        <section className="text-center py-16" aria-label="No results found">
          <div className="max-w-md mx-auto bg-card border border-border rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              No treatments found
            </h2>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search terms to find more results.
            </p>
            <Button
              onClick={clearAllFilters}
              className="flex items-center gap-2 mx-auto bg-primary hover:bg-primary/90 text-primary-foreground"
              aria-label="Clear all filters to show all treatments"
              type="button"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Show All Treatments
            </Button>
          </div>
        </section>
      )}
    </div>
  );
});
