import type { Metadata } from 'next';
import { cache } from 'react';
import { Suspense } from 'react';

// Component imports
import { Hero } from '@/components/blocks/hero';
import { ServiceOverview } from '@/components/blocks/service-overview';
import { FeaturesSection } from '@/components/blocks/features-section';
import { ServiceProcedure } from '@/components/blocks/service-procedure';
import { ServiceGallery } from '@/components/blocks/service-gallery';
import { ServiceResults } from '@/components/blocks/service-results';
import { ServiceCard } from '@/components/blocks/service-card';
import { FAQSection } from '@/components/blocks/faq-section';
import { CTASection } from '@/components/blocks/cta-section';
import { Testimonials } from '@/components/blocks/testimonials';
import { Section } from '@/components/ui';

// Data and utilities
import { 
  getServiceOrNotFound,
  generateServiceStaticParams,
  getRelatedServices,
  getServiceTestimonials,
} from '@/lib/data-fetcher';
import { 
  generateServicePageMetadata, 
  generateOrganizationSchema, 
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateJsonLdScript 
} from '@/app/metadata';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

// Performance optimized static params generation for SSG
export async function generateStaticParams() {
  return generateServiceStaticParams();
}

// Enhanced metadata generation with comprehensive SEO
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
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
    { name: 'Home', url: 'https://vivispa.ca' },
    { name: 'Services', url: 'https://vivispa.ca/services' },
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
    }
  };
});

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const { service, relatedServices, serviceTestimonials, schemas } = getServiceWithEnhancedData(slug);

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
      
      <main className="min-h-screen">
        <Hero
          title={service.title}
          description={service.fullDescription}
          backgroundImage={service.image ? {
            src: service.image,
            alt: service.title
          } : undefined}
        />
        
        <Suspense fallback={<div className="h-96 bg-muted" />}>
          <ServiceOverview
            overview={service.overview}
            benefits={service.benefits}
            sessionInfo={{
              recommended: 3,
              interval: "4-6 weeks"
            }}
          />
        </Suspense>
        
        <FeaturesSection 
          variant="benefits"
          title="Treatment Benefits"
          subtitle="Experience the comprehensive benefits of this advanced treatment"
          features={service.benefits.map((benefit: string) => ({
            title: benefit,
            description: `${benefit} with our advanced treatment technology.`
          }))} 
        />
        
        <Suspense fallback={<div className="h-64 bg-muted" />}>
          <ServiceGallery
            images={service.galleryImages.map((img: string, index: number) => ({
              id: `gallery-${index}`,
              src: img,
              alt: `${service.title} - Result ${index + 1}`
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
            <Section spacing="lg" background="muted">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Related Services</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Explore other treatments that complement {service.title}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedServices.map((relatedService) => (
                  <ServiceCard
                    key={relatedService.id}
                    service={relatedService}
                    showLocations={true}
                    variant="default"
                  />
                ))}
              </div>
            </Section>
          </Suspense>
        )}
        
        <CTASection
          variant="minimal"
          title="Ready to Transform Your Look?"
          description="Book your appointment today and experience our premium beauty services."
          primaryCTA={{
            text: "Book Your Appointment",
            href: "https://book.vivispa.ca",
            variant: "default",
            icon: "calendar",
            external: true
          }}
          secondaryCTA={{
            text: "View Offers",
            href: "/offers",
            variant: "outline"
          }}
        />
      </main>
    </>
  );
} 