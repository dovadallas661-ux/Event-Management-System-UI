import { useApp } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { toast } from "sonner"

export function SettingsPage() {
  const { rowsPerPage, setRowsPerPage } = useApp()
  const { theme, setTheme } = useTheme()

  return (
    <div className="mx-auto max-w-[640px] space-y-5">
      <div>
        <h1 className="text-[22px] font-medium tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Workspace preferences for this frontend demo.</p>
      </div>
      <section className="space-y-4 rounded-xl border border-border bg-card p-4">
        <div className="grid gap-1.5">
          <Label htmlFor="org">Organization</Label>
          <Input id="org" defaultValue="Constellation" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="rows">Default rows per page</Label>
          <Input
            id="rows"
            type="number"
            min={5}
            max={50}
            value={rowsPerPage}
            onChange={(event) => setRowsPerPage(Number(event.target.value) || 10)}
          />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
          <div>
            <p className="text-sm font-medium">Dark mode</p>
            <p className="text-xs text-muted-foreground">Uses the same toggle as the sidebar.</p>
          </div>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            aria-label="Dark mode"
          />
        </div>
        <Button
          onClick={() => toast.success("Settings saved", { description: "Preferences stay in this session." })}
        >
          Save changes
        </Button>
      </section>
    </div>
  )
}
