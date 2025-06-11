import { useState, useMemo, useCallback } from 'react';
import type { FilterItem } from '@/components/ui/filter-badges';

// Universal filter configuration interface
export interface FilterConfig {
  type: 'search' | 'select' | 'multiselect' | 'range' | 'toggle' | 'sort';
  key: string;
  label: string;
  placeholder?: string | undefined;
  options?: FilterOption[] | undefined;
  defaultValue?: string | string[] | boolean | undefined;
  searchable?: boolean | undefined;
  allowAll?: boolean | undefined;
  icon?: 'search' | 'location' | 'category' | 'tag' | undefined;
  disabled?: boolean | undefined;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  disabled?: boolean;
  group?: string;
}

export interface FilterState {
  [key: string]: string | string[] | boolean | undefined;
}

export interface UniversalFiltersConfig {
  config: FilterConfig[];
  initialValues?: FilterState;
  onFiltersChange?: (filters: FilterState) => void;
  persistToUrl?: boolean;
  enableUrlSync?: boolean;
}

export interface UniversalFiltersReturn {
  // State
  filters: FilterState;
  activeFilters: FilterItem[];
  hasActiveFilters: boolean;
  
  // Actions
  setFilter: (key: string, value: string | string[] | boolean | undefined) => void;
  clearFilter: (key: string) => void;
  clearAllFilters: () => void;
  resetToDefaults: () => void;
  
  // Utilities
  getFilterValue: (key: string) => string | string[] | boolean | undefined;
  getFilterConfig: (key: string) => FilterConfig | undefined;
  getFilterOptions: (key: string) => FilterOption[];
}

/**
 * Universal filter hook that handles all common filtering patterns
 * Supports search, select, multiselect, range, toggle, and sort filters
 */
export function useUniversalFilters({
  config,
  initialValues = {},
  onFiltersChange,
  persistToUrl = false,
  enableUrlSync = false
}: UniversalFiltersConfig): UniversalFiltersReturn {
  
  // Initialize filter state with defaults
  const defaultState = useMemo(() => {
    const defaults: FilterState = {};
    config.forEach(filter => {
      const key = filter.key;
      if (initialValues[key] !== undefined) {
        defaults[key] = initialValues[key];
      } else if (filter.defaultValue !== undefined) {
        defaults[key] = filter.defaultValue;
      } else {
        // Set appropriate default based on filter type
        switch (filter.type) {
          case 'search':
            defaults[key] = '';
            break;
          case 'select':
          case 'range':
          case 'sort':
            defaults[key] = filter.allowAll !== false ? 'all' : (filter.options?.[0]?.value || '');
            break;
          case 'multiselect':
            defaults[key] = [];
            break;
          case 'toggle':
            defaults[key] = false;
            break;
          default:
            defaults[key] = '';
        }
      }
    });
    return defaults;
  }, [config, initialValues]);

  const [filters, setFilters] = useState<FilterState>(defaultState);

  // Update filter value
  const setFilter = useCallback((key: string, value: string | string[] | boolean | undefined) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      onFiltersChange?.(newFilters);
      return newFilters;
    });
  }, [onFiltersChange]);

  // Clear specific filter
  const clearFilter = useCallback((key: string) => {
    const filterConfig = config.find(f => f.key === key);
    if (!filterConfig) return;

    let defaultValue: string | string[] | boolean | undefined;
    switch (filterConfig.type) {
      case 'search':
        defaultValue = '';
        break;
      case 'select':
      case 'range':
      case 'sort':
        defaultValue = filterConfig.allowAll !== false ? 'all' : (filterConfig.options?.[0]?.value || '');
        break;
      case 'multiselect':
        defaultValue = [];
        break;
      case 'toggle':
        defaultValue = false;
        break;
      default:
        defaultValue = '';
    }

    setFilter(key, defaultValue);
  }, [config, setFilter]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setFilters(defaultState);
    onFiltersChange?.(defaultState);
  }, [defaultState, onFiltersChange]);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    clearAllFilters();
  }, [clearAllFilters]);

  // Get filter value
  const getFilterValue = useCallback((key: string) => {
    return filters[key];
  }, [filters]);

  // Get filter configuration
  const getFilterConfig = useCallback((key: string) => {
    return config.find(f => f.key === key);
  }, [config]);

  // Get filter options
  const getFilterOptions = useCallback((key: string): FilterOption[] => {
    const filterConfig = getFilterConfig(key);
    return filterConfig?.options || [];
  }, [getFilterConfig]);

  // Generate active filters for badges
  const activeFilters = useMemo((): FilterItem[] => {
    const active: FilterItem[] = [];

    config.forEach(filterConfig => {
      const value = filters[filterConfig.key];
      const key = filterConfig.key;

      if (!value) return;

      switch (filterConfig.type) {
        case 'search':
          if (typeof value === 'string' && value.trim()) {
            active.push({
              type: key,
              label: `"${value}"`,
              value: value,
              icon: filterConfig.icon || 'search'
            });
          }
          break;        case 'select':
        case 'range':
        case 'sort':
          if (typeof value === 'string' && value !== 'all' && value !== '') {
            const option = filterConfig.options?.find(opt => opt.value === value);
            active.push({
              type: key,
              label: option?.label || value,
              value: value,
              icon: filterConfig.icon || 'category'
            });
          }
          break;

        case 'multiselect':
          if (Array.isArray(value) && value.length > 0) {
            value.forEach(val => {
              const option = filterConfig.options?.find(opt => opt.value === val);
              active.push({
                type: key,
                label: option?.label || val,
                value: val,
                icon: filterConfig.icon || 'tag'
              });
            });
          }
          break;        case 'toggle':
          if (value === true) {
            active.push({
              type: key,
              label: filterConfig.label,
              value: 'true', // Convert boolean to string for FilterItem
              icon: filterConfig.icon || 'tag'
            });
          }
          break;
      }
    });

    return active;
  }, [filters, config]);

  const hasActiveFilters = activeFilters.length > 0;

  return {
    // State
    filters,
    activeFilters,
    hasActiveFilters,
    
    // Actions
    setFilter,
    clearFilter,
    clearAllFilters,
    resetToDefaults,
    
    // Utilities
    getFilterValue,
    getFilterConfig,
    getFilterOptions
  };
}

