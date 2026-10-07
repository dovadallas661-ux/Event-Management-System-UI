import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router"
import type { NewsItem } from "@/types/event"
import { Button } from "@/components/ui/button"
import { cn } from "cn"

export function NewsCard({ items }: { items: NewsItem[] }) {
  const [index, setIndex] = useState(0)
  if (items.length === 0) return null
  const item = items[index]

  const previous = () => setIndex((current) => (current === 0 ? items.length - 1 : current - 1))
  const next = () => setIndex((current) => (current === items.length - 1 ? 0 : current + 1))

  return (
    <section className="relative min-h-[260px] overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_2px_rgba(28,15,51,0.04)]">
      <img
        src={item.image}
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-black/10" />
      <Button
        variant="secondary"
        size="icon-xs"
        className="absolute top-1/2 left-3 z-10 size-7 -translate-y-1/2 rounded-full bg-white/90 text-foreground shadow-sm hover:bg-white"
        aria-label="Previous update"
        onClick={previous}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon-xs"
        className="absolute top-1/2 right-3 z-10 size-7 -translate-y-1/2 rounded-full bg-white/90 text-foreground shadow-sm hover:bg-white"
        aria-label="Next update"
        onClick={next}
      >
        <ChevronRight className="size-4" />
      </Button>
      <div className="relative z-10 flex h-full min-h-[260px] flex-col justify-end p-5 text-white">
        <h2 className="text-[15px] font-semibold">{item.title}</h2>
        <p className="mt-1.5 line-clamp-3 text-[12px] leading-5 text-white/90">
          {item.excerpt}
        </p>
        {item.eventId ? (
          <Link
            to={`/events/${item.eventId}`}
            className="mt-2 w-fit text-[12px] font-medium text-white underline-offset-4 hover:underline"
          >
            View related event
          </Link>
        ) : null}
        <div className="mt-3 flex items-center gap-1.5" aria-hidden="true">
          {items.map((slide, slideIndex) => (
            <span
              key={slide.id}
              className={cn(
                "h-1 rounded-full",
                slideIndex === index ? "w-5 bg-white" : "w-1.5 bg-white/50"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
