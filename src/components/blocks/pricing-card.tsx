import Link from 'next/link';
import { Card, CardContent, CardHeader, Button, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { ServiceItem } from '@/types/pricing';
import { ExternalLink, Calendar } from 'lucide-react';

interface PricingCardProps {
  service: ServiceItem;
  variant?: 'default' | 'compact';
  showBooking?: boolean;
  className?: string;
}

export function PricingCard({ 
  service, 
  variant = 'default',
  showBooking = true,
  className 
}: PricingCardProps) {
  const isCompact = variant === 'compact';

  return (
    <Card className={cn(
      "h-full border border-border bg-card",
      className
    )}>
      <CardHeader className={cn(
        "pb-3",
        isCompact ? "p-3 sm:p-4" : "p-4 sm:p-6"
      )}>
        <div className="space-y-2">
          <h3 className={cn(
            "font-semibold text-foreground leading-tight",
            isCompact ? "text-xs sm:text-sm" : "text-sm sm:text-base"
          )}>
            {service.name}
          </h3>
          
          {service.subcategory && (
            <Badge variant="secondary" className="text-xs w-fit">
              {service.subcategory}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className={cn(
        "pt-0 flex flex-col justify-between h-full",
        isCompact ? "p-3 sm:p-4 pt-0" : "p-4 sm:p-6 pt-0"
      )}>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <span className={cn(
              "font-bold text-primary",
              isCompact ? "text-base sm:text-lg" : "text-lg sm:text-xl"
            )}>
              {service.price}
            </span>
          </div>
        </div>
        
        {showBooking && (
          <div className="space-y-2">
            <Button 
              asChild 
              className="w-full" 
              size={isCompact ? "sm" : "default"}
            >
              <Link href={service.url} className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Book Now
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              className="w-full" 
              size={isCompact ? "sm" : "default"}
            >
              <Link href={service.url} className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Learn More
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 