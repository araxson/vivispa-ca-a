import { Metadata } from "next";
import { locations } from "@/data/contact/contact";
import { ContactInfoTable, HoursTable, LocationDetailsCard, CTASection } from "@/components/blocks";
import { Animated } from "@/components/ui/animated";
import { SectionHeader } from "@/components/blocks";
import { cn, gridVariants } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us | Vivi Aesthetics & Spa",
  description:
    "Contact Vivi Aesthetics & Spa in Calgary. Visit us at our Downtown or Edmonton Trail locations.",
};

export default function ContactPage() {
  return (
    <>
      <Animated variant="slideUp">
        <SectionHeader
          title="Contact Us"
          subtitle="We'd love to hear from you! Visit one of our locations or contact us using the information below."
        />
      </Animated>

      <Animated variant="slideUp" delay="short">
        <div className={cn(gridVariants({ cols: 2, gap: "lg" }))}>
          <ContactInfoTable />
          <HoursTable />
        </div>
      </Animated>

      <Animated variant="slideUp" delay="medium">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Location Details</h2>
          <div className={cn(gridVariants({ cols: 2, gap: "lg" }))}>
            {locations.map((location) => (
              <Animated key={location.id} variant="slideUp" delay="long">
                <LocationDetailsCard location={location} />
              </Animated>
            ))}
          </div>
        </div>
      </Animated>

      <Animated variant="slideUp" delay="long">
        <CTASection
          title="Ready to Book Your Appointment?"
          description="Experience luxury beauty treatments at Vivi Aesthetics & Spa. Book your appointment today and discover why we're Calgary's premier destination for aesthetic treatments."
          primaryCTA={{
            text: "Book Now",
            href: "/pricing",
            icon: "calendar",
            external: true,
          }}
          secondaryCTA={{
            text: "Call Us",
            href: "tel:+14037087654",
            variant: "outline",
            icon: "phone",
          }}
          variant="gradient"
        />
      </Animated>
    </>
  );
}
