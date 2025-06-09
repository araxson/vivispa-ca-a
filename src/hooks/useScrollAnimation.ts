"use client";

import { useEffect, useRef, useState } from "react";
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
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {},
) {
  const mergedOptions = { ...defaultOptions, ...options };
  const ref = useRef<T>(null);
  const [state, setState] = useState<
    (typeof AnimationState)[keyof typeof AnimationState]
  >(
    mergedOptions.startVisible ? AnimationState.VISIBLE : AnimationState.HIDDEN,
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setState(AnimationState.VISIBLE);
          if (mergedOptions.triggerOnce && element) {
            observer.unobserve(element);
          }
        } else if (!mergedOptions.triggerOnce) {
          setState(AnimationState.HIDDEN);
        }
      },
      // Construct options carefully for exactOptionalPropertyTypes
      // Even though mergedOptions should have defined values due to defaults,
      // this ensures that if a property were undefined, it would be omitted.
      Object.fromEntries(
        Object.entries({
          threshold: mergedOptions.threshold,
          rootMargin: mergedOptions.rootMargin,
        }).filter(([, value]) => value !== undefined),
      ) as IntersectionObserverInit,
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [
    mergedOptions.threshold,
    mergedOptions.rootMargin,
    mergedOptions.triggerOnce,
  ]);

  return { ref, state };
}
