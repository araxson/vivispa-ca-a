"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui";
import { Container } from "@/components/ui";
import { ThemeToggle } from "./theme-toggle";
import { NAV_ITEMS, NavItem } from "@/types/navigation";
import { cva } from "class-variance-authority";

// --- Subcomponents ---

const navLinkVariants = cva(
  "relative px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-300 hover:bg-muted/60 hover:text-foreground before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-primary before:rounded-full before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100",
  {
    variants: {
      isActive: {
        true: "text-primary before:scale-x-100 bg-primary/10",
        false: "text-muted-foreground",
      },
    },
  },
);

const NavLink = ({
  item,
  isActive,
  className,
}: {
  item: NavItem;
  isActive: boolean;
  className?: string;
}) => (
  <Link
    href={item.href}
    className={cn(navLinkVariants({ isActive }), className)}
  >
    {item.name}
  </Link>
);

const DesktopNav = ({
  isActiveLink,
}: {
  isActiveLink: (href: string) => boolean;
}) => (
  <nav className="hidden md:flex items-center gap-2">
    {NAV_ITEMS.map((item) => (
      <NavLink key={item.href} item={item} isActive={isActiveLink(item.href)} />
    ))}
    <div className="ml-6 pl-6 border-l border-border/30 flex items-center gap-2">
      <Link
        href="/offers"
        className={cn(
          navLinkVariants({ isActive: isActiveLink("/offers") }),
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-secondary",
        )}
      >
        Offers
      </Link>
      <a
        href="/pricing"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          navLinkVariants({ isActive: false }),
          "bg-primary/10 text-primary hover:bg-primary/20",
        )}
      >
        Book Now
        <span className="sr-only">(opens in a new tab)</span>
      </a>
      <div className="ml-4 pl-4 border-l border-border/30">
        <ThemeToggle />
      </div>
    </div>
  </nav>
);

const MobileNav = ({
  isOpen,
  setIsOpen,
  isActiveLink,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isActiveLink: (href: string) => boolean;
}) => {
  const handleItemClick = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <div className="flex items-center md:hidden gap-2">
      <ThemeToggle />

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-10 h-10 p-0 rounded-lg transition-colors duration-300 hover:bg-muted/80"
            aria-label="Menu"
          >
            <div className="relative flex flex-col justify-center items-center w-full h-full">
              <span
                className={cn(
                  "absolute block h-0.5 w-6 bg-foreground rounded-full transition-all duration-300",
                  isOpen ? "rotate-45" : "-translate-y-1.5",
                )}
              />
              <span
                className={cn(
                  "absolute block h-0.5 w-6 bg-foreground rounded-full transition-all duration-300",
                  isOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute block h-0.5 w-6 bg-foreground rounded-full transition-all duration-300",
                  isOpen ? "-rotate-45" : "translate-y-1.5",
                )}
              />
            </div>
            <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-64 bg-background/95 backdrop-blur-lg border-border/50 rounded-lg shadow-lg p-2 flex flex-col gap-1"
          sideOffset={12}
        >
          {NAV_ITEMS.map((item) => (
            <DropdownMenuItem
              key={item.href}
              asChild
              className="p-0"
            >
              <Link
                href={item.href}
                onClick={handleItemClick}
                className={cn(
                  "block w-full px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-muted/70 focus:bg-muted/70 focus:outline-none",
                  isActiveLink(item.href) &&
                    "text-primary bg-primary/10 hover:bg-primary/15",
                )}
              >
                {item.name}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator className="bg-border/50" />
          <DropdownMenuItem
            asChild
            className="p-0"
          >
            <Link
              href="/offers"
              onClick={handleItemClick}
              className="block w-full px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:bg-secondary/80 focus:outline-none"
            >
              Offers
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="p-0"
          >
            <a
              href="/pricing"
              onClick={handleItemClick}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 bg-primary/10 text-primary hover:bg-primary/20 focus:bg-primary/20 focus:outline-none"
            >
              Book Now
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

// --- Main Navbar Component ---

export const Navbar = () => {
  const pathname = usePathname();
  const { theme, resolvedTheme } = useTheme();
  const { scrollDir, isScrolled } = useScrollDirection(150);
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkTheme = mounted && (theme === "dark" || resolvedTheme === "dark");
  const logoSrc = isDarkTheme
    ? "/images/logo-dark.svg"
    : "/images/logo-light.svg";

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-transform,background-color,backdrop-filter,border-color duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/50"
          : "bg-transparent",
        scrollDir === "down" ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <Container>
        <div className="flex h-16 md:h-18 lg:h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 md:gap-3 group"
            aria-label="Vivi Aesthetics & Spa - Home"
          >
            {mounted ? (
              <Image
                src={logoSrc}
                alt="Vivi Aesthetics & Spa Logo"
                width={48}
                height={48}
                priority
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
              />
            ) : (
              <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-muted rounded-full animate-pulse" />
            )}
            <span className="font-serif text-base md:text-lg lg:text-xl font-semibold transition-colors duration-300 group-hover:text-primary">
              Vivi Aesthetics & Spa
            </span>
          </Link>

          <DesktopNav isActiveLink={isActiveLink} />
          <MobileNav
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isActiveLink={isActiveLink}
          />
        </div>
      </Container>
    </header>
  );
};
