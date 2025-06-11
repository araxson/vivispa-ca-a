import * as React from "react";
import { cn, getSectionClasses, type SpacingSize } from "@/lib/utils";
import { Container, type ContainerProps } from "./container";
import type { UniversalSectionProps } from "@/types/universal";

export interface SectionProps extends UniversalSectionProps {
  children: React.ReactNode;
}

export function Section({
  children,
  className,
  containerClassName,
  maxWidth = "7xl",
  paddingSize = "md",
  spacing = "lg",
  background = "transparent",
  id,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(getSectionClasses(spacing, background), className)}
      {...props}
    >
      <Container
        maxWidth={maxWidth}
        paddingSize={paddingSize}
        className={containerClassName}
      >
        {children}
      </Container>
    </section>
  );
}
