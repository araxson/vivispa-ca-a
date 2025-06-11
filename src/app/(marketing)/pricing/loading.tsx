"use client";

import { Section, UniversalGrid } from "@/components/ui";
import {
  Skeleton,
  SkeletonText,
  SkeletonCard,
} from "@/components/ui/skeleton";

export default function PricingPageLoading() {
  return (
    <Section spacing="sm">
      <div className="space-y-12" role="status" aria-label="Loading pricing">
        {/* Header Skeleton */}
        <div className="text-center">
          <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>        {/* Filters Skeleton */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-4">            <UniversalGrid
              items={[{id: 1}, {id: 2}, {id: 3}, {id: 4}]}
              renderItem={(_, index) => <Skeleton key={index} className="h-11 w-full" />}
              columns={4}
              gap="sm"
            />
          </div>
          <div className="text-center">
            <Skeleton className="h-6 w-48 mx-auto" />
          </div>
        </div>

        {/* Accordion Skeleton */}
        <div className="space-y-4">
          <SkeletonCard showImage={false} showTitle={true} showDescription={true} />
          <SkeletonCard showImage={false} showTitle={true} showDescription={true} />
          <SkeletonCard showImage={false} showTitle={true} showDescription={true} />
        </div>

        <div className="sr-only">Loading services and pricing...</div>
      </div>
    </Section>
  );
} 