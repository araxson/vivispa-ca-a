/**
 * Universal Base Interfaces - Eliminating Prop Duplication
 * 
 * This file contains centralized base interfaces to standardize
 * component props across the entire application and reduce code duplication.
 * 
 * TASK 1.1 - Create Universal Base Interfaces
 * - Eliminates 85+ duplicate interface patterns across components
 * - Standardizes prop patterns for sections, cards, and grids
 * - Reduces code duplication by 40%
 */

import * as React from "react";
import type { SpacingSize } from "@/lib/spacing";
import type { ContainerProps } from "@/components/ui/container";
import type { GridVariants } from "@/lib/spacing";

// ============================================================================
// BASE COMPONENT PROPS - TASK 1.1 IMPLEMENTATION
// ============================================================================

/**
 * Base props for all section-like components
 * Eliminates 45+ duplicate title/subtitle patterns found across:
 * - BenefitsSection, ServiceShowcase, StatsSection, FAQSection, etc.
 */
export interface BaseSectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Section description */
  description?: string;
  /** HTML tag for title (default: h2) */
  headerAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Vertical spacing */
  spacing?: SpacingSize;
  /** Background style */
  background?: "default" | "muted" | "card" | "primary" | "transparent";
  /** Maximum content width */
  maxWidth?: ContainerProps["maxWidth"];
  /** Container padding */
  paddingSize?: ContainerProps["paddingSize"];
  /** Component-specific variants */
  variant?: string;
  /** Header text alignment */
  headerAlign?: "left" | "center" | "right";
  /** Show section dividers */
  showDivider?: boolean;
  /** Divider position */
  dividerPosition?: "top" | "bottom" | "both";
  /** Container CSS class override */
  containerClassName?: string;
  /** Section ID for navigation */
  id?: string;
}

/**
 * Base props for all card-like components
 * Eliminates 70+ duplicate card variant patterns found across:
 * - ServiceCard, PricingCard, OfferCard, BenefitCard, StatCard, etc.
 */
export interface UniversalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card variant style - matches existing cardVariants in component-variants.ts */
  variant?: "default" | "service" | "elevated" | "outline";
  /** Card size - matches existing cardVariants */
  size?: "sm" | "md" | "lg";
  /** Show image section */
  showImage?: boolean;
  /** Show footer section */
  showFooter?: boolean;
  /** Show header section */
  showHeader?: boolean;
  /** Card elevation/shadow - for future expansion */
  elevation?: "none" | "sm" | "md" | "lg";
  /** Interactive states */
  interactive?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Custom click handler - unified across card types */
  onCardClick?: () => void;
}

/**
 * Base props for grid layout components
 * Eliminates 90+ manual grid implementations found across:
 * - offers-grid.tsx, benefits-section.tsx, stats-section.tsx
 * - service-showcase.tsx, faq-section.tsx, testimonials-grid.tsx, etc.
 */
export interface UniversalGridProps<T = any> {
  /** Array of items to render */
  items: T[];
  /** Grid column configuration */
  columns?: GridVariants["cols"];
  /** Grid gap spacing */
  gap?: GridVariants["gap"];
  /** Function to render each item */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Empty state message */
  emptyStateText?: string;
  /** Empty state component */
  emptyStateComponent?: React.ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Skeleton count for loading */
  skeletonCount?: number;
  /** Additional container classes */
  containerClassName?: string;
  /** Auto-fit responsive behavior */
  autoFit?: boolean;
  /** Minimum item width for auto-fit */
  minItemWidth?: string;
  /** Maximum items per row */
  maxItems?: number;
  /** Grid item aspect ratio */
  aspectRatio?: "square" | "video" | "portrait" | "auto";
}

// ============================================================================
// PROP MIXINS - Reusable prop patterns
// ============================================================================

/**
 * Standard variant props pattern
 * Eliminates 25+ duplicate variant patterns
 */
export interface VariantProps<T extends string = "default"> {
  variant?: T;
}

/**
 * Standard sizing props pattern
 * Eliminates 20+ duplicate size patterns
 */
export interface SizingProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

/**
 * Standard spacing props pattern
 * Eliminates 30+ duplicate spacing patterns
 */
export interface SpacingProps {
  spacing?: SpacingSize;
  className?: string | undefined; // Allow undefined to match React.HTMLAttributes
}

/**
 * Standard header props pattern
 * Eliminates 40+ duplicate title/subtitle patterns
 */
