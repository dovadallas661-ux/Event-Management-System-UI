import { Link } from "react-router"
import { useApp } from "@/context/app-context"
import { EventsHistory } from "@/components/events/events-history"
import { ErrorState } from "@/components/shared/feedback"
import { EventsSkeleton } from "@/components/shared/skeletons"
import { Button } from "@/components/ui/button"

export function EventsPage() {
  const { loading, error, reload, setCreateOpen } = useApp()

  if (loading) return <EventsSkeleton />
  if (error) {
    return <ErrorState title="Unable to load events" description={error} onRetry={reload} />
  }

  return (
    <div className="mx-auto flex max-w-[1180px] flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-medium tracking-tight">Events</h1>
          <p className="text-sm text-muted-foreground">
            Search, filter, and manage the same program dataset used on the dashboard.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" nativeButton={false} render={<Link to="/calendar" />}>
            Calendar
          </Button>
          <Button size="sm" onClick={() => setCreateOpen(true)}>
            Create event
          </Button>
        </div>
      </div>
      <EventsHistory />
    </div>
  )
}
