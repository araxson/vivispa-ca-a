import { UniversalCard, type ServiceCardData as UniversalServiceData } from "@/components/ui/universal-card";
import { cn } from "@/lib/utils";
import type { ServiceCardData } from "@/types/service";
import type { ItemCardProps } from "@/types/universal";

// Updated interface to use universal pattern - eliminates duplicate props
interface ServiceCardProps extends Omit<ItemCardProps<ServiceCardData>, 'item'> {
  service: ServiceCardData;
  layout?: "default" | "compact";
  showLocations?: boolean;
}

// Transform service data to match UniversalCard format
function transformServiceData(service: ServiceCardData): UniversalServiceData {
  return {
    id: service.id,
    title: service.title,
    description: service.previewDescription,
    image: service.image,
    previewDescription: service.previewDescription,
    availableLocations: service.availableLocations?.map(loc => 
      loc.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
    ) || [],
    slug: service.slug,
    href: `/services/${service.slug}`,
  };
}

export function ServiceCard({
  service,
  layout = "default",
  showLocations = true,
  className,
}: ServiceCardProps) {
  return (
    <UniversalCard
      data={transformServiceData(service)}
      variant="service"
      layout={layout}
      features={{
        showImage: true,
        showBadges: false,
        showLocations,
        showPricing: false,
        showBooking: true,
        showAnimation: true,
      }}
      styling={{
        aspectRatio: layout === "compact" ? "4/3" : "3/2",
      }}
      className={cn("h-full", className)}
    />
  );
}
