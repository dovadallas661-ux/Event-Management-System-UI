import { Link } from "react-router"
import { useApp } from "@/context/app-context"
import { EventsSkeleton } from "@/components/shared/skeletons"

const NOTES = [
  {
    title: "Check-in spike on Blockchain Revolution Conference",
    body: "In-progress sessions have passed 400 check-ins. Review staffing for the afternoon track.",
    time: "12 min ago",
  },
  {
    title: "TechForward Summit reminder",
    body: "Latest news card is promoting the Lagos summit. Confirm speaker logistics.",
    time: "1 hr ago",
  },
  {
    title: "Export completed",
    body: "CSV exports now include the currently filtered event dataset.",
    time: "Yesterday",
  },
]

export function NotificationsPage() {
  const { loading } = useApp()
  if (loading) return <EventsSkeleton />

  return (
    <div className="mx-auto max-w-[720px]">
      <h1 className="text-[22px] font-medium tracking-tight">Notifications</h1>
      <p className="mb-4 text-sm text-muted-foreground">Program alerts for this workspace.</p>
      <ul className="space-y-3">
        {NOTES.map((note) => (
          <li key={note.title} className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm font-medium">{note.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{note.body}</p>
            <p className="mt-2 text-xs text-muted-foreground">{note.time}</p>
          </li>
        ))}
      </ul>
      <Link to="/" className="mt-4 inline-block text-sm text-primary underline-offset-4 hover:underline">
        Back to dashboard
      </Link>
    </div>
  )
}
