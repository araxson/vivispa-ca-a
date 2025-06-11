import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";
import { type CSSProperties } from "react";

/**
 * Enhanced className utility with better performance
 * Consolidates clsx and tailwind-merge for consistent class handling
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Strongly typed theme tokens for consistent access
 */
export type ThemeToken = 
  | "background" 
  | "foreground" 
  | "primary" 
  | "primary-foreground"
  | "secondary"
  | "secondary-foreground"
  | "muted"
  | "muted-foreground"
  | "accent"
  | "accent-foreground"
  | "destructive"
  | "destructive-foreground"
  | "card"
  | "card-foreground"
  | "border"
  | "input"
  | "ring";

/**
 * Common variant patterns for consistent component styling
 */
export const commonVariants = {
  size: {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  },
  spacing: {
    none: "",
    xs: "p-2",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
    xl: "p-8",
  },
  gap: {
    none: "gap-0",
    xs: "gap-2",
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  },
  rounded: {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  },
} as const;

/**
 * TypeScript utility types for common variants
 */
export type Size = keyof typeof commonVariants.size;
export type Spacing = keyof typeof commonVariants.spacing;
export type Gap = keyof typeof commonVariants.gap;
export type Rounded = keyof typeof commonVariants.rounded;

/**
 * React 19 optimized style generator for dynamic properties
 */
export function getStyleObject(styles: Record<string, string | number>): CSSProperties {
  return styles as CSSProperties;
}

/**
 * Standard focus ring styles for accessibility
 */
export const focusRing =
  "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none";

// Import spacing utilities from dedicated spacing module
export {
  containerVariants,
  sectionVariants,
  gridVariants,
  type SpacingSize,
  type ContainerVariants,
  type SectionVariants,
  type GridVariants,
  getSectionClasses,
  getContainerClasses,
  getGridClasses,
} from "./spacing";

// Export new utility modules
export * from "./service-categories";
export * from "./loading-states";
