import { unstable_cache } from "next/cache";
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

// Export the generateStaticParams function for static generation optimization
export { generateStaticParams };

interface ServicePageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: Readonly<ServicePageProps>): Promise<Metadata> {
  const { slug } = params;
  const service = getServiceOrNotFound(slug);

  return generateServicePageMetadata({
    serviceName: service.title,
    serviceDescription: service.metaDescription || service.previewDescription,
    serviceKeywords: service.keywords,
    imageUrl: service.image,
    slug: slug,
    benefits: service.benefits,
    locationSpecific: true,
  });
}

// Use unstable_cache with Next.js 15 optimizations
export const getServiceWithEnhancedData = unstable_cache(
  async (slug: string) => {
    const service = getServiceOrNotFound(slug);
    
    // Fetch related data in parallel with AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    try {
      const [relatedServices, serviceTestimonials] = await Promise.all([
        getRelatedServices(slug, 3),
        getServiceTestimonials(slug),
      ]);
      
      clearTimeout(timeoutId);

      // Generate schemas with proper typing
      const organizationSchema = generateOrganizationSchema();
      const serviceSchema = generateServiceSchema(service);
      const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "https://vivispa.ca" },
        { name: "Services", url: "https://vivispa.ca/services" },
        { name: service.title, url: `https://vivispa.ca/services/${service.slug}` },
      ]);
      const faqSchema = service.faqs?.length 
        ? generateFAQSchema(service.faqs) 
        : null;

      const formattedBenefits = service.benefits.map((benefit: string) => ({
        id: benefit.replace(/\s+/g, '-').toLowerCase(),
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
          ...(faqSchema && { faq: faqSchema }),
        },
      };
    } catch (error) {
      // Handle timeout or other errors gracefully
      console.error(`Error fetching service data for ${slug}:`, error);
      
      // Return partial data if service is available
      return {
        service,
        relatedServices: [],
        serviceTestimonials: [],
        formattedBenefits: service.benefits.map((benefit: string) => ({
          id: benefit.replace(/\s+/g, '-').toLowerCase(),
          title: benefit,
          description: `Experience ${benefit.toLowerCase()} with our treatment.`,
          icon: "Zap",
        })),
        schemas: {
          organization: generateOrganizationSchema(),
          service: generateServiceSchema(service),
          breadcrumb: generateBreadcrumbSchema([
            { name: "Home", url: "https://vivispa.ca" },
            { name: "Services", url: "https://vivispa.ca/services" },
            { name: service.title, url: `https://vivispa.ca/services/${service.slug}` },
          ]),
        },
      };
    } finally {
      clearTimeout(timeoutId);
    }
  },
  ["service-data"],
  {
    revalidate: 3600, // Revalidate every hour
    tags: ["services"],
  }
); 