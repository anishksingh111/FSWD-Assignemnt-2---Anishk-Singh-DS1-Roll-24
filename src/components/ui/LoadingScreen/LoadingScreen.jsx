import { motion } from 'framer-motion'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen() {
  return (
    <div className={styles.wrap}>
      <motion.div
        className={`${styles.panel} glass`}
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <div className={styles.orb} aria-hidden="true" />
        <div className={styles.title}>
          AI <span className="gradientText">Graphic</span> Study Planner
        </div>
        <div className={styles.subtitle}>Booting your dashboard…</div>
        <div className={styles.bar} aria-hidden="true">
          <motion.div
            className={styles.fill}
            initial={{ width: '8%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  )
}

