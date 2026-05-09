import { useMemo } from 'react'
import GlassCard from '../../components/ui/GlassCard/GlassCard'
import Calendar from '../../components/calendar/Calendar/Calendar'
import { useTasksData } from '../../hooks/useTasksData'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useToast } from '../../hooks/useToast'
import styles from './CalendarPage.module.css'

export default function CalendarPage() {
  const { tasks, addTask } = useTasksData()
  const [plannerPlan] = useLocalStorage('plannerPlan', null)
  const { pushToast } = useToast()

  const highlights = useMemo(() => {
    const map = {}
    for (const t of tasks) {
      if (!t.deadline) continue
      map[t.deadline] ||= []
      map[t.deadline].push({ type: 'task', color: 'rgba(34,211,238,0.9)' })
    }
    for (const s of plannerPlan?.subjects ?? []) {
      if (!s.examDate) continue
      map[s.examDate] ||= []
      map[s.examDate].push({ type: 'exam', color: 'rgba(251,113,133,0.9)' })
    }
    return map
  }, [plannerPlan, tasks])

  return (
    <div className={styles.page}>
      <GlassCard
        title="Calendar Planner"
        subtitle="Monthly study calendar. Exam dates are highlighted, and task deadlines appear as dots."
      >
        <Calendar
          highlights={highlights}
          onPickDate={(iso) => {
            const title = window.prompt('Quick add task title for ' + iso)
            if (!title) return
            addTask({ title, subject: '', priority: 'medium', deadline: iso })
            pushToast({ type: 'success', title: 'Task scheduled', message: `Added deadline ${iso}` })
          }}
        />
      </GlassCard>
    </div>
  )
}

