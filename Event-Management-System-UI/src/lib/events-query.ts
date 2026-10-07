import type {
  EventFilters,
  EventRecord,
  SortState,
} from "@/types/event"

export const DEFAULT_FILTERS: EventFilters = {
  search: "",
  date: "all",
  status: "all",
  category: "all",
  location: "all",
}

export const DEFAULT_SORT: SortState = {
  field: "date",
  direction: "desc",
}

function matchesDateFilter(event: EventRecord, filter: EventFilters["date"]) {
  if (filter === "all") return true
  const eventDate = new Date(`${event.date}T00:00:00`)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (filter === "upcoming") return eventDate >= today
  if (filter === "past") return eventDate < today
  return (
    eventDate.getMonth() === today.getMonth() &&
    eventDate.getFullYear() === today.getFullYear()
  )
}

export function searchEvents(events: EventRecord[], query: string) {
  const needle = query.trim().toLowerCase()
  if (!needle) return events
  return events.filter((event) =>
    [event.name, event.speaker, event.category, event.location]
      .join(" ")
      .toLowerCase()
      .includes(needle)
  )
}

export function filterEvents(events: EventRecord[], filters: EventFilters) {
  return events.filter((event) => {
    if (!matchesDateFilter(event, filters.date)) return false
    if (filters.status !== "all" && event.status !== filters.status) return false
    if (filters.category !== "all" && event.category !== filters.category) {
      return false
    }
    if (filters.location !== "all" && event.location !== filters.location) {
      return false
    }
    return true
  })
}

export function sortEvents(events: EventRecord[], sort: SortState) {
  const sorted = [...events]
  sorted.sort((a, b) => {
    const left = a[sort.field]
    const right = b[sort.field]
    const comparison = String(left).localeCompare(String(right), undefined, {
      numeric: true,
      sensitivity: "base",
    })
    return sort.direction === "asc" ? comparison : -comparison
  })
  return sorted
}

export function paginateEvents(
  events: EventRecord[],
  page: number,
  rowsPerPage: number
) {
  const totalPages = Math.max(1, Math.ceil(events.length / rowsPerPage))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * rowsPerPage
  return {
    items: events.slice(start, start + rowsPerPage),
    totalPages,
    currentPage,
    total: events.length,
  }
}

export function deriveEventPipeline(
  events: EventRecord[],
  filters: EventFilters,
  sort: SortState,
  page: number,
  rowsPerPage: number
) {
  const searched = searchEvents(events, filters.search)
  const filtered = filterEvents(searched, filters)
  const sorted = sortEvents(filtered, sort)
  const paginated = paginateEvents(sorted, page, rowsPerPage)
  return { filtered, sorted, ...paginated }
}

export function uniqueValues(events: EventRecord[], key: keyof EventRecord) {
  return [...new Set(events.map((event) => String(event[key])))].sort()
}

export function deriveLiveMetrics(events: EventRecord[]) {
  return {
    activeEvents: events.filter(
      (event) => event.status === "In Progress" || event.status === "Upcoming"
    ).length,
    checkIns: events.reduce((sum, event) => sum + event.checkIns, 0),
    ticketRevenue: events.reduce((sum, event) => sum + event.revenue, 0),
    registrations: events.reduce((sum, event) => sum + event.registrations, 0),
  }
}

export function eventsToCsv(events: EventRecord[]) {
  const headers = [
    "id",
    "name",
    "date",
    "time",
    "category",
    "location",
    "speaker",
    "status",
    "registrations",
    "checkIns",
    "revenue",
    "capacity",
    "ticketPrice",
    "description",
  ]
  const rows = events.map((event) =>
    headers
      .map((header) => {
        const value = event[header as keyof EventRecord]
        const text = String(value ?? "")
        return `"${text.replaceAll('"', '""')}"`
      })
      .join(",")
  )
  return [headers.join(","), ...rows].join("\n")
}

export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.append(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export function occupancy(event: EventRecord) {
  if (!event.capacity) return 0
  return Math.round((event.registrations / event.capacity) * 100)
}
