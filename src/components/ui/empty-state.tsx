import { Card, CardContent } from "./card";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { SearchX } from "lucide-react";

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: "card" | "default";
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = SearchX,
  title,
  description,
  action,
  variant = "default",
  className,
}) => {
  const content = (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-3">{title}</h2>
      <p className="text-muted-foreground max-w-md leading-relaxed mb-6">
        {description}
      </p>
      {action && (
        <Button onClick={action.onClick} variant="default" size="lg">
          {action.label}
        </Button>
      )}
    </div>
  );

  if (variant === "card") {
    return (
      <Card className={cn("max-w-md mx-auto", className)}>
        <CardContent className="p-8">{content}</CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("py-16", className)} role="alert" aria-live="polite">
      {content}
    </div>
  );
}; 