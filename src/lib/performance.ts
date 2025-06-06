/**
 * Consolidated Performance monitoring utilities for Next.js 15
 * Tracks Core Web Vitals and provides optimization insights
 */

"use client";

import React from "react";

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  timestamp: number;
  url?: string;
}

export interface WebVital {
  name: "FCP" | "LCP" | "CLS" | "FID" | "TTFB" | "INP";
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  id: string;
}

export interface WebVitalsThresholds {
  good: number;
  needsImprovement: number;
}

export interface BundleAnalytics {
  totalSize: number;
  jsSize: number;
  cssSize: number;
  imageSize: number;
  chunkCount: number;
}

// Core Web Vitals thresholds (in milliseconds)
export const WEB_VITALS_THRESHOLDS: Record<string, WebVitalsThresholds> = {
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FID: { good: 100, needsImprovement: 300 },
  FCP: { good: 1800, needsImprovement: 3000 },
  LCP: { good: 2500, needsImprovement: 4000 },
  TTFB: { good: 800, needsImprovement: 1800 },
  INP: { good: 200, needsImprovement: 500 },
};

/**
 * Rate performance metric based on thresholds
 */
export function rateMetric(
  name: string,
  value: number,
): "good" | "needs-improvement" | "poor" {
  const thresholds = WEB_VITALS_THRESHOLDS[name];
  if (!thresholds) return "good";

  if (value <= thresholds.good) return "good";
  if (value <= thresholds.needsImprovement) return "needs-improvement";
  return "poor";
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Consolidated Performance monitoring class
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, PerformanceMetric[]> = new Map();
  private observers: PerformanceObserver[] = [];
  private bundleStats: BundleAnalytics | null = null;

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Initialize performance monitoring
   */
  init(): void {
    if (typeof window === "undefined") return;

    // Setup all monitoring
    this.setupCoreWebVitals();
    this.observeNavigationTiming();
    this.observeResourceTiming();
    this.observeLayoutShifts();
    this.observeFirstInputDelay();
    this.observeLargestContentfulPaint();
    this.setupLongTaskMonitoring();
  }

  private setupCoreWebVitals(): void {
    // Largest Contentful Paint (LCP)
    this.createObserver("largest-contentful-paint", (entries) => {
      const lastEntry = entries[entries.length - 1] as any;
      this.recordMetric("LCP", lastEntry.startTime);
    });

    // First Input Delay (FID)
    this.createObserver("first-input", (entries) => {
      const firstEntry = entries[0] as any;
      const fid = firstEntry.processingStart - firstEntry.startTime;
      this.recordMetric("FID", fid);
    });

    // First Contentful Paint (FCP)
    this.createObserver("paint", (entries) => {
      const fcpEntry = entries.find(
        (entry) => entry.name === "first-contentful-paint",
      );
      if (fcpEntry) {
        this.recordMetric("FCP", fcpEntry.startTime);
      }
    });

    // Interaction to Next Paint (INP)
    this.createObserver("event", (entries) => {
      for (const entry of entries as any[]) {
        if (entry.interactionId) {
          const inp = entry.processingEnd - entry.startTime;
          this.recordMetric("INP", inp);
        }
      }
    });
  }

  private setupLongTaskMonitoring(): void {
    this.createObserver("longtask", (entries) => {
      for (const entry of entries) {
        this.recordMetric("Long Task", entry.duration);
        if (process.env.NODE_ENV === "development") {
          console.warn(`Long task detected: ${entry.duration}ms`);
        }
      }
    });
  }

  private createObserver(
    entryType: string,
    callback: (entries: PerformanceEntry[]) => void,
  ): void {
    if (!("PerformanceObserver" in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });
      observer.observe({ type: entryType, buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn(`Failed to observe ${entryType}:`, error);
    }
  }

  /**
   * Record a custom metric
   */
  recordMetric(
    name: string,
    value: number,
    customRating?: "good" | "needs-improvement" | "poor",
  ): void {
    const metric: PerformanceMetric = {
      name,
      value,
      rating: customRating || rateMetric(name, value),
      timestamp: Date.now(),
      url: typeof window !== "undefined" ? window.location.pathname : undefined,
    };

    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }

    this.metrics.get(name)!.push(metric);

    // Keep only last 100 metrics per type
    const metrics = this.metrics.get(name)!;
    if (metrics.length > 100) {
      metrics.splice(0, metrics.length - 100);
    }

    this.reportMetric(metric);
  }

  private reportMetric(metric: PerformanceMetric): void {
    // Send to analytics if available
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "performance_metric", {
        metric_name: metric.name,
        metric_value: metric.value,
        metric_rating: metric.rating,
        page_url: metric.url,
      });
    }

    // Log for development
    if (process.env.NODE_ENV === "development") {
      console.log(
        `Performance Metric - ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`,
      );
    }
  }

  /**
   * Get metrics for a specific type
   */
  getMetrics(name: string): PerformanceMetric[] {
    return this.metrics.get(name) || [];
  }

  /**
   * Get latest metric value
   */
  getLatestMetric(name: string): PerformanceMetric | undefined {
    const metrics = this.getMetrics(name);
    return metrics[metrics.length - 1];
  }

  /**
   * Get average value for a metric
   */
  getAverageMetric(name: string): number {
    const metrics = this.getMetrics(name);
    if (metrics.length === 0) return 0;

    const sum = metrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / metrics.length;
  }

  /**
   * Get performance summary
   */
  getSummary(): Record<string, any> {
    const summary: Record<string, any> = {};

    for (const [name, metrics] of this.metrics) {
      if (metrics.length > 0) {
        const latest = metrics[metrics.length - 1];
        if (latest) {
          summary[name] = {
            current: latest.value,
            average: this.getAverageMetric(name),
            rating: latest.rating,
            count: metrics.length,
          };
        }
      }
    }

    return summary;
  }

  /**
   * Track user interaction performance
   */
  trackUserInteraction(action: string, duration: number): void {
    this.recordMetric(`User Action: ${action}`, duration);
  }

  /**
   * Track route change performance
   */
  trackRouteChange(from: string, to: string, duration: number): void {
    this.recordMetric(`Route Change: ${from} → ${to}`, duration);
  }

  /**
   * Analyze bundle size (for build analysis)
   */
  analyzeBundleSize(): void {
    if (typeof window === "undefined") return;

    const navEntries = performance.getEntriesByType("navigation") as any[];
    const resourceEntries = performance.getEntriesByType("resource") as any[];

    let totalSize = 0;
    let jsSize = 0;
    let cssSize = 0;
    let imageSize = 0;
    let chunkCount = 0;

    resourceEntries.forEach((entry) => {
      if (entry.transferSize) {
        totalSize += entry.transferSize;

        if (entry.name.includes(".js")) {
          jsSize += entry.transferSize;
          chunkCount++;
        } else if (entry.name.includes(".css")) {
          cssSize += entry.transferSize;
        } else if (entry.name.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) {
          imageSize += entry.transferSize;
        }
      }
    });

    this.bundleStats = { totalSize, jsSize, cssSize, imageSize, chunkCount };
  }

  /**
   * Get bundle analytics
   */
  getBundleAnalytics(): BundleAnalytics | null {
    return this.bundleStats;
  }

  /**
   * Clear all metrics
   */
  clear(): void {
    this.metrics.clear();
    this.bundleStats = null;
  }

  private observeNavigationTiming(): void {
    if (typeof window === "undefined") return;

    const navEntries = performance.getEntriesByType("navigation") as any[];
    if (navEntries.length > 0) {
      const entry = navEntries[0];

      // TTFB
      const ttfb = entry.responseStart - entry.requestStart;
      this.recordMetric("TTFB", ttfb);

      // DOM Content Loaded
      const dcl =
        entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart;
      this.recordMetric("DOM Content Loaded", dcl);

      // Load Event
      const loadTime = entry.loadEventEnd - entry.loadEventStart;
      this.recordMetric("Load Event", loadTime);
    }
  }

  private observeResourceTiming(): void {
    if (typeof window === "undefined") return;

    const resourceEntries = performance.getEntriesByType("resource") as any[];

    resourceEntries.forEach((entry) => {
      if (entry.duration > 1000) {
        // Resources taking longer than 1s
        this.recordMetric(`Slow Resource: ${entry.name}`, entry.duration);
      }
    });
  }

  private observeLayoutShifts(): void {
    let clsValue = 0;

    this.createObserver("layout-shift", (entries) => {
      for (const entry of entries as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.recordMetric("CLS", clsValue);
    });
  }

  private observeFirstInputDelay(): void {
    this.createObserver("first-input", (entries) => {
      const firstEntry = entries[0] as any;
      if (firstEntry) {
        const fid = firstEntry.processingStart - firstEntry.startTime;
        this.recordMetric("FID", fid);
      }
    });
  }

  private observeLargestContentfulPaint(): void {
    this.createObserver("largest-contentful-paint", (entries) => {
      const lastEntry = entries[entries.length - 1] as any;
      if (lastEntry) {
        this.recordMetric("LCP", lastEntry.startTime);
      }
    });
  }

  /**
   * Cleanup observers
   */
  cleanup(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
  }
}

