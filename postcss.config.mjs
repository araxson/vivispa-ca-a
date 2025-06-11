/**
 * PostCSS configuration for Next.js 15 with Tailwind CSS v4
 */
export default {
  plugins: {
    // Tailwind CSS v4 nesting syntax
    'tailwindcss/nesting': {
      // Use modern CSS nesting for better compatibility
      noIsPseudoSelector: false,
    },
    
    // Core Tailwind CSS v4 processing
    tailwindcss: {},
    
    // Modern autoprefixer settings for Next.js 15
    autoprefixer: {
      flexbox: 'no-2009',
      grid: 'autoplace',
      // Add support for newer browsers
      supports: true,
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'not dead',
        'not ie 11',
      ],
    },
    
    // Production-only minification if needed
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          // Optimize CSS calc expressions
          calc: true,
          // Merge adjacent rules
          mergeRules: true,
          // Additional optimization for Tailwind CSS v4
          colormin: true,
        }],
      },
    } : {}),
  },
};
