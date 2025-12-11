import { AlertTriangle, AlertCircle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { RiskLevel } from "@/lib/types"

interface RiskBannerProps {
  level: RiskLevel
  language?: "en" | "am"
  className?: string
}

const riskConfig = {
  high: {
    icon: AlertTriangle,
    en: "HIGH RISK - Immediate support recommended",
    am: "ከፍተኛ አደጋ - ፈጣን ድጋፍ ይመከራል",
    className: "bg-destructive/10 border-destructive/30 text-destructive",
  },
  medium: {
    icon: AlertCircle,
    en: "MEDIUM RISK - Consider seeking support",
    am: "መካከለኛ አደጋ - ድጋፍ መፈለግ ያስቡ",
    className: "bg-warning/10 border-warning/30 text-warning-foreground",
  },
  low: {
    icon: CheckCircle,
    en: "LOW RISK",
    am: "ዝቅተኛ አደጋ",
    className: "bg-success/10 border-success/30 text-success",
  },
}

export function RiskBanner({ level, language = "en", className }: RiskBannerProps) {
  const config = riskConfig[level]
  const Icon = config.icon

  return (
    <div className={cn("flex items-center gap-3 px-4 py-3 rounded-lg border", config.className, className)}>
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="font-medium">{config[language]}</span>
    </div>
  )
}
