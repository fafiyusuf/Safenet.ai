import { cn } from "@/lib/utils"

interface SeverityMeterProps {
  value: number
  className?: string
}

export function SeverityMeter({ value, className }: SeverityMeterProps) {
  const getColor = (val: number) => {
    if (val >= 75) return "bg-destructive"
    if (val >= 40) return "bg-warning"
    return "bg-success"
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Severity</span>
        <span className="font-medium">{value}/100</span>
      </div>
      <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", getColor(value))}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
