import styles from './GlassCard.module.css'

export default function GlassCard({ title, subtitle, actions, children, className = '' }) {
  return (
    <section className={`${styles.card} glass ${className}`}>
      {(title || subtitle || actions) && (
        <header className={styles.header}>
          <div className={styles.left}>
            {!!title && <div className={styles.title}>{title}</div>}
            {!!subtitle && <div className={styles.subtitle}>{subtitle}</div>}
          </div>
          {!!actions && <div className={styles.actions}>{actions}</div>}
        </header>
      )}
      <div className={styles.body}>{children}</div>
    </section>
  )
}

