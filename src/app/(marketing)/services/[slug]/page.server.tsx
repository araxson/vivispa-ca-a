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

  // Pass the entire service object and locationSpecific flag
  return generateServicePageMetadata(service, true);
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
    formattedBenefits, // Added new property
    schemas: {
      organization: organizationSchema,
      service: serviceSchema,
      breadcrumb: breadcrumbSchema,
      faq: faqSchema,
    },
  };
}); 