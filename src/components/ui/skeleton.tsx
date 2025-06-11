import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { avatarVariants, type AvatarVariants } from "@/lib/component-variants";
import { UniversalGrid } from "./universal-grid";

const skeletonVariants = cva("bg-muted", {
  variants: {
    variant: {
      default: "rounded-md",
      circular: "rounded-full",
      text: "rounded-sm h-4",
      image: "rounded-lg",
    },
    animation: {
      pulse: "animate-pulse",
      wave: "animate-shimmer",
      none: "",
    },
    speed: {
      slow: "[animation-duration:2s]",
      normal: "",
      fast: "[animation-duration:0.5s]",
    },
  },
  defaultVariants: {
    variant: "default",
    animation: "pulse",
    speed: "normal",
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({
  className,
  variant,
  animation,
  speed,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ variant, animation, speed }), className)}
      role="status"
      aria-label="Loading content"
      {...props}
    />
  );
}

// Predefined skeleton components for common use cases
function SkeletonText({
  lines = 1,
  className,
  ...props
}: {
  lines?: number;
  className?: string;
} & Omit<SkeletonProps, "variant">) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          className={cn(
            "w-full",
            index === lines - 1 && lines > 1 && "w-3/4", // Last line shorter
          )}
          {...props}
        />
      ))}
    </div>
  );
}

function SkeletonCard({
  showImage = true,
  showTitle = true,
  showDescription = true,
  className,
  ...props
}: {
  showImage?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  className?: string;
} & Omit<SkeletonProps, "variant">) {
  return (
    <div className={cn("space-y-4", className)}>
      {showImage && (
        <Skeleton variant="image" className="w-full h-48" {...props} />
      )}
      {showTitle && (
        <Skeleton variant="text" className="w-3/4 h-6" {...props} />
      )}
      {showDescription && <SkeletonText lines={2} {...props} />}
    </div>
  );
}

function SkeletonGrid({
  count = 3,
  className,
  ...props
}: {
  count?: number;
  className?: string;
} & Omit<SkeletonProps, "variant">) {
  const skeletonItems = Array.from({ length: count }, (_, index) => ({ id: index }));

  return (
    <UniversalGrid
      items={skeletonItems}
      renderItem={(_, index) => <SkeletonCard key={index} {...props} />}
      columns={3}
      gap="lg"
      className={className}
    />
  );
}

// Remove duplicate avatar and button variants - use shared ones
export interface SkeletonAvatarProps
  extends Omit<SkeletonProps, "variant">,
    AvatarVariants {}

function SkeletonAvatar({ size, className, ...props }: SkeletonAvatarProps) {
  return (
    <Skeleton
      variant="circular"
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
  );
}

export interface SkeletonButtonProps
  extends Omit<SkeletonProps, "variant"> {
  size?: "sm" | "md" | "lg";
}

function SkeletonButton({ size = "md", className, ...props }: SkeletonButtonProps) {
  const sizeClasses = {
    sm: "h-8 w-20",
    md: "h-10 w-24", 
    lg: "h-12 w-32",
  };
  
  return (
    <Skeleton className={cn(sizeClasses[size], className)} {...props} />
  );
}

export { 
  Skeleton, 
  SkeletonText, 
  SkeletonCard, 
  SkeletonGrid,
  SkeletonAvatar, 
  SkeletonButton,
};
