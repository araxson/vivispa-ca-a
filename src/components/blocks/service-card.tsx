import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  FadeIn,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { ArrowRight, MapPin } from "lucide-react";
import type { ServiceCardData } from "@/types/service";
import { type CardProps } from "@/components/ui/card";

interface ServiceCardProps {
  service: ServiceCardData;
  layout?: "default" | "compact";
  showLocations?: boolean;
  className?: string;
}

export function ServiceCard({
  service,
  layout = "default",
  showLocations = true,
  className,
}: ServiceCardProps) {
  const isCompact = layout === "compact";

  return (
    <FadeIn>
      <Card
        variant="service"
        className={cn("h-full", className)}
      >
        <div
          className={cn(
            "relative overflow-hidden",
            isCompact ? "aspect-[4/3]" : "aspect-[3/2]",
          )}
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-all duration-500 group-hover:brightness-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardHeader
          className={cn(
            isCompact
              ? "px-3 sm:px-4 pt-3 sm:pt-4 pb-2"
              : "px-4 sm:px-6 pt-4 sm:pt-6 pb-3",
          )}
        >
          <CardTitle
            className={cn(
              "leading-tight text-foreground group-hover:text-primary transition-colors duration-200",
              isCompact ? "text-base sm:text-lg" : "text-lg sm:text-xl",
            )}
          >
            {service.title}
          </CardTitle>
        </CardHeader>

        <CardContent
          className={cn(
            "flex-1 flex flex-col",
            isCompact ? "px-3 sm:px-4 pt-0" : "p-4 sm:p-6 pt-0", // Matched CardHeader's px, but pt-0 is crucial
          )}
        >
          <p
            className={cn(
              "text-muted-foreground leading-relaxed flex-1 mb-4 sm:mb-6",
              isCompact
                ? "text-xs sm:text-sm line-clamp-2"
                : "text-sm line-clamp-3",
            )}
          >
            {service.previewDescription}
          </p>

          {showLocations &&
            service.availableLocations &&
            service.availableLocations.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                {service.availableLocations.map((location) => (
                  <Badge
                    key={location}
                    variant="primary-light"
                    className="px-2 py-1"
                  >
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {location
                      .replace("-", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </Badge>
                ))}
              </div>
            )}

          <Button
            asChild
            className="w-full mt-auto group/button"
            size={isCompact ? "sm" : "default"}
          >
            <Link
              href={`/services/${service.slug}`}
              className="flex items-center justify-center gap-2"
              aria-label={`Learn more about ${service.title}`}
            >
              Explore {service.title}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </FadeIn>
  );
}
