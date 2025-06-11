import { cache } from "react";
import { notFound } from "next/navigation";
import { Service, ServiceCardData } from "@/types/service";
import { OfferItem } from "@/data/pricing/offers";
import { services } from "@/data/services";
import { homePageData } from "@/data/home";

// Import all the data modules
import {
  consolidatedOffers,
  AVAILABLE_LOCATIONS,
} from "@/data/pricing/offers";
import { testimonials, getTestimonialsByService } from "@/data/testimonials";

/**
 * Performance-optimized data fetcher with Next.js 15 cache function
 * Enhanced for SSG with build-time optimization and ISR support
 */

// Enhanced cached service fetchers with ISR metadata
export const getAllServices = cache((): Service[] => {
  // Sort by popularity for consistent ordering
  return services.sort((a, b) => a.popularityRank - b.popularityRank);
});

export const getAllServiceCards = cache((): ServiceCardData[] => {
  return getAllServices().map((service) => ({
    title: service.title,
    description: service.previewDescription,
    slug: service.slug,
    image: service.image,
    benefits: service.benefits?.slice(0, 3) || [],
    isPremium: service.isPremium || false,
    status: service.status || "active",
    availableLocations: service.availableLocations || AVAILABLE_LOCATIONS,
    popularityRank: service.popularityRank,
  }));
});

export const getServiceBySlug = cache((slug: string): Service | undefined => {
  return getAllServices().find((service) => service.slug === slug);
});

export const getHomePageData = cache(() => {
  return homePageData;
});

export const getAllTestimonials = cache(() => {
  return testimonials;
});

export const getServiceTestimonials = cache((serviceSlug: string) => {
  return getTestimonialsByService(serviceSlug);
});

export const getAllOffers = cache(() => {
  return consolidatedOffers;
});

export const getOfferBySlug = cache((slug: string): OfferItem | undefined => {
  return getAllOffers().find((offer) => offer.slug === slug);
});

export const getAvailableOfferLocations = cache(() => {
  return AVAILABLE_LOCATIONS;
});

/**
 * Next.js 15 optimized data fetching with explicit static generation
 * Used for dynamically generated pages
 */
export const getServiceSlugs = cache((): string[] => {
  return getAllServices().map((service) => service.slug);
});

export const getOfferSlugs = cache((): string[] => {
  return getAllOffers().map((offer) => offer.slug);
});

/**
 * Enhanced data fetcher with structured data for SEO
 * Returns data or triggers 404 for better UX
 */
export const getServiceOrNotFound = cache((slug: string): Service => {
  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }
  return service;
});

export const getOfferOrNotFound = cache((slug: string): OfferItem => {
  const offer = getOfferBySlug(slug);
  if (!offer) {
    notFound();
  }
  return offer;
});

/**
 * Enhanced search with performance optimization
 */
export const searchServices = cache((query: string): Service[] => {
  const lowercaseQuery = query.toLowerCase().trim();
  if (!lowercaseQuery) return [];

  return services
    .filter(
      (service) =>
        service.title.toLowerCase().includes(lowercaseQuery) ||
        service.previewDescription.toLowerCase().includes(lowercaseQuery) ||
        service.keywords.some((keyword) =>
          keyword.toLowerCase().includes(lowercaseQuery),
        ),
    )
    .sort((a, b) => {
      // Prioritize exact title matches
      const aExact = a.title.toLowerCase() === lowercaseQuery;
      const bExact = b.title.toLowerCase() === lowercaseQuery;
      if (aExact !== bExact) return aExact ? -1 : 1;

      // Then prioritize title start matches
      const aStarts = a.title.toLowerCase().startsWith(lowercaseQuery);
      const bStarts = b.title.toLowerCase().startsWith(lowercaseQuery);
      if (aStarts !== bStarts) return aStarts ? -1 : 1;

      // Finally sort alphabetically
      return a.title.localeCompare(b.title);
    });
});

/**
 * Enhanced metrics for monitoring and optimization
 */
export const getDataMetrics = cache(() => {
  const now = new Date();
  return {
    totalServices: services.length,
    totalOffers: consolidatedOffers.length,
    totalTestimonials: testimonials.length,
    featuredOffers: consolidatedOffers.filter((o) =>
      (o.badges || []).includes("Best Seller"),
    ).length,
    featuredTestimonials: testimonials.filter((t) => t.featured).length,
    lastUpdated: now.toISOString(),
    buildTime: now.getTime(),
  };
});

// Cached function to get featured service cards for the home page
export const getHomePageFeaturedServiceCards = cache((): ServiceCardData[] => {
  const mappedServices: (ServiceCardData | null)[] = homePageData.featuredServices
    .map((serviceHighlight): ServiceCardData | null => {
      // Assuming serviceHighlight.id is the slug.
      const service = getServiceBySlug(serviceHighlight.id);

      if (service) {
        // The Service type has availableLocations as required (LocationType[])
        // ServiceCardData has availableLocations as optional (LocationType[] | undefined)
        // This assignment is valid.
        return {
          id: service.id,
          title: service.title,
          slug: service.slug,
          previewDescription: service.previewDescription,
          image: service.image,
          availableLocations: service.availableLocations,
        };
      }
      return null; // Service not found
    });

  return mappedServices.filter((cardData): cardData is ServiceCardData => cardData !== null);
});

/**
 * Get related services for cross-promotion
 */
export const getRelatedServices = cache(
  (currentSlug: string, limit: number = 3): Service[] => {
    const currentService = getServiceBySlug(currentSlug);
    if (!currentService) return [];

    // Use relatedServiceIds if available, otherwise return featured services
    if (
      currentService.relatedServiceIds &&
      currentService.relatedServiceIds.length > 0
    ) {
      return services
        .filter((service) =>
          currentService.relatedServiceIds.includes(service.id),
        )
        .slice(0, limit);
    }

    // Fallback to popular services excluding current
    return services
      .filter((service) => service.slug !== currentSlug)
      .sort((a, b) => a.popularityRank - b.popularityRank)
      .slice(0, limit);
  },
);

/**
 * Enhanced sitemap data generation
 */
export const getSitemapData = cache(() => {
  const baseUrl = "https://vivispa.ca";
  const now = new Date();

  return {
    services: services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: service.popularityRank <= 5 ? 0.9 : 0.8,
    })),
    offers: consolidatedOffers.map((offer) => ({
      url: `${baseUrl}/offers/${offer.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: (offer.badges || []).includes("Best Seller") ? 0.8 : 0.7,
    })),
    static: [
      {
        url: baseUrl,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/services`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/offers`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
    ],
  };
});
