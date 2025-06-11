/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
  },
  experimental: {
    // Improved bundle optimization for Next.js 15
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons", 
      "framer-motion",
      "date-fns",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-accordion",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
      "@radix-ui/react-popover",
      "@radix-ui/react-tooltip",
    ],
    
    // Next.js 15 App Router optimizations
    serverActions: {
      bodySizeLimit: "2mb", // Increase limit for larger form submissions
      allowedOrigins: ['localhost:3000', 'vivispa.ca'], // Add your production domain
    },
    
    typedRoutes: true, // Enable typed routes for better TypeScript integration
    
    // Performance optimizations for Next.js 15
    instrumentationHook: true, // Enable instrumentation hook for monitoring
    
    // App Router optimizations
    serverComponentsExternalPackages: [
      'sharp',
      'tailwindcss',
      'postcss',
    ],
    
    // Additional Next.js 15 optimizations
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/darwin-x64',
        '.git/**',
      ],
    },
    
    // React 19 optimizations
    ppr: true, // Enable Progressive Rendering
    taint: true, // Enable taint tracking for improved security
    
    // Turbopack optimizations
    turbo: {
      loaders: {
        // Enable modern loaders for Turbopack
        ".svg": ["@svgr/webpack"],
      },
      rules: {
        // Customize rules for Turbopack
      }
    },
    
    // Next.js 15 cache optimizations
    incrementalCacheHandlerPath: false,
    missingSuspenseWithCSRBailout: true,
    
    // Latest React 19 and Next.js 15 optimizations
    useServerComponents: true,
    serverMinification: true,
    useDeploymentId: true,
    useURLImports: true,
  },
  
  // Optimized for production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // Next.js 15 App Router optimizations
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
  // React compiler options
  swcMinify: true, // Use SWC for minification (faster than Terser)
  
  // Output options
  output: 'standalone', // Optimized for production deployments
  
  // Typescript configuration
  typescript: {
    // Improve TypeScript checking in development
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json',
  },
  
  // React 19 optimizations
  reactProductionProfiling: false,
  
  // Enhanced headers for better security and performance
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;",
        },
      ],
    },
  ],
  
  // Next.js 15 static assets optimization
  poweredByHeader: false,
  
  // Improved security for production
  compress: true,
  
  // React 19 shared optimizations
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
      skipDefaultConversion: true,
    },
  },
};

export default nextConfig; 