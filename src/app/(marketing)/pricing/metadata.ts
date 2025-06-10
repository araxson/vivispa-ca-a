import type { Metadata } from "next";
import { generatePageMetadata } from "@/app/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Services & Pricing - Transparent Aesthetic Treatment Costs",
  description:
    "Explore our comprehensive range of aesthetic treatments and transparent pricing. From laser hair removal to hydrofacials, microneedling, IPL photofacial, and more at Vivi Aesthetics & Spa Calgary.",
  keywords: [
    "aesthetic treatments pricing",
    "laser hair removal cost calgary",
    "hydrofacial pricing calgary",
    "microneedling cost",
    "ipl photofacial pricing",
    "transparent pricing calgary spa",
    "affordable aesthetics calgary",
    "competitive spa pricing",
  ],
  ogImage: "/images/pricing/pricing-overview.webp",
  canonicalUrl: "/pricing",
}); 