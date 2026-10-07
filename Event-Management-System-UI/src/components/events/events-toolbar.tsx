import { Download, MoreHorizontal, Search } from "lucide-react"
import { toast } from "sonner"
import { useApp } from "@/context/app-context"
import { downloadCsv, eventsToCsv } from "@/lib/events-query"
import { EVENT_STATUSES, type DateFilter, type SortField, type SortState } from "@/types/event"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const DATE_OPTIONS: { value: DateFilter; label: string }[] = [
  { value: "all", label: "Date" },
  { value: "this-month", label: "This month" },
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
]

const SORT_OPTIONS: { label: string; sort: SortState }[] = [
  { label: "Most Recent", sort: { field: "date", direction: "desc" } },
  { label: "Oldest", sort: { field: "date", direction: "asc" } },
  { label: "Event name A-Z", sort: { field: "name", direction: "asc" } },
  { label: "Event name Z-A", sort: { field: "name", direction: "desc" } },
  { label: "Category", sort: { field: "category", direction: "asc" } },
  { label: "Status", sort: { field: "status", direction: "asc" } },
  { label: "Location", sort: { field: "location", direction: "asc" } },
]

function sortLabel(sort: SortState) {
  return (
    SORT_OPTIONS.find(
      (option) =>
        option.sort.field === sort.field && option.sort.direction === sort.direction
    )?.label ?? "Most Recent"
  )
}

export function EventsToolbar() {
  const {
    filters,
    setFilters,
    sort,
    setSort,
    resetFilters,
    pipeline,
    categories,
    locations,
    setCreateOpen,
  } = useApp()

  const exportCsv = () => {
    downloadCsv("events.csv", eventsToCsv(pipeline.sorted))
    toast.success("Export ready", {
      description: `${pipeline.sorted.length} events exported as CSV.`,
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="relative w-full sm:w-[180px]">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={filters.search}
              onChange={(event) => setFilters({ search: event.target.value })}
              placeholder="Search..."
              aria-label="Search events"
              className="h-8 bg-background pl-8 text-xs"
            />
          </div>
          <Select
            value={filters.date}
            onValueChange={(value) => {
              if (value) setFilters({ date: value as DateFilter })
            }}
          >
            <SelectTrigger size="sm" className="h-8 w-full min-w-[92px] text-xs sm:w-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DATE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.status}
            onValueChange={(value) => {
              if (value) setFilters({ status: value as typeof filters.status })
            }}
          >
            <SelectTrigger size="sm" className="h-8 w-full min-w-[92px] text-xs sm:w-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Status</SelectItem>
              {EVENT_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.category}
            onValueChange={(value) => {
              if (value) setFilters({ category: value })
            }}
          >
            <SelectTrigger size="sm" className="h-8 w-full min-w-[92px] text-xs sm:w-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Name</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.location}
            onValueChange={(value) => {
              if (value) setFilters({ location: value })
            }}
          >
            <SelectTrigger size="sm" className="h-8 w-full min-w-[110px] text-xs sm:w-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Location</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs whitespace-nowrap text-muted-foreground">
            Displaying {pipeline.total} results
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>Sort:</span>
            <Select
              value={`${sort.field}:${sort.direction}`}
              onValueChange={(value) => {
                if (!value) return
                const [field, direction] = value.split(":") as [SortField, SortState["direction"]]
                setSort({ field, direction })
              }}
            >
              <SelectTrigger size="sm" className="h-8 min-w-[130px] text-xs">
                <SelectValue placeholder={sortLabel(sort)} />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.label}
                    value={`${option.sort.field}:${option.sort.direction}`}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" size="icon-sm" className="size-8" />}
            >
              <MoreHorizontal className="size-4" />
              <span className="sr-only">More options</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setCreateOpen(true)}>
                Create event
              </DropdownMenuItem>
              <DropdownMenuItem onClick={resetFilters}>Reset filters</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={exportCsv}>Export CSV</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" className="h-8 text-xs" onClick={exportCsv}>
            <Download className="size-3.5" />
            Export
          </Button>
        </div>
      </div>
    </div>
  )
}
