import { 
  PageHeaderSkeleton, 
  ServiceCardSkeleton, 
  HeroSkeleton, 
  SectionSkeleton,
  ServicesPageLoading,
  ServiceDetailPageLoading 
} from "@/components/ui/loading-skeletons";
import { ResponsiveGrid } from "@/components/ui/responsive-grid";
import { Container, Section, Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { GridVariants } from "@/lib/spacing";

interface LoadingStateConfig {
  type: "page" | "section" | "grid" | "custom";
  title?: boolean;
  description?: boolean;
  items?: number;
  columns?: GridVariants["cols"];
  gap?: GridVariants["gap"];
  showHero?: boolean;
  sections?: Array<{
    title: boolean;
    description: boolean;
    items: number;
    columns: GridVariants["cols"];
  }>;
}

/**
 * Unified loading state manager
 * Provides consistent loading patterns across the application
 */
export class LoadingStateManager {
  /**
   * Generate a consistent loading state for different component types
   */
  static generate(config: LoadingStateConfig) {
    switch (config.type) {
      case "page":
        return this.generatePageLoading(config);
      case "section":
        return this.generateSectionLoading(config);
      case "grid":
        return this.generateGridLoading(config);
      default:
        return this.generateCustomLoading(config);
    }
  }

  private static generatePageLoading(config: LoadingStateConfig) {
    if (config.sections) {
      return (
        <div className="min-h-screen">
          {config.showHero && <HeroSkeleton />}
          <Container className="py-16 space-y-16">
            {config.sections.map((section, index) => (
              <SectionSkeleton key={index} {...section} />
            ))}
          </Container>
        </div>
      );
    }

    return (
      <Container className="py-8">
        <PageHeaderSkeleton />
        <SectionSkeleton 
          items={config.items || 6} 
          columns={config.columns || 3} 
          gap={config.gap || "md"} 
        />
      </Container>
    );
  }

  private static generateSectionLoading(config: LoadingStateConfig) {
    return (
      <SectionSkeleton
        title={config.title}
        description={config.description}
        items={config.items || 3}
        columns={config.columns || 3}
        gap={config.gap || "md"}
      />
    );
  }

  private static generateGridLoading(config: LoadingStateConfig) {
    const gridClasses = cn(
      "grid",
      config.columns === 1 && "grid-cols-1",
      config.columns === 2 && "grid-cols-1 md:grid-cols-2",
      config.columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      config.columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      config.gap === "sm" && "gap-3",
      config.gap === "md" && "gap-4",
      config.gap === "lg" && "gap-6",
      config.gap === "xl" && "gap-8",
    );

    return (
      <div className={gridClasses}>
        {Array.from({ length: config.items || 6 }).map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  private static generateCustomLoading(config: LoadingStateConfig) {
    return (
      <div className="space-y-8">
        {config.title && (
          <div className="text-center space-y-4">
            <Skeleton className="h-8 w-48 mx-auto" />
            {config.description && <Skeleton className="h-6 w-80 mx-auto" />}
          </div>
        )}
        {config.items && config.items > 0 && this.generateGridLoading(config)}
      </div>
    );
  }
}

/**
 * Common loading configurations for easy reuse
 */
export const LoadingConfigs = {
  servicesPage: {
    type: "page" as const,
    title: true,
    description: true,
    items: 6,
    columns: 3 as const,
    gap: "md" as const,
  },
  serviceDetailPage: {
    type: "page" as const,
    showHero: true,
    sections: [
      { title: true, description: true, items: 1, columns: 2 as const },
      { title: true, description: true, items: 6, columns: 3 as const },
      { title: true, description: true, items: 1, columns: 2 as const },
      { title: true, description: true, items: 8, columns: 4 as const },
    ],
  },
  offersPage: {
    type: "page" as const,
    title: true,
    description: false,
    items: 6,
    columns: 3 as const,
    gap: "lg" as const,
  },
  pricingPage: {
    type: "section" as const,
    title: true,
    description: true,
    items: 4,
    columns: 2 as const,
    gap: "md" as const,
  },
} as const;

/**
 * Quick loading component generator
 */
export function QuickLoading({ 
  configType, 
  ...overrides 
}: { 
  configType: keyof typeof LoadingConfigs 
} & Partial<LoadingStateConfig>) {
  const config = { ...LoadingConfigs[configType], ...overrides };
  return LoadingStateManager.generate(config);
}
