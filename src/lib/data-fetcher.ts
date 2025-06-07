import { cache } from "react";
import { notFound } from "next/navigation";
import { Service } from "@/types/service";
import { OfferItem } from "@/data/pricing/offers";
import { hydrofacialService } from "@/data/services/hydrofacial";
import { eyelashExtensionsService } from "@/data/services/eyelash-extensions";
import { iplPhotofacial } from "@/data/services/ipl-photofacial";
import { japaneseHeadSpaService } from "@/data/services/japanese-head-spa";
import { laserHairRemovalService } from "@/data/services/laser-hair-removal";
import { laserPigmentationRemovalService } from "@/data/services/laser-pigmentation-removal";
import { laserSkinTighteningService } from "@/data/services/laser-skin-tightening";
import { microneedlingService } from "@/data/services/microneedling";
import { skinTagRemovalService } from "@/data/services/skin-tag-removal";
import { vascularVeinRemovalService } from "@/data/services/vascular-vein-removal";

// Import all the data modules
import {
  consolidatedOffers,
  AVAILABLE_LOCATIONS,
} from "@/data/pricing/offers";
import { testimonials, getTestimonialsByService } from "@/data/testimonials";

const services: Service[] = [
  hydrofacialService,
  eyelashExtensionsService,
  iplPhotofacial,
  japaneseHeadSpaService,
  laserHairRemovalService,
  laserPigmentationRemovalService,
  laserSkinTighteningService,
  microneedlingService,
  skinTagRemovalService,
  vascularVeinRemovalService,
];

/**
 * Performance-optimized data fetcher with Next.js 15 cache function
 * Enhanced for SSG with build-time optimization and ISR support
 */

// Enhanced cached service fetchers with ISR metadata
export const getAllServices = cache((): Service[] => {
  // Sort by popularity for consistent ordering
  return services.sort((a, b) => a.popularityRank - b.popularityRank);
});

export const getServiceBySlug = cache((slug: string): Service | undefined => {
  return services.find((service) => service.slug === slug);
});

export const getServiceById = cache((id: string): Service | undefined => {
  return services.find((service) => service.id === id);
});

export const getFeaturedServices = cache((limit?: number): Service[] => {
  const sortedServices = services.sort(
    (a, b) => a.popularityRank - b.popularityRank,
  );
  return limit ? sortedServices.slice(0, limit) : sortedServices;
});

// Enhanced cached offer fetchers with ISR metadata
export const getAllOffers = cache((): OfferItem[] => {
  return consolidatedOffers.sort((a, b) => {
    const aIsBestSeller = (a.badges || []).includes("Best Seller");
    const bIsBestSeller = (b.badges || []).includes("Best Seller");
    if (aIsBestSeller !== bIsBestSeller) return aIsBestSeller ? -1 : 1;
    return a.title.localeCompare(b.title);
  });
});

export const getOfferBySlug = cache((slug: string): OfferItem | undefined => {
  return consolidatedOffers.find((offer) => offer.slug === slug);
});

export const getAvailableOfferLocations = cache((): string[] => {
  return AVAILABLE_LOCATIONS;
});

export const getFeaturedOffers = cache((limit?: number): OfferItem[] => {
  const featured = consolidatedOffers
    .filter((offer) => (offer.badges || []).includes("Best Seller"))
    .sort((a, b) => a.title.localeCompare(b.title));
  return limit ? featured.slice(0, limit) : featured;
});

// Enhanced cached testimonial fetchers
export const getAllTestimonials = cache(() => {
  return testimonials.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
});

export const getFeaturedTestimonials = cache((limit?: number) => {
  const featured = testimonials
    .filter((testimonial) => testimonial.featured)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((testimonial) => ({
      ...testimonial,
      location: testimonial.location || "Calgary, AB",
    }));
  return limit ? featured.slice(0, limit) : featured;
});

export const getServiceTestimonials = cache((service: string) => {
  // First try to get testimonials from the testimonials.ts file
  const testimonialsFromData = getTestimonialsByService(service).map(
    (testimonial) => ({
      ...testimonial,
      location: testimonial.location || "Calgary, AB",
    }),
  );

  // If we found testimonials in the data file, return them
  if (testimonialsFromData.length > 0) {
    return testimonialsFromData;
  }

  // Otherwise, try to find the service and get its testimonials
  const serviceObject = services.find(
    (s) => s.title === service || s.slug === service || s.id === service,
  );

  if (serviceObject?.testimonials) {
    // Map the service testimonials to match the expected format
    return serviceObject.testimonials.map((testimonial) => ({
      id: testimonial.name.replace(/\s+/g, "-").toLowerCase(),
      name: testimonial.name,
      rating: testimonial.rating,
      content: testimonial.quote,
      service: testimonial.treatment || service,
      location: "Calgary, AB",
    }));
  }

  // If no testimonials are found, return an empty array
  return [];
});

/**
 * Enhanced static params generation for SSG
 * Returns params with lastModified for ISR optimization
 */
export const generateServiceStaticParams = cache(() => {
  return services.map((service) => ({
    slug: service.slug,
  }));
});

export const generateOfferStaticParams = cache(() => {
  return consolidatedOffers.map((offer) => ({
    slug: offer.slug,
  }));
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
