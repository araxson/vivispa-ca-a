import type { MetadataRoute } from 'next';
import { getSitemapData } from '@/lib/data-fetcher';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapData = getSitemapData();

  return [
    ...sitemapData.static,
    ...sitemapData.services,
    ...sitemapData.offers,
  ];
}
