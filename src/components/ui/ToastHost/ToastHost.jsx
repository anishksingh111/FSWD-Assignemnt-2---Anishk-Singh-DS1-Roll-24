import { AnimatePresence, motion } from 'framer-motion'
import { useToast } from '../../../hooks/useToast'
import styles from './ToastHost.module.css'

const typeToAccent = {
  info: 'rgba(34,211,238,0.9)',
  success: 'rgba(52,211,153,0.95)',
  warning: 'rgba(251,191,36,0.95)',
  error: 'rgba(251,113,133,0.95)',
}

export default function ToastHost() {
  const { toasts } = useToast()

  return (
    <div className={styles.host} aria-live="polite" aria-relevant="additions">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            className={`${styles.toast} glass`}
            initial={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
            transition={{ duration: 0.22 }}
            style={{ ['--accent']: typeToAccent[t.type] ?? typeToAccent.info }}
          >
            <div className={styles.dot} />
            <div className={styles.body}>
              <div className={styles.title}>{t.title}</div>
              {!!t.message && <div className={styles.message}>{t.message}</div>}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

