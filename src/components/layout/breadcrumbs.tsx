"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import {
  useBreadcrumbs,
  type BreadcrumbItem as BreadcrumbItemType,
} from "@/hooks/use-breadcrumbs";
import { cn } from "@/lib/utils";
import React, { memo, useMemo } from "react";

interface BreadcrumbsProps {
  className?: string;
  showHomeIcon?: boolean;
  hideOnHome?: boolean;
  maxItems?: number;
}

// Memoize HomeIcon for better performance
const HomeIcon = memo(() => <Home className="h-4 w-4" />);

// Memoized BreadcrumbItem renderer
const BreadcrumbItemComponent = memo(function BreadcrumbItemComponent({
  item,
  isLast,
  showHomeIcon,
}: {
  item: BreadcrumbItemType;
  isLast: boolean;
  showHomeIcon: boolean;
}) {
  const isHome = item.href === "/";
  const content = (
    <>
      {isHome && showHomeIcon ? (
        <span className="flex items-center gap-2">
          <HomeIcon />
          <span
            className={
              item.isCurrentPage
                ? "sr-only"
                : "sr-only sm:not-sr-only sm:inline"
            }
          >
            {item.label}
          </span>
        </span>
      ) : (
        item.label
      )}
    </>
  );

  return (
    <BreadcrumbItem>
      {isLast ? (
        <BreadcrumbPage>{content}</BreadcrumbPage>
      ) : (
        <BreadcrumbLink asChild>
          <Link href={item.href!}>{content}</Link>
        </BreadcrumbLink>
      )}
    </BreadcrumbItem>
  );
});

// Ellipsis item component
const EllipsisItem = memo(function EllipsisItem() {
  return (
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
  );
});

export const Breadcrumbs = memo(function Breadcrumbs({
  className,
  showHomeIcon = true,
  hideOnHome = true,
  maxItems = 4,
}: BreadcrumbsProps) {
  const allBreadcrumbs = useBreadcrumbs();

  // Early return for home page
  if (hideOnHome && allBreadcrumbs.length <= 1) {
    return null;
  }

  // Memoize breadcrumb items for performance
  const breadcrumbItems = useMemo(() => {
    const breadcrumbs =
      allBreadcrumbs.length > maxItems
        ? [
            allBreadcrumbs[0]!,
            null, // Represents the ellipsis
            ...allBreadcrumbs.slice(allBreadcrumbs.length - (maxItems - 2)),
          ]
        : allBreadcrumbs;

    const lastIndex = breadcrumbs.length - 1;

    return breadcrumbs.map((item, index) => (
      <React.Fragment key={item?.href || `ellipsis-${index}`}>
        {item ? (
          <BreadcrumbItemComponent 
            item={item} 
            isLast={index === lastIndex} 
            showHomeIcon={showHomeIcon} 
          />
        ) : (
          <EllipsisItem />
        )}
        {index < lastIndex && <BreadcrumbSeparator />}
      </React.Fragment>
    ));
  }, [allBreadcrumbs, maxItems, showHomeIcon]);

  return (
    <nav className={cn("mb-6", className)} aria-label="Breadcrumb navigation">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
});
