# Vivi Aesthetics Spa Website

A modern, high-performance Next.js website for Vivi Aesthetics & Spa, featuring optimized component architecture, SEO enhancements, and comprehensive business functionality.

## 🚀 Features

### Performance & Architecture
- **Component Architecture**: Organized component system with barrel exports and categorized structure
- **Lazy Loading**: Intelligent component lazy loading with route-based code splitting
- **Image Optimization**: Advanced image optimization with WebP/AVIF support and performance monitoring
- **Bundle Optimization**: Strategic code splitting for optimal loading performance

### Business Features
- **Service Management**: Comprehensive service catalog with detailed pages
- **Booking Integration**: Seamless integration with booking systems
- **Location Management**: Multi-location support with dynamic content
- **Offers & Pricing**: Dynamic pricing and promotional offers system
- **SEO Optimization**: Advanced SEO with structured data and metadata

### User Experience
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Accessibility**: WCAG-compliant components and navigation
- **Dark/Light Mode**: Theme switching with system preference detection
- **Smooth Animations**: Framer Motion animations with performance optimization

## 📁 Project Structure

```
src/
├── app/                     # Next.js 15 App Router
│   ├── (marketing)/         # Marketing pages group
│   ├── layout.tsx          # Root layout
│   └── metadata.ts         # Global metadata
├── components/             # React components
│   ├── blocks/             # Business domain components
│   ├── layout/             # Layout components
│   └── ui/                 # Reusable UI components
├── data/                   # Static data and content
│   ├── services/           # Service definitions
│   ├── pricing/            # Pricing and offers
│   └── testimonials.ts     # Customer testimonials
├── hooks/                  # Custom React hooks
│   ├── business/           # Business logic hooks
│   ├── navigation/         # Navigation hooks
│   └── ui/                 # UI interaction hooks
├── lib/                    # Utility libraries
│   ├── core/               # Core utilities (cn, variants, constants)
│   ├── ui/                 # UI utilities (spacing, animation, images)
│   ├── data/               # Data utilities (fetching, search, services)
│   ├── seo/                # SEO utilities (metadata, structured data)
│   └── performance/        # Performance utilities (lazy loading, splitting)
├── styles/                 # Global styles
└── types/                  # TypeScript type definitions
```

## 🎨 Component Architecture

### Component Categories

#### UI Components (`src/components/ui/`)
- **Layout**: `Container`, `Section` - Foundation layout components
- **Form**: `Input`, `Button`, `Select` - Form controls
- **Data Display**: `Card`, `Table`, `Carousel` - Data presentation
- **Navigation**: `Breadcrumb`, `DropdownMenu` - Navigation elements
- **Feedback**: `AlertDialog`, `Dialog`, `Skeleton` - User feedback
- **Animation**: `FadeIn`, `OptimizedImage` - Motion and media

#### Block Components (`src/components/blocks/`)
- **Core Layout**: `Hero`, `CallToAction`, `SectionHeader`
- **Service Related**: `ServiceCard`, `ServiceOverview`, `ServiceGallery`
- **Pricing & Offers**: `PricingCard`, `OfferCard`, `PricingFilters`
- **Contact & Location**: `LocationDetailsCard`, `ContactInfoTable`
- **Content Blocks**: `BenefitsSection`, `FAQSection`, `Testimonials`

### Component Variants System

We use Class Variance Authority (CVA) for consistent component styling:

```typescript
// Example: Card variants
const cardVariants = cva("rounded-lg border", {
  variants: {
    size: {
      sm: "p-4",
      md: "p-6", 
      lg: "p-8"
    },
    variant: {
      default: "bg-card text-card-foreground",
      outlined: "border-2 border-border",
      elevated: "shadow-lg"
    }
  },
  defaultVariants: {
    size: "md",
    variant: "default"
  }
});
```

## ⚡ Performance Optimization

### Lazy Loading
Components are strategically lazy-loaded based on their importance:

```typescript
// Critical components - loaded immediately
import { Hero, ServiceOverview } from "@/components/blocks";

// Non-critical components - lazy loaded
import { LazyComponents } from "@/lib/performance";
const { ServiceGallery, Testimonials } = LazyComponents;
```

### Route-Based Code Splitting
```typescript
// Route configuration for optimal loading
const RouteConfig = {
  services: {
    critical: ["ServiceCard", "SearchInput"],
    lazy: ["ServiceGallery", "Testimonials"]
  }
};
```

### Image Optimization
```typescript
// Optimized image loading with WebP/AVIF support
<OptimizedImage
  src="/images/service.jpg"
  alt="Service description" 
  imageType="hero"
  priority={true}
  context="Laser Hair Removal service"
/>
```

## 🎯 SEO & Metadata

### Structured Data
- Organization schema for business information
- Service schema for individual services
- FAQ schema for service questions
- Review schema for testimonials
- LocalBusiness schema for location data

### Metadata Generation
```typescript
// Dynamic metadata for service pages
export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  return generatePageMetadata({
    title: service.title,
    description: service.description,
    keywords: service.tags
  });
}
```

## 🛠 Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation
```bash
# Clone repository
git clone <repository-url>
cd vivispa-ca-a

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format with Prettier
```

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Custom Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### Next.js Configuration
```typescript
// next.config.ts
const nextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920]
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"]
  }
};
```

### Tailwind Configuration
- Custom design system tokens
- Component-specific utilities
- Animation utilities
- Responsive breakpoints

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

## 🤝 Contributing

### Code Style
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use semantic commit messages

### Component Guidelines
1. Start with UI components for reusable elements
2. Create block components for business logic
3. Use proper TypeScript interfaces
4. Include JSDoc comments for public APIs
5. Implement proper error boundaries

## 📝 License

This project is proprietary software for Vivi Aesthetics & Spa.

## 📞 Support

For technical support or questions, contact the development team.

---

## Recent Updates

### Phase 1-5 Reorganization (Completed)
- ✅ Organized component architecture with barrel exports
- ✅ Implemented CVA-based variant system  
- ✅ Restructured utilities into focused modules
- ✅ Enhanced type system with utility types
- ✅ Organized hooks by purpose and functionality
- ✅ Optimized asset structure
- ✅ Implemented lazy loading and code splitting
- ✅ Enhanced performance optimization

### Next Steps
- 📋 Add new features and functionality
- 📋 Implement advanced performance monitoring
- 📋 Enhance SEO optimization
- 📋 Add more component variants
