import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'circular' | 'text' | 'image';
  animation?: 'pulse' | 'wave' | 'none';
  speed?: 'slow' | 'normal' | 'fast';
}

function Skeleton({ 
  className, 
  variant = 'default',
  animation = 'pulse',
  speed = 'normal',
  ...props 
}: SkeletonProps) {
  const animationClasses = {
    pulse: {
      slow: 'animate-pulse [animation-duration:2s]',
      normal: 'animate-pulse',
      fast: 'animate-pulse [animation-duration:0.5s]',
    },
    wave: {
      slow: 'animate-shimmer [animation-duration:2s]',
      normal: 'animate-shimmer',
      fast: 'animate-shimmer [animation-duration:0.5s]',
    },
    none: {
      slow: '',
      normal: '',
      fast: '',
    },
  };

  const variantClasses = {
    default: 'rounded-md',
    circular: 'rounded-full',
    text: 'rounded-sm h-4',
    image: 'rounded-lg',
  };

  return (
    <div
      className={cn(
        "bg-muted",
        variantClasses[variant],
        animationClasses[animation][speed],
        className
      )}
      role="status"
      aria-label="Loading content"
      {...props}
    />
  )
}

// Predefined skeleton components for common use cases
function SkeletonText({ 
  lines = 1, 
  className,
  ...props 
}: { 
  lines?: number;
  className?: string;
} & Omit<SkeletonProps, 'variant'>) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          className={cn(
            "w-full",
            index === lines - 1 && lines > 1 && "w-3/4" // Last line shorter
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
} & Omit<SkeletonProps, 'variant'>) {
  return (
    <div className={cn("space-y-4", className)}>
      {showImage && (
        <Skeleton 
          variant="image" 
          className="w-full h-48"
          {...props}
        />
      )}
      {showTitle && (
        <Skeleton 
          variant="text" 
          className="w-3/4 h-6"
          {...props}
        />
      )}
      {showDescription && (
        <SkeletonText 
          lines={2}
          {...props}
        />
      )}
    </div>
  );
}

function SkeletonAvatar({ 
  size = 'md',
  className,
  ...props 
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
} & Omit<SkeletonProps, 'variant'>) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <Skeleton
      variant="circular"
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  );
}

function SkeletonButton({ 
  size = 'md',
  className,
  ...props 
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
} & Omit<SkeletonProps, 'variant'>) {
  const sizeClasses = {
    sm: 'h-8 w-20',
    md: 'h-10 w-24',
    lg: 'h-12 w-32',
  };

  return (
    <Skeleton
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  );
}

export { 
  Skeleton, 
  SkeletonText, 
  SkeletonCard, 
  SkeletonAvatar, 
  SkeletonButton 
}
