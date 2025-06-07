"use client";
import type { Metadata } from "next";
import { cache, Suspense } from "react";
import { default as dynamicImport } from "next/dynamic";
import { SharedCTA } from "@/components/blocks/shared-cta";

// Component imports
import {
  Hero,
  ServiceOverview,
  BenefitsSection,
  ServiceProcedure,
  ServiceResults,
} from "@/components/blocks";
import { Section, Skeleton } from "@/components/ui";

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
} from "@/app/metadata";

const ServiceGallery = dynamicImport(
  () =>
    import("@/components/blocks/service-gallery").then(
      (mod) => mod.ServiceGallery,
    ),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
  },
);

const Testimonials = dynamicImport(
  () =>
    import("@/components/blocks/testimonials").then((mod) => mod.Testimonials),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
  },
);

const FAQSection = dynamicImport(
  () => import("@/components/blocks/faq-section").then((mod) => mod.FAQSection),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
  },
);

const ServiceShowcase = dynamicImport(
  () =>
    import("@/components/blocks/service-showcase").then(
      (mod) => mod.ServiceShowcase,
    ),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
  },
);

export const dynamic = "force-static";

interface ServicePageProps {
  params: { slug: string };
}

// Performance optimized static params generation for SSG
export async function generateStaticParams() {
  return generateServiceStaticParams();
}

// Enhanced metadata generation with comprehensive SEO
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

export default function ServicePage({ params }: ServicePageProps) {
  const { slug } = params;
  const { service, relatedServices, serviceTestimonials, schemas } =
    getServiceWithEnhancedData(slug);

  return (
    <>
      {/* Comprehensive structured data for enhanced SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.organization),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.service),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumb),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.faq),
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

      <BenefitsSection
        variant="default"
        title="Treatment Benefits"
        subtitle="Experience the comprehensive benefits of this advanced treatment"
        benefits={service.benefits.map((benefit: string) => ({
          id: benefit,
          title: benefit,
          description: `Enjoy the benefit of ${benefit.toLowerCase()} with our advanced treatment technology.`,
          icon: "Zap",
        }))}
      />

      <ServiceGallery
        images={service.galleryImages.map((img: string) => ({
          id: img,
          src: img,
          alt: `${service.title} - Result`,
        }))}
        title={`${service.title} Gallery`}
      />

      {serviceTestimonials.length > 0 && (
        <Testimonials
          testimonials={serviceTestimonials}
          title={`What Our Clients Say About ${service.title}`}
          subtitle="Real experiences from our valued clients"
        />
      )}

      <FAQSection
        faqs={service.faqs}
        title="Frequently Asked Questions"
        subtitle={`Common questions about ${service.title}`}
      />

      {/* Related Services Section */}
      {relatedServices.length > 0 && (
        <ServiceShowcase
          title="Related Services"
          subtitle={`Explore other treatments that complement ${service.title}`}
          services={relatedServices}
          showLocations={true}
          spacing="lg"
          background="muted"
        />
      )}

      <SharedCTA />
    </>
  );
}
