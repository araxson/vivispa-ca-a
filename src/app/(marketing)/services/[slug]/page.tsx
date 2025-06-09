// This file is now the Server Component for the route
// "use client"; // Removed: This is a Server Component

// This file is now the Server Component for the route
import { cache } from "react"; // For getServiceWithEnhancedData
import type { Metadata } from "next"; // For generateMetadata
import {
  getServiceOrNotFound,
  generateServiceStaticParams as originalGenerateStaticParams, // Renaming to avoid conflict if any local one defined
  getRelatedServices,
  getServiceTestimonials,
} from "@/lib/data-fetcher";
import {
  generateOrganizationSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateServicePageMetadata,
} from "@/app/metadata";

import ServicePageClient from "./service-page-client"; // Import the refactored client component

// Re-export generateStaticParams if it's directly from data-fetcher or define locally
export const generateStaticParams = originalGenerateStaticParams;

interface PageProps {
  params: { slug: string };
  // searchParams?: { [key: string]: string | string[] | undefined };
}

// Moved from page.server.tsx
export const getServiceWithEnhancedData = cache((slug: string) => {
  const service = getServiceOrNotFound(slug);
  const relatedServices = getRelatedServices(slug, 3);
  const serviceTestimonials = getServiceTestimonials(slug);

  const organizationSchema = generateOrganizationSchema();
  const serviceSchema = generateServiceSchema(service);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://vivispa.ca" },
    { name: "Services", url: "https://vivispa.ca/services" },
    { name: service.title, url: `https://vivispa.ca/services/${service.slug}` },
  ]);
  const faqSchema = generateFAQSchema(service.faqs);

  const formattedBenefits = service.benefits.map((benefit: string) => ({
    id: benefit,
    title: benefit,
    description: `Enjoy the benefit of ${benefit.toLowerCase()} with our advanced treatment technology.`,
    icon: "Zap",
  }));

  return {
    service,
    relatedServices,
    serviceTestimonials,
    formattedBenefits,
    schemas: {
      organization: organizationSchema,
      service: serviceSchema,
      breadcrumb: breadcrumbSchema,
      faq: faqSchema,
    },
  };
});

// Moved from page.server.tsx
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // Ensure PageProps is used here if it matches
  const { slug } = params;
  const service = getServiceOrNotFound(slug); // Or use getServiceWithEnhancedData(slug).service

  return generateServicePageMetadata({
    serviceName: service.title,
    serviceDescription: service.metaDescription,
    serviceKeywords: service.keywords,
    imageUrl: service.image,
    slug: slug,
    benefits: service.benefits,
    locationSpecific: true,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  // Fetch data on the server
  const serviceData = getServiceWithEnhancedData(slug);

  // Pass the fetched data to the Client Component
  return <ServicePageClient params={params} serviceData={serviceData} />;
}
