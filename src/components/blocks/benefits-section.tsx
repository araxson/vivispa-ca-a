import { Container, Section, Card, CardContent } from "@/components/ui";
import { cn } from "@/lib/utils";
import * as icons from "lucide-react";
import { SectionHeader } from "./section-header";

interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface BenefitsSectionProps {
  benefits: BenefitItem[];
  title?: string;
  subtitle?: string;
  variant?: "default" | "cards" | "minimal";
  className?: string;
}

const getIconComponent = (name?: string): icons.LucideIcon => {
  const Icon = icons[name as keyof typeof icons] as icons.LucideIcon;
  return Icon || icons.Zap;
};

export function BenefitsSection({
  benefits,
  title = "Why Choose Us",
  subtitle = "Experience the difference",
  variant = "default",
  className,
}: BenefitsSectionProps) {
  if (!benefits || benefits.length === 0) {
    return null;
  }

  return (
    <Section spacing="lg" background="muted" className={className}>
      <SectionHeader title={title} subtitle={subtitle} />
      <div
        className={cn(
          "grid gap-6 sm:gap-8",
          benefits.length === 2 && "md:grid-cols-2",
          benefits.length === 3 && "md:grid-cols-3",
          benefits.length === 4 && "md:grid-cols-2 lg:grid-cols-4",
          benefits.length >= 5 &&
            benefits.length <= 6 &&
            "md:grid-cols-2 lg:grid-cols-3",
          benefits.length > 6 && "md:grid-cols-2 lg:grid-cols-4",
        )}
      >
        {benefits.map((benefit) => (
          <BenefitCard key={benefit.id} benefit={benefit} variant={variant} />
        ))}
      </div>
    </Section>
  );
}

interface BenefitCardProps {
  benefit: BenefitItem;
  variant: "default" | "cards" | "minimal";
}

function BenefitCard({ benefit, variant }: BenefitCardProps) {
  const IconComponent = getIconComponent(benefit.icon);

  switch (variant) {
    case "cards":
      return (
        <Card className="h-full">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <IconComponent className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          </CardContent>
        </Card>
      );
    case "minimal":
      return (
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <IconComponent className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground mb-2">
              {benefit.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {benefit.description}
            </p>
          </div>
        </div>
      );
    // fall-through
    case "default":
    default:
      return (
        <div className="bg-card border rounded-xl p-6 h-full">
          <div className="flex flex-col space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <IconComponent className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {benefit.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {benefit.description}
            </p>
          </div>
        </div>
      );
  }
}
