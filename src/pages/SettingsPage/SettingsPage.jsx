import GlassCard from '../../components/ui/GlassCard/GlassCard'
import Button from '../../components/ui/Button/Button'
import { useTheme } from '../../hooks/useTheme'
import { useSettingsData } from '../../hooks/useSettingsData'
import { useToast } from '../../hooks/useToast'
import styles from './SettingsPage.module.css'

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const { settings, setSettings, resetAllData } = useSettingsData()
  const { pushToast } = useToast()

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        <GlassCard title="Appearance" subtitle="Dark/light mode and UI preferences">
          <div className={styles.row}>
            <div>
              <div className={styles.label}>Theme</div>
              <div className={styles.muted}>Current: {theme}</div>
            </div>
            <Button variant="primary" onClick={toggleTheme} type="button">
              Toggle theme
            </Button>
          </div>
        </GlassCard>

        <GlassCard title="Profile avatar" subtitle="Change the avatar label shown in the top bar">
          <div className={styles.row}>
            <div className={styles.field}>
              <div className={styles.label}>Avatar text</div>
              <input
                className={styles.input}
                value={settings.avatarSeed ?? 'AI'}
                onChange={(e) => setSettings((s) => ({ ...s, avatarSeed: e.target.value.slice(0, 3).toUpperCase() }))}
              />
              <div className={styles.muted}>Tip: use initials like “AS”.</div>
            </div>
            <Button
              variant="ghost"
              onClick={() => pushToast({ type: 'success', title: 'Saved', message: 'Avatar updated.' })}
              type="button"
            >
              Save
            </Button>
          </div>
        </GlassCard>

        <GlassCard title="Planner defaults" subtitle="Used in Dashboard daily progress widget">
          <div className={styles.row}>
            <div className={styles.field}>
              <div className={styles.label}>Daily study goal (hours)</div>
              <input
                className={styles.input}
                type="number"
                step="0.5"
                min="0.5"
                value={settings.dailyStudyGoalHours ?? 3}
                onChange={(e) => setSettings((s) => ({ ...s, dailyStudyGoalHours: Number(e.target.value) }))}
              />
            </div>
          </div>
        </GlassCard>

        <GlassCard title="Reset data" subtitle="Clears tasks, notes, planner, and analytics from localStorage">
          <div className={styles.row}>
            <div className={styles.muted}>This will permanently remove saved data from this browser.</div>
            <Button
              variant="danger"
              onClick={() => {
                if (window.confirm('Reset all planner data? This cannot be undone.')) resetAllData()
              }}
              type="button"
            >
              Reset planner data
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

