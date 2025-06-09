# Animation System

This document explains how to use the animation system to add scroll-triggered animations and filter change animations throughout the application.

## Overview

The animation system consists of:

1. **Animation utility functions** - Located in `src/lib/animation.ts`
2. **Scroll animation hook** - Located in `src/hooks/useScrollAnimation.ts`
3. **Reusable components** - Located in `src/components/ui/animated.tsx` and `src/components/ui/animated-section.tsx`

## Quick Start

### Adding Animation to a Section

Use the `AnimatedSection` component as a drop-in replacement for the regular `Section` component:

```tsx
import { AnimatedSection } from "@/components/ui";

export default function MyPage() {
  return (
    <AnimatedSection variant="slideUp" timing="normal" delay="none">
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
    <Animated variant="fade" timing="normal">
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
    <div ref={ref} data-state={state} className={animationClasses}>
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

## Example Page

Check out the example page at `/examples/animations` to see all animation variants in action.
