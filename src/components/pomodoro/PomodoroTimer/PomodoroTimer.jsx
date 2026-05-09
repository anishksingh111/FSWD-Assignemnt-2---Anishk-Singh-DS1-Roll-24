import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../../ui/Button/Button'
import styles from './PomodoroTimer.module.css'

function beep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    o.frequency.value = 880
    g.gain.value = 0.08
    o.connect(g)
    g.connect(ctx.destination)
    o.start()
    setTimeout(() => {
      o.stop()
      ctx.close()
    }, 220)
  } catch {
    // ignore if audio is blocked
  }
}

export default function PomodoroTimer() {
  const focusSec = 25 * 60
  const breakSec = 5 * 60

  const [mode, setMode] = useState('focus') // focus | break
  const [running, setRunning] = useState(false)
  const [seconds, setSeconds] = useState(focusSec)
  const raf = useRef(null)
  const last = useRef(null)

  const total = mode === 'focus' ? focusSec : breakSec
  const pct = useMemo(() => ((total - seconds) / total) * 100, [seconds, total])

  useEffect(() => {
    if (!running) return
    function loop(ts) {
      if (!last.current) last.current = ts
      const dt = ts - last.current
      if (dt >= 1000) {
        last.current = ts
        setSeconds((s) => {
          if (s <= 1) {
            beep()
            const nextMode = mode === 'focus' ? 'break' : 'focus'
            setMode(nextMode)
            return nextMode === 'focus' ? focusSec : breakSec
          }
          return s - 1
        })
      }
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
      raf.current = null
      last.current = null
    }
  }, [mode, running])

  function reset() {
    setRunning(false)
    setSeconds(mode === 'focus' ? focusSec : breakSec)
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <div className={styles.mode}>
          <span className={styles.modeDot} data-mode={mode} />
          <span className={styles.modeLabel}>{mode === 'focus' ? 'Focus (25:00)' : 'Break (05:00)'}</span>
        </div>
      </div>

      <div className={styles.ringWrap}>
        <motion.div
          className={styles.ring}
          style={{ ['--p']: `${pct}%` }}
          animate={{ scale: running ? 1 : 0.99 }}
          transition={{ duration: 0.2 }}
        />
        <div className={styles.center}>
          <div className={styles.time}>
            {mm}:{ss}
          </div>
          <div className={styles.hint}>Animated countdown · sound notification</div>
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="primary" onClick={() => setRunning((r) => !r)} type="button">
          {running ? 'Pause' : 'Start'}
        </Button>
        <Button variant="ghost" onClick={reset} type="button">
          Reset
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setRunning(false)
            const next = mode === 'focus' ? 'break' : 'focus'
            setMode(next)
            setSeconds(next === 'focus' ? focusSec : breakSec)
          }}
          type="button"
        >
          Switch
        </Button>
      </div>
    </div>
  )
}

