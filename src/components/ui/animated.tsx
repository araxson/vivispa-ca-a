"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { getAnimationClasses, type AnimationProps } from "@/lib/animation";

interface AnimatedProps extends AnimationProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Threshold value between 0 and 1 for when the animation should trigger
   */
  threshold?: number;
  /**
   * Root margin to adjust the observer's bounding box
   */
  rootMargin?: string;
  /**
   * Whether the animation should trigger only once
   */
  triggerOnce?: boolean;
  /**
   * Whether the animation should start with elements visible
   */
  startVisible?: boolean;
  /**
   * Custom delay for this specific component (in milliseconds)
   */
  customDelay?: number;
}

/**
 * Universal animated component that wraps any content with scroll-triggered animations
 * Consolidates all animation logic into a single reusable component
 */
export function Animated({
  children,
  className,
  variant = "fade",
  timing = "normal",
  delay = "none",
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
  startVisible = false,
  customDelay = 0,
  ...props
}: AnimatedProps) {
  const { ref, state } = useScrollAnimation({
    threshold,
    rootMargin,
    triggerOnce,
    startVisible,
  });

  const animationClasses = getAnimationClasses({
    variant,
    timing,
    delay,
    className,
  });

  return (
    <div
      ref={ref}
      data-state={state}
      className={cn(animationClasses, className)}
      style={customDelay > 0 ? { transitionDelay: `${customDelay}ms` } : undefined}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Animated section wrapper - convenience component for sections
 */
export function AnimatedSection({
  children,
  className,
  spacing = "lg",
  ...animatedProps
}: AnimatedProps & {
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
}) {
  const spacingClasses = {
    none: "",
    xs: "py-6 sm:py-8",
    sm: "py-8 sm:py-12",
    md: "py-12 sm:py-16",
    lg: "py-16 sm:py-20",
    xl: "py-20 sm:py-24 lg:py-32",
  };

  return (
    <Animated
      className={cn("w-full", spacingClasses[spacing], className)}
      {...animatedProps}
    >
      {children}
    </Animated>
  );
}

/**
 * Animated item wrapper - convenience component for individual items with staggered animations
 */
export function AnimatedItem({
  children,
  index = 0,
  staggerDelay = 100,
  ...animatedProps
}: AnimatedProps & {
  index?: number;
  staggerDelay?: number;
}) {
  const calculatedDelay = index * staggerDelay;

  return (
    <Animated
      customDelay={calculatedDelay}
      {...animatedProps}
    >
      {children}
    </Animated>
  );
}
