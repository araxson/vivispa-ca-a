import * as React from "react";
import { cn, sectionVariants, type SectionVariants as SectionVariantProps } from "@/lib/utils";
import { Container, type ContainerProps } from "./container";

export interface SectionProps extends React.HTMLAttributes<HTMLElement>, Omit<SectionVariantProps, "spacing" | "background"> {
  children: React.ReactNode;
  className?: string | undefined;
  containerClassName?: string | undefined;
  maxWidth?: ContainerProps["maxWidth"];
  paddingSize?: ContainerProps["paddingSize"];
  spacing?: SectionVariantProps["spacing"];
  background?: SectionVariantProps["background"];
  id?: string;
}

export function Section({
  children,
  className,
  containerClassName,
  maxWidth, // Pass directly to Container
  paddingSize, // Pass directly to Container
  spacing,
  background,
  id,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(sectionVariants({ spacing, background }), className)}
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
