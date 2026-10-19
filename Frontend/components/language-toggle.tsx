"use client"

import { Check, ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Language } from "@/lib/i18n"

interface LanguageToggleProps {
  language: Language
  onToggle: (lang: Language) => void
}

export const LANGUAGES: { code: Language; name: string; native: string; flag: string }[] = [
  { code: "en", name: "English", native: "English", flag: "🇬🇧" },
  { code: "am", name: "Amharic", native: "አማርኛ", flag: "🇪🇹" },
  { code: "om", name: "Oromo", native: "Afaan Oromoo", flag: "🇪🇹" },
  { code: "ti", name: "Tigrinya", native: "ትግርኛ", flag: "🇪🇹" },
  { code: "so", name: "Somali", native: "Soomaali", flag: "🇸🇴" },
]

export function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  const current = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 sm:gap-2 px-2.5 sm:px-3 text-xs sm:text-sm font-medium border border-border hover:bg-muted rounded-md h-8"
          aria-label={`Select language (Current: ${current.native})`}
        >
          <Globe className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-medium">{current.native}</span>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 p-1 rounded-md border border-border shadow-md bg-popover text-popover-foreground">
        {LANGUAGES.map((lang) => {
          const isSelected = lang.code === language
          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => onToggle(lang.code)}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-sm cursor-pointer text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base leading-none">{lang.flag}</span>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">{lang.native}</span>
                  <span className="text-[10px] text-muted-foreground">{lang.name}</span>
                </div>
              </div>
              {isSelected && <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 font-bold" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
