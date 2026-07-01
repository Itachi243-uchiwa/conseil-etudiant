"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, ReactNode, useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import LogoDore from "@/components/ui/logo-dore"
import {
    LayoutDashboard, Vote, FileText, Users, Newspaper,
    LogOut, ChevronRight, Menu, X, Sun, Moon
} from "lucide-react"

const NAV = [
    { href: "/membres/dashboard",    label: "Tableau de bord",       icon: LayoutDashboard },
    { href: "/membres/ag",           label: "Assemblées générales",  icon: Vote },
    { href: "/membres/bibliotheque", label: "Bibliothèque",          icon: FileText },
    { href: "/membres/rapports",     label: "Mes rapports",          icon: Users },
    { href: "/membres/actualites",   label: "Actualités membres",    icon: Newspaper },
]

export default function MemberShell({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const pathname = usePathname()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        if (status === "unauthenticated") router.replace("/membres")
    }, [status, router])

    useEffect(() => {
        setSidebarOpen(false)
    }, [pathname])

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }
    if (!session) return null

    const user = session.user

    return (
        <div className="min-h-screen bg-background text-foreground flex">

            {/* ── Sidebar desktop (md+) ── */}
            <aside className="hidden md:flex flex-col w-64 lg:w-72 border-r border-border bg-card sticky top-0 self-start h-screen overflow-y-auto shrink-0 shadow-lg shadow-black/5">
                <SidebarContent user={user} pathname={pathname} />
            </aside>

            {/* ── Overlay sidebar mobile ── */}
            {sidebarOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex">
                    <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
                    <aside className="relative w-[300px] bg-card border-r border-border flex flex-col z-10 overflow-y-auto shadow-2xl">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-xl hover:bg-muted transition-colors"
                            aria-label="Fermer le menu"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <SidebarContent user={user} pathname={pathname} />
                    </aside>
                </div>
            )}

            {/* ── Zone principale ── */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Topbar mobile */}
                <header className="md:hidden flex items-center gap-3 px-4 h-14 border-b border-border bg-card sticky top-0 z-10 shrink-0 shadow-sm">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-xl hover:bg-muted transition-colors"
                        aria-label="Ouvrir le menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2.5 min-w-0">
                        <LogoDore className="h-6 w-auto shrink-0" />
                    </div>
                    <div className="ml-auto">
                        <ThemeToggleButton />
                    </div>
                </header>

                {/* Contenu */}
                <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-5xl xl:max-w-6xl mx-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

function ThemeToggleButton() {
    const { theme, setTheme } = useTheme()
    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-xl hover:bg-muted border border-border transition-colors"
            aria-label="Changer le thème"
        >
            <Sun className="w-4 h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute w-4 h-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>
    )
}

function SidebarContent({ user, pathname }: { user: any; pathname: string }) {
    const { theme, setTheme } = useTheme()

    return (
        <div className="flex flex-col h-full">

            {/* ── Brand ── */}
            <div className="p-5 lg:p-6 border-b border-border bg-gradient-to-br from-primary/10 via-card to-card shrink-0">
                {/* Logo CE */}
                <div className="mb-5">
                    <LogoDore className="h-10 w-auto" />
                </div>

                {/* ── User info ── */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-background/60 border border-border">
                    {user.memberImage ? (
                        <img src={user.memberImage} alt="" className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-primary/20" />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-sm font-bold shrink-0 text-primary-foreground shadow-md">
                            {user.memberName?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "?"}
                        </div>
                    )}
                    <div className="min-w-0">
                        <p className="font-semibold text-sm truncate leading-tight">{user.memberName ?? user.name}</p>
                        <p className="text-muted-foreground text-xs truncate mt-0.5">{user.memberRole || "Membre"}</p>
                        {user.memberCampus && (
                            <span className="inline-block text-[10px] font-medium text-primary bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5 mt-1">
                                {user.memberCampus}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Navigation ── */}
            <nav className="flex-1 p-3 lg:p-4 space-y-0.5 overflow-y-auto">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 py-2 mt-1 mb-1">Navigation</p>
                {NAV.map(({ href, label, icon: Icon }) => {
                    const active = pathname === href || pathname.startsWith(href + "/")
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                                active
                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                            }`}
                        >
                            <Icon className={`w-4 h-4 shrink-0 ${active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"}`} />
                            <span className="flex-1 truncate">{label}</span>
                            {active && <ChevronRight className="w-3.5 h-3.5 opacity-70 shrink-0" />}
                        </Link>
                    )
                })}
            </nav>

            {/* ── Pied ── */}
            <div className="p-3 lg:p-4 border-t border-border space-y-1 shrink-0">
                {/* Thème toggle */}
                <button
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted transition-all"
                >
                    <div className="relative w-4 h-4 shrink-0">
                        <Sun className="w-4 h-4 absolute inset-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-muted-foreground" />
                        <Moon className="w-4 h-4 absolute inset-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-muted-foreground" />
                    </div>
                    <span className="dark:hidden">Passer en mode sombre</span>
                    <span className="hidden dark:inline">Passer en mode clair</span>
                </button>

                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground/70 hover:text-destructive hover:bg-destructive/10 transition-all"
                >
                    <LogOut className="w-4 h-4 shrink-0" />
                    <span>Se déconnecter</span>
                </button>
            </div>
        </div>
    )
}
