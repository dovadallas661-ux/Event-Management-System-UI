import analyticsData from "@/data/analytics.json"
import eventsData from "@/data/events.json"
import newsData from "@/data/news.json"
import type {
  EventDraft,
  EventRecord,
  EventStatus,
  KpiMetric,
  MonthlyPoint,
  NewsItem,
} from "@/types/event"

const DELAY_MS = 650

function wait(ms = DELAY_MS) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export async function fetchEvents(): Promise<EventRecord[]> {
  await wait()
  return (eventsData as EventRecord[]).map((event) => ({ ...event }))
}

export async function fetchAnalytics(): Promise<{
  kpis: KpiMetric[]
  registrationsByMonth: MonthlyPoint[]
}> {
  await wait(400)
  return {
    kpis: analyticsData.kpis as KpiMetric[],
    registrationsByMonth: analyticsData.registrationsByMonth as MonthlyPoint[],
  }
}

export async function fetchNews(): Promise<NewsItem[]> {
  await wait(350)
  return newsData as NewsItem[]
}

export function createEventFromDraft(draft: EventDraft): EventRecord {
  const capacity = Number(draft.capacity)
  const ticketPrice = Number(draft.ticketPrice)
  const date = new Date(`${draft.date}T00:00:00`)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  let status: EventStatus = "Upcoming"
  if (date < today) status = "Completed"

  return {
    id: `evt-${crypto.randomUUID().slice(0, 8)}`,
    name: draft.name.trim(),
    date: draft.date,
    time: draft.time,
    category: draft.category,
    location: draft.location.trim(),
    speaker: draft.speaker.trim(),
    status,
    registrations: 0,
    checkIns: 0,
    revenue: 0,
    capacity,
    ticketPrice,
    description: draft.description.trim(),
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
  }
}

export function validateEventDraft(draft: EventDraft) {
  const errors: Partial<Record<keyof EventDraft, string>> = {}
  if (!draft.name.trim()) errors.name = "Event name is required."
  if (!draft.category) errors.category = "Category is required."
  if (!draft.date) errors.date = "Date is required."
  if (!draft.time) errors.time = "Time is required."
  if (!draft.location.trim()) errors.location = "Location is required."
  if (!draft.speaker.trim()) errors.speaker = "Speaker is required."
  if (!draft.description.trim()) errors.description = "Description is required."
  const capacity = Number(draft.capacity)
  if (!draft.capacity || Number.isNaN(capacity) || capacity < 1) {
    errors.capacity = "Capacity must be at least 1."
  }
  const ticketPrice = Number(draft.ticketPrice)
  if (draft.ticketPrice === "" || Number.isNaN(ticketPrice) || ticketPrice < 0) {
    errors.ticketPrice = "Ticket price must be 0 or more."
  }
  return errors
}
