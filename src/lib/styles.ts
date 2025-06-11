/**
 * Centralized Style Utilities
 * This file consolidates all style-related utilities to eliminate duplication
 */

// Re-export core utilities
export { cn } from "./utils";

// Re-export spacing utilities  
export {
  containerVariants,
  sectionVariants, 
  gridVariants,
  getSectionClasses,
  getContainerClasses,
  getGridClasses,
  type SpacingSize,
  type ContainerVariants,
  type SectionVariants,
  type GridVariants,
} from "./spacing";

// Re-export component variants
export {
  buttonVariants,
  inputVariants,
  cardVariants,
  avatarVariants,
  badgeVariants,
  type ButtonVariants,
  type InputVariants,
  type CardVariants,
  type AvatarVariants,
  type BadgeVariants,
} from "./component-variants";

// Re-export animation utilities
export {
  getAnimationClasses,
  getStaggeredChildClasses,
  AnimationState,
  filterTransitionClasses,
} from "./animation";

/**
 * Common CSS class combinations for reuse
 */
export const stylePresets = {
  // Focus styles
  focusRing: "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
  
  // Form element base styles
  formElement: "flex w-full rounded-md border border-input bg-transparent shadow-xs disabled:cursor-not-allowed disabled:opacity-50",
  
  // Interactive element base styles
  interactive: "transition-all duration-200 ease-in-out",
  
  // Card base styles
  cardBase: "bg-card text-card-foreground flex flex-col rounded-xl border overflow-hidden",
  
  // Button base styles
  buttonBase: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50",
  
  // Layout presets
  centerContent: "flex items-center justify-center",
  flexBetween: "flex items-center justify-between",
  flexColumn: "flex flex-col",
  
  // Responsive spacing
  sectionPadding: "px-4 sm:px-6 lg:px-8",
  containerPadding: "py-16 sm:py-20 lg:py-24",
} as const;

/**
 * Responsive breakpoint utilities
 */
export const breakpoints = {
  sm: "640px",
  md: "768px", 
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

/**
 * Common gradient utilities
 */
export const gradients = {
  primary: "bg-gradient-to-r from-primary to-primary/80",
  secondary: "bg-gradient-to-r from-secondary to-secondary/80", 
  accent: "bg-gradient-to-r from-accent to-accent/80",
  muted: "bg-gradient-to-r from-muted to-muted/50",
} as const;

/**
 * Shadow utilities
 */
export const shadows = {
  soft: "shadow-sm",
  medium: "shadow-md", 
  large: "shadow-lg",
  xl: "shadow-xl",
  inner: "shadow-inner",
} as const;
