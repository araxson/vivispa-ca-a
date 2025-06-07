"use client";

import React from "react";
import { Section } from "@/components/ui";
import { SharedCTA } from "@/components/blocks/shared-cta";
import { PricingFilters } from "@/components/blocks/pricing-filters";
import { PricingResultsSummary } from "@/components/blocks/pricing-results-summary";
import { PricingAccordion } from "@/components/blocks/pricing-accordion";
import { PricingEmptyState } from "@/components/blocks/pricing-empty-state";
import { usePricingFilters } from "@/hooks/use-pricing-filters";
import { SectionHeader } from "@/components/blocks/section-header";

// Metadata must be in a separate file for client components
// See metadata.ts in the same directory

export default function PricingPage() {
  const {
    searchTerm,
    selectedLocation,
    selectedCategory,
    selectedPriceRange,
    locations,
    categories,
    activeFilters,
    filteredServices,
    servicesByCategory,
    setSearchTerm,
    setSelectedLocation,
    setSelectedCategory,
    setSelectedPriceRange,
    handleClearFilter,
    handleClearAllFilters,
  } = usePricingFilters();

  const hasResults = Object.keys(servicesByCategory).length > 0;
  const filtersKey = JSON.stringify(activeFilters);

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
            <PricingFilters
              searchTerm={searchTerm}
              selectedLocation={selectedLocation}
              selectedCategory={selectedCategory}
              selectedPriceRange={selectedPriceRange}
              locations={locations}
              categories={categories}
              activeFilters={activeFilters}
              onSearchChange={setSearchTerm}
              onLocationChange={setSelectedLocation}
              onCategoryChange={setSelectedCategory}
              onPriceRangeChange={setSelectedPriceRange}
              onClearFilter={handleClearFilter}
              onClearAllFilters={handleClearAllFilters}
            />

            {/* Results Summary */}
            <PricingResultsSummary totalResults={filteredServices.length} />
          </div>

          {/* Services Display */}
          {hasResults ? (
            <PricingAccordion
              key={filtersKey}
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
