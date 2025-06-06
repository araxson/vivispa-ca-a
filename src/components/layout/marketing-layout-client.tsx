"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui";
import { getSectionClasses } from "@/lib/spacing";

interface MarketingLayoutClientProps {
  children: React.ReactNode;
}

export function MarketingLayoutClient({
  children,
}: MarketingLayoutClientProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className="flex-1 pt-16 md:pt-18 lg:pt-20">
      {!isHomePage && (
        <section className={getSectionClasses("xs", "default")}>
          <Container>
            <Breadcrumbs />
          </Container>
        </section>
      )}
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
