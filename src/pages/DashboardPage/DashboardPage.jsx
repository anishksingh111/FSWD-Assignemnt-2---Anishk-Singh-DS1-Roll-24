import GlassCard from '../../components/ui/GlassCard/GlassCard'
import ProgressRing from '../../components/ui/ProgressRing/ProgressRing'
import WeeklyLineChart from '../../components/charts/WeeklyLineChart/WeeklyLineChart'
import Button from '../../components/ui/Button/Button'
import { useStudyLogs } from '../../hooks/useStudyLogs'
import { useSettingsData } from '../../hooks/useSettingsData'
import { useTasksData } from '../../hooks/useTasksData'
import { getMotivationalQuote } from '../../utils/quotes'
import styles from './DashboardPage.module.css'

export default function DashboardPage() {
  const { todayHours, addHours, streak, last7 } = useStudyLogs()
  const { settings } = useSettingsData()
  const { sortedTasks } = useTasksData()

  const goal = Number(settings.dailyStudyGoalHours ?? 3)
  const pct = goal > 0 ? Math.min(100, (todayHours / goal) * 100) : 0

  const upcoming = sortedTasks.filter((t) => !t.completed).slice(0, 5)

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        <GlassCard title="Daily progress" subtitle={`Goal: ${goal}h`}>
          <div className={styles.progressRow}>
            <ProgressRing value={pct} label="Today" />
            <div className={styles.progressMeta}>
              <div className={styles.big}>{todayHours.toFixed(1)}h</div>
              <div className={styles.muted}>Logged today</div>
              <div className={styles.btnRow}>
                <Button variant="primary" onClick={() => addHours(0.5)}>
                  +30 min
                </Button>
                <Button variant="ghost" onClick={() => addHours(1)}>
                  +1 hour
                </Button>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="Study streak" subtitle="Days in a row with study logged">
          <div className={styles.streak}>
            <div className={styles.streakNum}>
              <span className="gradientText">{streak}</span>
            </div>
            <div className={styles.streakText}>day streak</div>
            <div className={styles.muted}>Tip: log even 15 minutes to keep momentum.</div>
          </div>
        </GlassCard>

        <GlassCard title="Motivation" subtitle="A quick boost for your next session">
          <div className={styles.quote}>&ldquo;{getMotivationalQuote()}&rdquo;</div>
        </GlassCard>

        <GlassCard title="Upcoming tasks" subtitle="Next items from your task manager">
          <div className={styles.tasks}>
            {upcoming.length === 0 ? (
              <div className={styles.muted}>No upcoming tasks. Add one in Task Manager.</div>
            ) : (
              upcoming.map((t) => (
                <div key={t.id} className={styles.taskRow}>
                  <div className={styles.taskTitle}>{t.title}</div>
                  <div className={styles.taskMeta}>
                    <span className={styles.priority} data-p={t.priority}>
                      {t.priority}
                    </span>
                    {!!t.deadline && <span className={styles.deadline}>{t.deadline}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        </GlassCard>
      </div>

      <div className={styles.analyticsRow}>
        <GlassCard title="Graph analytics" subtitle="Study hours over the last 7 days">
          <div className={styles.chartWrap}>
            <WeeklyLineChart points={last7} />
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

