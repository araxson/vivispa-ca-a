import { Navbar } from "@/components/layout/navigation";
import { Footer } from "@/components/layout";
import { MarketingLayoutClient } from "@/components/layout/marketing-layout-client";
import type { Metadata } from "next";
import { defaultMetadata } from "@/app/metadata";
import { getCanonicalUrl } from "@/lib/app-router-utils";

/**
 * Optimized metadata for the marketing section
 * Using the latest Next.js 15 metadata API for better SEO
 */
export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    template: `%s | Vivi Aesthetics Spa`,
    default: "Vivi Aesthetics Spa",
  },
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

interface MarketingLayoutProps {
  children: React.ReactNode;
}

/**
 * Marketing layout for all marketing pages
 * Implements latest React 19 patterns for improved performance
 */
export default function MarketingLayout({
  children,
}: Readonly<MarketingLayoutProps>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main 
        className="flex-1" 
        aria-labelledby="marketing-heading"
      >
        <h1 id="marketing-heading" className="sr-only">Vivi Aesthetics Spa</h1>
        <MarketingLayoutClient>{children}</MarketingLayoutClient>
      </main>
      <Footer />
    </div>
  );
}
