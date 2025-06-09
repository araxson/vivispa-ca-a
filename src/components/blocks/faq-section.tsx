import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Section,
  Card,
  CardContent,
  Badge,
  Container,
  FadeIn,
} from "@/components/ui";
import { HelpCircle, ChevronRight } from "lucide-react";
import { SectionHeader } from "./section-header";
import type { SpacingSize } from "@/lib/spacing";

interface FAQ {
  id?: string;
  question: string;
  answer: string;
  category?: string;
  featured?: boolean;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  subtitle?: string;
  variant?: "default" | "card" | "minimal" | "simple" | "category";
  showCategories?: boolean;
  maxItems?: number;
  className?: string;
  spacing?: SpacingSize;
}

export function FAQSection({
  faqs,
  title = "Frequently Asked Questions",
  subtitle = "Get answers to common questions",
  variant = "default",
  showCategories = false,
  maxItems,
  className,
  spacing = "lg",
}: FAQSectionProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  const displayFaqs = maxItems ? faqs.slice(0, maxItems) : faqs;

  // Group FAQs by category for the category variant
  const groupedFAQs = Object.entries(
    faqs.reduce((acc: Record<string, FAQ[]>, faq) => {
      const category = faq.category || "General";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(faq);
      return acc;
    }, {}),
  );

  if (variant === "card") {
    return (
      <Section spacing={spacing} className={className} maxWidth="6xl">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 sm:mb-6">
            <HelpCircle
              className="w-6 h-6 sm:w-8 sm:h-8 text-primary"
              aria-hidden="true"
            />
          </div>
          <SectionHeader title={title} subtitle={subtitle} />
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {displayFaqs.map((faq, index) => (
            <FadeIn key={faq.id || index}>
              <Card>
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
            </FadeIn>
          ))}
        </div>
      </Section>
    );
  }

  if (variant === "minimal") {
    return (
      <Section spacing={spacing} className={className} maxWidth="3xl">
        <SectionHeader title={title} subtitle={subtitle} />
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
      </Section>
    );
  }

  if (variant === "simple") {
    return (
      <Section spacing={spacing} className={className} maxWidth="3xl">
        <SectionHeader title={title} subtitle={subtitle} />
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
      </Section>
    );
  }

  if (variant === "category") {
    return (
      <Section spacing={spacing} className={className} maxWidth="4xl">
        <SectionHeader title={title} subtitle={subtitle} />
        <div className="space-y-8">
          {groupedFAQs.map(([category, faqs]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-xl font-bold text-foreground mb-4 border-b border-border pb-2">
                {category}
              </h3>
              <Accordion type="single" collapsible className="w-full space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={faq.id || index}
                    value={`${category}-${index}`}
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
            </div>
          ))}
        </div>
      </Section>
    );
  }

  // Default variant
  return (
    <Section spacing={spacing} className={className} maxWidth="3xl">
      <SectionHeader title={title} subtitle={subtitle} />
      <Accordion type="single" collapsible className="w-full">
        {displayFaqs.map((faq, index) => (
          <AccordionItem
            key={faq.id || index}
            value={`item-${index}`}
            className="border-b"
          >
            <AccordionTrigger className="py-4 text-left hover:no-underline">
              <span className="font-semibold text-foreground pr-4">
                {faq.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-0">
              <p className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
              {showCategories && faq.category && (
                <Badge variant="outline" className="mt-3 w-fit">
                  {faq.category}
                </Badge>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
