import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  FilterBadges,
  SearchInput,
  Input,
  Button
} from '@/components/ui';
import { ResponsiveGrid } from '@/components/ui/responsive-grid';
import type { FilterConfig, FilterState, FilterOption } from '@/hooks/use-universal-filters';
import type { FilterItem } from '@/components/ui/filter-badges';
import { cn } from '@/lib/utils';

export interface UniversalFilterControlsProps {
  config: FilterConfig[];
  filters: FilterState;
  activeFilters: FilterItem[];
  hasActiveFilters: boolean;
  onFilterChange: (key: string, value: string | string[] | boolean | undefined) => void;
  onClearFilter: (key: string) => void;
  onClearAllFilters: () => void;
  className?: string;
  showFilterBadges?: boolean;
  gridPreset?: 'filters' | 'auto' | 'compact';
  size?: 'sm' | 'md';
}

/**
 * Universal filter controls component that can render any filter configuration
 * Supports search, select, range, and sort filter types
 */
export function UniversalFilterControls({
  config,
  filters,
  activeFilters,
  hasActiveFilters,
  onFilterChange,
  onClearFilter,
  onClearAllFilters,
  className,
  showFilterBadges = true,
  gridPreset = 'filters',
  size = 'md'
}: UniversalFilterControlsProps) {

  const renderFilter = (filterConfig: FilterConfig) => {
    const {
      type,
      key,
      label,
      placeholder,
      options = [],
      disabled = false
    } = filterConfig;

    const value = filters[key];

    switch (type) {      case 'search':
        return (
          <SearchInput
            key={key}
            placeholder={placeholder || `Search ${label.toLowerCase()}...`}
            value={(value as string) || ''}
            onSearch={(newValue) => onFilterChange(key, newValue)}
            className="w-full"
            disabled={disabled}
          />
        );

      case 'select':
      case 'range':
      case 'sort':        return (
          <Select
            key={key}
            value={(value as string) || 'all'}
            onValueChange={(newValue) => onFilterChange(key, newValue)}
            {...(disabled && { disabled: true })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder || `Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
              {filterConfig.allowAll !== false && (
                <SelectItem value="all">
                  All {label}
                </SelectItem>
              )}
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled === true}
                >
                  {option.label}
                  {option.count && ` (${option.count})`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'multiselect':
        // For now, render as a simple select - can be enhanced later
        return (
          <Select
            key={key}
            value={Array.isArray(value) && value.length > 0 ? value[0] : 'all'}
            onValueChange={(newValue) => {
              if (newValue === 'all') {
                onFilterChange(key, []);
              } else {
                onFilterChange(key, [newValue]);
              }
            }}
            disabled={disabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder || `Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All {label}</SelectItem>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled === true}
                >
                  {option.label}
                  {option.count && ` (${option.count})`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'toggle':
        return (
          <div key={key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={key}
              checked={value === true}
              onChange={(e) => onFilterChange(key, e.target.checked)}
              disabled={disabled}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor={key} className="text-sm font-medium">
              {label}
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn("space-y-4", className)}>      {/* Filter Controls */}
      <ResponsiveGrid preset={gridPreset === 'auto' ? 'filters' : gridPreset} className="gap-4">
        {config.map(renderFilter)}
      </ResponsiveGrid>

      {/* Filter Badges */}
      {showFilterBadges && hasActiveFilters && (
        <FilterBadges
          activeFilters={activeFilters}
          onClearFilter={onClearFilter}
          onClearAll={onClearAllFilters}
          size={size}
          className="mt-4"
        />
      )}
    </div>
  );
}

// Helper function to create filter configurations with proper typing
export function createFilterConfig(
  baseConfig: Omit<FilterConfig, 'options'>,
  options?: Array<{
    value: string;
    label: string;
    count?: number;
    disabled?: boolean;
  }>
): FilterConfig {
  return {
    ...baseConfig,
    options: options?.map(opt => ({
      value: opt.value,
      label: opt.label,
      ...(opt.count !== undefined && { count: opt.count }),
      ...(opt.disabled !== undefined && { disabled: opt.disabled })
    }))
  };
}
