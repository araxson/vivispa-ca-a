"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { 
  Button, 
  Container,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui"
import { ThemeToggle } from "./theme-toggle"
import { NAV_ITEMS } from "@/types/navigation"

export function Navbar() {
  const pathname = usePathname()
  const { theme, resolvedTheme } = useTheme()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isHidden, setIsHidden] = React.useState(false)
  const [lastScrollY, setLastScrollY] = React.useState(0)
  const [isOpen, setIsOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  
  // Handle scroll behavior
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      setIsScrolled(currentScrollY > 20)
      
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsHidden(true)
      } else {
        setIsHidden(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleItemClick = React.useCallback(() => {
    setIsOpen(false)
  }, [])

  const isDarkTheme = mounted && (theme === "dark" || resolvedTheme === "dark")
  const logoSrc = isDarkTheme ? "/images/logo-dark.svg" : "/images/logo-light.svg"

  const isActiveLink = (href: string) => {
    return pathname === href || (pathname.startsWith(href) && href !== "/")
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border/50" 
          : "bg-transparent",
        isHidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <Container>
        <div className="flex h-16 md:h-18 lg:h-20 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 md:gap-3 group transition-colors duration-300"
            aria-label="Vivi Aesthetics & Spa - Home"
          >
            {mounted ? (
              <Image 
                src={logoSrc} 
                alt="Vivi Aesthetics & Spa Logo"
                width={48}
                height={48}
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain"
              />
            ) : (
              <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-muted rounded animate-pulse" />
            )}
            <span className="font-serif text-base md:text-lg lg:text-xl font-semibold transition-colors duration-300 group-hover:text-primary">
              Vivi Aesthetics & Spa
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                  "hover:bg-muted/60 hover:text-foreground",
                  "before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-primary before:rounded-full",
                  "before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100",
                  isActiveLink(item.href)
                    ? "text-primary before:scale-x-100 bg-primary/5" 
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}

            {/* Action Buttons */}
            <div className="flex items-center gap-2 ml-6 pl-6 border-l border-border/30">
              <Button 
                asChild 
                size="sm" 
                variant="outline"
                className="bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700 transition-colors duration-300"
              >
                <Link href="/offers">
                  Offers
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="sm"
                className="bg-primary hover:bg-primary/90 transition-colors duration-300"
              >
                <a href="https://book.vivispa.ca" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
              </Button>
            </div>
            
            <div className="ml-4 pl-4 border-l border-border/30">
              <ThemeToggle />
            </div>
          </nav>

          {/* Tablet Navigation */}
          <nav className="hidden md:flex lg:hidden items-center gap-1">
            {NAV_ITEMS.slice(0, 3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-1 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                  "hover:bg-muted/60 hover:text-foreground",
                  "before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-primary",
                  "before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100",
                  isActiveLink(item.href)
                    ? "text-primary before:scale-x-100 bg-primary/5" 
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}

            <div className="flex items-center gap-2 ml-4">
              <Button 
                asChild 
                size="sm" 
                variant="outline"
                className="bg-red-600 hover:bg-red-700 text-white border-red-600 transition-colors duration-300"
              >
                <Link href="/offers">Offers</Link>
              </Button>
              
              <Button 
                asChild 
                size="sm"
                className="transition-colors duration-300"
              >
                <a href="https://book.vivispa.ca" target="_blank" rel="noopener noreferrer">Book</a>
              </Button>
              
              <div className="ml-2 pl-2 border-l border-border/30">
                <ThemeToggle />
              </div>
            </div>
          </nav>

          {/* Mobile Navigation */}
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
                        isOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
                      )}
                    />
                    <span
                      className={cn(
                        "absolute block h-0.5 w-6 bg-foreground rounded-full transition-all duration-300",
                        isOpen ? "opacity-0" : "opacity-100"
                      )}
                    />
                    <span
                      className={cn(
                        "absolute block h-0.5 w-6 bg-foreground rounded-full transition-all duration-300",
                        isOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
                      )}
                    />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent 
                align="end" 
                className="w-64 max-h-[calc(100vh-5rem)] p-1 overflow-y-auto bg-background/95 backdrop-blur-lg border-border/50 rounded-lg shadow-lg"
                sideOffset={12}
              >
                <div className="">
                  {NAV_ITEMS.map((item) => (
                    <DropdownMenuItem key={item.href} asChild onClick={handleItemClick}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block w-full px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-muted/70 focus:bg-muted/70 focus:outline-none",
                          isActiveLink(item.href) && "text-primary font-semibold bg-primary/10 hover:bg-primary/15"
                        )}
                      >
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  
                  <DropdownMenuSeparator className="my-2 bg-border/50" />
                  
                  <div className="space-y-2">
                    <Button 
                      asChild 
                      size="sm" 
                      variant="outline"
                      className="w-full h-9 bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700 transition-colors duration-300 font-medium"
                      onClick={handleItemClick}
                    >
                      <Link href="/offers" className="flex items-center justify-center">
                        Offers
                      </Link>
                    </Button>
                    
                    <Button 
                      asChild 
                      size="sm" 
                      className="w-full h-9 bg-primary hover:bg-primary/90 transition-colors duration-300 font-medium"
                      onClick={handleItemClick}
                    >
                      <a href="https://book.vivispa.ca" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        Book Now
                      </a>
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Container>
    </header>
  )
} 