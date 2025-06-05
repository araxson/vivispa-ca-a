'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useBreadcrumbs, type BreadcrumbItem as BreadcrumbItemType } from '@/hooks/use-breadcrumbs';
import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
  className?: string;
  showHomeIcon?: boolean;
  hideOnHome?: boolean;
  maxItems?: number;
}

type EllipsisItem = {
  label: string;
  isEllipsis: true;
};

type DisplayBreadcrumbItem = BreadcrumbItemType | EllipsisItem;

export function Breadcrumbs({ 
  className, 
  showHomeIcon = true,
  hideOnHome = true,
  maxItems = 6
}: BreadcrumbsProps) {
  const breadcrumbs = useBreadcrumbs();

  // Hide breadcrumbs on home page if hideOnHome is true
  if (hideOnHome && breadcrumbs.length === 1) {
    return null;
  }

  // Truncate breadcrumbs if they exceed maxItems
  const displayedBreadcrumbs: DisplayBreadcrumbItem[] = breadcrumbs.length > maxItems 
    ? [
        breadcrumbs[0]!, // Always show Home (we know it exists)
        { label: '...', isEllipsis: true },
        ...breadcrumbs.slice(-2).filter(Boolean) // Show last 2 items, filter out any undefined
      ]
    : breadcrumbs;

  return (
    <nav className={cn('mb-6', className)} aria-label="Breadcrumb navigation">
      <Breadcrumb>
        <BreadcrumbList>
          {displayedBreadcrumbs.map((item, index) => {
            const isLast = index === displayedBreadcrumbs.length - 1;
            
            // Handle ellipsis
            if ('isEllipsis' in item && item.isEllipsis) {
              return (
                <BreadcrumbItem key={`ellipsis-${index}`}>
                  <span className="text-muted-foreground">...</span>
                  {!isLast && <BreadcrumbSeparator />}
                </BreadcrumbItem>
              );
            }

            // TypeScript now knows this is a BreadcrumbItemType
            const breadcrumbItem = item as BreadcrumbItemType;

            return (
              <BreadcrumbItem key={breadcrumbItem.href || breadcrumbItem.label}>
                {breadcrumbItem.isCurrentPage ? (
                  <BreadcrumbPage>
                    {index === 0 && showHomeIcon ? (
                      <span className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        <span className="sr-only">{breadcrumbItem.label}</span>
                      </span>
                    ) : (
                      breadcrumbItem.label
                    )}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={breadcrumbItem.href!}>
                      {index === 0 && showHomeIcon ? (
                        <span className="flex items-center gap-2">
                          <Home className="h-4 w-4" />
                          <span className="sr-only sm:not-sr-only sm:inline">
                            {breadcrumbItem.label}
                          </span>
                        </span>
                      ) : (
                        breadcrumbItem.label
                      )}
                    </Link>
                  </BreadcrumbLink>
                )}
                {!isLast && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}

// Alternative compact version for mobile or constrained spaces
export function CompactBreadcrumbs({ className }: { className?: string }) {
  const breadcrumbs = useBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  const currentPage = breadcrumbs[breadcrumbs.length - 1];
  const parentPage = breadcrumbs.length > 2 ? breadcrumbs[breadcrumbs.length - 2] : breadcrumbs[0];

  // Guard against undefined parentPage
  if (!parentPage || !currentPage) {
    return null;
  }

  return (
    <nav className={cn('mb-4', className)} aria-label="Compact breadcrumb navigation">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={parentPage.href || '/'} className="flex items-center gap-1">
                <Home className="h-3 w-3" />
                <span className="sr-only sm:not-sr-only sm:inline text-sm">
                  {breadcrumbs.length > 2 ? parentPage.label : 'Home'}
                </span>
              </Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-sm font-medium">
              {currentPage.label}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
