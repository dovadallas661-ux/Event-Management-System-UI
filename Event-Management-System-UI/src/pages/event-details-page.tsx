import { Link, useNavigate, useParams } from "react-router"
import { useApp } from "@/context/app-context"
import { occupancy } from "@/lib/events-query"
import { formatCurrency, formatNumber, formatTime } from "@/lib/format"
import { StatusPill } from "@/components/events/status-pill"
import { ErrorState } from "@/components/shared/feedback"
import { EventsSkeleton } from "@/components/shared/skeletons"
import { Button } from "@/components/ui/button"

export function EventDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { loading, getEvent } = useApp()
  const event = id ? getEvent(id) : undefined

  if (loading) return <EventsSkeleton />
  if (!event) {
    return (
      <ErrorState
        title="Event not found"
        description="This event is not in the current dataset."
        onRetry={() => void navigate("/events")}
      />
    )
  }

  const checkInRate = event.registrations
    ? Math.round((event.checkIns / event.registrations) * 100)
    : 0

  return (
    <div className="mx-auto max-w-[1180px]">
      <Button variant="ghost" size="sm" className="mb-4 px-0" nativeButton={false} render={<Link to="/events" />}>
        Back to events
      </Button>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="relative h-48 sm:h-56">
          <img src={event.image} alt="" className="size-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="mb-2">
              <StatusPill status={event.status} />
            </div>
            <h1 className="text-xl font-semibold sm:text-2xl">{event.name}</h1>
          </div>
        </div>
        <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm leading-6 text-muted-foreground">{event.description}</p>
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <Item label="Date" value={event.date} />
              <Item label="Time" value={formatTime(event.time)} />
              <Item label="Location" value={event.location} />
              <Item label="Category" value={event.category} />
              <Item label="Speaker" value={event.speaker} />
              <Item label="Ticket price" value={formatCurrency(event.ticketPrice)} />
            </dl>
          </div>
          <div className="grid gap-3">
            <Metric label="Capacity" value={formatNumber(event.capacity)} />
            <Metric label="Registrations" value={formatNumber(event.registrations)} />
            <Metric label="Check-ins" value={`${formatNumber(event.checkIns)} (${checkInRate}%)`} />
            <Metric label="Revenue" value={formatCurrency(event.revenue)} />
            <Metric label="Occupancy" value={`${occupancy(event)}%`} />
            <Button nativeButton={false} render={<Link to="/analytics" />}>
              View program analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border px-3 py-2.5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  )
}
