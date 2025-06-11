import React from "react";
import { cn } from "@/lib/utils";
import { gridVariants, type GridVariants } from "@/lib/spacing";
import { Animated, AnimatedItem } from "./animated";
import type { HeaderProps, SpacingProps } from "@/types/prop-mixins";
import { SectionHeader } from "@/components/blocks/hero-and-sections/section-header";

// Preset configurations for common grid layouts
export const GRID_PRESETS = {
  services: { columns: 3 as const, gap: "lg" as const },
  offers: { columns: 3 as const, gap: "lg" as const },
  pricing: { columns: 4 as const, gap: "md" as const },
  testimonials: { columns: 3 as const, gap: "md" as const },
  benefits: { columns: 4 as const, gap: "md" as const },
  gallery: { columns: 4 as const, gap: "sm" as const },
  filters: { columns: 4 as const, gap: "sm" as const },
  footer: { columns: 2 as const, gap: "lg" as const },
  cards: { columns: 3 as const, gap: "lg" as const },
  compact: { columns: 2 as const, gap: "md" as const },
} as const;

export type GridPreset = keyof typeof GRID_PRESETS;

interface ResponsiveGridProps extends SpacingProps {
  children: React.ReactNode;
  preset?: GridPreset;
  columns?: GridVariants["cols"];
  gap?: GridVariants["gap"];
  className?: string;
  showAnimation?: boolean;
  staggerDelay?: number;
  animationVariant?:
    | "fade"
    | "slideUp"
    | "slideDown"
    | "slideLeft"
    | "slideRight"
    | "scale";
}

/**
 * Enhanced responsive grid component with presets and animations
 * Consolidates grid layouts used across services, offers, pricing, etc.
 */
export function ResponsiveGrid({
  children,
  preset,
  columns = 3,
  gap = "md",
  className,
  showAnimation = false,
  staggerDelay = 100,
  animationVariant = "fade",
}: ResponsiveGridProps) {
  // Use preset values if provided, otherwise fall back to explicit props
  const finalColumns = preset ? GRID_PRESETS[preset].columns : columns;
  const finalGap = preset ? GRID_PRESETS[preset].gap : gap;
  
  const gridClasses = gridVariants({ cols: finalColumns, gap: finalGap });

  if (!showAnimation) {
    return (
      <div className={cn(gridClasses, className)}>
        {children}
      </div>
    );
  }

  // Animated grid with staggered children
  return (
    <div className={cn(gridClasses, className)}>
      {React.Children.map(children, (child, index) => (
        <AnimatedItem
          key={index}
          index={index}
          staggerDelay={staggerDelay}
          variant={animationVariant}
        >
          {child}
        </AnimatedItem>
      ))}
    </div>
  );
}

interface GridSectionProps extends HeaderProps, SpacingProps {
  children: React.ReactNode;
  preset?: GridPreset;
  columns?: GridVariants["cols"];
  gap?: GridVariants["gap"];
  showAnimation?: boolean;
  staggerDelay?: number;
  animationVariant?:
    | "fade"
    | "slideUp"
    | "slideDown"
    | "slideLeft"
    | "slideRight"
    | "scale";
  headerClassName?: string;
}

/**
 * Grid section with optional header and presets
 * Commonly used pattern across the application
 */
export function GridSection({
  title,
  subtitle,
  description,
  as,
  children,
  preset,
  columns = 3,
  gap = "md",
  className,
  showAnimation = false,
  staggerDelay = 100,
  animationVariant = "fade",
  headerClassName,
}: GridSectionProps) {
  return (
    <section className={cn("space-y-8", className)}>      {(title || subtitle || description) && (
        <div>
          <SectionHeader
            title={title || ""}
            {...(subtitle && { subtitle })}
            {...(as && { as })}
            {...(headerClassName && { className: headerClassName })}
          />
          {description && (
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto text-center">
              {description}
            </p>
          )}
        </div>
      )}
      <ResponsiveGrid
        {...(preset && { preset })}
        columns={columns}
        gap={gap}
        showAnimation={showAnimation}
        staggerDelay={staggerDelay}
        animationVariant={animationVariant}
      >
        {children}
      </ResponsiveGrid>
    </section>
  );
}

interface AutoGridProps extends SpacingProps {
  children: React.ReactNode;
  minItemWidth?: string;
  gap?: GridVariants["gap"];
  className?: string;
  showAnimation?: boolean;
  staggerDelay?: number;
  animationVariant?:
    | "fade"
    | "slideUp"
    | "slideDown"
    | "slideLeft"
    | "slideRight"
    | "scale";
}

/**
 * Auto-sizing grid that adjusts based on content width
 * Useful for responsive layouts with varying content sizes
 */
export function AutoGrid({
  children,
  minItemWidth = "280px",
  gap = "md",
  className,
  showAnimation = false,
  staggerDelay = 100,
  animationVariant = "fade",
}: AutoGridProps) {
  const gapClasses = {
    none: "gap-0",
    xs: "gap-2",
    sm: "gap-3", 
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  };

  const safeGap = gap || "md";
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
  };

  if (!showAnimation) {
    return (
      <div 
        className={cn("grid", gapClasses[safeGap], className)}
        style={gridStyle}
      >
        {children}
      </div>
    );
  }

  return (
    <div 
      className={cn("grid", gapClasses[safeGap], className)}
      style={gridStyle}
    >
      {React.Children.map(children, (child, index) => (
        <AnimatedItem
          key={index}
          index={index}
          staggerDelay={staggerDelay}
          variant={animationVariant}
        >
          {child}
        </AnimatedItem>
      ))}
    </div>
  );
}
