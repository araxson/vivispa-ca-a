import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { cva, type VariantProps } from "class-variance-authority"

/**
 * Enhanced className utility with better performance
 * Consolidates clsx and tailwind-merge for consistent class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Common variant patterns for consistent component styling
 */
export const commonVariants = {
  size: {
    sm: "text-sm",
    md: "text-base", 
    lg: "text-lg",
    xl: "text-xl"
  },
  spacing: {
    none: "",
    xs: "p-2",
    sm: "p-3", 
    md: "p-4",
    lg: "p-6",
    xl: "p-8"
  },
  gap: {
    none: "gap-0",
    xs: "gap-2",
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8"
  },
  rounded: {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full"
  }
} as const;

/**
 * Standard focus ring styles for accessibility
 */
export const focusRing = "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none";

/**
 * Responsive container utilities
 */
export const containerVariants = cva(
  "mx-auto w-full",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-4xl",
        lg: "max-w-6xl", 
        xl: "max-w-7xl",
        full: "max-w-full"
      },
      padding: {
        none: "",
        xs: "px-3 sm:px-4",
        sm: "px-4 sm:px-6",
        md: "px-4 sm:px-6 lg:px-8",
        lg: "px-6 sm:px-8 lg:px-12"
      }
    },
    defaultVariants: {
      size: "xl",
      padding: "md"
    }
  }
);

/**
 * Section spacing utilities
 */
export const sectionVariants = cva(
  "w-full",
  {
    variants: {
      spacing: {
        none: "",
        xs: "py-6 sm:py-8",
        sm: "py-8 sm:py-12", 
        md: "py-12 sm:py-16",
        lg: "py-16 sm:py-20",
        xl: "py-20 sm:py-24 lg:py-32"
      },
      background: {
        default: "bg-background",
        muted: "bg-muted/30",
        card: "bg-card",
        primary: "bg-primary text-primary-foreground",
        transparent: ""
      }
    },
    defaultVariants: {
      spacing: "md",
      background: "default"
    }
  }
);

/**
 * Grid utilities for consistent layouts
 */
export const gridVariants = cva(
  "grid",
  {
    variants: {
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3", 
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        auto: "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
      },
      gap: {
        xs: "gap-3",
        sm: "gap-4",
        md: "gap-6",
        lg: "gap-8",
        xl: "gap-12"
      }
    },
    defaultVariants: {
      cols: "auto",
      gap: "md"
    }
  }
);

/**
 * Button base styles for consistency
 */
export const buttonBase = [
  "inline-flex items-center justify-center gap-2",
  "whitespace-nowrap rounded-md text-sm font-medium",
  "disabled:pointer-events-none disabled:opacity-50",
  "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
  "shrink-0 [&_svg]:shrink-0 outline-none",
  focusRing
].join(" ");

/**
 * Card base styles for consistency  
 */
export const cardBase = [
  "bg-card text-card-foreground",
  "flex flex-col rounded-xl border overflow-hidden"
].join(" ");

/**
 * Input base styles for consistency
 */
export const inputBase = [
  "flex h-9 w-full rounded-md border border-input",
  "bg-transparent px-3 py-1 text-base shadow-xs",
  "file:border-0 file:bg-transparent",
  "file:text-sm file:font-medium file:text-foreground",
  "placeholder:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "md:text-sm"
].join(" ");

/**
 * Responsive spacing utilities for components
 */
export const spacingVariants = cva("", {
  variants: {
    p: {
      none: "",
      xs: "p-2",
      sm: "p-3 sm:p-4",
      md: "p-4 sm:p-6",
      lg: "p-6 sm:p-8",
      xl: "p-8 sm:p-12"
    },
    px: {
      none: "",
      xs: "px-2",
      sm: "px-3 sm:px-4",
      md: "px-4 sm:px-6",
      lg: "px-6 sm:px-8",
      xl: "px-8 sm:px-12"
    },
    py: {
      none: "",
      xs: "py-2",
      sm: "py-3 sm:py-4",
      md: "py-4 sm:py-6",
      lg: "py-6 sm:py-8",
      xl: "py-8 sm:py-12"
    },
    m: {
      none: "",
      xs: "m-2",
      sm: "m-3 sm:m-4",
      md: "m-4 sm:m-6",
      lg: "m-6 sm:m-8",
      xl: "m-8 sm:m-12"
    },
    mx: {
      none: "",
      xs: "mx-2",
      sm: "mx-3 sm:mx-4",
      md: "mx-4 sm:mx-6",
      lg: "mx-6 sm:mx-8",
      xl: "mx-8 sm:mx-12"
    },
    my: {
      none: "",
      xs: "my-2",
      sm: "my-3 sm:my-4",
      md: "my-4 sm:my-6",
      lg: "my-6 sm:my-8",
      xl: "my-8 sm:my-12"
    }
  }
});

/**
 * Type exports for component props
 */
export type ContainerVariants = VariantProps<typeof containerVariants>;
export type SectionVariants = VariantProps<typeof sectionVariants>;
export type GridVariants = VariantProps<typeof gridVariants>;
export type SpacingVariants = VariantProps<typeof spacingVariants>;
