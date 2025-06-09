import { cn } from "@/lib/utils";
import { spacing } from "@/lib/spacing";

interface SectionHeaderProps {
  title: string;
  subtitle?: string | undefined;
  className?: string | undefined;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function SectionHeader({
  title,
  subtitle,
  className,
  as: Tag = "h2",
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center", spacing.margin.lg, className)}>
      <Tag
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground",
          spacing.margin.sm,
        )}
      >
        {title}
      </Tag>
      {subtitle && (
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
