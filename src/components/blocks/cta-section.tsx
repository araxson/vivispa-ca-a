import Link from 'next/link';
import { Button, Container, Section } from '@/components/ui';
import { ArrowRight, Phone, Calendar, Mail } from 'lucide-react';

interface CTAButton {
  text: string;
  href: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  icon?: 'phone' | 'calendar' | 'mail' | 'arrow';
}

interface CTASectionProps {
  title: string;
  description?: string;
  primaryCTA: CTAButton;
  secondaryCTA?: CTAButton;
  className?: string;
  variant?: string;
}

const iconMap = {
  phone: Phone,
  calendar: Calendar,
  mail: Mail,
  arrow: ArrowRight,
};

export function CTASection({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  className
}: CTASectionProps) {
  const PrimaryIcon = primaryCTA.icon ? iconMap[primaryCTA.icon] : null;
  const SecondaryIcon = secondaryCTA?.icon ? iconMap[secondaryCTA.icon] : null;

  return (
    <Section spacing="lg" className={className}>
      <Container>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              variant={primaryCTA.variant || 'default'}
              className="px-6 py-3 text-base sm:text-lg w-full sm:w-auto"
            >
              <Link href={primaryCTA.href} className="flex items-center gap-2">
                {primaryCTA.text}
                {PrimaryIcon && <PrimaryIcon className="w-5 h-5" />}
              </Link>
            </Button>
            
            {secondaryCTA && (
              <Button 
                asChild 
                size="lg" 
                variant={secondaryCTA.variant || 'outline'}
                className="px-6 py-3 text-base sm:text-lg w-full sm:w-auto"
              >
                <Link href={secondaryCTA.href} className="flex items-center gap-2">
                  {secondaryCTA.text}
                  {SecondaryIcon && <SecondaryIcon className="w-5 h-5" />}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
} 