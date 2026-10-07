import { Link, Outlet } from "react-router"
import { Menu, Sparkle } from "lucide-react"
import { useApp } from "@/context/app-context"
import { CreateEventDialog } from "@/components/events/create-event-dialog"
import { Sidebar } from "@/components/navigation/sidebar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { cn } from "cn"

export function AppShell() {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileNavOpen,
    setMobileNavOpen,
  } = useApp()

  return (
    <div className="min-h-svh bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-md focus:bg-card focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="flex min-h-svh">
        <aside
          className={cn(
            "sticky top-0 hidden h-svh shrink-0 border-r border-border bg-card md:block",
            sidebarCollapsed ? "w-[72px]" : "w-[232px]"
          )}
        >
          <Sidebar
            collapsed={sidebarCollapsed}
            onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-card px-4 py-3 md:hidden">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Open navigation"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu className="size-5" />
            </Button>
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <span className="flex size-6 items-center justify-center rounded-md bg-[#8576F5] text-white">
                <Sparkle className="size-3 fill-current" />
              </span>
              Constellation
            </Link>
          </header>
          <main id="main-content" className="flex-1 bg-card px-4 py-5 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-[232px] p-0" showCloseButton={false}>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Sidebar
            collapsed={false}
            onCollapse={() => setMobileNavOpen(false)}
            onNavigate={() => setMobileNavOpen(false)}
          />
        </SheetContent>
      </Sheet>
      <CreateEventDialog />
    </div>
  )
}
