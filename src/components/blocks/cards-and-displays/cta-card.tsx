import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UniversalCard, type CtaCardData } from "@/components/ui/universal-card";

interface CtaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

// Transform CTA data to UniversalCard format
function transformCtaData(props: CtaCardProps): CtaCardData {
  return {
    id: `cta-${Date.now()}`, // Generate a unique ID
    title: props.title,
    description: props.description,
    buttonText: props.buttonText,
    buttonLink: props.buttonLink,
  };
}

export function CtaCard(props: CtaCardProps) {
  const { title, description, buttonText, buttonLink, className, ...rest } = props;
  
  return (
    <div {...rest}>
      <UniversalCard
        data={transformCtaData(props)}
        variant="cta"
        layout="default"
        features={{
          showImage: false,
          showBadges: false,
          showLocations: false,
          showPricing: false,
          showBooking: false,
          showAnimation: false,
        }}
        {...(className && { className })}
      />
    </div>
  );
} 