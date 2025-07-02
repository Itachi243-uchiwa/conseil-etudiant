"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import LogoDore from "@/components/ui/logo-dore"
import ThemeToggle from "@/components/theme-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Regroupement des éléments de navigation
const navItems = [
  { name: "Accueil", href: "/" },
  { name: "À propos", href: "/about" },
  { name: "Services", href: "/services" },
  {
    name: "Découvrir",
    items: [
      { name: "Campus", href: "/campus" },
      { name: "Événements", href: "/events" },
      { name: "Vlog", href: "/vlog" },
    ],
  },
  { name: "Actualités", href: "/news" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={true}>
          <LogoDore className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            // Si l'élément a des sous-éléments, on affiche un menu déroulant
            if (item.items) {
              return (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/80 hover:text-[#3F3290] transition-colors font-medium">
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item.items.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild>
                        <Link
                          href={subItem.href}
                          prefetch={true}
                          className={cn("w-full", pathname === subItem.href && "text-[#3F3290] font-semibold")}
                        >
                          {subItem.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            }

            // Sinon, on affiche un lien simple
            return (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className={cn(
                  "text-foreground/80 hover:text-[#3F3290] transition-colors font-medium",
                  pathname === item.href && "text-[#3F3290] font-semibold",
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button asChild className="hidden md:flex bg-[#3F3290] hover:bg-[#4b3db0] text-white border-none">
            <Link href="/join" prefetch={true}>
              Rejoindre
            </Link>
          </Button>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur-md">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => {
                  // Si l'élément a des sous-éléments, on les affiche en dessous
                  if (item.items) {
                    return (
                      <div key={item.name} className="space-y-2">
                        <div className="text-foreground/80 font-medium text-lg">{item.name}</div>
                        <div className="pl-4 space-y-2 border-l border-muted-foreground/20">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              prefetch={true}
                              className={cn(
                                "block text-foreground/80 hover:text-[#3F3290] transition-colors text-base",
                                pathname === subItem.href && "text-[#3F3290] font-semibold",
                              )}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                  }

                  // Sinon, on affiche un lien simple
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      prefetch={true}
                      className={cn(
                        "text-foreground/80 hover:text-[#3F3290] transition-colors text-lg font-medium py-2",
                        pathname === item.href && "text-[#3F3290] font-semibold",
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                })}
                <Button asChild className="mt-4 bg-[#3F3290] hover:bg-[#4b3db0] text-white border-none">
                  <Link href="/join" prefetch={true}>
                    Rejoindre
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
