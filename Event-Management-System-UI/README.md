# Constellation Event Management

Frontend-only event management dashboard for organizers. The UI follows the Constellation desktop and mobile references: compact sidebar, KPI summary, monthly registration chart, news card, and a searchable Events History table.

This is a client application. Mock JSON stands in for a backend so a REST API can replace the data access layer later.

## Features

- Dashboard metrics for events, speakers, registrations, and revenue
- Live program stats for active events, check-ins, and ticket revenue
- Recharts registration chart and editorial news carousel
- Event search, combined filters, sorting, pagination, and CSV export
- Create event dialog with validation and toast feedback
- Event details, analytics, and calendar views on the same dataset
- Speakers, reports, notifications, messages, settings, and profile pages
- Responsive desktop, tablet, and mobile layouts, including a drawer nav and expandable event rows
- Loading skeletons, empty states, and error states

## Stack

- React 19, Vite, TypeScript
- Tailwind CSS and shadcn/ui (Base UI, Vega preset)
- React Router
- Recharts
- Lucide icons
- Sonner toasts

## Setup

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

```bash
npm run build
npm run preview
```

## Architecture

```
src/
  data/          mock JSON (events, analytics, news)
  lib/           data access + query pipeline
  context/       application state
  components/    layout, dashboard, events, shared UI
  pages/         route screens
  types/         shared types
```

Data flow:

mock JSON → `src/lib/api.ts` → `AppProvider` → derived search/filter/sort/pagination → components

Components do not import JSON files directly.

## Mock data

- `src/data/events.json` — 100 events with status, speaker, location, registrations, check-ins, and revenue
- `src/data/analytics.json` — KPI values and monthly chart series matching the dashboard reference
- `src/data/news.json` — carousel slides for Latest News & Updates

Creating an event updates in-memory state only. Reload restores the original mock catalog.

## Routes

| Path | Screen |
| --- | --- |
| `/` | Dashboard |
| `/events` | Events list |
| `/events/:id` | Event details |
| `/analytics` | Charts and comparisons |
| `/calendar` | Month view of the same events |
| `/speakers` | Speakers derived from events |
| `/reports` | Operational snapshot |
| `/notifications` | Alerts |
| `/messages` | Threads |
| `/settings` | Workspace preferences |
| `/profile` | Organizer profile |

## Responsive behavior

- Desktop: persistent sidebar, four KPI cards, chart beside news, full table
- Tablet: tighter grids; sidebar can collapse
- Mobile: header + accessible drawer, stacked KPIs, full-width chart then news, stacked filters, expandable event rows, bottom pagination

## Frontend-only note

There is no server. `src/lib/api.ts` simulates latency and returns local data. Swap those functions for HTTP calls when a backend is available.
