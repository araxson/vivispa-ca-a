// Core UI Components - Centralized exports for better tree-shaking
export * from "./accordion";
export * from "./alert-dialog";
export * from "./badge";
export * from "./filter-badges";
export * from "./breadcrumb";
export * from "./button";
export * from "./card";
export * from "./carousel";
export * from "./container";
export * from "./section";
export * from "./dialog";
export * from "./dropdown-menu";
export * from "./input";
export * from "./search-input";
export * from "./select";
export * from "./separator";
export * from "./skeleton";
export * from "./table";
export * from "./theme-provider";
export * from "./whatsapp-widget";

// Custom UI Components
export * from "./optimized-image";
export * from "./icon";

// Enhanced UI Components (New) - Task 1.1 Universal Components
export * from "./animated";
export * from "./universal-card";
export * from "./universal-grid";
export * from "./universal-section";
export * from "./responsive-grid";

// Section components with explicit exports to avoid conflicts
export { 
  StandardSection,
  HeroSection,
  FeatureSection,
  ContentSection,
  type StandardSectionProps,
} from "./standard-section";

// Filter components with explicit exports to avoid conflicts
export { 
  UniversalFilterControls,
  type UniversalFilterControlsProps,
} from "./universal-filter-controls";

// Re-export common icon utilities from centralized system
export { 
  WhatsAppIcon, 
  iconSizes, 
  iconColors, 
  IconCollection,
  type IconName,
  type IconSize,
  type IconColor,
  getIcon,
  getIconClasses,
} from "@/lib/icons";
