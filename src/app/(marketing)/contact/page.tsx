import { Metadata } from "next";
import { locations } from "@/data/contact/contact";
import { ContactInfoTable } from "@/components/blocks/contact-info-table";
import { HoursTable } from "@/components/blocks/hours-table";
import { LocationDetailsCard } from "@/components/blocks/location-details-card";
import { CTASection } from "@/components/blocks/cta-section";
import { Section } from "@/components/ui";
import { SectionHeader } from "@/components/blocks";

export const metadata: Metadata = {
  title: "Contact Us | Vivi Aesthetics & Spa",
  description:
    "Contact Vivi Aesthetics & Spa in Calgary. Visit us at our Downtown or Edmonton Trail locations.",
};

export default function ContactPage() {
  return (
    <>
      <Section spacing="sm">
        <SectionHeader
          title="Contact Us"
          subtitle="We'd love to hear from you! Visit one of our locations or contact us using the information below."
        />
      </Section>

      <Section spacing="sm">
        <div className="grid md:grid-cols-2 gap-8">
          <ContactInfoTable />
          <HoursTable />
        </div>
      </Section>

      <Section spacing="sm">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Location Details</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {locations.map((location) => (
              <LocationDetailsCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      </Section>

      <CTASection
        title="Ready to Book Your Appointment?"
        description="Experience luxury beauty treatments at Vivi Aesthetics & Spa. Book your appointment today and discover why we're Calgary's premier destination for aesthetic treatments."
        primaryCTA={{
          text: "Book Now",
          href: "https://book.vivispa.ca",
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
    </>
  );
}
