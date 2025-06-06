"use client";

import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";

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
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const testimonialText = testimonial.content || testimonial.quote || "";
  return (
    <Card className="h-full border border-border bg-card">
      <CardContent className="p-4 sm:p-6 flex flex-col h-full">
        <div className="flex items-center gap-1 mb-3 sm:mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < testimonial.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300",
              )}
            />
          ))}
        </div>
        <blockquote className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed line-clamp-3 text-xs sm:text-sm md:text-base">
          "{testimonialText}"
        </blockquote>
        <div className="mt-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-foreground text-sm truncate">
                {testimonial.name}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {testimonial.location || testimonial.role || ""}
              </div>
            </div>
            {(testimonial.service || testimonial.treatment) && (
              <Badge
                variant="outline"
                className="text-xs mt-1 h-5 border-primary/20"
              >
                {testimonial.service || testimonial.treatment}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Testimonials({
  testimonials,
  title = "What Our Clients Say",
  subtitle = "Real experiences from our valued clients",
  className,
}: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <Section spacing="lg" background="muted" className={className}>
      <SectionHeader title={title} subtitle={subtitle} />
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
              <div className="p-1">
                <TestimonialCard testimonial={testimonial} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </Section>
  );
}
