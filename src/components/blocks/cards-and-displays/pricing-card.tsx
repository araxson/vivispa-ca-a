import { UniversalCard, type PricingCardData as UniversalPricingData } from "@/components/ui/universal-card";
import { cn } from "@/lib/utils";
import type { ServiceItem } from "@/types/pricing";
import type { ItemCardProps, VisibilityProps } from "@/types/universal";

// Updated interface to use universal pattern - eliminates duplicate props
interface PricingCardProps extends 
  Omit<ItemCardProps<ServiceItem>, 'item' | 'variant'>,
  Pick<VisibilityProps, 'showBooking'> {
  service: ServiceItem;
  variant?: "default" | "compact"; // Keep existing variants for backward compatibility
}

// Transform service data to match UniversalCard format
function transformPricingData(service: ServiceItem): UniversalPricingData {
  const baseData = {
    id: service.name.toLowerCase().replace(/\s+/g, '-'),
    title: service.name,
    name: service.name,
    description: service.name,
    price: service.price,
    url: service.url,
  };

  // Only include subcategory if it has a value
  const optionalFields: Partial<UniversalPricingData> = {};
  if (service.subcategory) {
    optionalFields.subcategory = service.subcategory;
  }

  return { ...baseData, ...optionalFields };
}

export function PricingCard({
  service,
  variant = "default",
  showBooking = true,
  className,
}: PricingCardProps) {
  return (
    <UniversalCard
      data={transformPricingData(service)}
      variant="pricing"
      layout={variant}
      features={{
        showImage: false,
        showBadges: true,
        showLocations: false,
        showPricing: true,
        showBooking,
        showAnimation: true,
      }}
      className={cn("h-full border border-border bg-card", className)}
    />
  );
}
