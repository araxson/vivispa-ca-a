import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Hero } from '@/components/blocks/hero';
import { ServiceCard } from '@/components/blocks/service-card';
import { FAQSection } from '@/components/blocks/faq-section';
import { Testimonials } from '@/components/blocks/testimonials';
import { CTASection } from '@/components/blocks/cta-section';
import { StatsSection } from '@/components/blocks/stats-section';
import { Section } from '@/components/ui';
import { generatePageMetadata, generateOrganizationSchema, generateJsonLdScript } from '@/app/metadata';
import { generalFAQs } from '@/data/faqs';
import { homePageData } from '@/data/home';
import { BenefitsSection } from '@/components/blocks/benefits-section';

// Enhanced metadata for home page with performance optimization
export const metadata: Metadata = generatePageMetadata({
  title: 'Premium Beauty & Wellness Treatments in Calgary',
  description: 'Discover premium aesthetics and spa treatments at Vivi Aesthetics & Spa. Professional laser hair removal, HydraFacial, microneedling, and more in Calgary. Book your appointment today!',
  keywords: [
    'aesthetics spa Calgary',
    'beauty treatments Calgary',
    'laser hair removal',
    'hydrofacial',
    'microneedling',
    'premium spa Calgary',
    'medical aesthetics',
    'anti-aging treatments',
    'professional skincare',
    'downtown Calgary spa',
    'Edmonton Trail spa',
  ],
  ogImage: '/images/home-og-image.webp',
  canonicalUrl: '/',
});

export default function HomePage() {
  const organizationSchema = generateOrganizationSchema();
  
  // Format the services data to match the ServiceCard component's expected structure
  const formattedServices = homePageData.featuredServices.map(service => ({
    id: service.id,
    title: service.title,
    slug: service.id,
    previewDescription: service.description,
    image: service.image,
    availableLocations: ['calgary']
  }));

  // Format the testimonials to match the Testimonials component's expected structure
  const formattedTestimonials = homePageData.testimonials.map(testimonial => ({
    ...testimonial,
    content: testimonial.content,
    verified: true
  }));

  return (
    <>
      {/* Enhanced structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateJsonLdScript(organizationSchema),
        }}
      />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <Hero
          title={homePageData.hero.headline}
          description={homePageData.hero.description}
          primaryCTA={{
            text: homePageData.hero.primaryCTA.text,
            href: homePageData.hero.primaryCTA.href
          }}
          secondaryCTA={{
            text: homePageData.hero.secondaryCTA.text,
            href: homePageData.hero.secondaryCTA.href
          }}
          heroType={homePageData.hero.heroType}
          backgroundImage={homePageData.hero.backgroundImage}
          backgroundVideo={homePageData.hero.backgroundVideo}
        />

        {/* Stats Section */}
        <Suspense fallback={<div className="h-48 bg-muted" />}>
          <StatsSection 
            stats={homePageData.stats}
            title="Why Clients Choose Us"
            subtitle="We're committed to excellence in every aspect of our service"
            variant="highlighted"
          />
        </Suspense>

        {/* Our Services */}
        <Suspense fallback={<div className="h-96 bg-muted" />}>
          <Section spacing="lg">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                Our Featured Services
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our comprehensive range of beauty and wellness treatments
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {formattedServices.map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  showLocations={false}
                />
              ))}
            </div>
          </Section>
        </Suspense>

        {/* Benefits Section */}
        <Suspense fallback={<div className="h-72 bg-muted" />}>
          <BenefitsSection 
            benefits={homePageData.benefits}
            title="The Vivi Aesthetics Advantage"
            subtitle="Experience premium care with our unique approach to aesthetics"
          />
        </Suspense>

        {/* Testimonials */}
        <Suspense fallback={<div className="h-96 bg-muted" />}>
          <Testimonials 
            testimonials={formattedTestimonials} 
            title="What Our Clients Say"
            subtitle="Don't just take our word for it. Here's what our satisfied clients have to say about their experience with us."
            showStats={true}
          />
        </Suspense>

        {/* FAQs */}
        <Suspense fallback={<div className="h-96 bg-muted" />}>
          <FAQSection
            faqs={generalFAQs}
            title="Frequently Asked Questions"
            subtitle="Get answers to common questions about our services and treatments"
            variant="default"
            maxItems={6}
          />
        </Suspense>

        {/* Call to Action */}
        <CTASection
          title={homePageData.ctaSection.headline}
          description={homePageData.ctaSection.description}
          primaryCTA={{
            text: homePageData.ctaSection.primaryCTA.text,
            href: homePageData.ctaSection.primaryCTA.href,
            variant: "default",
            icon: "calendar"
          }}
          secondaryCTA={homePageData.ctaSection.secondaryCTA ? {
            text: homePageData.ctaSection.secondaryCTA.text,
            href: homePageData.ctaSection.secondaryCTA.href,
            variant: "outline",
            icon: "phone"
          } : undefined}
        />
      </main>
    </>
  );
} 