import { cva, type VariantProps } from "class-variance-authority";

/**
 * Centralized form patterns and utilities
 * Consolidates common form-related patterns to eliminate duplication
 */

/**
 * Form field variant definitions
 */
export const formFieldVariants = cva("space-y-2", {
  variants: {
    layout: {
      default: "space-y-2",
      inline: "flex items-center space-x-2 space-y-0",
      grid: "grid grid-cols-1 gap-4",
    },
  },
  defaultVariants: {
    layout: "default",
  },
});

/**
 * Form group variant definitions
 */
export const formGroupVariants = cva("space-y-4", {
  variants: {
    spacing: {
      tight: "space-y-2",
      normal: "space-y-4",
      loose: "space-y-6",
    },
    columns: {
      1: "grid-cols-1",
      2: "grid grid-cols-1 md:grid-cols-2 gap-4",
      3: "grid grid-cols-1 md:grid-cols-3 gap-4",
      auto: "grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4",
    },
  },
  defaultVariants: {
    spacing: "normal",
    columns: 1,
  },
});

/**
 * Form validation state styles
 */
export const validationStyles = {
  error: "border-destructive focus-visible:ring-destructive/20",
  success: "border-green-500 focus-visible:ring-green-500/20",
  warning: "border-yellow-500 focus-visible:ring-yellow-500/20",
} as const;

/**
 * Common form field patterns
 */
export const formPatterns = {
  // Contact form field structure
  contactForm: {
    name: {
      label: "Full Name",
      placeholder: "Enter your full name",
      required: true,
      type: "text" as const,
    },
    email: {
      label: "Email Address",
      placeholder: "Enter your email address",
      required: true,
      type: "email" as const,
    },
    phone: {
      label: "Phone Number",
      placeholder: "(403) XXX-XXXX",
      required: false,
      type: "tel" as const,
    },
    message: {
      label: "Message",
      placeholder: "Tell us about your treatment interests...",
      required: true,
      type: "textarea" as const,
      rows: 4,
    },
  },

  // Newsletter subscription pattern
  newsletter: {
    email: {
      label: "Email Address",
      placeholder: "Enter your email to subscribe",
      required: true,
      type: "email" as const,
    },
  },

  // Booking/consultation form pattern
  bookingForm: {
    firstName: {
      label: "First Name",
      placeholder: "Enter your first name",
      required: true,
      type: "text" as const,
    },
    lastName: {
      label: "Last Name",
      placeholder: "Enter your last name",
      required: true,
      type: "text" as const,
    },
    email: {
      label: "Email Address",
      placeholder: "Enter your email address",
      required: true,
      type: "email" as const,
    },
    phone: {
      label: "Phone Number",
      placeholder: "(403) XXX-XXXX",
      required: true,
      type: "tel" as const,
    },
    service: {
      label: "Service of Interest",
      placeholder: "Select a service",
      required: false,
      type: "select" as const,
      options: [
        { value: "hydrofacial", label: "HydraFacial" },
        { value: "laser-hair-removal", label: "Laser Hair Removal" },
        { value: "microneedling", label: "Microneedling" },
        { value: "lash-extensions", label: "Eyelash Extensions" },
        { value: "head-spa", label: "Japanese Head Spa" },
        { value: "consultation", label: "General Consultation" },
      ],
    },
    preferredDate: {
      label: "Preferred Date",
      required: false,
      type: "date" as const,
    },
    notes: {
      label: "Additional Notes",
      placeholder: "Any specific concerns or questions?",
      required: false,
      type: "textarea" as const,
      rows: 3,
    },
  },
} as const;

/**
 * Form submission button variants
 */
export const formSubmitVariants = cva([
  "w-full font-medium transition-all duration-200",
  "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
].join(" "), {
  variants: {
    state: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      loading: "bg-primary/50 text-primary-foreground cursor-not-allowed",
      success: "bg-green-600 text-white",
      error: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    },
    size: {
      sm: "h-9 px-4 text-sm",
      md: "h-10 px-6 text-sm",
      lg: "h-12 px-8 text-base",
    },
  },
  defaultVariants: {
    state: "default",
    size: "md",
  },
});

/**
 * Common form layouts
 */
export const formLayouts = {
  // Single column layout
  singleColumn: "space-y-6 max-w-md mx-auto",
  
  // Two column layout
  twoColumn: "grid grid-cols-1 md:grid-cols-2 gap-6",
  
  // Contact form layout
  contact: "space-y-6 max-w-lg mx-auto",
  
  // Newsletter layout
  newsletter: "flex flex-col sm:flex-row gap-2 max-w-md mx-auto",
  
  // Inline search layout
  search: "flex items-center gap-2",
} as const;

/**
 * Form accessibility helpers
 */
export const formA11y = {
  required: {
    "aria-required": true,
  },
  invalid: {
    "aria-invalid": true,
  },
  describedBy: (id: string) => ({
    "aria-describedby": id,
  }),
} as const;

/**
 * Type exports
 */
export type FormFieldVariants = VariantProps<typeof formFieldVariants>;
export type FormGroupVariants = VariantProps<typeof formGroupVariants>;
export type FormSubmitVariants = VariantProps<typeof formSubmitVariants>;
export type ValidationState = keyof typeof validationStyles;
export type FormLayout = keyof typeof formLayouts;
