import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

/**
 * Standardized spacing system for consistent layouts
 */
export const spacing = {
  // Section spacing
  section: {
    none: "",
    xs: "py-6 sm:py-8",
    sm: "py-8 sm:py-12",
    md: "py-12 sm:py-16",
    lg: "py-16 sm:py-20",
    xl: "py-20 sm:py-24",
    "2xl": "py-24 sm:py-32",
  },

  // Container spacing
  container: {
    none: "",
    xs: "px-4",
    sm: "px-4 sm:px-6",
    md: "px-4 sm:px-6 lg:px-8",
    lg: "px-4 sm:px-6 lg:px-8",
    xl: "px-4 sm:px-6 lg:px-8",
    "2xl": "px-4 sm:px-6 lg:px-8",
  },

  // Gap spacing
  gap: {
    none: "",
    xs: "gap-2 sm:gap-3",
    sm: "gap-3 sm:gap-4",
    md: "gap-4 sm:gap-6",
    lg: "gap-6 sm:gap-8",
    xl: "gap-8 sm:gap-12",
    "2xl": "gap-12 sm:gap-16",
  },

  // Margin spacing
  margin: {
    xs: "mb-3 sm:mb-4",
    sm: "mb-4 sm:mb-6",
    md: "mb-6 sm:mb-8",
    lg: "mb-8 sm:mb-12",
    xl: "mb-12 sm:mb-16",
    "2xl": "mb-16 sm:mb-20",
  },
} as const;

export type SpacingSize = keyof typeof spacing.section;

/**
 * Container variant definitions using CVA
 */
export const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      sm: "max-w-sm",
      md: "max-w-4xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-full",
    },
    padding: {
      none: "",
      xs: "px-3 sm:px-4",
      sm: "px-4 sm:px-6",
      md: "px-4 sm:px-6 lg:px-8",
      lg: "px-6 sm:px-8 lg:px-12",
    },
  },
  defaultVariants: {
    size: "xl",
    padding: "md",
  },
});

/**
 * Section variant definitions using CVA
 */
export const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      none: "",
      xs: "py-6 sm:py-8",
      sm: "py-8 sm:py-12",
      md: "py-12 sm:py-16",
      lg: "py-16 sm:py-20",
      xl: "py-20 sm:py-24 lg:py-32",
    },
    background: {
      default: "bg-background",
      muted: "bg-muted/30",
      card: "bg-card",
      primary: "bg-primary text-primary-foreground",
      transparent: "",
    },
  },
  defaultVariants: {
    spacing: "md",
    background: "default",
  },
});

/**
 * Grid variant definitions using CVA
 */
export const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
      12: "grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12",
      auto: "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
    },
    gap: {
      none: "gap-0",
      xs: "gap-3",
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
      xl: "gap-12",
    },
  },
  defaultVariants: {
    cols: "auto",
    gap: "md",
  },
});

/**
 * Get section wrapper classes
 */
export function getSectionClasses(
  size: SpacingSize = "lg",
  background?: "default" | "muted" | "card" | "primary" | "transparent",
  className?: string,
) {
  const backgroundClasses = {
    default: "bg-background",
    muted: "bg-muted/30",
    card: "bg-card",
    primary: "bg-primary text-primary-foreground",
    transparent: "",
  };

  return cn(
    "w-full",
    spacing.section[size],
    background ? backgroundClasses[background] : "",
    className,
  );
}

/**
 * Get container classes with max-width constraint
 */
export function getContainerClasses(
  maxWidth:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "full" = "7xl",
  paddingSize: SpacingSize = "md",
  className?: string,
) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  };

  return cn(
    "mx-auto w-full",
    maxWidthClasses[maxWidth],
    spacing.container[paddingSize],
    className,
  );
}

/**
 * Get responsive grid classes
 */
export function getGridClasses(
  cols: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  },
  gap: SpacingSize = "md",
) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };

  const classes = ["grid", spacing.gap[gap]];

  if (cols.default)
    classes.push(gridCols[cols.default as keyof typeof gridCols]);
  if (cols.sm) classes.push(`sm:${gridCols[cols.sm as keyof typeof gridCols]}`);
  if (cols.md) classes.push(`md:${gridCols[cols.md as keyof typeof gridCols]}`);
  if (cols.lg) classes.push(`lg:${gridCols[cols.lg as keyof typeof gridCols]}`);
  if (cols.xl) classes.push(`xl:${gridCols[cols.xl as keyof typeof gridCols]}`);

  return cn(classes);
}

/**
 * Type exports for component props
 */
export type ContainerVariants = VariantProps<typeof containerVariants>;
export type SectionVariants = VariantProps<typeof sectionVariants>;
export type GridVariants = VariantProps<typeof gridVariants>;
