import { Link } from "react-router"
import { useMemo } from "react"
import { useApp } from "@/context/app-context"
import { EventsSkeleton } from "@/components/shared/skeletons"
import { ErrorState } from "@/components/shared/feedback"

export function SpeakersPage() {
  const { events, loading, error, reload } = useApp()
  const speakers = useMemo(() => {
    const map = new Map<
      string,
      { name: string; events: number; registrations: number; latest: string }
    >()
    for (const event of events) {
      const current = map.get(event.speaker) ?? {
        name: event.speaker,
        events: 0,
        registrations: 0,
        latest: event.date,
      }
      current.events += 1
      current.registrations += event.registrations
      if (event.date > current.latest) current.latest = event.date
      map.set(event.speaker, current)
    }
    return [...map.values()].sort((a, b) => a.name.localeCompare(b.name))
  }, [events])

  if (loading) return <EventsSkeleton />
  if (error) {
    return <ErrorState title="Unable to load speakers" description={error} onRetry={reload} />
  }

  return (
    <div className="mx-auto max-w-[1180px]">
      <h1 className="text-[22px] font-medium tracking-tight">Speakers</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        Speakers derived from the shared event dataset.
      </p>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="hidden w-full text-left text-sm md:table">
          <thead className="bg-[#F8F7FB] text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Speaker</th>
              <th className="px-4 py-3 font-medium">Events</th>
              <th className="px-4 py-3 font-medium">Registrations</th>
              <th className="px-4 py-3 font-medium">Latest event</th>
            </tr>
          </thead>
          <tbody>
            {speakers.map((speaker) => (
              <tr key={speaker.name} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{speaker.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{speaker.events}</td>
                <td className="px-4 py-3 text-muted-foreground">{speaker.registrations}</td>
                <td className="px-4 py-3 text-muted-foreground">{speaker.latest}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul className="divide-y divide-border md:hidden">
          {speakers.map((speaker) => (
            <li key={speaker.name} className="px-4 py-3">
              <p className="text-sm font-medium">{speaker.name}</p>
              <p className="text-xs text-muted-foreground">
                {speaker.events} events · {speaker.registrations} registrations
              </p>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-sm">
        <Link to="/events" className="text-primary underline-offset-4 hover:underline">
          Browse all events
        </Link>
      </p>
    </div>
  )
}
