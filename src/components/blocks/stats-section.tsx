import {
  Container,
  Section,
  Card,
  CardContent,
  Badge,
  Separator,
  FadeIn,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { SectionHeader } from "./section-header";
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

  return (
    <Section
      spacing={spacing}
      background={variant === "highlighted" ? "card" : "muted"}
      className={cn(variant === "highlighted" && "bg-primary/5", className)}
    >
      {(title || subtitle) && (
        <SectionHeader title={title!} subtitle={subtitle} />
      )}

      <div
        className={cn(
          "grid gap-6",
          stats.length === 2 && "grid-cols-1 md:grid-cols-2",
          stats.length === 3 && "grid-cols-1 md:grid-cols-3",
          stats.length === 4 && "grid-cols-2 lg:grid-cols-4",
          stats.length > 4 && "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        )}
      >
        {stats.map((stat, index) => (
          <FadeIn key={stat.id || index}>
            <StatCard
              stat={stat}
              variant={variant}
              showSeparator={index < stats.length - 1 && variant === "minimal"}
            />
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

interface StatCardProps {
  stat: Stat;
  variant: "default" | "cards" | "minimal" | "highlighted";
  showSeparator?: boolean;
}

function StatCard({ stat, variant, showSeparator }: StatCardProps) {
  const Icon = stat.icon;

  if (variant === "minimal") {
    return (
      <div className="text-center space-y-2 relative">
        {Icon && (
          <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
          </div>
        )}

        <div className="text-3xl md:text-4xl font-bold text-foreground">
          {stat.value}
        </div>

        <div className="text-sm font-medium text-foreground">{stat.label}</div>

        {stat.description && (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {stat.description}
          </p>
        )}

        {stat.trend && stat.trendValue && (
          <Badge
            variant={
              stat.trend === "up"
                ? "default"
                : stat.trend === "down"
                  ? "destructive"
                  : "secondary"
            }
            className="mt-2"
          >
            <span aria-hidden="true">
              {stat.trend === "up"
                ? "↗"
                : stat.trend === "down"
                  ? "↘"
                  : "→"}{" "}
            </span>
            <span className="sr-only">
              {stat.trend === "up"
                ? "Trending up"
                : stat.trend === "down"
                  ? "Trending down"
                  : "Trending neutral"}
            </span>
            {stat.trendValue}
          </Badge>
        )}

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
      <Card className="text-center">
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-2 sm:space-y-3">
            {Icon && (
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
            )}

            <div className="text-3xl md:text-4xl font-bold text-foreground">
              {stat.value}
            </div>

            <div className="text-sm font-medium text-foreground">
              {stat.label}
            </div>

            {stat.description && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {stat.description}
              </p>
            )}

            {stat.trend && stat.trendValue && (
              <Badge
                variant={
                  stat.trend === "up"
                    ? "default"
                    : stat.trend === "down"
                      ? "destructive"
                      : "secondary"
                }
                className="mt-2"
              >
                <span aria-hidden="true">
                  {stat.trend === "up"
                    ? "↗"
                    : stat.trend === "down"
                      ? "↘"
                      : "→"}{" "}
                </span>
                <span className="sr-only">
                  {stat.trend === "up"
                    ? "Trending up"
                    : stat.trend === "down"
                      ? "Trending down"
                      : "Trending neutral"}
                </span>
                {stat.trendValue}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <div className="text-center space-y-2 sm:space-y-3">
      {Icon && (
        <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
          <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
        </div>
      )}

      <div className="text-3xl md:text-4xl font-bold text-foreground">
        {stat.value}
      </div>

      <div className="text-sm font-medium text-foreground">{stat.label}</div>

      {stat.description && (
        <p className="text-xs text-muted-foreground leading-relaxed">
          {stat.description}
        </p>
      )}

      {stat.trend && stat.trendValue && (
        <Badge
          variant={
            stat.trend === "up"
              ? "default"
              : stat.trend === "down"
                ? "destructive"
                : "secondary"
          }
          className="mt-2"
        >
          <span aria-hidden="true">
            {stat.trend === "up"
              ? "↗"
              : stat.trend === "down"
                ? "↘"
                : "→"}{" "}
          </span>
          <span className="sr-only">
            {stat.trend === "up"
              ? "Trending up"
              : stat.trend === "down"
                ? "Trending down"
                : "Trending neutral"}
          </span>
          {stat.trendValue}
        </Badge>
      )}
    </div>
  );
}
