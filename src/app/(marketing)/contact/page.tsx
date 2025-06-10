import { Metadata } from "next";
import { locations } from "@/data/contact/contact";
import { ContactInfoTable } from "@/components/blocks/contact-info-table";
import { HoursTable } from "@/components/blocks/hours-table";
import { LocationDetailsCard } from "@/components/blocks/location-details-card";
import { FadeIn } from "@/components/ui/fade-in";
import { MarketingPageLayout } from "@/components/layout/marketing-page-layout";

export const metadata: Metadata = {
  title: "Contact Us | Vivi Aesthetics & Spa",
  description:
    "Contact Vivi Aesthetics & Spa in Calgary. Visit us at our Downtown or Edmonton Trail locations.",
};

export default function ContactPage() {
  return (
    <MarketingPageLayout
      title="Contact Us"
      subtitle="We'd love to hear from you! Visit one of our locations or contact us using the information below."
    >
      <div className="space-y-12">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-8">
            <ContactInfoTable />
            <HoursTable />
          </div>
        </FadeIn>

        <FadeIn>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Location Details</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {locations.map((location) => (
                <FadeIn key={location.id}>
                  <LocationDetailsCard location={location} />
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </MarketingPageLayout>
  );
}
