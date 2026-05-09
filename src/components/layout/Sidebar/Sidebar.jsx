import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  RiBarChartFill,
  RiCalendar2Fill,
  RiDashboardFill,
  RiFileTextFill,
  RiListCheck3,
  RiMagicFill,
  RiSettings4Fill,
  RiTimerFlashFill,
} from 'react-icons/ri'
import styles from './Sidebar.module.css'

const nav = [
  { to: '/app/dashboard', label: 'Dashboard', icon: RiDashboardFill },
  { to: '/app/planner', label: 'AI Study Planner', icon: RiMagicFill },
  { to: '/app/tasks', label: 'Task Manager', icon: RiListCheck3 },
  { to: '/app/notes', label: 'Notes', icon: RiFileTextFill },
  { to: '/app/analytics', label: 'Progress Analytics', icon: RiBarChartFill },
  { to: '/app/pomodoro', label: 'Pomodoro', icon: RiTimerFlashFill },
  { to: '/app/calendar', label: 'Calendar', icon: RiCalendar2Fill },
  { to: '/app/settings', label: 'Settings', icon: RiSettings4Fill },
]

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className={`${styles.sidebar} glass`}>
      <button className={`${styles.brand} focusRing`} onClick={() => navigate('/')} type="button">
        <span className={styles.logoOrb} aria-hidden="true" />
        <div>
          <div className={styles.brandTop}>
            AI <span className="gradientText">Graphic</span>
          </div>
          <div className={styles.brandBottom}>Study Planner</div>
        </div>
      </button>

      <nav className={styles.nav}>
        {nav.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''} focusRing`}
            >
              {({ isActive }) => (
                <>
                  <Icon className={styles.icon} />
                  <span>{item.label}</span>
                  {isActive ? (
                    <motion.span
                      className={styles.pill}
                      layoutId="activePill"
                      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                    />
                  ) : null}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      <div className={styles.footer}>
        <div className={styles.footerHint}>Futuristic productivity dashboard</div>
        <div className={styles.footerSmall}>localStorage · charts · motion</div>
      </div>
    </aside>
  )
}

