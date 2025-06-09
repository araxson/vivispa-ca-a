"use client";
import { Suspense, use } from "react";
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
import { getServiceWithEnhancedData } from "./page.server";

const ServiceGallery = dynamicImport(
  () =>
    import("@/components/blocks/service-gallery").then(
      (mod) => mod.ServiceGallery
    ),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
  }
);

const Testimonials = dynamicImport(
  () =>
    import("@/components/blocks/testimonials").then((mod) => mod.Testimonials),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
  }
);

const FAQSection = dynamicImport(
  () => import("@/components/blocks/faq-section").then((mod) => mod.FAQSection),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
  }
);

const ServiceShowcase = dynamicImport(
  () =>
    import("@/components/blocks/service-showcase").then(
      (mod) => mod.ServiceShowcase
    ),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
  }
);

interface ServicePageProps {
  params: { slug: string };
  // searchParams?: { [key: string]: string | string[] | undefined }; // Example if searchParams were needed
}

export default function ServicePage({ params }: ServicePageProps) {
  // const paramsFromHook = use(params); // This would be incorrect now if params is not a promise
  // The line `const params = use(props.params)` was specific to props.params being a Promise.
  // If params is directly { slug: string }, then slug can be destructured.
  const { slug } = params;

  // NOTE: Calling getServiceWithEnhancedData (a server function) directly in a Client Component
  // is problematic. This would typically be done in a Server Component,
  // and the data passed as props to this Client Component.
  // For the purpose of this type update, we are addressing the page props.
  // The data fetching architecture is a separate concern.
  const { service, relatedServices, serviceTestimonials, schemas, formattedBenefits } =
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
      <Section spacing="xl">
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
      </Section>

      <Section spacing="xl">
        <BenefitsSection
          variant="default"
          title="Treatment Benefits"
          subtitle="Experience the comprehensive benefits of this advanced treatment"
          benefits={formattedBenefits}
        />
      </Section>

      <Section spacing="xl">
        <ServiceGallery
          images={service.galleryImages.map((img: string) => ({
            id: img,
            src: img,
            alt: `${service.title} - Result`,
          }))}
          title={`${service.title} Gallery`}
        />
      </Section>

      {serviceTestimonials.length > 0 && (
        <Section spacing="xl">
          <Testimonials
            testimonials={serviceTestimonials}
            title={`What Our Clients Say About ${service.title}`}
            subtitle="Real experiences from our valued clients"
          />
        </Section>
      )}

      <Section spacing="xl">
        <FAQSection
          faqs={service.faqs}
          title="Frequently Asked Questions"
          subtitle={`Common questions about ${service.title}`}
        />
      </Section>

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
