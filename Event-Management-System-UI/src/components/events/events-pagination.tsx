import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "cn"

function pageItems(current: number, total: number) {
  if (total <= 5) return Array.from({ length: total }, (_, index) => index + 1)
  if (current <= 3) return [1, 2, 3, "ellipsis", total] as const
  if (current >= total - 2) return [1, "ellipsis", total - 2, total - 1, total] as const
  return [1, "ellipsis", current, "ellipsis", total] as const
}

export function EventsPagination({
  page,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsChange,
}: {
  page: number
  totalPages: number
  rowsPerPage: number
  onPageChange: (page: number) => void
  onRowsChange: (rows: number) => void
}) {
  const items = pageItems(page, totalPages)

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <nav className="flex items-center gap-1" aria-label="Pagination">
        <Button
          variant="outline"
          size="icon-sm"
          className="size-8"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </Button>
        {items.map((item, index) =>
          item === "ellipsis" ? (
            <span key={`e-${index}`} className="px-1 text-sm text-muted-foreground">
              …
            </span>
          ) : (
            <Button
              key={item}
              variant={item === page ? "default" : "outline"}
              size="icon-sm"
              className={cn(
                "size-8 text-xs",
                item === page && "bg-[#8576F5] text-white hover:bg-[#7466e8]"
              )}
              aria-current={item === page ? "page" : undefined}
              onClick={() => onPageChange(item)}
            >
              {item}
            </Button>
          )
        )}
        <Button
          variant="outline"
          size="icon-sm"
          className="size-8"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </Button>
      </nav>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="hidden sm:inline">Show:</span>
        <Select
          value={String(rowsPerPage)}
          onValueChange={(value) => {
            if (value) onRowsChange(Number(value))
          }}
        >
          <SelectTrigger size="sm" className="h-8 min-w-[92px]" aria-label="Rows per page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 50].map((value) => (
              <SelectItem key={value} value={String(value)}>
                {value} rows
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
