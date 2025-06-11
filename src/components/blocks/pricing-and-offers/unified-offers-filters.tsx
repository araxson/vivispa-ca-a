import React from 'react';
import { useUniversalFilters, createFilterConfig } from '@/hooks/use-universal-filters';
import { UniversalFilterControls } from '@/components/ui/universal-filter-controls';
import type { OfferItem } from '@/data/pricing/offers';

interface UnifiedOffersFiltersProps {
  initialOffers: OfferItem[];
  availableLocations: string[];
  onFiltersChange: (filteredOffers: OfferItem[]) => void;
  className?: string;
}

// Service categories mapping for offers
const SERVICE_CATEGORIES = [
  {
    id: "eyelash-extensions",
    name: "Eyelash Extensions",
    slug: "eyelash-extensions",
    mappedCategory: "beauty-treatments",
  },
  {
    id: "hydrofacial",
    name: "Hydrafacial Treatments",
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
] as const;

/**
 * Unified offers filters component using the universal filter system
 * Replaces the filter logic in offers-page-client.tsx
 */
export function UnifiedOffersFilters({
  initialOffers,
  availableLocations,
  onFiltersChange,
  className
}: UnifiedOffersFiltersProps) {
  
  // Calculate discount percentage for sorting
  const calculateDiscountPercentage = React.useCallback((offer: OfferItem): number => {
    if (!offer.pricing.isSpecialOffer || !offer.pricing.originalPrice) return 0;
    const current = parseFloat(offer.pricing.display.replace(/[^0-9.]/g, ''));
    const original = parseFloat(offer.pricing.originalPrice.replace(/[^0-9.]/g, ''));
    if (original <= 0 || current <= 0) return 0;
    return Math.round(((original - current) / original) * 100);
  }, []);

  // Get available categories with offer counts
  const availableCategories = React.useMemo(() => {
    return SERVICE_CATEGORIES.map((category) => {
      const categoryOffers = initialOffers.filter((offer) =>
        offer.category === category.mappedCategory ||
        offer.slug.includes(category.slug) ||
        offer.name.toLowerCase().includes(category.name.toLowerCase()) ||
        (category.id === "hydrofacial" && offer.name.toLowerCase().includes("hydrafacial")) ||
        (category.id === "japanese-head-spa" && 
         (offer.slug.includes("head-spa") || offer.slug.includes("scalp-therapy")))
      );

      return {
        id: category.id,
        name: category.name,
        offerCount: categoryOffers.length,
        isAvailable: categoryOffers.length > 0,
        mappedCategory: category.mappedCategory,
        slug: category.slug
      };
    });
  }, [initialOffers]);

  // Create filter configuration with dynamic options
  const filterConfig = React.useMemo(() => {
    return createFilterConfig('offers', {
      location: availableLocations.map(loc => ({ value: loc, label: loc })),
      category: availableCategories.map(cat => ({
        value: cat.id,
        label: cat.name,
        count: cat.offerCount,
        disabled: !cat.isAvailable
      }))
    });
  }, [availableLocations, availableCategories]);

  // Initialize universal filters
  const {
    filters,
    activeFilters,
    hasActiveFilters,
    setFilter,
    clearFilter,
    clearAllFilters
  } = useUniversalFilters({
    config: filterConfig,
    initialValues: {
      location: 'all',
      category: 'all',
      sortBy: 'highest-discount',
      search: ''
    },
    onFiltersChange: (newFilters) => {
      // Apply filters to offers
      const filtered = applyFiltersAndSort(initialOffers, newFilters);
      onFiltersChange(filtered);
    }
  });

  // Apply filters and sorting to offers
  const applyFiltersAndSort = React.useCallback((offers: OfferItem[], filterValues: Record<string, any>) => {
    let processed = [...offers];

    // Filter by location
    if (filterValues.location && filterValues.location !== 'all') {
      processed = processed.filter(offer =>
        offer.availableLocations?.some(loc => loc.location === filterValues.location)
      );
    }

    // Filter by category
    if (filterValues.category && filterValues.category !== 'all') {
      const categoryConfig = availableCategories.find(cat => cat.id === filterValues.category);
      if (categoryConfig) {
        processed = processed.filter(offer =>
          offer.category === categoryConfig.mappedCategory ||
          offer.slug.includes(categoryConfig.slug) ||
          offer.name.toLowerCase().includes(categoryConfig.name.toLowerCase()) ||
          (categoryConfig.id === "hydrofacial" && offer.name.toLowerCase().includes("hydrafacial")) ||
          (categoryConfig.id === "japanese-head-spa" && 
           (offer.slug.includes("head-spa") || offer.slug.includes("scalp-therapy")))
        );
      }
    }

    // Filter by search query
    if (filterValues.search && typeof filterValues.search === 'string') {
      const query = filterValues.search.toLowerCase();
      processed = processed.filter(offer =>
        offer.name.toLowerCase().includes(query) ||
        offer.shortDescription.toLowerCase().includes(query) ||
        offer.category.toLowerCase().includes(query) ||
        (offer.badges || []).some(badge => badge.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    switch (filterValues.sortBy) {
      case 'highest-discount':
        processed = processed.sort((a, b) => {
          const discountA = calculateDiscountPercentage(a);
          const discountB = calculateDiscountPercentage(b);
          return discountB - discountA;
        });
        break;
      case 'price-low-high':
        processed = processed.sort((a, b) => {
          const priceA = parseFloat(a.pricing.display.replace(/[^0-9.]/g, ''));
          const priceB = parseFloat(b.pricing.display.replace(/[^0-9.]/g, ''));
          return priceA - priceB;
        });
        break;
      case 'price-high-low':
        processed = processed.sort((a, b) => {
          const priceA = parseFloat(a.pricing.display.replace(/[^0-9.]/g, ''));
          const priceB = parseFloat(b.pricing.display.replace(/[^0-9.]/g, ''));
          return priceB - priceA;
        });
        break;
      case 'name-az':
        processed = processed.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return processed;
  }, [availableCategories, calculateDiscountPercentage]);

  return (
    <UniversalFilterControls
      config={filterConfig}
      filters={filters}
      activeFilters={activeFilters}
      hasActiveFilters={hasActiveFilters}
      onFilterChange={setFilter}
      onClearFilter={clearFilter}
      onClearAllFilters={clearAllFilters}
      className={className}
      showFilterBadges={true}
      gridPreset="filters"
    />
  );
}
