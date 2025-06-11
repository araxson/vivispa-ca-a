import * as React from "react";
import { cn } from "@/lib/utils";
import { gridVariants } from "@/lib/spacing";
import { EmptyState } from "./empty-state";
import { GridSkeleton } from "./skeleton";

interface UniversalGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  columns?: "auto" | number;
  gap?: "sm" | "md" | "lg";
  emptyState?: React.ReactNode;
  loadingState?: React.ReactNode;
  isLoading?: boolean;
}

export function UniversalGrid<T>({
  items,
  renderItem,
  columns = "auto",
  gap = "md",
  emptyState,
  loadingState,
  isLoading,
  className,
}: UniversalGridProps<T>) {
  if (isLoading) return loadingState || <GridSkeleton />;
  if (items.length === 0) return emptyState || <EmptyState />;

  return (
    <div className={cn(gridVariants({ cols: columns, gap }), className)}>
      {items.map(renderItem)}
    </div>
  );
} 