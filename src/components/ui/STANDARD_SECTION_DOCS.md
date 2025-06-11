# StandardSection System Documentation

## Overview

The StandardSection system provides a unified approach to creating consistent section layouts across the entire application. It builds upon the existing Section, Container, and SectionHeader components to create a comprehensive, flexible, and developer-friendly section system.

## Components

### 1. StandardSection (Main Component)

The core component that standardizes all section patterns with comprehensive features:

```tsx
<StandardSection
  title="Our Services"
  subtitle="Premium treatments for your beauty needs"
  description="Additional description text for detailed sections"
  layout="centered"
  spacing="lg" 
  background="muted"
  maxWidth="7xl"
  showDivider
  headerAlign="center"
>
  <ServiceGrid services={services} />
</StandardSection>
```

#### Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Section title (renders h2 by default) |
| `subtitle` | `string` | - | Section subtitle |
| `description` | `string` | - | Additional description text |
| `headerAs` | `h1-h6` | `h2` | HTML tag for title |
| `layout` | `default \| centered \| split \| full-width` | `default` | Layout pattern |
| `spacing` | `SpacingSize` | `lg` | Vertical section spacing |
| `background` | `default \| muted \| card \| primary \| transparent` | `transparent` | Background style |
| `maxWidth` | `ContainerProps["maxWidth"]` | `7xl` | Maximum content width |
| `paddingSize` | `ContainerProps["paddingSize"]` | `md` | Container padding |
| `showDivider` | `boolean` | `false` | Show section dividers |
| `dividerPosition` | `top \| bottom \| both` | `bottom` | Divider placement |
| `headerAlign` | `left \| center \| right` | `center` | Header text alignment |

### 2. Convenience Components

#### HeroSection
Optimized for hero/banner sections with larger spacing:
```tsx
<HeroSection
  title="Welcome to Vivi Aesthetics Spa"
  subtitle="Transform your beauty with our premium treatments"
>
  <HeroContent />
</HeroSection>
```

#### FeatureSection  
Standard feature section with muted background and divider:
```tsx
<FeatureSection
  title="Why Choose Us"
  subtitle="Experience the difference"
>
  <BenefitsGrid benefits={benefits} />
</FeatureSection>
```

#### ContentSection
Optimized for text-heavy content with narrower max-width:
```tsx
<ContentSection
  title="About Our Treatments"
  subtitle="Learn more about our services"
>
  <ArticleContent />
</ContentSection>
```

#### GridSection
Optimized for card/item grids:
```tsx
<GridSection
  title="Our Services"
  subtitle="Premium treatments for your beauty needs"
>
  <ResponsiveGrid preset="services">
    {services.map(service => <ServiceCard key={service.id} service={service} />)}
  </ResponsiveGrid>
</GridSection>
```

## Layout Options

### Default Layout
Standard vertical layout with header followed by content:
```tsx
<StandardSection layout="default" title="Services">
  <Content />
</StandardSection>
```

### Centered Layout
Centers all content including children:
```tsx
<StandardSection layout="centered" title="About Us">
  <CenteredContent />
</StandardSection>
```

### Split Layout
Two-column layout with header on left, content on right:
```tsx
<StandardSection layout="split" title="Featured Service" subtitle="Learn more">
  <ServiceDetails />
</StandardSection>
```

### Full-Width Layout
Removes container constraints for full-width content:
```tsx
<StandardSection layout="full-width" title="Gallery">
  <FullWidthGallery />
</StandardSection>
```

## Background Options

### Transparent (Default)
No background styling - inherits parent:
```tsx
<StandardSection background="transparent">
```

### Muted
Subtle background tint:
```tsx
<StandardSection background="muted">
```

### Card
Card-style background:
```tsx
<StandardSection background="card">
```

### Primary
Primary color background with appropriate text color:
```tsx
<StandardSection background="primary">
```

## Integration with Existing Systems

### With ResponsiveGrid
```tsx
<StandardSection title="Our Services" subtitle="Premium treatments">
  <ResponsiveGrid preset="services">
    {services.map(service => (
      <ServiceCard key={service.id} service={service} />
    ))}
  </ResponsiveGrid>
</StandardSection>
```

