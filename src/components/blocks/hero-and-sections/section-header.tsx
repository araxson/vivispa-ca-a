import { cn } from "@/lib/utils";
import { spacing } from "@/lib/spacing";
import type { HeaderProps } from "@/types/prop-mixins";

export function SectionHeader({
  title,
  subtitle,
  className,
  as: Tag = "h2",
}: HeaderProps & { className?: string }) {
  if (!title) return null;

  return (
    <div className={cn("text-center", spacing.margin.lg, className)}>
      <Tag
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground",
          spacing.margin.sm
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
