import { CompatiblePricingFilters } from "./unified-pricing-filters";
import type { FilterItem } from "@/components/ui/filter-badges";

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

/**
 * @deprecated Use UnifiedPricingFilters or CompatiblePricingFilters directly
 * This component is maintained for backward compatibility only
 */
const PricingFilters: React.FC<PricingFiltersProps> = (props) => {
  return <CompatiblePricingFilters {...props} />;
};

export { PricingFilters };
