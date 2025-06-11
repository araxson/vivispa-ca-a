/**
 * Universal Section Component - Task 2.3 Implementation
 * 
 * Eliminates repeated section patterns found in 45+ components.
 * Combines section header, grid layout, and content display.
 * 
 * Replaces patterns like:
 * - BenefitsSection, ServiceShowcase, StatsSection
 * - FAQSection, TestimonialsSection, etc.
 */

import { Section } from "./section";
import { UniversalGrid } from "./universal-grid";
import { SectionHeader } from "@/components/blocks/hero-and-sections/section-header";
import type { UniversalSectionProps } from "@/types/universal";
import { cn } from "@/lib/utils";
import type { SpacingSize } from "@/lib/spacing";

// Additional imports for specialized components
import { ServiceCard } from "@/components/blocks/cards-and-displays/service-card";
import { UniversalCard } from "./universal-card";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";
import { ChevronRight, ZoomIn } from "lucide-react";
import Image from "next/image";

export function UniversalSection<T>({
  title,
  subtitle,
  description,
  headerAs = "h2",
  headerAlign = "center",
  showHeader = true,
  items,
  renderItem,
  columns,
  gap,
  emptyStateText,
  emptyStateComponent,
  loading = false,
  skeletonCount,
  containerClassName,
  autoFit,
  minItemWidth,
  maxItems,
  aspectRatio,
  renderCustomContent,
  animate = true,
  animationType = "fadeIn",
  animationDelay = 0,
  spacing = "lg",
  background = "transparent",
  maxWidth = "7xl",
  paddingSize = "md",
  className,
  ...props
}: UniversalSectionProps<T>) {
  // Fix undefined subtitle issue
  const headerProps = {
    title: title || "",
    ...(subtitle && { subtitle }),
    as: headerAs,
    className: cn(
      headerAlign === "left" && "text-left",
      headerAlign === "right" && "text-right",
      headerAlign === "center" && "text-center"
    )
  };

  return (
    <Section
      spacing={spacing}
      background={background}
      maxWidth={maxWidth}
      paddingSize={paddingSize}
      className={className}
      {...props}
    >
      {/* Section Header */}
      {showHeader && (title || subtitle || description) && (
        <>
          <SectionHeader {...headerProps} />
          {description && (
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto text-center mt-4">
              {description}
            </p>
          )}
        </>
      )}

      {/* Content */}
      {renderCustomContent ? (
        renderCustomContent()
      ) : items && renderItem && items.length > 0 ? (
        <UniversalGrid
          items={items}
          renderItem={renderItem}          columns={columns as any}
          gap={gap as any}
          emptyState={emptyStateComponent || (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {emptyStateText || "No content available"}
              </p>
            </div>
          )}          isLoading={loading}
          {...(containerClassName && { className: containerClassName })}
        />
      ) : (
        emptyStateComponent || (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {emptyStateText || "No content available"}
            </p>
          </div>
        )
      )}
    </Section>
  );
}

// Specialized section variants for common patterns
interface SpecializedSectionProps<T> extends Omit<UniversalSectionProps<T>, 'items' | 'renderItem' | 'title' | 'subtitle'> {
  title?: string;
  subtitle?: string;
  items?: T[];
  renderItem?: (item: T, index: number) => React.ReactNode;
}

export function BenefitsSection<T>({
  title = "Why Choose Us",
  subtitle = "Experience the difference",
  items,
  renderItem,
  ...props
}: SpecializedSectionProps<T>) {
  if (!items || !renderItem) {
    return null;
  }
  
  const columns = items.length === 2 ? 2 : 
                 items.length === 3 ? 3 :
                 items.length === 4 ? 4 : "auto";

  return (
    <UniversalSection
      title={title}
      {...(subtitle && { subtitle })}
      items={items}
      renderItem={renderItem}
      columns={columns}
      gap="lg"
      background="muted"
      {...props}
    />
  );
}

export function ServicesSection<T>({
  title = "Our Services",
  subtitle = "Discover our comprehensive treatments",
  items,
  renderItem,
  ...props
}: SpecializedSectionProps<T>) {
  if (!items || !renderItem) {
    return null;
  }
  
  return (
    <UniversalSection
      title={title}
      {...(subtitle && { subtitle })}
      items={items}
      renderItem={renderItem}
      columns={3}
      gap="lg"
      autoFit={true}
      minItemWidth="320px"
      {...props}
    />
  );
}

