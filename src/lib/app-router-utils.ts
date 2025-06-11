/**
 * Utility functions for Next.js 15 App Router
 * These functions help ensure compatibility between App Router and React 19
 */

import { cache } from 'react';

/**
 * Check if we're running in a browser environment
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Parse a route pathname into segments
 * This helps with proper route group handling
 */
export const parsePathname = (pathname: string): string[] => {
  if (!pathname) return [];
  
  // Remove leading and trailing slashes
  const cleanPath = pathname.replace(/^\/|\/$/g, '');
  
  // Split by slashes and filter out route groups
  return cleanPath
    .split('/')
    .filter(segment => !segment.startsWith('(') && !segment.endsWith(')'));
};

/**
 * Get the formatted title for a route
 * Formats path segments into a readable title
 */
export const getRouteTitle = (pathname: string): string => {
  const segments = parsePathname(pathname);
  if (!segments.length) return 'Home';
  
  // Format the last segment as the page title
  const lastSegment = segments[segments.length - 1];
  
  // Handle slug routes
  if (lastSegment.startsWith('[') && lastSegment.endsWith(']')) {
    return 'Detail Page';
  }
  
  // Format with proper capitalization and spacing
  return lastSegment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Check if a path is a catch-all route
 */
export const isCatchAllRoute = (pathname: string): boolean => {
  return pathname.includes('[...') || pathname.includes('[[...');
};

/**
 * Memoized function to get canonical URL for SEO
 * Uses React 19's cache function for improved performance
 * 
 * React 19 optimizes cache() automatically for server components
 */
export const getCanonicalUrl = cache((path: string, baseUrl?: string): string => {
  // Default to https if not in development
  const base = baseUrl || (process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : 'https://vivispa.ca');
  
  // Ensure path starts with a slash for consistency
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Remove trailing slash except for root path
  const routePath = normalizedPath === '/' ? '' : normalizedPath.replace(/\/$/, '');
  
  return `${base}${routePath}`;
});

/**
 * Type definition for a route segment
 */
export interface RouteSegment {
  segment: string;
  isGroup: boolean;
  isDynamic: boolean;
  isCatchAll: boolean;
  path: string;
}

/**
 * Parse a pathname into structured route segments
 */
export const parseRouteSegments = (pathname: string): RouteSegment[] => {
  if (!pathname || pathname === '/') {
    return [{ 
      segment: 'home', 
      isGroup: false, 
      isDynamic: false, 
      isCatchAll: false, 
      path: '/' 
    }];
  }
  
  const parts = pathname.split('/').filter(Boolean);
  let currentPath = '';
  
  return parts.map(part => {
    currentPath += `/${part}`;
    
    const isGroup = part.startsWith('(') && part.endsWith(')');
    const isDynamic = part.startsWith('[') && part.endsWith(']') && !part.startsWith('[...');
    const isCatchAll = part.startsWith('[...');
    
    return {
      segment: part,
      isGroup,
      isDynamic,
      isCatchAll,
      path: currentPath
    };
  });
}; 