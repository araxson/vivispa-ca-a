import { useState, useEffect } from "react";

type ScrollDirection = "up" | "down" | null;

export function useScrollDirection(threshold: number = 100) {
  const [scrollDir, setScrollDir] = useState<ScrollDirection>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < 10) {
        ticking = false;
        return;
      }

      setIsScrolled(scrollY > 20);
      setScrollDir(
        scrollY > lastScrollY && scrollY > threshold ? "down" : "up",
      );
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { scrollDir, isScrolled };
}
