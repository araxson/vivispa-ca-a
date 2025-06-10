import type { Metadata } from "next";
import { OffersPageClient } from "@/components/blocks/offers-page-client";
import { getAllOffers, getAvailableOfferLocations } from "@/lib/data-fetcher";
import { generatePageMetadata } from "@/app/metadata";
import { MarketingPageLayout } from "@/components/layout/marketing-page-layout";
import { Section } from "@/components/ui"; // Keep Section for Skeleton

export const metadata: Metadata = generatePageMetadata({
  title: "Special Offers",
  description: "Take advantage of our exclusive offers and packages.",
});

export default function OffersPage() {
  const offers = getAllOffers();
  const availableLocations = getAvailableOfferLocations();

  return (
    <MarketingPageLayout
      title="Special Offers"
      subtitle="Take advantage of our exclusive offers and packages."
    >
      <OffersPageClient
        initialOffers={offers}
        availableLocations={availableLocations}
      />
    </MarketingPageLayout>
  );
}

// Loading skeleton component - optimized to prevent layout shift
function OffersPageSkeleton() {
  return (
    <Section spacing="md">
      <div className="space-y-8" role="status" aria-label="Loading offers">
        {/* Filters Skeleton */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-11 bg-muted rounded-lg" />
            ))}
          </div>
        </div>

        {/* Results Summary Skeleton */}
        <div className="text-center">
          <div className="h-6 bg-muted rounded w-48 mx-auto" />
        </div>

        {/* Grid Skeleton - maintain consistent aspect ratios */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-lg overflow-hidden"
            >
              <div className="aspect-[4/3] bg-muted" />
              <div className="p-6 space-y-4">
                <div className="h-6 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-10 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Screen reader announcement */}
        <div className="sr-only">Loading special offers, please wait...</div>
      </div>
    </Section>
  );
}
