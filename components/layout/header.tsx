"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import LogoDore from "@/components/ui/logo-dore"
import ThemeToggle from "@/components/theme-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LuxuryButton } from "@/components/ui/luxury-button"
import { Shield } from "lucide-react"

const navItems = [
  { name: "Accueil",    href: "/" },
  { name: "À propos",  href: "/about" },
  { name: "Services",  href: "/services" },
  {
    name: "Découvrir",
    items: [
      { name: "Campus",      href: "/campus" },
      { name: "Événements",  href: "/events" },
      { name: "Vlog",        href: "/vlog" },
    ],
  },
  { name: "Actualités", href: "/news" },
  { name: "FAQ",         href: "/faq" },
  { name: "Contact",     href: "/contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Ferme le menu lors d'un changement de route
  useEffect(() => {
    setSheetOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-3 sm:py-4",
      )}
    >
      <div className="container flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0" prefetch={true}>
          <LogoDore className="h-8 sm:h-10 w-auto" />
        </Link>

        {/* Nav desktop — visible à lg: (1024px+) */}
        <nav className="hidden lg:flex items-center gap-3 xl:gap-5 flex-1 justify-center">
          {navItems.map((item) => {
            if (item.items) {
              return (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm xl:text-base text-foreground/80 dark:hover:text-[#ff9900] hover:text-[#4b3db0] transition-colors font-medium whitespace-nowrap">
                    {item.name}
                    <ChevronDown className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item.items.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild>
                        <Link
                          href={subItem.href}
                          prefetch={true}
                          className={cn("w-full", pathname === subItem.href && "gold-text font-semibold")}
                        >
                          {subItem.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className={cn(
                  "text-sm xl:text-base text-foreground/80 hover:text-[#4b3db0] dark:hover:text-[#ff9900] transition-colors font-medium whitespace-nowrap",
                  pathname === item.href && "gold-text font-semibold",
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Groupe droite */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ThemeToggle />

          {/* Lien Membres — desktop lg+ */}
          <Link
            href="/membres"
            prefetch={true}
            className="hidden lg:flex items-center gap-1.5 text-sm text-foreground/60 hover:text-[#7c6ee0] transition-colors font-medium whitespace-nowrap"
          >
            <Shield className="h-4 w-4" />
            Membres
          </Link>

          {/* Bouton Rejoindre — desktop lg+ */}
          <LuxuryButton
            asChild
            className="hidden lg:flex bg-[#3F3290] hover:bg-[#4b3db0] text-white border-none text-sm"
          >
            <Link href="/join" prefetch={true}>
              Rejoindre
            </Link>
          </LuxuryButton>

          {/* Hamburger — mobile & tablette (< lg) */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-9 w-9"
                aria-label="Ouvrir le menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(85vw,320px)] sm:w-[380px] md:w-[420px] bg-background/98 backdrop-blur-md overflow-y-auto"
            >
              <SheetTitle className="sr-only">Navigation principale</SheetTitle>
              <nav className="flex flex-col gap-1 mt-8 pb-8">
                {navItems.map((item) => {
                  if (item.items) {
                    return (
                      <div key={item.name} className="space-y-1">
                        <div className="text-foreground/60 font-semibold text-xs uppercase tracking-wider px-3 pt-4 pb-1">
                          {item.name}
                        </div>
                        <div className="space-y-0.5">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              prefetch={true}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2.5 rounded-lg text-foreground/80 hover:text-[#3F3290] dark:hover:text-[#ff9900] hover:bg-muted/60 transition-colors text-base font-medium",
                                pathname === subItem.href && "text-[#3F3290] dark:text-[#ff9900] bg-muted/40 font-semibold",
                              )}
                            >
                              <ChevronRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      prefetch={true}
                      className={cn(
                        "flex items-center px-3 py-2.5 rounded-lg text-foreground/80 hover:text-[#3F3290] dark:hover:text-[#ff9900] hover:bg-muted/60 transition-colors text-base font-medium",
                        pathname === item.href && "text-[#3F3290] dark:text-[#ff9900] bg-muted/40 font-semibold",
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                })}

                {/* Séparateur */}
                <div className="border-t border-border/40 mt-3 pt-3 space-y-0.5">
                  <Link
                    href="/membres"
                    prefetch={true}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-foreground/70 hover:text-[#7c6ee0] hover:bg-muted/60 transition-colors text-base font-medium"
                  >
                    <Shield className="h-4 w-4 shrink-0" />
                    Espace membres
                  </Link>
                  <div className="px-3 pt-2">
                    <Button asChild className="w-full bg-[#3F3290] hover:bg-[#4b3db0] text-white border-none">
                      <Link href="/join" prefetch={true}>
                        Rejoindre le CE
                      </Link>
                    </Button>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
