import { Suspense } from 'react';
import type { Metadata } from 'next';
import { OffersPageClient } from '@/components/blocks/offers-page-client';
import { consolidatedOffers, AVAILABLE_LOCATIONS } from '@/data/pricing/offers';
import { Badge, Container } from '@/components/ui';
import { Star } from 'lucide-react';
import { CTASection } from '@/components/blocks/cta-section';
import { ErrorBoundary } from '@/components/blocks/error-boundary';
import { generatePageMetadata } from '@/app/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Special Offers & Promotions - Exclusive Beauty Treatment Deals | Vivi Aesthetics & Spa',
  description: 'Save up to 40% on premium spa treatments in Calgary! Discover exclusive limited-time offers on Hydrofacials, laser hair removal, microneedling, IPL photofacial, and more aesthetic services at Vivi Aesthetics & Spa. Book now!',
  keywords: [
    'spa offers Calgary',
    'aesthetic deals calgary',
    'hydrofacial special offers',
    'laser hair removal promotions',
    'beauty treatment discounts',
    'Calgary spa promotions',
    'aesthetic treatment deals',
    'limited time spa offers',
    'exclusive beauty promotions',
    'microneedling deals calgary',
    'IPL photofacial offers',
    'laser skin treatments calgary',
  ],
  ogImage: '/images/offers/special-offers.webp',
  canonicalUrl: '/offers',
});

export default function OffersPage() {
  const totalOffers = consolidatedOffers.length;

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-8 lg:py-12">
        {/* Header Section */}
        <header className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 lg:mb-6">
            Exclusive Spa Offers
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 lg:mb-8 leading-relaxed">
            Discover our premium spa and wellness treatments at unbeatable prices.
            Limited-time offers designed to enhance your beauty and wellness journey.
          </p>
          <Badge 
            variant="default" 
            className="bg-primary text-primary-foreground px-4 py-2 text-base md:text-lg inline-flex items-center gap-2"
            aria-label={`${totalOffers} special offers currently available`}
          >
            <Star className="h-4 w-4" aria-hidden="true" />
            {totalOffers} Active Offers
          </Badge>
        </header>

        {/* Main Content */}
        <ErrorBoundary>
          <Suspense fallback={<OffersPageSkeleton />}>
            <OffersPageClient 
              initialOffers={consolidatedOffers}
              availableLocations={AVAILABLE_LOCATIONS}
            />
          </Suspense>
        </ErrorBoundary>
        
                  <CTASection
            variant="minimal"
            title="Ready to Transform Your Look?"
            description="Book your appointment today and experience our premium beauty services."
            primaryCTA={{
              text: "Book Your Appointment",
              href: "/pricing",
              variant: "default",
              icon: "calendar"
            }}
            secondaryCTA={{
              text: "Contact Us",
              href: "/contact",
              variant: "outline",
              icon: "phone"
            }}
          />
      </Container>
    </div>
  );
}

// Loading skeleton component - optimized to prevent layout shift
function OffersPageSkeleton() {
  return (
    <div className="space-y-8" role="status" aria-label="Loading offers">
      {/* Filters Skeleton */}
      <div className="bg-card border border-border rounded-2xl p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div 
              key={i} 
              className="h-11 bg-muted rounded-lg" 
            />
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
  );
} 