import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { useNavigate } from "react-router"
import { useApp } from "@/context/app-context"
import { EventsPagination } from "@/components/events/events-pagination"
import { EventsToolbar } from "@/components/events/events-toolbar"
import { StatusPill } from "@/components/events/status-pill"
import { Button } from "@/components/ui/button"
import { cn } from "cn"
import type { EventRecord } from "@/types/event"

export function EventsHistory() {
  const { pipeline, resetFilters, setPage, rowsPerPage, setRowsPerPage } = useApp()

  return (
    <section className="rounded-xl border border-border bg-card p-4 shadow-[0_1px_2px_rgba(28,15,51,0.04)]">
      <h2 className="mb-4 text-[16px] font-medium">Events History</h2>
      <EventsToolbar />
      {pipeline.items.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm font-medium">No events found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different search or reset your filters.
          </p>
          <Button variant="outline" size="sm" className="mt-3" onClick={resetFilters}>
            Reset filters
          </Button>
        </div>
      ) : (
        <EventsTable events={pipeline.items} />
      )}
      <div className="mt-4 border-t border-border pt-4">
        <EventsPagination
          page={pipeline.currentPage}
          totalPages={pipeline.totalPages}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsChange={setRowsPerPage}
        />
      </div>
    </section>
  )
}

export function EventsTable({ events }: { events: EventRecord[] }) {
  return (
    <>
      <div className="hidden md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#F8F7FB] text-[12px] text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Event Name</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Speaker</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <DesktopRow key={event.id} event={event} />
            ))}
          </tbody>
        </table>
      </div>
      <ul className="divide-y divide-border md:hidden">
        {events.map((event) => (
          <MobileRow key={event.id} event={event} />
        ))}
      </ul>
    </>
  )
}

function DesktopRow({ event }: { event: EventRecord }) {
  const navigate = useNavigate()
  return (
    <tr
      className="cursor-pointer border-b border-border last:border-0 hover:bg-[#FAF8FF]"
      tabIndex={0}
      onClick={() => navigate(`/events/${event.id}`)}
      onKeyDown={(keyboardEvent) => {
        if (keyboardEvent.key === "Enter") navigate(`/events/${event.id}`)
      }}
    >
      <td className="px-4 py-3.5 text-[13px] font-medium text-foreground">{event.name}</td>
      <td className="px-4 py-3.5 text-[13px] text-muted-foreground">{event.date}</td>
      <td className="px-4 py-3.5 text-[13px] text-muted-foreground">{event.speaker}</td>
      <td className="px-4 py-3.5">
        <StatusPill status={event.status} />
      </td>
    </tr>
  )
}

function MobileRow({ event }: { event: EventRecord }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <li>
      <div className="flex items-center gap-2 py-3">
        <Button
          variant="ghost"
          size="icon-xs"
          className="size-8 shrink-0"
          aria-expanded={open}
          aria-controls={`${event.id}-details`}
          onClick={() => setOpen((value) => !value)}
        >
          <ChevronRight className={cn("size-4 transition-transform", open && "rotate-90")} />
          <span className="sr-only">
            {open ? "Collapse" : "Expand"} {event.name}
          </span>
        </Button>
        <button
          type="button"
          className="min-w-0 flex-1 text-left"
          onClick={() => navigate(`/events/${event.id}`)}
        >
          <p className="truncate text-[13px] font-medium">{event.name}</p>
        </button>
        <StatusPill status={event.status} />
      </div>
      {open ? (
        <div
          id={`${event.id}-details`}
          className="grid gap-1 pb-3 pl-10 text-xs text-muted-foreground"
        >
          <p>Date: {event.date}</p>
          <p>Speaker: {event.speaker}</p>
          <p>Location: {event.location}</p>
          <p>Category: {event.category}</p>
        </div>
      ) : null}
    </li>
  )
}
