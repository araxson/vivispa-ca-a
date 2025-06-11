import type { Metadata } from "next";
import { CTASection, SectionHeader } from "@/components/blocks";
import { OffersPageClient } from "@/components/blocks";
import { Animated } from "@/components/ui/animated";
import { Section } from "@/components/ui";
import { ResponsiveGrid } from "@/components/ui/responsive-grid";
import { getAllOffers, getAvailableOfferLocations } from "@/lib/data-fetcher";
import { generatePageMetadata } from "@/app/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Special Offers",
  description: "Take advantage of our exclusive offers and packages.",
});

export default function OffersPage() {
  const offers = getAllOffers();
  const availableLocations = getAvailableOfferLocations();

  return (
    <>
      <Section spacing="md">
        <Animated variant="fade" timing="normal">
          <SectionHeader
            title="Special Offers"
            subtitle="Take advantage of our exclusive offers and packages."
          />
        </Animated>
      </Section>

      <Section spacing="md">
        <Animated variant="fade" timing="normal" customDelay={200}>
          <OffersPageClient
            initialOffers={offers}
            availableLocations={availableLocations}
          />
        </Animated>
      </Section>

      <Animated variant="fade" timing="normal" customDelay={400}>
        <CTASection
          title="Ready to Book Your Appointment?"
          description="Experience luxury beauty treatments at Vivi Aesthetics & Spa. Book your appointment today and discover why we're Calgary's premier destination for aesthetic treatments."
          primaryCTA={{
            text: "Book Your Appointment",
            href: "/pricing",
            variant: "default",
            icon: "calendar",
          }}
          secondaryCTA={{
            text: "Contact Us",
            href: "/contact",
            variant: "outline",
            icon: "phone",
          }}
        />
      </Animated>
    </>
  );
}
