import type { FilterItem } from "@/components/ui/filter-badges";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { getLayoutClasses } from "@/lib/layout-utils";

interface PricingResultsSummaryProps {
  totalResults: number;
  searchQuery?: string;
  location?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  className?: string;
}

export function PricingResultsSummary({
  totalResults,
  searchQuery,
  location,
  priceRange,
  className,
}: PricingResultsSummaryProps) {
  return (
    <section
      className={cn("text-center", className)}
      aria-label="Search results summary"
    >
      <div className={cn(getLayoutClasses("responsiveFlex"), "justify-center text-lg text-muted-foreground")}>
        <span>
          Found <strong className="text-foreground">{totalResults}</strong>{" "}
          service{totalResults !== 1 ? "s" : ""}
        </span>

        {(searchQuery || location || priceRange) && (
          <div className="flex flex-wrap items-center gap-2">
            {searchQuery && (
              <Badge variant="secondary" className="text-xs">
                Search: {searchQuery}
              </Badge>
            )}
            {location && (
              <Badge variant="secondary" className="text-xs">
                Location: {location}
              </Badge>
            )}
            {priceRange && (
              <Badge variant="secondary" className="text-xs">
                ${priceRange.min} - ${priceRange.max}
              </Badge>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
