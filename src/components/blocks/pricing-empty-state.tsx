import { Card, CardContent } from "@/components/ui";
import { SearchX } from "lucide-react";

interface PricingEmptyStateProps {
  message?: string;
  description?: string;
}

export function PricingEmptyState({
  message = "No services found",
  description = "Try adjusting your filters or search criteria",
}: PricingEmptyStateProps) {
  return (
    <Card className="max-w-md mx-auto text-center">
      <CardContent className="p-6 sm:p-8">
        <SearchX className="h-12 w-12 text-muted-foreground mx-auto mb-4 sm:mb-6" />
        <h2 className="text-2xl font-bold text-foreground mb-4 sm:mb-6">
          {message}
        </h2>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
