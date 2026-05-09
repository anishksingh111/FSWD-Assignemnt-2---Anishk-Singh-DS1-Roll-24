import styles from './Button.module.css'

export default function Button({ as: Comp = 'button', variant = 'primary', className = '', ...props }) {
  return <Comp className={`${styles.btn} ${styles[variant]} focusRing ${className}`} {...props} />
}

