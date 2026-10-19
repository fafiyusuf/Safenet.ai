import { AlertTriangle, AlertCircle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Language, RiskLevel } from "@/lib/types"

interface RiskBannerProps {
  level: RiskLevel
  language?: Language
  className?: string
}

const riskConfig: Record<
  RiskLevel,
  {
    icon: any
    className: string
    translations: Record<Language, string>
  }
> = {
  high: {
    icon: AlertTriangle,
    className: "bg-destructive/10 border-destructive/30 text-destructive",
    translations: {
      en: "HIGH RISK - Immediate support recommended",
      am: "ከፍተኛ አደጋ - ፈጣን ድጋፍ ይመከራል",
      om: "SODDAA OLAANAA - Deeggarsa ariifachiisaan gorfama",
      ti: "ላዕለዋይ ሓደጋ - ህጹጽ ደገፍ ይምከር",
      so: "HALIS SARE - Waxaa lagula talinayaa caawimo degdeg ah",
    },
  },
  medium: {
    icon: AlertCircle,
    className: "bg-warning/10 border-warning/30 text-warning-foreground",
    translations: {
      en: "MEDIUM RISK - Consider seeking support",
      am: "መካከለኛ አደጋ - ድጋፍ መፈለግ ያስቡ",
      om: "SODDAA GIDDU-GALEESSA - Deeggarsa barbaaduu yaadaa",
      ti: "ማእከላይ ሓደጋ - ደገፍ ምድላይ ሕሰቡ",
      so: "HALIS DHEX-DHEXAAD AH - Ka fiirso raadinta caawimo",
    },
  },
  low: {
    icon: CheckCircle,
    className: "bg-success/10 border-success/30 text-success",
    translations: {
      en: "LOW RISK",
      am: "ዝቅተኛ አደጋ",
      om: "SODDAA GADI-AANAA",
      ti: "ትሑት ሓደጋ",
      so: "HALIS HOOSE",
    },
  },
}

export function RiskBanner({ level, language = "en", className }: RiskBannerProps) {
  const config = riskConfig[level]
  const Icon = config.icon
  const label = config.translations[language] || config.translations.en

  return (
    <div className={cn("flex items-center gap-3 px-4 py-3 rounded-lg border", config.className, className)}>
      <Icon className="h-5 w-5 shrink-0" />
      <span className="font-medium">{label}</span>
    </div>
  )
}
