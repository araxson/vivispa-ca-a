"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Mount after client-side hydration to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR or before hydration, return a placeholder
  if (!mounted) {
    return (
      <div
        className="w-11 h-6 bg-muted/30 rounded-full animate-pulse"
        aria-hidden="true"
      />
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <SwitchPrimitive.Root
      checked={theme === "dark"}
      onCheckedChange={toggleTheme}
      className={cn(
        "group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full",
        "border-2 border-transparent focus-visible:outline-none",
        "transition-colors duration-300",
        "focus-visible:ring-2 focus-visible:ring-primary/50",
        theme === "dark" ? "bg-slate-600" : "bg-amber-200",
      )}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full ring-0",
          "transition-transform duration-300 flex items-center justify-center",
          theme === "dark"
            ? "translate-x-5 bg-slate-100"
            : "translate-x-0 bg-white",
        )}
      >
        {theme === "dark" ? (
          <Moon
            size={12}
            className="text-slate-600 transition-colors duration-300"
          />
        ) : (
          <Sun
            size={12}
            className="text-amber-600 transition-colors duration-300"
          />
        )}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}
