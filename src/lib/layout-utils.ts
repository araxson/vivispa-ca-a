import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Common layout patterns found throughout the application
 * Replaces hardcoded grid and flex patterns with reusable utilities
 */
export const layoutPatterns = {
  // Grid patterns
  serviceGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8",
  benefitGrid: "grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3", 
  statGrid: "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  offerGrid: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",
  pricingGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  procedureGrid: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
  resultsGrid: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
  
  // Flex patterns  
  responsiveFlex: "flex flex-col sm:flex-row gap-4",
  responsiveFlexReverse: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
  centeredButtons: "flex flex-col sm:flex-row gap-4 justify-center",
  centeredContent: "flex flex-col items-center text-center space-y-4",
  footerFlex: "flex flex-col items-center justify-between gap-4 text-sm sm:flex-row",
  heroButtons: "flex flex-col justify-center gap-3 sm:flex-row sm:gap-4",
  
  // Form patterns
  formGrid: "grid grid-cols-1 gap-4",
  twoColumnForm: "grid grid-cols-1 md:grid-cols-2 gap-6",
  newsletterForm: "flex flex-col sm:flex-row gap-2 max-w-md mx-auto",
  
  // Special layouts
  splitSection: "lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center",
  cardHeader: "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
} as const;

/**
 * Get layout classes with optional override
 */
export function getLayoutClasses(
  pattern: keyof typeof layoutPatterns,
  override?: string
): string {
  return cn(layoutPatterns[pattern], override);
}

/**
 * Responsive grid variant for different breakpoints and column counts
 */
export const responsiveGridVariants = cva("grid", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
      auto: "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
    },
    gap: {
      none: "gap-0",
      xs: "gap-2",
      sm: "gap-4", 
      md: "gap-6",
      lg: "gap-8",
      xl: "gap-12",
    },
    alignment: {
      start: "items-start",
      center: "items-center", 
      end: "items-end",
      stretch: "items-stretch",
    },
  },
  defaultVariants: {
    columns: 3,
    gap: "md",
    alignment: "stretch",
  },
});

export type ResponsiveGridVariants = VariantProps<typeof responsiveGridVariants>;

/**
 * Responsive flex variant for common flex patterns
 */
export const responsiveFlexVariants = cva("flex", {
  variants: {
    direction: {
      column: "flex-col",
      "column-reverse": "flex-col-reverse",
      responsiveRow: "flex-col sm:flex-row",
      responsiveRowReverse: "flex-col-reverse sm:flex-row",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end", 
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
      responsiveEnd: "sm:justify-end",
    },
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2", 
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
      responsive: "gap-2 sm:gap-4",
    },
    wrap: {
      nowrap: "flex-nowrap",
      wrap: "flex-wrap",
      reverse: "flex-wrap-reverse",
    },
  },
  defaultVariants: {
    direction: "responsiveRow",
    align: "center",
    justify: "start",
    gap: "md",
    wrap: "nowrap",
  },
});

export type ResponsiveFlexVariants = VariantProps<typeof responsiveFlexVariants>;

/**
 * Content layout variants for common content patterns
 */
export const contentLayoutVariants = cva("", {
  variants: {
    layout: {
      default: "",
      centered: "flex flex-col items-center text-center",
      split: "lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center",
      stacked: "space-y-6",
      inline: "flex items-center space-x-4",
    },
    spacing: {
      tight: "space-y-2",
      normal: "space-y-4",
      loose: "space-y-6",
      xl: "space-y-8",
    },
    maxWidth: {
      none: "",
      sm: "max-w-sm mx-auto",
      md: "max-w-md mx-auto", 
      lg: "max-w-lg mx-auto",
      xl: "max-w-xl mx-auto",
      "2xl": "max-w-2xl mx-auto",
      "4xl": "max-w-4xl mx-auto",
      prose: "max-w-prose mx-auto",
    },
  },
  defaultVariants: {
    layout: "default",
    spacing: "normal",
    maxWidth: "none",
  },
});

export type ContentLayoutVariants = VariantProps<typeof contentLayoutVariants>;

/**
 * Helper function to build responsive grid classes
 */
export function buildResponsiveGrid(config: {
  columns?: ResponsiveGridVariants["columns"];
  gap?: ResponsiveGridVariants["gap"];
  alignment?: ResponsiveGridVariants["alignment"];
  className?: string;
}): string {
  return cn(
    responsiveGridVariants({
      columns: config.columns,
      gap: config.gap,
      alignment: config.alignment,
    }),
    config.className
  );
}