// Preset configurations for common use cases
export const FILTER_PRESETS = {
  // Pricing page filters
  pricing: [
    {
      type: 'select' as const,
      key: 'location',
      label: 'Location',
      placeholder: 'Select a Location',
      icon: 'location',
      allowAll: false,
      options: [
        { value: 'Downtown', label: 'Downtown' },
        { value: 'Edmonton Trail', label: 'Edmonton Trail' }
      ]
    },
    {
      type: 'select' as const,
      key: 'category',
      label: 'Category',
      placeholder: 'All Categories',
      icon: 'category',
      allowAll: true,
      options: [] // Will be populated dynamically
    },
    {
      type: 'range' as const,
      key: 'priceRange',
      label: 'Price Range',
      placeholder: 'All Prices',
      icon: 'tag',
      allowAll: true,
      options: [
        { value: 'under-100', label: 'Under $100' },
        { value: '100-200', label: '$100 - $200' },
        { value: '200-500', label: '$200 - $500' },
        { value: 'over-500', label: 'Over $500' }
      ]
    },
    {
      type: 'search' as const,
      key: 'search',
      label: 'Search',
      placeholder: 'Search services...',
      icon: 'search'
    }
  ],

  // Offers page filters
  offers: [
    {
      type: 'select' as const,
      key: 'location',
      label: 'Location',
      placeholder: 'All Locations',
      icon: 'location',
      allowAll: true,
      options: [] // Will be populated dynamically
    },
    {
      type: 'select' as const,
      key: 'category',
      label: 'Category',
      placeholder: 'All Services',
      icon: 'category',
      allowAll: true,
      options: [] // Will be populated dynamically
    },    {
      type: 'sort' as const,
      key: 'sortBy',
      label: 'Sort By',
      placeholder: 'Sort offers',
      icon: 'category',
      allowAll: false,
      defaultValue: 'highest-discount',
      options: [
        { value: 'highest-discount', label: 'Highest Discount' },
        { value: 'price-low-high', label: 'Price: Low to High' },
        { value: 'price-high-low', label: 'Price: High to Low' },
        { value: 'name-az', label: 'Name A-Z' }
      ]
    },
    {
      type: 'search' as const,
      key: 'search',
      label: 'Search',
      placeholder: 'Search treatments...',
      icon: 'search'
    }
  ]
} as const;

export type FilterPresetKey = keyof typeof FILTER_PRESETS;

/**
 * Get a preset filter configuration
 */
export function getFilterPreset(preset: FilterPresetKey): FilterConfig[] {
  return FILTER_PRESETS[preset].map(filter => ({
    ...filter,
    options: 'options' in filter && filter.options ? [...filter.options] : undefined
  })) as FilterConfig[];
}

/**
 * Create filter configuration with dynamic options
 */
export function createFilterConfig(
  preset: FilterPresetKey,
  dynamicOptions: Partial<Record<string, FilterOption[]>>
): FilterConfig[] {
  const config = getFilterPreset(preset);
  
  return config.map(filter => {
    if (dynamicOptions[filter.key]) {
      return { ...filter, options: dynamicOptions[filter.key] };
    }
    return filter;
  });
}
