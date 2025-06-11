import type { Metadata, Viewport } from "next";
import { Playfair_Display, Roboto } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { defaultMetadata, viewport as viewportConfig } from "@/app/metadata";
import { WhatsAppWidget } from '@/components/ui';
import { AppErrorBoundary, ErrorHandlingInitializer } from "@/components/layout";

/**
 * Configure fonts with next/font
 * Using optimized font loading with next/font for React 19
 * See: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
 */
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair-display",
  display: "swap",
  preload: true,
  adjustFontFallback: 'Times New Roman',
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
  preload: true,
  adjustFontFallback: 'Arial',
});

// Pre-defined WhatsApp messages for better performance
const predefinedMessages = [
  'I have a question about a service.',
  "I'd like to book an appointment.",
  'What are your opening hours?',
] as const;

// Export metadata for Next.js 15
export const metadata: Metadata = {
  ...defaultMetadata,
  verification: {
    google: "google-site-verification=YOUR_CODE",
    other: {
      me: ["info@vivispa.ca"],
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Vivi Aesthetics Spa",
  },
  formatDetection: {
    telephone: true,
    date: false,
    address: false,
    email: true,
    url: false,
  },
};

// Export viewport configuration separately for better performance
export const viewport: Viewport = viewportConfig;

interface RootLayoutProps {
  children: React.ReactNode;
}

// Using a function component for better compatibility with React 19
export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${roboto.variable} ${playfairDisplay.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ErrorHandlingInitializer />
        <AppErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Skip to content link for accessibility */}
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground"
              tabIndex={0}
              aria-label="Skip to main content"
            >
              Skip to content
            </a>
            
            <div className="relative flex min-h-screen flex-col">
              <main 
                id="main-content" 
                className="flex-1"
                aria-label="Main content"
              >
                {children}
              </main>
            </div>
            
            <WhatsAppWidget
              phoneNumber="+15551234567"
              brandName="Vivi Aesthetics Spa"
              welcomeMessage="Hello! How can we help you today?"
              predefinedMessages={predefinedMessages}
            />
          </ThemeProvider>
        </AppErrorBoundary>
      </body>
    </html>
  );
}
