import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import ToastHost from '../../ui/ToastHost/ToastHost'
import styles from './AppShell.module.css'

export default function AppShell() {
  const location = useLocation()

  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.main}>
        <Topbar />
        <motion.main
          key={location.pathname}
          className={styles.content}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
        >
          <Outlet />
        </motion.main>
      </div>
      <ToastHost />
    </div>
  )
}

