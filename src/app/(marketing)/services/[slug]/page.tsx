import type { Metadata } from "next";
import { cache } from "react";
import { Suspense } from "react";
import { SharedCTA } from "@/components/blocks/shared-cta";

// Component imports
import {
  Hero,
  ServiceOverview,
  FeaturesSection,
  ServiceProcedure,
  ServiceGallery,
  ServiceResults,
  FAQSection,
  Testimonials,
  ServiceShowcase,
} from "@/components/blocks";
import { Section } from "@/components/ui";

// Data and utilities
import {
  getServiceOrNotFound,
  generateServiceStaticParams,
  getRelatedServices,
  getServiceTestimonials,
} from "@/lib/data-fetcher";
import {
  generateServicePageMetadata,
  generateOrganizationSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateJsonLdScript,
} from "@/app/metadata";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

// Performance optimized static params generation for SSG
export async function generateStaticParams() {
  return generateServiceStaticParams();
}

// Enhanced metadata generation with comprehensive SEO
export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
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

// Enhanced cached service data with comprehensive schema
const getServiceWithEnhancedData = cache((slug: string) => {
  const service = getServiceOrNotFound(slug);
  const relatedServices = getRelatedServices(slug, 3);
  const serviceTestimonials = getServiceTestimonials(slug);

  // Generate comprehensive structured data
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

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const { service, relatedServices, serviceTestimonials, schemas } =
    getServiceWithEnhancedData(slug);

  return (
    <>
      {/* Comprehensive structured data for enhanced SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateJsonLdScript(schemas.organization),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateJsonLdScript(schemas.service),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateJsonLdScript(schemas.breadcrumb),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateJsonLdScript(schemas.faq),
        }}
      />

      <Hero
        title={service.title}
        description={service.fullDescription}
        heroType={service.heroType || "image"}
        backgroundImage={
          service.image
            ? {
                src: service.image,
                alt: service.title,
              }
            : undefined
        }
        backgroundVideo={service.heroVideo}
      />

      <Suspense fallback={<div className="h-96 bg-muted" />}>
        <ServiceOverview
          overview={service.overview}
          benefits={service.benefits}
          sessionInfo={{
            recommended: 3,
            interval: "4-6 weeks",
          }}
        />
      </Suspense>

      <FeaturesSection
        variant="benefits"
        title="Treatment Benefits"
        subtitle="Experience the comprehensive benefits of this advanced treatment"
        features={service.benefits.map((benefit: string) => ({
          title: benefit,
          description: `${benefit} with our advanced treatment technology.`,
        }))}
      />

      <Suspense fallback={<div className="h-64 bg-muted" />}>
        <ServiceGallery
          images={service.galleryImages.map((img: string, index: number) => ({
            id: `gallery-${index}`,
            src: img,
            alt: `${service.title} - Result ${index + 1}`,
          }))}
          title={`${service.title} Gallery`}
        />
      </Suspense>

      {serviceTestimonials.length > 0 && (
        <Suspense fallback={<div className="h-64 bg-muted" />}>
          <Testimonials
            testimonials={serviceTestimonials}
            title={`What Our Clients Say About ${service.title}`}
            subtitle="Real experiences from our valued clients"
          />
        </Suspense>
      )}

      <FAQSection
        faqs={service.faqs}
        title="Frequently Asked Questions"
        subtitle={`Common questions about ${service.title}`}
      />

      {/* Related Services Section */}
      {relatedServices.length > 0 && (
        <Suspense fallback={<div className="h-64 bg-muted" />}>
          <ServiceShowcase
            title="Related Services"
            subtitle={`Explore other treatments that complement ${service.title}`}
            services={relatedServices}
            showLocations={true}
            spacing="lg"
            background="muted"
          />
        </Suspense>
      )}

      <SharedCTA />
    </>
  );
}
