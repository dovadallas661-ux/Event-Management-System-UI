import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { toast } from "sonner"
import {
  createEventFromDraft,
  fetchAnalytics,
  fetchEvents,
  fetchNews,
  validateEventDraft,
} from "@/lib/api"
import {
  DEFAULT_FILTERS,
  DEFAULT_SORT,
  deriveEventPipeline,
  deriveLiveMetrics,
  uniqueValues,
} from "@/lib/events-query"
import type {
  EventDraft,
  EventFilters,
  EventRecord,
  KpiMetric,
  MonthlyPoint,
  NewsItem,
  SortState,
} from "@/types/event"

type AppContextValue = {
  events: EventRecord[]
  kpis: KpiMetric[]
  monthly: MonthlyPoint[]
  news: NewsItem[]
  loading: boolean
  error: string | null
  filters: EventFilters
  sort: SortState
  page: number
  rowsPerPage: number
  sidebarCollapsed: boolean
  mobileNavOpen: boolean
  createOpen: boolean
  pipeline: ReturnType<typeof deriveEventPipeline>
  liveMetrics: ReturnType<typeof deriveLiveMetrics>
  categories: string[]
  locations: string[]
  setFilters: (next: Partial<EventFilters>) => void
  resetFilters: () => void
  setSort: (next: SortState) => void
  setPage: (page: number) => void
  setRowsPerPage: (rows: number) => void
  setSidebarCollapsed: (value: boolean) => void
  setMobileNavOpen: (value: boolean) => void
  setCreateOpen: (value: boolean) => void
  getEvent: (id: string) => EventRecord | undefined
  createEvent: (draft: EventDraft) => { ok: boolean; errors?: ReturnType<typeof validateEventDraft> }
  reload: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<EventRecord[]>([])
  const [kpis, setKpis] = useState<KpiMetric[]>([])
  const [monthly, setMonthly] = useState<MonthlyPoint[]>([])
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFiltersState] = useState<EventFilters>(DEFAULT_FILTERS)
  const [sort, setSort] = useState<SortState>(DEFAULT_SORT)
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPageState] = useState(10)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    void Promise.all([fetchEvents(), fetchAnalytics(), fetchNews()])
      .then(([nextEvents, analytics, nextNews]) => {
        if (cancelled) return
        setEvents(nextEvents)
        setKpis(analytics.kpis)
        setMonthly(analytics.registrationsByMonth)
        setNews(nextNews)
      })
      .catch(() => {
        if (!cancelled) setError("Unable to load dashboard data.")
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [reloadKey])

  const setFilters = useCallback((next: Partial<EventFilters>) => {
    setFiltersState((current) => ({ ...current, ...next }))
    setPage(1)
  }, [])

  const resetFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS)
    setSort(DEFAULT_SORT)
    setPage(1)
  }, [])

  const setRowsPerPage = useCallback((rows: number) => {
    setRowsPerPageState(rows)
    setPage(1)
  }, [])

  const pipeline = useMemo(
    () => deriveEventPipeline(events, filters, sort, page, rowsPerPage),
    [events, filters, sort, page, rowsPerPage]
  )

  const liveMetrics = useMemo(() => deriveLiveMetrics(events), [events])
  const categories = useMemo(() => uniqueValues(events, "category"), [events])
  const locations = useMemo(() => uniqueValues(events, "location"), [events])

  const getEvent = useCallback(
    (id: string) => events.find((event) => event.id === id),
    [events]
  )

  const createEvent = useCallback((draft: EventDraft) => {
    const errors = validateEventDraft(draft)
    if (Object.keys(errors).length > 0) return { ok: false, errors }
    const event = createEventFromDraft(draft)
    setEvents((current) => [event, ...current])
    setKpis((current) =>
      current.map((metric) => {
        if (metric.id === "totalEvents") {
          return { ...metric, value: metric.value + 1 }
        }
        if (metric.id === "activeSpeakers") {
          return { ...metric, value: metric.value + 1 }
        }
        return metric
      })
    )
    setCreateOpen(false)
    toast.success("Event created", {
      description: `${event.name} is now available across the dashboard.`,
    })
    return { ok: true }
  }, [])

  const value: AppContextValue = {
    events,
    kpis,
    monthly,
    news,
    loading,
    error,
    filters,
    sort,
    page,
    rowsPerPage,
    sidebarCollapsed,
    mobileNavOpen,
    createOpen,
    pipeline,
    liveMetrics,
    categories,
    locations,
    setFilters,
    resetFilters,
    setSort,
    setPage,
    setRowsPerPage,
    setSidebarCollapsed,
    setMobileNavOpen,
    setCreateOpen,
    getEvent,
    createEvent,
    reload: () => setReloadKey((key) => key + 1),
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useApp must be used within AppProvider")
  return context
}
