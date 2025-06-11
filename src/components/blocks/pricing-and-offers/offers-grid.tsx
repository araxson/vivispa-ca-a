"use client";

import type { OfferItem, OfferLocationData } from "@/data/pricing/offers";
import { OfferCard } from "./offer-card";
import { ResponsiveGrid } from "@/components/ui/responsive-grid";
import { AlertCircle } from "lucide-react";
import type { Location } from "@/data/contact";
import { EmptyState } from "@/components/ui/empty-state";

// Extended offer type to match the one used in the offers page
interface ExtendedOfferItem extends OfferItem {
  location?: string;
  locationDetails?: Location | undefined;
  dynamicUrl?: string;
  allAvailableLocations?: OfferLocationData[] | undefined;
  isAvailableAtSelectedLocation?: boolean;
}

interface OffersGridProps {
  offers: ExtendedOfferItem[];
  searchTerm?: string; // Keep for backward compatibility
}

export function OffersGrid({ offers, searchTerm }: OffersGridProps) {
  if (offers.length === 0) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="No offers found"
        description={
          searchTerm
            ? `No offers match "${searchTerm}". Try adjusting your search or filters.`
            : "No offers match your current filters. Try adjusting your selection to see more results."
        }
      />
    );
  }

  return (
    <section
      className="offers-grid"
      aria-label={`${offers.length} treatment offers`}
    >
      <ResponsiveGrid preset="offers" showAnimation={true}>
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </ResponsiveGrid>

      {/* Results count for screen readers */}
      <div className="sr-only" aria-live="polite">
        Found {offers.length} treatment{" "}
        {offers.length === 1 ? "offer" : "offers"}
      </div>
    </section>
  );
}
