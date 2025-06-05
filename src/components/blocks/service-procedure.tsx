import { Card, CardContent, CardHeader, CardTitle, Container, Section } from '@/components/ui';
import { cn } from '@/lib/utils';

interface ProcedureStep {
  title: string;
  description: string;
  duration?: string;
}

interface ServiceProcedureProps {
  steps: ProcedureStep[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function ServiceProcedure({
  steps,
  title = "Procedure Steps",
  subtitle = "What to expect during your treatment",
  className
}: ServiceProcedureProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <Section spacing="lg" className={className}>
      <Container>
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-primary font-bold text-lg">{index + 1}</span>
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 sm:mb-4">{step.description}</p>
                {step.duration && (
                  <p className="text-sm font-semibold text-primary">
                    Duration: {step.duration}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
} 