// Test file for UniversalSection component
import React from 'react';
import { 
  UniversalSection, 
  BenefitsSection, 
  ServicesSection, 
  TestimonialsSection,
  FAQSectionUnified 
} from '@/components/ui/universal-section';

// Sample data for testing
const sampleBenefits = [
  { id: '1', title: 'Expert Care', description: 'Professional treatments by certified specialists' },
  { id: '2', title: 'Modern Equipment', description: 'State-of-the-art technology for best results' },
  { id: '3', title: 'Personalized Approach', description: 'Customized treatments for your unique needs' }
];

const sampleServices = [
  { id: '1', title: 'Laser Hair Removal', description: 'Permanent hair reduction' },
  { id: '2', title: 'HydraFacial', description: 'Deep cleansing facial treatment' },
  { id: '3', title: 'Microneedling', description: 'Skin rejuvenation therapy' }
];

const sampleTestimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    content: 'Amazing results from my laser hair removal treatment!',
    rating: 5,
    location: 'Toronto'
  },
  {
    id: '2', 
    name: 'Emily Chen',
    content: 'The HydraFacial left my skin glowing and refreshed.',
    rating: 5,
    location: 'Vancouver'
  }
];

const sampleFAQs = [
  {
    id: '1',
    question: 'How long does laser hair removal take?',
    answer: 'Treatment time varies by area, typically 15-60 minutes per session.'
  },
  {
    id: '2',
    question: 'Is the treatment painful?',
    answer: 'Most clients experience minimal discomfort, similar to a rubber band snap.'
  }
];

// Test component usage examples
export function UniversalSectionTests() {
  return (
    <div className="space-y-16">
      {/* Basic UniversalSection */}
      <UniversalSection
        title="Our Services"
        subtitle="Discover our comprehensive treatments"
        items={sampleServices}
        renderItem={(service) => (
          <div key={service.id} className="p-6 border rounded-lg">
            <h3 className="font-semibold">{service.title}</h3>
            <p className="text-muted-foreground">{service.description}</p>
          </div>
        )}
        columns={3}
        gap="lg"
        spacing="lg"
      />

      {/* Benefits Section */}
      <BenefitsSection
        title="Why Choose Us"
        subtitle="Experience the difference"
        items={sampleBenefits}
        renderItem={(benefit) => (
          <div key={benefit.id} className="text-center space-y-2">
            <h3 className="font-semibold">{benefit.title}</h3>
            <p className="text-muted-foreground">{benefit.description}</p>
          </div>
        )}
      />

      {/* Services Section */}
      <ServicesSection
        title="Popular Treatments"
        subtitle="Our most requested services"
        items={sampleServices}
        renderItem={(service) => (
          <div key={service.id} className="p-4 bg-card rounded-lg">
            <h3 className="font-medium">{service.title}</h3>
            <p className="text-sm text-muted-foreground">{service.description}</p>
          </div>
        )}
      />

      {/* Testimonials Section */}
      <TestimonialsSection
        title="What Our Clients Say"
        subtitle="Real experiences from our valued clients"
        testimonials={sampleTestimonials}
        spacing="xl"
        background="muted"
      />

      {/* FAQ Section */}
      <FAQSectionUnified
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions"
        faqs={sampleFAQs}
        variant="default"
        maxItems={5}
      />
    </div>
  );
}

export default UniversalSectionTests;
