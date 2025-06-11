"use client";

import React from "react";
import { Button } from "@/components/ui";
import { AlertTriangle } from "lucide-react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error caught by boundary:", error, errorInfo);
    } else {
      // In production, silently report to error service
      // You could integrate with services like Sentry, LogRocket, etc.
      // reportError(error, errorInfo);
    }
  }

  override render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent
          {...(this.state.error && { error: this.state.error })}
          resetError={() => this.setState({ hasError: false })}
        />
      );
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({
  error,
  resetError,
}: {
  error?: Error;
  resetError: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center bg-card border border-border rounded-lg p-8">
      <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
      <h2 className="text-xl font-bold text-foreground mb-3">
        Something went wrong
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        We encountered an error while loading this content. Please try
        refreshing the page or contact support if the problem persists.
      </p>
      <div className="flex gap-3">
        <Button onClick={resetError} variant="outline">
          Try Again
        </Button>
        <Button onClick={() => window.location.reload()}>Refresh Page</Button>
      </div>
      {process.env.NODE_ENV === "development" && error && (
        <details className="mt-6 text-left">
          <summary className="text-sm text-muted-foreground">
            Error Details (Development)
          </summary>
          <pre className="mt-2 p-4 bg-muted rounded text-xs overflow-auto max-w-full">
            {error.stack}
          </pre>
        </details>
      )}
    </div>
  );
}
