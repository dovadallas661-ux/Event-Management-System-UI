import { useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { useApp } from "@/context/app-context"
import { StatusPill } from "@/components/events/status-pill"
import { Calendar } from "@/components/ui/calendar"
import { EventsSkeleton } from "@/components/shared/skeletons"
import { ErrorState } from "@/components/shared/feedback"
import { Button } from "@/components/ui/button"

function toKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function CalendarPage() {
  const { events, loading, error, reload } = useApp()
  const navigate = useNavigate()
  const [month, setMonth] = useState(new Date(2024, 9, 1))
  const [selected, setSelected] = useState<Date | undefined>(new Date(2024, 9, 15))

  const eventsByDate = useMemo(() => {
    const map = new Map<string, typeof events>()
    for (const event of events) {
      const list = map.get(event.date) ?? []
      list.push(event)
      map.set(event.date, list)
    }
    return map
  }, [events])

  const eventDays = useMemo(
    () => [...eventsByDate.keys()].map((key) => new Date(`${key}T00:00:00`)),
    [eventsByDate]
  )

  const selectedKey = selected ? toKey(selected) : ""
  const dayEvents = eventsByDate.get(selectedKey) ?? []

  if (loading) return <EventsSkeleton />
  if (error) {
    return <ErrorState title="Unable to load calendar" description={error} onRetry={reload} />
  }

  return (
    <div className="mx-auto grid max-w-[1180px] gap-5 lg:grid-cols-[auto_1fr]">
      <div>
        <h1 className="mb-1 text-[22px] font-medium tracking-tight">Calendar</h1>
        <p className="mb-4 text-sm text-muted-foreground">
          Dates with events are marked. Select a day to open details.
        </p>
        <div className="rounded-xl border border-border bg-card p-3">
          <Calendar
            mode="single"
            month={month}
            onMonthChange={setMonth}
            selected={selected}
            onSelect={setSelected}
            modifiers={{ event: eventDays }}
            modifiersClassNames={{
              event: "after:absolute after:bottom-1 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-[#8576F5]",
            }}
          />
        </div>
      </div>
      <section className="rounded-xl border border-border bg-card p-4">
        <h2 className="text-sm font-medium">
          {selected
            ? selected.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "Select a date"}
        </h2>
        {dayEvents.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">No events on this date.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {dayEvents.map((event) => (
              <li key={event.id} className="rounded-lg border border-border p-3">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <p className="text-sm font-medium">{event.name}</p>
                  <StatusPill status={event.status} />
                </div>
                <p className="text-xs text-muted-foreground">
                  {event.time} · {event.location} · {event.speaker}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => void navigate(`/events/${event.id}`)}
                >
                  Open details
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
