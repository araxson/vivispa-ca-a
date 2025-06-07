import { ServiceCard } from "./service-card";
import { Section, type SectionProps } from "@/components/ui";
import type { ServiceCardData } from "@/types/service";
import { SectionHeader } from "./section-header";

interface ServiceShowcaseProps extends Omit<SectionProps, "children"> {
  title: string;
  subtitle: string;
  services: ServiceCardData[];
  showLocations?: boolean;
  variant?: "default" | "alternative"; // Example variant
}

export function ServiceShowcase({
  title,
  subtitle,
  services,
  showLocations = true,
  variant = "default",
  ...sectionProps
}: ServiceShowcaseProps) {
  return (
    <Section {...sectionProps}>
      <SectionHeader title={title} subtitle={subtitle} />
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
      >
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            showLocations={showLocations}
          />
        ))}
      </div>
    </Section>
  );
}
