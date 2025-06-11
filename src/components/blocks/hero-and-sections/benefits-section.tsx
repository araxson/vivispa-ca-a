import {
  Container,
  Section,
  Card,
  CardContent,
  StandardSection,
  ResponsiveGrid,
} from "@/components/ui";
import { IconCircle } from "@/components/ui/icon-circle";
import { UniversalCard, type BenefitCardData } from "@/components/ui/universal-card";
import { cn } from "@/lib/utils";
import * as icons from "lucide-react";
import { SectionHeader } from "./section-header";
import type { SpacingSize } from "@/lib/spacing";
import type { ContentComponentProps } from "@/types/prop-mixins";

interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface BenefitsSectionProps extends ContentComponentProps<"default" | "cards" | "minimal"> {
  benefits: BenefitItem[];
}

const getIconComponent = (name?: string): icons.LucideIcon => {
  const Icon = icons[name as keyof typeof icons] as icons.LucideIcon;
  return Icon || icons.Zap;
};

export function BenefitsSection(props: BenefitsSectionProps) {
  const {
    benefits,
    title = "Why Choose Us",
    subtitle = "Experience the difference",
    variant = "default",
    className,
    spacing = "lg",
  } = props;

  if (!benefits || benefits.length === 0) {
    return null;
  }

  // Modern approach using StandardSection (recommended)
  return (
    <StandardSection
      title={title}
      subtitle={subtitle}
      spacing={spacing}
      background="muted"
      className={className}
    >
      <ResponsiveGrid preset="benefits">
        {benefits.map((benefit) => (
          <BenefitCard key={benefit.id} benefit={benefit} variant={variant} />
        ))}
      </ResponsiveGrid>
    </StandardSection>
  );
}

interface BenefitCardProps {
  benefit: BenefitItem;
  variant: "default" | "cards" | "minimal";
}

// Transform benefit data to UniversalCard format
function transformBenefitData(benefit: BenefitItem): BenefitCardData {
  return {
    id: benefit.id,
    title: benefit.title,
    description: benefit.description,
    icon: benefit.icon,
  };
}

function BenefitCard({ benefit, variant }: BenefitCardProps) {
  return (
    <UniversalCard
      data={transformBenefitData(benefit)}
      variant="benefit"
      layout={variant === "minimal" ? "minimal" : variant === "cards" ? "compact" : "default"}
      features={{
        showImage: false,
        showBadges: false,
        showLocations: false,
        showPricing: false,
        showBooking: false,
        showAnimation: true,
      }}
      styling={{
        contentAlign: variant === "minimal" ? "left" : "center",
      }}
    />
  );
}
