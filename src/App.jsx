import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LandingPage from './pages/LandingPage/LandingPage'
import AppShell from './components/layout/AppShell/AppShell'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import AIPlannerPage from './pages/AIPlannerPage/AIPlannerPage'
import TaskManagerPage from './pages/TaskManagerPage/TaskManagerPage'
import NotesPage from './pages/NotesPage/NotesPage'
import AnalyticsPage from './pages/AnalyticsPage/AnalyticsPage'
import PomodoroPage from './pages/PomodoroPage/PomodoroPage'
import CalendarPage from './pages/CalendarPage/CalendarPage'
import SettingsPage from './pages/SettingsPage/SettingsPage'
import LoadingScreen from './components/ui/LoadingScreen/LoadingScreen'
import { useAppBoot } from './hooks/useAppBoot'

export default function App() {
  const location = useLocation()
  const { ready } = useAppBoot()

  if (!ready) return <LoadingScreen />

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />

        <Route element={<AppShell />}>
          <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />
          <Route path="/app/dashboard" element={<DashboardPage />} />
          <Route path="/app/planner" element={<AIPlannerPage />} />
          <Route path="/app/tasks" element={<TaskManagerPage />} />
          <Route path="/app/notes" element={<NotesPage />} />
          <Route path="/app/analytics" element={<AnalyticsPage />} />
          <Route path="/app/pomodoro" element={<PomodoroPage />} />
          <Route path="/app/calendar" element={<CalendarPage />} />
          <Route path="/app/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

