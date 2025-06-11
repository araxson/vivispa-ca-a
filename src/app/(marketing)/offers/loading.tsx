"use client";

import { Section, UniversalGrid } from "@/components/ui";
import {
  Skeleton,
  SkeletonCard,
  SkeletonGrid,
} from "@/components/ui/skeleton";

export default function OffersPageLoading() {
  return (
    <Section spacing="md">
      <div className="space-y-8" role="status" aria-label="Loading offers">        {/* Filters Skeleton */}
        <div className="bg-card border border-border rounded-2xl p-4">          <UniversalGrid
            items={[{id: 1}, {id: 2}, {id: 3}, {id: 4}]}
            renderItem={(_, index) => <Skeleton key={index} className="h-11 w-full" />}
            columns={4}
            gap="sm"
          />
        </div>

        {/* Results Summary Skeleton */}
        <div className="text-center">
          <Skeleton className="h-6 w-48 mx-auto" />
        </div>

        {/* Grid Skeleton */}
        <SkeletonGrid count={6} />

        {/* Screen reader announcement */}
        <div className="sr-only">Loading special offers, please wait...</div>
      </div>
    </Section>
  );
} 