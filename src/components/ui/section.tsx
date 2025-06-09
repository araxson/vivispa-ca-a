import * as React from "react";
import { cn } from "@/lib/utils";
import { getSectionClasses, type SpacingSize } from "@/lib/spacing";
import { Container, type ContainerProps } from "./container";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string | undefined;
  containerClassName?: string | undefined;
  maxWidth?: ContainerProps["maxWidth"];
  paddingSize?: ContainerProps["paddingSize"];
  spacing?: SpacingSize;
  background?: "default" | "muted" | "card" | "primary" | "transparent";
  id?: string;
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
