import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  OptimizedImage,
  Icon,
  type IconName,
} from "@/components/ui";
import { IconCircle } from "@/components/ui/icon-circle";
import { Animated } from "@/components/ui/animated";
import { cn } from "@/lib/utils";
import { ArrowRight, MapPin, Calendar, ExternalLink, TrendingDown, Tags, Star } from "@/lib/icons";
import * as icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Helper function to get icon component from string name
const getIconComponent = (name?: string): LucideIcon => {
  const Icon = icons[name as keyof typeof icons] as LucideIcon;
  return Icon || icons.Zap;
};

export interface BaseCardData {
  id: string;
  title: string;
  description: string;
  image?: string;
  href?: string;
  badges?: string[];
  locations?: string[];
  value?: string; // For stat cards
  label?: string; // For stat cards
}

export interface ServiceCardData extends BaseCardData {
  previewDescription?: string;
  availableLocations?: string[];
  slug?: string;
}

export interface OfferCardData extends BaseCardData {
  shortDescription: string;
  featuredImage: string;
  pricing: {
    display: string;
    isSpecialOffer: boolean;
    originalPrice?: string;
  };
  category: string;
  url: string;
  location?: string;
  locationDetails?: any;
  dynamicUrl?: string;
  allAvailableLocations?: any[];
  isAvailableAtSelectedLocation?: boolean;
}

export interface PricingCardData extends BaseCardData {
  name: string;
  price: string;
  subcategory?: string;
  url: string;
}

export interface BenefitCardData {
  id: string;
  title: string;
  description: string;
  icon: string; // Allow string icons like existing benefits section
}

