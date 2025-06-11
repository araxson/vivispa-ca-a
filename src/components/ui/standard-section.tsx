import * as React from "react";
import { cn, getSectionClasses } from "@/lib/styles";
import { Container, type ContainerProps } from "./container";
import { SectionHeader } from "@/components/blocks/hero-and-sections/section-header";
import { Separator } from "./separator";
import { getLayoutClasses } from "@/lib/layout-utils";
import type { HeaderProps, SpacingProps } from "@/types/prop-mixins";

export interface StandardSectionProps
  extends React.HTMLAttributes<HTMLElement>,
    HeaderProps,
    SpacingProps {
  children: React.ReactNode;

  // Layout props
  layout?: "default" | "centered" | "split" | "full-width";
  background?: "default" | "muted" | "card" | "primary" | "transparent";
  maxWidth?: ContainerProps["maxWidth"];
  paddingSize?: ContainerProps["paddingSize"];

  // Visual props
  showDivider?: boolean;
  dividerPosition?: "top" | "bottom" | "both";
  headerAlign?: "left" | "center" | "right";
  // Container customization
  containerClassName?: string | undefined;
  headerClassName?: string | undefined;
  contentClassName?: string | undefined;

  // Accessibility
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

/**
 * StandardSection - A comprehensive section wrapper that standardizes layout patterns
 * 
 * Features:
 * - Consistent header patterns with SectionHeader
 * - Flexible layout options (default, centered, split, full-width)
 * - Standardized spacing using the design system
 * - Optional dividers and visual elements
 * - Full accessibility support
 * - Container and responsive behavior
 * 
 * @example
 * ```tsx
 * <StandardSection
 *   title="Our Services"
 *   subtitle="Premium treatments for your beauty needs"
 *   layout="centered"
 *   spacing="lg"
 *   background="muted"
 *   showDivider
 * >
 *   <ServiceGrid services={services} />
 * </StandardSection>
 * ```
 */
export function StandardSection({
  children,
  title,
  subtitle,
  description,
  as = "h2",
  layout = "default",
  spacing = "lg",
  background = "transparent",
  maxWidth = "7xl",
  paddingSize = "md",
  showDivider = false,
  dividerPosition = "bottom",
  headerAlign = "center",
  className,
  containerClassName,
  headerClassName,
  contentClassName,
  id,
  ...props
}: StandardSectionProps) {
  const hasHeader = title || subtitle || description;
    const layoutClasses = {
    default: "",
    centered: "text-center",
    split: getLayoutClasses("splitSection"),
    "full-width": "w-full",
  };
  
  const headerAlignClasses = {
    left: "text-left",
    center: "text-center", 
    right: "text-right",
  };

  return (
    <section
      id={id}
      className={cn(
        getSectionClasses(spacing, background),
        layoutClasses[layout],
        className
      )}
      {...props}
    >
      {/* Top Divider */}
      {showDivider && (dividerPosition === "top" || dividerPosition === "both") && (
        <Container maxWidth={maxWidth} paddingSize={paddingSize}>
          <Separator className="mb-8" />
        </Container>
      )}
      
      <Container
        maxWidth={maxWidth}
        paddingSize={paddingSize}
        className={containerClassName}
      >
        {/* Section Header */}
        {hasHeader && (
          <div className={cn(
            headerAlignClasses[headerAlign],
            "mb-8 lg:mb-12",
            layout === "split" && "lg:mb-0",
            headerClassName
          )}>
            <SectionHeader
              title={title || ""}
              subtitle={subtitle}
              as={as}
              className="mb-0"
            />
            {description && (
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        
        {/* Section Content */}
        <div className={cn(
          layout === "split" && hasHeader ? "lg:col-span-1" : "",
          contentClassName
        )}>
          {children}
        </div>
      </Container>
      
      {/* Bottom Divider */}
      {showDivider && (dividerPosition === "bottom" || dividerPosition === "both") && (
        <Container maxWidth={maxWidth} paddingSize={paddingSize}>
          <Separator className="mt-8" />
        </Container>
      )}
    </section>
  );
}

/**
 * Convenience components for common section patterns
 */

/**
 * Hero section variant with larger spacing and centered content
 */
export function HeroSection(
  props: Omit<StandardSectionProps, "spacing" | "layout" | "as">,
) {
  return (
    <StandardSection
      spacing="xl"
      layout="centered"
      as="h1"
      {...props}
    />
  );
}

/**
 * Feature section variant with standard spacing and flexible layout
 */
export function FeatureSection(props: StandardSectionProps) {
  return (
    <StandardSection
      spacing="lg"
      background="muted"
      showDivider
      {...props}
    />
  );
}

/**
 * Content section variant for text-heavy content
 */
export function ContentSection(props: Omit<StandardSectionProps, "maxWidth" | "layout">) {
  return (
    <StandardSection
      maxWidth="4xl"
      layout="centered"
      spacing="md"
      {...props}
    />
  );
}

/**
 * Grid section variant optimized for card/item grids
 */
export function GridSection(props: StandardSectionProps) {
  return (
    <StandardSection
      spacing="lg"
      headerAlign="center"
      {...props}
    />
  );
}
