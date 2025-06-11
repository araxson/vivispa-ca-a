"use client";

import React from "react";
import { ErrorBoundary } from "@/components/blocks/utilities-and-wrappers/error-boundary";
import { Button } from "@/components/ui";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

interface AppErrorFallbackProps {
  error?: Error;
  resetError: () => void;
}

/**
 * App-level error fallback component with enhanced UX
 */
function AppErrorFallback({ error, resetError }: AppErrorFallbackProps) {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-4">
          <AlertTriangle className="h-16 w-16 text-destructive mx-auto" />
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Oops! Something went wrong
            </h1>
            <p className="text-muted-foreground">
              We're sorry, but something unexpected happened. Our team has been notified.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={resetError} 
            variant="default" 
            size="lg" 
            className="w-full"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            size="lg" 
            className="w-full"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Page
          </Button>
          
          <Button 
            onClick={handleGoHome} 
            variant="secondary" 
            size="lg" 
            className="w-full"
          >
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        </div>

        <div className="text-sm text-muted-foreground border-t pt-4">
          <p>If the problem persists, please contact our support team.</p>
          <p className="mt-1">
            <a 
              href="mailto:support@vivispa.ca" 
              className="text-primary hover:underline"
            >
              support@vivispa.ca
            </a>
          </p>
        </div>

        {process.env.NODE_ENV === "development" && error && (
          <details className="text-left border rounded p-4 bg-muted">
            <summary className="text-sm font-medium cursor-pointer">
              Error Details (Development Only)
            </summary>
            <pre className="mt-2 text-xs overflow-auto max-h-32 text-muted-foreground">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

/**
 * App-level error boundary wrapper
 * Provides global error handling for the entire application
 */
export function AppErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={AppErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
