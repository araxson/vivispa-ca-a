"use client"

import { Star } from 'lucide-react';
import { Card, CardContent, Badge, Container, Section } from '@/components/ui';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

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
  date?: string;
  verified?: boolean;
  avatar?: string;
  image?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'compact';
  maxItems?: number;
  showStats?: boolean;
  className?: string;
}

export function Testimonials({
  testimonials,
  title = "What Our Clients Say",
  subtitle = "Real experiences from our valued clients",
  variant = 'default',
  maxItems,
  showStats = true,
  className
}: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const displayTestimonials = maxItems ? testimonials.slice(0, maxItems) : testimonials;
  const isCompact = variant === 'compact';

  // Calculate statistics
  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;
  const totalReviews = testimonials.length;
  const verifiedCount = testimonials.filter(t => t.verified).length;

  return (
    <Section spacing="lg" background="muted" className={className}>
      <Container>
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 sm:-ml-4">
            {displayTestimonials.map((testimonial) => (
              <CarouselItem 
                key={testimonial.id} 
                className={cn(
                  "pl-2 sm:pl-4",
                  isCompact ? "basis-full sm:basis-1/2 lg:basis-1/3" : "basis-full md:basis-1/2 lg:basis-1/3"
                )}
              >
                <div className="p-1">
                  <TestimonialCard testimonial={testimonial} variant={variant} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
        
        {showStats && (
          <div className="mt-8 sm:mt-12 md:mt-16 text-center">
            <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 flex-wrap text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn(
                        "h-3 w-3 sm:h-4 sm:w-4",
                        i < Math.floor(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      )} 
                    />
                  ))}
                </div>
                <span className="font-medium">{averageRating.toFixed(1)} average</span>
              </div>
              <div className="text-muted-foreground">
                {totalReviews} total reviews
              </div>
              {verifiedCount > 0 && (
                <div className="text-muted-foreground">
                  {verifiedCount} verified
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: 'default' | 'compact';
}

function TestimonialCard({ testimonial, variant = 'default' }: TestimonialCardProps) {
  const isCompact = variant === 'compact';
  
  // Handle both content and quote properties
  const testimonialText = testimonial.content || testimonial.quote || "";
  
  return (
    <Card className="h-full border border-border bg-card">
      <CardContent className="p-4 sm:p-6">
        <div className="h-full flex flex-col">
          <div className="flex items-center gap-1 mb-3 sm:mb-4">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "h-4 w-4",
                  i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
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
                <Badge variant="outline" className="text-xs mt-1 h-5 border-primary/20">
                  {testimonial.service || testimonial.treatment}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 