import { Suspense } from "react";

// Component imports
import {
  Hero,
  ServiceOverview,
  BenefitsSection,
  ServiceProcedure,
  ServiceResults,
  SharedCTA,
  ServiceGallery,
  Testimonials,
  FAQSection,
  ServiceShowcase,
} from "@/components/blocks";
import { Section, Skeleton } from "@/components/ui";

// Data and utilities
import { getServiceWithEnhancedData } from "./page.server";

// Type definition for consistent props
interface ServicePageProps {
  params: { slug: string };
}

/**
 * Service detail page
 * Optimized for Next.js 15 App Router with React 19 Suspense boundaries
 */
export default async function ServicePage({ params }: Readonly<ServicePageProps>) {
  const { slug } = params;

  // Get all service data with optimized fetch using unstable_cache
  const { service, relatedServices, serviceTestimonials, schemas, formattedBenefits } =
    await getServiceWithEnhancedData(slug);

  return (
    <>
      {/* Structured data for enhanced SEO */}
      {Object.entries(schemas).map(([key, schema]) => (
        <script
          key={key}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}

      <Hero
        title={service.title}
        description={service.previewDescription}
        primaryCTA={{
          text: "Book Consultation",
          href: "/contact",
        }}
        secondaryCTA={{
          text: "View Pricing",
          href: "/pricing",
        }}
        backgroundImage={{
          src: service.image,
          alt: service.title,
        }}
        heroType="image"
        spacing="lg"
      />

      <Section spacing="lg" background="default">
        <ServiceOverview
          overview={service.overview}
          benefits={service.benefits}
          sessionInfo={{
            recommended: service.recommendedSessions || 3,
            interval: service.sessionInterval || "4-6 weeks",
          }}
        />
      </Section>

      <Section spacing="lg" background="muted">
        <BenefitsSection
          title="Key Benefits"
          subtitle="Discover the transformative benefits of this treatment"
          benefits={formattedBenefits}
          variant="default"
          spacing="md"
        />
      </Section>

      <Section spacing="lg" background="default">
        <ServiceProcedure
          steps={[
            {
              title: "Consultation",
              description: "Initial assessment and treatment planning",
            },
            {
              title: "Preparation",
              description: "Skin preparation and area cleaning",
            },
            {
              title: "Treatment",
              description: service.procedure,
            },
            {
              title: "Aftercare",
              description: service.preparationAndAftercare,
            },
          ]}
          title="The Procedure"
          subtitle="What to expect during your treatment"
        />
      </Section>

      <Section spacing="lg" background="muted">
        <ServiceResults
          results={[
            {
              value: "95%",
              metric: "Satisfaction Rate",
              description: "Client satisfaction with results",
            },
            {
              value: service.recommendedSessions?.toString() || "2-4",
              metric: "Sessions",
              description: "Average sessions for optimal results",
            },
            {
              value: service.downtime || "0",
              metric: "Downtime",
              description: service.downtimeDescription || "No recovery time needed",
            },
          ]}
          title="Expected Results"
          subtitle="What you can expect from this treatment"
        />
      </Section>

      {service.galleryImages && service.galleryImages.length > 0 && (
        <Suspense fallback={<Section spacing="lg" background="default"><Skeleton className="h-96 w-full" /></Section>}>
          <Section spacing="lg" background="default">
            <ServiceGallery
              images={service.galleryImages.map((image, index) => ({
                id: `gallery-${index}`,
                src: image,
                alt: `${service.title} - Gallery Image ${index + 1}`,
              }))}
              title="Treatment Gallery"
            />
          </Section>
        </Suspense>
      )}

      {serviceTestimonials && serviceTestimonials.length > 0 && (
        <Suspense fallback={<Section spacing="lg" background="muted"><Skeleton className="h-96 w-full" /></Section>}>
          <Section spacing="lg" background="muted">
            <Testimonials
              testimonials={serviceTestimonials}
              title="Client Testimonials"
              subtitle="Real experiences from our valued clients"
            />
          </Section>
        </Suspense>
      )}

      <Suspense fallback={<Section spacing="lg" background="default"><Skeleton className="h-96 w-full" /></Section>}>
        <Section spacing="lg" background="default">
          <FAQSection
            faqs={service.faqs || []}
            title="Frequently Asked Questions"
            subtitle="Get answers to common questions about this treatment"
          />
        </Section>
      </Suspense>

      {relatedServices && relatedServices.length > 0 && (
        <Suspense fallback={<Section spacing="lg" background="muted"><Skeleton className="h-96 w-full" /></Section>}>
          <Section spacing="lg" background="muted">
            <ServiceShowcase
              title="Related Services"
              subtitle="Explore our other premium treatments"
              services={relatedServices}
              showLocations={true}
            />
          </Section>
        </Suspense>
      )}

      <SharedCTA />
    </>
  );
}
