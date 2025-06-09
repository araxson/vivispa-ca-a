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
  if (!servicesByCategory) return null;

  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {Object.entries(servicesByCategory).map(([category, subcategories]) => {
        const totalServices = Object.values(subcategories).flat().length;
        const hasSubcategories =
          Object.keys(subcategories).length > 1 ||
          !subcategories.hasOwnProperty("main");

        if (totalServices === 0) return null;

        return (
          <AccordionItem
            key={category}
            value={category}
            className="overflow-hidden rounded-lg border"
          >
            <AccordionTrigger className="group hover:no-underline px-4 md:px-6">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-left text-base font-semibold capitalize transition-colors group-hover:text-primary md:text-lg lg:text-xl">
                    {category}
                  </h2>
                  <Badge
                    variant="secondary"
                    className="shrink-0 text-xs font-normal"
                  >
                    {totalServices} service{totalServices !== 1 ? "s" : ""}
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="p-0">
              <div className="border-t bg-muted/20">
                {hasSubcategories ? (
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full bg-background"
                  >
                    {Object.entries(subcategories).map(
                      ([subcategory, services]) => (
                        <AccordionItem
                          key={subcategory}
                          value={subcategory}
                          className="border-b last:border-b-0 md:px-6"
                        >
                          <AccordionTrigger className="group py-3 hover:no-underline">
                            <div className="flex w-full items-center justify-between">
                              <div className="flex items-center gap-2">
                                <h3 className="text-left text-sm font-medium transition-colors group-hover:text-primary md:text-base lg:text-lg">
                                  {subcategory}
                                </h3>
                                <Badge
                                  variant="outline"
                                  className="shrink-0 text-xs font-normal"
                                >
                                  {services.length}
                                </Badge>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="">
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
                  <div className="bg-background p-4 md:p-6">
                    <PricingServiceTable
                      services={subcategories.main ?? []}
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
  );
};

export { PricingAccordion };