export interface StatCardData extends BaseCardData {
  value: string;
  label: string;
  icon?: string; // Allow string icons
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export interface TestimonialCardData extends BaseCardData {
  name: string;
  location?: string;
  role?: string;
  rating: number;
  content?: string;
  quote?: string;
  service?: string;
  treatment?: string;
}

export interface CtaCardData extends BaseCardData {
  buttonText: string;
  buttonLink: string;
}

type CardData = ServiceCardData | OfferCardData | PricingCardData | BenefitCardData | StatCardData | TestimonialCardData | CtaCardData;

interface CardFeatures {
  showImage?: boolean;
  showBadges?: boolean;
  showLocations?: boolean;
  showPricing?: boolean;
  showBooking?: boolean;
  showAnimation?: boolean;
  showLocationSelector?: boolean;
}

interface CardStyling {
  aspectRatio?: 'square' | '3/2' | '4/3' | '16/9';
  imagePosition?: 'top' | 'left' | 'background';
  contentAlign?: 'left' | 'center';
}

interface UniversalCardProps {
  data: CardData;
  variant?: "service" | "offer" | "pricing" | "benefit" | "stat" | "testimonial" | "cta";
  layout?: "default" | "compact" | "featured" | "minimal";
  features?: CardFeatures;
  styling?: CardStyling;
  className?: string;
  index?: number; // For staggered animations
}

// Helper function to calculate discount percentage
function calculateDiscountPercentage(originalPrice: string, discountPrice: string): number {
  const original = parseFloat(originalPrice.replace(/[^0-9.]/g, ""));
  const discount = parseFloat(discountPrice.replace(/[^0-9.]/g, ""));
  return Math.round(((original - discount) / original) * 100);
}

// Badge styling helper
function getBadgeStyle(badge: string): string {
  if (badge.includes("New Client")) {
    return "bg-blue-600 text-white border-blue-400";
  } else if (badge.includes("Limited Time")) {
    return "bg-purple-600 text-white border-purple-400";
  } else if (badge.includes("Seasonal")) {
    return "bg-amber-500 text-white border-amber-400";
  } else if (badge.includes("Holiday")) {
    return "bg-red-600 text-white border-red-400";
  } else if (badge.includes("Best Seller")) {
    return "bg-emerald-600 text-white border-emerald-400";
  } else if (badge.includes("Customer Favorite")) {
    return "bg-pink-600 text-white border-pink-400";
  } else {
    return "bg-secondary text-secondary-foreground border-border";
  }
}

/**
 * Universal card component that handles all card types with consistent styling
 * Consolidates ServiceCard, OfferCard, PricingCard, and BenefitCard logic
 */
export function UniversalCard({
  data,
  variant = "service",
  layout = "default",
  features = {},
  styling = {},
  className,
  index = 0,
}: UniversalCardProps) {
  const {
    showImage = true,
    showBadges = true,
    showLocations = true,
    showPricing = true,
    showBooking = true,
    showAnimation = true,
    showLocationSelector = false,
  } = features;

  const {
    aspectRatio = '3/2',
    imagePosition = 'top',
    contentAlign = 'left',
  } = styling;

  const isCompact = layout === "compact";
  const [selectedCardLocation, setSelectedCardLocation] = useState<string>("Downtown");

  const CardWrapper = showAnimation 
    ? ({ children }: { children: React.ReactNode }) => (
        <Animated variant="fade" timing="normal" customDelay={index * 100}>
          {children}
        </Animated>
      )
    : ({ children }: { children: React.ReactNode }) => <>{children}</>;

  // Service Card Variant
  if (variant === "service") {
    const serviceData = data as ServiceCardData;
    const imageUrl = serviceData.image || '';
    
    return (
      <CardWrapper>
        <Card variant="service" className={cn("h-full group", className)}>
          {showImage && imageUrl && (
            <div
              className={cn(
                "relative overflow-hidden",
                aspectRatio === 'square' ? "aspect-square" : 
                aspectRatio === '4/3' ? "aspect-[4/3]" : 
                aspectRatio === '16/9' ? "aspect-[16/9]" : "aspect-[3/2]",
              )}
            >
              <Image
                src={imageUrl}
                alt={serviceData.title}
                fill
                className="object-cover transition-all duration-500 group-hover:brightness-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          <CardHeader
            className={cn("pb-3", isCompact ? "p-3 sm:p-4" : "p-4 sm:p-6")}
          >
            <CardTitle
              className={cn(
                "leading-tight text-foreground group-hover:text-primary transition-colors duration-200",
                isCompact ? "text-base sm:text-lg" : "text-lg sm:text-xl",
              )}
            >
              {serviceData.title}
            </CardTitle>
          </CardHeader>

          <CardContent
            className={cn(
              "flex-1 flex flex-col",
              isCompact ? "p-3 sm:p-4 pt-0" : "p-4 sm:p-6 pt-0",
            )}
          >
            <p
              className={cn(
                "text-muted-foreground leading-relaxed flex-1 mb-4 sm:mb-6",
                isCompact
                  ? "text-xs sm:text-sm line-clamp-2"
                  : "text-sm line-clamp-3",
              )}
            >
              {serviceData.previewDescription || serviceData.description}
            </p>

            {showLocations &&
              serviceData.availableLocations &&
              serviceData.availableLocations.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                  {serviceData.availableLocations.map((location) => (
                    <Badge
                      key={location}
                      variant="primary-light"
                      className="px-2 py-1"
                    >
                      <MapPin className="h-3 w-3" aria-hidden="true" />
                      {location
                        .replace("-", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Badge>
                  ))}
                </div>
              )}

            {showBooking && (
              <Button
                asChild
                className="w-full mt-auto group/button"
                size={isCompact ? "sm" : undefined}
              >
                <Link
                  href={serviceData.href || `/services/${serviceData.slug || serviceData.id}`}
                  className="flex items-center justify-center gap-2"
                  aria-label={`Learn more about ${serviceData.title}`}
                >
                  Explore {serviceData.title}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </CardWrapper>
    );
  }
  // Offer Card Variant
  if (variant === "offer") {
    const offerData = data as OfferCardData;
    const discountPercentage = offerData.pricing.isSpecialOffer && offerData.pricing.originalPrice
      ? calculateDiscountPercentage(offerData.pricing.originalPrice, offerData.pricing.display)
      : 0;

    return (
      <CardWrapper>
        <Card className="border border-border bg-card overflow-hidden rounded-lg h-full flex flex-col">
          {showImage && (
            <div
              className="relative overflow-hidden flex-shrink-0 group"
              style={{ height: "16rem" }}
            >
              <Image
                src={offerData.featuredImage}
                alt={offerData.title}
                fill
                className="object-cover transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Category badge - top left */}
              <div className="absolute top-2 left-2 z-20">
                <Badge
                  variant="secondary"
                  className="bg-primary shadow-md text-primary-foreground text-xs font-small px-3 py-1.5 border border-border/20"
                >
                  {offerData.category}
                </Badge>
              </div>

              {/* Discount Badge - top right */}
              {discountPercentage > 0 && (
                <div className="absolute top-2 right-2 z-20">
                  <Badge className="bg-destructive shadow-md text-destructive-foreground text-xs font-bold px-3 py-1.5 border border-border/20">
                    <Tags className="h-3 w-3 mr-1.5" />
                    {discountPercentage}% OFF
                  </Badge>
                </div>
              )}

              {/* Offer badges - bottom right */}
              {showBadges && offerData.badges && offerData.badges.length > 0 && (
                <div className="absolute bottom-2 right-2 flex flex-wrap gap-1.5 max-w-[60%] justify-end z-20">
                  {offerData.badges.map((badge, index) => (
                    <span
                      key={index}
                      className={`inline-flex shadow-md rounded-md text-xs px-3 py-1 leading-none border ${getBadgeStyle(badge)}`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              {/* Location overlay - bottom left */}
              {showLocations && (
                <div className="absolute bottom-2 left-2 bg-background/75 backdrop-blur-md rounded px-2 py-1 max-w-[60%] border border-foreground/10">
                  <div className="flex items-center gap-1 text-xs text-foreground">
                    <MapPin className="h-2 w-2 text-foreground flex-shrink-0" />
                    <span className="font-medium truncate">
                      {offerData.location || "Multiple Locations"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Card Content */}
          <div className="flex flex-col flex-grow p-3 sm:p-4">
            {/* Title and Description */}
            <div className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3">
              <h3 className="text-sm sm:text-base font-bold text-card-foreground hover:text-primary leading-tight line-clamp-2">
                {offerData.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {offerData.shortDescription}
              </p>
            </div>

            {/* Pricing Section */}
            {showPricing && (
              <div className="bg-muted/30 border border-border rounded p-2 sm:p-2.5 mb-2 sm:mb-3 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1 sm:gap-1.5">
                    <span className="text-base sm:text-lg font-bold text-primary">
                      {offerData.pricing.display}
                    </span>
                    {offerData.pricing.isSpecialOffer && offerData.pricing.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        {offerData.pricing.originalPrice}
                      </span>
                    )}
                  </div>
                  {offerData.pricing.isSpecialOffer && offerData.pricing.originalPrice && (
                    <div className="text-right">
                      <div className="text-xs font-bold text-success flex items-center gap-0.5">
                        <TrendingDown className="h-2.5 w-2.5" />
                        Save $
                        {(
                          parseFloat(offerData.pricing.originalPrice.replace(/[^0-9.]/g, "")) -
                          parseFloat(offerData.pricing.display.replace(/[^0-9.]/g, ""))
                        ).toFixed(2)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Spacer to push button to bottom */}
            <div className="flex-grow" />

            {/* Booking Button */}
            {showBooking && (
              <Button
                size="sm"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 rounded shadow-sm transition-all duration-200"
                asChild
              >
                <a
                  href={offerData.dynamicUrl || offerData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5"
                  aria-label={`Book appointment for ${offerData.title}`}
                >
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="text-xs">Book Now</span>
                </a>
              </Button>
            )}
          </div>
        </Card>
      </CardWrapper>
    );
  }
  // Pricing Card Variant
  if (variant === "pricing") {
    const pricingData = data as PricingCardData;
    return (
      <CardWrapper>
        <Card className={cn("h-full border border-border bg-card", className)}>
          <CardHeader
            className={cn("pb-3", isCompact ? "p-3 sm:p-4" : "p-4 sm:p-6")}
          >
            <div className="space-y-2">
              <h3
                className={cn(
                  "font-semibold text-foreground leading-tight",
                  isCompact ? "text-xs sm:text-sm" : "text-sm sm:text-base",
                )}
              >
                {pricingData.name}
              </h3>

              {pricingData.subcategory && (
                <Badge variant="secondary" className="text-xs w-fit">
                  {pricingData.subcategory}
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent
            className={cn(
              "pt-0 flex flex-col justify-between h-full",
              isCompact ? "p-3 sm:p-4 pt-0" : "p-4 sm:p-6 pt-0",
            )}
          >
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <span
                  className={cn(
                    "font-bold text-primary",
                    isCompact ? "text-base sm:text-lg" : "text-lg sm:text-xl",
                  )}
                >
                  {pricingData.price}
                </span>
              </div>
            </div>

            {showBooking && (
              <div className="space-y-2">
                <Button
                  asChild
                  className="w-full"
                  size={isCompact ? "sm" : undefined}
                >
                  <Link href={pricingData.url} className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Book Now
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                  size={isCompact ? "sm" : undefined}
                >
                  <Link href={pricingData.url} className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Learn More
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </CardWrapper>
    );
  }  // Benefit Card Variant
  if (variant === "benefit") {
    const benefitData = data as BenefitCardData;
    const IconComponent = getIconComponent(benefitData.icon);
    return (
      <CardWrapper>
        <Card
          variant="default"
          className={cn("h-full flex flex-col text-center", className)}
        >
          <CardHeader>
            <div className="mb-4">
              <IconCircle icon={IconComponent} size="md" />
            </div>
            <CardTitle>{benefitData.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {benefitData.description}
            </p>
          </CardContent>
        </Card>
      </CardWrapper>
    );
  }

  // Stat Card Variant
  if (variant === "stat") {
    const statData = data as StatCardData;
    const IconComponent = statData.icon ? getIconComponent(statData.icon) : null;
    return (
      <CardWrapper>
        {layout === "minimal" ? (
          <div className="text-center space-y-2 relative">
            {IconComponent && <IconCircle icon={IconComponent} size="md" className="mx-auto mb-3 sm:mb-4" />}
            <div className="text-3xl md:text-4xl font-bold text-foreground">
              {statData.value}
            </div>
            <div className="text-sm font-medium text-foreground">{statData.label}</div>
            {statData.description && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {statData.description}
              </p>
            )}
            {statData.trend && statData.trendValue && (
              <Badge
                variant={
                  statData.trend === "up"
                    ? "default"
                    : statData.trend === "down"
                      ? "destructive"
                      : "secondary"
                }
                className="mt-2"
              >
                <span aria-hidden="true">
                  {statData.trend === "up" ? "↗" : statData.trend === "down" ? "↘" : "→"}{" "}
                </span>
                <span className="sr-only">
                  {statData.trend === "up"
                    ? "Trending up"
                    : statData.trend === "down"
                      ? "Trending down"
                      : "Trending neutral"}
                </span>
                {statData.trendValue}
              </Badge>
            )}
          </div>        ) : layout === "compact" ? (
          <Card className="text-center">
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-2 sm:space-y-3">
                {IconComponent && <IconCircle icon={IconComponent} size="md" className="mx-auto" />}
                <div className="text-3xl md:text-4xl font-bold text-foreground">
                  {statData.value}
                </div>
                <div className="text-sm font-medium text-foreground">
                  {statData.label}
                </div>
                {statData.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {statData.description}
                  </p>
                )}
                {statData.trend && statData.trendValue && (
                  <Badge
                    variant={
                      statData.trend === "up"
                        ? "default"
                        : statData.trend === "down"
                          ? "destructive"
                          : "secondary"
                    }
                    className="mt-2"
                  >
                    <span aria-hidden="true">
                      {statData.trend === "up" ? "↗" : statData.trend === "down" ? "↘" : "→"}{" "}
                    </span>
                    <span className="sr-only">
                      {statData.trend === "up"
                        ? "Trending up"
                        : statData.trend === "down"
                          ? "Trending down"
                          : "Trending neutral"}
                    </span>
                    {statData.trendValue}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          // Default stat variant
          <div className="text-center space-y-2 sm:space-y-3">
            {IconComponent && <IconCircle icon={IconComponent} size="md" className="mx-auto mb-3 sm:mb-4" />}
            <div className="text-3xl md:text-4xl font-bold text-foreground">
              {statData.value}
            </div>
            <div className="text-sm font-medium text-foreground">{statData.label}</div>
            {statData.description && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {statData.description}
              </p>
            )}
            {statData.trend && statData.trendValue && (
              <Badge
                variant={
                  statData.trend === "up"
                    ? "default"
                    : statData.trend === "down"
                      ? "destructive"
                      : "secondary"
                }
                className="mt-2"
              >
                <span aria-hidden="true">
                  {statData.trend === "up" ? "↗" : statData.trend === "down" ? "↘" : "→"}{" "}
                </span>
                <span className="sr-only">
                  {statData.trend === "up"
                    ? "Trending up"
                    : statData.trend === "down"
                      ? "Trending down"
                      : "Trending neutral"}
                </span>
                {statData.trendValue}
              </Badge>
            )}
          </div>
        )}
      </CardWrapper>
    );
  }

  // Testimonial Card Variant
  if (variant === "testimonial") {
    const testimonialData = data as TestimonialCardData;
    const testimonialText = testimonialData.content || testimonialData.quote || "";
    return (
      <CardWrapper>
        <Card className="h-full border border-border bg-card">
          <CardContent className="p-4 sm:p-6 flex flex-col h-full">
            <div
              className="flex items-center gap-1 mb-3 sm:mb-4"
              role="img"
              aria-label={`Rating: ${testimonialData.rating} out of 5 stars`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < testimonialData.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300",
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            <blockquote className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed line-clamp-3 text-xs sm:text-sm md:text-base">
              "{testimonialText}"
            </blockquote>
            <div className="mt-auto">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground text-sm truncate">
                    {testimonialData.name}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {testimonialData.location || testimonialData.role || ""}
                  </div>
                </div>
                {(testimonialData.service || testimonialData.treatment) && (
                  <Badge
                    variant="outline"
                    className="text-xs mt-1 h-5 border-primary/20"
                  >
                    {testimonialData.service || testimonialData.treatment}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </CardWrapper>
    );
  }

  // CTA Card Variant
  if (variant === "cta") {
    const ctaData = data as CtaCardData;
    return (
      <CardWrapper>
        <Card
          className={cn(
            "bg-primary text-primary-foreground overflow-hidden",
            className,
          )}
        >
          <div className="relative p-6 sm:p-8">
            <div className="relative z-10 space-y-4">
              <CardTitle className="text-2xl font-bold">{ctaData.title}</CardTitle>
              <p className="text-primary-foreground/90">
                {ctaData.description}
              </p>
              <Button variant="secondary" className="group" asChild>
                <Link href={ctaData.buttonLink}>
                  {ctaData.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </CardWrapper>
    );
  }

  // Default fallback
  return (
    <CardWrapper>
      <Card className={cn("h-full", className)}>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-2">{data.title}</h3>
          <p className="text-muted-foreground">{data.description}</p>
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
