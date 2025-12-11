"use client"

import { useState, useEffect } from "react"
import type { Language } from "@/lib/i18n"

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Check for saved preference
    const saved = localStorage.getItem("safenet-language") as Language | null
    if (saved && (saved === "en" || saved === "am")) {
      setLanguage(saved)
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("safenet-language", lang)
  }

  return { language, setLanguage: changeLanguage }
}
