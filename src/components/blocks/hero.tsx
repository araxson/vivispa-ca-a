import Link from "next/link";
import Image from "next/image";
import { Button, Container, Section } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { SpacingSize } from "@/lib/spacing";

interface HeroProps {
  title: string;
  description: string;
  primaryCTA?: {
    text: string;
    href: string;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
  };
  secondaryCTA?: {
    text: string;
    href: string;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
  };
  backgroundImage?: {
    src: string;
    alt: string;
  };
  backgroundVideo?: {
    src: string;
    poster?: string;
  };
  heroType?: "image" | "video" | "none";
  className?: string;
  spacing?: SpacingSize;
}

export function Hero({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  backgroundVideo,
  heroType = "image",
  className,
  spacing = "lg",
}: HeroProps) {
  return (
    <Section
      spacing={spacing}
      className={cn("relative overflow-hidden", className)}
      maxWidth="4xl"
    >
      {/* Background Media */}
      {heroType === "video" && backgroundVideo && (
        <div className="absolute inset-0 w-full h-full -z-10">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={backgroundVideo.poster}
            className="object-cover w-full h-full"
            title={title}
          >
            <source src={`${backgroundVideo.src}.mp4`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-background/60" /> {/* Overlay */}
        </div>
      )}

      {heroType === "image" && backgroundImage && (
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src={backgroundImage.src}
            alt={backgroundImage.alt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-background/60" /> {/* Overlay */}
        </div>
      )}

      <Container>
        <div className="text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            {title}
          </h1>

          <p className="max-w-2xl mx-auto text-base text-muted-foreground leading-relaxed sm:text-lg md:text-xl">
            {description}
          </p>

          {(primaryCTA || secondaryCTA) && (
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              {primaryCTA && (
                <Button
                  asChild
                  size="xl"
                  variant={primaryCTA.variant || "default"}
                  className="w-full sm:w-auto"
                >
                  <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
                </Button>
              )}

              {secondaryCTA && (
                <Button
                  asChild
                  size="xl"
                  variant={secondaryCTA.variant || "outline"}
                  className="w-full sm:w-auto"
                >
                  <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
