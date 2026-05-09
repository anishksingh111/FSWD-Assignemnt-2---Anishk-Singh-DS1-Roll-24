import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RiBarChartFill, RiCalendar2Fill, RiMagicFill, RiTimerFlashFill } from 'react-icons/ri'
import Button from '../../components/ui/Button/Button'
import TypingText from '../../components/ui/TypingText/TypingText'
import styles from './LandingPage.module.css'

const features = [
  { icon: RiMagicFill, title: 'AI Study Planner', desc: 'Priority-based schedules using your exams + weak topics.' },
  { icon: RiBarChartFill, title: 'Graphic Analytics', desc: 'Charts that visualize completion, hours, and consistency.' },
  { icon: RiTimerFlashFill, title: 'Pomodoro Focus', desc: 'Animated timer with breaks, sound alerts, and streaks.' },
  { icon: RiCalendar2Fill, title: 'Calendar Planner', desc: 'Monthly view with exam highlights + task scheduling.' },
]

const testimonials = [
  {
    name: 'Final-year CSE student',
    quote: 'The planner feels like a futuristic cockpit. I finally track my effort, not just my intentions.',
  },
  { name: 'ECE student', quote: 'The analytics and weekly planner made exam prep predictable and calm.' },
  { name: 'MBA student', quote: 'Tasks + notes + Pomodoro in one place. Everything is clean and fast.' },
]

export default function LandingPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.nav}>
            <div className={styles.brand}>
              <span className={styles.orb} aria-hidden="true" />
              <div>
                <div className={styles.brandTop}>
                  AI <span className="gradientText">Graphic</span>
                </div>
                <div className={styles.brandBottom}>Study Planner</div>
              </div>
            </div>

            <div className={styles.navRight}>
              <Link className={styles.navLink} to="/app/dashboard">
                Dashboard
              </Link>
              <Button as={Link} to="/app/dashboard" variant="primary">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        <section className={styles.hero}>
          <div className={styles.heroLeft}>
            <motion.h1
              className={styles.h1}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              A futuristic way to{' '}
              <span className="gradientText">
                <TypingText phrases={['study', 'plan', 'revise', 'win']} />
              </span>
            </motion.h1>
            <p className={styles.lead}>
              Build AI-generated schedules, track progress visually, manage tasks, capture notes, and stay focused with a
              Pomodoro workflow—everything saved in localStorage.
            </p>
            <div className={styles.ctaRow}>
              <Button as={Link} to="/app/dashboard" variant="primary">
                Open Dashboard
              </Button>
              <Button as="a" href="#features" variant="ghost">
                Explore Features
              </Button>
            </div>
            <div className={styles.badges}>
              <span className={`${styles.badge} glass`}>Glassmorphism UI</span>
              <span className={`${styles.badge} glass`}>Dark/Light mode</span>
              <span className={`${styles.badge} glass`}>Charts + Motion</span>
            </div>
          </div>

          <div className={styles.heroRight}>
            <motion.div
              className={`${styles.heroCard} glass`}
              initial={{ opacity: 0, scale: 0.96, rotate: -1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className={styles.heroCardTop}>
                <div className={styles.heroChip}>AI · SCHEDULE</div>
                <div className={styles.heroChip}>GRAPH · PROGRESS</div>
              </div>
              <div className={styles.heroViz}>
                <motion.div
                  className={styles.ring}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  aria-hidden="true"
                />
                <div className={styles.vizCenter}>
                  <div className={styles.vizTitle}>Today</div>
                  <div className={styles.vizValue}>3h 20m</div>
                  <div className={styles.vizSub}>deep focus</div>
                </div>
              </div>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <div className={styles.statLabel}>Streak</div>
                  <div className={styles.statValue}>7</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statLabel}>Tasks</div>
                  <div className={styles.statValue}>5</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statLabel}>Completion</div>
                  <div className={styles.statValue}>68%</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="features" className={styles.section}>
          <div className={styles.sectionTitle}>
            <div className={styles.kicker}>Features</div>
            <h2 className={styles.h2}>
              Built for a <span className="gradientText">college workflow</span>
            </h2>
            <p className={styles.sectionLead}>Planning, execution, and analytics—designed like a professional dashboard.</p>
          </div>

          <div className={styles.grid}>
            {features.map((f) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.title}
                  className={`${styles.feature} glass`}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.featureIcon}>
                    <Icon />
                  </div>
                  <div className={styles.featureTitle}>{f.title}</div>
                  <div className={styles.featureDesc}>{f.desc}</div>
                </motion.div>
              )
            })}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <div className={styles.kicker}>Testimonials</div>
            <h2 className={styles.h2}>Students love the clarity</h2>
            <p className={styles.sectionLead}>A planner that feels modern, fast, and motivating.</p>
          </div>

          <div className={styles.grid3}>
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                className={`${styles.testimonial} glass`}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
              >
                <div className={styles.quote}>&ldquo;{t.quote}&rdquo;</div>
                <div className={styles.person}>{t.name}</div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerInner}>
            <div className={styles.footerBrand}>
              AI <span className="gradientText">Graphic</span> Study Planner
            </div>
            <div className={styles.footerCopy}>Final-year project style UI · localStorage · React + Chart.js</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

