import { useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { toISODate, daysBetween } from '../utils/dates'

export function useStudyLogs() {
  // map: { [isoDate]: hoursNumber }
  const [logs, setLogs] = useLocalStorage('studyLogs', {})

  const todayISO = toISODate(new Date())
  const todayHours = Number(logs[todayISO] ?? 0)

  function addHours(hours) {
    const h = Math.max(0, Number(hours) || 0)
    setLogs((prev) => ({ ...prev, [todayISO]: Number((Number(prev[todayISO] ?? 0) + h).toFixed(2)) }))
  }

  const streak = useMemo(() => {
    const dates = Object.keys(logs).sort()
    if (dates.length === 0) return 0
    let s = 0
    for (let i = 0; ; i++) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const iso = toISODate(d)
      const val = Number(logs[iso] ?? 0)
      if (val <= 0) break
      s++
    }
    return s
  }, [logs])

  const last7 = useMemo(() => {
    const out = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const iso = toISODate(d)
      out.push({ iso, hours: Number(logs[iso] ?? 0) })
    }
    return out
  }, [logs])

  const totalHours = useMemo(() => {
    return Object.values(logs).reduce((sum, v) => sum + (Number(v) || 0), 0)
  }, [logs])

  const daysLogged = useMemo(() => Object.keys(logs).length, [logs])
  const avgHours = useMemo(() => (daysLogged ? totalHours / daysLogged : 0), [daysLogged, totalHours])

  const daysUntil = (isoDate) => daysBetween(todayISO, isoDate)

  return { logs, setLogs, todayISO, todayHours, addHours, streak, last7, totalHours, avgHours, daysUntil }
}

