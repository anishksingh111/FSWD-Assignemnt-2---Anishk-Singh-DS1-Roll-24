import { useMemo, useState } from 'react'
import styles from './Calendar.module.css'

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function endOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0)
}

function toISO(d) {
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export default function Calendar({ highlights = {}, onPickDate }) {
  const [cursor, setCursor] = useState(() => new Date())

  const grid = useMemo(() => {
    const first = startOfMonth(cursor)
    const last = endOfMonth(cursor)
    const days = []
    const startDow = first.getDay() // 0 Sun

    for (let i = 0; i < startDow; i++) days.push(null)
    for (let d = 1; d <= last.getDate(); d++) days.push(new Date(cursor.getFullYear(), cursor.getMonth(), d))
    while (days.length % 7 !== 0) days.push(null)
    return days
  }, [cursor])

  const monthLabel = cursor.toLocaleString(undefined, { month: 'long', year: 'numeric' })

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <button className={`${styles.navBtn} focusRing`} onClick={() => setCursor((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1))} type="button">
          Prev
        </button>
        <div className={styles.month}>{monthLabel}</div>
        <button className={`${styles.navBtn} focusRing`} onClick={() => setCursor((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1))} type="button">
          Next
        </button>
      </div>

      <div className={styles.dow}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((x) => (
          <div key={x} className={styles.dowCell}>
            {x}
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {grid.map((d, idx) => {
          if (!d) return <div key={idx} className={styles.cellEmpty} />
          const iso = toISO(d)
          const h = highlights[iso] || []
          return (
            <button
              key={iso}
              className={`${styles.cell} focusRing`}
              type="button"
              onClick={() => onPickDate?.(iso)}
            >
              <div className={styles.day}>{d.getDate()}</div>
              <div className={styles.dots}>
                {h.slice(0, 3).map((x, i) => (
                  <span key={i} className={styles.dot} style={{ background: x.color || 'rgba(34,211,238,0.9)' }} />
                ))}
              </div>
            </button>
          )
        })}
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: 'rgba(251,113,133,0.9)' }} /> Exam
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: 'rgba(34,211,238,0.9)' }} /> Task
        </span>
      </div>
    </div>
  )
}

