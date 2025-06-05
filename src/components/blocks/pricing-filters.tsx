import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  FilterBadges,
  SearchInput
} from '@/components/ui';
import type { FilterItem } from '@/components/ui/filter-badges';

interface PricingFiltersProps {
  searchTerm: string;
  selectedLocation: string;
  selectedCategory: string;
  selectedPriceRange: string;
  locations: string[];
  categories: string[];
  activeFilters: FilterItem[];
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPriceRangeChange: (value: string) => void;
  onClearFilter: (filterType: string) => void;
  onClearAllFilters: () => void;
}

const PricingFilters: React.FC<PricingFiltersProps> = ({
  searchTerm,
  selectedLocation,
  selectedCategory,
  selectedPriceRange,
  locations,
  categories,
  activeFilters,
  onSearchChange,
  onLocationChange,
  onCategoryChange,
  onPriceRangeChange,
  onClearFilter,
  onClearAllFilters
}) => {
  return (
    <section 
      className="bg-card border border-border rounded-2xl p-4 mb-6 sm:mb-8"
      aria-label="Filter services"
    >
      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {/* Location Filter */}
        <Select 
          value={selectedLocation || 'all'} 
          onValueChange={(value) => onLocationChange(value === 'all' ? 'all' : value)}
        >
          <SelectTrigger 
            className="w-full"
            aria-label="Select location"
          >
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>{location}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select 
          value={selectedCategory || 'all'} 
          onValueChange={(value) => onCategoryChange(value === 'all' ? 'all' : value)}
        >
          <SelectTrigger 
            className="w-full"
            aria-label="Select service category"
          >
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Price Range Filter */}
        <Select 
          value={selectedPriceRange || 'all'} 
          onValueChange={(value) => onPriceRangeChange(value === 'all' ? 'all' : value)}
        >
          <SelectTrigger 
            className="w-full"
            aria-label="Select price range"
          >
            <SelectValue placeholder="All Prices" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="under-100">Under $100</SelectItem>
            <SelectItem value="100-200">$100 - $200</SelectItem>
            <SelectItem value="200-500">$200 - $500</SelectItem>
            <SelectItem value="over-500">Over $500</SelectItem>
          </SelectContent>
        </Select>

        {/* Search */}
        <SearchInput 
          onSearch={onSearchChange}
          initialValue={searchTerm}
          placeholder="Search services..."
        />
      </div>

      {/* Active Filters & Clear All */}
      <FilterBadges
        activeFilters={activeFilters}
        onClearFilter={onClearFilter}
        onClearAll={onClearAllFilters}
      />
    </section>
  );
};

export { PricingFilters }; 