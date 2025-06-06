/**
 * Advanced image optimization utilities for Next.js 15
 * Provides performance-optimized image loading with WebP/AVIF support
 */

export interface ImageSizes {
  mobile: number;
  tablet: number;
  desktop: number;
  xl: number;
}

export interface OptimizedImageConfig {
  src: string;
  alt: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  aspectRatio?: "square" | "video" | "portrait" | "landscape" | number;
}

/**
 * Generate optimized sizes string for responsive images
 */
export function generateImageSizes(config: {
  mobile?: number;
  tablet?: number;
  desktop?: number;
  xl?: number;
}): string {
  const { mobile = 100, tablet = 50, desktop = 33, xl = 25 } = config;

  return [
    `(max-width: 640px) ${mobile}vw`,
    `(max-width: 1024px) ${tablet}vw`,
    `(max-width: 1280px) ${desktop}vw`,
    `${xl}vw`,
  ].join(", ");
}

/**
 * Predefined size configurations for common use cases
 */
export const imageSizeConfigs = {
  hero: generateImageSizes({ mobile: 100, tablet: 100, desktop: 100, xl: 100 }),
  card: generateImageSizes({ mobile: 100, tablet: 50, desktop: 33, xl: 25 }),
  gallery: generateImageSizes({ mobile: 50, tablet: 33, desktop: 25, xl: 20 }),
  testimonial: generateImageSizes({
    mobile: 20,
    tablet: 15,
    desktop: 10,
    xl: 8,
  }),
  avatar: "64px",
  logo: "200px",
  icon: "32px",
} as const;

/**
 * Generate Next.js Image component props with optimizations
 */
export function getOptimizedImageProps(config: OptimizedImageConfig) {
  const {
    src,
    alt,
    priority = false,
    quality = 85,
    sizes = imageSizeConfigs.card,
    aspectRatio = "video",
  } = config;

  // Determine if image is above the fold (should be prioritized)
  const isAboveFold = priority;

  return {
    src,
    alt,
    quality,
    sizes,
    priority: isAboveFold,
    loading: isAboveFold ? ("eager" as const) : ("lazy" as const),
    placeholder: "blur" as const,
    blurDataURL: generateBlurDataURL(),
  };
}

/**
 * Generate a lightweight blur placeholder
 */
export function generateBlurDataURL(width = 10, height = 10): string {
  const canvas =
    typeof window !== "undefined" ? document.createElement("canvas") : null;
  if (!canvas) {
    // Server-side fallback
    return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";
  }

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // Create a simple gradient blur
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "oklch(var(--muted))");
  gradient.addColorStop(1, "oklch(var(--border))");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL("image/jpeg", 0.1);
}

/**
 * Image format detection and optimization
 */
export function getOptimalImageFormat(
  userAgent?: string,
): "avif" | "webp" | "jpeg" {
  if (typeof window === "undefined") return "webp"; // Server-side default

  // Check for AVIF support
  if (supportsImageFormat("avif")) return "avif";

  // Check for WebP support
  if (supportsImageFormat("webp")) return "webp";

  // Fallback to JPEG
  return "jpeg";
}

/**
 * Check if browser supports image format
 */
function supportsImageFormat(format: "avif" | "webp"): boolean {
  if (typeof window === "undefined") return false;

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;

  const dataUrl = canvas.toDataURL(`image/${format}`);
  return dataUrl.indexOf(`data:image/${format}`) === 0;
}

/**
 * Performance monitoring for images
 */
export class ImagePerformanceMonitor {
  private static instance: ImagePerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): ImagePerformanceMonitor {
    if (!ImagePerformanceMonitor.instance) {
      ImagePerformanceMonitor.instance = new ImagePerformanceMonitor();
    }
    return ImagePerformanceMonitor.instance;
  }

  recordLoadTime(src: string, loadTime: number): void {
    this.metrics.set(src, loadTime);
  }

  getAverageLoadTime(): number {
    if (this.metrics.size === 0) return 0;
    const total = Array.from(this.metrics.values()).reduce(
      (sum, time) => sum + time,
      0,
    );
    return total / this.metrics.size;
  }

  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }
}

/**
 * Image SEO optimization helpers
 */
export function generateImageAlt(
  context: string,
  description?: string,
  businessName = "Vivi Aesthetics & Spa",
): string {
  const parts = [context, description, businessName].filter(Boolean);
  return parts.join(" - ");
}

/**
 * Social media image optimization
 */
export const socialImageSizes = {
  openGraph: { width: 1200, height: 630 },
  twitter: { width: 1200, height: 630 },
  facebook: { width: 1200, height: 630 },
  instagram: { width: 1080, height: 1080 },
  linkedin: { width: 1200, height: 627 },
} as const;

/**
 * Critical image preloading
 */
export function preloadCriticalImages(images: string[]): void {
  if (typeof window === "undefined") return;

  images.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });
}

/**
 * Lazy loading intersection observer setup
 */
export function createImageObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {},
): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }

  return new IntersectionObserver(
    (entries) => {
      entries.forEach(callback);
    },
    {
      rootMargin: "50px 0px",
      threshold: 0.1,
      ...options,
    },
  );
}

/**
 * Image compression and quality optimization
 */
export function getOptimalQuality(
  imageType: "hero" | "content" | "thumbnail" | "avatar",
): number {
  const qualityMap = {
    hero: 90, // High quality for hero images
    content: 85, // Good quality for content images
    thumbnail: 75, // Moderate quality for thumbnails
    avatar: 80, // Good quality for avatars
  };

  return qualityMap[imageType];
}

/**
 * Generate image metadata for enhanced SEO
 */
export function generateImageMetadata(config: {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  context: string;
}) {
  const { src, alt, title, caption, context } = config;

  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    url: src,
    contentUrl: src,
    name: title || alt,
    alternateName: alt,
    caption: caption || alt,
    description: `${context} - ${alt}`,
    representativeOfPage: context.includes("hero"),
    width: "1200",
    height: "630",
    encodingFormat: "image/webp",
  };
}
