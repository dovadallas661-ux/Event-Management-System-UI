import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-5" aria-hidden="true">
      <Skeleton className="h-7 w-64" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <KpiSkeleton key={index} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <ChartSkeleton />
        <Skeleton className="h-[260px] w-full rounded-xl" />
      </div>
      <EventsSkeleton />
    </div>
  )
}

export function KpiSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <Skeleton className="mb-4 h-3 w-24" />
      <Skeleton className="h-7 w-28" />
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <Skeleton className="mb-6 h-4 w-48" />
      <Skeleton className="h-[200px] w-full" />
    </div>
  )
}

export function EventsSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <Skeleton className="mb-4 h-5 w-36" />
      <div className="mb-4 flex flex-col gap-2 md:flex-row">
        <Skeleton className="h-9 w-full md:w-48" />
        <Skeleton className="h-9 w-full md:w-24" />
        <Skeleton className="h-9 w-full md:w-24" />
      </div>
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="mb-2 h-10 w-full" />
      ))}
    </div>
  )
}
