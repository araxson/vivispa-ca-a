import React from 'react';
import { useUniversalFilters, createFilterConfig } from '@/hooks/use-universal-filters';
import { UniversalFilterControls } from '@/components/ui/universal-filter-controls';
import type { ServiceItem } from '@/types/pricing';

interface UnifiedPricingFiltersProps {
  initialServices: ServiceItem[];
  onFiltersChange: (filteredServices: ServiceItem[]) => void;
  className?: string;
}

/**
 * Unified pricing filters component using the universal filter system
 * Replaces the old PricingFilters component with a more flexible solution
 */
export function UnifiedPricingFilters({
  initialServices,
  onFiltersChange,
  className
}: UnifiedPricingFiltersProps) {
  
  // Extract unique categories and locations from services
  const categories = React.useMemo(() => {
    return [...new Set(initialServices.map(service => service.category))].sort();
  }, [initialServices]);

  const locations = React.useMemo(() => {
    return ['Downtown', 'Edmonton Trail'];
  }, []);

  // Create filter configuration with dynamic options
  const filterConfig = React.useMemo(() => {
    return createFilterConfig('pricing', {
      category: categories.map(cat => ({ value: cat, label: cat })),
      location: locations.map(loc => ({ value: loc, label: loc }))
    });
  }, [categories, locations]);

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
      location: 'Downtown', // Default location
      category: 'all',
      priceRange: 'all',
      search: ''
    },
    onFiltersChange: (newFilters) => {
      // Apply filters to services
      const filtered = applyFilters(initialServices, newFilters);
      onFiltersChange(filtered);
    }
  });

  // Apply filters to services
  const applyFilters = React.useCallback((services: ServiceItem[], filterValues: Record<string, any>) => {
    let filtered = [...services];

    // Filter by location
    if (filterValues.location && filterValues.location !== 'all') {
      // Note: In the original implementation, location filtering was done differently
      // This maintains compatibility with the existing data structure
      filtered = services.filter(service => {
        // Location filtering logic would depend on how services are associated with locations
        // For now, we'll assume all services are available at selected location
        return true;
      });
    }

    // Filter by search term
    if (filterValues.search && typeof filterValues.search === 'string') {
      const searchTerm = filterValues.search.toLowerCase();
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchTerm) ||
        service.category.toLowerCase().includes(searchTerm) ||
        (service.subcategory && service.subcategory.toLowerCase().includes(searchTerm))
      );
    }

    // Filter by category
    if (filterValues.category && filterValues.category !== 'all') {
      filtered = filtered.filter(service => service.category === filterValues.category);
    }

    // Filter by price range
    if (filterValues.priceRange && filterValues.priceRange !== 'all') {
      filtered = filtered.filter(service => {
        const price = parseFloat(service.price.replace(/[$,]/g, ''));
        switch (filterValues.priceRange) {
          case 'under-100':
            return price < 100;
          case '100-200':
            return price >= 100 && price <= 200;
          case '200-500':
            return price >= 200 && price <= 500;
          case 'over-500':
            return price > 500;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, []);

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

// Backward compatibility export that matches the old interface
export interface CompatiblePricingFiltersProps {
  searchTerm: string;
  selectedLocation: string;
  selectedCategory: string;
  selectedPriceRange: string;
  locations: string[];
  categories: string[];
  activeFilters: Array<{ type: string; label: string; value: any; icon?: string }>;
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPriceRangeChange: (value: string) => void;
  onClearFilter: (filterType: string) => void;
  onClearAllFilters: () => void;
}

/**
 * Backward-compatible wrapper for existing pricing filters usage
 * This allows gradual migration from the old system
 */
export function CompatiblePricingFilters(props: CompatiblePricingFiltersProps) {
  const filterConfig = React.useMemo(() => {
    return createFilterConfig('pricing', {
      category: props.categories.map(cat => ({ value: cat, label: cat })),
      location: props.locations.map(loc => ({ value: loc, label: loc }))
    });
  }, [props.categories, props.locations]);

  const filters = React.useMemo(() => ({
    search: props.searchTerm,
    location: props.selectedLocation,
    category: props.selectedCategory,
    priceRange: props.selectedPriceRange
  }), [props.searchTerm, props.selectedLocation, props.selectedCategory, props.selectedPriceRange]);

  const handleFilterChange = React.useCallback((key: string, value: any) => {
    switch (key) {
      case 'search':
        props.onSearchChange(value);
        break;
      case 'location':
        props.onLocationChange(value);
        break;
      case 'category':
        props.onCategoryChange(value);
        break;
      case 'priceRange':
        props.onPriceRangeChange(value);
        break;
    }
  }, [props]);

  return (
    <UniversalFilterControls
      config={filterConfig}
      filters={filters}
      activeFilters={props.activeFilters}
      hasActiveFilters={props.activeFilters.length > 0}
      onFilterChange={handleFilterChange}
      onClearFilter={props.onClearFilter}
      onClearAllFilters={props.onClearAllFilters}
      showFilterBadges={true}
      gridPreset="filters"
    />
  );
}
