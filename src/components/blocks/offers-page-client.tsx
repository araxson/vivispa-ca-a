'use client';

import { useState, useMemo, useCallback, memo } from 'react';
import { Badge, Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SearchInput, FilterBadges } from '@/components/ui';
import type { FilterItem } from '@/components/ui/filter-badges';
import { OffersGrid } from './offers-grid';
import type { OfferItem, OfferLocationData } from '@/data/pricing/offers';
import { locations } from '@/data/constant';
import { X } from 'lucide-react';

// Extended offer type to include dynamic location info and booking URLs
type SmartOfferItem = OfferItem & { 
  location?: string;
  locationDetails?: typeof locations[0];
  dynamicUrl?: string;
  allAvailableLocations?: OfferLocationData[];
  isAvailableAtSelectedLocation?: boolean;
};

// Define service categories with better type safety
const SERVICE_CATEGORIES = [
  { id: 'eyelash-extensions', name: 'Eyelash Extensions', slug: 'eyelash-extensions', mappedCategory: 'beauty-treatments' },
  { id: 'hydrofacial', name: 'Hydrofacial Treatments', slug: 'hydrofacial', mappedCategory: 'facial-treatments' },
  { id: 'ipl-photofacial', name: 'IPL PhotoFacial', slug: 'ipl-photofacial', mappedCategory: 'laser-treatments' },
  { id: 'japanese-head-spa', name: 'Japanese Head Spa', slug: 'japanese-head-spa', mappedCategory: 'wellness-services' },
  { id: 'laser-hair-removal', name: 'Laser Hair Removal', slug: 'laser-hair-removal', mappedCategory: 'laser-treatments' },
  { id: 'laser-pigmentation-removal', name: 'Laser Pigmentation Removal', slug: 'laser-pigmentation-removal', mappedCategory: 'laser-treatments' },
  { id: 'laser-skin-tightening', name: 'Laser Skin Tightening', slug: 'laser-skin-tightening', mappedCategory: 'laser-treatments' },
  { id: 'microneedling', name: 'Microneedling', slug: 'microneedling', mappedCategory: 'advanced-treatments' },
  { id: 'skin-tag-removal', name: 'Skin Tag Removal', slug: 'skin-tag-removal', mappedCategory: 'advanced-treatments' },
  { id: 'vascular-vein-removal', name: 'Vascular Vein Removal', slug: 'vascular-vein-removal', mappedCategory: 'laser-treatments' }
] as const;

// Sort options
const SORT_OPTIONS = [
  { id: 'highest-discount', name: 'Highest Discount' },
  { id: 'price-low-high', name: 'Price: Low to High' },
  { id: 'price-high-low', name: 'Price: High to Low' },
  { id: 'name-az', name: 'Name A-Z' }
] as const;

interface OffersPageClientProps {
  initialOffers: OfferItem[];
  availableLocations: string[];
}

