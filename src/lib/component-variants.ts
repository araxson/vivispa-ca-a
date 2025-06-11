import { cva, type VariantProps } from "class-variance-authority";

/**
 * Shared variant definitions for common component patterns
 * This file consolidates reusable variant patterns to eliminate duplication
 */

/**
 * Common size variants for buttons, inputs, etc.
 */
export const sizeVariants = {
  sm: { height: "h-8", padding: "px-3", text: "text-sm" },
  md: { height: "h-10", padding: "px-4", text: "text-sm" },
  lg: { height: "h-12", padding: "px-6", text: "text-base" },
  xl: { height: "h-14", padding: "px-8", text: "text-lg" },
} as const;

/**
 * Shared button variant patterns
 */
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-md text-sm font-medium",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
    "shrink-0 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        md: "h-9 px-4 py-2",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Shared input variant patterns
 */
export const inputVariants = cva([
  "flex h-9 w-full rounded-md border border-input",
  "bg-transparent px-3 py-1 text-base shadow-xs",
  "file:border-0 file:bg-transparent",
  "file:text-sm file:font-medium file:text-foreground",
  "placeholder:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "md:text-sm",
].join(" "), {
  variants: {
    size: {
      sm: "h-8 px-2 text-xs",
      md: "h-9 px-3 text-sm",
      lg: "h-10 px-4 text-base",
    },
    variant: {
      default: "",
      ghost: "border-transparent shadow-none",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

/**
 * Shared card variant patterns
 */
export const cardVariants = cva(
  "bg-card text-card-foreground flex flex-col rounded-xl border overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-border/50 shadow-sm",
        service: "group border-border/50 shadow-sm transition-all duration-300 hover:border-primary/20",
        elevated: "border-border/50 shadow-md",
        outline: "border-border bg-transparent",
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

/**
 * Shared avatar variants for consistent avatar sizing
 */
export const avatarVariants = cva(
  "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        default: "h-10 w-10",
        sm: "h-8 w-8",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

/**
 * Shared badge variants
 */
export const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        "primary-light":
          "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        offer: "bg-green-100 text-green-800 border-green-200",
        category: "bg-blue-100 text-blue-800 border-blue-200",
        location: "bg-purple-100 text-purple-800 border-purple-200",
        status: "bg-yellow-100 text-yellow-800 border-yellow-200",
        price: "bg-pink-100 text-pink-800 border-pink-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Type exports for all shared variants
 */
export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type InputVariants = VariantProps<typeof inputVariants>;
export type CardVariants = VariantProps<typeof cardVariants>;
export type AvatarVariants = VariantProps<typeof avatarVariants>;
export type BadgeVariants = VariantProps<typeof badgeVariants>;
