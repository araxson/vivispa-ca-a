export * from './pricing';
export * from './offers';

import { downtownServices, edmontonTrailServices } from './pricing';
import type { ServiceItem, LocationServices } from '@/types/pricing';

// Aggregate all services from all locations
export const allServices: ServiceItem[] = [
  ...downtownServices.categories.flatMap(category => category.services),
  ...edmontonTrailServices.categories.flatMap(category => category.services)
];

// All unique categories
export const allCategories = [
  ...new Set([
    ...downtownServices.categories.map(cat => cat.name),
    ...edmontonTrailServices.categories.map(cat => cat.name)
  ])
];

// All locations
export const allLocations: LocationServices[] = [
  downtownServices,
  edmontonTrailServices
];

// Helper function to get services by category
export function getServicesByCategory(category: string): ServiceItem[] {
  if (category === 'all') return allServices;
  return allServices.filter(service => service.category === category);
}

// Helper function to filter services by price range
export function filterServicesByPrice(services: ServiceItem[], priceRange: string): ServiceItem[] {
  if (priceRange === 'all') return services;
  
  return services.filter(service => {
    const price = parseFloat(service.price.replace(/[$,]/g, ''));
    
    switch (priceRange) {
      case '0-50':
        return price >= 0 && price <= 50;
      case '51-100':
        return price >= 51 && price <= 100;
      case '101-200':
        return price >= 101 && price <= 200;
      case '201-300':
        return price >= 201 && price <= 300;
      case '301+':
        return price >= 301;
      default:
        return true;
    }
  });
}

// Helper function to search services
export function searchServices(services: ServiceItem[], searchTerm: string): ServiceItem[] {
  if (!searchTerm.trim()) return services;
  
  const term = searchTerm.toLowerCase();
  return services.filter(service => 
    service.name.toLowerCase().includes(term) ||
    service.category.toLowerCase().includes(term) ||
    (service.subcategory && service.subcategory.toLowerCase().includes(term)) ||
    service.price.toLowerCase().includes(term)
  );
}
