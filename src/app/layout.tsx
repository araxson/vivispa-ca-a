import type { Metadata } from "next";
import { Playfair_Display, Roboto } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { baseMetadata, viewport } from "@/lib/metadata-utils";

/**
 * Configure fonts with next/font
 * See: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
 */
const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair-display",
  display: "swap",
  preload: true,
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
  preload: true,
});

// Export metadata and viewport for Next.js 15.2+ performance optimization
export const metadata: Metadata = {
  ...baseMetadata,
};
export { viewport };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`scroll-smooth ${roboto.variable} ${playfairDisplay.variable}`}>
      <head>
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          
        >
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </ThemeProvider>
        

      </body>
    </html>
  );
}
