"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui";
import { ResponsiveGrid } from "@/components/ui/responsive-grid";
import { PricingCard } from "@/components/blocks/cards-and-displays/pricing-card";
import type { ServiceItem } from "@/types/pricing";

interface PricingCategorySectionProps {
  category: string;
  services: ServiceItem[];
  isExpanded?: boolean;
}

export function PricingCategorySection({
  category,
  services,
  isExpanded = true,
}: PricingCategorySectionProps) {
  const [expanded, setExpanded] = useState(isExpanded);

  if (services.length === 0) return null;

  // Group services by subcategory if they exist
  const servicesBySubcategory = services.reduce(
    (acc, service) => {
      const key = service.subcategory || "main";
      if (!acc[key]) acc[key] = [];
      acc[key].push(service);
      return acc;
    },
    {} as Record<string, ServiceItem[]>,
  );

  const hasSubcategories =
    Object.keys(servicesBySubcategory).length > 1 ||
    !servicesBySubcategory["main"];

  return (
    <div className="bg-card rounded-lg border">
      <div className="p-6 border-b border-border">
        <Button
          variant="ghost"
          onClick={() => setExpanded(!expanded)}
          className="w-full justify-between text-left p-0 h-auto hover:bg-transparent"
        >
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">
              {category}
            </h2>
            <p className="text-sm text-muted-foreground">
              {services.length} service{services.length !== 1 ? "s" : ""}{" "}
              available
            </p>
          </div>
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </Button>
      </div>

      {expanded && (
        <div className="p-6">
          {hasSubcategories ? (
            <div className="space-y-8">
              {Object.entries(servicesBySubcategory).map(
                ([subcategory, subcategoryServices]) => (
                  <div key={subcategory}>
                    {subcategory !== "main" && (
                      <h3 className="text-lg font-semibold text-foreground mb-4 border-l-4 border-primary pl-3">
                        {subcategory}
                      </h3>
                    )}
                    <ResponsiveGrid preset="pricing" showAnimation={true}>
                      {subcategoryServices.map((service, index) => (
                        <PricingCard
                          key={`${service.name}-${index}`}
                          service={service}
                        />
                      ))}
                    </ResponsiveGrid>
                  </div>
                ),
              )}
            </div>
          ) : (
            <ResponsiveGrid preset="pricing" showAnimation={true}>
              {services.map((service, index) => (
                <PricingCard
                  key={`${service.name}-${index}`}
                  service={service}
                />
              ))}
            </ResponsiveGrid>
          )}
        </div>
      )}
    </div>
  );
}
