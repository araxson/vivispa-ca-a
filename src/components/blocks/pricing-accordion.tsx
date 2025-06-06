import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
} from "@/components/ui";
import type { ServiceItem } from "@/types/pricing";
import { PricingServiceTable } from "./pricing-service-table";

interface PricingAccordionProps {
  servicesByCategory: Record<string, Record<string, ServiceItem[]>>;
}

const PricingAccordion: React.FC<PricingAccordionProps> = ({
  servicesByCategory,
}) => {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {Object.entries(servicesByCategory).map(([category, subcategories]) => {
          const totalServices = Object.values(subcategories).flat().length;
          // Check if category has actual subcategories (more than just 'main')
          const hasSubcategories =
            Object.keys(subcategories).length > 1 ||
            (Object.keys(subcategories).length === 1 && !subcategories["main"]);

          return (
            <AccordionItem
              key={category}
              value={category}
              className="border border-border rounded-lg overflow-hidden border-b"
            >
              <AccordionTrigger className="px-4 md:px-6 py-4 hover:no-underline group">
                <div className="flex items-center justify-between w-full mr-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-base md:text-lg lg:text-xl font-semibold capitalize text-left group-hover:text-primary transition-colors">
                      {category}
                    </h2>
                    <Badge
                      variant="secondary"
                      className="text-xs font-normal shrink-0"
                    >
                      {totalServices} service{totalServices !== 1 ? "s" : ""}
                    </Badge>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="p-0">
                <div className="border-t border-border bg-muted/20">
                  {hasSubcategories ? (
                    // Nested accordion for categories with subcategories
                    <Accordion type="single" collapsible className="w-full">
                      {Object.entries(subcategories).map(
                        ([subcategory, services]) => (
                          <AccordionItem
                            key={subcategory}
                            value={subcategory}
                            className="border-b border-border"
                          >
                            <AccordionTrigger className="px-4 md:px-6 py-3 hover:no-underline group bg-background/50">
                              <div className="flex items-center justify-between w-full mr-4">
                                <div className="flex items-center gap-2">
                                  <h3 className="text-sm md:text-base lg:text-lg font-medium text-left group-hover:text-primary transition-colors">
                                    {subcategory}
                                  </h3>
                                  <Badge
                                    variant="outline"
                                    className="text-xs font-normal shrink-0"
                                  >
                                    {services.length}
                                  </Badge>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-0 bg-background">
                              <PricingServiceTable
                                services={services}
                                variant="nested"
                              />
                            </AccordionContent>
                          </AccordionItem>
                        ),
                      )}
                    </Accordion>
                  ) : (
                    // Regular table for categories without subcategories
                    <div className="bg-background">
                      <PricingServiceTable
                        services={subcategories["main"] || []}
                        variant="main"
                      />
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export { PricingAccordion };
