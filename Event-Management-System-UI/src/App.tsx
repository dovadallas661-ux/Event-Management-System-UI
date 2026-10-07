import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { AppShell } from "@/components/layout/app-shell"
import { AnalyticsPage } from "@/pages/analytics-page"
import { CalendarPage } from "@/pages/calendar-page"
import { DashboardPage } from "@/pages/dashboard-page"
import { EventDetailsPage } from "@/pages/event-details-page"
import { EventsPage } from "@/pages/events-page"
import { MessagesPage } from "@/pages/messages-page"
import { NotificationsPage } from "@/pages/notifications-page"
import { ProfilePage } from "@/pages/profile-page"
import { ReportsPage } from "@/pages/reports-page"
import { SettingsPage } from "@/pages/settings-page"
import { SpeakersPage } from "@/pages/speakers-page"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:id" element={<EventDetailsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="speakers" element={<SpeakersPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
