import { usePathname, useParams } from 'next/navigation';
import { useMemo } from 'react';
import { getServiceBySlug } from '@/data/services';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

export function useBreadcrumbs(): BreadcrumbItem[] {
  const pathname = usePathname();
  const params = useParams();

  return useMemo(() => {
    const breadcrumbs: BreadcrumbItem[] = [
      {
        label: 'Home',
        href: '/',
      },
    ];

    // Split pathname and filter out empty segments
    const segments = pathname.split('/').filter(Boolean);

    // Build breadcrumbs based on the current route
    let currentPath = '';

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;

      // Create breadcrumb item based on whether it's the last segment
      const createBreadcrumbItem = (label: string): BreadcrumbItem => {
        if (isLast) {
          return {
            label,
            isCurrentPage: true,
          };
        } else {
          return {
            label,
            href: currentPath,
          };
        }
      };

            // Handle different route patterns
      switch (segment) {
        case 'contact':
          breadcrumbs.push(createBreadcrumbItem('Contact'));
          break;

        case 'services':
          breadcrumbs.push(createBreadcrumbItem('Services'));
          break;

        case 'pricing':
          breadcrumbs.push(createBreadcrumbItem('Pricing'));
          break;

        case 'offers':
          breadcrumbs.push(createBreadcrumbItem('Special Offers'));
          break;

        default:
          // Handle dynamic segments like service slugs
          if (segments[index - 1] === 'services' && params?.['slug']) {
            const service = getServiceBySlug(segment);
            if (service) {
              breadcrumbs.push(createBreadcrumbItem(service.title));
            } else {
              breadcrumbs.push(createBreadcrumbItem(
                segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
              ));
            }
          } else {
            // Default handling for other segments
            breadcrumbs.push(createBreadcrumbItem(
              segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
            ));
          }
          break;
      }
    });

    return breadcrumbs;
  }, [pathname, params]);
} 