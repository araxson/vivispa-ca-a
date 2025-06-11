import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const iconCircleVariants = cva(
  "flex items-center justify-center rounded-full",
  {
    variants: {
      variant: {
        primary: "bg-primary/10 text-primary",
        secondary: "bg-secondary/10 text-secondary",
        muted: "bg-muted/50 text-muted-foreground",
      },
      size: {
        sm: "w-10 h-10",
        md: "w-12 h-12",
        lg: "w-16 h-16",
        xl: "w-20 h-20",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

const iconSizeVariants = cva("", {
  variants: {
    size: {
      sm: "w-5 h-5",
      md: "w-6 h-6",
      lg: "w-8 h-8",
      xl: "w-10 h-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface IconCircleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconCircleVariants> {
  icon: LucideIcon;
}

export function IconCircle({
  className,
  icon: Icon,
  variant,
  size,
  ...props
}: IconCircleProps) {
  return (
    <div
      className={cn(iconCircleVariants({ variant, size }), className)}
      {...props}
    >
      <Icon className={cn(iconSizeVariants({ size }))} aria-hidden="true" />
    </div>
  );
} 