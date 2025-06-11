import {
  Container,
  UniversalSection,
  Card,
  CardContent,
  Badge,
  Separator,
  Animated,
} from "@/components/ui";
import { UniversalCard, type StatCardData } from "@/components/ui/universal-card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { TrendIcons } from "@/lib/icons";
import type { SpacingSize } from "@/lib/spacing";

interface Stat {
  id?: string;
  value: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

interface StatsSectionProps {
  stats: Stat[];
  title?: string;
  subtitle?: string;
  variant?: "default" | "cards" | "minimal" | "highlighted";
  className?: string;
  spacing?: SpacingSize;
}

export function StatsSection({
  stats,
  title,
  subtitle,
  variant = "default",
  className,
  spacing = "lg",
}: StatsSectionProps) {
  if (!stats || stats.length === 0) {
    return null;
  }

  // Calculate columns based on number of stats
  const columns = stats.length === 2 ? 2 :
                 stats.length === 3 ? 3 :
                 stats.length === 4 ? 4 :
                 stats.length >= 5 && stats.length <= 6 ? 3 : 4;

  const sectionProps: any = {
    items: stats,
    renderItem: (stat: Stat, index: number) => (
      <Animated key={stat.id || index} variant="fade" timing="normal" customDelay={index * 100}>
        <StatCard
          stat={stat}
          variant={variant}
          showSeparator={index < stats.length - 1 && variant === "minimal"}
        />
      </Animated>
    ),
    columns,
    gap: "lg" as const,
    spacing,
    background: variant === "highlighted" ? "card" as const : "muted" as const,
    className: cn(variant === "highlighted" && "bg-primary/5", className),
    showHeader: !!(title || subtitle),
  };

  if (title) sectionProps.title = title;
  if (subtitle) sectionProps.subtitle = subtitle;

  return <UniversalSection {...sectionProps} />;
}

interface StatCardProps {
  stat: Stat;
  variant: "default" | "cards" | "minimal" | "highlighted";
  showSeparator?: boolean;
}

// Transform stat data to UniversalCard format  
function transformStatData(stat: Stat): StatCardData {
  const baseData = {
    id: stat.id || '',
    title: stat.label,
    description: stat.description || '',
    value: stat.value,
    label: stat.label,
    icon: stat.icon?.name || '', // Convert LucideIcon to string name
  };

  // Only add optional properties if they exist
  const optionalFields: Partial<StatCardData> = {};
  
  if (stat.trend) {
    optionalFields.trend = stat.trend;
  }
  
  if (stat.trendValue) {
    optionalFields.trendValue = stat.trendValue;
  }

  return { ...baseData, ...optionalFields };
}

function StatCard({ stat, variant, showSeparator }: StatCardProps) {
  if (variant === "minimal") {
    return (
      <div className="relative">
        <UniversalCard
          data={transformStatData(stat)}
          variant="stat"
          layout="minimal"
          features={{
            showImage: false,
            showBadges: false,
            showLocations: false,
            showPricing: false,
            showBooking: false,
            showAnimation: false,
          }}
        />
        {showSeparator && (
          <Separator
            orientation="vertical"
            className="absolute right-0 top-1/2 -translate-y-1/2 h-16 hidden lg:block"
          />
        )}
      </div>
    );
  }

  if (variant === "cards") {
    return (
      <UniversalCard
        data={transformStatData(stat)}
        variant="stat"
        layout="compact"
        features={{
          showImage: false,
          showBadges: false,
          showLocations: false,
          showPricing: false,
          showBooking: false,
          showAnimation: false,
        }}
      />
    );
  }

  // Default variant
  return (
    <UniversalCard
      data={transformStatData(stat)}
      variant="stat"
      layout="default"
      features={{
        showImage: false,
        showBadges: false,
        showLocations: false,
        showPricing: false,
        showBooking: false,
        showAnimation: false,
      }}
    />
  );
}
