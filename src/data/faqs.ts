interface FAQ {
  id?: string;
  question: string;
  answer: string;
  category?: string;
  featured?: boolean;
}

// generalFAQs, getFeaturedFAQs, and getFAQsByCategory have been removed
// as the data is now sourced from home.ts for the homepage
// and other pages will define their own FAQ data or use a centralized CMS.
