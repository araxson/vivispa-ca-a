"use client"

import React from 'react';
import { Container } from '@/components/ui';
import { allServices } from '@/data/pricing/index';
import { CTASection } from '@/components/blocks/cta-section';
import { PricingFilters } from '@/components/blocks/pricing-filters';
import { PricingResultsSummary } from '@/components/blocks/pricing-results-summary';
import { PricingAccordion } from '@/components/blocks/pricing-accordion';
import { PricingEmptyState } from '@/components/blocks/pricing-empty-state';
import { usePricingFilters } from '@/hooks/use-pricing-filters';

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
    handleClearAllFilters
  } = usePricingFilters();

  const hasResults = Object.keys(servicesByCategory).length > 0;

  return (
    <Container className="py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 px-4 sm:px-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Services & Pricing
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Discover our comprehensive range of aesthetic treatments with transparent pricing. 
            Professional services designed to help you look and feel your best.
          </p>
        </div>

        {/* Filters Section */}
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
        <PricingResultsSummary
          totalResults={filteredServices.length}
        />

        {/* Services Display */}
        {hasResults ? (
          <PricingAccordion servicesByCategory={servicesByCategory} />
        ) : (
          <PricingEmptyState />
        )}
        
        {/* CTA Section */}
        <CTASection
          variant="minimal"
          title="Ready to Transform Your Look?"
          description="Book your appointment today and experience our premium beauty services."
          primaryCTA={{
            text: "Book Your Appointment",
            href: "/booking",
            variant: "default"
          }}
          secondaryCTA={{
            text: "View Offers",
            href: "/offers",
            variant: "outline"
          }}
        />
      </div>
    </Container>
  );
}
