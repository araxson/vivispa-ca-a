"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore, useTransition } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

type Theme = "light" | "dark" | "system" | undefined;

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: string) => void;
  systemTheme: Theme;
  isChangingTheme: boolean;
}

// Context and hooks for more efficient theme management in React 19
const ThemeContext = createContext<ThemeContextValue>({
  theme: undefined,
  setTheme: () => {},
  systemTheme: undefined,
  isChangingTheme: false,
});

export const useTheme = () => useContext(ThemeContext);

// Get system theme with modern preference API
const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return undefined;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Subscribe to system theme changes with improved event handler
const subscribeToSystemTheme = (callback: () => void): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Use modern event listener API with abortController for React 19
  const abortController = new AbortController();
  mediaQuery.addEventListener('change', callback, { signal: abortController.signal });
  return () => abortController.abort();
};

// Get current theme from localStorage or document class
const getCurrentTheme = (): Theme => {
  if (typeof window === 'undefined') return undefined;
  
  const storedTheme = localStorage.getItem('theme') as Theme;
  if (storedTheme) return storedTheme;
  
  const isDark = document.documentElement.classList.contains("dark");
  return isDark ? "dark" : "light";
};

// Subscribe to theme changes in the DOM
const subscribeToThemeChanges = (callback: () => void): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class" &&
        mutation.target === document.documentElement
      ) {
        callback();
        break;
      }
    }
  });
  
  observer.observe(document.documentElement, { attributes: true });
  return () => observer.disconnect();
};

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  // Use React 19's useSyncExternalStore for system theme
  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemTheme,
    () => undefined
  );
  
  // Use useSyncExternalStore for current theme too (React 19 optimization)
  const theme = useSyncExternalStore(
    subscribeToThemeChanges,
    getCurrentTheme,
    () => undefined
  );
  
  const [isPending, startTransition] = useTransition();
  
  // Set theme with transition for smoother theme changes
  const setTheme = (newTheme: string) => {
    startTransition(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
    });
  };
  
  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        setTheme, 
        systemTheme,
        isChangingTheme: isPending,
      }}
    >
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </ThemeContext.Provider>
  );
}
