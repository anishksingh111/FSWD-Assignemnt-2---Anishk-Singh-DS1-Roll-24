import { useMemo, useState } from 'react'
import GlassCard from '../../components/ui/GlassCard/GlassCard'
import Button from '../../components/ui/Button/Button'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useToast } from '../../hooks/useToast'
import { generatePlan } from '../../utils/aiPlanner'
import styles from './AIPlannerPage.module.css'

const EMPTY_SUBJECT = { name: '', examDate: '', weakTopics: '', color: '' }

export default function AIPlannerPage() {
  const { pushToast } = useToast()
  const [inputs, setInputs] = useLocalStorage('plannerInputs', {
    dailyHours: 3,
    subjects: [{ ...EMPTY_SUBJECT }],
  })
  const [plan, setPlan] = useLocalStorage('plannerPlan', null)

  const preview = useMemo(() => {
    if (!inputs?.subjects?.some((s) => s.name?.trim())) return null
    return generatePlan({ subjects: inputs.subjects, dailyHours: inputs.dailyHours })
  }, [inputs])

  function updateSubject(i, patch) {
    setInputs((prev) => {
      const next = { ...prev, subjects: [...(prev.subjects || [])] }
      next.subjects[i] = { ...next.subjects[i], ...patch }
      return next
    })
  }

  function addSubject() {
    setInputs((prev) => ({ ...prev, subjects: [...(prev.subjects || []), { ...EMPTY_SUBJECT }] }))
  }

  function removeSubject(i) {
    setInputs((prev) => ({ ...prev, subjects: (prev.subjects || []).filter((_, idx) => idx !== i) }))
  }

  function onGenerate() {
    const created = generatePlan({ subjects: inputs.subjects, dailyHours: inputs.dailyHours })
    setPlan(created)
    pushToast({ type: 'success', title: 'Plan generated', message: 'Your weekly timetable is ready.' })
  }

  const activePlan = plan || preview

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        <GlassCard
          title="AI Study Planner"
          subtitle="Enter subjects, exam dates, weak topics, and daily hours. We'll generate a smart schedule."
          actions={
            <Button variant="primary" onClick={onGenerate}>
              Generate timetable
            </Button>
          }
        >
          <div className={styles.form}>
            <label className={styles.field}>
              <span className={styles.label}>Daily available study hours</span>
              <input
                className={styles.input}
                type="number"
                min="0.5"
                step="0.5"
                value={inputs.dailyHours}
                onChange={(e) => setInputs((p) => ({ ...p, dailyHours: e.target.value }))}
              />
            </label>

            <div className={styles.subjectsHeader}>
              <div className={styles.label}>Subjects</div>
              <Button variant="ghost" onClick={addSubject} type="button">
                + Add subject
              </Button>
            </div>

            <div className={styles.subjects}>
              {(inputs.subjects || []).map((s, i) => (
                <div key={i} className={`${styles.subjectCard} glass`}>
                  <div className={styles.subjectTop}>
                    <div className={styles.badge} style={{ background: s.color || 'rgba(255,255,255,0.08)' }} />
                    <div className={styles.subjectTitle}>Subject #{i + 1}</div>
                    {(inputs.subjects || []).length > 1 && (
                      <button className={styles.remove} type="button" onClick={() => removeSubject(i)}>
                        Remove
                      </button>
                    )}
                  </div>

                  <div className={styles.row2}>
                    <label className={styles.field}>
                      <span className={styles.label}>Subject name</span>
                      <input
                        className={styles.input}
                        value={s.name}
                        onChange={(e) => updateSubject(i, { name: e.target.value })}
                        placeholder="e.g., Data Structures"
                      />
                    </label>

                    <label className={styles.field}>
                      <span className={styles.label}>Exam date</span>
                      <input
                        className={styles.input}
                        type="date"
                        value={s.examDate}
                        onChange={(e) => updateSubject(i, { examDate: e.target.value })}
                      />
                    </label>
                  </div>

                  <label className={styles.field}>
                    <span className={styles.label}>Weak topics (comma separated)</span>
                    <input
                      className={styles.input}
                      value={s.weakTopics}
                      onChange={(e) => updateSubject(i, { weakTopics: e.target.value })}
                      placeholder="e.g., graphs, DP, recursion"
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>Color tag</span>
                    <input
                      className={styles.input}
                      type="color"
                      value={s.color || '#22d3ee'}
                      onChange={(e) => updateSubject(i, { color: e.target.value })}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        <GlassCard title="Weekly graphical planner" subtitle="Color-coded subjects and priority-based daily blocks">
          {!activePlan ? (
            <div className={styles.empty}>Add at least one subject to preview your AI timetable.</div>
          ) : (
            <div className={styles.week}>
              {activePlan.week.map((day) => (
                <div key={day.date} className={`${styles.day} glass`}>
                  <div className={styles.dayTop}>
                    <div className={styles.dayDate}>{day.date}</div>
                    <div className={styles.dayHours}>{activePlan.dailyHours}h</div>
                  </div>
                  <div className={styles.blocks}>
                    {day.blocks.map((b) => (
                      <div key={`${day.date}-${b.subject}`} className={styles.block}>
                        <span className={styles.blockDot} style={{ background: b.color }} />
                        <div className={styles.blockMain}>
                          <div className={styles.blockTitle}>
                            {b.subject} <span className={styles.blockHours}>{b.hours}h</span>
                          </div>
                          <div className={styles.blockSub}>{b.focus}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  )
}

