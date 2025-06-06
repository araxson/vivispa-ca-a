import type { Metadata } from 'next';
import { services } from '@/data/services';
import { Section } from '@/components/ui';
import { ServiceCard } from '@/components/blocks/service-card';
import { generatePageMetadata, generateOrganizationSchema, generateJsonLdScript } from '@/app/metadata';
import { siteConfig } from '@/data/constant';
import { CTASection } from '@/components/blocks/cta-section';

export const metadata: Metadata = generatePageMetadata({
  title: 'Our Services - Professional Beauty & Wellness Treatments',
  description: 'Discover our comprehensive range of aesthetic treatments including HydroFacial, laser hair removal, microneedling, IPL photofacial, and more at Vivi Aesthetics & Spa in Calgary.',
  keywords: [
    'aesthetic services calgary',
    'spa treatments calgary',
    'beauty services',
    'skin treatments',
    'laser treatments',
    'hydrofacial calgary',
    'microneedling calgary',
    'laser hair removal calgary',
    'professional aesthetics',
    'medical spa calgary',
  ],
  ogImage: '/images/services/services-overview.webp',
  canonicalUrl: '/services',
});

export default function ServicesPage() {
  // Generate structured data for services page
  const servicesPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteConfig.url}/services#servicelist`,
    name: 'Aesthetic & Spa Services',
    description: 'Professional beauty and wellness treatments at Vivi Aesthetics & Spa',
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        '@id': `${siteConfig.url}/services/${service.slug}#service`,
        name: service.title,
        description: service.previewDescription,
        image: service.image,
        url: `${siteConfig.url}/services/${service.slug}`,
        provider: {
          '@type': 'MedicalBusiness',
          '@id': `${siteConfig.url}#organization`,
          name: 'Vivi Aesthetics & Spa',
        },
        areaServed: {
          '@type': 'City',
          name: 'Calgary',
        },
        category: 'Beauty & Wellness',
      },
    })),
  };

  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      {/* Enhanced structured data for services page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateJsonLdScript(servicesPageJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateJsonLdScript(organizationSchema),
        }}
      />

      <main className="min-h-screen">
        {/* Hero Section */}
        <Section spacing="xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover our comprehensive range of advanced aesthetic treatments designed to enhance your natural beauty and boost your confidence.
            </p>
          </div>
        </Section>

        {/* All Services */}
        <Section spacing="lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              All Treatments
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our complete selection of aesthetic treatments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                showLocations={true}
              />
            ))}
          </div>
        </Section>
        
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