export function StatsSection<T>({
  title = "Our Statistics",
  subtitle,
  items,
  renderItem,
  ...props
}: SpecializedSectionProps<T>) {
  if (!items || !renderItem) {
    return null;
  }
    return (
    <UniversalSection
      title={title}
      {...(subtitle && { subtitle })}
      items={items}
      renderItem={renderItem}
      columns={4}
      gap="lg"
      background="primary"
      {...props}
    />
  );
}

export function FAQSection<T>({
  title = "Frequently Asked Questions",
  subtitle = "Get answers to common questions",
  items,
  renderItem,
  ...props
}: SpecializedSectionProps<T>) {
  if (!items || !renderItem) {
    return null;
  }
  
  return (
    <UniversalSection
      title={title}
      {...(subtitle && { subtitle })}
      items={items}
      renderItem={renderItem}
      columns={1}
      gap="md"
      maxWidth="3xl"
      {...props}
    />
  );
}

// Add additional specialized section helpers for Task 2.3
interface ServiceShowcaseSectionProps {
  title: string;
  subtitle: string;
  services: any[]; // ServiceCardData[]
  showLocations?: boolean;
  variant?: "default" | "alternative";
  spacing?: SpacingSize;
  background?: "transparent" | "muted" | "card";
  className?: string;
}

interface GallerySectionProps {
  title?: string;
  subtitle?: string;
  images: any[]; // GalleryImage[]
  spacing?: SpacingSize;
  className?: string;
}

interface ResultsSectionProps {
  title?: string;
  subtitle?: string;
  results: any[]; // ResultItem[]
  spacing?: SpacingSize;
  background?: "transparent" | "muted" | "card";
  className?: string;
}

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials: any[]; // Testimonial[]
  spacing?: SpacingSize;
  background?: "transparent" | "muted" | "card";
  className?: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs: any[]; // FAQ[]
  variant?: "default" | "simple" | "minimal" | "cards";
  spacing?: SpacingSize;
  className?: string;
  maxItems?: number;
}

interface ProcedureSectionProps {
  title?: string;
  subtitle?: string;
  steps: any[]; // ProcedureStep[]
  spacing?: SpacingSize;
  className?: string;
}

// Specialized section components for common patterns
export function ServiceShowcaseSection({
  title,
  subtitle,
  services,
  showLocations = true,
  variant = "default",
  spacing = "lg",
  background = "transparent",
  className,
}: ServiceShowcaseSectionProps) {
  return (
    <UniversalSection
      title={title}
      {...(subtitle && { subtitle })}
      items={services}
      renderItem={(service) => (
        <ServiceCard
          key={service.id}
          service={service}
          showLocations={showLocations}
        />
      )}
      columns="auto"
      gap="lg"
      spacing={spacing}
      background={background}
      className={className}
      minItemWidth="300px"
      animate={true}
    />
  );
}

