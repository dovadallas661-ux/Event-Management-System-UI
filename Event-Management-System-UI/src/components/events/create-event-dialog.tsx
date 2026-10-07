import { useState, type FormEvent, type ReactNode } from "react"
import { useApp } from "@/context/app-context"
import type { EventDraft } from "@/types/event"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const EMPTY: EventDraft = {
  name: "",
  category: "Technology",
  date: "",
  time: "",
  location: "",
  speaker: "",
  description: "",
  capacity: "",
  ticketPrice: "",
}

const CATEGORIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Energy",
  "Workshops",
  "Networking",
  "Education",
]

export function CreateEventDialog() {
  const { createOpen, setCreateOpen, createEvent, categories } = useApp()
  const [draft, setDraft] = useState<EventDraft>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof EventDraft, string>>>({})
  const options = categories.length > 0 ? categories : CATEGORIES

  const update = (key: keyof EventDraft, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  const close = (open: boolean) => {
    setCreateOpen(open)
    if (!open) {
      setDraft(EMPTY)
      setErrors({})
    }
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const result = createEvent(draft)
    if (!result.ok) {
      setErrors(result.errors ?? {})
      return
    }
    setDraft(EMPTY)
    setErrors({})
  }

  return (
    <Dialog open={createOpen} onOpenChange={close}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create event</DialogTitle>
          <DialogDescription>
            Add a new event to the program. It will appear on the dashboard, calendar, and events list.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-3" onSubmit={submit}>
          <Field label="Event Name" error={errors.name}>
            <Input
              value={draft.name}
              onChange={(event) => update("name", event.target.value)}
              aria-invalid={Boolean(errors.name)}
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Category" error={errors.category}>
              <Select value={draft.category} onValueChange={(value) => value && update("category", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {options.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Speaker" error={errors.speaker}>
              <Input
                value={draft.speaker}
                onChange={(event) => update("speaker", event.target.value)}
                aria-invalid={Boolean(errors.speaker)}
              />
            </Field>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Date" error={errors.date}>
              <Input
                type="date"
                value={draft.date}
                onChange={(event) => update("date", event.target.value)}
                aria-invalid={Boolean(errors.date)}
              />
            </Field>
            <Field label="Time" error={errors.time}>
              <Input
                type="time"
                value={draft.time}
                onChange={(event) => update("time", event.target.value)}
                aria-invalid={Boolean(errors.time)}
              />
            </Field>
          </div>
          <Field label="Location" error={errors.location}>
            <Input
              value={draft.location}
              onChange={(event) => update("location", event.target.value)}
              aria-invalid={Boolean(errors.location)}
            />
          </Field>
          <Field label="Description" error={errors.description}>
            <Textarea
              value={draft.description}
              onChange={(event) => update("description", event.target.value)}
              aria-invalid={Boolean(errors.description)}
              rows={3}
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Capacity" error={errors.capacity}>
              <Input
                type="number"
                min={1}
                value={draft.capacity}
                onChange={(event) => update("capacity", event.target.value)}
                aria-invalid={Boolean(errors.capacity)}
              />
            </Field>
            <Field label="Ticket Price" error={errors.ticketPrice}>
              <Input
                type="number"
                min={0}
                step="1"
                value={draft.ticketPrice}
                onChange={(event) => update("ticketPrice", event.target.value)}
                aria-invalid={Boolean(errors.ticketPrice)}
              />
            </Field>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => close(false)}>
              Cancel
            </Button>
            <Button type="submit">Create event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  )
}
