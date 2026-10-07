import { Link } from "react-router"
import { useApp } from "@/context/app-context"
import { formatCurrency, formatNumber } from "@/lib/format"
import { EventsSkeleton } from "@/components/shared/skeletons"
import { ErrorState } from "@/components/shared/feedback"
import { Button } from "@/components/ui/button"

export function ReportsPage() {
  const { events, liveMetrics, loading, error, reload } = useApp()

  if (loading) return <EventsSkeleton />
  if (error) {
    return <ErrorState title="Unable to load reports" description={error} onRetry={reload} />
  }

  const completed = events.filter((event) => event.status === "Completed").length
  const cancelled = events.filter((event) => event.status === "Cancelled").length

  return (
    <div className="mx-auto max-w-[1180px] space-y-4">
      <div>
        <h1 className="text-[22px] font-medium tracking-tight">Reports</h1>
        <p className="text-sm text-muted-foreground">
          Operational snapshots from the current event program.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card label="Catalogued events" value={formatNumber(events.length)} />
        <Card label="Completed" value={formatNumber(completed)} />
        <Card label="Cancelled" value={formatNumber(cancelled)} />
        <Card label="Check-ins" value={formatNumber(liveMetrics.checkIns)} />
      </div>
      <section className="rounded-xl border border-border bg-card p-4">
        <h2 className="text-sm font-medium">Program revenue</h2>
        <p className="mt-2 text-2xl font-semibold">{formatCurrency(liveMetrics.ticketRevenue)}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Ticket revenue across all events currently in the catalog.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" nativeButton={false} render={<Link to="/analytics" />}>
            Open analytics
          </Button>
          <Button variant="outline" size="sm" nativeButton={false} render={<Link to="/calendar" />}>
            Open calendar
          </Button>
        </div>
      </section>
    </div>
  )
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  )
}