### With Animation System
```tsx
<StandardSection title="Why Choose Us">
  <ResponsiveGrid preset="benefits">
    {benefits.map((benefit, index) => (
      <Animated key={benefit.id} {...getAnimationPreset("cardEntrance")} customDelay={index * 100}>
        <BenefitCard benefit={benefit} />
      </Animated>
    ))}
  </ResponsiveGrid>
</StandardSection>
```

### With UniversalCard
```tsx
<StandardSection title="Special Offers" background="muted">
  <ResponsiveGrid preset="offers">
    {offers.map(offer => (
      <UniversalCard
        key={offer.id}
        variant="offer"
        data={offer}
        features={{ showImage: true, showBadges: true, showPricing: true }}
      />
    ))}
  </ResponsiveGrid>
</StandardSection>
```

## Migration Examples

### Before (Manual Section Pattern)
```tsx
// Old approach - manual section wrapper
<Section spacing="lg" background="muted" className="custom-class">
  <SectionHeader title="Why Choose Us" subtitle="Experience the difference" />
  <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
    {benefits.map(benefit => (
      <BenefitCard key={benefit.id} benefit={benefit} />
    ))}
  </div>
</Section>
```

### After (StandardSection)
```tsx
// New approach - unified section system
<StandardSection
  title="Why Choose Us"
  subtitle="Experience the difference"
  spacing="lg"
  background="muted"
  className="custom-class"
>
  <ResponsiveGrid preset="benefits">
    {benefits.map(benefit => (
      <BenefitCard key={benefit.id} benefit={benefit} />
    ))}
  </ResponsiveGrid>
</StandardSection>
```

## Benefits

### 1. Consistency
- Standardized header patterns across all sections
- Consistent spacing using the design system
- Uniform container and responsive behavior

### 2. Developer Experience
- Single component for all section needs
- Preset layouts for common patterns
- Full TypeScript support with IntelliSense

### 3. Flexibility
- Configurable layouts (default, centered, split, full-width)
- Multiple background options
- Optional dividers and visual elements
- Customizable header alignment

### 4. Accessibility
- Proper semantic HTML structure
- ARIA labels and attributes support
- Focus management and keyboard navigation

### 5. Performance
- Leverages existing optimized components
- Consistent rendering patterns
- Reduced component overhead

## Best Practices

### 1. Choose the Right Layout
- Use `default` for most content sections
- Use `centered` for announcements, CTAs, or focused content
- Use `split` for feature showcases or detailed explanations
- Use `full-width` for galleries, maps, or edge-to-edge content

### 2. Background Selection
- Use `transparent` for most sections
- Use `muted` to create visual separation
- Use `card` for highlighted content
- Use `primary` sparingly for important announcements

### 3. Spacing Guidelines
- Use `md` for compact sections
- Use `lg` for standard sections (default)
- Use `xl` for hero sections or major breaks
- Use `xs` or `sm` for tight layouts

### 4. Header Best Practices
- Always provide a `title` for better accessibility
- Use `subtitle` for additional context
- Use `description` for detailed explanations
- Choose appropriate `headerAs` for semantic hierarchy

## TypeScript Support

The StandardSection system is fully typed with strict TypeScript support:

```tsx
import { StandardSection, HeroSection, FeatureSection } from "@/components/ui";

// All props are fully typed with IntelliSense support
<StandardSection
  title="Services"        // string
  layout="centered"       // "default" | "centered" | "split" | "full-width"
  spacing="lg"           // SpacingSize
  background="muted"     // "default" | "muted" | "card" | "primary" | "transparent"
  showDivider={true}     // boolean
>
  {children}
</StandardSection>
```

## Integration with Design System

StandardSection fully integrates with the existing design system:

- **Spacing**: Uses `@/lib/spacing.ts` utilities
- **Container**: Leverages `Container` component with all props
- **Section**: Built on top of existing `Section` component
- **Headers**: Uses `SectionHeader` for consistent typography
- **Separators**: Uses `Separator` component for dividers

This ensures consistency across the entire application while providing enhanced functionality and developer experience.
