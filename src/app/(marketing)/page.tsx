import type { Metadata } from "next";
import { Suspense } from "react";
import {
  Hero,
  FAQSection,
  Testimonials,
  CTASection,
  StatsSection,
  BenefitsSection,
  ServiceShowcase,
} from "@/components/blocks";
import { LoadingSpinner } from "@/components/ui";
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

/**
 * Optimized loading placeholder for React 19
 * Using a more efficient implementation for better performance
 */
const SectionPlaceholder = ({ height }: { height: string }) => (
  <div 
    className={`w-full ${height} bg-muted/50 animate-pulse rounded-lg`} 
    aria-hidden="true"
  />
);

/**
 * Structured data component using React 19 optimizations
 */
const StructuredData = () => {
  const organizationSchema = generateOrganizationSchema();
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema),
      }}
    />
  );
};

/**
 * Stats section with React 19 Suspense boundary
 * Optimized for better loading performance
 */
const StatsWithSuspense = () => (
  <Suspense fallback={<SectionPlaceholder height="h-48" />}>
    <StatsSection
      stats={homePageData.stats}
      title="Why Clients Choose Us"
      subtitle="We're committed to excellence in every aspect of our service"
      variant="highlighted"
      spacing="xl"
    />
  </Suspense>
);

/**
 * Services section with optimized data fetching for Next.js 15
 * Using React 19's automatic memoization
 */
const ServicesWithSuspense = () => {
  const formattedServices = getHomePageFeaturedServiceCards();
  
  return (
    <Suspense fallback={<SectionPlaceholder height="h-96" />}>
      <ServiceShowcase
        title="Our Featured Services"
        subtitle="Discover our comprehensive range of beauty and wellness treatments"
        services={formattedServices}
        showLocations={false}
        spacing="xl"
      />
    </Suspense>
  );
};

/**
 * Benefits section with Suspense boundary
 * Improved loading performance with React 19
 */
const BenefitsWithSuspense = () => (
  <Suspense fallback={<SectionPlaceholder height="h-72" />}>
    <BenefitsSection
      benefits={homePageData.benefits}
      title="The Vivi Aesthetics Advantage"
      subtitle="Experience premium care with our unique approach to aesthetics"
      spacing="xl"
    />
  </Suspense>
);

/**
 * Testimonials section with optimized loading
 * Using React 19's improved Suspense feature
 */
const TestimonialsWithSuspense = () => (
  <Suspense 
    fallback={<SectionPlaceholder height="h-96" />}
  >
    <Testimonials
      testimonials={homePageData.testimonials}
      title="What Our Clients Say"
      subtitle="Don't just take our word for it. Here's what our satisfied clients have to say about their experience with us."
      spacing="xl"
    />
  </Suspense>
);

/**
 * FAQs section with optimized loading using React 19
 */
const FAQsWithSuspense = () => (
  <Suspense 
    fallback={<SectionPlaceholder height="h-96" />}
  >
    <FAQSection
      faqs={generalFAQs}
      title="Frequently Asked Questions"
      subtitle="Get answers to common questions about our services and treatments"
      variant="default"
      maxItems={6}
      spacing="xl"
    />
  </Suspense>
);

/**
 * Home page component using React 19 and Next.js 15 optimizations
 */
export default function HomePage() {
  return (
    <>
      <StructuredData />

      {/* Hero Section - Higher priority, don't wrap in Suspense */}
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
      <StatsWithSuspense />

      {/* Our Services */}
      <ServicesWithSuspense />

      {/* Benefits Section */}
      <BenefitsWithSuspense />

      {/* Testimonials */}
      <TestimonialsWithSuspense />

      {/* FAQs */}
      <FAQsWithSuspense />

      {/* Call to Action - Higher priority, don't wrap in Suspense */}
      <CTASection
        title={homePageData.ctaSection.headline}
        description={homePageData.ctaSection.description}
        primaryCTA={{
          text: homePageData.ctaSection.primaryCTA.text,
          href: homePageData.ctaSection.primaryCTA.href,
          variant: "default",
          icon: "calendar",
        }}
        secondaryCTA={
          homePageData.ctaSection.secondaryCTA
            ? {
                text: homePageData.ctaSection.secondaryCTA.text,
                href: homePageData.ctaSection.secondaryCTA.href,
                variant: "outline",
                icon: "phone",
              }
            : undefined
        }
        spacing="xl"
      />
    </>
  );
}
