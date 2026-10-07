import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { formatNumber } from "@/lib/format"
import type { MonthlyPoint } from "@/types/event"

export function RegistrationsChart({ data }: { data: MonthlyPoint[] }) {
  return (
    <section className="rounded-xl border border-border bg-card p-4 shadow-[0_1px_2px_rgba(28,15,51,0.04)]">
      <h2 className="mb-3 text-[15px] font-medium text-foreground">
        Event Registrations per month
      </h2>
      <div className="h-[230px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="28%" margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#E9E4F2" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#9A93A8", fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#9A93A8", fontSize: 11 }}
              ticks={[0, 200, 400, 600, 800, 1000]}
              domain={[0, 1000]}
            />
            <Tooltip
              cursor={{ fill: "rgba(133,118,247,0.08)" }}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #E9E4F2",
                fontSize: 12,
              }}
              formatter={(value) => [formatNumber(Number(value ?? 0)), "Registrations"]}
            />
            <Bar
              dataKey="registrations"
              fill="#8576F5"
              radius={[3, 3, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
