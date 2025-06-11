import { ServiceCard } from "@/components/blocks/cards-and-displays/service-card";
import { Section, type SectionProps } from "@/components/ui";
import { ResponsiveGrid } from "@/components/ui/responsive-grid";
import type { ServiceCardData } from "@/types/service";
import { SectionHeader } from "@/components/blocks";
import type { RequireProps, VisibilityProps } from "@/types/prop-mixins";

interface ServiceShowcaseProps
  extends RequireProps<Omit<SectionProps, "children">, "title" | "subtitle">,
    VisibilityProps {
  services: ServiceCardData[];
  variant?: "default" | "alternative";
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
      <ResponsiveGrid preset="services" showAnimation={true}>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            showLocations={showLocations}
          />
        ))}
      </ResponsiveGrid>
    </Section>
  );
}