export const OffersPageClient = memo(function OffersPageClient({ initialOffers, availableLocations }: OffersPageClientProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('highest-discount');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Calculate discount percentage for an offer - memoized for performance
  const calculateDiscountPercentage = useCallback((offer: OfferItem): number => {
    if (!offer.pricing.isSpecialOffer || !offer.pricing.originalPrice) return 0;
    const current = parseFloat(offer.pricing.display.replace(/[^0-9.]/g, ''));
    const original = parseFloat(offer.pricing.originalPrice.replace(/[^0-9.]/g, ''));
    if (original <= 0 || current <= 0) return 0;
    return Math.round(((original - current) / original) * 100);
  }, []);

  // Get available categories from actual offers, considering selected location
  const availableCategories = useMemo(() => {
    return SERVICE_CATEGORIES.map(category => {
      let categoryOffers = initialOffers.filter(offer => 
        offer.category === category.mappedCategory ||
        offer.slug.includes(category.slug) ||
        offer.name.toLowerCase().includes(category.name.toLowerCase()) ||
        (category.id === 'hydrofacial' && offer.name.toLowerCase().includes('hydrafacial')) ||
        (category.id === 'japanese-head-spa' && (offer.slug.includes('head-spa') || offer.slug.includes('scalp-therapy')))
      );

      // Filter by selected location if one is selected
      if (selectedLocation) {
        categoryOffers = categoryOffers.filter(offer => 
          offer.availableLocations?.some(loc => loc.location === selectedLocation)
        );
      }

      return {
        ...category,
        offerCount: categoryOffers.length,
        isAvailable: categoryOffers.length > 0
      };
    });
  }, [initialOffers, selectedLocation]);

  // Clear specific filter
  const handleClearFilter = useCallback((filterType: string) => {
    switch (filterType) {
      case 'location':
        setSelectedLocation('');
        break;
      case 'category':
        setSelectedCategory('');
        break;
      case 'search':
        setSearchQuery('');
        break;
    }
  }, []);

  // Clear all filters
  const handleClearAllFilters = useCallback(() => {
    setSelectedLocation('');
    setSelectedCategory('');
    setSortBy('highest-discount');
    setSearchQuery('');
  }, []);

  // Get active filters for badges
  const activeFilters = useMemo((): FilterItem[] => {
    const filters: FilterItem[] = [];
    if (selectedLocation) {
      filters.push({
        type: 'location',
        label: selectedLocation,
        value: selectedLocation,
        icon: 'location'
      });
    }
    if (selectedCategory) {
      const categoryConfig = SERVICE_CATEGORIES.find(cat => cat.id === selectedCategory);
      filters.push({
        type: 'category',
        label: categoryConfig?.name || selectedCategory,
        value: selectedCategory,
        icon: 'category'
      });
    }
    if (searchQuery) {
      filters.push({
        type: 'search',
        label: `"${searchQuery}"`,
        value: searchQuery,
        icon: 'search'
      });
    }
    return filters;
  }, [selectedLocation, selectedCategory, searchQuery]);

  // Get filtered and sorted offers with optimized logic
  const filteredOffers = useMemo(() => {
    let processedOffers: SmartOfferItem[] = initialOffers.map(offer => {
      if (selectedLocation) {
        const locationData = offer.availableLocations?.find(loc => loc.location === selectedLocation);
        if (locationData) {
          const locationDetails = locations.find(loc => loc.name === selectedLocation);
          return {
            ...offer,
            location: selectedLocation,
            locationDetails,
            dynamicUrl: locationData.url,
            allAvailableLocations: offer.availableLocations,
            isAvailableAtSelectedLocation: true
          };
        } else {
          return {
            ...offer,
            allAvailableLocations: offer.availableLocations,
            isAvailableAtSelectedLocation: false
          };
        }
      } else {
        return {
          ...offer,
          allAvailableLocations: offer.availableLocations,
          isAvailableAtSelectedLocation: true
        };
      }
    });

    // Filter by location availability
    if (selectedLocation) {
      processedOffers = processedOffers.filter(offer => offer.isAvailableAtSelectedLocation);
    }

    // Filter by category
    if (selectedCategory) {
      const categoryConfig = SERVICE_CATEGORIES.find(cat => cat.id === selectedCategory);
      if (categoryConfig) {
        processedOffers = processedOffers.filter(offer => 
          offer.category === categoryConfig.mappedCategory ||
          offer.slug.includes(categoryConfig.slug) ||
          offer.name.toLowerCase().includes(categoryConfig.name.toLowerCase()) ||
          (categoryConfig.id === 'hydrofacial' && offer.name.toLowerCase().includes('hydrafacial')) ||
          (categoryConfig.id === 'japanese-head-spa' && (offer.slug.includes('head-spa') || offer.slug.includes('scalp-therapy')))
        );
      }
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      processedOffers = processedOffers.filter(offer =>
        offer.name.toLowerCase().includes(query) ||
        offer.shortDescription.toLowerCase().includes(query) ||
        offer.category.toLowerCase().includes(query) ||
        offer.badges.some(badge => badge.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'highest-discount':
        processedOffers = processedOffers.sort((a, b) => {
          const discountA = calculateDiscountPercentage(a);
          const discountB = calculateDiscountPercentage(b);
          return discountB - discountA;
        });
        break;
      case 'price-low-high':
        processedOffers = processedOffers.sort((a, b) => {
          const priceA = parseFloat(a.pricing.display.replace(/[^0-9.]/g, ''));
          const priceB = parseFloat(b.pricing.display.replace(/[^0-9.]/g, ''));
          return priceA - priceB;
        });
        break;
      case 'price-high-low':
        processedOffers = processedOffers.sort((a, b) => {
          const priceA = parseFloat(a.pricing.display.replace(/[^0-9.]/g, ''));
          const priceB = parseFloat(b.pricing.display.replace(/[^0-9.]/g, ''));
          return priceB - priceA;
        });
        break;
      case 'name-az':
        processedOffers = processedOffers.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return processedOffers;
  }, [initialOffers, selectedLocation, selectedCategory, sortBy, searchQuery, calculateDiscountPercentage]);

  const hasAnyFilters = activeFilters.length > 0;

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Filters Section */}
      <section 
        className="bg-card border border-border rounded-2xl p-4"
        aria-label="Filter offers"
      >
        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {/* Location Filter */}
          <Select 
            value={selectedLocation || 'all'} 
            onValueChange={(value) => setSelectedLocation(value === 'all' ? '' : value)}
          >
            <SelectTrigger 
              className="w-full"
              aria-label="Select location"
            >
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {availableLocations.map((location) => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Category Filter */}
                    <Select
            value={selectedCategory || 'all'} 
            onValueChange={(value) => setSelectedCategory(value === 'all' ? '' : value)}
          >
            <SelectTrigger 
              className="w-full"
              aria-label="Select service category"
            >
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {availableCategories.map((category) => (
                <SelectItem 
                  key={category.id} 
                  value={category.id} 
                  disabled={!category.isAvailable}
                >
                  {category.name} {category.offerCount > 0 && `(${category.offerCount})`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort Filter */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger 
              className="w-full"
              aria-label="Sort offers"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search */}
          <SearchInput 
            onSearch={setSearchQuery}
            initialValue={searchQuery}
            placeholder="Search treatments..."
          />
        </div>

        {/* Active Filters & Clear All */}
        <FilterBadges
          activeFilters={activeFilters}
          onClearFilter={handleClearFilter}
          onClearAll={handleClearAllFilters}
        />
      </section>

      {/* Results Summary */}
      <section className="text-center" aria-label="Search results summary">
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-2 text-lg text-muted-foreground"
          aria-live="polite"
          aria-atomic="true"
        >
          <p>
            Showing <span className="font-bold text-primary text-xl">{filteredOffers.length}</span> 
            {filteredOffers.length === 1 ? ' treatment' : ' treatments'}
          </p>
          {hasAnyFilters && (
            <span className="text-sm text-muted-foreground">
              (filtered from {initialOffers.length} total)
            </span>
          )}
        </div>
      </section>

      {/* Offers Grid */}
      <main>
        <OffersGrid offers={filteredOffers} />
      </main>

      {/* No Results Message */}
      {filteredOffers.length === 0 && (
        <section className="text-center py-16" aria-label="No results found">
          <div className="max-w-md mx-auto bg-card border border-border rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-3">No treatments found</h2>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search terms to find more results.
            </p>
            <Button 
              onClick={handleClearAllFilters} 
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
