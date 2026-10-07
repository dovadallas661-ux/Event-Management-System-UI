import { Link } from "react-router"
import { useApp } from "@/context/app-context"
import { formatNumber } from "@/lib/format"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { NewsCard } from "@/components/dashboard/news-card"
import { RegistrationsChart } from "@/components/dashboard/registrations-chart"
import { EventsHistory } from "@/components/events/events-history"
import { ErrorState } from "@/components/shared/feedback"
import { DashboardSkeleton } from "@/components/shared/skeletons"
import { Button } from "@/components/ui/button"

export function DashboardPage() {
  const { loading, error, reload, kpis, monthly, news, liveMetrics, setCreateOpen } = useApp()

  if (loading) return <DashboardSkeleton />
  if (error) {
    return <ErrorState title="Unable to load dashboard" description={error} onRetry={reload} />
  }

  return (
    <div className="mx-auto flex max-w-[1180px] flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-[22px] font-medium tracking-tight text-foreground">
          Welcome! here’s your summary
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" nativeButton={false} render={<Link to="/analytics" />}>
            Analytics
          </Button>
          <Button variant="outline" size="sm" nativeButton={false} render={<Link to="/calendar" />}>
            Calendar
          </Button>
          <Button size="sm" onClick={() => setCreateOpen(true)}>
            Create event
          </Button>
        </div>
      </div>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Key metrics">
        {kpis.map((metric) => (
          <KpiCard key={metric.id} metric={metric} />
        ))}
      </section>
      <section
        className="grid gap-2 rounded-xl border border-border bg-[#FAF8FF] px-4 py-2.5 text-xs text-muted-foreground sm:grid-cols-3"
        aria-label="Program operations"
      >
        <p>
          Active events{" "}
          <span className="font-medium text-foreground">{formatNumber(liveMetrics.activeEvents)}</span>
        </p>
        <p>
          Check-ins{" "}
          <span className="font-medium text-foreground">{formatNumber(liveMetrics.checkIns)}</span>
        </p>
        <p>
          Ticket revenue{" "}
          <span className="font-medium text-foreground">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(liveMetrics.ticketRevenue)}
          </span>
        </p>
      </section>
      <div className="grid gap-4 lg:grid-cols-[1.28fr_1fr] lg:items-stretch">
        <RegistrationsChart data={monthly} />
        <NewsCard items={news} />
      </div>
      <EventsHistory />
    </div>
  )
}
