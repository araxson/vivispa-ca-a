/**
 * Error reporting utilities for production error handling
 * Integrates with error reporting services and provides fallback logging
 */

import type { ErrorInfo } from 'react';

interface ErrorReportData {
  error: Error;
  errorInfo?: ErrorInfo | undefined;
  context?: string | undefined;
  userId?: string | undefined;
  userAgent?: string | undefined;
  url?: string | undefined;
  timestamp: number;
}

// Add global declaration for gtag
declare global {
  interface Window {
    gtag?: (command: string, action: string, params: Record<string, unknown>) => void;
  }
}

/**
 * Report error to external service (Sentry, LogRocket, etc.)
 * In development, logs to console. In production, reports to service.
 */
export function reportError(
  error: Error, 
  errorInfo?: ErrorInfo, 
  context?: string
): void {
  // Only log in development
  if (process.env.NODE_ENV === 'development') {
    console.error('=== Error Report ===');
    console.error(error);
    if (errorInfo) {
      console.error('Component Stack:', errorInfo.componentStack);
    }
    if (context) {
      console.error('Context:', context);
    }
    console.error('===================');
  }

  // Create standard error report
  const errorData: ErrorReportData = {
    error,
    errorInfo,
    context,
    userId: typeof localStorage !== 'undefined' ? localStorage.getItem('userId') || undefined : undefined,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    timestamp: Date.now(),
  };

  // Production error reporting
  try {
    // Example integration with Sentry (uncomment when Sentry is configured)
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error, {
    //     contexts: {
    //       react: errorInfo,
    //       custom: { context },
    //     },
    //   });
    // }

    // Example integration with LogRocket (uncomment when LogRocket is configured)
    // if (typeof window !== 'undefined' && window.LogRocket) {
    //   window.LogRocket.captureException(error);
    // }    
    
    // Fallback: Send to custom endpoint or analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: 'false',
        error_boundary: errorInfo ? 'true' : 'false',
        context: context || 'unknown',
      });
    }

    // You could also send to a custom error logging endpoint
    // fetch('/api/error-log', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(sanitizeErrorData(errorData)),
    // }).catch(() => {
    //   // Silently fail if error reporting fails
    // });

  } catch (reportingError) {
    // Silently fail if error reporting itself fails
    // Don't log in production to avoid console pollution
  }
}

/**
 * Sanitize error data for safe transmission
 * Removes sensitive information and limits payload size
 */
function sanitizeErrorData(errorData: ErrorReportData): Partial<ErrorReportData> {
  return {
    error: {
      name: errorData.error.name,
      message: errorData.error.message,
      stack: errorData.error.stack?.substring(0, 1000), // Limit stack trace size
    } as Error,
    ...(errorData.context && { context: errorData.context }),
    ...(errorData.userAgent && { userAgent: errorData.userAgent }),
    ...(errorData.url && { url: errorData.url }),
    timestamp: errorData.timestamp,
    // Exclude errorInfo as it might contain sensitive component data
  };
}

/**
 * Initialize global error handling
 * This should be called once in a client component
 */
export function initGlobalErrorHandling(): void {
  if (typeof window === 'undefined') return;
  
  // Setup global error handlers
  window.onerror = (message, source, lineno, colno, error) => {
    if (error) {
      reportError(error, undefined, 'window.onerror');
    } else {
      reportError(
        new Error(typeof message === 'string' ? message : 'Unknown error'),
        undefined,
        'window.onerror'
      );
    }
    // Let default error handlers run
    return false;
  };
  
  // Handle promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason instanceof Error 
      ? event.reason 
      : new Error(String(event.reason || 'Unhandled Promise Rejection'));
    
    reportError(error, undefined, 'unhandledrejection');
  });
}

/**
 * Performance-aware error reporter
 * Only reports errors in production and throttles rapid errors
 */
class ErrorReporter {
  private static instance: ErrorReporter;
  private errorCount = 0;
  private lastErrorTime = 0;
  private readonly maxErrorsPerMinute = 10;
  private readonly throttleWindow = 60000; // 1 minute

  static getInstance(): ErrorReporter {
    if (!ErrorReporter.instance) {
      ErrorReporter.instance = new ErrorReporter();
    }
    return ErrorReporter.instance;
  }

  report(error: Error, errorInfo?: React.ErrorInfo, context?: string): void {
    const now = Date.now();
    
    // Reset counter if throttle window has passed
    if (now - this.lastErrorTime > this.throttleWindow) {
      this.errorCount = 0;
    }

    // Throttle excessive errors
    if (this.errorCount >= this.maxErrorsPerMinute) {
      return;
    }

    this.errorCount++;
    this.lastErrorTime = now;

    reportError(error, errorInfo, context);
  }
}

export const errorReporter = ErrorReporter.getInstance();
