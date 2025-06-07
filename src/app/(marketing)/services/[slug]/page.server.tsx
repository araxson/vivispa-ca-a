import { cache } from "react";
import {
  getServiceOrNotFound,
  generateServiceStaticParams as generateStaticParams,
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
import type { Metadata } from "next";

export { generateStaticParams };

interface ServicePageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = params;
  const service = getServiceOrNotFound(slug);

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

  return {
    service,
    relatedServices,
    serviceTestimonials,
    schemas: {
      organization: organizationSchema,
      service: serviceSchema,
      breadcrumb: breadcrumbSchema,
      faq: faqSchema,
    },
  };
}); 