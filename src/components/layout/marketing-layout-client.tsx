"use client";

import { usePathname } from "next/navigation";
import { memo, useMemo, useTransition } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui";
import { getSectionClasses } from "@/lib/spacing";

interface MarketingLayoutClientProps {
  children: React.ReactNode;
}

/**
 * Client component for marketing layout
 * Optimized for React 19 and Next.js App Router
 */
export const MarketingLayoutClient = memo(function MarketingLayoutClient({
  children,
}: MarketingLayoutClientProps) {
  // Efficient path detection using App Router hooks
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  
  // Use useMemo to avoid unnecessary re-renders
  // Next.js 15 App Router properly handles route groups, so we only need to check for root path
  const isHomePage = useMemo(() => {
    return pathname === "/" || pathname === "/(marketing)/";
  }, [pathname]);

  return (
    <div className="flex-1 pt-16 md:pt-18 lg:pt-20">
      {!isHomePage && (
        <section className={getSectionClasses("xs", "default")}>
          <Container>
            <Breadcrumbs />
          </Container>
        </section>
      )}
      <div 
        className={`flex-1 w-full transition-opacity duration-200 ${
          isPending ? 'opacity-70' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </div>
  );
});
