/**
 * Prop Mixins - Reusable Component Prop Patterns
 * 
 * This file provides standardized prop mixins that can be composed
 * into component interfaces to eliminate duplication and ensure consistency.
 */

import type { SpacingSize } from "@/lib/spacing";

// ============================================================================
// CORE PROP MIXINS
// ============================================================================

/**
 * Variant props with configurable options
 * Usage: extends VariantProps<"compact" | "featured">
 */
export interface VariantProps<T extends string = "default"> {
  variant?: T;
}

/**
 * Standard sizing props for consistent component sizing
 * Eliminates 20+ duplicate size prop definitions
 */
export interface SizingProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

/**
 * Spacing and layout props
 * Eliminates 30+ duplicate spacing/className patterns
 */
export interface SpacingProps {
  spacing?: SpacingSize;
  className?: string;
}

/**
 * Content header props (title, subtitle, description)
 * Eliminates 40+ duplicate header prop patterns
 */
export interface HeaderProps {
  title?: string;
  subtitle?: string;
  description?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * Loading and skeleton state props
 * Eliminates 15+ duplicate loading patterns
 */
export interface LoadingProps {
  loading?: boolean;
  loadingText?: string;
  skeleton?: boolean;
  skeletonCount?: number;
}

/**
 * Interactive behavior props
 * Eliminates 20+ duplicate interactive patterns
 */
export interface InteractiveProps {
  disabled?: boolean;
  readonly?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  onHover?: () => void;
}

/**
 * Common visibility toggle props
 * Eliminates 15+ duplicate show/hide patterns
 */
export interface VisibilityProps {
  showLocations?: boolean;
  showPricing?: boolean;
  showDescription?: boolean;
  showMetadata?: boolean;
  showActions?: boolean;
  showImage?: boolean;
  showFooter?: boolean;
  showHeader?: boolean;
}

/**
 * Navigation and linking props
 * Standardizes link behavior across components
 */
export interface NavigationProps {
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  external?: boolean;
  download?: boolean;
}

/**
 * Animation and transition props
 * Standardizes animation behavior
 */
export interface AnimationProps {
  animated?: boolean;
  animationDelay?: number;
  animationDuration?: number;
  animationVariant?: "fade" | "slide" | "scale" | "bounce";
}

/**
 * Image and media props
 * Standardizes image handling across components
 */
export interface MediaProps {
  src?: string;
  alt?: string;
  placeholder?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
  quality?: number;
  sizes?: string;
}

// ============================================================================
// COMPOSITE MIXINS - Common combinations
// ============================================================================

/**
 * Basic component props (variant + size + spacing)
 * Most commonly used combination
 */
export interface BasicComponentProps<T extends string = "default"> 
  extends VariantProps<T>, SizingProps, SpacingProps {}

/**
 * Content component props (basic + header + visibility)
 * For components that display content
 */
export interface ContentComponentProps<T extends string = "default">
  extends BasicComponentProps<T>, HeaderProps, VisibilityProps {}

/**
 * Interactive component props (content + interactive + navigation)
 * For clickable/interactive components
 */
export interface InteractiveComponentProps<T extends string = "default">
  extends ContentComponentProps<T>, InteractiveProps, NavigationProps {}

/**
 * Media component props (basic + media + loading)
 * For components that display images/media
 */
export interface MediaComponentProps<T extends string = "default">
  extends BasicComponentProps<T>, MediaProps, LoadingProps {}

/**
 * Full-featured component props (all mixins)
 * For complex components that need all features
 */
export interface FullComponentProps<T extends string = "default">
  extends InteractiveComponentProps<T>, MediaProps, LoadingProps, AnimationProps {}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Extract the variant type from a component props interface
 */
export type GetVariant<T> = T extends VariantProps<infer U> ? U : "default";

/**
 * Make variant prop required
 */
export type RequireVariant<T> = T extends VariantProps<infer U> 
  ? Omit<T, "variant"> & { variant: U }
  : T;

/**
 * Override variant options
 */
export type WithVariants<T, U extends string> = Omit<T, "variant"> & VariantProps<U>;

/**
 * Make specific props required while keeping others optional
 */
export type RequireProps<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Make specific props optional while keeping others required
 */
export type OptionalProps<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Standard variant validation
 */
export const validateVariant = <T extends string>(
  variant: T | undefined,
  allowed: readonly T[]
): T => {
  if (!variant) return allowed[0];
  return allowed.includes(variant) ? variant : allowed[0];
};

/**
 * Standard size validation
 */
export const validateSize = (
  size: SizingProps["size"],
  defaultSize: NonNullable<SizingProps["size"]> = "md"
): NonNullable<SizingProps["size"]> => {
  const allowedSizes: NonNullable<SizingProps["size"]>[] = ["xs", "sm", "md", "lg", "xl", "2xl"];
  return size && allowedSizes.includes(size) ? size : defaultSize;
};

/**
 * Props merger utility for combining prop objects
 */
export const mergeProps = <T extends Record<string, any>, U extends Record<string, any>>(
  props1: T,
  props2: U
): T & U => {
  return { ...props1, ...props2 };
};
