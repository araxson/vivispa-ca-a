import * as React from "react";
import { cn } from "@/lib/utils";
import { getContainerClasses, type SpacingSize } from "@/lib/spacing";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "full";
  paddingSize?: SpacingSize;
  className?: string | undefined;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth = "7xl", paddingSize = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(getContainerClasses(maxWidth, paddingSize), className)}
        {...props}
      />
    );
  },
);
Container.displayName = "Container";
