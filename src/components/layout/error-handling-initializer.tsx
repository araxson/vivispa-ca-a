"use client";

import { useEffect, memo } from "react";
import { initGlobalErrorHandling } from "@/lib/error-reporting";

/**
 * Client component to initialize global error handling
 * Uses React 19 patterns for client-side effect handling
 */
export const ErrorHandlingInitializer = memo(function ErrorHandlingInitializer() {
  useEffect(() => {
    // Only initialize in the browser environment
    if (typeof window === 'undefined') return;
    
    // Use React 19 singleton pattern for initialization
    const moduleKey = '__errorHandlingInitialized';
    if (!(window as any)[moduleKey]) {
      initGlobalErrorHandling();
      (window as any)[moduleKey] = true;
    }
    
    // No cleanup needed as these are global handlers
  }, []);

  // This component renders nothing
  return null;
});
