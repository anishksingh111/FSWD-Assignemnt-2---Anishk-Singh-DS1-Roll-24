import { useMemo } from 'react'
import { RiMoonFill, RiSearch2Line, RiSunFill } from 'react-icons/ri'
import { useTheme } from '../../../hooks/useTheme'
import { useToast } from '../../../hooks/useToast'
import { getRandomQuote } from '../../../utils/quotes'
import { useSettingsData } from '../../../hooks/useSettingsData'
import styles from './Topbar.module.css'

export default function Topbar() {
  const { theme, toggleTheme } = useTheme()
  const { pushToast } = useToast()
  const { settings } = useSettingsData()

  const greeting = useMemo(() => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }, [])

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <div className={styles.title}>
          {greeting}, <span className="gradientText">student</span>
        </div>
        <div className={styles.subtitle}>Plan smarter. Track progress. Stay consistent.</div>
      </div>

      <div className={styles.right}>
        <button
          className={`${styles.action} glass focusRing`}
          type="button"
          onClick={() => pushToast({ type: 'info', title: 'Study tip', message: getRandomQuote() })}
          aria-label="Generate study tip"
          title="Study tip generator"
        >
          <RiSearch2Line />
        </button>

        <button
          className={`${styles.action} glass focusRing`}
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle dark/light mode"
        >
          {theme === 'dark' ? <RiSunFill /> : <RiMoonFill />}
        </button>

        <div className={`${styles.avatar} glass`} title="Profile avatar">
          <span className={styles.avatarRing} />
          <span className={styles.avatarText}>{(settings.avatarSeed ?? 'AI').slice(0, 3).toUpperCase()}</span>
        </div>
      </div>
    </header>
  )
}

