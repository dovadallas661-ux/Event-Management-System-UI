import { cn } from "cn"
import type { EventStatus } from "@/types/event"

const STYLES: Record<EventStatus, string> = {
  Completed: "bg-emerald-50 text-emerald-600",
  "In Progress": "bg-indigo-50 text-indigo-500",
  Upcoming: "bg-amber-50 text-amber-600",
  Cancelled: "bg-rose-50 text-rose-600",
}

export function StatusPill({ status }: { status: EventStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
        STYLES[status]
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  )
}
