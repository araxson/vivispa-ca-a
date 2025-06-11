"use client";

import React, { useMemo } from "react";
import { Section } from "@/components/ui";
import { SharedCTA } from "@/components/blocks/shared-cta";
import { UniversalFilterControls } from "@/components/ui/universal-filter-controls";
import { PricingResultsSummary } from "@/components/blocks/pricing-results-summary";
import { PricingAccordion } from "@/components/blocks/pricing-accordion";
import { PricingEmptyState } from "@/components/blocks/pricing-empty-state";
import { useUniversalFilters, type FilterConfig } from "@/hooks/use-universal-filters";
import { SectionHeader } from "@/components/blocks/section-header";
import { allServices } from "@/data/pricing/index";
import type { ServiceItem } from "@/types/pricing";
import { useLocationServices } from "@/hooks/use-location-services";

// Metadata must be in a separate file for client components
// See metadata.ts in the same directory

export default function PricingPage() {
  // Get unique locations and categories from data
  const locations = useMemo(() => ["Downtown", "Edmonton Trail"], []);
  const categories = useMemo(() => {
    return [...new Set(allServices.map((service) => service.category))].sort();
  }, []);

  // Create filter configuration
  const filterConfig = useMemo((): FilterConfig[] => [
    {
      type: 'search',
      key: 'search',
      label: 'Search Services',
      placeholder: 'Search for treatments...',
      icon: 'search'
    },
    {
      type: 'select',
      key: 'location',
      label: 'Location',
      placeholder: 'Select location',
      icon: 'location',
      options: locations.map(loc => ({ value: loc, label: loc })),
      defaultValue: 'Downtown'
    },
    {
      type: 'select',
      key: 'category',
      label: 'Category',
      placeholder: 'All Categories',
      icon: 'category',
      options: [
        { value: 'all', label: 'All Categories' },
        ...categories.map(cat => ({ value: cat, label: cat }))
      ],
      defaultValue: 'all',
      allowAll: true
    },
    {
      type: 'select',
      key: 'priceRange',
      label: 'Price Range',
      placeholder: 'All Prices',
      options: [
        { value: 'all', label: 'All Prices' },
        { value: '$0-100', label: 'Under $100' },
        { value: '$100-300', label: '$100 - $300' },
        { value: '$300-500', label: '$300 - $500' },
        { value: '$500+', label: '$500+' }
      ],
      defaultValue: 'all',
      allowAll: true
    }
  ], [locations, categories]);

  // Use universal filters hook
  const {
    filters,
    activeFilters,
    hasActiveFilters,
    setFilter,
    clearFilter,
    clearAllFilters
  } = useUniversalFilters({
    config: filterConfig
  });

  const selectedLocation = (filters.location as string) || 'Downtown';
  const { allServicesForLocation } = useLocationServices(selectedLocation);

  // Filter services based on current filter state
  const filteredServices = useMemo(() => {
    let filtered = allServicesForLocation;

    // Apply search filter
    const searchTerm = filters.search as string;
    if (searchTerm?.trim()) {
      const search = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(search) ||
        service.category.toLowerCase().includes(search) ||
        (service.subcategory && service.subcategory.toLowerCase().includes(search))
      );
    }

    // Apply category filter
    const category = filters.category as string;
    if (category && category !== 'all') {
      filtered = filtered.filter(service => service.category === category);
    }

    // Apply price range filter
    const priceRange = filters.priceRange as string;
    if (priceRange && priceRange !== 'all') {
      filtered = filtered.filter(service => {
        const price = parseFloat(service.price.replace(/[$,]/g, ''));
        switch (priceRange) {
          case '$0-100':
            return price < 100;
          case '$100-300':
            return price >= 100 && price <= 300;
          case '$300-500':
            return price >= 300 && price <= 500;
          case '$500+':
            return price > 500;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [allServicesForLocation, filters]);

  // Group services by category
  const servicesByCategory = useMemo(() => {
    return filteredServices.reduce<Record<string, ServiceItem[]>>((acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = [];
      }
      acc[service.category].push(service);
      return acc;
    }, {});
  }, [filteredServices]);

  const hasResults = Object.keys(servicesByCategory).length > 0;

  // Create a key for re-rendering accordion when filters change
  const accordionKey = useMemo(() => {
    return JSON.stringify(filters);
  }, [filters]);

  return (
    <>
      <Section spacing="sm">
        <div className="space-y-12">
          {/* Header */}
          <SectionHeader
            as="h1"
            title="Services & Pricing"
            subtitle="Discover our comprehensive range of aesthetic treatments with transparent pricing. Professional services designed to help you look and feel your best."
          />

          {/* Filters Section */}
          <div className="space-y-6">
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
            <PricingResultsSummary
              totalServices={filteredServices.length}
              activeFilters={activeFilters}
            />
          </div>

          {/* Services Display */}
          {hasResults ? (
            <PricingAccordion
              key={accordionKey}
              servicesByCategory={servicesByCategory}
            />
          ) : (
            <PricingEmptyState />
          )}
        </div>
      </Section>

      {/* CTA Section */}
      <SharedCTA />
    </>
  );
}
