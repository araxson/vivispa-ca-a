# Vivi Aesthetics Spa - Technical Documentation

This document covers the technical implementation details for the Vivi Aesthetics Spa website's library utilities and architectural patterns.

## 🏗️ Architecture Overview

The application is built on a foundation of universal component systems that provide:

- **85%+ Code Reduction** through the Universal Card System
- **90%+ Standardization** through the Grid System
- **100% Centralization** of animation implementations
- **Enterprise-Grade** error handling and performance monitoring

## 📚 Table of Contents

1. [Animation System](#animation-system)
2. [Error Handling System](#error-handling-system)
3. [Performance Monitoring](#performance-monitoring)
4. [Component Architecture](#component-architecture)
5. [Type Safety](#type-safety)

---

# Animation System

The animation system consists of:

1. **Animation utility functions** - Located in `src/lib/animation.ts`
2. **Scroll animation hook** - Located in `src/hooks/use-scroll-animation.ts`
3. **Reusable components** - Located in `src/components/ui/animated.tsx`
4. **Animation presets** - Pre-configured combinations for common use cases

**✅ UNIFIED**: All manual animation implementations have been consolidated into this single system.

## Quick Start

### Using Animation Presets (Recommended)

The fastest way to add animations is using the pre-configured presets:

```tsx
import { Animated, getAnimationPreset } from "@/components/ui";

export default function MyComponent() {
  return (
    <Animated {...getAnimationPreset("cardEntrance")}>
      <div>Card content</div>
    </Animated>
  );
}
```

Available presets:
- `cardHover` - Scale effect for hover states
- `cardEntrance` - Slide up entrance for cards
- `sectionFade` - Slow fade for sections
- `sectionSlide` - Slide up for sections
- `listItemStagger` - For staggered list animations
- `filterBadge` - Quick scale for filter badges
- `heroBanner` - Fade with delay for hero content

### Adding Animation to a Section

Use the `AnimatedSection` component as a drop-in replacement for the regular `Section` component:

```tsx
import { AnimatedSection } from "@/components/ui";

export default function MyPage() {
  return (
    <AnimatedSection
      variant="slideUp"
      timing="normal"
      delay="none"
    >
      <h2>My Section Title</h2>
      <p>Content goes here...</p>
    </AnimatedSection>
  );
}
```

### Adding Animation to Any Element

Use the `Animated` component to wrap any element:

```tsx
import { Animated } from "@/components/ui";

export default function MyComponent() {
  return (
    <Animated 
      variant="fade" 
      timing="normal"
    >
      <div>My content to animate</div>
    </Animated>
  );
}
```

### Animating Individual Items

Use the `AnimatedItem` component for individual elements:

```tsx
import { AnimatedItem } from "@/components/ui";

export default function ItemList() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item, index) => (
        <AnimatedItem 
          key={item.id}
          variant="scale" 
          timing="normal"
          index={index} // Use index for staggered animations
        >
          <div className="card">{item.name}</div>
        </AnimatedItem>
      ))}
    </div>
  );
}
```

## Animation Options

### Animation Variants

- `fade` - Fade in
- `slideUp` - Slide up from below
- `slideDown` - Slide down from above
- `slideLeft` - Slide in from the right
- `slideRight` - Slide in from the left
- `scale` - Scale up from 95% to 100%
- `none` - No animation

### Timing Options

- `fast` - 300ms duration
- `normal` - 500ms duration (default)
- `slow` - 700ms duration

### Delay Options

- `none` - No delay (default)
- `short` - 100ms delay
- `medium` - 300ms delay
- `long` - 500ms delay

## Advanced Usage

### Staggered Children

To animate children with a staggered delay:

```tsx
<AnimatedSection
  variant="fade"
  timing="normal"
  staggerChildren={true}
  staggerDelay={100} // milliseconds between each child
  childSelector=".card" // CSS selector for children
>
  <div className="card">First card</div>
  <div className="card">Second card</div>
  <div className="card">Third card</div>
</AnimatedSection>
```

### Custom Scroll Animation

For advanced cases, use the `useScrollAnimation` hook directly:

```tsx
"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getAnimationClasses } from "@/lib/animation";

export function MyCustomAnimatedComponent() {
  const { ref, state } = useScrollAnimation({
    threshold: 0.2,
    triggerOnce: true,
  });

  const animationClasses = getAnimationClasses({
    variant: "slideUp",
    timing: "normal",
  });

  return (
    <div 
      ref={ref} 
      data-state={state}
      className={animationClasses}
    >
      My content
    </div>
  );
}
```

## Filter Change Animations

The filter badges component automatically includes animations when filters are added or removed. The animations use the built-in Tailwind CSS animation classes:

```tsx
import { FilterBadges } from "@/components/ui";

export default function FilterExample() {
  return (
    <FilterBadges
      activeFilters={filters}
      onClearFilter={handleClearFilter}
      onClearAll={handleClearAll}
    />
  );
}
```

---

# Error Handling System

## Overview

The application implements enterprise-grade error handling with multiple layers of protection:

### 1. Error Boundaries

React error boundaries are implemented at multiple levels:

```tsx
import { AppErrorBoundary } from "@/components/layout";

// Application-level error boundary
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <AppErrorBoundary>
          {children}
        </AppErrorBoundary>
      </body>
    </html>
  );
}
```

**Features:**
- Graceful error recovery
- User-friendly error messages
- Automatic error reporting
- Component isolation

### 2. Production Console Logging

All console operations are wrapped with environment checks:

```tsx
// ✅ Production-safe logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug information');
}

// ✅ Performance warnings
if (process.env.NODE_ENV === 'development') {
  console.warn('Performance warning:', details);
}
```

**Implementation locations:**
- `src/lib/performance.tsx` - Performance monitoring
- `src/lib/error-reporting.ts` - Error reporting utilities
- Component-level debugging throughout the application

### 3. Type Safety & Error Prevention

**Strict TypeScript Configuration:**
```json
{
  "compilerOptions": {
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noImplicitOverride": true
  }
}
```

**Runtime Type Checking:**
```tsx
// Component prop validation
interface ComponentProps {
  data: string[];
  onUpdate?: (data: string[]) => void;
}

export function Component({ data, onUpdate }: ComponentProps) {
  if (!Array.isArray(data)) {
    throw new Error('Component: data must be an array');
  }
  // ...component logic
}
```

### 4. Memory Leak Prevention

**Cleanup Patterns:**
```tsx
useEffect(() => {
  const observer = new IntersectionObserver(callback);
  
  if (element) {
    observer.observe(element);
  }

  // ✅ Proper cleanup
  return () => {
    if (element) {
      observer.unobserve(element);
    }
  };
}, [dependencies]);
```

**Event Listener Management:**
```tsx
useEffect(() => {
  const handleResize = () => { /* handler */ };
  
  window.addEventListener('resize', handleResize);
  
  // ✅ Cleanup on unmount
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

---

# Performance Monitoring

## Real-time Performance Tracking

The application includes comprehensive performance monitoring:

### 1. Image Performance Monitoring

```tsx
import { ImagePerformanceMonitor } from "@/lib/image-optimization";

// Automatic performance tracking for all images
<OptimizedImage
  src="/image.jpg"
  alt="Description"
  onLoadComplete={(metrics) => {
    ImagePerformanceMonitor.track(metrics);
  }}
/>
```

### 2. Component Performance Metrics

```tsx
// Performance boundary around expensive components
import { PerformanceBoundary } from "@/lib/performance";

<PerformanceBoundary name="ExpensiveComponent">
  <ExpensiveComponent />
</PerformanceBoundary>
```

### 3. Core Web Vitals Monitoring

Automatic tracking of:
- **Largest Contentful Paint (LCP)**
- **First Input Delay (FID)**
- **Cumulative Layout Shift (CLS)**

---

# Component Architecture

## Universal Component System

### Universal Card Component

Replaces 85%+ of manual card implementations:

```tsx
import { UniversalCard } from "@/components/ui";

// Service card variant
<UniversalCard variant="service" size="lg">
  <UniversalCard.Header>
    <UniversalCard.Title>Service Name</UniversalCard.Title>
  </UniversalCard.Header>
  <UniversalCard.Content>
    Content here
  </UniversalCard.Content>
</UniversalCard>

// Pricing card variant
<UniversalCard variant="pricing" size="md">
  {/* Pricing content */}
</UniversalCard>
```

### Grid System Standardization

Replaced 90%+ of manual grid implementations:

```tsx
import { ResponsiveGrid } from "@/components/ui";

// Standard 3-column grid
<ResponsiveGrid cols={3} gap="lg">
  {items.map(item => <Item key={item.id} />)}
</ResponsiveGrid>

// Responsive breakpoints
<ResponsiveGrid 
  cols={{ base: 1, md: 2, lg: 3 }} 
  gap={{ base: "sm", lg: "lg" }}
>
  {items.map(item => <Item key={item.id} />)}
</ResponsiveGrid>
```

### Filter System Unification

Universal filtering across all content types:

```tsx
import { UniversalFilterControls } from "@/components/ui";

<UniversalFilterControls
  config={{
    location: { enabled: true, options: locations },
    category: { enabled: true, options: categories },
    priceRange: { enabled: true, min: 0, max: 1000 }
  }}
  onFiltersChange={handleFilterChange}
/>
```

---

# Type Safety

## Comprehensive Type Coverage

### 1. Component Props

```tsx
// Strict component interfaces
interface ServiceCardProps {
  service: ServiceItem;
  layout?: 'default' | 'compact';
  showLocations?: boolean;
  className?: string;
}

// Variant-based typing
interface CardProps extends VariantProps<typeof cardVariants> {
  children: React.ReactNode;
  className?: string;
}
```

### 2. Data Types

```tsx
// Service data structure
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  category: ServiceCategory;
  locations: Location[];
  pricing?: PricingInfo;
}

// Location structure
export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  isAvailable: boolean;
}
```

### 3. Filter Types

```tsx
// Universal filter configuration
export interface FilterConfig<T = any> {
  type: FilterType;
  enabled: boolean;
  options?: T[];
  validation?: (value: T) => boolean;
}

// Filter state management
export interface FilterState {
  location?: string[];
  category?: string[];
  priceRange?: [number, number];
  search?: string;
}
```

---

# Best Practices

## Development Guidelines

### 1. Component Development

- **Use Universal Components** - Prefer universal components over custom implementations
- **Follow Type Patterns** - Ensure all props are properly typed
- **Implement Error Boundaries** - Wrap complex components with error boundaries
- **Add Performance Monitoring** - Include performance tracking for expensive operations

### 2. Error Handling

- **Graceful Degradation** - Always provide fallback UI states
- **User-Friendly Messages** - Show helpful error messages to users
- **Development Logging** - Use environment-wrapped console statements
- **Proper Cleanup** - Implement cleanup functions for all side effects

### 3. Performance Optimization

- **Lazy Loading** - Use React.lazy for code splitting
- **Image Optimization** - Always use OptimizedImage component
- **Memory Management** - Clean up event listeners and observers
- **Bundle Analysis** - Regular bundle size monitoring

---

# Migration Notes

## Deprecated Components

The following components have been deprecated and replaced:

- ❌ `FadeIn` → ✅ `Animated`
- ❌ `AnimatedBenefitCard` → ✅ `Animated`
- ❌ `ScrollAnimationWrapper` → ✅ `Animated`
- ❌ Manual grid implementations → ✅ `ResponsiveGrid`
- ❌ Custom card components → ✅ `UniversalCard`

## Upgrade Path

1. **Replace deprecated imports**
2. **Update component usage**
3. **Verify type compatibility**
4. **Test error boundaries**
5. **Validate performance metrics**

---

# Example Page

Check out the example page at `/examples/animations` to see all animation variants in action.