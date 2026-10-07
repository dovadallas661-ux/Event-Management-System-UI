export const EVENT_STATUSES = [
  "Completed",
  "In Progress",
  "Upcoming",
  "Cancelled",
] as const

export type EventStatus = (typeof EVENT_STATUSES)[number]

export type EventCategory =
  | "Technology"
  | "Healthcare"
  | "Finance"
  | "Energy"
  | "Workshops"
  | "Networking"
  | "Education"

export type EventRecord = {
  id: string
  name: string
  date: string
  time: string
  category: string
  location: string
  speaker: string
  status: EventStatus
  registrations: number
  checkIns: number
  revenue: number
  capacity: number
  ticketPrice: number
  description: string
  image: string
}

export type EventDraft = {
  name: string
  category: string
  date: string
  time: string
  location: string
  speaker: string
  description: string
  capacity: string
  ticketPrice: string
}

export type SortField =
  | "date"
  | "name"
  | "category"
  | "status"
  | "location"
  | "speaker"

export type SortDirection = "asc" | "desc"

export type DateFilter = "all" | "upcoming" | "past" | "this-month"

export type EventFilters = {
  search: string
  date: DateFilter
  status: "all" | EventStatus
  category: "all" | string
  location: "all" | string
}

export type SortState = {
  field: SortField
  direction: SortDirection
}

export type KpiMetric = {
  id: string
  label: string
  value: number
  change: number
  format: "number" | "currency"
}

export type MonthlyPoint = {
  month: string
  registrations: number
  revenue: number
  checkIns: number
}

export type NewsItem = {
  id: string
  title: string
  excerpt: string
  image: string
  eventId?: string
}
