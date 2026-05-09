import { useMemo } from 'react'
import GlassCard from '../../components/ui/GlassCard/GlassCard'
import SubjectPieChart from '../../components/charts/SubjectPieChart/SubjectPieChart'
import WeeklyLineChart from '../../components/charts/WeeklyLineChart/WeeklyLineChart'
import ProgressRing from '../../components/ui/ProgressRing/ProgressRing'
import { useTasksData } from '../../hooks/useTasksData'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useStudyLogs } from '../../hooks/useStudyLogs'
import styles from './AnalyticsPage.module.css'

export default function AnalyticsPage() {
  const { tasks } = useTasksData()
  const [plannerPlan] = useLocalStorage('plannerPlan', null)
  const { last7, totalHours, avgHours } = useStudyLogs()

  const subjects = useMemo(() => {
    const fromPlan = (plannerPlan?.subjects ?? []).map((s) => ({ name: s.name, color: s.color }))
    const fromTasks = tasks
      .map((t) => t.subject)
      .filter(Boolean)
      .map((name) => ({ name, color: '#3b82f6' }))
    const all = [...fromPlan, ...fromTasks]
    const map = new Map()
    for (const s of all) if (s.name && !map.has(s.name)) map.set(s.name, s)
    return Array.from(map.values())
  }, [plannerPlan, tasks])

  const completion = useMemo(() => {
    const bySubject = new Map()
    for (const s of subjects) bySubject.set(s.name, { ...s, done: 0, total: 0 })
    for (const t of tasks) {
      const key = t.subject || '(Unlabeled)'
      if (!bySubject.has(key)) bySubject.set(key, { name: key, color: '#22d3ee', done: 0, total: 0 })
      const v = bySubject.get(key)
      v.total += 1
      if (t.completed) v.done += 1
    }
    const arr = Array.from(bySubject.values())
      .filter((x) => x.total > 0 || subjects.some((s) => s.name === x.name))
      .map((x) => ({ ...x, pct: x.total ? (x.done / x.total) * 100 : 0 }))
      .sort((a, b) => b.pct - a.pct)
    return arr
  }, [subjects, tasks])

  const overallPct = useMemo(() => {
    const total = tasks.length || 0
    const done = tasks.filter((t) => t.completed).length
    return total ? (done / total) * 100 : 0
  }, [tasks])

  const pieItems = completion.slice(0, 6).map((x) => ({
    label: x.name,
    value: Math.max(1, Math.round(x.pct)), // keep slices visible
    color: x.color || '#22d3ee',
  }))

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        <GlassCard title="Completion percentage" subtitle="Overall task completion">
          <div className={styles.center}>
            <ProgressRing value={overallPct} label="Overall" size={120} />
            <div className={styles.small}>
              Based on tasks you mark completed. Add subjects to tasks for better breakdown.
            </div>
          </div>
        </GlassCard>

        <GlassCard title="Subject completion (pie)" subtitle="Visual breakdown by subject">
          <div className={styles.pieWrap}>{pieItems.length ? <SubjectPieChart items={pieItems} /> : <div className={styles.small}>Add tasks with subjects to see pie analytics.</div>}</div>
        </GlassCard>

        <GlassCard title="Weekly productivity graph" subtitle="Study hours from your daily logs">
          <div className={styles.chartWrap}>
            <WeeklyLineChart points={last7} />
          </div>
          <div className={styles.metrics}>
            <div className={`${styles.metric} glass`}>
              <div className={styles.metricLabel}>Total hours</div>
              <div className={styles.metricValue}>{totalHours.toFixed(1)}</div>
            </div>
            <div className={`${styles.metric} glass`}>
              <div className={styles.metricLabel}>Average/day</div>
              <div className={styles.metricValue}>{avgHours.toFixed(1)}</div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

