import { Card, CardContent, Container, Section } from '@/components/ui';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, Calendar } from 'lucide-react';

interface ServiceOverviewProps {
  overview: string;
  benefits?: string[];
  duration?: string;
  sessionInfo?: {
    recommended: number;
    interval: string;
  };
  className?: string;
}

export function ServiceOverview({
  overview,
  benefits = [],
  duration,
  sessionInfo,
  className
}: ServiceOverviewProps) {
  return (
    <Section spacing="lg" className={className}>
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                Overview
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8">
                {overview}
              </p>
              
              {benefits.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    Key Benefits
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10 hover:bg-primary/10 transition-colors duration-200">
                        <div className="w-5 h-5 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-foreground font-medium text-sm leading-relaxed">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {duration && (
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Duration
                    </h3>
                    <p className="text-muted-foreground">
                      {duration}
                    </p>
                  </CardContent>
                </Card>
              )}
              
              {sessionInfo && (
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Sessions
                    </h3>
                    <p className="text-muted-foreground">
                      {sessionInfo.recommended} sessions recommended, spaced {sessionInfo.interval} apart for optimal results.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
} 