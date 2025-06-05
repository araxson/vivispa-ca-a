'use client';

import type { OfferItem } from '@/data/pricing/offers';
import { OfferCard } from './offer-card';
import { AlertCircle } from 'lucide-react';

// Extended offer type to match the one used in the offers page
interface ExtendedOfferItem extends OfferItem {
  location?: string;
  locationDetails?: any;
  dynamicUrl?: string;
  allAvailableLocations?: any[];
  isAvailableAtSelectedLocation?: boolean;
}

interface OffersGridProps {
  offers: ExtendedOfferItem[];
  searchTerm?: string; // Keep for backward compatibility
}

export function OffersGrid({ offers, searchTerm }: OffersGridProps) {
  if (offers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-3">
          No offers found
        </h3>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          {searchTerm 
            ? `No offers match "${searchTerm}". Try adjusting your search or filters.`
            : "No offers match your current filters. Try adjusting your selection to see more results."
          }
        </p>
      </div>
    );
  }

  return (
    <section className="offers-grid" aria-label={`${offers.length} treatment offers`}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
      
      {/* Results count for screen readers */}
      <div className="sr-only" aria-live="polite">
        Found {offers.length} treatment {offers.length === 1 ? 'offer' : 'offers'}
      </div>
    </section>
  );
} 