/**
 * Helper function to build responsive flex classes
 */
export function buildResponsiveFlex(config: {
  direction?: ResponsiveFlexVariants["direction"];
  align?: ResponsiveFlexVariants["align"];
  justify?: ResponsiveFlexVariants["justify"];
  gap?: ResponsiveFlexVariants["gap"];
  wrap?: ResponsiveFlexVariants["wrap"];
  className?: string;
}): string {
  return cn(
    responsiveFlexVariants({
      direction: config.direction,
      align: config.align,
      justify: config.justify,
      gap: config.gap,
      wrap: config.wrap,
    }),
    config.className
  );
}

/**
 * Helper function to build content layout classes
 */
export function buildContentLayout(config: {
  layout?: ContentLayoutVariants["layout"];
  spacing?: ContentLayoutVariants["spacing"];
  maxWidth?: ContentLayoutVariants["maxWidth"];
  className?: string;
}): string {
  return cn(
    contentLayoutVariants({
      layout: config.layout,
      spacing: config.spacing,
      maxWidth: config.maxWidth,
    }),
    config.className
  );
}

/**
 * Quick access functions for common patterns
 */
export const quickLayouts = {
  serviceGrid: () => getLayoutClasses("serviceGrid"),
  benefitGrid: () => getLayoutClasses("benefitGrid"),
  statGrid: () => getLayoutClasses("statGrid"),
  responsiveFlex: () => getLayoutClasses("responsiveFlex"),
  centeredButtons: () => getLayoutClasses("centeredButtons"),
  centeredContent: () => getLayoutClasses("centeredContent"),
  twoColumnForm: () => getLayoutClasses("twoColumnForm"),
  splitSection: () => getLayoutClasses("splitSection"),
} as const;

/**
 * Dynamic grid builder for item-count based layouts
 */
export function buildItemCountGrid(
  itemCount: number,
  config?: {
    maxColumns?: number;
    gap?: ResponsiveGridVariants["gap"];
    className?: string;
  }
): string {
  const { maxColumns = 4, gap = "md", className } = config || {};
  
  let columns: ResponsiveGridVariants["columns"] = 1;
  
  if (itemCount === 1) columns = 1;
  else if (itemCount === 2) columns = 2;
  else if (itemCount === 3) columns = 3;
  else if (itemCount <= 4) columns = 4;
  else if (itemCount <= 6) columns = 6;
  else columns = "auto";
  
  // Respect maxColumns limit
  if (typeof columns === "number" && columns > maxColumns) {
    columns = maxColumns as ResponsiveGridVariants["columns"];
  }
  
  return buildResponsiveGrid({ columns, gap, className });
}

/**
 * Preset configurations for common use cases
 */
export const layoutPresets = {
  // Service pages
  serviceBenefits: () => buildResponsiveGrid({ columns: 3, gap: "lg" }),
  serviceFeatures: () => buildResponsiveGrid({ columns: 2, gap: "md" }),
  serviceProcedure: () => buildResponsiveGrid({ columns: 3, gap: "md" }),
  
  // Pricing and offers
  pricingCards: () => buildResponsiveGrid({ columns: 3, gap: "lg" }),
  offerCards: () => buildResponsiveGrid({ columns: 3, gap: "md" }),
  
  // Content sections
  testimonials: () => buildResponsiveGrid({ columns: 3, gap: "lg" }),
  stats: () => buildResponsiveGrid({ columns: 4, gap: "md" }),
  faqs: () => buildResponsiveGrid({ columns: 2, gap: "md" }),
  
  // Form layouts
  contactForm: () => buildResponsiveGrid({ columns: 2, gap: "md" }),
  filterForm: () => buildResponsiveFlex({ 
    direction: "responsiveRow", 
    align: "center", 
    gap: "md",
    wrap: "wrap" 
  }),
  
  // Button groups
  ctaButtons: () => buildResponsiveFlex({
    direction: "responsiveRow",
    justify: "center",
    gap: "md"
  }),
  
  // Navigation and footer
  footerColumns: () => buildResponsiveGrid({ columns: 4, gap: "lg" }),
  navigationMega: () => buildResponsiveGrid({ columns: 3, gap: "xl" }),
} as const;
