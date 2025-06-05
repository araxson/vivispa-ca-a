import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Hero } from '@/components/blocks/hero';
import { ServiceCard } from '@/components/blocks/service-card';
import { FAQSection } from '@/components/blocks/faq-section';
import { Testimonials } from '@/components/blocks/testimonials';
import { CTASection } from '@/components/blocks/cta-section';
import { Section } from '@/components/ui';
import { generatePageMetadata, generateOrganizationSchema, generateJsonLdScript } from '@/app/metadata';
import { getAllServices, getFeaturedTestimonials } from '@/lib/data-fetcher';
import { generalFAQs } from '@/data/faqs';

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
  // Get all services sorted by popularity
  const allServices = getAllServices();
  const displayServices = allServices.slice(0, 6); // Show top 6 services
  const featuredTestimonials = getFeaturedTestimonials(4); // Get 4 featured testimonials
  const organizationSchema = generateOrganizationSchema();

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
          title="Transform Your Beauty at Calgary's Premier Spa"
          description="Experience premium aesthetics and wellness treatments at Vivi Aesthetics & Spa. Our expert team delivers exceptional results using the latest technology and proven techniques."
          primaryCTA={{
            text: "Book Appointment",
            href: "/pricing"
          }}
          secondaryCTA={{
            text: "Book from Offers",
            href: "/offers"
          }}
        />

        {/* Our Services */}
        <Suspense fallback={<div className="h-96 bg-muted" />}>
          <Section spacing="lg">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                Our Popular Services
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our most sought-after beauty and wellness treatments
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {displayServices.map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  showLocations={false}
                />
              ))}
            </div>
          </Section>
        </Suspense>

        {/* Testimonials */}
        <Suspense fallback={<div className="h-96 bg-muted" />}>
          <Testimonials 
            testimonials={featuredTestimonials} 
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
          variant="minimal"
          title="Ready to Transform Your Look?"
          description="Book your appointment today and experience our premium beauty services."
          primaryCTA={{
            text: "Book Your Appointment",
            href: "/pricing",
            variant: "default",
            icon: "calendar"
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