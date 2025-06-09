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

interface CtaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export function CtaCard({
  title,
  description,
  buttonText,
  buttonLink,
  className,
  ...props
}: CtaCardProps) {
  return (
    <Card
      className={cn(
        "bg-primary text-primary-foreground overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className="relative p-6 sm:p-8">
        <div className="relative z-10 space-y-4">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription className="text-primary-foreground/90">
            {description}
          </CardDescription>
          <Link href={buttonLink}>
            <Button
              variant={null} // Explicitly remove variant to rely on custom classes
              className="group bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}