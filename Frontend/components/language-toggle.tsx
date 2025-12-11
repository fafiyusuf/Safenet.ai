"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Language } from "@/lib/i18n"

interface LanguageToggleProps {
  language: Language
  onToggle: (lang: Language) => void
}

export function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onToggle(language === "en" ? "am" : "en")}
      className="gap-2"
      aria-label={`Switch to ${language === "en" ? "Amharic" : "English"}`}
    >
      <Globe className="h-4 w-4" />
      <span>{language === "en" ? "አማርኛ" : "English"}</span>
    </Button>
  )
}
