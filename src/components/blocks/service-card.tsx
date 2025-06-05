import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { ArrowRight, MapPin } from 'lucide-react';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    slug: string;
    previewDescription: string;
    image: string;
    availableLocations?: string[];
  };
  variant?: 'default' | 'compact';
  showLocations?: boolean;
  className?: string;
}

export function ServiceCard({ 
  service, 
  variant = 'default',
  showLocations = true,
  className 
}: ServiceCardProps) {
  const isCompact = variant === 'compact';

  return (
    <Card className={cn(
      "overflow-hidden h-full flex flex-col group transition-all duration-300",
      "border border-border/50 bg-card shadow-sm",
      "hover:border-primary/20",
      className
    )}>
      <div className={cn(
        "relative overflow-hidden",
        isCompact ? "aspect-[4/3]" : "aspect-[3/2]"
      )}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-all duration-500 group-hover:brightness-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardHeader className={cn(
        "pb-3",
        isCompact ? "p-3 sm:p-4" : "p-4 sm:p-6"
      )}>
        <CardTitle className={cn(
          "leading-tight text-foreground group-hover:text-primary transition-colors duration-200",
          isCompact ? "text-base sm:text-lg" : "text-lg sm:text-xl"
        )}>
          {service.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className={cn(
        "flex-1 flex flex-col",
        isCompact ? "p-3 sm:p-4 pt-0" : "p-4 sm:p-6 pt-0"
      )}>
        <p className={cn(
          "text-muted-foreground leading-relaxed flex-1 mb-4 sm:mb-6",
          isCompact ? "text-xs sm:text-sm line-clamp-2" : "text-sm line-clamp-3"
        )}>
          {service.previewDescription}
        </p>
        
        {showLocations && service.availableLocations && service.availableLocations.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {service.availableLocations.map((location) => (
              <Badge 
                key={location} 
                variant="secondary" 
                className={cn(
                  "text-xs font-medium flex items-center gap-1",
                  "bg-primary/10 text-primary border-primary/20",
                  "hover:bg-primary/20 transition-colors duration-200",
                  "px-2 py-1"
                )}
              >
                <MapPin className="h-3 w-3" />
                {location.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
            ))}
          </div>
        )}
        
        <Button 
          asChild 
          className={cn(
            "w-full mt-auto group/button",
            "bg-primary hover:bg-primary/90 text-primary-foreground",
            "transition-all duration-200"
          )} 
          size={isCompact ? "sm" : "default"}
        >
          <Link href={`/services/${service.slug}`} className="flex items-center justify-center gap-2" aria-label={`Learn more about ${service.title}`}>
            Explore {service.title}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
} 