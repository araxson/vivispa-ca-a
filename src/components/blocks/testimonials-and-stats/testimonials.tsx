"use client";

import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Animated } from "@/components/ui/animated";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { UniversalSection } from "@/components/ui";
import { Container } from "@/components/ui/container";
import { UniversalCard, type TestimonialCardData } from "@/components/ui/universal-card";
import { cn } from "@/lib/utils";
import type { SpacingSize } from "@/lib/spacing";

interface Testimonial {
  id: string;
  name: string;
  location?: string;
  role?: string;
  rating: number;
  content?: string;
  quote?: string;
  service?: string;
  treatment?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  className?: string;
  spacing?: SpacingSize;
}

// Transform testimonial data to UniversalCard format
function transformTestimonialData(testimonial: Testimonial): TestimonialCardData {
  const baseData = {
    id: testimonial.id,
    title: testimonial.name, // Use name as title
    description: testimonial.content || testimonial.quote || '', // Use quote as description
    name: testimonial.name,
    rating: testimonial.rating,
  };

  // Only add optional properties if they exist
  const optionalFields: Partial<TestimonialCardData> = {};
  
  if (testimonial.location) {
    optionalFields.location = testimonial.location;
  }
  
  if (testimonial.role) {
    optionalFields.role = testimonial.role;
  }
  
  if (testimonial.content) {
    optionalFields.content = testimonial.content;
  }
  
  if (testimonial.quote) {
    optionalFields.quote = testimonial.quote;
  }
  
  if (testimonial.service) {
    optionalFields.service = testimonial.service;
  }
  
  if (testimonial.treatment) {
    optionalFields.treatment = testimonial.treatment;
  }

  return { ...baseData, ...optionalFields };
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <UniversalCard
      data={transformTestimonialData(testimonial)}
      variant="testimonial"
      layout="default"
      features={{
        showImage: false,
        showBadges: false,
        showLocations: false,
        showPricing: false,
        showBooking: false,
        showAnimation: false,
      }}
      className="h-full"
    />
  );
}

export function Testimonials({
  testimonials,
  title = "What Our Clients Say",
  subtitle = "Real experiences from our valued clients",
  className,
  spacing = "lg",
}: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <UniversalSection
      title={title}
      subtitle={subtitle}
      renderCustomContent={() => (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 sm:-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-2 sm:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <Animated variant="slideUp" className="p-1 h-full">
                  <TestimonialCard testimonial={testimonial} />
                </Animated>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      )}
      spacing={spacing}
      background="muted"
      className={className}
    />
  );
}
