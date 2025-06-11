import Link from "next/link";
import { Button, Section } from "@/components/ui";
import { ArrowRight, Phone, Calendar, Mail, ExternalLink } from "lucide-react";
import { SectionHeader } from "./section-header";
import type { SpacingSize } from "@/lib/spacing";

interface CTAButton {
  text: string;
  href: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  icon?: "phone" | "calendar" | "mail" | "arrow" | "external";
  external?: boolean;
}

interface CTASectionProps {
  title: string;
  description?: string | undefined;
  primaryCTA: CTAButton;
  secondaryCTA?: CTAButton | undefined;
  className?: string;
  variant?: string;
  spacing?: SpacingSize;
}

const iconMap = {
  phone: Phone,
  calendar: Calendar,
  mail: Mail,
  arrow: ArrowRight,
  external: ExternalLink,
};

export function CTASection({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  className,
  spacing = "lg",
}: CTASectionProps) {
  const PrimaryIcon = primaryCTA.icon
    ? iconMap[primaryCTA.icon]
    : primaryCTA.external
      ? ExternalLink
      : null;
  const SecondaryIcon = secondaryCTA?.icon
    ? iconMap[secondaryCTA.icon]
    : secondaryCTA?.external
      ? ExternalLink
      : null;

  // Helper function to determine if a URL is external
  const isExternalUrl = (url: string) => {
    return url.startsWith("http://") || url.startsWith("https://");
  };

  // Automatically detect if URLs are external if not explicitly set
  const isPrimaryExternal =
    primaryCTA.external ?? isExternalUrl(primaryCTA.href);
  const isSecondaryExternal =
    secondaryCTA?.external ??
    (secondaryCTA ? isExternalUrl(secondaryCTA.href) : false);

  return (
    <Section spacing={spacing} className={className}>
      <div className="text-center">
        <SectionHeader title={title} subtitle={description} />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            variant={primaryCTA.variant || "default"}
            className="px-6 py-3 text-base sm:text-lg w-full sm:w-auto"
          >
            {isPrimaryExternal ? (
              <a
                href={primaryCTA.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                {primaryCTA.text}
                {PrimaryIcon && (
                  <PrimaryIcon className="w-5 h-5" aria-hidden="true" />
                )}
              </a>
            ) : (
              <Link href={primaryCTA.href} className="flex items-center gap-2">
                {primaryCTA.text}
                {PrimaryIcon && (
                  <PrimaryIcon className="w-5 h-5" aria-hidden="true" />
                )}
              </Link>
            )}
          </Button>

          {secondaryCTA && (
            <Button
              asChild
              size="lg"
              variant={secondaryCTA.variant || "outline"}
              className="px-6 py-3 text-base sm:text-lg w-full sm:w-auto"
            >
              {isSecondaryExternal ? (
                <a
                  href={secondaryCTA.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  {secondaryCTA.text}
                  {SecondaryIcon && (
                    <SecondaryIcon className="w-5 h-5" aria-hidden="true" />
                  )}
                </a>
              ) : (
                <Link
                  href={secondaryCTA.href}
                  className="flex items-center gap-2"
                >
                  {secondaryCTA.text}
                  {SecondaryIcon && (
                    <SecondaryIcon className="w-5 h-5" aria-hidden="true" />
                  )}
                </Link>
              )}
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}