/**
 * Report Web Vitals function for compatibility
 */
export function reportWebVitals(metric: WebVital | PerformanceMetric): void {
  const monitor = PerformanceMonitor.getInstance();

  if ("delta" in metric) {
    // WebVital format
    monitor.recordMetric(metric.name, metric.value, metric.rating);
  } else {
    // PerformanceMetric format
    monitor.recordMetric(metric.name, metric.value, metric.rating);
  }
}

/**
 * Resource Load Tracker for monitoring specific resource loading times
 */
export class ResourceLoadTracker {
  private static loadTimes: Map<string, number> = new Map();

  static startTracking(resourceUrl: string): void {
    this.loadTimes.set(resourceUrl, performance.now());
  }

  static endTracking(resourceUrl: string): number {
    const startTime = this.loadTimes.get(resourceUrl);
    if (startTime) {
      const loadTime = performance.now() - startTime;
      this.loadTimes.delete(resourceUrl);

      const monitor = PerformanceMonitor.getInstance();
      monitor.recordMetric(`Resource Load: ${resourceUrl}`, loadTime);

      return loadTime;
    }
    return 0;
  }
}

/**
 * HOC for tracking component render performance
 */
export function trackComponentRender<T extends React.ComponentType<any>>(
  Component: T,
  componentName: string,
): T {
  const TrackedComponent = (props: any) => {
    const startTime = performance.now();

    React.useEffect(() => {
      const renderTime = performance.now() - startTime;
      const monitor = PerformanceMonitor.getInstance();
      monitor.recordMetric(`Component Render: ${componentName}`, renderTime);
    });

    return React.createElement(Component, props);
  };

  TrackedComponent.displayName = `TrackedComponent(${componentName})`;
  return TrackedComponent as T;
}

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring(): void {
  if (typeof window === "undefined") return;

  const monitor = PerformanceMonitor.getInstance();
  monitor.init();

  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    monitor.cleanup();
  });
}

/**
 * Get performance insights and recommendations
 */
export function getPerformanceInsights(): {
  insights: string[];
  recommendations: string[];
} {
  const monitor = PerformanceMonitor.getInstance();
  const summary = monitor.getSummary();
  const insights: string[] = [];
  const recommendations: string[] = [];

  // Analyze metrics and provide insights
  Object.entries(summary).forEach(([metricName, data]: [string, any]) => {
    if (data.rating === "poor") {
      insights.push(
        `${metricName} needs improvement: ${data.current.toFixed(2)}ms`,
      );

      switch (metricName) {
        case "LCP":
          recommendations.push(
            "Optimize image loading, reduce render-blocking resources",
          );
          break;
        case "FID":
          recommendations.push(
            "Reduce JavaScript execution time, split large tasks",
          );
          break;
        case "CLS":
          recommendations.push("Set explicit dimensions for images and ads");
          break;
      }
    }
  });

  return { insights, recommendations };
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();
