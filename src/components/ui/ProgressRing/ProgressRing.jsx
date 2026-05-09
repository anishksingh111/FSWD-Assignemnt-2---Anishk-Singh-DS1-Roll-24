import styles from './ProgressRing.module.css'

export default function ProgressRing({ value = 0, label = 'Progress', size = 92 }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0))
  const stroke = 10
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const dash = (v / 100) * c

  return (
    <div className={styles.wrap} style={{ width: size, height: size }}>
      <svg width={size} height={size} className={styles.svg} aria-label={label}>
        <defs>
          <linearGradient id="aigsp_ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(34,211,238,0.95)" />
            <stop offset="50%" stopColor="rgba(59,130,246,0.9)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0.9)" />
          </linearGradient>
        </defs>
        <circle className={styles.bg} cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} />
        <circle
          className={styles.fg}
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${c}`}
          style={{ stroke: 'url(#aigsp_ring)' }}
        />
      </svg>
      <div className={styles.center}>
        <div className={styles.value}>{Math.round(v)}%</div>
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  )
}

