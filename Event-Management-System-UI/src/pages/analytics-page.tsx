import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { ReactNode } from "react"
import { useApp } from "@/context/app-context"
import { formatCurrency, formatNumber } from "@/lib/format"
import { DashboardSkeleton } from "@/components/shared/skeletons"
import { ErrorState } from "@/components/shared/feedback"
import { EVENT_STATUSES } from "@/types/event"

const COLORS = ["#8576F5", "#34C759", "#5B8DEF", "#F59E0B", "#F43F5E", "#14B8A6", "#8B5CF6"]

export function AnalyticsPage() {
  const { loading, error, reload, monthly, events, liveMetrics } = useApp()

  if (loading) return <DashboardSkeleton />
  if (error) {
    return <ErrorState title="Unable to load analytics" description={error} onRetry={reload} />
  }

  const statusData = EVENT_STATUSES.map((status) => ({
    name: status,
    value: events.filter((event) => event.status === status).length,
  })).filter((item) => item.value > 0)

  const categoryData = Object.values(
    events.reduce<Record<string, { name: string; events: number; registrations: number; revenue: number }>>(
      (acc, event) => {
        acc[event.category] ??= {
          name: event.category,
          events: 0,
          registrations: 0,
          revenue: 0,
        }
        acc[event.category].events += 1
        acc[event.category].registrations += event.registrations
        acc[event.category].revenue += event.revenue
        return acc
      },
      {}
    )
  )

  const topEvents = [...events]
    .sort((a, b) => b.registrations - a.registrations)
    .slice(0, 8)
    .map((event) => ({
      name: event.name.length > 18 ? `${event.name.slice(0, 18)}…` : event.name,
      registrations: event.registrations,
      checkIns: event.checkIns,
    }))

  return (
    <div className="mx-auto flex max-w-[1180px] flex-col gap-5">
      <div>
        <h1 className="text-[22px] font-medium tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Trends and comparisons from the live event dataset.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Summary label="Active events" value={formatNumber(liveMetrics.activeEvents)} />
        <Summary label="Check-ins" value={formatNumber(liveMetrics.checkIns)} />
        <Summary label="Ticket revenue" value={formatCurrency(liveMetrics.ticketRevenue)} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Registration trend">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthly}>
              <CartesianGrid vertical={false} stroke="#E9E4F2" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="registrations" stroke="#8576F5" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Revenue trend">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthly}>
              <CartesianGrid vertical={false} stroke="#E9E4F2" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value) => formatCurrency(Number(value ?? 0))} />
              <Line type="monotone" dataKey="revenue" stroke="#5B8DEF" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Check-in trend">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthly} barCategoryGap="28%">
              <CartesianGrid vertical={false} stroke="#E9E4F2" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="checkIns" fill="#34C759" radius={[3, 3, 0, 0]} maxBarSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Status distribution">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
                {statusData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Event performance comparison">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topEvents} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid horizontal={false} stroke="#E9E4F2" />
              <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={110} tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="registrations" fill="#8576F5" radius={[0, 3, 3, 0]} barSize={10} />
              <Bar dataKey="checkIns" fill="#5B8DEF" radius={[0, 3, 3, 0]} barSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Category distribution">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={categoryData}>
              <CartesianGrid vertical={false} stroke="#E9E4F2" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="events" fill="#8576F5" radius={[3, 3, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  )
}

function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-4">
      <h2 className="mb-3 text-sm font-medium">{title}</h2>
      {children}
    </section>
  )
}
