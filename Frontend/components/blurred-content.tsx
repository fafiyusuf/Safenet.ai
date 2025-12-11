"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BlurredContentProps {
  children: React.ReactNode
  warning?: string
  className?: string
}

export function BlurredContent({
  children,
  warning = "This content may be disturbing",
  className,
}: BlurredContentProps) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className={cn("relative", className)}>
      <div className={cn("transition-all duration-300", !revealed && "blur-md select-none pointer-events-none")}>
        {children}
      </div>

      {!revealed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg">
          <p className="text-sm text-muted-foreground mb-3">{warning}</p>
          <Button variant="secondary" size="sm" onClick={() => setRevealed(true)} className="gap-2">
            <Eye className="h-4 w-4" />
            Show content
          </Button>
        </div>
      )}

      {revealed && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setRevealed(false)}
          className="absolute top-2 right-2 gap-1 text-xs"
        >
          <EyeOff className="h-3 w-3" />
          Hide
        </Button>
      )}
    </div>
  )
}
