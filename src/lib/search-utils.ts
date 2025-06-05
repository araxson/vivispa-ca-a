// Server-side search and filtering utilities for Next.js 15
// This helps move logic from client components to server components

export interface SearchParams {
  search?: string;
  category?: string;
  location?: string;
  priceRange?: string;
  sortBy?: string;
}

export interface FilterableItem {
  name: string;
  category: string;
  slug?: string;
  [key: string]: any;
}

export interface PriceFilterableItem extends FilterableItem {
  price: string;
}

export interface LocationFilterableItem extends FilterableItem {
  availableLocations?: Array<{ location: string; [key: string]: any }>;
}

// Generic search function
export function searchItems<T extends FilterableItem>(
  items: T[],
  searchTerm: string,
  searchFields: (keyof T)[] = ['name', 'category']
): T[] {
  if (!searchTerm.trim()) return items;
  
  const term = searchTerm.toLowerCase();
  return items.filter(item =>
    searchFields.some(field => {
      const value = item[field];
      return typeof value === 'string' && value.toLowerCase().includes(term);
    })
  );
}

// Category filtering
export function filterByCategory<T extends FilterableItem>(
  items: T[],
  category: string
): T[] {
  if (!category || category === 'all') return items;
  return items.filter(item => item.category === category);
}

// Location filtering (for items with location data)
export function filterByLocation<T extends LocationFilterableItem>(
  items: T[],
  location: string
): T[] {
  if (!location || location === 'all') return items;
  return items.filter(item => 
    item.availableLocations?.some(loc => loc.location === location)
  );
}

// Price range filtering
export function filterByPriceRange<T extends PriceFilterableItem>(
  items: T[],
  priceRange: string
): T[] {
  if (!priceRange || priceRange === 'all') return items;
  
  return items.filter(item => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    
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
      case 'under-100':
        return price < 100;
      case '100-200':
        return price >= 100 && price <= 200;
      case '200-500':
        return price >= 200 && price <= 500;
      case 'over-500':
        return price > 500;
      default:
        return true;
    }
  });
}

// Generic sorting function
export function sortItems<T extends FilterableItem>(
  items: T[],
  sortBy: string,
  priceExtractor?: (item: T) => number
): T[] {
  const sortedItems = [...items];
  
  switch (sortBy) {
    case 'name-az':
      return sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-za':
      return sortedItems.sort((a, b) => b.name.localeCompare(a.name));
    case 'price-low-high':
      if (priceExtractor) {
        return sortedItems.sort((a, b) => priceExtractor(a) - priceExtractor(b));
      }
      break;
    case 'price-high-low':
      if (priceExtractor) {
        return sortedItems.sort((a, b) => priceExtractor(b) - priceExtractor(a));
      }
      break;
    default:
      return sortedItems;
  }
  
  return sortedItems;
}

// Complete search and filter pipeline
export function searchAndFilter<T extends FilterableItem>(
  items: T[],
  params: SearchParams,
  options: {
    searchFields?: (keyof T)[];
    priceExtractor?: (item: T) => number;
    supportsLocation?: boolean;
    supportsPrice?: boolean;
  } = {}
): T[] {
  let result = items;

  // Apply search
  if (params.search) {
    result = searchItems(result, params.search, options.searchFields);
  }

  // Apply category filter
  if (params.category) {
    result = filterByCategory(result, params.category);
  }

  // Apply location filter if supported
  if (options.supportsLocation && params.location) {
    result = filterByLocation(result as unknown as LocationFilterableItem[], params.location) as unknown as T[];
  }

  // Apply price filter if supported
  if (options.supportsPrice && params.priceRange) {
    result = filterByPriceRange(result as unknown as PriceFilterableItem[], params.priceRange) as unknown as T[];
  }

  // Apply sorting
  if (params.sortBy) {
    result = sortItems(result, params.sortBy, options.priceExtractor);
  }

  return result;
}

// Utility to extract unique values for filter options
export function extractUniqueValues<T extends Record<string, any>>(
  items: T[],
  key: keyof T
): string[] {
  const values = items
    .map(item => item[key])
    .filter((value: any): value is string => typeof value === 'string')
    .filter(Boolean);
  
  return [...new Set(values)].sort();
}

// URL params utilities for Next.js 15 search params
export function parseSearchParams(searchParams: URLSearchParams): SearchParams {
  return {
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || 'all',
    location: searchParams.get('location') || 'all',
    priceRange: searchParams.get('priceRange') || 'all',
    sortBy: searchParams.get('sortBy') || 'name-az'
  };
}

export function createSearchParamsString(params: SearchParams): string {
  const urlParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value && value !== 'all' && value !== '') {
      urlParams.set(key, value);
    }
  });
  
  return urlParams.toString();
} 