"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SafeExitButton() {
  const handleSafeExit = () => {
    // Clear any sensitive data from memory
    if (typeof window !== "undefined") {
      // Replace history to prevent back button
      window.history.replaceState(null, "", "https://www.google.com")
      // Navigate to Google
      window.location.replace("https://www.google.com")
    }
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleSafeExit}
      className="fixed top-4 right-4 z-50 gap-2"
      aria-label="Safe exit - leaves this page immediately"
    >
      <X className="h-4 w-4" />
      <span className="sr-only md:not-sr-only">Safe Exit</span>
    </Button>
  )
}
