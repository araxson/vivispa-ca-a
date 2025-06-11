import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { defaultMetadata } from '@/app/metadata';

/**
 * Root page metadata that inherits from default metadata
 * Using newer approach for better SEO handling in Next.js 15
 */
export const metadata: Metadata = {
  ...defaultMetadata,
  alternates: {
    canonical: '/',
  },
};

/**
 * Root page that redirects to the marketing route group
 * Using the latest Next.js 15 redirect pattern
 */
export default function HomePage() {
  // Next.js 15 recommends using redirect outside of try/catch
  // for better performance and more predictable behavior
  redirect('/(marketing)/');
}