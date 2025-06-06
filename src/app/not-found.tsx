import Link from "next/link";
import type { Metadata } from "next";
import { Button, Container } from "@/components/ui";
import { ArrowLeft, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found (404) | Vivi Aesthetics & Spa",
  description:
    "The page you are looking for could not be found. Please visit our homepage or browse our services to find what you need.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <Container className="py-16 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. The page may
            have been moved or doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" size="lg">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/services" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Browse Services
            </Link>
          </Button>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Need help? Contact our team at{" "}
            <a
              href="mailto:info@vivispa.ca"
              className="text-primary hover:underline"
            >
              info@vivispa.ca
            </a>
          </p>
        </div>
      </div>
    </Container>
  );
}
