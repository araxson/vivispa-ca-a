import Link from 'next/link';
import Image from 'next/image';
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
  backgroundImage?: {
    src: string;
    alt: string;
  };
  backgroundVideo?: {
    src: string;
    poster?: string;
  };
  heroType?: 'image' | 'video' | 'none';
  className?: string;
}

export function Hero({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  backgroundVideo,
  heroType = 'image',
  className
}: HeroProps) {
  return (
    <Section spacing="xl" className={cn("relative overflow-hidden", className)}>
      {/* Background Media */}
      {heroType === 'video' && backgroundVideo && (
        <div className="absolute inset-0 w-full h-full -z-10">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={backgroundVideo.poster}
            className="object-cover w-full h-full"
          >
            <source src={backgroundVideo.src} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-background/60" /> {/* Overlay */}
        </div>
      )}
      
      {heroType === 'image' && backgroundImage && (
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src={backgroundImage.src}
            alt={backgroundImage.alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/60" /> {/* Overlay */}
        </div>
      )}

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