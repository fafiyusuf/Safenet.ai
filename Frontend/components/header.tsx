"use client"

import { FileText, Lock, Menu, MessageSquare, Shield } from "lucide-react"
import Link from "next/link"

import type { Language } from "@/lib/i18n"
import { getTranslation } from "@/lib/i18n"
import { useDisguiseMode } from "./disguise-mode"
import { LanguageToggle } from "./language-toggle"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

interface HeaderProps {
  language: Language
  onLanguageChange: (lang: Language) => void
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const t = getTranslation(language)
  const { disguised, setDisguised } = useDisguiseMode()

  const brandName = disguised ? "Notes" : "Safenet.ai"
  const BrandIcon = disguised ? FileText : Shield

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <BrandIcon className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg text-foreground">{brandName}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.nav.home}
          </Link>
          <Link href="/upload" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.nav.upload}
          </Link>
          <Link href="/chat" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            {language === 'en' ? 'Support' : 'ድጋፍ'}
          </Link>
          <Link href="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.nav.resources}
          </Link>
          <Link
            href="/admin"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Lock className="h-3 w-3" />
            Admin
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle language={language} onToggle={onLanguageChange} />


          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                  {t.nav.home}
                </Link>
                <Link
                  href="/upload"
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                >
                  {t.nav.upload}
                </Link>
                <Link
                  href="/chat"
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  {language === 'en' ? 'Support' : 'ድጋፍ'}
                </Link>
                <Link
                  href="/resources"
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                >
                  {t.nav.resources}
                </Link>
                <Link
                  href="/admin"
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  Admin
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
