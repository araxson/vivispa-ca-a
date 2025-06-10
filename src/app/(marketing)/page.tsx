import type { Metadata } from "next";
import { Suspense } from "react";
import {
  Hero,
  FAQSection,
  Testimonials,
  StatsSection,
  BenefitsSection,
  ServiceShowcase,
  CallToAction,
} from "@/components/blocks";
import { Section } from "@/components/ui";
import {
  generatePageMetadata,
  generateOrganizationSchema,
} from "@/app/metadata";
import { generalFAQs } from "@/data/faqs";
import { homePageData } from "@/data/home";
// import type { ServiceCardData } from "@/types/service"; // Type will be inferred
import { getHomePageFeaturedServiceCards } from "@/lib/data-fetcher";

// Enhanced metadata for home page with performance optimization
export const metadata: Metadata = generatePageMetadata({
  title: "Premium Beauty & Wellness Treatments in Calgary",
  description:
    "Discover premium aesthetics and spa treatments at Vivi Aesthetics & Spa. Professional laser hair removal, HydraFacial, microneedling, and more in Calgary. Book your appointment today!",
  keywords: [
    "aesthetics spa Calgary",
    "beauty treatments Calgary",
    "laser hair removal",
    "hydrofacial",
    "microneedling",
    "premium spa Calgary",
    "medical aesthetics",
    "anti-aging treatments",
    "professional skincare",
    "downtown Calgary spa",
    "Edmonton Trail spa",
  ],
  ogImage: "/images/home-og-image.webp",
  canonicalUrl: "/",
});

export default function HomePage() {
  const organizationSchema = generateOrganizationSchema();

  // Get pre-formatted service cards from data-fetcher
  const formattedServices = getHomePageFeaturedServiceCards();

  // Format the testimonials to match the Testimonials component's expected structure
  const formattedTestimonials = homePageData.testimonials;

  return (
    <>
      {/* Enhanced structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* Hero Section */}
      <Hero
        title={homePageData.hero.headline}
        description={homePageData.hero.description}
        primaryCTA={{
          text: homePageData.hero.primaryCTA.text,
          href: homePageData.hero.primaryCTA.href,
        }}
        secondaryCTA={{
          text: homePageData.hero.secondaryCTA.text,
          href: homePageData.hero.secondaryCTA.href,
        }}
        heroType={homePageData.hero.heroType}
        backgroundImage={homePageData.hero.backgroundImage}
        backgroundVideo={homePageData.hero.backgroundVideo}
        spacing="xl"
      />

      {/* Stats Section */}
      <Suspense fallback={<div className="h-48 bg-muted" />}>
        <StatsSection
          stats={homePageData.stats}
          title="Why Clients Choose Us"
          subtitle="We're committed to excellence in every aspect of our service"
          variant="highlighted"
          spacing="xl"
        />
      </Suspense>

      {/* Our Services */}
      <Suspense fallback={<div className="h-96 bg-muted" />}>
        <ServiceShowcase
          title="Our Featured Services"
          subtitle="Discover our comprehensive range of beauty and wellness treatments"
          services={formattedServices}
          showLocations={false}
          spacing="xl"
        />
      </Suspense>

      {/* Benefits Section */}
      <Suspense fallback={<div className="h-72 bg-muted" />}>
        <BenefitsSection
          benefits={homePageData.benefits}
          title="The Vivi Aesthetics Advantage"
          subtitle="Experience premium care with our unique approach to aesthetics"
          spacing="xl"
        />
      </Suspense>

      {/* Testimonials */}
      <Suspense fallback={<div className="h-96 bg-muted" />}>
        <Testimonials
          testimonials={formattedTestimonials}
          title="What Our Clients Say"
          subtitle="Don't just take our word for it. Here's what our satisfied clients have to say about their experience with us."
          spacing="xl"
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
          spacing="xl"
        />
      </Suspense>

      {/* Call to Action */}
      <CallToAction />
    </>
  );
}
