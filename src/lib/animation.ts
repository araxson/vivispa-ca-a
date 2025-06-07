import { ClassValue } from "clsx";
import { cn } from "./utils";

export type AnimationVariant = 
  | "fade" 
  | "slideUp" 
  | "slideDown" 
  | "slideLeft" 
  | "slideRight" 
  | "scale" 
  | "none";

export type AnimationTiming = 
  | "fast" 
  | "normal" 
  | "slow";

export type AnimationDelay = 
  | "none" 
  | "short" 
  | "medium" 
  | "long";

export type AnimationProps = {
  variant?: AnimationVariant;
  timing?: AnimationTiming;
  delay?: AnimationDelay;
  staggerChildren?: boolean;
  staggerDelay?: number;
  className?: ClassValue;
};

// Animation class mappings
const variantClasses: Record<AnimationVariant, string> = {
  fade: "opacity-0 data-[state=visible]:opacity-100",
  slideUp: "opacity-0 translate-y-4 data-[state=visible]:opacity-100 data-[state=visible]:translate-y-0",
  slideDown: "opacity-0 -translate-y-4 data-[state=visible]:opacity-100 data-[state=visible]:translate-y-0",
  slideLeft: "opacity-0 translate-x-4 data-[state=visible]:opacity-100 data-[state=visible]:translate-x-0",
  slideRight: "opacity-0 -translate-x-4 data-[state=visible]:opacity-100 data-[state=visible]:translate-x-0",
  scale: "opacity-0 scale-95 data-[state=visible]:opacity-100 data-[state=visible]:scale-100",
  none: "",
};

const timingClasses: Record<AnimationTiming, string> = {
  fast: "duration-300",
  normal: "duration-500",
  slow: "duration-700",
};

const delayClasses: Record<AnimationDelay, string> = {
  none: "delay-0",
  short: "delay-100",
  medium: "delay-300",
  long: "delay-500",
};

/**
 * Get animation classes based on provided animation props
 */
export function getAnimationClasses({
  variant = "fade",
  timing = "normal",
  delay = "none",
  className,
}: AnimationProps): string {
  return cn(
    "transition-all ease-out will-change-transform",
    variantClasses[variant],
    timingClasses[timing],
    delayClasses[delay],
    className
  );
}

/**
 * Generate staggered animation delay classes for child elements
 */
export function getStaggeredChildClasses(
  index: number, 
  baseDelay: number = 100
): string {
  const delay = index * baseDelay;
  return `delay-[${delay}ms]`;
}

/**
 * Animation state data attribute options
 */
export const AnimationState = {
  HIDDEN: "hidden",
  VISIBLE: "visible",
  ENTERING: "entering",
  EXITING: "exiting",
} as const;

/**
 * Add filter transition classes
 */
export const filterTransitionClasses = "transition-all duration-300 ease-in-out"; 