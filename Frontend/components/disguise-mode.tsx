"use client"

import { useEffect, useState } from "react"
import { EyeOff, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

export function useDisguiseMode() {
  const [disguised, setDisguised] = useState(false)

  useEffect(() => {
    if (disguised) {
      // Change document title to something innocuous
      document.title = "Notes - My Documents"
      // Change favicon would require dynamic favicon support
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement
      if (link) {
        link.href =
          "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' fontSize='90'>📝</text></svg>"
      }
    } else {
      document.title = "Safenet.ai - Report Online Abuse"
    }

    return () => {
      document.title = "Safenet.ai - Report Online Abuse"
    }
  }, [disguised])

  return { disguised, setDisguised }
}

interface DisguiseModeToggleProps {
  disguised: boolean
  onToggle: (value: boolean) => void
}

export function DisguiseModeToggle({ disguised, onToggle }: DisguiseModeToggleProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onToggle(!disguised)}
      className="gap-2"
      aria-label={disguised ? "Disable disguise mode" : "Enable disguise mode"}
    >
      {disguised ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      <span className="hidden sm:inline">{disguised ? "Show branding" : "Disguise"}</span>
    </Button>
  )
}
