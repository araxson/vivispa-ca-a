import Link from 'next/link';
import { Button, Container, Section } from '@/components/ui';
import { cn } from '@/lib/utils';

interface HeroProps {
  title: string;
  description: string;
  primaryCTA?: {
    text: string;
    href: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  };
  secondaryCTA?: {
    text: string;
    href: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  };
  className?: string;
}

export function Hero({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  className
}: HeroProps) {
  return (
    <Section spacing="xl" className={className}>
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            {title}
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
          
          {(primaryCTA || secondaryCTA) && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2">
              {primaryCTA && (
                <Button 
                  asChild 
                  size="lg" 
                  variant={primaryCTA.variant || 'default'}
                  className={cn(
                    "px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg",
                    "w-full sm:w-auto"
                  )}
                >
                  <Link href={primaryCTA.href}>
                    {primaryCTA.text}
                  </Link>
                </Button>
              )}
              
              {secondaryCTA && (
                <Button 
                  asChild 
                  size="lg"
                  variant={secondaryCTA.variant || 'outline'}
                  className={cn(
                    "px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg",
                    "w-full sm:w-auto"
                  )}
                >
                  <Link href={secondaryCTA.href}>
                    {secondaryCTA.text}
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
} 