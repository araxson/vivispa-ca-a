import { Badge, UniversalSection } from "@/components/ui";
import { cn } from "@/lib/utils";

interface ResultItem {
  value: string;
  metric: string;
  description?: string;
}

interface ServiceResultsProps {
  results: ResultItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function ServiceResults({
  results,
  title = "Expected Results",
  subtitle = "What you can expect from this treatment",
  className,
}: ServiceResultsProps) {
  if (!results || results.length === 0) return null;

  return (
    <UniversalSection
      title={title}
      subtitle={subtitle}
      items={results}
      renderItem={(result: ResultItem, index: number) => (
        <div key={index} className="text-center space-y-3 sm:space-y-4">
          <div className="text-3xl font-bold text-primary">
            {result.value}
          </div>
          <Badge variant="secondary" className="text-sm">
            {result.metric}
          </Badge>
          {result.description && (
            <p className="text-muted-foreground text-sm">
              {result.description}
            </p>
          )}
        </div>
      )}
      columns={3}
      gap="lg"
      spacing="lg"
      background="muted"
      className={className}
    />
  );
}
