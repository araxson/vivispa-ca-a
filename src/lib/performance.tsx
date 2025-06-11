/**
 * Consolidated Performance monitoring utilities for Next.js 15
 * Tracks Core Web Vitals and provides optimization insights
 */

"use client";

import React, { ComponentType } from "react";

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  timestamp: number;
  url?: string | undefined;
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

interface PerformanceEventTimingWithInteractionId
  extends PerformanceEventTiming {
  interactionId?: number;
}

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
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
      const lastEntry = entries[entries.length - 1] as LargestContentfulPaint;
      if (lastEntry) {
        this.recordMetric("LCP", lastEntry.startTime);
      }
    });

    // First Input Delay (FID)
    this.createObserver("first-input", (entries) => {
      const firstEntry = entries[0] as PerformanceEventTiming;
      if (firstEntry) {
        const fid = firstEntry.processingStart - firstEntry.startTime;
        this.recordMetric("FID", fid);
      }
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
      for (const entry of entries) {
        const eventTiming =
          entry as PerformanceEventTimingWithInteractionId;
        if (eventTiming.interactionId) {
          const inp = eventTiming.processingEnd - eventTiming.startTime;
          this.recordMetric("INP", inp);
        }
      }
    });
  }

  private setupLongTaskMonitoring(): void {
    this.createObserver("longtask", (entries) => {
      for (const entry of entries) {
        const longTask = entry;
        this.recordMetric("Long Task", longTask.duration);
        if (process.env.NODE_ENV === "development") {
          console.warn(`Long task detected: ${longTask.duration}ms`);
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
      if (process.env.NODE_ENV === "development") {
        console.warn(`Failed to observe ${entryType}:`, error);
      }
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
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "performance_metric", {
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
    if (typeof window === "undefined" || !("performance" in window)) return;

    const resources = performance.getEntriesByType(
      "resource",
    ) as PerformanceResourceTiming[];
    let jsSize = 0;
    let cssSize = 0;
    let imageSize = 0;

    for (const resource of resources) {
      const size = resource.transferSize;
      if (resource.initiatorType === "script") {
        jsSize += size;
      } else if (resource.initiatorType === "css") {
        cssSize += size;
      } else if (resource.initiatorType === "img") {
        imageSize += size;
      }
    }

    this.bundleStats = {
      totalSize: jsSize + cssSize + imageSize,
      jsSize,
      cssSize,
      imageSize,
      chunkCount: resources.filter((r) => r.initiatorType === "script").length,
    };
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
    this.createObserver("navigation", (entries) => {
      const navEntries = entries as PerformanceNavigationTiming[];
      if (navEntries.length > 0) {
        const navEntry = navEntries[0];
        if (navEntry) {
          const ttfb = navEntry.responseStart - navEntry.startTime;
          this.recordMetric("TTFB", ttfb);
          this.recordMetric(
            "DOM Content Loaded",
            navEntry.domContentLoadedEventEnd - navEntry.startTime,
          );
          this.recordMetric(
            "Load Event",
            navEntry.loadEventEnd - navEntry.startTime,
          );
        }
      }
    });
  }

  private observeResourceTiming(): void {
    this.createObserver("resource", (entries) => {
      const resourceEntries = entries as PerformanceResourceTiming[];
      for (const entry of resourceEntries) {
        if (entry.duration > 200) {
          // Log slow resources in development only
          if (process.env.NODE_ENV === "development") {
            console.warn(`Slow resource: ${entry.name} (${entry.duration}ms)`);
          }
        }
      }
      this.analyzeBundleSize();
    });
  }

  private observeLayoutShifts(): void {
    this.createObserver("layout-shift", (entries) => {
      let clsValue = 0;
      for (const entry of entries) {
        const shift = entry as LayoutShift;
        if (!shift.hadRecentInput) {
          clsValue += shift.value;
        }
      }
      this.recordMetric("CLS", clsValue);
    });
  }

  private observeFirstInputDelay(): void {
    this.createObserver("first-input", (entries) => {
      const firstEntry = entries[0] as PerformanceEventTiming;
      if (firstEntry) {
        const fid = firstEntry.processingStart - firstEntry.startTime;
        this.recordMetric("FID", fid);
      }
    });
  }

  private observeLargestContentfulPaint(): void {
    this.createObserver("largest-contentful-paint", (entries) => {
      const lastEntry = entries[entries.length - 1] as LargestContentfulPaint;
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
  const existingMetric = monitor.getLatestMetric(metric.name);

  // Avoid reporting duplicates
  if (
    existingMetric &&
    Math.abs(existingMetric.value - metric.value) < 0.1
  ) {
    return;
  }

  monitor.recordMetric(metric.name, metric.value, metric.rating);
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
    if (!startTime) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`ResourceLoadTracker: ${resourceUrl} was not tracked.`);
      }
      return -1;
    }
    const duration = performance.now() - startTime;
    this.loadTimes.delete(resourceUrl);
    return duration;
  }
}

/**
 * HOC for tracking component render performance
 */
export function trackComponentRender<P extends object>(
  Component: ComponentType<P>,
  componentName: string,
): ComponentType<P> {
  const TrackedComponent = (props: P) => {
    const start = performance.now();

    React.useEffect(() => {
      const end = performance.now();
      const duration = end - start;
      PerformanceMonitor.getInstance().recordMetric(
        `Component Render: ${componentName}`,
        duration,
      );
      if (duration > 50 && process.env.NODE_ENV === "development") {
        console.warn(
          `Slow render detected for ${componentName}: ${duration.toFixed(2)}ms`,
        );
      }
    }, [start]);

    return <Component {...props} />;
  };

  TrackedComponent.displayName = `trackComponentRender(${componentName})`;
  return TrackedComponent;
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
