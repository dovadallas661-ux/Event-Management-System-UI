import { NavLink, useNavigate } from "react-router"
import { useTheme } from "next-themes"
import {
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  MessageSquare,
  PanelLeftClose,
  Settings,
  Sparkle,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "cn"

const NAV = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/events", label: "Events", icon: CalendarDays, end: false },
  { to: "/speakers", label: "Speakers", icon: Users, end: false },
  { to: "/reports", label: "Reports", icon: FileText, end: false },
  { to: "/notifications", label: "Notifications", icon: Bell, end: false, badge: 3 },
  { to: "/messages", label: "Messages", icon: MessageSquare, end: false },
  { to: "/settings", label: "Settings", icon: Settings, end: false },
] as const

export function Sidebar({
  collapsed,
  onCollapse,
  onNavigate,
}: {
  collapsed: boolean
  onCollapse: () => void
  onNavigate?: () => void
}) {
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  const dark = theme === "dark"

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className={cn("flex items-center gap-2 px-4 py-5", collapsed && "justify-center px-2")}>
        <span className="flex size-7 items-center justify-center rounded-md bg-[#8576F5] text-white">
          <Sparkle className="size-3.5 fill-current" aria-hidden="true" />
        </span>
        {collapsed ? (
          <span className="sr-only">Constellation</span>
        ) : (
          <span className="text-[15px] font-semibold tracking-tight">Constellation</span>
        )}
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 px-2" aria-label="Primary">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-[#F6F1FF] hover:text-foreground",
                collapsed && "justify-center px-2",
                isActive && "bg-[#F3ECFF] font-medium text-foreground"
              )
            }
          >
            <item.icon className="size-4 shrink-0" />
            {collapsed ? null : <span className="flex-1">{item.label}</span>}
            {!collapsed && "badge" in item && item.badge ? (
              <span className="flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {item.badge}
              </span>
            ) : null}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto space-y-1 border-t border-border px-2 py-3">
        <Button
          variant="ghost"
          className={cn(
            "h-9 w-full justify-start gap-3 px-3 text-[13px] text-muted-foreground",
            collapsed && "justify-center px-2"
          )}
          onClick={onCollapse}
        >
          {collapsed ? <ChevronRight className="size-4" /> : <PanelLeftClose className="size-4" />}
          {collapsed ? <span className="sr-only">Expand sidebar</span> : "Collapse"}
        </Button>
        <div
          className={cn(
            "flex items-center gap-3 px-3 py-2 text-[13px] text-muted-foreground",
            collapsed && "justify-center px-2"
          )}
        >
          {collapsed ? null : (
            <>
              <ChevronLeft className="size-4" aria-hidden="true" />
              <span className="flex-1">Dark mode</span>
            </>
          )}
          <Switch
            size="sm"
            checked={dark}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            aria-label="Toggle dark mode"
          />
        </div>
        <button
          type="button"
          onClick={() => {
            onNavigate?.()
            void navigate("/profile")
          }}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left hover:bg-[#F6F1FF]",
            collapsed && "justify-center"
          )}
        >
          <Avatar size="sm">
            <AvatarImage src="https://media.licdn.com/dms/image/v2/D4E03AQHwF6kY434l_A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1732851169559?e=1733750400&v=beta&t=P1oFjH_sOyquhB8_j3t38F9wHrU6d95xw0p5RJQJk3g" alt="Uchenna Emmanuel" alt="Uchenna Emmanuel" />
            <AvatarFallback>UC</AvatarFallback>
          </Avatar>
          {collapsed ? (
            <span className="sr-only">Uchenna Emmanuel
          </span>
          ) : (
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-medium text-foreground">
                Uchenna Emmanuel
              </span>
              <span className="block truncate text-[11px] text-muted-foreground">
                dovadallas661@gmail.com
              </span>
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
