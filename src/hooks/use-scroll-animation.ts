"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimationState } from "@/lib/animation";

type ScrollAnimationOptions = {
  /**
   * Threshold value between 0 and 1 for when the animation should trigger
   * 0 = start of element enters viewport
   * 1 = entire element must be in viewport
   */
  threshold?: number;
  
  /**
   * Root margin to adjust the observer's bounding box
   */
  rootMargin?: string;
  
  /**
   * Whether the animation should trigger only once
   */
  triggerOnce?: boolean;
  
  /**
   * Whether the animation should start with elements visible
   */
  startVisible?: boolean;
};

const defaultOptions: ScrollAnimationOptions = {
  threshold: 0.1,
  rootMargin: "0px",
  triggerOnce: true,
  startVisible: false,
};

/**
 * Hook for creating scroll triggered animations
 * Optimized for React 19 performance
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {}
) {
  const mergedOptions = { ...defaultOptions, ...options };
  const ref = useRef<T>(null);
  const [state, setState] = useState<typeof AnimationState[keyof typeof AnimationState]>(
    mergedOptions.startVisible ? AnimationState.VISIBLE : AnimationState.HIDDEN
  );
  
  // Create a stable observer config object that won't change between renders
  const observerConfig = useRef({
    threshold: mergedOptions.threshold,
    rootMargin: mergedOptions.rootMargin,
    triggerOnce: mergedOptions.triggerOnce,
  });
  
  // Update config if options change
  useEffect(() => {
    observerConfig.current = {
      threshold: mergedOptions.threshold,
      rootMargin: mergedOptions.rootMargin,
      triggerOnce: mergedOptions.triggerOnce,
    };
  }, [mergedOptions.threshold, mergedOptions.rootMargin, mergedOptions.triggerOnce]);

  // Memoize the callback to avoid recreating it on each render
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (!entry) return;
    
    if (entry.isIntersecting) {
      setState(AnimationState.VISIBLE);
      if (observerConfig.current.triggerOnce && ref.current) {
        // Disconnect for better performance once triggered
        const element = ref.current;
        const observer = new IntersectionObserver(() => {}, {});
        observer.unobserve(element);
        observer.disconnect();
      }
    } else if (!observerConfig.current.triggerOnce) {
      setState(AnimationState.HIDDEN);
    }
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Create observer with clean configuration
    const observer = new IntersectionObserver(
      handleIntersection,
      {
        threshold: observerConfig.current.threshold,
        rootMargin: observerConfig.current.rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection]);

  return { ref, state };
} 