"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import type { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import {
  getOptimizedImageProps,
  imageSizeConfigs,
  ImagePerformanceMonitor,
  generateImageAlt,
  getOptimalQuality,
} from "@/lib/image-optimization";

interface OptimizedImageProps
  extends Omit<ImageProps, "onLoad" | "onError" | "quality" | "sizes"> {
  fallbackSrc?: string;
  aspectRatio?: "square" | "video" | "portrait" | "landscape" | string;
  containerClassName?: string;
  showSkeleton?: boolean;
  imageType?: "hero" | "content" | "thumbnail" | "avatar";
  context?: string;
  onLoadComplete?: () => void;
  onError?: () => void;
}

/**
 * Enhanced image component with optimized loading and error handling
 */
export function OptimizedImage({
  src,
  alt,
  fallbackSrc = "/images/placeholder.webp",
  aspectRatio = "video",
  containerClassName,
  className,
  showSkeleton = true,
  imageType = "content",
  context,
  onLoadComplete,
  onError,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  const [loadStartTime] = useState(Date.now());

  // Extract string src for optimization utilities
  const srcString =
    typeof imageSrc === "string"
      ? imageSrc
      : typeof imageSrc === "object" && "src" in imageSrc
        ? imageSrc.src
        : String(imageSrc);

  // Generate quality for the image type
  const quality = getOptimalQuality(imageType);
  const sizes =
    imageSizeConfigs[imageType as keyof typeof imageSizeConfigs] ||
    imageSizeConfigs.card;
  const optimizedAlt = context ? generateImageAlt(context, alt) : alt;

  const handleLoad = useCallback(() => {
    setIsLoading(false);

    // Record performance metrics
    const loadTime = Date.now() - loadStartTime;
    ImagePerformanceMonitor.getInstance().recordLoadTime(srcString, loadTime);

    onLoadComplete?.();
  }, [onLoadComplete, srcString, loadStartTime]);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(false); // Reset error state for fallback attempt
    }
    onError?.();
  }, [fallbackSrc, imageSrc, onError]);

  const getAspectRatioClass = (ratio: string) => {
    switch (ratio) {
      case "square":
        return "aspect-square";
      case "video":
        return "aspect-video";
      case "portrait":
        return "aspect-[3/4]";
      case "landscape":
        return "aspect-[4/3]";
      default:
        return ratio.startsWith("aspect-") ? ratio : `aspect-[${ratio}]`;
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        getAspectRatioClass(aspectRatio),
        containerClassName,
      )}
    >
      {/* Loading skeleton */}
      {isLoading && showSkeleton && (
        <div
          className="absolute inset-0 bg-muted animate-pulse rounded-md"
          aria-hidden="true"
        />
      )}

      {/* Optimized Image */}
      <Image
        src={imageSrc}
        alt={optimizedAlt}
        quality={quality}
        sizes={sizes}
        priority={priority}
        fill
        className={cn(
          "object-cover transition-opacity duration-200",
          isLoading ? "opacity-0" : "opacity-100",
          className,
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />

      {/* Error state */}
      {hasError && imageSrc === fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center text-muted-foreground">
            <div className="text-2xl mb-2" aria-hidden="true">
              📷
            </div>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * High-performance image for hero sections with WebP/AVIF support
 */
interface HeroImageProps extends OptimizedImageProps {
  blur?: boolean;
  overlay?: boolean;
  overlayClassName?: string;
}

export function HeroImage({
  blur = false,
  overlay = false,
  overlayClassName,
  className,
  ...props
}: HeroImageProps) {
  return (
    <div className="relative w-full h-full">
      <OptimizedImage
        priority
        imageType="hero"
        className={cn(blur && "blur-sm", className)}
        {...props}
      />
      {overlay && (
        <div
          className={cn("absolute inset-0 bg-foreground/20", overlayClassName)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/**
 * Lazy loading image for content sections
 */
export function LazyImage(props: OptimizedImageProps) {
  return <OptimizedImage loading="lazy" imageType="content" {...props} />;
}

/**
 * Avatar image with optimized sizes
 */
interface AvatarImageProps extends OptimizedImageProps {
  size?: "sm" | "md" | "lg" | "xl";
}

export function AvatarImage({
  size = "md",
  aspectRatio = "square",
  ...props
}: AvatarImageProps) {
  return (
    <OptimizedImage
      aspectRatio={aspectRatio}
      imageType="avatar"
      className="rounded-full"
      showSkeleton={false}
      {...props}
    />
  );
}

/**
 * Gallery image with optimized loading
 */
export function GalleryImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      loading="lazy"
      imageType="thumbnail"
      containerClassName="group"
      className="transition-transform duration-150"
      {...props}
    />
  );
}

/**
 * Service preview image with SEO optimization
 */
interface ServiceImageProps extends OptimizedImageProps {
  serviceName: string;
}

export function ServiceImage({
  serviceName,
  alt,
  context,
  ...props
}: ServiceImageProps) {
  const optimizedAlt = generateImageAlt(
    context || "Service",
    alt || serviceName,
    "Vivi Aesthetics & Spa",
  );

  return (
    <OptimizedImage
      alt={optimizedAlt}
      context={context || `${serviceName} service`}
      imageType="content"
      {...props}
    />
  );
}
