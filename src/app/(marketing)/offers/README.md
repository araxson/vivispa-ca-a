# Offers Page

This document provides a comprehensive overview of the Offers Page, its structure, components, and functionality.

## Component Overview

The `OffersPage` component is responsible for displaying special offers and packages available to customers. It fetches offer data and provides a user interface for browsing and filtering these offers. The page is built with a focus on a smooth user experience, featuring a loading skeleton to prevent layout shift and animations for a modern feel.

## File Structure

The main component for the offers page is located at:

```
src/app/(marketing)/offers/page.tsx
```

## Data Fetching

The offers page fetches its data using two primary functions:

-   `getAllOffers()`: Retrieves a list of all available special offers.
-   `getAvailableOfferLocations()`: Fetches a list of locations where offers are available, used for filtering.

These functions are imported from `@/lib/data-fetcher`.

## Key Components Used

The `OffersPage` is composed of several smaller, reusable components:

-   `SectionHeader`: Displays the title and subtitle of the page.
-   `CallToAction`: A component that prompts users to take a specific action, such as booking an appointment.
-   `OffersPageClient`: This is a client-side component responsible for handling the interactive parts of the page, such as filtering offers by location. It receives the initial list of offers and available locations as props.
-   `FadeIn`: A UI component that applies a fade-in animation to its children, enhancing the visual presentation.
-   `Section`: A layout component used to structure the page content with consistent spacing.

## Client-Side Functionality

The `OffersPageClient` component manages the client-side interactions on the offers page. Its main responsibilities include:

-   Displaying the list of offers.
-   Providing filter controls (e.g., by location).
-   Updating the displayed offers based on the selected filters.

This component is crucial for the dynamic and interactive aspects of the page.

## Loading State

To improve the user experience while data is being fetched, the `OffersPage` uses a loading skeleton component called `OffersPageSkeleton`. This skeleton mimics the layout of the actual content, which helps to prevent layout shift (CLS - Cumulative Layout Shift) and provides a visual indication that content is on its way.

The skeleton includes placeholders for:

-   Filter controls
-   A summary of the results
-   A grid of offer cards

## Metadata

The page's metadata (title and description) is dynamically generated using the `generatePageMetadata` function. This is important for SEO and for providing a good experience when the page is shared on social media.

```typescript
export const metadata: Metadata = generatePageMetadata({
  title: "Special Offers",
  description: "Take advantage of our exclusive offers and packages.",
});
``` 