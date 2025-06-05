import { Skeleton, SkeletonCard, Container } from "@/components/ui";

interface PageLoadingProps {
  title?: string;
  description?: string;
  gridItems?: number;
  sections?: Array<{
    name: string;
    items: number;
    columns?: number;
  }>;
}

export function PageHeaderSkeleton() {
  return (
    <div className="mb-8">
      <Skeleton className="h-8 w-48 mb-4" />
      <Skeleton className="h-4 w-96 mb-2" />
      <Skeleton className="h-4 w-80" />
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="border rounded-lg p-6">
      <SkeletonCard showImage={true} showTitle={true} showDescription={true} />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative">
      <Skeleton className="h-96 w-full" />
      <div className="absolute inset-0 bg-foreground/20" />
      <Container className="absolute inset-0 flex items-center">
        <div className="text-background space-y-4 max-w-2xl">
          <Skeleton className="h-12 w-96 bg-background/20" />
          <Skeleton className="h-6 w-80 bg-background/20" />
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-12 w-32 bg-background/20" />
            <Skeleton className="h-12 w-32 bg-background/20" />
          </div>
        </div>
      </Container>
    </div>
  );
}

export function SectionSkeleton({ 
  title = true, 
  description = true, 
  items = 3, 
  columns = 3 
}: {
  title?: boolean;
  description?: boolean;
  items?: number;
  columns?: number;
}) {
  return (
    <section className="space-y-8">
      {title && (
        <div className="text-center space-y-4">
          <Skeleton className="h-8 w-48 mx-auto" />
          {description && <Skeleton className="h-6 w-80 mx-auto" />}
        </div>
      )}
      <div className={`grid gap-8 ${
        columns === 1 ? 'grid-cols-1' :
        columns === 2 ? 'grid-cols-1 md:grid-cols-2' :
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}>
        {Array.from({ length: items }).map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

export function ServicesPageLoading({ gridItems = 6 }: PageLoadingProps) {
  return (
    <Container className="py-8">
      <PageHeaderSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: gridItems }).map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </div>
    </Container>
  );
}

export function ServiceDetailPageLoading() {
  return (
    <div className="min-h-screen">
      <HeroSkeleton />
      <Container className="py-16 space-y-16">
        <SectionSkeleton title={true} description={true} items={1} columns={2} />
        <SectionSkeleton title={true} description={true} items={6} columns={3} />
        <SectionSkeleton title={true} description={true} items={1} columns={2} />
        <SectionSkeleton title={true} description={true} items={8} columns={4} />
        <SectionSkeleton title={true} description={true} items={1} columns={2} />
        <SectionSkeleton title={true} description={true} items={5} columns={1} />
        <SectionSkeleton title={true} description={true} items={3} columns={3} />
        <section className="text-center space-y-8 py-16 bg-muted/50 rounded-2xl">
          <div className="space-y-4">
            <Skeleton className="h-10 w-96 mx-auto" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>
          <div className="flex justify-center gap-4">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </section>
      </Container>
    </div>
  );
} 