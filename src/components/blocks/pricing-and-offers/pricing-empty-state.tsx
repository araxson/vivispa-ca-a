import { EmptyState as UniversalEmptyState } from "@/components/ui/empty-state";
import { SearchX } from "lucide-react";

interface PricingEmptyStateProps {
  message?: string;
  description?: string;
}

/**
 * @deprecated Use the universal EmptyState component directly.
 * This component is maintained for backward compatibility.
 */
export const PricingEmptyState: React.FC<PricingEmptyStateProps> = ({
  message = "No services found",
  description = "Try adjusting your filters or search criteria",
}) => {
  return (
    <UniversalEmptyState
      icon={SearchX}
      title={message}
      description={description}
      variant="card"
    />
  );
};
