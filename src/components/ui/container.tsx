import * as React from "react";
import { cn, containerVariants, type ContainerVariants as ContainerVariantProps } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement>, Omit<ContainerVariantProps, "size" | "padding"> {
  maxWidth?: ContainerVariantProps["size"]; // Use the keys from utils.ts directly
  paddingSize?: ContainerVariantProps["padding"]; // Use the keys from utils.ts directly
  className?: string | undefined;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth, paddingSize, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size: maxWidth, padding: paddingSize }), className)}
        {...props}
      />
    );
  },
);
Container.displayName = "Container";
