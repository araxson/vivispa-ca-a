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
import React from "react";

interface BreadcrumbsProps {
  className?: string;
  showHomeIcon?: boolean;
  hideOnHome?: boolean;
  maxItems?: number;
}

const HomeIcon = () => <Home className="h-4 w-4" />;

function renderItem(
  item: BreadcrumbItemType,
  isLast: boolean,
  showHomeIcon: boolean,
) {
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
    <BreadcrumbItem key={item.href || item.label}>
      {isLast ? (
        <BreadcrumbPage>{content}</BreadcrumbPage>
      ) : (
        <BreadcrumbLink asChild>
          <Link href={item.href!}>{content}</Link>
        </BreadcrumbLink>
      )}
    </BreadcrumbItem>
  );
}

export function Breadcrumbs({
  className,
  showHomeIcon = true,
  hideOnHome = true,
  maxItems = 4,
}: BreadcrumbsProps) {
  const allBreadcrumbs = useBreadcrumbs();

  if (hideOnHome && allBreadcrumbs.length <= 1) {
    return null;
  }

  const breadcrumbs =
    allBreadcrumbs.length > maxItems
      ? [
          allBreadcrumbs[0]!,
          null, // Represents the ellipsis
          ...allBreadcrumbs.slice(allBreadcrumbs.length - (maxItems - 2)),
        ]
      : allBreadcrumbs;

  const lastIndex = breadcrumbs.length - 1;

  return (
    <nav className={cn("mb-6", className)} aria-label="Breadcrumb navigation">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={item?.href || index}>
              {item ? (
                renderItem(item, index === lastIndex, showHomeIcon)
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
              )}
              {index < lastIndex && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