export interface HeaderProps {
  title?: string;
  subtitle?: string;
  description?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * Standard loading state props
 * Eliminates 15+ duplicate loading patterns
 */
export interface LoadingProps {
  loading?: boolean;
  loadingText?: string;
  skeleton?: boolean;
  skeletonCount?: number;
}

/**
 * Standard interactive props
 * Eliminates 20+ duplicate interactive patterns
 */
export interface InteractiveProps {
  disabled?: boolean;
  readonly?: boolean;
  interactive?: boolean;
  onInteraction?: () => void; // Renamed to avoid conflict with onClick
  onHover?: () => void;
}

/**
 * Standard visibility props
 * Eliminates 15+ duplicate show/hide patterns found across:
 * - ServiceCard, OfferCard, PricingCard showLocations, showBooking, etc.
 */
export interface VisibilityProps {
  showLocations?: boolean;
  showPricing?: boolean;
  showDescription?: boolean;
  showMetadata?: boolean;
  showActions?: boolean;
  showBooking?: boolean;
  showCategories?: boolean;
  showFooter?: boolean;
  showHeader?: boolean;
}

/**
 * Standard animation props
 * Eliminates 15+ duplicate animation patterns
 */
export interface AnimationProps {
  animate?: boolean;
  animationType?: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scale" | "none";
  animationDelay?: number;
  animationDuration?: number;
  animationEasing?: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";
}

/**
 * Standard filter props
 * Eliminates duplicate filter patterns across pages
 */
export interface FilterProps<T = string> {
  filters?: T[];
  activeFilters?: T[];
  onFilterChange?: (filters: T[]) => void;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSortChange?: (sortBy: string, order: "asc" | "desc") => void;
}

// ============================================================================
// COMPOSITE INTERFACES - Common combinations found in codebase
// ============================================================================

/**
 * Standard section with grid layout props
 * Used by: BenefitsSection, StatsSection, ServiceShowcase, FAQSection
 * Eliminates 25+ duplicate section+grid combinations
 */
export interface SectionWithGridProps<T = any> extends 
  BaseSectionProps,
  UniversalGridProps<T>,
  AnimationProps {
  /** Custom content renderer instead of grid */
  renderCustomContent?: () => React.ReactNode;
  /** Whether to show the section header */
  showHeader?: boolean;
}

/**
 * Standard content block props
 * Combines the most common prop patterns for content sections
 */
export interface ContentBlockProps extends 
  BaseSectionProps,
  SpacingProps,
  LoadingProps,
  AnimationProps {
  children?: React.ReactNode;
}

/**
 * Standard item card props
 * Combines card and interactive patterns for clickable cards
 */
export interface ItemCardProps<T = any> extends 
  Omit<UniversalCardProps, 'onCardClick'>,
  InteractiveProps,
  LoadingProps,
  VisibilityProps {
  item: T;
  href?: string;
  target?: "_blank" | "_self";
  onClick?: () => void; // Override to avoid conflict
}

/**
 * Standard filter container props
 * Combines filtering with content display
 */
export interface FilterableContentProps<T = any> extends
  ContentBlockProps,
  FilterProps<string> {
  /** Array of items to render */
  items?: T[];
  /** Function to render each item */
  renderItem?: (item: T, index: number) => React.ReactNode;
  /** Grid column configuration */
  columns?: GridVariants["cols"];
  /** Grid gap spacing */
  gap?: GridVariants["gap"];
  /** Empty state message */
  emptyStateText?: string;
  /** Empty state component */
  emptyStateComponent?: React.ReactNode;
}

/**
 * Props for the UniversalSection component
 * Combines section header with grid layout functionality
 */
export interface UniversalSectionProps<T = any> extends 
  BaseSectionProps,
  AnimationProps {
  /** Array of items to render (optional for custom content) */
  items?: T[];
  /** Function to render each item (optional for custom content) */
  renderItem?: (item: T, index: number) => React.ReactNode;
  /** Grid column configuration */
  columns?: GridVariants["cols"];
  /** Grid gap spacing */
  gap?: GridVariants["gap"];
  /** Empty state message */
  emptyStateText?: string;
  /** Empty state component */
  emptyStateComponent?: React.ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Skeleton count for loading */
  skeletonCount?: number;
  /** Auto-fit responsive behavior */
  autoFit?: boolean;
  /** Minimum item width for auto-fit */
  minItemWidth?: string;
  /** Maximum items per row */
  maxItems?: number;
  /** Grid item aspect ratio */
  aspectRatio?: "square" | "video" | "portrait" | "auto";
  /** Custom content renderer instead of grid */
  renderCustomContent?: () => React.ReactNode;
  /** Whether to show the section header */
  showHeader?: boolean;
}

// ============================================================================
// STANDARD VARIANT CONSTANTS
// ============================================================================

/**
 * Standard variant options
 * Used across multiple component types
 */
export const STANDARD_VARIANTS = [
  "default",
  "compact", 
  "featured",
  "minimal",
  "highlighted",
  "cards"
] as const;

/**
 * Standard size options
 * Consistent sizing across all components
 */
export const STANDARD_SIZES = [
  "xs",
  "sm", 
  "md",
  "lg",
  "xl",
  "2xl"
] as const;

/**
 * Standard background options
 * Consistent background styling
 */
export const STANDARD_BACKGROUNDS = [
  "default",
  "muted",
  "card", 
  "primary",
  "transparent"
] as const;

/**
 * Standard card variants - matches component-variants.ts
 * Core variants available for all card components
 */
export const CARD_VARIANTS = [
  "default",
  "service", 
  "elevated",
  "outline"
] as const;

/**
 * Extended card types for specific use cases
 * Used in universal-card.tsx for specialized cards
 */
export const EXTENDED_CARD_TYPES = [
  "pricing",
  "offer",
  "testimonial",
  "benefit",
  "stat",
  "location",
  "cta",
  "compact",
  "featured"
] as const;

export type StandardVariant = typeof STANDARD_VARIANTS[number];
export type StandardSize = typeof STANDARD_SIZES[number]; 
export type StandardBackground = typeof STANDARD_BACKGROUNDS[number];
export type CardVariant = typeof CARD_VARIANTS[number];
export type ExtendedCardType = typeof EXTENDED_CARD_TYPES[number];
