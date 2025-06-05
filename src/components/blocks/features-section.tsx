import { Card, CardContent, CardHeader, Badge, Container, Section } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { Check, Star, Zap } from 'lucide-react';
import Image from 'next/image';

interface Feature {
  id?: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  image?: string;
  category?: string;
  highlighted?: boolean;
  benefits?: string[];
}

interface FeaturesSectionProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'cards' | 'list' | 'grid' | 'benefits';
  maxItems?: number;
  className?: string;
}

export function FeaturesSection({
  features,
  title = "Features & Benefits",
  subtitle = "Discover what makes us different",
  variant = 'default',
  maxItems,
  className
}: FeaturesSectionProps) {
  if (!features || features.length === 0) {
    return null;
  }

  const displayFeatures = maxItems ? features.slice(0, maxItems) : features;

  // Benefits variant - simple layout for displaying treatment benefits
  if (variant === 'benefits') {
    return (
      <Section spacing="lg" background="muted" className={className}>
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {displayFeatures.map((feature, index) => (
            <Card key={feature.id || index} className="border">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Check className="h-5 w-5 sm:h-6 sm:w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    );
  }

  if (variant === 'list') {
    return (
      <Section spacing="lg" className={className}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {subtitle}
            </p>
          </div>
          
          <div className="space-y-6 sm:space-y-8">
            {displayFeatures.map((feature, index) => (
              <div key={feature.id || index} className="flex items-start gap-4 sm:gap-6 p-4 sm:p-6 rounded-lg bg-card border">
                <div className="flex-shrink-0">
                  {feature.icon ? (
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">{index + 1}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <h3 className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    {feature.highlighted && (
                      <Badge variant="default" className="text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    {feature.category && (
                      <Badge variant="secondary" className="text-xs">
                        {feature.category}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {feature.benefits && feature.benefits.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-2">
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {feature.image && (
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>
    );
  }

  if (variant === 'grid') {
    return (
      <Section spacing="lg" className={className}>
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className={cn(
          "grid gap-6",
          displayFeatures.length === 2 && "md:grid-cols-2",
          displayFeatures.length === 3 && "md:grid-cols-3",
          displayFeatures.length === 4 && "md:grid-cols-2 lg:grid-cols-4",
          displayFeatures.length > 4 && "md:grid-cols-2 lg:grid-cols-3"
        )}>
          {displayFeatures.map((feature, index) => (
            <FeatureCard key={feature.id || index} feature={feature} />
          ))}
        </div>
      </Section>
    );
  }

  // Default cards variant
  return (
    <Section spacing="lg" className={className}>
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {displayFeatures.map((feature, index) => (
          <FeatureCard key={feature.id || index} feature={feature} />
        ))}
      </div>
    </Section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <Card className={cn(
      "h-full border",
      feature.highlighted && "border-primary/50 bg-primary/5"
    )}>
      {feature.image && (
        <div className="relative aspect-[3/2] overflow-hidden rounded-t-lg">
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
            )}
            <h3 className="text-lg font-semibold text-foreground leading-tight">
              {feature.title}
            </h3>
          </div>
          
          {feature.highlighted && (
            <Badge variant="default" className="text-xs flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Featured
            </Badge>
          )}
        </div>
        
        {feature.category && (
          <Badge variant="outline" className="w-fit text-xs">
            {feature.category}
          </Badge>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-muted-foreground leading-relaxed mb-4">
          {feature.description}
        </p>
        
        {feature.benefits && feature.benefits.length > 0 && (
          <div className="space-y-2">
            {feature.benefits.slice(0, 3).map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
            {feature.benefits.length > 3 && (
              <p className="text-xs text-muted-foreground mt-2">
                +{feature.benefits.length - 3} more benefits
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 