export function GallerySection({
  title = "Before & After Gallery",
  subtitle = "See the amazing transformations",
  images,
  spacing = "lg",
  className,
}: GallerySectionProps) {
  if (!images || images.length === 0) return null;

  return (
    <UniversalSection
      title={title}
      {...(subtitle && { subtitle })}
      items={images}
      renderItem={(image) => (
        <Dialog key={image.id}>
          <DialogTrigger asChild>
            <Card className="group overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="p-0 relative">
                <div className="relative overflow-hidden aspect-[3/2]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
                  </div>
                </div>
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{image.alt}</DialogTitle>
            </DialogHeader>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
      columns="auto"
      gap="lg"
      spacing={spacing}
      className={className}
      minItemWidth="280px"
      animate={true}
    />
  );
}

export function ResultsSection({
  title = "Expected Results",
  subtitle = "What you can expect from this treatment",
  results,
  spacing = "lg",
  background = "muted",
  className,
}: ResultsSectionProps) {
  if (!results || results.length === 0) return null;

  return (
    <UniversalSection
      title={title}
      {...(subtitle && { subtitle })}
      items={results}
      renderItem={(result, index) => (
        <div key={index} className="text-center space-y-3 sm:space-y-4">
          <div className="text-3xl font-bold text-primary">
            {result.value}
          </div>
          <Badge variant="secondary" className="text-sm">
            {result.metric}
          </Badge>
          {result.description && (
            <p className="text-muted-foreground text-sm">
              {result.description}
            </p>
          )}
        </div>
      )}
      columns={3}
      gap="lg"
      spacing={spacing}
      background={background}
      className={className}
    />
  );
}

export function TestimonialsSection({
  title = "What Our Clients Say",
  subtitle = "Real experiences from our valued clients",
  testimonials,
  spacing = "lg",
  background = "muted",
  className,
}: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <Section
      spacing={spacing}
      background={background}
      className={className}
    >
      <SectionHeader title={title} {...(subtitle && { subtitle })} />
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
            >              <UniversalCard
                data={{
                  id: testimonial.id,
                  title: testimonial.name,
                  description: testimonial.content || "",
                  // Map testimonial specific fields correctly
                  name: testimonial.name,
                  location: testimonial.location,
                  role: testimonial.role,
                  rating: testimonial.rating,
                  content: testimonial.content,
                  quote: testimonial.quote,
                  service: testimonial.service,
                  treatment: testimonial.treatment,
                } as any}
                variant="testimonial"
                layout="compact"
                features={{ showBadges: true }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </Section>
  );
}

export function FAQSectionUnified({
  title = "Frequently Asked Questions",
  subtitle = "Get answers to common questions",
  faqs,
  variant = "default",
  spacing = "lg",
  className,
  maxItems,
}: FAQSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  const displayFaqs = maxItems ? faqs.slice(0, maxItems) : faqs;

  const renderFAQContent = () => {
    switch (variant) {
      case "cards":
        return (
          <UniversalSection
            items={displayFaqs}
            renderItem={(faq, index) => (
              <Card key={faq.id || index}>
                <CardContent className="p-6">
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight">
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                    {faq.category && (
                      <Badge variant="secondary" className="w-fit">
                        {faq.category}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            columns={2}
            gap="lg"
            showHeader={false}
          />
        );

      case "minimal":
        return (
          <div className="space-y-6">
            {displayFaqs.map((faq, index) => (
              <div
                key={faq.id || index}
                className="border-b border-border pb-6 last:border-b-0"
              >
                <div className="flex items-start gap-4">
                  <ChevronRight
                    className="w-5 h-5 text-primary mt-1 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                    {faq.category && (
                      <Badge variant="outline" className="w-fit">
                        {faq.category}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "simple":
        return (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {displayFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.id || index}
                value={`item-${index}`}
                className="border rounded-lg bg-card overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-0">
                  <div className="border-t border-border pt-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        );

      default:
        return (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {displayFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.id || index}
                value={`item-${index}`}
                className="border rounded-lg bg-card"
              >
                <AccordionTrigger className="px-6 py-4 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                  {faq.category && (
                    <Badge variant="outline" className="mt-3 w-fit">
                      {faq.category}
                    </Badge>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        );
    }
  };

  return (    <Section
      spacing={spacing}
      className={className}
      maxWidth={variant === "cards" ? "7xl" : "3xl"}
    >
      <SectionHeader title={title} {...(subtitle && { subtitle })} />
      {renderFAQContent()}
    </Section>
  );
}

export function ProcedureSection({
  title = "Treatment Process",
  subtitle = "What to expect during your visit",
  steps,
  spacing = "lg",
  className,
}: ProcedureSectionProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <UniversalSection
      title={title}
      {...(subtitle && { subtitle })}
      items={steps}
      renderItem={(step, index) => (
        <div key={step.id || index} className="relative">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
              {step.duration && (
                <p className="text-sm text-primary mt-2 font-medium">
                  Duration: {step.duration}
                </p>
              )}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className="absolute left-5 top-12 w-px h-8 bg-border" />
          )}
        </div>
      )}
      columns={1}
      gap="xl"
      spacing={spacing}
      className={className}
    />
  );
}

// Generic Content Section for simple layouts
interface ContentSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  spacing?: SpacingSize;
  background?: "transparent" | "muted" | "card";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";
  className?: string;
  headerAlign?: "left" | "center" | "right";
}

export function ContentSection({
  title,
  subtitle,
  description,
  children,
  spacing = "lg",
  background = "transparent",
  maxWidth = "7xl",
  className,
  headerAlign = "center",
}: ContentSectionProps) {
  return (
    <Section
      spacing={spacing}
      background={background}
      maxWidth={maxWidth}
      className={className}
    >
      {(title || subtitle || description) && (
        <div className={cn(
          "space-y-4",
          headerAlign === "left" && "text-left",
          headerAlign === "center" && "text-center",
          headerAlign === "right" && "text-right"
        )}>
          {title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          {description && (
            <div className="prose prose-gray max-w-none dark:prose-invert">
              {typeof description === 'string' ? (
                <p className="text-muted-foreground leading-relaxed">
                  {description}
                </p>
              ) : (
                description
              )}
            </div>
          )}
        </div>
      )}
      {children && (
        <div className="mt-8">
          {children}
        </div>
      )}
    </Section>
  );
}
