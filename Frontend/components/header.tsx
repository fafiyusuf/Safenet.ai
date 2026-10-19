"use client"

import { useEffect } from "react"
import { AlertOctagon, FileText, Lock, LogOut, Menu, MessageSquare, Shield, ShieldAlert, Sparkles, Upload } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import type { Language } from "@/lib/i18n"
import { getTranslation } from "@/lib/i18n"
import { DisguiseModeToggle, useDisguiseMode } from "./disguise-mode"
import { LanguageToggle } from "./language-toggle"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

interface HeaderProps {
  language: Language
  onLanguageChange: (lang: Language) => void
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const pathname = usePathname()
  const t = getTranslation(language)
  const { disguised, setDisguised } = useDisguiseMode()

  // Emergency Escape Handler (safety critical for survivors)
  const handleQuickExit = () => {
    // Replace history so Back button cannot return here
    window.location.replace("https://www.google.com")
  }

  // Keyboard shortcut listener for ESC key to trigger emergency exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleQuickExit()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const brandName = disguised ? "Personal Notes" : "SafeNet.ai"
  const BrandIcon = disguised ? FileText : Shield

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur-md transition-colors">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-emerald-700 flex items-center justify-center text-white shrink-0">
            <BrandIcon className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-foreground">{brandName}</span>
              {!disguised && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-muted text-muted-foreground border border-border">
                  ET
                </span>
              )}
            </div>
            {!disguised && (
              <span className="text-[10px] text-muted-foreground hidden sm:block -mt-0.5">
                {language === "am"
                  ? "የሳይበር ጥቃት መከላከያ"
                  : language === "om"
                  ? "Eegumsa Miidhaa Saayibarii"
                  : language === "ti"
                  ? "ምክልኻል መጥቃዕቲ ሳይበር"
                  : language === "so"
                  ? "Ka-hortagga Xadgudubka Internetka"
                  : "TFGBV Forensics & Support"}
              </span>
            )}
          </div>
        </Link>

        {/* Desktop Navigation */}
        {!disguised && (
          <nav className="hidden lg:flex items-center gap-1 border border-border rounded-md p-1 bg-muted/20">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                isActive("/")
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.nav.home}
            </Link>
            <Link
              href="/upload"
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                isActive("/upload")
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Upload className="h-3.5 w-3.5" />
              {t.nav.upload}
            </Link>
            <Link
              href="/chat"
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                isActive("/chat")
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              {t.chat.title}
            </Link>
            <Link
              href="/resources"
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                isActive("/resources")
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.nav.resources}
            </Link>
            <Link
              href="/admin"
              className={`px-2.5 py-1.5 rounded text-xs font-medium transition-colors text-muted-foreground hover:text-foreground flex items-center gap-1 ${
                isActive("/admin") ? "bg-background text-foreground shadow-xs font-semibold" : ""
              }`}
            >
              <Lock className="h-3 w-3" />
              Admin
            </Link>
          </nav>
        )}

        {/* Action Controls & Safety Escape */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Disguise Camouflage Toggle */}
          <DisguiseModeToggle disguised={disguised} onToggle={setDisguised} />

          {/* Language Toggle */}
          <LanguageToggle language={language} onToggle={onLanguageChange} />

          {/* Life-Safety Emergency Quick Exit Button */}
          <Button
            onClick={handleQuickExit}
            variant="destructive"
            size="sm"
            title="Instant Exit: Immediately switches to Google to protect your privacy"
            className="rounded-md px-3 py-1.5 text-xs font-semibold h-8 bg-rose-700 hover:bg-rose-800 text-white flex items-center gap-1.5"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">
              {t.landing.safeExit}
            </span>
            <kbd className="hidden md:inline-block px-1 py-0.2 text-[9px] bg-rose-900 rounded text-rose-100 font-mono">
              ESC
            </kbd>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 pt-12">
              <nav className="flex flex-col gap-3">
                <Link
                  href="/"
                  className={`px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive("/") ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 font-semibold" : "text-foreground hover:bg-muted"
                  }`}
                >
                  {t.nav.home}
                </Link>
                <Link
                  href="/upload"
                  className={`px-3 py-2.5 rounded-lg text-base font-medium transition-colors flex items-center gap-2.5 ${
                    isActive("/upload") ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 font-semibold" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Upload className="h-4 w-4 text-emerald-600" />
                  {t.nav.upload}
                </Link>
                <Link
                  href="/chat"
                  className={`px-3 py-2.5 rounded-lg text-base font-medium transition-colors flex items-center gap-2.5 ${
                    isActive("/chat") ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 font-semibold" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                  {t.chat.title}
                </Link>
                <Link
                  href="/resources"
                  className={`px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive("/resources") ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 font-semibold" : "text-foreground hover:bg-muted"
                  }`}
                >
                  {t.nav.resources}
                </Link>
                <Link
                  href="/admin"
                  className={`px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 mt-4 pt-4 border-t`}
                >
                  <Lock className="h-4 w-4" />
                  Admin Dashboard
                </Link>
              </nav>

              <div className="mt-8 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
                <p className="font-semibold mb-1 flex items-center gap-1">
                  <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />
                  {t.upload.emergencyTitle}
                </p>
                <p className="text-muted-foreground mb-2">
                  {t.upload.emergencyText}
                </p>
                <div className="flex flex-wrap gap-2">
                  <a href="tel:7711" className="px-2 py-1 rounded bg-amber-600 text-white font-bold">7711</a>
                  <a href="tel:6388" className="px-2 py-1 rounded bg-amber-600 text-white font-bold">6388</a>
                  <a href="tel:991" className="px-2 py-1 rounded bg-blue-600 text-white font-bold">991 (Police)</a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  )
}
