import { Info } from "lucide-react"
import { formatCurrency, formatNumber, formatPercent } from "@/lib/format"
import type { KpiMetric } from "@/types/event"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const DESCRIPTIONS: Record<string, string> = {
  totalEvents: "All events tracked across the program.",
  activeSpeakers: "Speakers currently assigned to live or upcoming events.",
  totalRegistrations: "Confirmed registrations across published events.",
  totalRevenue: "Ticket revenue collected to date.",
}

export function KpiCard({ metric }: { metric: KpiMetric }) {
  const positive = metric.change >= 0
  const value =
    metric.format === "currency"
      ? formatCurrency(metric.value)
      : formatNumber(metric.value)

  return (
    <article className="rounded-xl border border-border bg-card px-4 py-3.5 shadow-[0_1px_2px_rgba(28,15,51,0.04)]">
      <div className="mb-3 flex items-center gap-1.5 text-[13px] text-muted-foreground">
        <span>{metric.label}</span>
        <Tooltip>
          <TooltipTrigger
            className="inline-flex size-4 items-center justify-center text-muted-foreground/80"
            aria-label={`About ${metric.label}`}
          >
            <Info className="size-3.5" />
          </TooltipTrigger>
          <TooltipContent>
            {DESCRIPTIONS[metric.id] ?? metric.label}
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex flex-wrap items-baseline gap-2">
        <p className="text-[22px] leading-none font-semibold tracking-tight text-foreground">
          {value}
        </p>
        <p
          className={
            positive
              ? "text-[12px] font-medium text-emerald-600"
              : "text-[12px] font-medium text-red-500"
          }
        >
          <span aria-hidden="true">{positive ? "↗" : "↘"} </span>
          {formatPercent(metric.change)}
        </p>
      </div>
    </article>
  )
}
