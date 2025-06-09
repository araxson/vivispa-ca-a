import { Badge, Section } from "@/components/ui";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./section-header";

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
    <Section background="muted" className={className}>
      <SectionHeader title={title} subtitle={subtitle} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result, index) => (
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
        ))}
      </div>
    </Section>
  );
}
