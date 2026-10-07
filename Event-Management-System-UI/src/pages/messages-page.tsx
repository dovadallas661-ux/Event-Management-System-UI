const THREADS = [
  {
    from: "Backon Energy Limited",
    preview: "Can we extend the Cloud Innovation Summit Q&A by 15 minutes?",
    time: "10:14",
  },
  {
    from: "Engr. Steven Iwuogu",
    preview: "Stage notes for the blockchain keynote are attached.",
    time: "09:02",
  },
  {
    from: "Venue ops",
    preview: "Eko Convention Centre confirmed AV for TechForward.",
    time: "Yesterday",
  },
]

export function MessagesPage() {
  return (
    <div className="mx-auto max-w-[720px]">
      <h1 className="text-[22px] font-medium tracking-tight">Messages</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        Speaker and operations conversations for the current program.
      </p>
      <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
        {THREADS.map((thread) => (
          <li key={thread.from} className="px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium">{thread.from}</p>
              <span className="text-xs text-muted-foreground">{thread.time}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{thread.preview}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
