import GlassCard from '../../components/ui/GlassCard/GlassCard'
import PomodoroTimer from '../../components/pomodoro/PomodoroTimer/PomodoroTimer'
import styles from './PomodoroPage.module.css'

export default function PomodoroPage() {
  return (
    <div className={styles.page}>
      <GlassCard title="Pomodoro Timer" subtitle="25-minute focus + 5-minute break · sound notification · animations">
        <PomodoroTimer />
      </GlassCard>
    </div>
  )
}

