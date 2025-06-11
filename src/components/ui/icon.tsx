"use client";

import type { LucideProps } from "lucide-react";
import { 
  IconCollection, 
  getIconClasses, 
  type IconName, 
  type IconSize, 
  type IconColor 
} from "@/lib/icons";

interface IconProps extends Omit<LucideProps, 'size'> {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
}

/**
 * Centralized Icon component
 * 
 * Uses the centralized icon system to provide consistent icon rendering
 * with proper size and color variants.
 */
const IconComponent = ({ name, size = 'md', color = 'default', className, ...props }: IconProps) => {  const LucideIcon = IconCollection[name];

  if (!LucideIcon) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Icon "${name}" not found in centralized icon collection`);
    }
    return null;
  }

  const iconClasses = getIconClasses(size, color);

  return <LucideIcon className={`${iconClasses} ${className || ''}`} {...props} />;
};

export { IconComponent as Icon, type IconProps, type IconName, type IconSize, type IconColor };