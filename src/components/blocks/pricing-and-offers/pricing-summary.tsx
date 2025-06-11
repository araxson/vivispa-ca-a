import { Card, CardContent, Badge } from "@/components/ui";
import { ResponsiveGrid } from "@/components/ui/responsive-grid";
import type { ServiceItem } from "@/types/pricing";

interface PricingSummaryProps {
  services: ServiceItem[];
  totalServices: number;
  searchTerm: string;
  selectedCategory: string;
  selectedPriceRange: string;
}

export function PricingSummary({
  services,
  totalServices,
  searchTerm,
  selectedCategory,
  selectedPriceRange,
}: PricingSummaryProps) {
  // Calculate price statistics
  const prices = services.map((service) =>
    parseFloat(service.price.replace(/[$,]/g, "")),
  );
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
  const avgPrice =
    prices.length > 0
      ? prices.reduce((sum, price) => sum + price, 0) / prices.length
      : 0;

  // Get unique categories
  const categories = [...new Set(services.map((service) => service.category))];

  const hasFilters =
    searchTerm || selectedCategory !== "all" || selectedPriceRange !== "all";

  return (
    <Card className="bg-gradient-to-r from-muted/50 to-muted/70 border-border">
      <CardContent className="p-6">
        <ResponsiveGrid preset="pricing">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {services.length}
            </div>
            <div className="text-sm text-muted-foreground">
              {hasFilters ? "Results Found" : "Total Services"}
            </div>
            {hasFilters && totalServices !== services.length && (
              <div className="text-xs text-muted-foreground mt-1">
                of {totalServices} total
              </div>
            )}
          </div>

          {prices.length > 0 && (
            <>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-foreground">
                  ${minPrice.toFixed(0)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Starting From
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-accent-foreground">
                  ${maxPrice.toFixed(0)}
                </div>
                <div className="text-sm text-muted-foreground">Up To</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-accent-foreground">
                  ${avgPrice.toFixed(0)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Average Price
                </div>
              </div>
            </>
          )}
        </ResponsiveGrid>

        {categories.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground mb-2">
              Categories:
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {hasFilters && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground mb-2">
              Active Filters:
            </div>
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <Badge variant="outline" className="text-xs">
                  Search: "{searchTerm}"
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="outline" className="text-xs">
                  Category: {selectedCategory}
                </Badge>
              )}
              {selectedPriceRange !== "all" && (
                <Badge variant="outline" className="text-xs">
                  Price:{" "}
                  {selectedPriceRange === "301+"
                    ? "$301+"
                    : `$${selectedPriceRange.replace("-", " - $")}`}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
